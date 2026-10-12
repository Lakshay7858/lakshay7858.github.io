// Aplicação: navegação, render das abas e eventos.
REFS.dbh2025[1] = '';
const VIEWS = ['sv', 'inf', 'ps', 'calc', 'ex', 'ref'];
const ST = { view: 'sv', sv: 'pcr', ps: 'enxaqueca', psf: 'all', ex: 'dortoracica' };

// ---------- barra do paciente ----------
function renderChips() {
  const p = P(); const c = [];
  if (p.pp) c.push(`Peso predito ${nf(p.pp, 1)} kg · VC 6 mL/kg = ${nf(6 * p.pp, 0)} mL`);
  if (p.imc) c.push(`IMC ${nf(p.imc, 1)}${p.imc >= 30 ? ` · peso ajustado ${nf(p.aj, 1)} kg` : ''}`);
  if (p.clcr) c.push(`ClCr (CG) ${nf(p.clcr, 0)} mL/min`);
  if (p.egfr) c.push(`TFG CKD-EPI ${nf(p.egfr, 0)}`);
  $('chipsBio').innerHTML = c.map((t) => `<span class="chip">${esc(t)}</span>`).join('');
  $('chipAge').textContent = p.age >= 65 ? 'Idoso' : 'Adulto';
  const al = ($('ptAllergies').value || '').trim();
  document.querySelectorAll('.al-warn').forEach((e) => e.remove());
  if (al) $('chipsBio').insertAdjacentHTML('beforeend', `<span class="chip al-warn" style="background:var(--danger-bg);color:var(--danger)">Alergia: ${esc(al)}</span>`);
  store.set('dc_em_pt', { sex: $('ptSex').value, age: $('ptAge').value, w: $('ptWeight').value, h: $('ptHeight').value, cr: $('ptCr').value });
}

// ---------- Sala Vermelha ----------
function renderSvNav() {
  const f = norm($('svSearch').value || '');
  const cats = [...new Set(TOPICS.map((t) => t.cat))];
  let h = '';
  cats.forEach((c) => {
    const ts = TOPICS.filter((t) => t.cat === c && (!f || norm(t.title + ' ' + t.alias.join(' ')).includes(f)));
    if (ts.length) h += `<div class="dx-group">${esc(c)}</div>` + ts.map((t) => `<button class="dx-btn" type="button" data-sv="${t.id}" aria-current="${t.id === ST.sv}"><span class="dot c-${t.cor}"></span>${esc(t.title)}</button>`).join('');
  });
  $('svNav').innerHTML = h || '<div class="empty">Nada encontrado.</div>';
  $('svCount').textContent = `${TOPICS.length} protocolos`;
}
function renderSv() {
  const t = TOPICS.find((x) => x.id === ST.sv) || TOPICS[0]; const p = P();
  let h = `<div class="sv-kick">${esc(t.cat)}</div><div class="dx-title"><span class="sv-dot c-${t.cor}"></span>${esc(t.title)}</div><p class="sv-lead">${md(t.resumo)}</p>`;
  h += p.has ? `<p class="sv-wnote">Doses calculadas para <b>${nf(p.w, 1)} kg</b>${p.age ? ` · ${nf(p.age, 0)} anos` : ''}${p.clcr ? ` · ClCr ${nf(p.clcr, 0)} mL/min` : ''}. Confira a apresentação disponível.</p>` : `<p class="sv-wnote">Informe o <b>peso</b> na barra do paciente para ver as doses calculadas.</p>`;
  h += icHTML(t);
  t.secs.forEach((s) => { h += `<section class="sv-s"><h4>${esc(s.h)}</h4>${s.li ? `<ul>${s.li.map((l) => `<li>${lineHTML(l, p)}</li>`).join('')}</ul>` : ''}${s.table ? tableHTML(s.table) : ''}</section>`; });
  h += icPosHTML(t);
  if (t.proc) h += procFormHTML(t);
  t.rx.forEach((r, i) => { h += `<div class="opt sv-rx"><div class="opt-h"><h4>${esc(r.h)}</h4><button class="btn btn-line btn-sm" type="button" data-svcopy="${i}">Copiar</button></div><ol class="rx-ol">${r.li.map((l) => `<li>${lineHTML(l, p)}</li>`).join('')}</ol></div>`; });
  const fs = (t.fontes || []).map((k) => REFS[k]).filter(Boolean);
  if (fs.length) h += `<div class="sv-src"><b>Fontes:</b> ${fs.map(([n, u]) => (u ? `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>` : esc(n))).join(' · ')}</div>`;
  h += `<p class="disclaimer">Material de apoio. Confira doses, diluições, função renal, interações e protocolos do seu serviço antes de prescrever.</p>`;
  $('svMain').innerHTML = h;
}

// ---------- Prescrições do PS ----------
const passPs = (acc) => ST.psf === 'all' || (ST.psf === 'sus' ? acc !== 'PART' : acc === 'PART');
function itemTxt(it, p) { return typeof it[0] === 'function' ? it[0](p) : it[0]; }
function psList(items, p) {
  const f = (items || []).filter((it) => passPs(it[1]));
  if (!f.length) return `<div class="empty" style="padding:8px">${(items || []).length ? 'Nenhum item com o filtro atual.' : '—'}</div>`;
  return `<ol class="rx-ol">${f.map((it) => `<li>${md(itemTxt(it, p))} ${accTag(it[1])}</li>`).join('')}</ol>`;
}
function verdictPs(items) {
  const a = (items || []).map((i) => i[1]); if (!a.length) return '';
  const part = a.filter((x) => x === 'PART').length;
  if (!part) return '<span class="verdict v-sus">Tudo no SUS</span>';
  if (part === a.length) return '<span class="verdict v-part">Só particular</span>';
  return '<span class="verdict v-misto">Parte particular</span>';
}
function renderPsNav() {
  const f = norm($('psSearch').value || '');
  const grupos = [...new Set(PSX.map((x) => x.grupo))];
  let h = '';
  grupos.forEach((g) => {
    const ls = PSX.filter((x) => x.grupo === g && (!f || norm(x.nome + ' ' + x.quando).includes(f)));
    if (ls.length) h += `<div class="dx-group">${esc(g)}</div>` + ls.map((x) => { const all = [...x.ideal.ps, ...x.ideal.alta]; const hasPart = all.some((i) => i[1] === 'PART'); return `<button class="dx-btn" type="button" data-ps="${x.id}" aria-current="${x.id === ST.ps}"><span class="dot ${hasPart ? 'dot-misto' : 'dot-sus'}"></span>${esc(x.nome)}</button>`; }).join('');
  });
  $('psNav').innerHTML = h || '<div class="empty">Nada encontrado.</div>';
  $('psCount').textContent = `${PSX.length} diagnósticos`;
}
function psText(x, which, p) {
  const o = which === 'sus' && x.sus !== 'igual' ? x.sus : x.ideal;
  const ps = o.ps.filter((i) => passPs(i[1])).map((i, k) => `${k + 1}. ${itemTxt(i, p).replace(/\*\*/g, '')}`);
  const al = o.alta.filter((i) => passPs(i[1])).map((i, k) => `${k + 1}. ${itemTxt(i, p).replace(/\*\*/g, '')}`);
  const nome = $('ptName').value || '';
  let t = `${x.nome.toUpperCase()}${nome ? ' — ' + nome : ''}\n`;
  if (ps.length) t += `\nPRESCRIÇÃO NO PS\n${ps.join('\n')}\n`;
  if (al.length) t += `\nRECEITA DE ALTA\n${al.join('\n')}\n`;
  t += `\nORIENTAÇÕES E SINAIS DE ALARME\n${x.orient.replace(/\*\*/g, '')}`;
  return t;
}
function renderPs() {
  const x = PSX.find((y) => y.id === ST.ps) || PSX[0]; const p = P();
  const sus = x.sus === 'igual' ? null : x.sus;
  let h = `<div class="dx-title">${esc(x.nome)}</div><div class="dx-when">${md(x.quando)}</div>`;
  if (x.exames) h += `<div class="note" style="margin:8px 0"><b>Exames:</b> ${md(x.exames)}</div>`;
  h += `<div class="opt opt-ideal"><div class="opt-h"><h4>★ Opção ideal ${verdictPs([...x.ideal.ps, ...x.ideal.alta])}</h4><span class="src">${esc(x.fonte)}</span></div><div class="opt-b"><div class="note">${md(x.ideal.nota)}</div>
    ${x.ideal.ps.length ? `<div class="sv-kick" style="margin-top:6px;color:var(--accent)">Prescrição no PS</div>${psList(x.ideal.ps, p)}` : ''}
    ${x.ideal.alta.length ? `<div class="sv-kick" style="margin-top:6px;color:var(--accent)">Receita de alta</div>${psList(x.ideal.alta, p)}` : ''}
    <div><button class="btn btn-primary btn-sm" type="button" data-pscopy="ideal">Copiar opção ideal</button></div></div></div>`;
  h += `<div class="opt opt-sus"><div class="opt-h"><h4>Opção SUS ${sus ? verdictPs([...sus.ps, ...sus.alta]) : '<span class="verdict v-sus">Igual à ideal</span>'}</h4><span class="src">RENAME 2024 · REMUME local</span></div><div class="opt-b">
    ${sus ? `<div class="note">${md(sus.nota)}</div>${sus.ps.length ? `<div class="sv-kick" style="margin-top:6px;color:var(--accent)">Prescrição no PS</div>${psList(sus.ps, p)}` : ''}${sus.alta.length ? `<div class="sv-kick" style="margin-top:6px;color:var(--accent)">Receita de alta</div>${psList(sus.alta, p)}` : ''}<div><button class="btn btn-primary btn-sm" type="button" data-pscopy="sus">Copiar opção SUS</button></div>`
      : '<div class="note">A opção ideal usa medicamentos disponíveis no SUS (itens marcados "particular" acima têm alternativa indicada no próprio item).</div>'}
  </div></div>`;
  h += `<div class="opt"><div class="opt-h" style="background:var(--surface-2)"><h4>Orientações e sinais de alarme</h4></div><div class="opt-b"><div class="orient">${md(x.orient)}</div></div></div>`;
  h += `<p class="disclaimer">"SUS" = RENAME/UBS; "SUS hospitalar" = uso hospitalar/UPA; "SUS parcial" = componente especializado ou varia por município; confira a REMUME. Ajuste doses à função renal (ClCr na barra do paciente), gestação e interações.</p>`;
  $('psMain').innerHTML = h;
}

// ---------- Calculadoras ----------
function renderCalcNav() {
  $('calcNav').innerHTML = [...CALCS, { id: 'escores', nome: 'Escores clínicos' }].map((c) => `<button class="fbtn" type="button" data-calc="${c.id}" aria-pressed="${c.id === CALC_ST.id}">${esc(c.nome)}</button>`).join('');
}
function renderCalc() {
  renderCalcNav();
  if (CALC_ST.id === 'escores') { $('calcMain').innerHTML = scoreHTML(); return; }
  const c = CALCS.find((x) => x.id === CALC_ST.id);
  $('calcMain').innerHTML = `<div class="dx-title" style="font-size:1rem">${esc(c.nome)}</div>` + calcForm(c.id);
  calcRun();
}

// ---------- Exames ----------
const EX_SEL = {};
function renderExNav() {
  $('exNav').innerHTML = EXX.map((e) => `<button class="dx-btn" type="button" data-ex="${e.id}" aria-current="${e.id === ST.ex}"><span class="dot dot-sus"></span>${esc(e.nome)}</button>`).join('') +
    `<div class="dx-group">Imagem</div><button class="dx-btn" type="button" data-ex="tc" aria-current="${ST.ex === 'tc'}"><span class="dot dot-misto"></span>Indicações de TC e contraste</button>`;
}
function renderEx() {
  if (ST.ex === 'tc') {
    $('exMain').innerHTML = `<div class="dx-title">Indicações de TC e uso de contraste</div>` + TCX.map((s) => `<section class="sv-s"><h4>${esc(s.h)}</h4><ul>${s.li.map((l) => `<li>${md(l)}</li>`).join('')}</ul></section>`).join('') +
      `<p class="src">Regras de decisão interativas (Canadian CT Head, NEXUS, Canadian C-spine, Ottawa SAH, Wells, PERC) na aba Calculadoras → Escores clínicos.</p>`;
    return;
  }
  const e = EXX.find((x) => x.id === ST.ex) || EXX[0];
  const sel = EX_SEL[e.id] || (EX_SEL[e.id] = {});
  const all = [...e.lab, ...e.img];
  const row = (t, i) => `<label><input type="checkbox" data-exi="${i}" ${sel[i] === false ? '' : 'checked'}> <span>${md(t)}</span></label>`;
  $('exMain').innerHTML = `<div class="dx-title">${esc(e.nome)}</div>
    <div class="opt"><div class="opt-h"><h4>Laboratório</h4></div><div class="opt-b chk-list">${e.lab.map((t, i) => row(t, i)).join('')}</div></div>
    <div class="opt" style="margin-top:10px"><div class="opt-h"><h4>Imagem / ECG / outros</h4></div><div class="opt-b chk-list">${e.img.map((t, i) => row(t, i + e.lab.length)).join('')}</div></div>
    ${e.nota ? `<div class="note" style="margin-top:10px">${md(e.nota)}</div>` : ''}
    <div style="margin-top:10px"><button class="btn btn-primary btn-sm" type="button" id="exCopy">Copiar solicitação (itens marcados)</button></div>
    <pre class="pre-out" id="exPre" style="margin-top:8px">${esc(exPedido(e, sel))}</pre>`;
}

// ---------- Fontes ----------
function renderRefs() {
  $('refCard').innerHTML = `<div class="card-h"><h3>Fontes e diretrizes</h3><span class="src">atualizado out/2026</span></div>
  <ul class="refs">${Object.values(REFS).map(([n, u]) => `<li>${u ? `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>` : esc(n)}</li>`).join('')}</ul>
  <h4 style="font-size:.78rem;margin:12px 0 6px">Seus materiais usados como base (não publicados no site)</h4><ul class="refs">${MATERIAIS_EM.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  <h4 style="font-size:.78rem;margin:12px 0 6px">Como ler a disponibilidade</h4><div style="display:flex;gap:6px;flex-wrap:wrap">${['SUS', 'HOSP', 'MISTO', 'PART'].map(accTag).join('')}</div>
  <p class="disclaimer">Ferramenta de apoio para médicos e estudantes sob supervisão. As doses seguem as diretrizes citadas; confira apresentação, função renal/hepática, gestação, interações e protocolos institucionais. Nenhum dado de paciente é enviado ao servidor (peso/idade ficam só neste navegador).</p>`;
}

// ---------- navegação ----------
function setView(v) {
  if (!VIEWS.includes(v)) v = 'sv';
  ST.view = v;
  VIEWS.forEach((k) => { $('view-' + k).hidden = k !== v; $('tab-' + k).setAttribute('aria-selected', k === v); });
  refreshView();
  try { history.replaceState(null, '', '#' + v); } catch (e) {}
  store.set('dc_em_view', v);
}
function refreshView() {
  const v = ST.view;
  if (v === 'sv') { renderSvNav(); renderSv(); }
  if (v === 'inf') { renderInfNav(); renderInf(); }
  if (v === 'ps') { renderPsNav(); renderPs(); }
  if (v === 'calc') renderCalc();
  if (v === 'ex') { renderExNav(); renderEx(); }
}
const scrollMain = (id) => { if (window.innerWidth < 1100) $(id).scrollIntoView({ behavior: 'smooth', block: 'start' }); else window.scrollTo({ top: 0 }); };

document.addEventListener('click', (e) => {
  const t = e.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.view) return setView(d.view);
  if (d.sv) { ST.sv = d.sv; store.set('dc_em_sv', d.sv); renderSvNav(); renderSv(); return scrollMain('svMain'); }
  if (d.svcopy !== undefined) { const tp = TOPICS.find((x) => x.id === ST.sv), p = P(); const r = tp.rx[+d.svcopy]; return copyText(`${r.h.toUpperCase()}\n` + r.li.map((l, i) => `${i + 1}. ${lineTXT(l, p)}`).join('\n'), 'Prescrição copiada'); }
  if (t.id === 'pfReset') { PF_ST[ST.sv] = {}; return renderSv(); }
  if (t.id === 'pfCopy') return copyText($('pfOut').textContent, 'Descrição copiada');
  if (d.inf) { INF_ST.id = d.inf; renderInfNav(); renderInf(); return scrollMain('infMain'); }
  if (d.iu) { INF_ST.unit[INF_ST.id] = d.iu; return renderInf(); }
  if (d.iw) { INF_ST.wsel = d.iw; return renderInf(); }
  if (t.id === 'infReset') { delete INF_ST.dil[INF_ST.id]; return renderInf(); }
  if (t.id === 'infCopy') return copyText(infRx(), 'Prescrição copiada');
  if (d.ps) { ST.ps = d.ps; store.set('dc_em_ps', d.ps); renderPsNav(); renderPs(); return scrollMain('psMain'); }
  if (d.psf) { ST.psf = d.psf; document.querySelectorAll('[data-psf]').forEach((b) => b.setAttribute('aria-pressed', b === t)); return renderPs(); }
  if (d.pscopy) { const x = PSX.find((y) => y.id === ST.ps); return copyText(psText(x, d.pscopy, P()), 'Prescrição copiada'); }
  if (d.calc) { CALC_ST.id = d.calc; return renderCalc(); }
  if (d.sc !== undefined) { const v = SC_ST.v[SC_ST.id] || (SC_ST.v[SC_ST.id] = {}); v[d.sc] = +d.pts; return renderCalc(); }
  if (t.id === 'scReset') { SC_ST.v[SC_ST.id] = {}; return renderCalc(); }
  if (d.ex) { ST.ex = d.ex; renderExNav(); renderEx(); return scrollMain('exMain'); }
  if (t.id === 'exCopy') return copyText($('exPre').textContent, 'Solicitação copiada');
});
document.addEventListener('input', (e) => {
  const t = e.target;
  if (['ptWeight', 'ptHeight', 'ptAge', 'ptCr', 'ptAllergies'].includes(t.id)) { renderChips(); if (ST.view !== 'calc' || CALC_ST.id === 'renal' || CALC_ST.id === 'sodio') refreshView(); else calcRun(); return; }
  if (t.id === 'svSearch') return renderSvNav();
  if (t.dataset && t.dataset.pf) return pfUpdate(t);
  if (t.id === 'psSearch') return renderPsNav();
  if (t.id === 'infDose') return infOut('dose');
  if (t.id === 'infRate') return infOut('rate');
  if (t.id === 'infN' || t.id === 'infDil') { const f = INF.find((x) => x.id === INF_ST.id); const o = INF_ST.dil[f.id] || (INF_ST.dil[f.id] = {}); const v = parseFloat(t.value); if (isFinite(v) && v >= 0) o[t.id === 'infN' ? 'n' : 'dil'] = v; const pos = t.id; renderInf(); const el = $(pos); if (el) { el.focus(); const s = el.value; el.value = ''; el.value = s; } return; }
  if (t.dataset && t.dataset.cin) { CALC_ST.v[t.id] = t.value; store.set('dc_em_calc', CALC_ST.v); return calcRun(); }
  if (t.dataset && t.dataset.scc !== undefined) { const v = SC_ST.v[SC_ST.id] || (SC_ST.v[SC_ST.id] = {}); const s = SCORES.find((x) => x.id === SC_ST.id); v[t.dataset.scc] = t.checked ? s.itens[+t.dataset.scc].c : false; return renderCalc(); }
  if (t.dataset && t.dataset.exi !== undefined) { const sel = EX_SEL[ST.ex] || (EX_SEL[ST.ex] = {}); sel[t.dataset.exi] = t.checked; const ex = EXX.find((x) => x.id === ST.ex); $('exPre').textContent = exPedido(ex, sel); return; }
});
document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.id === 'ptSex') { renderChips(); return refreshView(); }
  if (t.dataset && t.dataset.pf) return pfUpdate(t);
  if (t.id === 'scSel') { SC_ST.id = t.value; return renderCalc(); }
  if (t.dataset && t.dataset.cin) { CALC_ST.v[t.id] = t.value; store.set('dc_em_calc', CALC_ST.v); return calcRun(); }
});

function pfUpdate(el) {
  const tp = TOPICS.find((x) => x.id === ST.sv); if (!tp || !tp.proc) return;
  (PF_ST[tp.id] || (PF_ST[tp.id] = {}))[el.dataset.pf] = el.value;
  if (el.tagName === 'SELECT') { const y = window.scrollY; renderSv(); window.scrollTo(0, y); return; }
  $('pfOut').textContent = tp.proc.texto(procValues(tp), P());
}
(function init() {
  const s = store.get('dc_em_pt');
  if (s) { if (s.sex) $('ptSex').value = s.sex; if (s.age) $('ptAge').value = s.age; if (s.w) $('ptWeight').value = s.w; if (s.h) $('ptHeight').value = s.h; if (s.cr) $('ptCr').value = s.cr; }
  const sv = store.get('dc_em_sv'); if (sv && TOPICS.some((t) => t.id === sv)) ST.sv = sv;
  const ps = store.get('dc_em_ps'); if (ps && PSX.some((t) => t.id === ps)) ST.ps = ps;
  renderChips(); renderRefs();
  const h = (location.hash || '').replace('#', '');
  setView(VIEWS.includes(h) ? h : store.get('dc_em_view') || 'sv');
})();
