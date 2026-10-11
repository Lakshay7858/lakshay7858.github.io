// =====================================================================
// APLICAÇÃO
// =====================================================================
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SUS_SET = new Set(['SUS','SUSH','SUSE','SUSESP']);
const ROUTES = ['Uso Oral','Uso Intravenoso','Uso Intramuscular','Uso Inalatório','Uso Nasal','Uso Tópico','Uso Oftálmico','Uso Otológico','Uso Retal','Uso Intranasal/IM/EV','Uso Intravenoso/Retal','Orientações'];

let items = [];
let curCat = 'todos', accFilter = 'all', curDx = 'pac', curView = 'rx';

const store = {
  get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
};

function pt(){
  const w = parseFloat($('ptWeight').value) || 0;
  const h = parseFloat($('ptHeight').value) || 0;
  const av = parseFloat($('ptAgeVal').value) || 0;
  const u = $('ptAgeUnit').value;
  const a = u==='meses' ? av/12 : (u==='dias' ? av/365 : av);
  return { w: w>0?w:10, wReal:w, h, a, av, u };
}
const DRUG = Object.fromEntries(DRUG_DATA.map(d => [d.id, d]));

function lookup(ref){
  const [id, vk] = ref.split(':');
  const d = DRUG[id]; if (!d) return null;
  const { w, a } = pt();
  const fn = (vk && d.v && d.v[vk]) ? d.v[vk] : d.calc;
  return { d, res: fn(w, a), ref };
}
function minWarn(d){
  if (!d.min) return '';
  const { wReal, a } = pt();
  if ((d.min.a !== undefined && a < d.min.a) || (d.min.w !== undefined && wReal > 0 && wReal < d.min.w)) return d.min.txt;
  return '';
}
const badge = acc => `<span class="badge ${ACESSO[acc].cls}">${ACESSO[acc].lbl}</span>`;

// ---------------- paciente ----------------
function ageGroup(a){
  if (a < 28/365) return 'Neonato (< 28 dias)';
  if (a < 2) return 'Lactente (< 2 anos)';
  if (a < 10) return 'Criança (2–9 anos)';
  return 'Adolescente (≥ 10 anos)';
}
function estWeight(a){
  if (a < 1) return a*12/2 + 4;
  if (a <= 5) return a*2 + 8;
  if (a <= 12) return a*3 + 7;
  return null;
}
function holliday(w){ return w<=10 ? w*100 : (w<=20 ? 1000+(w-10)*50 : Math.min(1500+(w-20)*20, 2400)); }
function bsa(w,h){ return h>0 ? Math.sqrt(w*h/3600) : (w*4+7)/(w+90); }

function renderChips(){
  const { w, wReal, h, a } = pt();
  $('chipAge').textContent = ageGroup(a);
  const ew = estWeight(a);
  const chips = [
    `SC ${nf(bsa(w,h),2)} m²${h>0?'':' (estimada)'}`,
    `Holliday ${nf(holliday(w),0)} mL/dia · ${nf(holliday(w)/24,1)} mL/h`
  ];
  if (ew) chips.push(`Peso esperado p/ idade ≈ ${nf(ew,1)} kg`);
  $('chipsBio').innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join('');
  if (!wReal) $('chipsBio').insertAdjacentHTML('beforeend','<span class="chip" style="background:var(--danger-bg);color:var(--danger)">Informe o peso — usando 10 kg</span>');
}

// ---------------- segurança ----------------
const ALLERGY_RULES = [
  { re:/penicil|amoxi|ampicil|oxacil|benzetacil|clavul|betalact|beta-lact/, ids:['amox250','amox_alta_sus','amox400','amoxclav_sus','amoxclav_bd','pen_benzatina','pen_cristalina','ampicilina','oxacilina_ev'], msg:'alergia a penicilinas e há penicilina prescrita.' },
  { re:/penicil|amoxi|betalact|cefal|cefa|cef/, ids:['cefalexina','cefadroxila','cefuroxima','cefaclor','ceftriaxona_ev','cefepima'], msg:'cefalosporina com relato de alergia a betalactâmico (reação cruzada baixa, ~1–2%; evitar se anafilaxia).' },
  { re:/sulfa|sulfonamid|bactrim/, ids:['smx_tmp','sulfadiazina'], msg:'alergia a sulfa e há sulfonamida prescrita.' },
  { re:/dipiron|metamizol|novalgin/, ids:['dipirona_gotas','dipirona_inj'], msg:'alergia/intolerância à dipirona.' },
  { re:/aine|ibupro|aas|aspirin|diclofen|cetoprof|nimesul/, ids:['ibuprofeno_50','ibuprofeno_100','cetoprofeno'], msg:'intolerância a AINE e há AINE prescrito.' },
  { re:/azitro|claritro|eritro|macrol/, ids:['azitro','claritro'], msg:'alergia a macrolídeo.' },
  { re:/paracet|acetamin|tylenol/, ids:['paracetamol_gotas','paracetamol_susp'], msg:'alergia ao paracetamol.' }
];
function checkSafety(){
  const all = ($('ptAllergies').value||'').toLowerCase();
  const com = ($('ptComorb').value||'').toLowerCase();
  const ids = items.map(i => (i.ref||'').split(':')[0]);
  const out = [];
  if (all.trim()) ALLERGY_RULES.forEach(r => { if (r.re.test(all)) { const hit = r.ids.filter(x => ids.includes(x)); if (hit.length) out.push('• Relato de ' + r.msg); } });
  if (/dengue|arbovir|chikun/.test(com) && ids.some(x => ['ibuprofeno_50','ibuprofeno_100','cetoprofeno'].includes(x))) out.push('• Suspeita de dengue: AINE contraindicado (risco hemorrágico).');
  if (/epilep|convuls/.test(com) && ids.includes('flumazenil')) out.push('• Flumazenil em paciente com epilepsia pode precipitar crises.');
  items.forEach(i => { const d = DRUG[(i.ref||'').split(':')[0]]; const mw = d && minWarn(d); if (mw) out.push(`• ${d.name}: ${mw}.`); });
  $('safetyBox').hidden = !out.length;
  $('safetyMsg').innerHTML = out.map(esc).join('<br>');
}

// ---------------- catálogo ----------------
function renderFilters(){
  $('catFilters').innerHTML = CATS.map(([k,l]) => `<button class="fbtn" type="button" data-cat="${k}" aria-pressed="${k===curCat}">${l}</button>`).join('');
}
function renderCatalog(){
  const q = ($('searchDrug').value||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const list = DRUG_DATA.filter(d =>
    (curCat==='todos' || d.cat===curCat) &&
    (accFilter==='all' || (accFilter==='sus' ? SUS_SET.has(d.acc) || d.acc==='MISTO' : d.acc==='PART')) &&
    (!q || norm(d.name+' '+d.ind+' '+d.id+' '+d.cat).includes(q)));
  $('catCount').textContent = `${list.length} de ${DRUG_DATA.length} itens`;
  if (!list.length) { $('catalog').innerHTML = '<div class="empty" style="grid-column:1/-1">Nada encontrado com esses filtros.</div>'; return; }
  const { w, a } = pt();
  $('catalog').innerHTML = list.map(d => {
    const r = d.calc(w, a); const mw = minWarn(d);
    return `<article class="dcard">
      <div style="display:flex;justify-content:space-between;gap:6px;align-items:flex-start"><div class="dname">${esc(d.name)}</div></div>
      <div>${badge(d.acc)}</div>
      <div class="dind">${esc(d.ind)}</div>
      ${mw?`<div class="warnline">⚠ ${esc(mw)}</div>`:''}
      <div class="dose">${esc(r.inst)}</div>
      <div class="dfoot"><span class="src">${esc(d.route)}</span><button class="btn btn-line btn-sm" type="button" data-rx="${d.id}">+ Prescrever</button></div>
    </article>`; }).join('');
}

// ---------------- itens prescritos ----------------
function prescribe(ref, silent){
  const L = lookup(ref); if (!L) return;
  items.push({ uid: 'i'+Date.now()+Math.random().toString(36).slice(2,6), ref, title: L.res.title, route: L.d.route, inst: L.res.inst });
  renderRx(); checkSafety(); syncPreview();
  if (!silent) toast('Adicionado à receita: ' + L.res.title);
}
function renderRx(){
  $('countMob').textContent = items.length;
  if (!items.length) { $('rxList').innerHTML = '<div class="empty">Nenhum item ainda. Escolha no catálogo acima ou na aba SUS × Ideal.</div>'; return; }
  $('rxList').innerHTML = items.map((it,i) => `<div class="rxitem">
    <div class="rxitem-h"><span class="num">${i+1}</span>
      <input aria-label="Título do item ${i+1}" value="${esc(it.title)}" data-uid="${it.uid}" data-f="title">
      <select aria-label="Via do item ${i+1}" data-uid="${it.uid}" data-f="route">${ROUTES.map(r=>`<option${r===it.route?' selected':''}>${r}</option>`).join('')}</select>
      <button class="xbtn" type="button" data-del="${it.uid}" aria-label="Remover item ${i+1}">×</button></div>
    <textarea rows="3" aria-label="Posologia do item ${i+1}" data-uid="${it.uid}" data-f="inst">${esc(it.inst)}</textarea></div>`).join('');
}
function recalcItems(){
  items.forEach(it => { if (it.ref && !it.edited) { const L = lookup(it.ref); if (L) { it.title = L.res.title; it.inst = L.res.inst; } } });
  renderRx();
}

// ---------------- folha A4 ----------------
function doc(){ return store.get('prescrimed_doc_cfg') || { name:$('docName').value, crm:$('docCrm').value, esp:$('docEsp').value, inst:$('docInst').value, contact:$('docContact').value }; }
function syncPreview(){
  const d = doc();
  $('vDocName').textContent = d.name; $('vDocEsp').textContent = d.esp; $('vDocCrm').textContent = d.crm;
  $('vDocInst').textContent = d.inst; $('vDocContact').textContent = d.contact;
  $('vFootName').textContent = d.name; $('vFootCrm').textContent = d.crm;
  const { av, u, wReal } = pt();
  $('vPtName').textContent = $('ptName').value || 'Paciente';
  $('vPtBio').textContent = `Idade: ${av} ${u} · Peso: ${wReal ? nf(wReal,1) : '--'} kg${$('ptHeight').value ? ' · Estatura: '+$('ptHeight').value+' cm':''}`;
  const all = $('ptAllergies').value.trim();
  $('vPtAll').textContent = all ? 'Alergias: ' + all : '';
  $('vDate').textContent = new Date().toLocaleDateString('pt-BR');
  if (!items.length) { $('vRx').innerHTML = '<div class="empty" style="color:#94a3b8">Nenhum medicamento selecionado.</div>'; }
  else {
    const groups = {}; items.forEach((it,i) => { (groups[it.route] = groups[it.route] || []).push({it,i}); });
    let n = 0;
    $('vRx').innerHTML = Object.entries(groups).map(([r, arr]) => `<div class="sec-route">${esc(r)}</div>` + arr.map(({it}) => { n++; return `<div class="rx-it"><div class="rx-title">${n}. ${esc(it.title)}</div><div class="rx-inst">${esc(it.inst)}</div></div>`; }).join('')).join('');
  }
  const notes = $('extraNotes').value.trim();
  $('vNotesBox').hidden = !notes; $('vNotes').textContent = notes;
  store.set('prescrimed_draft', { items, notes: $('extraNotes').value });
}
function rxText(){
  const d = doc(); const { av, u, wReal } = pt();
  let t = `${d.name} — ${d.esp} — ${d.crm}\n${d.inst}\n\nPaciente: ${$('ptName').value} · ${av} ${u} · ${wReal?nf(wReal,1):'--'} kg\n`;
  if ($('ptAllergies').value.trim()) t += `Alergias: ${$('ptAllergies').value.trim()}\n`;
  t += `Data: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
  let lastR = '';
  items.forEach((it,i) => { if (it.route !== lastR) { t += `\n${it.route.toUpperCase()}\n`; lastR = it.route; } t += `${i+1}. ${it.title}\n${it.inst}\n\n`; });
  const notes = $('extraNotes').value.trim(); if (notes) t += `ORIENTAÇÕES\n${notes}\n`;
  return t;
}

// ---------------- notas rápidas ----------------
const QUICK = [
  ['Febre', () => '• Febre: dar antitérmico se Tax ≥ 37,8 °C com desconforto; banho morno opcional (não usar álcool ou compressa fria). Retornar se febre > 72 h, criança muito prostrada mesmo sem febre ou manchas na pele.'],
  ['Respiratório', () => '• Retornar imediatamente se respiração rápida, gemência, batimento de asa do nariz, costelas afundando, lábios roxos ou dificuldade para mamar/comer.'],
  ['Diarreia', () => '• Oferecer soro de reidratação após cada evacuação e manter alimentação. Retornar se sangue nas fezes, vômitos que não param, muita sede, olhos fundos, pouca urina ou sonolência.'],
  ['Dengue', () => { const { w } = pt(); const ml = w<=10?130:(w<=20?100:80); return `• Dengue: beber ${nf(w*ml,0)} mL/dia (1/3 soro oral). NÃO usar ibuprofeno, AAS ou anti-inflamatórios. Retornar se dor abdominal forte, vômitos, sangramento, tontura, sonolência ou quando a febre baixar com piora.`; }],
  ['Retorno 48 h', () => '• Retorno para reavaliação em 48–72 h, ou antes se piora.']
];
function renderQuick(){ $('quickNotes').innerHTML = QUICK.map(([l],i) => `<button class="fbtn" type="button" data-q="${i}">+ ${l}</button>`).join(''); }
function addNote(txt){ const t = $('extraNotes'); t.value = (t.value.trim() ? t.value.trim()+'\n' : '') + txt; syncPreview(); }

// ---------------- SUS × IDEAL ----------------
function verdictOf(refs){
  if (!refs.length) return null;
  const accs = refs.map(r => (DRUG[r.split(':')[0]]||{}).acc).filter(Boolean);
  const sus = accs.filter(a => SUS_SET.has(a)).length, part = accs.filter(a => a==='PART').length;
  if (sus === accs.length) return { cls:'v-sus', dot:'dot-sus', txt:'Disponível no SUS' };
  if (part === accs.length) return { cls:'v-part', dot:'dot-part', txt:'Só particular / pago' };
  return { cls:'v-misto', dot:'dot-misto', txt:'Parte no SUS, parte particular' };
}
function renderDxList(){
  const q = ($('dxSearch').value||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  let html = '', n = 0;
  GRUPOS.forEach(g => {
    const list = CONDUTAS.filter(c => c.grupo===g && (!q || norm(c.nome+' '+c.chave).includes(q)));
    if (!list.length) return;
    html += `<div class="dx-group">${g}</div>` + list.map(c => { n++; const v = verdictOf(c.ideal.itens); return `<button class="dx-btn" type="button" data-dx="${c.id}" aria-current="${c.id===curDx}"><span class="dot ${v?v.dot:'dot-sus'}"></span>${esc(c.nome)}</button>`; }).join('');
  });
  $('dxList').innerHTML = html || '<div class="empty">Nenhum diagnóstico encontrado.</div>';
  $('dxCount').textContent = `${CONDUTAS.length} condutas`;
}
function rxRows(refs){
  return refs.map(ref => { const L = lookup(ref); if (!L) return ''; const mw = minWarn(L.d);
    return `<div class="rx-row"><div style="min-width:0"><div class="t">${esc(L.res.title)} ${badge(L.d.acc)}</div>${mw?`<div class="warnline" style="margin-bottom:5px">⚠ ${esc(mw)}</div>`:''}<div class="dose">${esc(L.res.inst)}</div></div>
      <button class="btn btn-line btn-sm" type="button" data-rx="${ref}">+ Prescrever</button></div>`; }).join('');
}
function renderDx(){
  const c = CONDUTAS.find(x => x.id===curDx) || CONDUTAS[0]; curDx = c.id;
  const { w, a } = pt();
  const vI = verdictOf(c.ideal.itens);
  const susSame = c.sus === 'igual';
  const susRefs = susSame ? c.ideal.itens : c.sus.itens;
  const vS = verdictOf(susRefs);
  const orient = c.orientFn ? c.orientFn(w, a) : c.orient;
  let h = `<div class="dx-title">${esc(c.nome)}</div><div class="dx-when">${esc(c.quando)}</div>`;
  h += `<div class="opt opt-ideal"><div class="opt-h"><h4>★ Opção ideal ${vI?`<span class="verdict ${vI.cls}">${vI.txt}</span>`:''}</h4><span class="src">${esc(c.ideal.fonte)}</span></div>
    <div class="opt-b"><div class="note">${esc(c.ideal.nota)}</div>${rxRows(c.ideal.itens)}
    <div><button class="btn btn-primary btn-sm" type="button" data-rxall="ideal">Prescrever opção ideal completa</button></div></div></div>`;
  h += `<div class="opt opt-sus"><div class="opt-h"><h4>Opção SUS ${vS?`<span class="verdict ${vS.cls}">${vS.txt}</span>`:'<span class="verdict v-part">Sem opção na RENAME</span>'}</h4><span class="src">RENAME 2024 · Componentes Básico/Estratégico/Especializado</span></div>
    <div class="opt-b">${susSame ? '<div class="note">A opção ideal já é a disponível no SUS — mesma prescrição, mesmas doses.</div>' : `<div class="note">${esc(c.sus.nota)}</div>${rxRows(susRefs)}`}
    ${susRefs.length?'<div><button class="btn btn-primary btn-sm" type="button" data-rxall="sus">Prescrever opção SUS completa</button></div>':''}</div></div>`;
  (c.alt||[]).forEach((al,i) => { h += `<div class="opt opt-alt"><div class="opt-h"><h4>Alternativa · ${esc(al.label)}</h4></div><div class="opt-b">${rxRows(al.itens)}</div></div>`; });
  h += `<div class="opt"><div class="opt-h" style="background:var(--surface-2)"><h4>Orientações e sinais de alarme</h4><button class="btn btn-line btn-sm" type="button" data-addorient="1">Adicionar à receita</button></div><div class="opt-b"><div class="orient">${esc(orient)}</div></div></div>`;
  $('dxDetail').innerHTML = h;
}

// ---------------- calculadoras ----------------
function vitalRow(a){
  const rows = [
    ['RN (0–28 d)', 0, 28/365, '30–60', '100–205', '< 60'],
    ['1–12 meses', 28/365, 1, '30–53', '100–180', '< 70'],
    ['1–2 anos', 1, 3, '22–37', '98–140', '< 70 + 2×idade'],
    ['3–5 anos', 3, 6, '20–28', '80–120', '< 70 + 2×idade'],
    ['6–11 anos', 6, 12, '18–25', '75–118', '< 70 + 2×idade (até 10 a)'],
    ['≥ 12 anos', 12, 99, '12–20', '60–100', '< 90']
  ];
  return rows.map(r => `<tr class="${a>=r[1]&&a<r[2]?'hl':''}"><td>${r[0]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('');
}
function renderCalc(){
  const { w, h, a } = pt();
  const hol = holliday(w), ew = estWeight(a);
  const tCuff = a>=1 ? a/4+3.5 : (a<1/12?3.0:3.5), tSem = a>=1 ? a/4+4 : (a<1/12?3.5:4.0);
  const blade = a<1/12?'0 (reta)':(a<1?'1 (reta)':(a<6?'2':(a<12?'2–3':'3')));
  const taqui = a<1/6?'≥ 60':(a<1?'≥ 50':(a<5?'≥ 40':'≥ 30 (5–12 a, referência)'));
  const hv = DRUG.hv_manutencao.calc(w,a), pc = DRUG.plano_c.calc(w,a);
  const dengueMl = w<=10?130:(w<=20?100:80);
  $('calcGrid').innerHTML = `
  <div class="card"><div class="card-h"><h3>Biometria e necessidades</h3></div><dl class="kv">
    <dt>Peso usado</dt><dd>${nf(w,1)} kg</dd>
    <dt>Peso esperado p/ idade</dt><dd>${ew?nf(ew,1)+' kg':'—'}</dd>
    <dt>Superfície corpórea</dt><dd>${nf(bsa(w,h),2)} m² ${h>0?'(Mosteller)':'(fórmula peso)'}</dd>
    <dt>Holliday-Segar</dt><dd>${nf(hol,0)} mL/dia · ${nf(hol/24,1)} mL/h</dd>
    <dt>Peso calórico</dt><dd>${nf(hol/100,1)} kg</dd>
    <dt>Diurese mínima</dt><dd>${nf(w*1,0)} mL/h (1 mL/kg/h)</dd>
    <dt>Concentrado de hemácias</dt><dd>${nf(w*10,0)}–${nf(w*15,0)} mL (10–15 mL/kg)</dd>
    <dt>Plaquetas</dt><dd>${nf(w*10,0)} mL (10 mL/kg) ou 1 U/7–10 kg</dd>
    <dt>Plasma fresco</dt><dd>${nf(w*10,0)}–${nf(w*15,0)} mL</dd></dl></div>
  <div class="card"><div class="card-h"><h3>Soro de manutenção isotônico</h3></div><div class="dose">${esc(hv.title)}\n${esc(hv.inst)}</div><div style="margin-top:8px"><button class="btn btn-line btn-sm" type="button" data-rx="hv_manutencao">+ Prescrever</button></div></div>
  <div class="card"><div class="card-h"><h3>Via aérea e SRI</h3></div><dl class="kv">
    <dt>Tubo com cuff</dt><dd>${nf(tCuff,1)} mm</dd>
    <dt>Tubo sem cuff</dt><dd>${nf(tSem,1)} mm</dd>
    <dt>Fixação na rima labial</dt><dd>${nf(tCuff*3,1)} cm (3 × tubo)</dd>
    <dt>Lâmina</dt><dd>${blade}</dd>
    <dt>Sonda de aspiração</dt><dd>${nf(tCuff*2,0)} Fr</dd>
    <dt>Volume corrente</dt><dd>${nf(w*6,0)}–${nf(w*8,0)} mL (6–8 mL/kg)</dd>
    <dt>Desfibrilação</dt><dd>${nf(w*2,0)} J → ${nf(w*4,0)} J</dd>
    <dt>Adrenalina PCR</dt><dd>${nf(cap(w*0.1,10),1)} mL de 0,1 mg/mL</dd></dl></div>
  <div class="card"><div class="card-h"><h3>Sinais vitais de referência</h3><span class="src">PALS/AHA · linha da idade destacada</span></div>
    <div class="tbl-wrap"><table class="vt"><thead><tr><th>Idade</th><th>FR</th><th>FC acordado</th><th>Hipotensão (PAS)</th></tr></thead><tbody>${vitalRow(a)}</tbody></table></div>
    <p class="src" style="margin-top:8px">Taquipneia (OMS) para esta idade: FR ${taqui} irpm.</p></div>
  <div class="card"><div class="card-h"><h3>Reidratação</h3></div><dl class="kv">
    <dt>Plano B (TRO)</dt><dd>${nf(w*50,0)}–${nf(w*100,0)} mL em 4–6 h</dd>
    <dt>Bólus cristaloide</dt><dd>${nf(w*10,0)}–${nf(w*20,0)} mL</dd>
    <dt>Dengue — VO/dia</dt><dd>${nf(w*dengueMl,0)} mL (${dengueMl} mL/kg; ⅓ SRO)</dd>
    <dt>Dengue grupo C</dt><dd>${nf(w*10,0)} mL/h na 1ª hora (10 mL/kg)</dd></dl>
    <div class="dose" style="margin-top:9px">${esc(pc.title)}\n${esc(pc.inst)}</div></div>
  <div class="card"><div class="card-h"><h3>Glicose</h3></div><dl class="kv">
    <dt>Bólus hipoglicemia</dt><dd>${nf(w*(a<1/12?2:3),0)} mL de SG 10%</dd>
    <dt>TIG 5 mg/kg/min</dt><dd>${nf(w*5*1.44,1)} g/dia</dd>
    <dt>TIG 8 mg/kg/min</dt><dd>${nf(w*8*1.44,1)} g/dia</dd>
    <dt>Glucagon IM</dt><dd>${w<25?'0,5 mg':'1 mg'}</dd></dl></div>`;
}

// ---------------- fontes ----------------
const REFS = [
  ['Sociedade Brasileira de Pediatria — Consenso sobre Anemia Ferropriva (atualização 2021)', 'https://www.sbp.com.br/fileadmin/user_upload/23172c-Diretrizes-Consenso_sobre_Anemia_Ferropriva.pdf'],
  ['Ministério da Saúde — RENAME 2024 (Relação Nacional de Medicamentos Essenciais)', 'https://www.gov.br/saude/pt-br/composicao/sectics/rename'],
  ['Ministério da Saúde — Guia de Manejo e Tratamento de Influenza 2023 (resumo SES-RJ 2026)', 'https://www.rj.gov.br/saude/sites/default/files/arquivo_pagina_basica/NOTA-INFORMATIVA-04-2026-COOGAF-SUPAFIE-SAS-SES-RJ-Orientacoes-gerais-sobre-o-medicamento-Oseltamivir-para-o-tratamento-de-Influenza.pdf'],
  ['Ministério da Saúde — Nota Técnica 134/2025: suplementação de vitamina A', 'https://www.saude.sc.gov.br/index.php/pt/atencao-primaria-a-saude/gerencias-da-aps/gapps/nota-tecnica-conjunta-n-134-2025-cgan-deppros-saps-ms-cgesco-desco-saps-ms/download'],
  ['Nirsevimabe no SUS — Nota Técnica 109/2025', 'https://portal.afya.com.br/pediatria/nirsevimabe-no-sus-maternidades-publicas-terao-o-imunizante-em-2026'],
  ['PCDT Asma — Portaria Conjunta nº 43/2026 (resumo SES-SC)', 'https://www.saude.sc.gov.br/index.php/pt/servicos/assistencia-farmaceutica-diaf/componente-especializado-da-assistencia-farmaceutica-ceaf/protocolos-clinicos-ter-resumos-e-formularios/asma/resumo-asma/download'],
  ['GINA 2026 — mudanças em crianças (resumo)', 'https://thelimbic.com/?p=20607988'],
  ['AHA 2025 — PALS: principais mudanças', 'https://journalfeed.org/article-a-day/2025/new-2025-aha-pals-refining-how-we-resuscitate/'],
  ['OMS 2024 — Management of pneumonia and diarrhoea in children up to 10 years', 'https://guidelinecentral.com/guideline/4223408'],
  ['Dengue — fluxograma de manejo 2024 (MS/SES-SC)', 'https://protocolodengue.saude.sc.gov.br/app_dengue/Fluxograma-manejo-dengue-2024.pdf'],
  ['Hospital Israelita Albert Einstein — Pathway OMA em crianças (AAP 2023 · SBP 2023)', 'https://medicalsuite.einstein.br/pratica-medica/Pathways/Otite%20Me%CC%81dia%20Aguda%20em%20Crianc%CC%A7as%20e%20Adolescentes%20V.4.pdf']
];
const MATERIAIS = ['Manual de Prescrições Pediátricas 2026 (Instituto Cafeína)', 'Pediatria de Bolso 2026', 'Guia Prático de Prescrição — Pediatria (Medconexão)', 'Manual de Sobrevivência do Residente de Pediatria (HIAS)', 'Mini Guia de Pediatria — Condutas e Doses no plantão', 'Macetes de Pediatria (HRO e HLF)', 'Puericultura atual', 'Black Book do PSF (seção Pediatria)', 'Manual de Procedimentos Médicos 2025', 'Guia de medicações (USA)'];
function renderRefs(){
  $('refCard').innerHTML = `<div class="card-h"><h3>Fontes</h3></div>
  <p style="font-size:.8rem;max-width:95ch">As doses partem dos seus materiais e foram conferidas com as diretrizes abaixo. Quando havia divergência, prevaleceu a diretriz mais recente (por exemplo: OMA com amoxicilina 80–90 mg/kg/dia pela AAP 2023, ferro profilático pela SBP 2021, oseltamivir pelo MS, SABA isolado substituído por budesonida-formoterol na GINA 2026).</p>
  <h4 style="font-size:.78rem;margin:12px 0 6px">Diretrizes e documentos oficiais</h4>
  <ul class="refs">${REFS.map(([t,u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('')}</ul>
  <h4 style="font-size:.78rem;margin:12px 0 6px">Seus materiais usados como base</h4>
  <ul class="refs">${MATERIAIS.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  <h4 style="font-size:.78rem;margin:12px 0 6px">Como ler a disponibilidade</h4>
  <div style="display:flex;gap:6px;flex-wrap:wrap">${Object.keys(ACESSO).map(badge).join('')}</div>
  <p class="disclaimer">“SUS · RENAME básico” indica presença na RENAME 2024; a oferta real depende da REMUME do município. “SUS parcial” = parte das apresentações no SUS ou presente só em algumas REMUMEs. Ferramenta de apoio para médicos e estudantes sob supervisão: confira peso, função renal, interações e bula antes de prescrever.</p>`;
}

// ---------------- navegação e eventos ----------------
function setView(v){
  curView = v;
  ['rx','sus','calc','ref'].forEach(k => { $('view-'+k).hidden = k!==v; $('tab-'+k).setAttribute('aria-selected', k===v); });
  if (v==='sus') { renderDxList(); renderDx(); }
  if (v==='calc') renderCalc();
  try { history.replaceState(null, '', '#'+v); } catch(e){}
  store.set('prescrimed_view', v);
}
let toastT;
function toast(m){ const t = $('toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2200); }

function refreshAll(){ renderChips(); renderCatalog(); recalcItems(); checkSafety(); syncPreview(); if (curView==='sus') renderDx(); if (curView==='calc') renderCalc(); }

document.addEventListener('click', e => {
  const t = e.target.closest('button,[data-rx]'); if (!t) return;
  if (t.dataset.view) return setView(t.dataset.view);
  if (t.dataset.cat) { curCat = t.dataset.cat; renderFilters(); renderCatalog(); return; }
  if (t.dataset.acc) { accFilter = t.dataset.acc; document.querySelectorAll('[data-acc]').forEach(b => b.setAttribute('aria-pressed', b===t)); renderCatalog(); return; }
  if (t.dataset.rx) return prescribe(t.dataset.rx);
  if (t.dataset.del) { items = items.filter(i => i.uid!==t.dataset.del); renderRx(); checkSafety(); syncPreview(); return; }
  if (t.dataset.q !== undefined) return addNote(QUICK[+t.dataset.q][1]());
  if (t.dataset.dx) { curDx = t.dataset.dx; renderDxList(); renderDx(); if (window.innerWidth < 1100) $('dxDetail').scrollIntoView({behavior:'smooth', block:'start'}); return; }
  if (t.dataset.rxall) { const c = CONDUTAS.find(x => x.id===curDx); const refs = t.dataset.rxall==='ideal' ? c.ideal.itens : (c.sus==='igual' ? c.ideal.itens : c.sus.itens); refs.forEach(r => prescribe(r, true)); toast(`${refs.length} item(ns) adicionados — veja a aba Prescrição`); return; }
  if (t.dataset.addorient) { const c = CONDUTAS.find(x => x.id===curDx); const { w, a } = pt(); addNote(c.orientFn ? c.orientFn(w,a) : c.orient); toast('Orientações adicionadas à receita'); return; }
  switch (t.id) {
    case 'btnClear': $('clearZone').innerHTML = '<span class="src" style="margin-right:6px">Limpar todos os itens?</span><button class="btn btn-danger btn-sm" id="btnClearYes" type="button">Sim, limpar</button> <button class="btn btn-sm" id="btnClearNo" type="button">Cancelar</button>'; break;
    case 'btnClearYes': items = []; renderRx(); checkSafety(); syncPreview(); // fallthrough
    case 'btnClearNo': $('clearZone').innerHTML = '<button class="btn btn-danger btn-sm" id="btnClear" type="button">Limpar tudo</button>'; break;
    case 'btnAddCustom': {
      const n = $('custName').value.trim(); if (!n) { $('custName').focus(); toast('Digite o nome do medicamento ou da conduta.'); break; }
      items.push({ uid:'c'+Date.now(), ref:'', title:n, route:$('custRoute').value, inst:$('custInst').value.trim() || 'Conforme orientação médica.', edited:true });
      $('custName').value=''; $('custInst').value=''; renderRx(); syncPreview(); break; }
    case 'btnDoctor': $('docModal').hidden = false; $('docName').focus(); break;
    case 'docClose': $('docModal').hidden = true; break;
    case 'docSave': store.set('prescrimed_doc_cfg', { name:$('docName').value, crm:$('docCrm').value, esp:$('docEsp').value, inst:$('docInst').value, contact:$('docContact').value }); $('docModal').hidden = true; syncPreview(); toast('Dados do médico salvos'); break;
    case 'btnCopy': { const txt = rxText(); if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => toast('Receita copiada'), () => fallbackCopy(txt)); else fallbackCopy(txt); break; }
    case 'btnPrint': window.print(); break;
    case 'segEditor': case 'segPreview': { const mob = t.id==='segEditor'?'editor':'preview'; $('split').dataset.mob = mob; $('segEditor').setAttribute('aria-pressed', mob==='editor'); $('segPreview').setAttribute('aria-pressed', mob==='preview'); break; }
  }
});
function fallbackCopy(txt){
  const ta = document.createElement('textarea'); ta.value = txt; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select();
  let ok = false; try { ok = document.execCommand('copy'); } catch(e){}
  document.body.removeChild(ta); toast(ok ? 'Receita copiada' : 'Não foi possível copiar automaticamente — selecione o texto da folha.');
}
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset && t.dataset.uid) { const it = items.find(i => i.uid===t.dataset.uid); if (it) { it[t.dataset.f] = t.value; it.edited = true; checkSafety(); syncPreview(); } return; }
  if (['ptWeight','ptHeight','ptAgeVal'].includes(t.id)) return refreshAll();
  if (['ptName','extraNotes'].includes(t.id)) return syncPreview();
  if (['ptAllergies','ptComorb'].includes(t.id)) { checkSafety(); syncPreview(); return; }
  if (t.id==='searchDrug') return renderCatalog();
  if (t.id==='dxSearch') return renderDxList();
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset && t.dataset.uid) { const it = items.find(i => i.uid===t.dataset.uid); if (it) { it[t.dataset.f] = t.value; syncPreview(); } return; }
  if (['ptAgeUnit','ptSex'].includes(t.id)) refreshAll();
});
document.addEventListener('keydown', e => { if (e.key==='Escape' && !$('docModal').hidden) $('docModal').hidden = true; });

// ---------------- início ----------------
(function init(){
  let inFrame = true; try { inFrame = window.self !== window.top; } catch(e){}
  $('btnPrint').hidden = inFrame;
  $('custRoute').innerHTML = ROUTES.map(r => `<option>${r}</option>`).join('');
  const dc = store.get('prescrimed_doc_cfg'); if (dc) { $('docName').value=dc.name||''; $('docCrm').value=dc.crm||''; $('docEsp').value=dc.esp||''; $('docInst').value=dc.inst||''; $('docContact').value=dc.contact||''; }
  const dr = store.get('prescrimed_draft');
  if (dr && Array.isArray(dr.items) && dr.items.length) { items = dr.items; $('extraNotes').value = dr.notes || ''; }
  else { ['amox250','dipirona_gotas','lavagem_nasal'].forEach(r => prescribe(r, true)); $('extraNotes').value = QUICK[1][1](); }
  renderFilters(); renderQuick(); renderRefs();
  refreshAll();
  const h = (location.hash||'').replace('#','');
  setView(['rx','sus','calc','ref'].includes(h) ? h : (store.get('prescrimed_view') || 'rx'));
})();
