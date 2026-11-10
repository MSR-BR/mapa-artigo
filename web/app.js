'use strict';
let workspace;
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = value => new Date(value).toLocaleString('pt-BR', {dateStyle:'medium',timeStyle:'short'});
const githubURL = path => `https://github.com/${workspace.repository}/${path}`;
function setView() {
  const hash=location.hash.slice(1)||'article';
  const aliases={suggestions:'revisions',versions:'article'};
  const view=aliases[hash]||(['article','revisions','guide'].includes(hash)?hash:'article');
  document.querySelectorAll('.view').forEach(el=>el.hidden=el.id!==view);
  document.querySelectorAll('nav a').forEach(el=>el.classList.toggle('active',el.dataset.view===view));
  if(!['article','revisions','guide','suggestions','versions'].includes(hash))requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
}
function editableSections(){return [{id:'abstract',title:'Abstract',path:'article/main.tex',fragment:'abstract'},...workspace.sections];}
function suggest(section){const selected=editableSections().find(s=>s.title===section);if(selected)openSection(selected.path);}
function abstractMatch(source){const matches=[...source.matchAll(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/g)];if(matches.length!==1)throw new Error('O arquivo precisa conter um único Abstract.');return matches[0];}
function replaceAbstract(source,body){if(/\\(?:begin|end)\{abstract\}/.test(body))throw new Error('Edite somente o texto dentro do Abstract.');const match=abstractMatch(source);const start=match.index+'\\begin{abstract}'.length;return source.slice(0,start)+'\n'+body.trim()+'\n'+source.slice(start+match[1].length);}
function renderRevisionPdfs(){
  const revisions=(workspace.pdfRevisions||[]).filter(item=>typeof item.pdf==='string'&&item.pdf.startsWith(`https://github.com/${workspace.repository}/releases/download/`)&&item.pdf.endsWith('.pdf'));
  $('#revisions-status').textContent=revisions.length?'':'Nenhuma revisão anterior em PDF.';
  $('#revision-pdfs').innerHTML=revisions.map(item=>`<a class="pdf-revision" href="${escapeHTML(item.pdf)}" target="_blank" rel="noopener">PDF · ${escapeHTML(item.version)} ↗</a>`).join('');
}
async function init() {
  try {
    const response = await fetch('workspace.json?v='+Date.now(), {cache:'no-store'});
    if (!response.ok) throw new Error('Não foi possível carregar o manuscrito.');
    workspace = await response.json();
    $('#version').textContent = workspace.version;
    $('#repo-link').href = githubURL('');

    for (const selector of ['#top-pdf','#download-pdf']) $(selector).href = workspace.pdf;

    $('#abstract-text').textContent = workspace.abstract;
    $('#pdf-version').textContent=workspace.version;
    $('#abstract-history').href=githubURL('commits/'+(workspace.branch||'main')+'/article/main.tex');
    $('#article-sections').innerHTML = workspace.sections.map((s,i) => `<article class="article-section" id="section-${escapeHTML(s.id)}"><div class="section-tools"><button data-suggest="${escapeHTML(s.title)}">Sugerir mudança +</button><button data-edit-section="${escapeHTML(s.path)}">Editar e revisar com IA</button><a href="${githubURL('commits/main/' + s.path)}" target="_blank" rel="noopener">Histórico ↗</a></div><div class="article-body">${s.html}</div></article>`).join('');
    document.querySelectorAll('[data-suggest]').forEach(el=>el.addEventListener('click',()=>suggest(el.dataset.suggest)));
    renderRevisionPdfs();
    window.addEventListener('hashchange', setView);
    setupSectionReview(); $('#loading').hidden=true; await completeGitHubLogin(); setView();
  } catch (error) { $('#loading').textContent = 'Não foi possível abrir a área de trabalho. Atualize a página ou consulte o repositório no GitHub.'; console.error(error.message); }
}
init();

/* Section review: credentials remain in memory and are never sent to OpenAI. */
let accessToken = '', activeSection, baseSha, originalText, sourceDocument, reviewResult, reviewBusy=false;
async function gh(path, options={}) {
  if (!accessToken && options.method && options.method!=='GET') throw new Error('Entre com sua conta pelo botão Entrar com GitHub primeiro.');
  const response=await fetch(`https://api.github.com/repos/${workspace.repository}/${path}`, {...options,headers:{Accept:'application/vnd.github+json',...(accessToken ? {Authorization:`Bearer ${accessToken}`} : {}),'Content-Type':'application/json',...options.headers}});
  if(response.status===401){accessToken='';$('#connect-github').hidden=false;$('#editor-connect').hidden=false;$('#disconnect-github').hidden=true;throw new Error('Sua sessão expirou. Clique em Entrar com GitHub para continuar.');}
  if (!response.ok) throw new Error(response.status===409 || response.status===422 ? 'A seção mudou desde sua leitura. Reabra o formulário para comparar antes de salvar.' : `GitHub: operação não concluída (${response.status}). Confira acesso e permissões.`);
  return response.status===204 ? null : response.json();
}
const encodeText = text => btoa(Array.from(new TextEncoder().encode(text), byte=>String.fromCharCode(byte)).join(''));
const decodeText = text => new TextDecoder().decode(Uint8Array.from(atob(text.replace(/\s/g,'')), c=>c.charCodeAt(0)));
function coloredDiff(before, after) {
  const a=before.match(/\s+|[^\s]+/g)||[], b=after.match(/\s+|[^\s]+/g)||[];
  const parts=[]; const emit=(kind,text)=>{if(!text)return;const last=parts[parts.length-1];if(last?.kind===kind)last.text+=text;else parts.push({kind,text});};
  let i=0,j=0;
  if((a.length+1)*(b.length+1)<=4000000){
    const rows=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
    for(let x=a.length-1;x>=0;x--)for(let y=b.length-1;y>=0;y--)rows[x][y]=a[x]===b[y]?rows[x+1][y+1]+1:Math.max(rows[x+1][y],rows[x][y+1]);
    while(i<a.length || j<b.length){if(i<a.length && j<b.length && a[i]===b[j]){emit('',a[i++]);j++;}else if(i<a.length && (j===b.length || rows[i+1][j]>=rows[i][j+1]))emit('del',a[i++]);else emit('ins',b[j++]);}
  }else{
    // Bounded alignment for very long sections; never omits or interprets text.
    while(i<a.length && j<b.length){if(a[i]===b[j]){emit('',a[i++]);j++;continue;}let best;
      for(let x=0;x<40 && i+x<a.length;x++)for(let y=0;y<40 && j+y<b.length;y++)if(a[i+x]===b[j+y] && (!best || x+y<best[0]+best[1]))best=[x,y];
      if(best){emit('del',a.slice(i,i+best[0]).join(''));emit('ins',b.slice(j,j+best[1]).join(''));i+=best[0];j+=best[1];}else{emit('del',a[i++]);emit('ins',b[j++]);}}
    emit('del',a.slice(i).join(''));emit('ins',b.slice(j).join(''));
  }
  return parts.map(part=>part.kind?`<${part.kind}>${escapeHTML(part.text)}</${part.kind}>`:escapeHTML(part.text)).join('');
}
async function openSection(path) {
  if(reviewBusy)return; activeSection=editableSections().find(s=>s.path===path); reviewResult=null; baseSha=null; $('#section-source').value='';
  $('#section-editor-title').textContent=activeSection.title; $('#editor-connect').hidden=Boolean(accessToken);
  $('#section-editor').showModal(); $('#section-feedback').textContent='Carregando texto atual…';
  $('#section-comparison').hidden=true; $('#accept-review').hidden=true;
  try { const file=await gh(`contents/${path}?ref=${encodeURIComponent(workspace.branch||'main')}`); baseSha=file.sha; sourceDocument=decodeText(file.content); originalText=activeSection.fragment==='abstract'?abstractMatch(sourceDocument)[1].trim():sourceDocument; $('#section-source').value=originalText; $('#section-feedback').textContent='Edite o texto LaTeX ou peça uma revisão desta seção.'; }
  catch(error) { $('#section-feedback').textContent=error.message; $('#section-source').value=''; baseSha=null; }
}
async function requestSectionReview() {
  if(reviewBusy || !baseSha) return;
  if(new TextEncoder().encode($('#section-source').value).length>45000){$('#section-feedback').textContent='Esta seção ultrapassa o limite de 45000 bytes para revisão.';return;}
  reviewBusy=true; $('#review-section').disabled=true; $('#save-section').disabled=true;
  const source=$('#section-source').value, section=activeSection.path, id=crypto.randomUUID();
  $('#section-feedback').textContent='Revisão solicitada. Aguarde; você pode manter este formulário aberto.';
  try {
    await gh('actions/workflows/section-review.yml/dispatches',{method:'POST',body:JSON.stringify({ref:workspace.branch||'main',inputs:{request_id:id,section,source,base_sha:baseSha,focus:$('#review-focus').value}})});
    let result;
    for(let i=0;i<120;i++) {
      await new Promise(resolve=>setTimeout(resolve,5000));
      try { const f=await gh(`contents/reviews/requests/${id}.json?ref=collaboration`); result=JSON.parse(decodeText(f.content)); break; } catch(error) { if(!error.message.includes('(404)')) throw error; }
    }
    if(!result) throw new Error('A revisão ainda não terminou. Seu texto permanece no formulário; tente novamente mais tarde.');
    if(result.error) throw new Error(result.error);
    if(activeSection.path!==section || $('#section-source').value!==source) throw new Error('O texto do formulário mudou durante a revisão. Solicite novamente para comparar a versão atual.');
    reviewResult=result; $('#review-original').textContent=source; $('#review-proposed').textContent=result.revised;
    $('#review-diff').innerHTML=coloredDiff(source,result.revised); $('#review-reason').textContent=result.summary;
    $('#section-comparison').hidden=false; $('#accept-review').hidden=false;
    $('#section-feedback').textContent='Confira a comparação. Aceitar coloca a proposta no campo de edição; salvar publica uma nova versão.';
  } catch(error) { $('#section-feedback').textContent=error.message; }
  finally {reviewBusy=false; $('#review-section').disabled=false; $('#save-section').disabled=false;}
}
async function saveSection() {
  if(!baseSha || reviewBusy) return;
  $('#save-section').disabled=true;
  try {
    const updatedSource=activeSection.fragment==='abstract'?replaceAbstract(sourceDocument,$('#section-source').value):$('#section-source').value;
    const result=await gh(`contents/${activeSection.path}`,{method:'PUT',body:JSON.stringify({message:`Atualizar seção: ${activeSection.title}`,content:encodeText(updatedSource),sha:baseSha,branch:workspace.branch||'main'})});
    baseSha=result.content.sha; sourceDocument=updatedSource; originalText=$('#section-source').value;
    $('#section-feedback').textContent='Seção salva com histórico de autoria. O PDF e a página serão atualizados após a compilação; recarregue em alguns minutos.';
  } catch(error) {$('#section-feedback').textContent=error.message;}
  finally {$('#save-section').disabled=false;}
}
function setupSectionReview() {
 const panel=$('#collaboration-account'); panel.innerHTML='<strong>Sua conta para colaborar</strong><p>Entre com sua conta do GitHub para revisar e salvar. A autorização fica limitada ao repositório do artigo; nenhuma credencial precisa ser copiada.</p><button type="button" id="connect-github" class="button primary">Entrar com GitHub</button> <button type="button" id="disconnect-github" class="button" hidden>Sair</button><p id="connection-status" role="status"></p>';
 $('#connect-github').onclick=beginGitHubLogin; $('#editor-connect').onclick=beginGitHubLogin;
 $('#disconnect-github').onclick=disconnectGitHub;
 document.querySelectorAll('[data-edit-section]').forEach(button=>button.onclick=()=>openSection(button.dataset.editSection));
 $('#close-section-editor').onclick=()=>{if(!reviewBusy)$('#section-editor').close();};
 $('#section-editor').addEventListener('cancel',event=>{if(reviewBusy)event.preventDefault();});
 $('#review-section').onclick=requestSectionReview; $('#save-section').onclick=saveSection;
 $('#accept-review').onclick=()=>{if(reviewResult){$('#section-source').value=reviewResult.revised;$('#accept-review').hidden=true;$('#section-feedback').textContent='Sugestão aplicada ao formulário. Você pode ajustar o texto antes de salvar.';}};
 $('#discard-review').onclick=()=>{reviewResult=null;$('#section-comparison').hidden=true;$('#accept-review').hidden=true;};
}

let tokenExpiresAt=0;
const authStorageKey='article-github-login';
function authBase(){const url=new URL(workspace.authUrl);if(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/')throw new Error('A conexão com GitHub ainda está em configuração.');return url.origin;}
async function beginGitHubLogin(){
 try{
  const base=authBase(),verifier=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
  const digest=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
  const state=btoa(Array.from(digest,b=>String.fromCharCode(b)).join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const draft=activeSection && $('#section-editor').open ? {section:activeSection.path,source:$('#section-source').value,sha:baseSha,focus:$('#review-focus').value}:null;
  sessionStorage.setItem(authStorageKey,JSON.stringify({repository:workspace.repository,verifier,hash:location.hash,draft,createdAt:Date.now()}));
  location.assign(`${base}/api/login?state=${encodeURIComponent(state)}`);
 }catch(error){$('#connection-status').textContent=error.message;$('#section-feedback').textContent=error.message;}
}
async function completeGitHubLogin(){
 if(!location.hash.startsWith('#github-login='))return;
 const ticket=location.hash.slice('#github-login='.length);
 let saved;try{saved=JSON.parse(sessionStorage.getItem(authStorageKey)||'null');sessionStorage.removeItem(authStorageKey);}catch{/* No credential is stored. */}
 history.replaceState(null,'',saved?.hash||'#article');setView();
 try{
  if(!saved || saved.repository!==workspace.repository || Date.now()-saved.createdAt>900000)throw new Error('A entrada não pertence a esta aba ou expirou. Clique em Entrar com GitHub novamente.');
  const response=await fetch(authBase()+'/api/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ticket,verifier:saved.verifier})});
  const grant=await response.json();if(!response.ok||grant.error)throw new Error(grant.error||'Não foi possível concluir a entrada.');
  if(typeof grant.token!=='string'||!/^ghu_[A-Za-z0-9_]{10,300}$/.test(grant.token)||typeof grant.login!=='string')throw new Error('Não foi possível confirmar a conexão.');
  accessToken=grant.token;tokenExpiresAt=Date.now()+Math.min(Number(grant.expiresIn)||28800,28800)*1000;
  $('#connection-status').textContent=`Conectado como ${grant.login}. Você pode revisar e salvar seções.`;
  $('#connect-github').hidden=true;$('#editor-connect').hidden=true;$('#disconnect-github').hidden=false;

 }catch(error){$('#connection-status').textContent=error.message;}
 finally{
  if(saved?.repository===workspace.repository && saved.draft && editableSections().some(section=>section.path===saved.draft.section)){
   await openSection(saved.draft.section);const currentSha=baseSha;baseSha=saved.draft.sha;$('#section-source').value=saved.draft.source;$('#review-focus').value=saved.draft.focus;
   $('#section-feedback').textContent=currentSha!==saved.draft.sha?'Seu texto foi preservado, mas a seção mudou durante a entrada. Compare com a versão atual antes de salvar.':accessToken?'Conectado ao GitHub. Seu texto foi preservado; você pode revisar ou salvar.':'Seu texto foi preservado. Entre com GitHub para revisar ou salvar.';
  }
 }
}
async function disconnectGitHub(){
 const token=accessToken;accessToken='';tokenExpiresAt=0;
 $('#connect-github').hidden=false;$('#editor-connect').hidden=false;$('#disconnect-github').hidden=true;$('#connection-status').textContent='Desconectado desta página.';
 if(token)try{const response=await fetch(authBase()+'/api/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});if(!response.ok)throw new Error();}catch{$('#connection-status').textContent='Desconectado desta página. Não foi possível confirmar a revogação da sessão no GitHub; ela expirará automaticamente.';}
}
