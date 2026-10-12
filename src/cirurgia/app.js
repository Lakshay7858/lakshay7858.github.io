// Cirurgia — navegação, render das abas e eventos.
REFS.dbh2025[1] = '';
DESCS.forEach((d) => { if (d.cat === 'Procedimentos') d.cat = 'Beira-leito (fora do centro cirúrgico)'; });
const VIEWS = ['clin', 'desc', 'rx', 'peri', 'calc', 'ref'];
const ST = { view: 'clin', clin: 'aa', desc: 'c_colec', ps: 'preop', psf: 'all' };
SC_ST.id = 'air';
CALC_ST.id = 'queim';

function renderChips() {
  const p = P(); const c = [];
  if (p.pp) c.push(`Peso predito ${nf(p.pp, 1)} kg`);
  if (p.imc) c.push(`IMC ${nf(p.imc, 1)}${p.imc >= 30 ? ` · peso ajustado ${nf(p.aj, 1)} kg` : ''}`);
  if (p.clcr) c.push(`ClCr (CG) ${nf(p.clcr, 0)} mL/min`);
  if (p.egfr) c.push(`TFG CKD-EPI ${nf(p.egfr, 0)}`);
  if (p.w) c.push(`Cefazolina profilática ${p.w >= 120 ? '3 g' : '2 g'}`);
  $('chipsBio').innerHTML = c.map((t) => `<span class="chip">${esc(t)}</span>`).join('');
  $('chipAge').textContent = p.age >= 65 ? 'Idoso' : 'Adulto';
  const al = ($('ptAllergies').value || '').trim();
  if (al) $('chipsBio').insertAdjacentHTML('beforeend', `<span class="chip" style="background:var(--danger-bg);color:var(--danger)">Alergia: ${esc(al)}</span>`);
  store.set('dc_em_pt', { sex: $('ptSex').value, age: $('ptAge').value, w: $('ptWeight').value, h: $('ptHeight').value, cr: $('ptCr').value });
}
function navList(arr, key, cur, q, order) {
  const f = norm(q || '');
  const cats = order || [...new Set(arr.map((t) => t.cat))];
  let h = '';
  cats.forEach((c) => {
    const ts = arr.filter((t) => t.cat === c && (!f || norm(t.title + ' ' + (t.alias || []).join(' ')).includes(f)));
    if (ts.length) h += `<div class="dx-group">${esc(c)}</div>` + ts.map((t) => `<button class="dx-btn" type="button" data-${key}="${t.id}" aria-current="${t.id === cur}"><span class="dot c-${t.cor || 'azul'}"></span>${esc(t.title)}</button>`).join('');
  });
  return h || '<div class="empty">Nada encontrado.</div>';
}
function topicHTML(t, withProc) {
  const p = P();
  let h = `<div class="sv-kick">${esc(t.cat)}</div><div class="dx-title"><span class="sv-dot c-${t.cor || 'azul'}"></span>${esc(t.title)}</div><p class="sv-lead">${md(t.resumo)}</p>`;
  if (!withProc) h += p.has ? `<p class="sv-wnote">Doses calculadas para <b>${nf(p.w, 1)} kg</b>${p.clcr ? ` · ClCr ${nf(p.clcr, 0)} mL/min` : ''}.</p>` : `<p class="sv-wnote">Informe o <b>peso</b> na barra do paciente para ver doses calculadas.</p>`;
  if (withProc) h += icHTML(t);
  t.secs.forEach((s) => { h += `<section class="sv-s"><h4>${esc(s.h)}</h4>${s.li ? `<ul>${s.li.map((l) => `<li>${lineHTML(l, p)}</li>`).join('')}</ul>` : ''}${s.table ? tableHTML(s.table) : ''}</section>`; });
  (t.rx || []).forEach((r, i) => { h += `<div class="opt sv-rx"><div class="opt-h"><h4>${esc(r.h)}</h4><button class="btn btn-line btn-sm" type="button" data-rxcopy="${i}">Copiar</button></div><ol class="rx-ol">${r.li.map((l) => `<li>${lineHTML(l, p)}</li>`).join('')}</ol></div>`; });
  if (withProc) { h += icPosHTML(t); if (t.proc) h += procFormHTML(t); }
  const fs = (t.fontes || []).map((k) => REFS[k]).filter(Boolean);
  if (fs.length) h += `<div class="sv-src"><b>Fontes:</b> ${fs.map(([n, u]) => (u ? `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>` : esc(n))).join(' · ')}</div>`;
  h += `<p class="disclaimer">Material de apoio. A decisão cirúrgica é do cirurgião responsável; confira protocolos do serviço, doses, função renal e alergias.</p>`;
  return h;
}
const DESC_ORDER = () => { const c = [...new Set(DESCS.map((d) => d.cat))]; const b = c.filter((x) => x.startsWith('Beira')); return [...c.filter((x) => !x.startsWith('Beira')), ...b]; };
function renderClin() { $('clinNav').innerHTML = navList(CLIN, 'clin', ST.clin, $('clinSearch').value); $('clinCount').textContent = `${CLIN.length} temas`; $('clinMain').innerHTML = topicHTML(CLIN.find((x) => x.id === ST.clin) || CLIN[0], false); }
function renderDesc() {
  $('descNav').innerHTML = navList(DESCS, 'desc', ST.desc, $('descSearch').value, DESC_ORDER());
  const nCC = DESCS.filter((d) => !d.cat.startsWith('Beira')).length;
  $('descCount').textContent = `${nCC} no centro cirúrgico · ${DESCS.length - nCC} à beira-leito`;
  $('descMain').innerHTML = topicHTML(DESCS.find((x) => x.id === ST.desc) || DESCS[0], true);
}

// ---------- prescrições ----------
const passPs = (acc) => ST.psf === 'all' || (ST.psf === 'sus' ? acc !== 'PART' : acc === 'PART');
const itemTxt = (it, p) => (typeof it[0] === 'function' ? it[0](p) : it[0]);
function psList(items, p) {
  const f = (items || []).filter((it) => passPs(it[1]));
  if (!f.length) return `<div class="empty" style="padding:8px">${(items || []).length ? 'Nenhum item com o filtro atual.' : '—'}</div>`;
  return `<ol class="rx-ol">${f.map((it) => `<li>${md(itemTxt(it, p))} ${accTag(it[1])}</li>`).join('')}</ol>`;
}
function verdictPs(items) { const a = (items || []).map((i) => i[1]); if (!a.length) return ''; const part = a.filter((x) => x === 'PART').length; return !part ? '<span class="verdict v-sus">Tudo no SUS</span>' : part === a.length ? '<span class="verdict v-part">Só particular</span>' : '<span class="verdict v-misto">Parte particular</span>'; }
const susOf = (x) => (x.sus === 'igual' ? null : { ...x.sus, ps: x.sus.ps === 'ideal' ? x.ideal.ps : x.sus.ps });
function psText(x, which, p) {
  const o = which === 'sus' && susOf(x) ? susOf(x) : x.ideal;
  const ps = o.ps.filter((i) => passPs(i[1])).map((i, k) => `${k + 1}. ${itemTxt(i, p).replace(/\*\*/g, '')}`);
  const al = o.alta.filter((i) => passPs(i[1])).map((i, k) => `${k + 1}. ${itemTxt(i, p).replace(/\*\*/g, '')}`);
  let t = `${x.nome.toUpperCase()}${$('ptName').value ? ' — ' + $('ptName').value : ''}\n`;
  if (ps.length) t += `\nPRESCRIÇÃO\n${ps.join('\n')}\n`;
  if (al.length) t += `\nRECEITA DE ALTA\n${al.join('\n')}\n`;
  if (x.orient && x.orient !== '—') t += `\nORIENTAÇÕES\n${x.orient.replace(/\*\*/g, '')}`;
  return t;
}
function renderPs() {
  const f = norm($('psSearch').value || ''); const grupos = [...new Set(PSX.map((x) => x.grupo))];
  $('psNav').innerHTML = grupos.map((g) => { const ls = PSX.filter((x) => x.grupo === g && (!f || norm(x.nome).includes(f))); return ls.length ? `<div class="dx-group">${esc(g)}</div>` + ls.map((x) => `<button class="dx-btn" type="button" data-ps="${x.id}" aria-current="${x.id === ST.ps}"><span class="dot ${[...x.ideal.ps, ...x.ideal.alta].some((i) => i[1] === 'PART') ? 'dot-misto' : 'dot-sus'}"></span>${esc(x.nome)}</button>`).join('') : ''; }).join('');
  $('psCount').textContent = `${PSX.length} prescrições`;
  const x = PSX.find((y) => y.id === ST.ps) || PSX[0], p = P(), sus = susOf(x);
  const blk = (o, k) => `${o.ps.length ? `<div class="sv-kick" style="margin-top:6px;color:var(--accent)">Prescrição</div>${psList(o.ps, p)}` : ''}${o.alta.length ? `<div class="sv-kick" style="margin-top:6px;color:var(--accent)">Receita de alta</div>${psList(o.alta, p)}` : ''}<div><button class="btn btn-primary btn-sm" type="button" data-pscopy="${k}">Copiar</button></div>`;
  let h = `<div class="dx-title">${esc(x.nome)}</div><div class="dx-when">${md(x.quando)}</div>${x.exames ? `<div class="note" style="margin:8px 0"><b>Exames:</b> ${md(x.exames)}</div>` : ''}`;
  h += `<div class="opt opt-ideal"><div class="opt-h"><h4>★ Opção ideal ${verdictPs([...x.ideal.ps, ...x.ideal.alta])}</h4><span class="src">${esc(x.fonte)}</span></div><div class="opt-b"><div class="note">${md(x.ideal.nota)}</div>${blk(x.ideal, 'ideal')}</div></div>`;
  h += `<div class="opt opt-sus"><div class="opt-h"><h4>Opção SUS ${sus ? verdictPs([...sus.ps, ...sus.alta]) : '<span class="verdict v-sus">Igual à ideal</span>'}</h4><span class="src">RENAME 2024 · REMUME local</span></div><div class="opt-b">${sus ? `<div class="note">${md(sus.nota)}</div>${blk(sus, 'sus')}` : '<div class="note">A opção ideal usa itens disponíveis no SUS (itens "particular" têm alternativa indicada).</div>'}</div></div>`;
  if (x.orient && x.orient !== '—') h += `<div class="opt"><div class="opt-h" style="background:var(--surface-2)"><h4>Orientações e sinais de alerta</h4></div><div class="opt-b"><div class="orient">${md(x.orient)}</div></div></div>`;
  h += `<p class="disclaimer">Ajuste doses à função renal (ClCr na barra), alergias, gestação e protocolos do serviço.</p>`;
  $('psMain').innerHTML = h;
}

// ---------- perioperatório ----------
function renderPeri() {
  $('periNav').innerHTML = PERI.map((s) => `<button class="dx-btn" type="button" data-peri="${s.id}" aria-current="${s.id === PERI_ST.id}"><span class="dot dot-sus"></span>${esc(s.nome)}</button>`).join('');
  const s = PERI.find((x) => x.id === PERI_ST.id) || PERI[0];
  $('periMain').innerHTML = `<div class="dx-title">${esc(s.nome)}</div>` + s.html() + `<div class="sv-src"><b>Fontes:</b> ${['sbc_periop2024', 'accaha2024periop', 'asa2023fast', 'glp1_2024', 'ashp2013', 'asra2018', 'ehra2021', 'eras2018'].map((k) => REFS[k]).map(([n, u]) => (u ? `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>` : esc(n))).join(' · ')}</div>`;
  acCalc();
}

// ---------- calculadoras / fontes ----------
function renderCalc() {
  $('calcNav').innerHTML = [...CALCS, { id: 'escores', nome: 'Escores clínicos' }].map((c) => `<button class="fbtn" type="button" data-calc="${c.id}" aria-pressed="${c.id === CALC_ST.id}">${esc(c.nome)}</button>`).join('');
  if (CALC_ST.id === 'escores') { $('calcMain').innerHTML = scoreHTML(); return; }
  const c = CALCS.find((x) => x.id === CALC_ST.id) || CALCS[0];
  $('calcMain').innerHTML = `<div class="dx-title" style="font-size:1rem">${esc(c.nome)}</div>` + calcForm(c.id); calcRun();
}
function renderRefs() {
  $('refCard').innerHTML = `<div class="card-h"><h3>Fontes e diretrizes</h3><span class="src">atualizado out/2026</span></div><ul class="refs">${Object.values(REFS).map(([n, u]) => `<li>${u ? `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>` : esc(n)}</li>`).join('')}</ul>
  <h4 style="font-size:.78rem;margin:12px 0 6px">Seus materiais usados como base (não publicados no site)</h4><ul class="refs">${[...MATERIAIS_CIR, ...MATERIAIS_EM].map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  <p class="disclaimer">Ferramenta de apoio. Nenhum dado de paciente é enviado ao servidor.</p>`;
}

function setView(v) {
  if (!VIEWS.includes(v)) v = 'clin'; ST.view = v;
  VIEWS.forEach((k) => { $('view-' + k).hidden = k !== v; $('tab-' + k).setAttribute('aria-selected', k === v); });
  refreshView(); try { history.replaceState(null, '', '#' + v); } catch (e) {} store.set('dc_cir_view', v);
}
function refreshView() { ({ clin: renderClin, desc: renderDesc, rx: renderPs, peri: renderPeri, calc: renderCalc, ref: () => {} })[ST.view](); }
const scrollMain = (id) => { if (window.innerWidth < 1100) $(id).scrollIntoView({ behavior: 'smooth', block: 'start' }); else window.scrollTo({ top: 0 }); };
function pfUpdate(el) {
  const tp = DESCS.find((x) => x.id === ST.desc); if (!tp || !tp.proc) return;
  (PF_ST[tp.id] || (PF_ST[tp.id] = {}))[el.dataset.pf] = el.value;
  if (el.tagName === 'SELECT') { const y = window.scrollY; renderDesc(); window.scrollTo(0, y); return; }
  $('pfOut').textContent = tp.proc.texto(procValues(tp), P());
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('button'); if (!t) return; const d = t.dataset;
  if (d.view) return setView(d.view);
  if (d.clin) { ST.clin = d.clin; store.set('dc_cir_clin', d.clin); renderClin(); return scrollMain('clinMain'); }
  if (d.desc) { ST.desc = d.desc; store.set('dc_cir_desc', d.desc); renderDesc(); return scrollMain('descMain'); }
  if (d.rxcopy !== undefined) { const arr = ST.view === 'desc' ? DESCS : CLIN, id = ST.view === 'desc' ? ST.desc : ST.clin; const tp = arr.find((x) => x.id === id), p = P(), r = tp.rx[+d.rxcopy]; return copyText(`${r.h.toUpperCase()}\n` + r.li.map((l, i) => `${i + 1}. ${lineTXT(l, p)}`).join('\n'), 'Copiado'); }
  if (t.id === 'pfReset') { PF_ST[ST.desc] = {}; return renderDesc(); }
  if (t.id === 'pfCopy') return copyText($('pfOut').textContent, 'Descrição copiada');
  if (d.ps) { ST.ps = d.ps; renderPs(); return scrollMain('psMain'); }
  if (d.psf) { ST.psf = d.psf; document.querySelectorAll('[data-psf]').forEach((b) => b.setAttribute('aria-pressed', b === t)); return renderPs(); }
  if (d.pscopy) return copyText(psText(PSX.find((y) => y.id === ST.ps), d.pscopy, P()), 'Prescrição copiada');
  if (d.peri) { PERI_ST.id = d.peri; renderPeri(); return scrollMain('periMain'); }
  if (d.calc) { CALC_ST.id = d.calc; return renderCalc(); }
  if (d.sc !== undefined) { (SC_ST.v[SC_ST.id] || (SC_ST.v[SC_ST.id] = {}))[d.sc] = +d.pts; return renderCalc(); }
  if (t.id === 'scReset') { SC_ST.v[SC_ST.id] = {}; return renderCalc(); }
});
document.addEventListener('input', (e) => {
  const t = e.target;
  if (['ptWeight', 'ptHeight', 'ptAge', 'ptCr', 'ptAllergies'].includes(t.id)) { renderChips(); if (ST.view === 'calc') { if (CALC_ST.id === 'escores') return; calcRun(); return; } if (ST.view === 'desc') { const y = window.scrollY; renderDesc(); window.scrollTo(0, y); return; } return refreshView(); }
  if (t.id === 'clinSearch') { $('clinNav').innerHTML = navList(CLIN, 'clin', ST.clin, t.value); return; }
  if (t.id === 'descSearch') { $('descNav').innerHTML = navList(DESCS, 'desc', ST.desc, t.value, DESC_ORDER()); return; }
  if (t.id === 'psSearch') return renderPs();
  if (t.dataset && t.dataset.pf) return pfUpdate(t);
  if (t.dataset && t.dataset.cin) { CALC_ST.v[t.id] = t.value; store.set('dc_em_calc', CALC_ST.v); return calcRun(); }
  if (t.dataset && t.dataset.scc !== undefined) { const s = SCORES.find((x) => x.id === SC_ST.id); (SC_ST.v[SC_ST.id] || (SC_ST.v[SC_ST.id] = {}))[t.dataset.scc] = t.checked ? s.itens[+t.dataset.scc].c : false; return renderCalc(); }
});
document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.id === 'ptSex') { renderChips(); return refreshView(); }
  if (t.dataset && t.dataset.pf) return pfUpdate(t);
  if (t.id === 'scSel') { SC_ST.id = t.value; return renderCalc(); }
  if (t.id === 'acDrug' || t.id === 'acRisk') return acCalc();
  if (t.dataset && t.dataset.cin) { CALC_ST.v[t.id] = t.value; store.set('dc_em_calc', CALC_ST.v); return calcRun(); }
});
(function init() {
  const s = store.get('dc_em_pt');
  if (s) { if (s.sex) $('ptSex').value = s.sex; if (s.age) $('ptAge').value = s.age; if (s.w) $('ptWeight').value = s.w; if (s.h) $('ptHeight').value = s.h; if (s.cr) $('ptCr').value = s.cr; }
  const c = store.get('dc_cir_clin'); if (c && CLIN.some((x) => x.id === c)) ST.clin = c;
  const dd = store.get('dc_cir_desc'); if (dd && DESCS.some((x) => x.id === dd)) ST.desc = dd;
  renderChips(); renderRefs();
  const h = (location.hash || '').replace('#', '');
  setView(VIEWS.includes(h) ? h : store.get('dc_cir_view') || 'clin');
})();
