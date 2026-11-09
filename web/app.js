'use strict';
const $ = (id) => document.getElementById(id);
const titles = {chat:'Centrum rozmowy',memory:'Pamięć właściciela',evolution:'Laboratorium ewolucji',about:'Profil systemu'};
let busy = false;
let toastTimer;
let recognition = null;

function toast(message) {
  const node = $('toast'); node.textContent = message; node.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('show'), 4300);
}
function element(tag, klass, text) {
  const node = document.createElement(tag);
  if (klass) node.className = klass;
  if (text !== undefined) node.textContent = text;
  return node;
}
async function api(path, payload) {
  const opts = payload === undefined ? {} : {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)};
  let response;
  try { response = await fetch('/api/' + path, opts); } catch { throw new Error('Brak połączenia z lokalnym serwerem Istoty.'); }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Wystąpił błąd.');
  return data;
}
function showPanel(id) {
  document.querySelectorAll('.panel').forEach(el => el.classList.toggle('visible', el.id === 'panel-' + id));
  document.querySelectorAll('.tab').forEach(el => el.classList.toggle('selected', el.dataset.panel === id));
  $('page-title').textContent = titles[id];
}
document.querySelectorAll('.tab').forEach(node => node.addEventListener('click', () => {showPanel(node.dataset.panel); refresh();}));
function appendMessage(role, content) {
  const container = $('messages');
  const empty = container.querySelector('.empty'); if (empty) empty.remove();
  const node = element('div','message '+role);
  node.appendChild(element('div','tag', role === 'user' ? 'TY' : 'ISTOTA'));
  node.appendChild(element('div', '', content));
  container.appendChild(node); container.scrollTop = container.scrollHeight;
}
function speak(text) {
  if (!$('voice-toggle').checked || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.slice(0,1600));
  utterance.lang = 'pl-PL'; utterance.rate = 1.0;
  const voices = speechSynthesis.getVoices();
  const pl = voices.find(v => v.lang.toLowerCase().startsWith('pl'));
  if (pl) utterance.voice = pl;
  window.speechSynthesis.speak(utterance);
}
$('chat-form').addEventListener('submit', async event => {
  event.preventDefault(); if (busy) return;
  const text = $('chat-input').value.trim(); if (!text) return;
  $('chat-input').value = ''; appendMessage('user', text);
  busy = true; $('send-btn').disabled = true;
  try {
    const {answer} = await api('chat',{message:text}); appendMessage('assistant',answer); speak(answer);
  } catch (err) {appendMessage('assistant','Nie mogę odpowiedzieć: '+err.message);toast(err.message);}
  finally {busy=false; $('send-btn').disabled=false;}
});
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition(); recognition.lang='pl-PL'; recognition.interimResults=false; recognition.continuous=false;
  recognition.onresult = event => { const said = event.results[0][0].transcript; $('chat-input').value = said; $('chat-input').focus(); if (!busy) $('chat-form').requestSubmit(); };
  recognition.onstart = () => {$('mic-btn').classList.add('active');$('orb').classList.add('listening');$('voice-status').textContent='Słucham…';};
  recognition.onend = () => {$('mic-btn').classList.remove('active');$('orb').classList.remove('listening');$('voice-status').textContent='Gotowy do rozmowy.';};
  recognition.onerror = event => toast('Mikrofon: '+event.error);
} else $('voice-status').textContent = 'Ta przeglądarka nie obsługuje rozpoznawania mowy.';
$('mic-btn').addEventListener('click', () => {if(!recognition){toast('Brak rozpoznawania mowy. Użyj przeglądarki z Web Speech API.');return;} try{recognition.start();}catch {recognition.stop();}});
function renderState(state) {
  const messages = $('messages'); messages.replaceChildren();
  if (!state.messages.length) messages.appendChild(element('div','empty','Napisz pierwszą wiadomość albo naciśnij mikrofon.'));
  state.messages.forEach(m => appendMessage(m.role,m.content));
  $('memory-count').textContent = state.memories.length;
  const ml = $('memory-list'); ml.replaceChildren();
  if (!state.memories.length) ml.appendChild(element('p','empty','Nie ma jeszcze żadnych wspomnień.'));
  state.memories.forEach(m => {
    const item=element('article','item'), line=element('div','item-head');
    const detail=element('div'); detail.appendChild(element('p','',m.content));detail.appendChild(element('small','',m.created_at));
    const btn=element('button','danger','Usuń');btn.addEventListener('click',async()=>{
      if(!confirm('Usunąć tę notatkę z pamięci?'))return;
      try{await api('delete-memory',{id:m.id});await refresh();toast('Usunięto notatkę.');}catch(err){toast(err.message);}
    });line.append(detail,btn);item.appendChild(line);ml.appendChild(item);
  });
  const proposals=$('proposal-list');proposals.replaceChildren();
  const pending=state.proposals.filter(p=>p.status==='pending');
  if(!pending.length)proposals.appendChild(element('p','empty','Nie masz oczekujących propozycji.'));
  pending.forEach(p=>{
    const item=element('article','item');item.appendChild(element('h3','',p.title));
    item.appendChild(element('small','',p.kind==='skill'?'UMIEJĘTNOŚĆ':'PLAN KODU · ręczna implementacja'));
    item.appendChild(element('p','',p.description));
    const instruction=element('details');instruction.appendChild(element('summary','','Pokaż szczegóły'));
    instruction.appendChild(element('p','',p.instruction));item.appendChild(instruction);
    const controls=element('div','controls');
    [['Zatwierdź',true,'approve'],['Odrzuć',false,'']].forEach(([label,approve,klass])=>{
      const btn=element('button',klass,label);btn.addEventListener('click',async()=>{
        try{const res=await api('review',{id:p.id,approve});await refresh();toast(res.status==='active'?'Umiejętność aktywowana.':res.status==='approved_for_manual_work'?'Plan zatwierdzony — kod nie został zmieniony.':'Odrzucono.');}
        catch(err){toast(err.message);}
      });controls.appendChild(btn);
    });item.appendChild(controls);proposals.appendChild(item);
  });
  const skills=$('skill-list');skills.replaceChildren();
  if(!state.skills.length)skills.appendChild(element('p','empty','Na razie brak zatwierdzonych umiejętności.'));
  state.skills.forEach(s=>{const item=element('article','item');item.appendChild(element('h3','',s.title));item.appendChild(element('p','',s.instruction));skills.appendChild(item);});
}
async function refresh() {try{const state=await api('state');renderState(state);}catch(err){toast(err.message);}}
$('memory-form').addEventListener('submit', async event=>{
  event.preventDefault();const content=$('memory-input').value.trim();if(!content)return;
  try{await api('remember',{content});$('memory-input').value='';await refresh();toast('Zapisano w pamięci.');}catch(err){toast(err.message);}
});
$('proposal-form').addEventListener('submit',async event=>{
  event.preventDefault();const btn=$('proposal-btn');btn.disabled=true;btn.textContent='Analizuję…';
  try{await api('propose',{goal:$('proposal-goal').value,kind:$('proposal-kind').value});await refresh();toast('Nowa propozycja czeka na Twoją decyzję.');}
  catch(err){toast(err.message);}finally{btn.disabled=false;btn.textContent='✦ Zaproponuj rozwój';}
});
(async()=>{try{const status=await api('status');$('model-caption').textContent=status.model+' · '+status.engine;}catch{}await refresh();})();
