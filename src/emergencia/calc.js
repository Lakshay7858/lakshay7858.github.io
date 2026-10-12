// Calculadoras: gasometria, sódio, potássio, cálcio/magnésio/fósforo, bicarbonato, função renal e pesos.
const CALC_ST = { id: 'gaso', v: store.get('dc_em_calc') || {} };
const cv = (id) => { const e = $(id); if (!e) return NaN; const x = parseFloat(String(e.value).replace(',', '.')); return isFinite(x) ? x : NaN; };
const fld = (id, lbl, ph, step) => `<div><label for="${id}">${lbl}</label><input type="number" id="${id}" step="${step || 'any'}" placeholder="${ph || ''}" value="${CALC_ST.v[id] ?? ''}" data-cin="1"></div>`;
const box = (cls, html) => `<div class="res-box ${cls || ''}">${html}</div>`;

const CALCS = [
  { id: 'gaso', nome: 'Gasometria e ânion gap' },
  { id: 'sodio', nome: 'Sódio (hipo/hiper)' },
  { id: 'potassio', nome: 'Potássio' },
  { id: 'camgp', nome: 'Cálcio, magnésio, fósforo' },
  { id: 'bic', nome: 'Bicarbonato' },
  { id: 'renal', nome: 'Função renal e pesos' },
  { id: 'osm', nome: 'Osmolaridade e outros' },
];

function calcForm(id) {
  const p = P();
  switch (id) {
    case 'gaso': return `<p class="src">Gasometria arterial (ou venosa para pH/HCO₃). Eletrólitos do mesmo horário.</p>
      <div class="inf-row">${fld('gPh', 'pH', '7,40', '0.01')}${fld('gPco2', 'pCO₂ (mmHg)', '40')}${fld('gHco3', 'HCO₃⁻ (mEq/L)', '24')}${fld('gNa', 'Na⁺', '140')}${fld('gCl', 'Cl⁻', '104')}${fld('gAlb', 'Albumina (g/dL)', '4', '0.1')}${fld('gLac', 'Lactato (mmol/L)', '', '0.1')}${fld('gPo2', 'pO₂ (mmHg)', '')}${fld('gFio2', 'FiO₂ (%)', '21')}</div><div id="calcOut"></div>`;
    case 'sodio': return `<p class="src">Usa idade, sexo e peso da barra do paciente para a água corporal total (ACT).</p>
      <div class="inf-row">${fld('nNa', 'Na⁺ atual (mEq/L)', '120')}${fld('nGli', 'Glicemia (mg/dL)', '100')}${fld('nAlvo', 'Na⁺ alvo em 24 h', '')}
      <div><label for="nSol">Solução</label><select id="nSol" data-cin="1">${[['513', 'NaCl 3% (513 mEq/L)'], ['154', 'SF 0,9% (154)'], ['130|4', 'Ringer lactato (130 + K 4)'], ['77', 'NaCl 0,45% (77)'], ['0', 'SG 5% / água livre (0)'], ['3400', 'NaCl 20% (3.400)']].map(([v, l]) => `<option value="${v}" ${CALC_ST.v.nSol === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      ${fld('nKadd', 'K⁺ adicionado (mEq/L)', '0')}
      <div><label for="nRisco">Alto risco de desmielinização?</label><select id="nRisco" data-cin="1"><option value="0">Não</option><option value="1" ${CALC_ST.v.nRisco === '1' ? 'selected' : ''}>Sim (Na ≤105, etilismo, desnutrição, hipocalemia, hepatopatia)</option></select></div></div><div id="calcOut"></div>`;
    case 'potassio': return `<div class="inf-row">${fld('kK', 'K⁺ (mEq/L)', '3,0', '0.1')}${fld('kMg', 'Mg (mg/dL)', '', '0.1')}
      <div><label for="kVia">Acesso</label><select id="kVia" data-cin="1"><option value="p">Periférico</option><option value="c" ${CALC_ST.v.kVia === 'c' ? 'selected' : ''}>Central (monitorizado)</option></select></div></div><div id="calcOut"></div>`;
    case 'camgp': return `<div class="inf-row">${fld('cCa', 'Ca total (mg/dL)', '8,0', '0.1')}${fld('cAlb', 'Albumina (g/dL)', '4', '0.1')}${fld('cCai', 'Ca iônico (mmol/L)', '', '0.01')}${fld('cMg', 'Mg (mg/dL)', '', '0.1')}${fld('cP', 'Fósforo (mg/dL)', '', '0.1')}</div><div id="calcOut"></div>`;
    case 'bic': return `<div class="inf-row">${fld('bHco3', 'HCO₃⁻ atual', '10')}${fld('bAlvo', 'HCO₃⁻ alvo', '15')}${fld('bPh', 'pH', '7,10', '0.01')}</div><div id="calcOut"></div>`;
    case 'renal': return `<p class="src">Creatinina, idade, sexo, peso e altura vêm da barra do paciente.</p><div id="calcOut"></div>`;
    case 'osm': return `<div class="inf-row">${fld('oNa', 'Na⁺', '140')}${fld('oGli', 'Glicemia (mg/dL)', '100')}${fld('oUr', 'Ureia (mg/dL)', '30')}${fld('oEt', 'Etanol (mg/dL)', '0')}${fld('oMed', 'Osm medida (mOsm/kg)', '')}${fld('oPas', 'PAS', '')}${fld('oPad', 'PAD', '')}${fld('oFc', 'FC', '')}</div><div id="calcOut"></div>`;
  }
  return '';
}

function calcRun() {
  const id = CALC_ST.id, out = $('calcOut'); if (!out) return;
  const p = P(); let h = '';
  if (id === 'gaso') {
    const ph = cv('gPh'), pco2 = cv('gPco2'), hco3 = cv('gHco3'), na = cv('gNa'), cl = cv('gCl'), alb = cv('gAlb'), lac = cv('gLac'), po2 = cv('gPo2'), fio2 = cv('gFio2');
    if (isFinite(ph) && isFinite(pco2) && isFinite(hco3)) {
      const hEst = 24 * pco2 / hco3, phEst = 9 - Math.log10(hEst); // consistência (Henderson)
      const incons = Math.abs(phEst - ph) > 0.05;
      let prim = [], comp = [];
      if (ph < 7.35) {
        if (hco3 < 22) { prim.push('Acidose metabólica'); const e = 1.5 * hco3 + 8; comp.push(`pCO₂ esperada (Winter) = 1,5 × ${nf(hco3, 1)} + 8 = **${nf(e - 2, 0)}–${nf(e + 2, 0)} mmHg** → ${pco2 > e + 2 ? '**acidose respiratória associada**' : pco2 < e - 2 ? '**alcalose respiratória associada**' : 'compensação adequada'}`); }
        if (pco2 > 45) { prim.push('Acidose respiratória'); const ag = 24 + (pco2 - 40) / 10, cr = 24 + 3.5 * (pco2 - 40) / 10; comp.push(`HCO₃ esperado: aguda ≈ **${nf(ag, 1)}**, crônica ≈ **${nf(cr, 1)}** mEq/L${hco3 < ag - 2 ? ' → **acidose metabólica associada**' : hco3 > cr + 2 ? ' → **alcalose metabólica associada**' : ''}`); }
      } else if (ph > 7.45) {
        if (hco3 > 26) { prim.push('Alcalose metabólica'); const e = 0.7 * hco3 + 21; comp.push(`pCO₂ esperada = 0,7 × ${nf(hco3, 1)} + 21 = **${nf(e - 2, 0)}–${nf(e + 2, 0)} mmHg** → ${pco2 > e + 2 ? '**acidose respiratória associada**' : pco2 < e - 2 ? '**alcalose respiratória associada**' : 'compensação adequada'}`); }
        if (pco2 < 35) { prim.push('Alcalose respiratória'); const ag = 24 - 2 * (40 - pco2) / 10, cr = 24 - 5 * (40 - pco2) / 10; comp.push(`HCO₃ esperado: aguda ≈ **${nf(ag, 1)}**, crônica ≈ **${nf(cr, 1)}** mEq/L${hco3 > ag + 2 ? ' → **alcalose metabólica associada**' : hco3 < cr - 2 ? ' → **acidose metabólica associada**' : ''}`); }
      } else {
        if (hco3 < 22 && pco2 < 35) prim.push('pH normal com HCO₃ e pCO₂ baixos → distúrbio misto (acidose metabólica + alcalose respiratória)');
        else if (hco3 > 26 && pco2 > 45) prim.push('pH normal com HCO₃ e pCO₂ altos → distúrbio misto (alcalose metabólica + acidose respiratória)');
        else prim.push('pH normal');
      }
      h += box(prim.some((x) => /cidose/.test(x)) && ph < 7.2 ? 'bad' : '', `<b>${prim.join(' + ') || '—'}</b>${comp.length ? '<ul style="margin:6px 0 0;padding-left:18px">' + comp.map((c) => `<li>${md(c)}</li>`).join('') + '</ul>' : ''}${incons ? `<div class="warnline" style="margin-top:6px">pH, pCO₂ e HCO₃ inconsistentes (pH calculado ${nf(phEst, 2)}) — conferir a amostra.</div>` : ''}`);
      if (isFinite(na) && isFinite(cl)) {
        const agv = na - (cl + hco3), agc = isFinite(alb) ? agv + 2.5 * (4 - alb) : agv;
        const dr = (agc - 12) / (24 - hco3);
        let dtxt = '';
        if (hco3 < 24 && agc > 12) dtxt = dr < 0.4 ? 'acidose hiperclorêmica (AG normal) predominante' : dr < 0.8 ? 'acidose com AG aumentado + hiperclorêmica associada' : dr <= 2 ? 'acidose com AG aumentado pura' : 'AG aumentado + **alcalose metabólica** (ou acidose respiratória crônica) associada';
        h += box(agc > 12 ? 'warnb' : 'ok', `Ânion gap = ${nf(na, 0)} − (${nf(cl, 0)} + ${nf(hco3, 1)}) = <b>${nf(agv, 1)}</b>${isFinite(alb) ? ` · corrigido pela albumina = <b>${nf(agc, 1)}</b>` : ''} (normal 8–12)
          ${hco3 < 24 && agc > 12 ? `<br>Delta-delta (ΔAG/ΔHCO₃) = (${nf(agc, 1)} − 12) / (24 − ${nf(hco3, 1)}) = <b>${nf(dr, 2)}</b> → ${dtxt}` : ''}
          ${agc > 12 ? '<br><span class="src">AG ↑: <b>MUDPILES/GOLDMARK</b> — cetoacidose (diabética, alcoólica, jejum), lactato, uremia, metanol/etilenoglicol, salicilato, paracetamol (5-oxoprolina), ferro/isoniazida.</span>' : hco3 < 22 ? '<br><span class="src">AG normal: diarreia, fístulas, ATR, acetazolamida, SF em excesso (hiperclorêmica), ureterossigmoidostomia.</span>' : ''}`);
      }
      if (isFinite(lac)) h += box(lac >= 4 ? 'bad' : lac > 2 ? 'warnb' : 'ok', `Lactato <b>${nf(lac, 1)} mmol/L</b> ${lac >= 4 ? '— hipoperfusão grave (choque séptico se vasopressor)' : lac > 2 ? '— elevado: repetir em 2–4 h' : '— normal'}`);
      if (isFinite(po2) && isFinite(fio2) && fio2 > 0) {
        const pf = po2 / (fio2 / 100), paa = (fio2 / 100) * 713 - pco2 / 0.8 - po2, aaN = (p.age || 40) / 4 + 4;
        h += box(pf < 200 ? 'bad' : pf < 300 ? 'warnb' : 'ok', `P/F = <b>${nf(pf, 0)}</b> ${pf < 100 ? '(SDRA grave se critérios)' : pf < 200 ? '(moderada)' : pf < 300 ? '(leve)' : ''} · Gradiente A–a = <b>${nf(paa, 0)} mmHg</b> (esperado ≤${nf(aaN, 0)} para a idade)`);
      }
    } else h += `<p class="src">Preencha pH, pCO₂ e HCO₃.</p>`;
  }
  if (id === 'sodio') {
    const na = cv('nNa'), gli = cv('nGli'), alvo = cv('nAlvo'), sv = ($('nSol') || {}).value || '513', kadd = cv('nKadd') || 0, risco = ($('nRisco') || {}).value === '1';
    const [solNa, solK] = sv.split('|').map(Number); const infK = (solK || 0) + kadd;
    const f = p.sex === 'F' ? (p.age >= 65 ? 0.45 : 0.5) : (p.age >= 65 ? 0.5 : 0.6);
    const act = p.w * f;
    if (isFinite(na) && p.w) {
      let hh = '';
      if (isFinite(gli) && gli > 100) hh += `Na corrigido pela glicemia: <b>${nf(na + 1.6 * (gli - 100) / 100, 1)}</b> (Katz, 1,6) a <b>${nf(na + 2.4 * (gli - 100) / 100, 1)}</b> (Hillier, 2,4) mEq/L.<br>`;
      hh += `ACT = ${nf(p.w, 1)} kg × ${nf(f, 2)} = <b>${nf(act, 1)} L</b>.`;
      h += box('', hh);
      const dpl = (solNa + infK - na) / (act + 1);
      const lim = risco ? 8 : 10;
      h += box('', `<b>Adrogué-Madias:</b> 1 L da solução muda o Na em <b>${dpl >= 0 ? '+' : ''}${nf(dpl, 2)} mEq/L</b> = (${solNa}${infK ? ' + ' + infK : ''} − ${nf(na, 0)}) / (${nf(act, 1)} + 1).<br><span class="src">Não considera perdas urinárias/insensíveis — dosar Na a cada 2–4 h.</span>`);
      if (na < 135) {
        const target = isFinite(alvo) ? alvo : na + Math.min(lim, 8);
        const d = target - na;
        if (dpl > 0) {
          const L = d / dpl;
          h += box(d > lim ? 'bad' : 'ok', `Para subir <b>${nf(d, 1)} mEq/L</b> (até ${nf(target, 0)}): <b>${nf(L * 1000, 0)} mL</b> da solução em 24 h ≈ <b>${nf(L * 1000 / 24, 1)} mL/h</b>.<br>Limite de correção: <b>${lim} mEq/L em 24 h</b>${risco ? ' (alto risco de desmielinização)' : ' (8 se alto risco)'}${d > lim ? ' — <b>alvo acima do limite!</b>' : ''}.`);
        }
        h += box('warnb', `<b>Sintomas graves</b> (convulsão, coma, vômitos, desconforto respiratório): <b>NaCl 3% 150 mL em 20 min</b> (ou 2 mL/kg = ${nf(2 * p.w, 0)} mL), repetir até 2–3× até +5 mEq/L.<br>Preparo NaCl 3% 500 mL: SF 0,9% 445 mL + NaCl 20% 55 mL.<br>Hipercorreção: SG 5% ${nf(3 * p.w, 0)} mL/h (3 mL/kg/h) ± desmopressina 2 mcg IV.`);
      } else if (na > 145) {
        const deficit = act * (na / 140 - 1);
        h += box('', `Déficit de água livre = ACT × (Na/140 − 1) = <b>${nf(deficit, 1)} L</b>.<br>Crônica (>48 h): reduzir ≤10–12 mEq/L em 24 h (~0,5 mEq/L/h)${isFinite(alvo) ? '' : ' — informe o alvo para calcular o volume da solução escolhida'}.`);
        if (isFinite(alvo) && dpl < 0) { const L = (alvo - na) / dpl; h += box(na - alvo > 12 ? 'bad' : 'ok', `Para baixar até <b>${nf(alvo, 0)}</b>: <b>${nf(L * 1000, 0)} mL</b> em 24 h ≈ <b>${nf(L * 1000 / 24, 1)} mL/h</b> + repor perdas insensíveis (~800–1.000 mL/dia) e urinárias.${na - alvo > 12 ? ' <b>Queda acima do recomendado.</b>' : ''}`); }
      }
    } else h += `<p class="src">Informe o Na e o peso.</p>`;
  }
  if (id === 'potassio') {
    const k = cv('kK'), mg = cv('kMg'), via = ($('kVia') || {}).value || 'p';
    if (isFinite(k)) {
      if (k >= 5.5) h += box('bad', `Hipercalemia — ver protocolo <b>Hipercalemia</b> na Sala Vermelha (ECG imediato).`);
      else if (k < 3.5) {
        const grave = k < 2.5, mod = k < 3;
        const def = (3.5 - k) * 100; // ~100 mEq por 0,3? usar faixa
        h += box(grave ? 'bad' : mod ? 'warnb' : '', `<b>Hipocalemia ${grave ? 'grave' : mod ? 'moderada' : 'leve'}</b> (K ${nf(k, 1)}). Déficit corporal estimado: ~<b>${nf((3.5 - k) * 200, 0)}–${nf((3.5 - k) * 400, 0)} mEq</b> (≈200–400 mEq para cada 1 mEq/L abaixo de 3,5) — repor em etapas com dosagens.`);
        const ivTxt = via === 'c'
          ? `<b>Central:</b> SF 0,9% 100 mL + KCl 19,1% 8 mL (20 mEq) em 1 h (até 20 mEq/h; 40 mEq/h só se ameaça à vida, com monitor).`
          : `<b>Periférico:</b> SF 0,9% 500 mL + KCl 19,1% 8 mL (20 mEq = 40 mEq/L) a 125–250 mL/h (≤10 mEq/h). Concentração máx. periférica ~60 mEq/L.`;
        h += box('', `${mod || grave ? `<b>IV</b> (K &lt;3 ou sintomas/arritmia/ECG): ${ivTxt}<br>` : ''}<b>VO:</b> ${mod || grave ? 'associar' : ''} KCl xarope 6% (15 mL = 12 mEq) ou cápsula 600 mg (8 mEq): ${mod || grave ? '40 mEq 3–4×/dia' : '10–20 mEq 2–4×/dia (20–80 mEq/dia)'}.<br><span class="src">Apresentações: KCl 19,1% 10 mL = 25 mEq (2,5 mEq/mL); KCl 10% 10 mL = 13,4 mEq. Nunca IV em bolus. Dosar K a cada 4–6 h na reposição IV.</span>`);
        if (!isFinite(mg) || mg < 2) h += box('warnb', `Corrigir <b>magnésio</b> junto (hipomagnesemia impede a correção do K): sulfato de magnésio 2 g IV em 1–2 h.`);
      } else h += box('ok', 'Potássio normal.');
    }
  }
  if (id === 'camgp') {
    const ca = cv('cCa'), alb = cv('cAlb'), cai = cv('cCai'), mg = cv('cMg'), ph = cv('cP');
    if (isFinite(ca)) {
      const cc = isFinite(alb) ? ca + 0.8 * (4 - alb) : ca;
      h += box(cc < 7.5 || cc > 13 ? 'bad' : cc < 8.5 || cc > 10.5 ? 'warnb' : 'ok', `Ca corrigido = ${nf(ca, 1)} + 0,8 × (4 − ${isFinite(alb) ? nf(alb, 1) : '4'}) = <b>${nf(cc, 1)} mg/dL</b> (prefira o Ca iônico, normal 1,12–1,32 mmol/L).`);
      if (cc < 7.5 || (isFinite(cai) && cai < 0.9)) h += box('', `<b>Hipocalcemia grave/sintomática:</b> gluconato de cálcio 10% <b>10–20 mL (1–2 g)</b> em 50–100 mL SG 5% em 10–20 min; depois infusão <b>0,5–1,5 mg/kg/h de Ca elementar</b> = ${nf(0.5 * p.w, 0)}–${nf(1.5 * p.w, 0)} mL/h da solução <b>gluconato 10% 110 mL + SG 5% 890 mL</b> (1 mg/mL). Corrigir Mg antes.`);
      if (cc > 12) h += box('', `<b>Hipercalcemia ${cc >= 14 ? 'grave' : 'moderada'}:</b> SF 0,9% 200–300 mL/h (diurese 100–150 mL/h); <b>ácido zoledrônico 4 mg IV em 15 min</b> (ou pamidronato 60–90 mg em 2–4 h); calcitonina 4 UI/kg SC/IM 12/12h por 48 h (efeito rápido); furosemida só após volemia; corticoide se linfoma/granulomatose; diálise se refratária/IR.`);
    }
    if (isFinite(mg)) {
      if (mg < 1.2) h += box('bad', `<b>Hipomagnesemia grave</b> (Mg ${nf(mg, 1)}): sulfato de magnésio <b>2 g IV em 15 min</b> se arritmia/torsades/convulsão; depois 4–8 g em 12–24 h (ex.: 4 g em 250 mL em 4 h). Ampola 50%: 1 mL = 500 mg = 4 mEq. Cuidado na insuficiência renal.`);
      else if (mg < 1.8) h += box('warnb', `Hipomagnesemia leve/moderada: sulfato de magnésio 1–2 g IV em 1–2 h, ou VO (óxido/cloreto de Mg) se assintomático.`);
      else if (mg > 4) h += box('bad', `Hipermagnesemia: suspender Mg; gluconato de cálcio 10% 10–20 mL IV se sintomática (hiporreflexia, bradicardia, depressão respiratória); diálise se IR.`);
    }
    if (isFinite(ph)) {
      if (ph < 1) h += box('bad', `<b>Hipofosfatemia grave</b> (P ${nf(ph, 1)}): fosfato IV 0,08–0,16 mmol/kg em 6 h (= ${nf(0.08 * p.w, 1)}–${nf(0.16 * p.w, 1)} mmol), máx. 7,5 mmol/h; fosfato de potássio 3 mmol/mL (4,4 mEq K/mL) — atenção ao K. Dosar a cada 6 h.`);
      else if (ph < 2.5) h += box('warnb', `Hipofosfatemia: reposição VO (fosfato 250–500 mg 3×/dia) se assintomático; IV se <1–1,5, sintomático ou em ventilação/realimentação.`);
    }
    if (!h) h = '<p class="src">Preencha os campos.</p>';
  }
  if (id === 'bic') {
    const hc = cv('bHco3'), al = cv('bAlvo'), ph = cv('bPh');
    if (isFinite(hc) && p.w) {
      const alvo = isFinite(al) ? al : 15, def = 0.5 * p.w * (alvo - hc);
      h += box(def > 0 ? '' : 'ok', `Déficit de bicarbonato = 0,5 × ${nf(p.w, 1)} kg × (${nf(alvo, 0)} − ${nf(hc, 1)}) = <b>${nf(Math.max(def, 0), 0)} mEq</b> (= ${nf(Math.max(def, 0), 0)} mL de NaHCO₃ 8,4%). Repor <b>metade em 4–6 h</b> e recalcular.`);
      h += box('warnb', `Indicações aceitas: <b>pH &lt;7,1–7,2 com AG normal</b> (diarreia/ATR), <b>LRA grave com pH ≤7,2</b> (BICAR-ICU), hipercalemia com acidose, intoxicação por tricíclico/salicilato. Na cetoacidose, só se <b>pH &lt;7,0</b>. Não usar para "corrigir lactato".<br>Isotônico: <b>150 mEq (150 mL de 8,4%) + 850 mL de água destilada ou SG 5%</b>. ${isFinite(ph) && ph >= 7.2 ? 'pH atual ≥7,2: em geral não indicado.' : ''}`);
    }
  }
  if (id === 'renal') {
    if (p.cr && p.age) {
      h += box(p.egfr < 30 ? 'bad' : p.egfr < 60 ? 'warnb' : 'ok', `<b>TFG CKD-EPI 2021</b> (sem raça) = <b>${nf(p.egfr, 0)} mL/min/1,73 m²</b> (${p.egfr >= 90 ? 'G1' : p.egfr >= 60 ? 'G2' : p.egfr >= 45 ? 'G3a' : p.egfr >= 30 ? 'G3b' : p.egfr >= 15 ? 'G4' : 'G5'}).`);
      if (p.clcr) h += box(p.clcr < 30 ? 'bad' : p.clcr < 50 ? 'warnb' : 'ok', `<b>ClCr Cockcroft-Gault</b> = (140 − ${p.age}) × ${nf(p.imc >= 30 ? p.aj : p.w, 1)} kg${p.imc >= 30 ? ' (peso ajustado, IMC ≥30)' : ''} / (72 × ${nf(p.cr, 2)})${p.sex === 'F' ? ' × 0,85' : ''} = <b>${nf(p.clcr, 0)} mL/min</b> — use para <b>ajuste de dose</b> de fármacos.`);
    } else h += `<p class="src">Informe creatinina e idade na barra do paciente.</p>`;
    if (p.h && p.w) {
      h += box('', `<b>Peso predito</b> (ARDSNet/Devine) = ${p.sex === 'M' ? '50' : '45,5'} + 0,91 × (${nf(p.h, 0)} − 152,4) = <b>${nf(p.pp, 1)} kg</b> → VC 6 mL/kg = <b>${nf(6 * p.pp, 0)} mL</b> · 8 mL/kg = ${nf(8 * p.pp, 0)} mL<br>
        IMC = <b>${nf(p.imc, 1)} kg/m²</b> · <b>Peso ajustado</b> = PI + 0,4 × (real − PI) = <b>${nf(p.aj, 1)} kg</b> · SC (Mosteller) = <b>${nf(Math.sqrt(p.h * p.w / 3600), 2)} m²</b>`);
    }
  }
  if (id === 'osm') {
    const na = cv('oNa'), gl = cv('oGli'), ur = cv('oUr'), et = cv('oEt') || 0, med = cv('oMed'), pas = cv('oPas'), pad = cv('oPad'), fc = cv('oFc');
    if (isFinite(na) && isFinite(gl)) {
      const calc = 2 * na + gl / 18 + (isFinite(ur) ? ur / 6 : 0) + et / 3.7, ef = 2 * na + gl / 18;
      h += box('', `Osmolaridade calculada = 2×Na + glicose/18 + ureia/6${et ? ' + etanol/3,7' : ''} = <b>${nf(calc, 0)} mOsm/L</b> · efetiva (tonicidade) = <b>${nf(ef, 0)}</b>${isFinite(med) ? `<br>Gap osmolar = ${nf(med, 0)} − ${nf(calc, 0)} = <b>${nf(med - calc, 0)}</b> ${med - calc > 10 ? '→ <b>aumentado</b>: metanol, etilenoglicol, isopropanol, manitol, cetoacidose/lactato grave' : '(normal ≤10)'}` : ''}`);
    }
    if (isFinite(pas) && isFinite(pad)) h += box('', `PAM = (PAS + 2×PAD)/3 = <b>${nf((pas + 2 * pad) / 3, 0)} mmHg</b>${isFinite(fc) ? ` · Índice de choque (FC/PAS) = <b>${nf(fc / pas, 2)}</b> ${fc / pas >= 1 ? '→ alto risco (hemorragia/choque)' : fc / pas >= 0.8 ? '→ atenção' : ''}` : ''}`);
    if (!h) h = '<p class="src">Preencha os campos.</p>';
  }
  out.innerHTML = h;
}
