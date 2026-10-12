// DoseCerta · Emergência adulto — núcleo: utilidades, paciente, motor de doses.
'use strict';
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
function nf(x, d) {
  if (x === null || x === undefined || !isFinite(x)) return '—';
  if (d === undefined) { const a = Math.abs(x); d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : a >= 0.1 ? 2 : 3; }
  return Number(x.toFixed(d)).toLocaleString('pt-BR', { maximumFractionDigits: d });
}
const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let toastT;
function toast(m) { const t = $('toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 2200); }
function copyText(txt, ok) {
  const fb = () => {
    const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
    let r = false; try { r = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); toast(r ? (ok || 'Copiado') : 'Não foi possível copiar — selecione o texto.');
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => toast(ok || 'Copiado'), fb); else fb();
}

// ---------- paciente ----------
function P() {
  const w = parseFloat($('ptWeight').value) || 0;
  const h = parseFloat($('ptHeight').value) || 0;
  const age = parseFloat($('ptAge').value) || 0;
  const sex = $('ptSex').value === 'F' ? 'F' : 'M';
  const cr = parseFloat($('ptCr').value) || 0;
  const pp = h ? (sex === 'M' ? 50 : 45.5) + 0.91 * (h - 152.4) : 0; // peso predito (ARDSNet) = peso ideal (Devine)
  const imc = w && h ? w / Math.pow(h / 100, 2) : 0;
  const aj = pp && w > pp ? pp + 0.4 * (w - pp) : w;            // peso ajustado
  // Cockcroft-Gault: peso real; se IMC ≥ 30 usar peso ajustado
  const wcg = imc >= 30 ? aj : w;
  const clcr = cr && age && wcg ? ((140 - age) * wcg) / (72 * cr) * (sex === 'F' ? 0.85 : 1) : null;
  // CKD-EPI 2021 (sem raça)
  let egfr = null;
  if (cr && age) { const k = sex === 'F' ? 0.7 : 0.9, a = sex === 'F' ? -0.241 : -0.302; egfr = 142 * Math.pow(Math.min(cr / k, 1), a) * Math.pow(Math.max(cr / k, 1), -1.2) * Math.pow(0.9938, age) * (sex === 'F' ? 1.012 : 1); }
  return { w, h, age, sex, cr, pp: pp > 0 ? pp : 0, imc, aj, clcr, egfr, has: w > 0 };
}
function wOf(kind, p) {
  if (kind === 'obeso') return p.imc > 30 ? (p.aj || p.w) : p.w;
  if (kind === 'pp' || kind === 'ideal') return p.pp || p.w;
  if (kind === 'aj') return p.aj || p.w;
  return p.w;
}
const WLBL = { real: 'peso real', pp: 'peso predito', ideal: 'peso ideal', aj: 'peso ajustado', obeso: 'peso ajustado se IMC >30' };

// ---------- motor de dose ----------
// D(k, unidade, {max, min, c (conc./mL), wt:'real'|'ideal'|'aj', dia, div, maxd, vol, bands:[[ate_kg, dose]], round})
const D = (k, u, o = {}) => ({ t: 'd', k, u, ...o });
function doseHTML(d, p) {
  p = p || P();
  const wk = d.wt || 'real', W = p.has ? wOf(wk, p) : 0;
  const rule = [];
  if (d.bands) rule.push('dose por faixa de peso');
  else if (d.dia) rule.push(`${nf(d.k)} ${d.u}/kg/dia ÷ ${d.div}` + (d.maxd ? ` (máx. ${nf(d.maxd)} ${d.u}/dia)` : ''));
  else { rule.push(`${nf(d.k)} ${d.u}/kg`); if (d.max) rule.push(`máx. ${nf(d.max)} ${d.u}`); if (d.min) rule.push(`mín. ${nf(d.min)} ${d.u}`); }
  if (wk !== 'real' && !(wk === 'obeso' && !(p.imc > 30))) rule.push(WLBL[wk]);
  if (!W) return `<span class="sv-dose">${esc(rule.join('; '))}</span>`;
  let amt, extra = '';
  if (d.bands) amt = d.bands.find((b) => W <= b[0])[1];
  else if (d.dia) { let day = d.k * W; if (d.maxd) day = Math.min(day, d.maxd); amt = day / d.div; if (d.max) amt = Math.min(amt, d.max); extra = ` <small>(${nf(day)} ${esc(d.u)}/dia)</small>`; }
  else { amt = d.k * W; if (d.min) amt = Math.max(amt, d.min); if (d.max) amt = Math.min(amt, d.max); }
  if (d.round) amt = Math.round(amt / d.round) * d.round;
  let vol = '';
  if (d.c) vol = ` = <b>${nf(amt / d.c, d.c >= 1 && amt / d.c >= 10 ? 1 : 2)} ${d.cu || 'mL'}</b>`;
  const capped = !d.bands && !d.dia && d.max && d.k * W > d.max ? ' · dose máxima' : '';
  return `<span class="sv-dose">${nf(amt)} ${esc(d.u)}${d.dia ? '/dose' : ''}${vol}${extra}<small> [${esc(rule.join('; '))}${capped}${wk !== 'real' && W !== p.w ? ` = ${nf(W, 1)} kg` : ''}]</small></span>`;
}
function lineHTML(li, p) {
  if (typeof li === 'string') return md(li);
  if (typeof li === 'function') return lineHTML(li(p || P()), p);
  return li.map((x) => (typeof x === 'string' ? md(x) : typeof x === 'function' ? md(x(p || P())) : doseHTML(x, p))).join('');
}
// texto puro (para copiar)
function lineTXT(li, p) {
  const h = lineHTML(li, p).replace(/<small>[\s\S]*?<\/small>/g, '').replace(/<[^>]+>/g, '');
  const t = document.createElement('textarea'); t.innerHTML = h; return t.value.replace(/\s+/g, ' ').trim();
}
function tableHTML(t) {
  return `<div class="tbl-wrap sv-tbl"><table class="vt"><thead><tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const ACC_LBL = { SUS: 'SUS', HOSP: 'SUS hospitalar', MISTO: 'SUS parcial', PART: 'particular' };
const accTag = (a) => (a ? `<span class="tag-acc ta-${a}">${ACC_LBL[a] || a}</span>` : '');
