// Infusões contínuas — diluição padrão (HC-FMUSP quando disponível), cálculo dose ⇄ mL/h.
// amp: quantidade por ampola na unidade-base (mg ou U); vamp: mL por ampola; n: nº de ampolas; dil: mL de diluente.
const INF = [
  { id: 'nora', nome: 'Noradrenalina', grupo: 'Vasoativos', acc: 'HOSP', base: 'mg', amp: 4, vamp: 4, n: 4, dil: 234, diluente: 'SG 5% (ou SF)',
    apres: 'Ampola 4 mg/4 mL de norepinefrina base (rótulo "hemitartarato 8 mg/4 mL" = 4 mg base)',
    units: ['mcg/kg/min', 'mcg/min'], faixa: { 'mcg/kg/min': [0.05, 1, 0.05, 2], 'mcg/min': [2, 60, 1, 100] },
    notas: ['1ª escolha no choque séptico e cardiogênico. Pode iniciar em **veia periférica** calibrosa (antecubital) enquanto obtém acesso central; vigiar extravasamento.', 'Na diluição padrão, **1 mL/h ≈ 1 mcg/min**.', 'Dose ≥0,25–0,5 mcg/kg/min: associar vasopressina; considerar hidrocortisona.'] },
  { id: 'adre', nome: 'Adrenalina', grupo: 'Vasoativos', acc: 'HOSP', base: 'mg', amp: 1, vamp: 1, n: 6, dil: 94, diluente: 'SF 0,9%',
    apres: 'Ampola 1 mg/mL', units: ['mcg/min', 'mcg/kg/min'], faixa: { 'mcg/min': [1, 20, 1, 50], 'mcg/kg/min': [0.01, 0.3, 0.01, 1] },
    notas: ['Choque refratário (2ª/3ª droga), anafilaxia refratária, bradicardia sintomática (2–10 mcg/min).', 'Na diluição padrão (60 mcg/mL), **1 mL/h = 1 mcg/min**.', 'Pode elevar lactato (efeito β2) sem hipoperfusão.'] },
  { id: 'vaso', nome: 'Vasopressina', grupo: 'Vasoativos', acc: 'HOSP', base: 'U', amp: 20, vamp: 1, n: 1, dil: 99, diluente: 'SF 0,9%',
    apres: 'Ampola 20 U/mL', units: ['U/min'], faixa: { 'U/min': [0.01, 0.04, 0.01, 0.04] },
    notas: ['Dose fixa **0,03 U/min** (não titular como a noradrenalina) associada à noradrenalina em doses crescentes.', 'Desmame: reduzir após noradrenalina <0,1–0,2 mcg/kg/min.'] },
  { id: 'dobuta', nome: 'Dobutamina', grupo: 'Vasoativos', acc: 'HOSP', base: 'mg', amp: 250, vamp: 20, n: 4, dil: 170, diluente: 'SF 0,9%',
    apres: 'Ampola 250 mg/20 mL (12,5 mg/mL)', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [2.5, 10, 2.5, 20] },
    notas: ['Disfunção miocárdica com hipoperfusão (choque cardiogênico, sepse com baixo débito).', 'Pode causar hipotensão e taquiarritmias — associar noradrenalina se PAM baixa.'] },
  { id: 'dopa', nome: 'Dopamina', grupo: 'Vasoativos', acc: 'HOSP', base: 'mg', amp: 50, vamp: 10, n: 5, dil: 200, diluente: 'SG 5%',
    apres: 'Ampola 50 mg/10 mL', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [5, 20, 2.5, 20] },
    notas: ['Uso restrito (mais arritmias que noradrenalina). Alternativa na bradicardia sintomática: 5–20 mcg/kg/min.'] },
  { id: 'ntg', nome: 'Nitroglicerina', grupo: 'Vasodilatadores e anti-hipertensivos', acc: 'HOSP', base: 'mg', amp: 50, vamp: 10, n: 1, dil: 240, diluente: 'SG 5% (frasco de vidro/equipo próprio)',
    apres: 'Ampola 50 mg/10 mL (5 mg/mL)', units: ['mcg/min'], faixa: { 'mcg/min': [5, 200, 5, 400] },
    notas: ['SCA com dor/HAS e EAP hipertensivo. Iniciar 5–10 mcg/min (EAP: 20–40) e subir 10–20 a cada 3–5 min.', 'Contraindicada: PAS <90, IAM de VD, inibidor de PDE-5 (24–48 h). Cefaleia é comum.'] },
  { id: 'nps', nome: 'Nitroprussiato de sódio', grupo: 'Vasodilatadores e anti-hipertensivos', acc: 'HOSP', base: 'mg', amp: 50, vamp: 2, n: 1, dil: 248, diluente: 'SG 5% — proteger da luz',
    apres: 'Ampola 50 mg/2 mL', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [0.25, 4, 0.25, 10] },
    notas: ['Emergência hipertensiva, dissecção (após betabloqueador), EAP hipertensivo. Iniciar 0,25–0,5 e titular a cada 5 min.', 'Toxicidade por cianeto/tiocianato: doses >2 mcg/kg/min prolongadas, insuficiência renal/hepática; máx. 10 mcg/kg/min por ≤10 min.', 'Evitar na HIC (aumenta PIC) e SCA (roubo coronário).'] },
  { id: 'esmolol', nome: 'Esmolol', grupo: 'Vasodilatadores e anti-hipertensivos', acc: 'HOSP', base: 'mg', amp: 2500, vamp: 10, n: 1, dil: 240, diluente: 'SF 0,9%',
    apres: 'Ampola 2.500 mg/10 mL (250 mg/mL) — há também 100 mg/10 mL', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [50, 200, 25, 300] },
    notas: ['Ataque 0,5 mg/kg em 1 min (opcional). Dissecção de aorta (FC <60), taquiarritmias, HAS perioperatória.', 'Meia-vida ~9 min. Evitar em IC descompensada, broncoespasmo, BAV.'] },
  { id: 'milri', nome: 'Milrinona', grupo: 'Vasoativos', acc: 'HOSP', base: 'mg', amp: 20, vamp: 20, n: 1, dil: 80, diluente: 'SF 0,9%',
    apres: 'Frasco-ampola 20 mg/20 mL (1 mg/mL)', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [0.375, 0.75, 0.125, 0.75] },
    notas: ['Inodilatador (baixo débito com resistência vascular alta / uso de betabloqueador). Hipotensão é comum; ajustar na insuficiência renal.'] },
  { id: 'amio', nome: 'Amiodarona', grupo: 'Antiarrítmicos', acc: 'HOSP', base: 'mg', amp: 150, vamp: 3, n: 6, dil: 232, diluente: 'SG 5%',
    apres: 'Ampola 150 mg/3 mL', units: ['mg/min'], faixa: { 'mg/min': [0.5, 1, 0.5, 1] },
    notas: ['Após ataque de 150 mg em 10 min: **1 mg/min por 6 h** e depois **0,5 mg/min por 18 h** (≈1 g/24 h).', 'Flebite em veia periférica com concentração >2 mg/mL — preferir acesso central ou concentração menor.'] },
  { id: 'diltiazem', nome: 'Diltiazem', grupo: 'Antiarrítmicos', acc: 'PART', base: 'mg', amp: 25, vamp: 5, n: 5, dil: 100, diluente: 'SF 0,9%',
    apres: 'Frasco-ampola 25 mg/5 mL', units: ['mg/h'], faixa: { 'mg/h': [5, 15, 5, 15] },
    notas: ['Controle de FC na FA/flutter após bolus de 0,25 mg/kg. Evitar se FEVE reduzida, hipotensão ou WPW.'] },
  { id: 'fenta', nome: 'Fentanil', grupo: 'Sedação e analgesia', acc: 'HOSP', base: 'mg', amp: 0.5, vamp: 10, n: 5, dil: 0, diluente: 'puro (sem diluição)',
    apres: 'Ampola 500 mcg/10 mL (50 mcg/mL)', units: ['mcg/kg/h', 'mcg/h'], faixa: { 'mcg/kg/h': [0.7, 3, 0.5, 4], 'mcg/h': [25, 200, 25, 300] },
    notas: ['Analgesia primeiro ("analgossedação"). Bolus 0,5–1 mcg/kg para dor ou procedimento.', 'Puro em seringa de 50 mL (HC-FMUSP). Alternativa: 20 mL + SF 80 mL = 10 mcg/mL.'] },
  { id: 'mida', nome: 'Midazolam', grupo: 'Sedação e analgesia', acc: 'HOSP', base: 'mg', amp: 50, vamp: 10, n: 3, dil: 120, diluente: 'SF ou SG 5%',
    apres: 'Ampola 50 mg/10 mL (5 mg/mL)', units: ['mg/kg/h', 'mg/h'], faixa: { 'mg/kg/h': [0.02, 0.2, 0.01, 0.4], 'mg/h': [1, 10, 1, 20] },
    notas: ['Acumula (obesidade, insuficiência renal/hepática) e aumenta delirium — preferir propofol/dexmedetomidina quando possível.', 'Estado de mal refratário: até 2 mg/kg/h.'] },
  { id: 'propofol', nome: 'Propofol 1%', grupo: 'Sedação e analgesia', acc: 'HOSP', base: 'mg', amp: 200, vamp: 20, n: 1, dil: 0, diluente: 'puro (sem diluição)', wDefault: 'aj',
    apres: 'Ampola/frasco 10 mg/mL (20, 50 ou 100 mL)', units: ['mcg/kg/min', 'mg/kg/h'], faixa: { 'mcg/kg/min': [5, 50, 5, 80], 'mg/kg/h': [0.3, 3, 0.3, 4.8] },
    notas: ['Hipotensão dose-dependente. Trocar equipo/frasco a cada 12 h (emulsão lipídica). Triglicerídeos se >48 h.', 'Síndrome de infusão do propofol: >4 mg/kg/h por >48 h (acidose, rabdomiólise, arritmia).'] },
  { id: 'cetamina', nome: 'Cetamina', grupo: 'Sedação e analgesia', acc: 'HOSP', base: 'mg', amp: 100, vamp: 2, n: 1, dil: 98, diluente: 'SF 0,9% ou SG 5%',
    apres: 'Ampola 50 mg/mL (2 mL = 100 mg; frasco 10 mL = 500 mg)', units: ['mg/kg/h'], faixa: { 'mg/kg/h': [0.1, 1.2, 0.1, 2] },
    notas: ['Analgesia poupadora de opioide: 0,1–0,3 mg/kg/h. Sedação: 0,5–1,2 mg/kg/h (HC-FMUSP; para ≥1 mg/kg/h usar 4 ampolas + 92 mL = 4 mg/mL).', 'Broncodilatadora; mantém drive respiratório e pressão.'] },
  { id: 'dexmed', nome: 'Dexmedetomidina', grupo: 'Sedação e analgesia', acc: 'HOSP', base: 'mg', amp: 0.2, vamp: 2, n: 2, dil: 96, diluente: 'SF 0,9%',
    apres: 'Ampola 200 mcg/2 mL (100 mcg/mL)', units: ['mcg/kg/h'], faixa: { 'mcg/kg/h': [0.2, 1.4, 0.1, 1.4] },
    notas: ['Sedação leve/cooperativa, delirium agitado, abstinência (adjuvante). Sem ataque na maioria dos casos (bradicardia/hipotensão).'] },
  { id: 'rocuronio', nome: 'Rocurônio', grupo: 'Bloqueadores neuromusculares', acc: 'HOSP', base: 'mg', amp: 50, vamp: 5, n: 10, dil: 0, diluente: 'puro (sem diluição)',
    apres: 'Ampola 50 mg/5 mL (10 mg/mL)', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [8, 12, 2, 12] },
    notas: ['Só com sedação profunda garantida. SDRA grave, assincronia refratária, HIC.'] },
  { id: 'cisatra', nome: 'Cisatracúrio', grupo: 'Bloqueadores neuromusculares', acc: 'HOSP', base: 'mg', amp: 10, vamp: 5, n: 10, dil: 50, diluente: 'SF 0,9%',
    apres: 'Ampola 10 mg/5 mL (2 mg/mL)', units: ['mcg/kg/min'], faixa: { 'mcg/kg/min': [1, 3, 0.5, 3] },
    notas: ['Metabolismo de Hofmann — preferível na insuficiência renal/hepática. Bolus 0,15–0,2 mg/kg.'] },
  { id: 'insulina', nome: 'Insulina regular', grupo: 'Metabólico', acc: 'SUS', base: 'U', amp: 100, vamp: 1, n: 1, dil: 99, diluente: 'SF 0,9%',
    apres: 'Frasco 100 U/mL (aspirar 1 mL)', units: ['U/kg/h', 'U/h'], faixa: { 'U/kg/h': [0.05, 0.14, 0.01, 0.14], 'U/h': [1, 10, 0.5, 15] },
    notas: ['CAD/EHH: 0,1 U/kg/h (0,05 quando glicemia <250 + SG). **1 UI/mL → mL/h = UI/h.**', 'Desprezar ~20 mL pelo equipo antes de conectar (adsorção). Potássio ≥3,5 antes de iniciar.'] },
  { id: 'heparina', nome: 'Heparina não fracionada', grupo: 'Metabólico', acc: 'SUS', base: 'U', amp: 25000, vamp: 5, n: 1, dil: 245, diluente: 'SF 0,9%',
    apres: 'Frasco 5.000 UI/mL (5 mL = 25.000 UI)', units: ['U/kg/h', 'U/h'], faixa: { 'U/kg/h': [12, 18, 1, 25], 'U/h': [500, 1500, 50, 2000] },
    notas: ['TEP/TVP: bolus 80 UI/kg + **18 UI/kg/h**. SCA: bolus 60 UI/kg (máx. 4.000) + **12 UI/kg/h (máx. 1.000 UI/h)**.', 'TTPa 6 h após início/ajuste; alvo 1,5–2,5× o controle (nomograma do serviço).'] },
  { id: 'furosemida', nome: 'Furosemida', grupo: 'Metabólico', acc: 'SUS', base: 'mg', amp: 20, vamp: 2, n: 5, dil: 90, diluente: 'SF 0,9%',
    apres: 'Ampola 20 mg/2 mL', units: ['mg/h'], faixa: { 'mg/h': [5, 20, 5, 40] },
    notas: ['Após bolus, em ICAD com resposta insuficiente. Monitorar K, Mg e creatinina.'] },
  { id: 'octreo', nome: 'Octreotida', grupo: 'Gastro', acc: 'HOSP', base: 'mg', amp: 0.1, vamp: 1, n: 5, dil: 245, diluente: 'SF 0,9%',
    apres: 'Ampola 0,1 mg/mL (100 mcg)', units: ['mcg/h'], faixa: { 'mcg/h': [25, 50, 25, 50] },
    notas: ['HDA varicosa: bolus 50 mcg + **50 mcg/h** por 2–5 dias (alternativa à terlipressina).'] },
  { id: 'pantop', nome: 'Pantoprazol / omeprazol IV', grupo: 'Gastro', acc: 'SUS', base: 'mg', amp: 40, vamp: 10, n: 2, dil: 90, diluente: 'SF 0,9%',
    apres: 'Frasco-ampola 40 mg (reconstituir em 10 mL)', units: ['mg/h'], faixa: { 'mg/h': [8, 8, 8, 8] },
    notas: ['Após bolus de 80 mg na HDA não varicosa de alto risco. Alternativa equivalente: 40 mg IV 12/12h intermitente.'] },
  { id: 'mgso4', nome: 'Sulfato de magnésio 50%', grupo: 'Metabólico', acc: 'SUS', base: 'mg', amp: 5000, vamp: 10, n: 2, dil: 480, diluente: 'SG 5%',
    apres: 'Ampola 10 mL a 50% (5 g; 1 mL = 500 mg = 4 mEq)', units: ['g/h'], faixa: { 'g/h': [1, 2, 0.5, 2] },
    notas: ['Pré-eclâmpsia grave/eclâmpsia (Zuspan): ataque 4–6 g em 20 min + **1–2 g/h** por 24 h. Vigiar reflexo patelar, FR ≥16, diurese ≥25 mL/h; antídoto: gluconato de cálcio 10% 10 mL.'] },
  { id: 'morfina', nome: 'Morfina', grupo: 'Sedação e analgesia', acc: 'SUS', base: 'mg', amp: 10, vamp: 1, n: 5, dil: 45, diluente: 'SF 0,9%',
    apres: 'Ampola 10 mg/mL', units: ['mg/h'], faixa: { 'mg/h': [1, 5, 0.5, 10] },
    notas: ['Analgesia/paliativo. Acumula na insuficiência renal (metabólito ativo) — preferir fentanil.'] },
];
const UNIT_FACTOR = {
  // retorna (dose, peso) → quantidade na unidade-base por hora
  'mcg/kg/min': (d, w) => d * w * 60 / 1000, 'mcg/min': (d) => d * 60 / 1000, 'mcg/kg/h': (d, w) => d * w / 1000, 'mcg/h': (d) => d / 1000,
  'mg/kg/h': (d, w) => d * w, 'mg/h': (d) => d, 'mg/min': (d) => d * 60, 'g/h': (d) => d * 1000,
  'U/min': (d) => d * 60, 'U/kg/h': (d, w) => d * w, 'U/h': (d) => d
};
const needsW = (u) => /\/kg\//.test(u);
const INF_ST = { id: 'nora', unit: {}, dil: {}, wsel: null };

function infConc(f) { const o = INF_ST.dil[f.id] || {}; const n = o.n ?? f.n, dil = o.dil ?? f.dil; const vol = n * f.vamp + dil; return { n, dil, vol, total: n * f.amp, conc: (n * f.amp) / vol }; }
function infW(f) { const p = P(); const k = INF_ST.wsel || f.wDefault || 'real'; return { w: wOf(k, p), k, p }; }
function concTxt(f, c) {
  if (f.base === 'U') return `${nf(c.conc, c.conc < 1 ? 2 : 1)} UI/mL`;
  return c.conc < 1 ? `${nf(c.conc * 1000, 1)} mcg/mL` : `${nf(c.conc, 2)} mg/mL`;
}
function mlh(f, unit, dose, w) { const c = infConc(f); return UNIT_FACTOR[unit](dose, w) / c.conc; }
function doseFromMlh(f, unit, rate, w) { const c = infConc(f); return rate * c.conc / UNIT_FACTOR[unit](1, w); }

function renderInfNav() {
  const grupos = [...new Set(INF.map((f) => f.grupo))];
  $('infNav').innerHTML = grupos.map((g) => `<div class="dx-group">${esc(g)}</div>` + INF.filter((f) => f.grupo === g).map((f) => `<button class="dx-btn" type="button" data-inf="${f.id}" aria-current="${f.id === INF_ST.id}"><span class="dot dot-sus"></span>${esc(f.nome)}</button>`).join('')).join('');
}
function renderInf() {
  const f = INF.find((x) => x.id === INF_ST.id) || INF[0];
  const unit = INF_ST.unit[f.id] || f.units[0];
  const fx = f.faixa[unit];
  const c = infConc(f);
  const { w, k, p } = infW(f);
  const wOk = !needsW(unit) || w > 0;
  let h = `<div class="sv-kick">${esc(f.grupo)} ${accTag(f.acc)}</div><div class="dx-title">${esc(f.nome)}</div><p class="src" style="margin:4px 0 10px">${esc(f.apres)}</p>`;
  h += `<div class="opt"><div class="opt-h"><h4>Diluição</h4><span class="src">padrão ${f.dil === 0 ? 'sem diluir' : 'do serviço'} — editável</span></div><div class="opt-b">
    <div class="inf-row">
      <div><label for="infN">Nº de ampolas</label><input type="number" id="infN" min="1" step="1" value="${c.n}"></div>
      <div><label for="infDil">Diluente (mL)</label><input type="number" id="infDil" min="0" step="1" value="${c.dil}"></div>
      <div><label>Volume final</label><div class="kv"><dd>${nf(c.vol, 0)} mL</dd></div></div>
      <div><label>Concentração</label><div class="kv"><dd>${concTxt(f, c)}</dd></div></div>
    </div>
    <div class="note">${c.n} ampola(s) (${nf(c.n * f.vamp, 1)} mL) ${c.dil ? `+ ${esc(f.diluente)} ${nf(c.dil, 0)} mL` : esc(f.diluente)} = ${nf(c.vol, 0)} mL · total ${f.base === 'U' ? nf(c.total, 0) + ' UI' : (c.total < 1 ? nf(c.total * 1000, 0) + ' mcg' : nf(c.total, 1) + ' mg')}</div>
    <button class="btn btn-line btn-sm" type="button" id="infReset">Voltar ao padrão</button>
  </div></div>`;
  h += `<div class="acc-filter" role="group" aria-label="Unidade" style="margin-top:10px"><span>Unidade:</span>${f.units.map((u) => `<button class="fbtn" type="button" data-iu="${u}" aria-pressed="${u === unit}">${u}</button>`).join('')}
    ${needsW(unit) ? `<span style="margin-left:10px">Peso:</span>${['real', 'aj', 'pp'].map((x) => `<button class="fbtn" type="button" data-iw="${x}" aria-pressed="${x === k}">${{ real: 'real', aj: 'ajustado', pp: 'predito' }[x]}</button>`).join('')}<span class="src">${w ? nf(w, 1) + ' kg' : 'informe peso/altura'}</span>` : ''}</div>`;
  if (!wOk) h += `<div class="warnline">Informe o peso na barra do paciente.</div>`;
  else {
    const d0 = INF_ST.lastDose && INF_ST.lastDose.id === f.id && INF_ST.lastDose.unit === unit ? INF_ST.lastDose.v : fx[0];
    const r0 = mlh(f, unit, d0, w);
    h += `<div class="inf-row" style="margin-top:8px">
      <div><label for="infDose">Dose (${unit})</label><input type="number" id="infDose" step="${fx[2]}" min="0" value="${d0}"></div>
      <div><label for="infRate">Vazão (mL/h)</label><input type="number" id="infRate" step="0.1" min="0" value="${nf(r0, 1).replace(/\./g, '').replace(',', '.')}"></div>
    </div><div class="out-box" id="infOut"></div>`;
    const steps = []; for (let v = fx[0]; v <= fx[1] + 1e-9 && steps.length < 14; v += fx[2]) steps.push(+v.toFixed(4));
    if (fx[1] > fx[0] && steps[steps.length - 1] < fx[1]) steps.push(fx[1]);
    h += `<div class="tbl-wrap" style="margin-top:8px"><table class="vt"><thead><tr><th>Dose (${unit})</th><th>mL/h</th></tr></thead><tbody>${steps.map((v) => `<tr><td>${nf(v, 3)}</td><td><b>${nf(mlh(f, unit, v, w), 1)}</b></td></tr>`).join('')}</tbody></table></div>`;
    h += `<p class="src">Faixa usual ${nf(fx[0], 3)}–${nf(fx[1], 3)} ${unit}; máximo habitual ${nf(fx[3], 3)} ${unit}.</p>`;
  }
  h += `<div class="opt" style="margin-top:10px"><div class="opt-h"><h4>Observações</h4></div><div class="opt-b"><ul style="margin:0;padding-left:18px">${f.notas.map((n) => `<li style="font-size:.8rem;margin:3px 0">${md(n)}</li>`).join('')}</ul></div></div>`;
  h += `<div style="margin-top:10px"><button class="btn btn-primary btn-sm" type="button" id="infCopy">Copiar prescrição</button></div>`;
  h += `<p class="disclaimer">Confira a apresentação disponível no seu serviço (concentrações variam por fabricante). Bomba de infusão obrigatória.</p>`;
  $('infMain').innerHTML = h;
  if (wOk) infOut('dose');
}
function infOut(from) {
  const f = INF.find((x) => x.id === INF_ST.id), unit = INF_ST.unit[f.id] || f.units[0];
  const { w } = infW(f);
  if (!$('infDose')) return;
  if (from === 'dose') { const d = parseFloat($('infDose').value) || 0; if (document.activeElement !== $('infRate')) $('infRate').value = +mlh(f, unit, d, w).toFixed(1); INF_ST.lastDose = { id: f.id, unit, v: d }; }
  else { const r = parseFloat($('infRate').value) || 0; const d = doseFromMlh(f, unit, r, w); $('infDose').value = +d.toPrecision(3); INF_ST.lastDose = { id: f.id, unit, v: d }; }
  const d = parseFloat($('infDose').value) || 0, r = parseFloat($('infRate').value) || 0;
  const fx = f.faixa[unit];
  const alert = d > fx[3] ? `<div class="warnline" style="margin-top:6px">Acima do máximo habitual (${nf(fx[3], 3)} ${unit}).</div>` : '';
  $('infOut').innerHTML = `<div class="big-out">${nf(r, 1)} mL/h</div><div class="src">${nf(d, 3)} ${unit}${needsW(unit) ? ` · ${nf(w, 1)} kg` : ''} · ${f.base === 'U' ? nf(UNIT_FACTOR[unit](d, w), 2) + ' UI/h' : nf(UNIT_FACTOR[unit](d, w), 2) + ' mg/h'} · 1 frasco dura ~${r > 0 ? nf(infConc(f).vol / r, 1) : '—'} h</div>${alert}`;
}
function infRx() {
  const f = INF.find((x) => x.id === INF_ST.id), unit = INF_ST.unit[f.id] || f.units[0], c = infConc(f);
  const d = parseFloat(($('infDose') || {}).value) || 0, r = parseFloat(($('infRate') || {}).value) || 0;
  return `${f.nome} (${f.apres.split(' (')[0]}) — ${c.n} ampola(s)${c.dil ? ` + ${f.diluente.split(' (')[0].split(' —')[0]} ${c.dil} mL` : ' pura'} (${concTxt(f, c)}). Infundir em bomba a ${nf(r, 1)} mL/h (${nf(d, 3)} ${unit}); titular conforme alvo clínico.`;
}
