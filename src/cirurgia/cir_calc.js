// Calculadoras cirúrgicas adicionais: queimadura (Parkland), MELD-Na, dose máxima de anestésico local.
CALCS.unshift({ id: 'queim', nome: 'Queimadura — Parkland' }, { id: 'anestl', nome: 'Anestésico local (dose máx.)' }, { id: 'meld', nome: 'MELD / MELD-Na' });
calcForm = (function (orig) {
  return function (id) {
    if (id === 'queim') return `<p class="src">Regra dos 9 (adulto): cabeça 9 · cada MS 9 · tronco anterior 18 · posterior 18 · cada MI 18 · períneo 1 · palma do paciente ≈1%. Só 2º e 3º graus.</p>
      <div class="inf-row">${fld('qScq', 'SCQ (%) 2º+3º grau', '20')}
      <div><label for="qTipo">Tipo</label><select id="qTipo" data-cin="1"><option value="2">Térmica — 2 mL/kg/% (ATLS/ABA)</option><option value="4" ${CALC_ST.v.qTipo === '4' ? 'selected' : ''}>Elétrica — 4 mL/kg/%</option><option value="3" ${CALC_ST.v.qTipo === '3' ? 'selected' : ''}>3 mL/kg/% (criança/protocolo local)</option></select></div>
      ${fld('qH', 'Horas desde a queimadura', '0', '0.5')}</div><div id="calcOut"></div>`;
    if (id === 'anestl') return `<div class="inf-row">
      <div><label for="alDroga">Anestésico</label><select id="alDroga" data-cin="1">${[['lido', 'Lidocaína'], ['lidov', 'Lidocaína com vasoconstritor'], ['bupi', 'Bupivacaína'], ['bupiv', 'Bupivacaína com vasoconstritor'], ['ropi', 'Ropivacaína']].map(([v, l]) => `<option value="${v}" ${CALC_ST.v.alDroga === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      <div><label for="alConc">Concentração (%)</label><select id="alConc" data-cin="1">${['0.25', '0.5', '0.75', '1', '2'].map((c) => `<option value="${c}" ${(CALC_ST.v.alConc || '1') === c ? 'selected' : ''}>${c.replace('.', ',')}%</option>`).join('')}</select></div></div><div id="calcOut"></div>`;
    if (id === 'meld') return `<p class="src">Creatinina da barra do paciente se não preencher aqui. Valores <1 são arredondados para 1; creatinina máx. 4 (ou 4 se diálise).</p>
      <div class="inf-row">${fld('mBil', 'Bilirrubina total (mg/dL)', '1,0', '0.1')}${fld('mInr', 'INR', '1,0', '0.1')}${fld('mCr', 'Creatinina (mg/dL)', '', '0.1')}${fld('mNa', 'Sódio (mEq/L)', '137')}
      <div><label for="mDial">Diálise ≥2×/semana</label><select id="mDial" data-cin="1"><option value="0">Não</option><option value="1" ${CALC_ST.v.mDial === '1' ? 'selected' : ''}>Sim</option></select></div></div><div id="calcOut"></div>`;
    return orig(id);
  };
})(calcForm);
calcRun = (function (orig) {
  return function () {
    const id = CALC_ST.id, out = $('calcOut'); if (!out) return;
    const p = P(); let h = '';
    if (id === 'queim') {
      const scq = cv('qScq'), k = parseFloat(($('qTipo') || {}).value || '2'), hrs = cv('qH') || 0;
      if (isFinite(scq) && p.w) {
        const tot = k * p.w * scq, h8 = tot / 2, rest = Math.max(0, 8 - hrs);
        h += box(scq >= 20 ? 'bad' : 'warnb', `Ringer lactato em 24 h = ${k} × ${nf(p.w, 1)} kg × ${nf(scq, 0)}% = <b>${nf(tot, 0)} mL</b>.<br>Primeiras 8 h (desde a queimadura): <b>${nf(h8, 0)} mL</b>${hrs > 0 && hrs < 8 ? ` → restam ${nf(rest, 1)} h: <b>${nf(h8 / rest, 0)} mL/h</b>` : ` = <b>${nf(h8 / 8, 0)} mL/h</b>`}${hrs >= 8 ? ' (já passou das 8 h — ajustar pelo débito urinário)' : ''}.<br>16 h seguintes: <b>${nf(h8, 0)} mL</b> = <b>${nf(h8 / 16, 0)} mL/h</b>.`);
        h += box('', `Meta de diurese: <b>${nf((k === 4 ? 1 : 0.5) * p.w, 0)} mL/h</b> (${k === 4 ? '1' : '0,5'} mL/kg/h). Ajustar a vazão ±20–30% a cada hora conforme diurese — a fórmula é só o ponto de partida.${scq >= 20 ? '<br><b>SCQ ≥20%</b>: reposição venosa formal, sonda vesical, transferir para centro de queimados.' : ''}`);
      } else h = '<p class="src">Informe SCQ e peso.</p>';
    }
    if (id === 'anestl') {
      const d = ($('alDroga') || {}).value || 'lido', c = parseFloat(($('alConc') || {}).value || '1');
      const tab = { lido: [4.5, 300, 'Lidocaína sem vasoconstritor'], lidov: [7, 500, 'Lidocaína com vasoconstritor'], bupi: [2.5, 175, 'Bupivacaína'], bupiv: [3, 225, 'Bupivacaína com vasoconstritor'], ropi: [3, 225, 'Ropivacaína'] }[d];
      if (p.w) {
        const mg = Math.min(tab[0] * p.w, tab[1]), mgml = c * 10;
        h += box('warnb', `${tab[2]}: máx. <b>${nf(tab[0], 1)} mg/kg</b> (teto ${tab[1]} mg) → <b>${nf(mg, 0)} mg</b> = <b>${nf(mg / mgml, 1)} mL</b> a ${String(c).replace('.', ',')}% (${nf(mgml, 1)} mg/mL).`);
        h += box('', 'Toxicidade (LAST): gosto metálico, parestesia perioral, zumbido → convulsão → arritmia/PCR. Parar a injeção, via aérea, benzodiazepínico, <b>emulsão lipídica 20% 1,5 mL/kg em bolus + 0,25 mL/kg/min</b>; PCR: adrenalina em doses menores (≤1 mcg/kg). Reduzir dose em idosos, cardiopatas, hepatopatas e gestantes.');
      } else h = '<p class="src">Informe o peso.</p>';
    }
    if (id === 'meld') {
      let bil = cv('mBil'), inr = cv('mInr'), cr = cv('mCr'), na = cv('mNa'); const dial = ($('mDial') || {}).value === '1';
      if (!isFinite(cr)) cr = p.cr || NaN;
      if ([bil, inr, cr].every(isFinite)) {
        bil = Math.max(bil, 1); inr = Math.max(inr, 1); cr = dial ? 4 : Math.min(Math.max(cr, 1), 4);
        const meld = Math.round(10 * (0.957 * Math.log(cr) + 0.378 * Math.log(bil) + 1.12 * Math.log(inr) + 0.643));
        let meldna = meld;
        if (isFinite(na) && meld > 11) { const n = Math.min(Math.max(na, 125), 137); meldna = Math.round(meld + 1.32 * (137 - n) - 0.033 * meld * (137 - n)); }
        h += box(meldna >= 20 ? 'bad' : meldna >= 10 ? 'warnb' : 'ok', `MELD = <b>${meld}</b> · MELD-Na = <b>${meldna}</b><br>Mortalidade pós-operatória (cirurgia abdominal de urgência/eletiva) aumenta ~1%/ponto acima de 8; <b>MELD &lt;10</b>: risco aceitável; <b>10–15</b>: cautela/otimizar; <b>&gt;15–20</b>: evitar cirurgia eletiva (considerar centro de transplante). Associe Child-Pugh (aba Escores).`);
      } else h = '<p class="src">Preencha bilirrubina, INR e creatinina.</p>';
    }
    if (h) { out.innerHTML = h; return; }
    return orig();
  };
})(calcRun);
