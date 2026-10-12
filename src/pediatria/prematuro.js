// Seguimento do prematuro — portado da "Calculadora do Prematuro" (set/2026), no padrão DoseCerta.
// Usa os campos da Puericultura (pnDN, pnDC, pnIG, pnIGd, pnPN, pnDAnt, pnWAnt) e o peso da barra do paciente.
const PREM = (function(){
const DAY = 86400000;
const parseD = (s) => { if (!s) return null; const [y, m, d] = s.split("-").map(Number); return Date.UTC(y, m - 1, d); };
const fmtD = (t) => { const d = new Date(t); return `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`; };
const addDays = (t, n) => t + n * DAY;
const addMonths = (t, n) => { const d = new Date(t); const day = d.getUTCDate(); const r = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1)); const last = new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth() + 1, 0)).getUTCDate(); r.setUTCDate(Math.min(day, last)); return r.getTime(); };
function ymd(from, to) { // anos, meses, dias entre duas datas (to >= from)
  const a = new Date(from), b = new Date(to);
  let y = b.getUTCFullYear() - a.getUTCFullYear(), m = b.getUTCMonth() - a.getUTCMonth(), d = b.getUTCDate() - a.getUTCDate();
  if (d < 0) { m -= 1; d += new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), 0)).getUTCDate(); }
  if (m < 0) { y -= 1; m += 12; }
  return { y, m, d, months: y * 12 + m + d / 30.44 };
}
const pl = (n, s, p) => `${n} ${n === 1 ? s : p}`;
function ymdTxt(o) { const parts = []; if (o.y) parts.push(pl(o.y, "ano", "anos")); if (o.m) parts.push(pl(o.m, "mês", "meses")); if (o.d || !parts.length) parts.push(pl(o.d, "dia", "dias")); return parts.join(", "); }
const wd = (days) => `${Math.floor(days / 7)} sem + ${days % 7} d`;
const nf = (x, d = 1) => Number(x.toFixed(d)).toLocaleString("pt-BR", { maximumFractionDigits: d });
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const needBaby = `<p class="src">Preencha <b>data de nascimento</b> e <b>IG ao nascer</b> acima. Peso ao nascer e peso atual (barra do paciente) liberam suplementos e vacinas especiais.</p>`;
function readBaby() {
  const dn = parseD($("pnDN").value), hoje = parseD($("pnDC").value);
  const igs = parseInt($("pnIG").value, 10), igd = parseInt($("pnIGd").value || "0", 10);
  const pn = parseFloat(($("pnPN").value || "").replace(",", "."));
  const wkg = parseFloat($("ptWeight").value) || 0, pa = wkg * 1000;
  const ig = igs >= 20 && igs <= 44 && igd >= 0 && igd <= 6 ? igs * 7 + igd : null;
  const ok = dn !== null && hoje !== null && ig !== null && hoje >= dn;
  const B = { dn, hoje, ig, pn: pn > 200 && pn < 7000 ? pn : null, pa: pa > 200 && pa < 80000 ? pa : null, ok };
  if (!ok) return B;
  B.chronoDays = Math.round((hoje - dn) / DAY);
  B.chrono = ymd(dn, hoje);
  B.pmaDays = ig + B.chronoDays;
  B.dpp = addDays(dn, 280 - ig);
  B.preterm = ig < 259;
  B.corrDays = Math.round((hoje - B.dpp) / DAY);
  B.corr = B.corrDays >= 0 ? ymd(B.dpp, hoje) : null;
  B.corrMonths = B.corrDays >= 0 ? B.corr.months : B.corrDays / 30.44;
  B.correctUntil = addMonths(dn, ig < 196 ? 36 : 24);
  B.stillCorrect = B.preterm && hoje < B.correctUntil;
  B.ageForUse = B.stillCorrect ? B.corrMonths : B.chrono.months;
  B.w = B.pa ? B.pa / 1000 : null;
  return B;
}
function classIG(ig) {
  if (ig < 196) return ["Prematuro extremo", "<28 semanas", "hot"];
  if (ig < 224) return ["Muito prematuro", "28 a 31+6 semanas", "hot"];
  if (ig < 238) return ["Prematuro moderado", "32 a 33+6 semanas", ""];
  if (ig < 259) return ["Prematuro tardio", "34 a 36+6 semanas", ""];
  if (ig < 294) return ["A termo", "37 a 41+6 semanas", "ok"];
  return ["Pós-termo", "≥42 semanas", ""];
}
function classPN(pn) {
  if (!pn) return null;
  if (pn < 1000) return ["Extremo baixo peso", "<1.000 g", "hot"];
  if (pn < 1500) return ["Muito baixo peso", "<1.500 g", "hot"];
  if (pn < 2500) return ["Baixo peso", "<2.500 g", ""];
  if (pn <= 4000) return ["Peso adequado", "2.500–4.000 g", "ok"];
  return ["Macrossomia", ">4.000 g", ""];
}
function tabIdade(B) {
  if (!B.ok) return needBaby;
  const [ci, cr, ck] = classIG(B.ig), cp = classPN(B.pn);
  let h = `<div class="big">`;
  h += `<div class="stat"><div class="l">Idade cronológica</div><div class="v">${ymdTxt(B.chrono)}</div><div class="d">${B.chronoDays} dias · ${wd(B.chronoDays)}</div></div>`;
  if (B.corrDays < 0) {
    h += `<div class="stat main"><div class="l">Idade pós-menstrual (IPM)</div><div class="v">${wd(B.pmaDays)}</div><div class="d">Ainda não chegou ao termo — use a IPM. Faltam ${-B.corrDays} dias para 40 semanas (${fmtD(B.dpp)}).</div></div>`;
  } else {
    h += `<div class="stat main"><div class="l">Idade corrigida</div><div class="v">${B.preterm ? ymdTxt(B.corr) : "não se aplica"}</div><div class="d">${B.preterm ? `${B.corrDays} dias após o termo · ${wd(B.corrDays)}` : "Nasceu a termo: use a idade cronológica."}</div></div>`;
    h += `<div class="stat"><div class="l">Idade pós-menstrual</div><div class="v">${wd(B.pmaDays)}</div><div class="d">IG ao nascer + idade cronológica</div></div>`;
  }
  h += `</div>`;
  h += `<div class="chips"><span class="chip ${ck}">${ci} (${cr})</span>${cp ? `<span class="chip ${cp[2]}">${cp[0]} (${cp[1]})</span>` : ""}</div>`;
  if (B.preterm) {
    h += `<div class="box"><h3>Como foi calculado</h3><div class="ex">Faltou para 40 semanas: 40 sem − ${wd(B.ig)} = ${wd(280 - B.ig)}
Data em que completaria 40 semanas (data provável do parto): ${fmtD(B.dpp)}
Idade corrigida = data da consulta − ${fmtD(B.dpp)}${B.corrDays >= 0 ? ` = ${ymdTxt(B.corr)}` : " → ainda negativa"}
Idade pós-menstrual = ${wd(B.ig)} + ${wd(B.chronoDays)} = ${wd(B.pmaDays)}</div></div>`;
    h += `<div class="box"><h3>Use a idade corrigida até ${fmtD(B.correctUntil)}</h3><p>${B.ig < 196 ? "Nasceu com <28 semanas: corrigir até <b>3 anos</b> de idade cronológica." : "Corrigir até <b>2 anos</b> de idade cronológica."} ${B.stillCorrect ? "Hoje: <b>ainda corrigir</b>." : "Hoje: <b>já não precisa corrigir</b>."}</p>
    <ul><li><b>Usar a idade corrigida para:</b> crescimento (peso, comprimento, PC nas curvas), desenvolvimento (marcos), início da alimentação complementar e expectativa de sono/choro.</li>
    <li><b>Usar a idade cronológica para:</b> <b>vacinas</b>, limites de idade de vacinas (rotavírus), datas de suplementação de ferro, nirsevimabe e prazos de triagens (ROP, por exemplo).</li></ul></div>`;
    const pmaW = B.pmaDays / 7;
    const curva = pmaW < 64 ? `<b>INTERGROWTH-21st pós-natal para prematuros</b> (27 a 64 semanas de IPM — está na Caderneta da Criança). Plotar pela <b>idade pós-menstrual</b> (${wd(B.pmaDays)}).` : `<b>Curvas da OMS</b> (Caderneta), plotando pela <b>idade ${B.stillCorrect ? "corrigida" : "cronológica"}</b>.`;
    h += `<div class="box"><h3>Curva de crescimento para hoje</h3><p>${curva}</p></div>`;
    const eq = B.corrDays < 0 ? null : B.corrMonths;
    if (eq !== null) {
      const cons = [0.25, 1, 2, 4, 6, 9, 12, 18, 24, 36].reduce((a, c) => (Math.abs(c - eq) < Math.abs(a - eq) ? c : a));
      h += `<div class="box"><h3>Consulta de puericultura equivalente</h3><p>Pela idade corrigida, avalie desenvolvimento e alimentação como na consulta de <b>${cons < 1 ? "1ª semana/1 mês" : cons + " meses"}</b>. Vacinas seguem a idade cronológica (${ymdTxt(B.chrono)}).</p></div>`;
    }
  }
  return h;
}
const VACS = [
  [0, "Ao nascer", ["BCG", "Hepatite B"]],
  [2, "2 meses", ["Penta (ou Hexa no CRIE)", "VIP", "Rotavírus D1", "Pneumo 20 D1"]],
  [3, "3 meses", ["Meningo C D1"]],
  [4, "4 meses", ["Penta/Hexa D2", "VIP D2", "Rotavírus D2", "Pneumo D2"]],
  [5, "5 meses", ["Meningo C D2"]],
  [6, "6 meses", ["Penta/Hexa D3", "VIP D3", "COVID-19 D1", "Influenza (2 doses na 1ª vez)"]],
  [7, "7 meses", ["COVID-19 D2"]],
  [9, "9 meses", ["Febre amarela", "COVID-19 D3"]],
  [12, "12 meses", ["Pneumo 20 reforço", "Meningo ACWY", "Tríplice viral"]],
  [15, "15 meses", ["DTP/DTPa reforço", "VIP reforço", "Tetraviral", "Hepatite A"]],
  [48, "4 anos", ["DTP/DTPa reforço", "VIP reforço", "Varicela D2", "Febre amarela reforço"]],
];
function tabVac(B) {
  if (!B.ok) return needBaby;
  const crie = B.ig < 231 || (B.pn && B.pn < 1500);
  let h = `<p><b>Vacinas seguem a idade cronológica</b> (não corrigir), inclusive no prematuro extremo, desde que clinicamente estável.</p>`;
  h += `<div class="tbl"><table><thead><tr><th>Idade</th><th>Data</th><th>Vacinas (PNI 2026)</th></tr></thead><tbody>`;
  const now = B.hoje;
  VACS.forEach(([m, n, vs], i) => {
    const t = addMonths(B.dn, m), next = i < VACS.length - 1 ? addMonths(B.dn, VACS[i + 1][0]) : Infinity;
    const cls = t <= now && now < next ? "now" : t < now ? "past" : "";
    h += `<tr class="${cls}"><td><b>${n}</b></td><td>${fmtD(t)}</td><td>${vs.join(" · ")}</td></tr>`;
  });
  h += `</tbody></table></div>`;
  h += `<div class="box"><h3>Particularidades deste bebê</h3><ul>`;
  h += `<li><b>BCG:</b> aplicar quando atingir <b>2.000 g</b>${B.pn && B.pn < 2000 ? " — <b>nasceu com menos de 2 kg</b>: confirmar se já foi feita" : ""}.</li>`;
  h += `<li><b>Hepatite B:</b> ${B.ig < 231 || (B.pn && B.pn < 2000) ? "<b>&lt;2.000 g ou &lt;33 semanas → esquema de 4 doses</b> (ao nascer + 2, 4 e 6 meses — já contemplado pela penta/hexa)." : "dose ao nascer + penta aos 2, 4 e 6 meses."}</li>`;
  h += `<li><b>Hexavalente acelular (CRIE):</b> ${crie ? "<b>indicada</b> — nasceu com &lt;33 semanas ou &lt;1.500 g: hexa aos 2, 4 e 6 m e DTPa nos reforços (15 m e 4 anos). Encaminhar ao CRIE." : "não indicada por prematuridade (critério: &lt;33 semanas ou &lt;1.500 g)."}</li>`;
  h += `<li><b>Rotavírus:</b> D1 entre ${fmtD(addDays(addMonths(B.dn, 1), 15))} e ${fmtD(addDays(addMonths(B.dn, 12), -1))}; D2 entre ${fmtD(addDays(addMonths(B.dn, 3), 15))} e ${fmtD(addDays(addMonths(B.dn, 24), -1))}. Vacina viva oral: aplicar após a alta (não na UTI).</li>`;
  const nirLim = addMonths(B.dn, 6);
  h += `<li><b>Nirsevimabe (VSR) no SUS:</b> ${B.ig <= 258 ? `prematuro ≤36s6d → elegível enquanto tiver &lt;6 meses (até ${fmtD(addDays(nirLim, -1))}), em qualquer época do ano${now < nirLim ? " — <b>hoje elegível</b>" : " — <b>prazo vencido</b> (ver comorbidades)"}.` : "a termo: só se comorbidade."} Com comorbidade (DBP, cardiopatia, imunodeficiência, Down etc.): até 24 m na sazonalidade (fev–ago).</li>`;
  h += `<li><b>Influenza:</b> a partir de 6 meses cronológicos; vacinar também os contactantes domiciliares.</li></ul></div>`;
  return h;
}
function tabSup(B) {
  if (!B.ok) return needBaby;
  const w = B.w;
  const g = (mgkg) => w ? `<span class="sv-dose">${nf(mgkg * w, 1)} mg/dia = ${Math.max(1, Math.round(mgkg * w / 1.25))} gotas <small>[${mgkg} mg/kg/dia · sulfato ferroso 25 mg/mL, 1 gota ≈ 1,25 mg]</small></span>` : `<span class="sv-dose">${mgkg} mg/kg/dia <small>(informe o peso atual)</small></span>`;
  const d30 = addDays(B.dn, 30), y1 = addMonths(B.dn, 12), y2 = addMonths(B.dn, 24);
  let h = `<h3 style="margin-top:0">Ferro profilático (SBP 2026)</h3>`;
  const pn = B.pn;
  if (B.preterm || (pn && pn < 2500)) {
    if (!pn) h += `<p>Informe o <b>peso ao nascer</b>.</p>`;
    else {
      const k = pn < 1000 ? 4 : pn < 1500 ? 3 : 2;
      h += `<p>Prematuro/baixo peso com PN ${nf(pn, 0)} g → <b>${k} mg/kg/dia</b> a partir de <b>${fmtD(d30)}</b> (30 dias de vida) até <b>${fmtD(y1)}</b> (1 ano); depois <b>1 mg/kg/dia até ${fmtD(y2)}</b> (24 meses), contínuo, sem pausas.</p>`;
      const nowK = B.hoje < d30 ? null : B.hoje < y1 ? k : B.hoje < y2 ? 1 : 0;
      h += `<p>Hoje: ${nowK === null ? "ainda não iniciar (antes de 30 dias)." : nowK === 0 ? "suplementação encerrada (após 24 meses)." : g(nowK) + " VO 1x/dia, longe do leite."}</p>`;
      h += `<p class="hint">Recebeu >100 mL de concentrado de hemácias na internação: avaliar individualmente (pode iniciar mais tarde).</p>`;
    }
  } else {
    h += `<p>A termo com peso adequado: <b>10–12,5 mg/dia (8 a 10 gotas)</b> em 2 ciclos — <b>${fmtD(addMonths(B.dn, 6))} a ${fmtD(addMonths(B.dn, 9))}</b> e <b>${fmtD(addMonths(B.dn, 12))} a ${fmtD(addMonths(B.dn, 15))}</b>. Fator de risco (ex.: leite de vaca): pode iniciar aos 4 meses.</p>`;
  }
  h += `<h3>Vitamina D (SBP 2024)</h3><p><b>400 UI/dia</b> no 1º ano — no prematuro, iniciar quando <b>peso >1.500 g e dieta enteral plena</b>; depois <b>600 UI/dia</b> (1 a 18 anos). Fatores de risco (ex.: má absorção, anticonvulsivante): 1.200–1.800 UI/dia.</p>`;
  h += `<p>Hoje: <span class="sv-dose">${B.hoje < y1 ? "400 UI/dia" : "600 UI/dia"}</span> <span class="hint">(ex.: 200 UI/gota = ${B.hoje < y1 ? "2" : "3"} gotas)</span></p>`;
  if (B.preterm) {
    const z0 = addDays(B.dn, 252 - B.ig), z1 = addMonths(B.dpp, 6);
    h += `<h3>Zinco (prematuro em aleitamento materno exclusivo)</h3><p>Sulfato de zinco 10 mg/mL: <b>0,5–1 mg/kg/dia</b> de <b>${fmtD(Math.max(z0, B.dn))}</b> (36 semanas de IPM) até <b>${fmtD(z1)}</b> (6 meses de idade corrigida). ${w ? `Hoje: <span class="sv-dose">${nf(0.5 * w, 1)}–${nf(1 * w, 1)} mg/dia = ${nf(0.05 * w, 2)}–${nf(0.1 * w, 2)} mL</span>` : ""}</p>`;
    h += `<h3>Vitamina A</h3><p>Prematuro &lt;32 semanas ou &lt;1.500 g: polivitamínico com A/C/D conforme protocolo local; megadose de vitamina A do programa nacional a partir de 6 meses em áreas de risco.</p>`;
  }
  return h;
}
function tabCresc(B) {
  let h = '';
  const p1 = (parseFloat($("pnWAnt").value) || 0) * 1000, d1 = parseD($("pnDAnt").value);
  if (B.ok && B.pa && p1 > 0 && d1 !== null && B.hoje > d1) {
    const days = (B.hoje - d1) / DAY, gd = (B.pa - p1) / days, gkd = gd / (((p1 + B.pa) / 2) / 1000);
    h += `<div class="big"><div class="stat main"><div class="l">Ganho de peso</div><div class="v">${nf(gd, 1)} g/dia</div><div class="d">${nf(gkd, 1)} g/kg/dia em ${nf(days, 0)} dias</div></div></div>`;
    if (gd < 20 && B.preterm && B.corrMonths < 3) h += `<div class="box hot"><b>Ganho abaixo de 20 g/dia.</b> Revisar técnica/frequência da mamada, volume e diluição da fórmula, intercorrências (anemia, refluxo, ITU, DBP) e considerar fortificação/fórmula pós-alta com nutricionista.</div>`;
  } else h += `<p class="src">Preencha a <b>consulta anterior</b> (data e peso) acima para ver o ganho em g/dia e g/kg/dia.</p>`;
  h += `<div class="box"><h3>Metas de ganho no prematuro</h3><ul>
  <li><b>Antes do termo</b> (IPM &lt;40 sem, peso &lt;2 kg): <b>15–20 g/kg/dia</b>.</li>
  <li><b>Do termo aos 3 meses corrigidos:</b> <b>25–35 g/dia</b> (mínimo 20 g/dia); PC ~0,5–1 cm/semana no início.</li>
  <li><b>3–6 meses corrigidos:</b> 15–20 g/dia · <b>6–12 meses:</b> 10–15 g/dia.</li>
  <li><b>Recuperação (catch-up):</b> primeiro o PC, depois comprimento, por último o peso; a maioria recupera até 2–3 anos. Ganho excessivo de peso sem ganho de comprimento → risco metabólico.</li></ul></div>`;
  if (B.ok && B.w) { const w = B.w; h += `<p>Volume de leite habitual pós-alta do prematuro: <span class="sv-dose">${nf(150 * w, 0)}–${nf(180 * w, 0)} mL/dia</span> (150–180 mL/kg/dia).</p>`; }
  return h;
}
function tabTri(B) {
  if (!B.ok) return needBaby;
  const r = [];
  const rop = B.ig < 224 || (B.pn && B.pn < 1500);
  r.push(["Retinopatia da prematuridade (ROP)", rop ? `<b>Indicada</b> (IG &lt;32 sem e/ou PN &lt;1.500 g). 1º exame entre <b>${fmtD(addDays(B.dn, 28))} e ${fmtD(addDays(B.dn, 42))}</b> (4ª–6ª semana de vida); repetir conforme achados até vascularização completa (~45 sem de IPM).` : "Não pelos critérios principais; considerar se fatores de risco (sepse, transfusões, HPIV, O₂ prolongado)."]);
  r.push(["Audição", "Triagem na maternidade; se UTI >5 dias ou outro indicador de risco → <b>PEATE (BERA)</b>, não só EOA. Monitorar linguagem/audição até 3 anos."]);
  r.push(["Reflexo vermelho", "Na alta e nas consultas; prematuros têm mais estrabismo e erros de refração → oftalmologista com 6–12 m corrigidos."]);
  r.push(["Neuroimagem", B.ig < 224 ? "USG transfontanelar: na 1ª semana e repetir até o termo (≤32 sem); revisar laudos da UTI." : "USG transfontanelar se intercorrência neurológica."]);
  r.push(["Doença metabólica óssea", (B.ig < 224 || (B.pn && B.pn < 1500)) ? `Cálcio, fósforo e fosfatase alcalina a partir de 4–6 semanas (~${fmtD(addDays(B.dn, 35))}) e no seguimento; FA >500–800 UI/L com P baixo = suspeitar.` : "Rastrear só se fatores de risco (corticoide, diurético, nutrição parenteral prolongada)."]);
  r.push(["Anemia", "Hemograma e ferritina conforme risco (prematuro/BPN são grupo de risco: entre 9 e 12 meses, ou antes se palidez/baixo ganho)."]);
  r.push(["Pressão arterial", "Ex-prematuro: medir PA em todas as consultas a partir do 1º ano (não esperar 3 anos), sobretudo se cateterismo umbilical, UTI ou doença renal."]);
  let h = `<div class="tbl"><table><thead><tr><th>Triagem / exame</th><th>Para este bebê</th></tr></thead><tbody>${r.map(([a, b]) => `<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join("")}</tbody></table></div>`;
  // consultas
  const base = B.dpp > B.dn ? B.dpp : B.dn;
  const sch = [["1ª consulta", "até o 5º dia após a alta"], ["Até 6 meses corrigidos", `mensal (até ${fmtD(addMonths(base, 6))})`], ["6–12 meses corrigidos", `a cada 2–3 meses (até ${fmtD(addMonths(base, 12))})`], ["13–24 meses corrigidos", `trimestral (até ${fmtD(addMonths(base, 24))})`], ["2–4 anos", "semestral"], ["> 4 anos", "anual até a adolescência"]];
  h += `<h3>Calendário de consultas de seguimento</h3><div class="tbl"><table><thead><tr><th>Período</th><th>Frequência</th></tr></thead><tbody>${sch.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody></table></div><p class="hint">Método Canguru (3ª etapa): 3 consultas na 1ª semana, 2 na 2ª e 1 por semana até 2.500 g.</p>`;
  return h;
}
const REFS = [
  ["Ministério da Saúde — Caderneta da Criança, 7ª ed. (2024): idade corrigida e curvas INTERGROWTH-21st", "https://bvsms.saude.gov.br/bvs/publicacoes/caderneta_crianca_menina_passaporte_cidadania_7ed.pdf"],
  ["Prefeitura de Porto Alegre — Seguimento de crianças nascidas pré-termo e baixo peso na APS (dez/2024; baseado em MS e SBP)", "https://prefeitura.poa.br/sites/default/files/usu_doc/hotsites/sms/bvaps-biblioteca-virtual-de-atencao-primaria-saude/"],
  ["SBP — Recomendações para tratamento e prevenção da deficiência de ferro e anemia ferropriva em lactentes (mar/2026)", "https://www.sbp.com.br/wp-content/uploads/2026/03/25239c-Diretrizes-Recom-p-tratam-e-prevencao-da-deficiencia-de-Fe-e-anemia-ferropriva.pdf"],
  ["SBP — Documento Científico nº 181: Hipovitaminose D em pediatria (nov/2024)", "https://www.sbp.com.br/fileadmin/user_upload/sbp/2024/novembro/25/24540j-DC_HipovitD_diagn-tratam-prevenc_Atualiz.pdf"],
  ["Ministério da Saúde — Calendário Nacional de Vacinação 2026 e Instrução Normativa", "https://www.gov.br/saude/pt-br/vacinacao/arquivos/calendario-nacional-de-vacinacao-crianca"],
  ["SES-DF — Resumo das indicações do CRIE (hexavalente para <33 semanas ou <1.500 g)", "https://www.saude.df.gov.br/documents/37101/0/Resumo+das+indica%C3%A7%C3%B5es+do+CRIE+por+imunobiol%C3%B3gico+(1).pdf/843b8810-a5c8-b4f9-e76f-89e1de8e5347?t=1729850366607"],
  ["ONG Prematuridade.com — SUS amplia critérios da hexavalente para prematuros", "https://www.prematuridade.com/sus-amplia-criterios-para-aplicacao-da-vacina-hexavalente-em-prematuros"],
  ["SESA-ES — Nota Técnica nº 014/2026: nirsevimabe (Nota Técnica Conjunta nº 109/2025/MS)", "https://saude.es.gov.br/media/Imuniza%C3%A7%C3%A3o/nota-tecnica/NOTA_TECNICA_N%C2%BA_014_2026_-_SESA_SSVS_GEVS_PEI_%20_NIRSEVIMABE.pdf"],
  ["Zin A et al. — Brazilian guidelines proposal for screening and treatment of ROP. Arq Bras Oftalmol (2007)", "https://aboonline.org.br/details/1234/en-US/brazilian-guidelines-proposal-for-screening-and-treatment-of-retinopathy-of-prematurity--rop-"],
  ["Ebook Puericultura (Medway) — suplementação no prematuro (anexado)", ""],
];
const GUIA = `
<section id="g-def"><div class="kick">Guia</div><h2>1. Definições que mudam a conduta</h2>
<div class="tbl"><table><thead><tr><th>Pela idade gestacional</th><th></th><th>Pelo peso ao nascer</th><th></th></tr></thead><tbody>
<tr><td>Prematuro extremo</td><td>&lt;28 sem</td><td>Extremo baixo peso</td><td>&lt;1.000 g</td></tr>
<tr><td>Muito prematuro</td><td>28 a 31+6</td><td>Muito baixo peso</td><td>&lt;1.500 g</td></tr>
<tr><td>Prematuro moderado</td><td>32 a 33+6</td><td>Baixo peso</td><td>&lt;2.500 g</td></tr>
<tr><td>Prematuro tardio</td><td>34 a 36+6</td><td>PIG / GIG</td><td>&lt;P10 / &gt;P90 para a IG (INTERGROWTH)</td></tr></tbody></table></div>
<ul><li><b>Idade cronológica:</b> tempo desde o nascimento.</li><li><b>Idade pós-menstrual (IPM):</b> IG ao nascer + idade cronológica (em semanas). Usada <b>antes</b> de completar 40 semanas.</li><li><b>Idade corrigida:</b> idade cronológica − (40 semanas − IG ao nascer). Usada <b>depois</b> das 40 semanas.</li></ul></section>

<section id="g-ic"><h2>2. Idade corrigida sem sofrimento</h2>
<h3>Método mais rápido: a "data do termo"</h3><ol><li>Calcule quanto faltou para 40 semanas: <b>40 sem − IG ao nascer</b>.</li><li>Some esse tempo à data de nascimento → é a <b>data em que ele completaria 40 semanas</b> (anote no prontuário e na caderneta).</li><li>A idade corrigida é simplesmente a <b>idade contada a partir dessa data</b>, como se fosse um novo aniversário.</li></ol>
<div class="ex">Exemplo: nasceu em 10/01/2026 com 30 semanas.
Faltaram 40 − 30 = 10 semanas (70 dias) → data do termo = 21/03/2026.
Consulta em 10/07/2026: cronológica = 6 meses · corrigida = de 21/03 a 10/07 = 3 meses e 19 dias.
Avalie desenvolvimento e crescimento como um bebê de ~3,5 meses; vacinas de 6 meses.</div>
<div class="ex">Atalho em meses: semanas que faltaram ÷ 4,3 → meses a descontar.
28 sem → faltou 12 sem ≈ 2,8 m · 32 sem → 8 sem ≈ 1,9 m · 34 sem → 6 sem ≈ 1,4 m · 36 sem → 4 sem ≈ 0,9 m</div>
<h3>Até quando corrigir</h3><ul><li>Até <b>2 anos</b> de idade cronológica; até <b>3 anos</b> se nasceu com <b>&lt;28 semanas</b> (Caderneta da Criança).</li><li>Prematuro tardio: a diferença fica clinicamente pequena após o 1º ano, mas a regra é a mesma.</li></ul>
<h3>Para que usar cada idade</h3><div class="tbl"><table><thead><tr><th>Idade corrigida</th><th>Idade cronológica</th></tr></thead><tbody>
<tr><td>Curvas de peso, comprimento e PC</td><td>Vacinas e seus prazos (rotavírus)</td></tr><tr><td>Marcos do desenvolvimento e M-CHAT</td><td>Início do ferro (30 dias de vida) e duração</td></tr>
<tr><td>Início da alimentação complementar</td><td>Nirsevimabe (&lt;6 meses), triagem de ROP (4–6 semanas de vida)</td></tr><tr><td>Expectativas de sono, choro e comportamento</td><td>Documentos legais, licenças</td></tr></tbody></table></div></section>

<section id="g-cresc"><h2>3. Crescimento</h2><ul>
<li><b>Curvas:</b> INTERGROWTH-21st pós-natal para prematuros (27 a 64 semanas de IPM, presentes na Caderneta) → depois das 64 semanas, <b>curvas da OMS</b> plotando pela idade corrigida até 2–3 anos.</li>
<li>Meça <b>peso, comprimento (deitado, 2 pessoas) e PC</b> em toda consulta.</li>
<li><b>Metas de ganho:</b> antes do termo 15–20 g/kg/dia; termo a 3 meses corrigidos 25–35 g/dia (mínimo 20 g/dia); 3–6 m 15–20 g/dia; 6–12 m 10–15 g/dia.</li>
<li><b>Catch-up:</b> PC primeiro (primeiros 6–12 meses), depois comprimento e por último peso. Falha de catch-up do PC = alerta neurológico. Ganho de peso desproporcional ao comprimento = risco metabólico futuro.</li>
<li>PIG que não recupera estatura até 2–4 anos → endocrinologia (avaliar GH).</li></ul></section>

<section id="g-alim"><h2>4. Alimentação</h2><ul>
<li><b>Leite materno</b> é a primeira escolha (mais proteína e calorias no leite de mãe de prematuro). Apoiar ordenha e translactação; fortificar o leite humano após a alta só com indicação do serviço de seguimento.</li>
<li>Sem leite materno: <b>fórmula para prematuro/pós-alta</b> (mais proteína, minerais) geralmente até 40–52 semanas de IPM ou conforme crescimento; depois fórmula de partida. Volume habitual: 150–180 mL/kg/dia.</li>
<li><b>Alimentação complementar pela idade corrigida:</b> aos <b>6 meses corrigidos</b> se em aleitamento exclusivo; entre 4 e 6 meses corrigidos se fórmula, com sinais de prontidão (sustenta a cabeça, senta com apoio, perda do reflexo de protrusão da língua).</li>
<li>Prematuros têm mais refluxo e disfagia: posição, pausas, fracionamento; investigar se baixo ganho, engasgos repetidos ou pneumonias.</li></ul></section>

<section id="g-sup"><h2>5. Suplementos</h2><div class="tbl"><table><thead><tr><th>Suplemento</th><th>Quem</th><th>Dose e duração</th></tr></thead><tbody>
<tr><td><b>Ferro</b> (SBP 2026)</td><td>PN 1.500–2.500 g ou prematuro</td><td>2 mg/kg/dia a partir de 30 dias por 1 ano, depois 1 mg/kg/dia até 24 meses</td></tr>
<tr><td></td><td>PN 1.000–1.500 g</td><td>3 mg/kg/dia a partir de 30 dias por 1 ano, depois 1 mg/kg/dia até 24 m</td></tr>
<tr><td></td><td>PN &lt;1.000 g</td><td>4 mg/kg/dia a partir de 30 dias por 1 ano, depois 1 mg/kg/dia até 24 m</td></tr>
<tr><td><b>Vitamina D</b> (SBP 2024)</td><td>Todos</td><td>400 UI/dia no 1º ano (prematuro: quando &gt;1.500 g e dieta enteral plena); 600 UI/dia de 1 a 18 anos</td></tr>
<tr><td><b>Zinco</b></td><td>Prematuro em aleitamento exclusivo</td><td>0,5–1 mg/kg/dia de 36 semanas de IPM até 6 meses corrigidos</td></tr>
<tr><td><b>Vitaminas A/C</b></td><td>&lt;32 sem ou &lt;1.500 g</td><td>Polivitamínico conforme protocolo do serviço</td></tr></tbody></table></div>
<p class="hint">Prematuro <b>não</b> faz os ciclos com pausa do bebê a termo: o ferro é contínuo. Ajustar a dose pelo peso a cada consulta.</p></section>

<section id="g-vac"><h2>6. Vacinas</h2><ul>
<li><b>Sempre pela idade cronológica</b>, mesmo no prematuro extremo, se estável. Não adiar "porque é prematuro".</li>
<li><b>BCG:</b> quando atingir 2.000 g. <b>Hepatite B:</b> &lt;2.000 g ou &lt;33 sem → 4 doses (ao nascer + 2, 4, 6 meses via penta/hexa).</li>
<li><b>Hexavalente acelular no CRIE:</b> nascidos com <b>&lt;33 semanas ou &lt;1.500 g</b> (2, 4, 6 m; reforços com DTPa aos 15 m e 4 anos).</li>
<li><b>Rotavírus:</b> vacina viva — aplicar após a alta; D1 até 11m29d e D2 até 23m29d.</li>
<li><b>Nirsevimabe (SUS, desde 2026):</b> prematuros ≤36s6d com &lt;6 meses (ano todo) e crianças &lt;2 anos com comorbidade (DBP, cardiopatia, imunodeficiência, Down, fibrose cística, doença neuromuscular) na sazonalidade. Substituiu o palivizumabe.</li>
<li><b>Influenza</b> a partir de 6 meses e "estratégia casulo": vacinar pais e cuidadores (influenza, coqueluche/dTpa, COVID).</li></ul></section>

<section id="g-tri"><h2>7. Triagens e exames</h2><div class="tbl"><table><thead><tr><th>O quê</th><th>Quem</th><th>Quando</th></tr></thead><tbody>
<tr><td><b>ROP</b> (mapeamento de retina)</td><td>IG &lt;32 sem e/ou PN &lt;1.500 g; outros com fatores de risco</td><td>1º exame na 4ª–6ª semana de vida; repetir até vascularização completa (~45 sem de IPM)</td></tr>
<tr><td><b>Audição</b></td><td>Todos; UTI &gt;5 dias ou indicadores de risco → PEATE</td><td>Até 1 mês; monitorar linguagem e audição até 3 anos</td></tr>
<tr><td><b>Visão</b></td><td>Todos (mais estrabismo, miopia)</td><td>Reflexo vermelho em toda consulta; oftalmologista aos 6–12 m corrigidos</td></tr>
<tr><td><b>Doença metabólica óssea</b></td><td>&lt;32 sem / &lt;1.500 g</td><td>Ca, P, fosfatase alcalina a partir de 4–6 semanas</td></tr>
<tr><td><b>Anemia</b></td><td>Prematuro/BPN (grupo de risco)</td><td>Hemograma + ferritina entre 9 e 12 m, ou antes se sinais</td></tr>
<tr><td><b>Pressão arterial</b></td><td>Ex-prematuro</td><td>Em todas as consultas desde o 1º ano</td></tr></tbody></table></div></section>

<section id="g-dev"><h2>8. Desenvolvimento</h2><ul>
<li>Avaliar marcos pela <b>idade corrigida</b> usando o instrumento da Caderneta (adequado / alerta / provável atraso).</li>
<li><b>Hipertonia transitória</b> do prematuro (extensão de tronco e membros) é esperada e melhora até 12–18 m corrigidos. Diferente de paralisia cerebral: assimetria, piora progressiva, mãos fechadas com polegar incluso, reflexos primitivos persistentes.</li>
<li>Detecção precoce de PC: <b>GMA</b> (até 5 m corrigidos) e <b>HINE</b> (3–24 m) — encaminhar cedo para estimulação/fisioterapia.</li>
<li>Maior risco de atraso de linguagem, dificuldade escolar, TDAH e TEA: M-CHAT-R/F aos 18 e 24 m; acompanhar a escolaridade.</li></ul></section>

<section id="g-prob"><h2>9. Problemas frequentes no seguimento</h2><ul>
<li><b>Hérnia inguinal</b> (muito comum): encaminhar à cirurgia pediátrica <b>sem esperar</b> — risco de encarceramento. Hérnia umbilical: expectante.</li>
<li><b>Displasia broncopulmonar:</b> sibilância recorrente, O₂ domiciliar, risco de VSR grave (nirsevimabe), evitar fumo, vacinar contactantes.</li>
<li><b>Refluxo:</b> regurgitação é comum; tratar só se dor, baixo ganho ou complicação.</li>
<li><b>Apneia/morte súbita:</b> sono de barriga para cima, sem cama compartilhada, sem objetos no berço.</li>
<li><b>Anemia, raquitismo da prematuridade</b> (fosfatase alcalina elevada, fraturas), <b>criptorquidia</b> (reavaliar e encaminhar aos 6 m corrigidos), <b>estrabismo</b>.</li>
<li>Apoio à família: depressão materna, ansiedade, licenças, rede de apoio (Método Canguru, grupos de pais).</li></ul></section>

<section id="g-cons"><h2>10. Calendário de consultas</h2><div class="tbl"><table><thead><tr><th>Período</th><th>Frequência</th></tr></thead><tbody>
<tr><td>Após a alta</td><td>1ª consulta até o 5º dia (Canguru: 3 na 1ª semana, 2 na 2ª, 1/semana até 2.500 g)</td></tr>
<tr><td>Até 6 meses corrigidos</td><td>Mensal</td></tr><tr><td>6–12 meses corrigidos</td><td>A cada 2–3 meses</td></tr><tr><td>13–24 meses corrigidos</td><td>Trimestral</td></tr><tr><td>2–4 anos</td><td>Semestral</td></tr><tr><td>&gt; 4 anos</td><td>Anual até a adolescência</td></tr></tbody></table></div></section>

<section id="g-fontes"><h2>Fontes</h2><ul>${REFS.map(([n, u]) => `<li>${esc(n)}${u ? ` — <a href="${u}" target="_blank" rel="noopener">link</a><span class="pu" hidden> ${esc(u)}</span>` : ""}</li>`).join("")}</ul>
<p class="warn">Material de apoio. Confira protocolos locais (CRIE, ROP, fórmulas disponíveis) e as atualizações do PNI. Consultas às fontes em 01/10/2026.</p></section>`;
const TABS = { idade: ["Idade e curva", tabIdade], vac: ["Vacinas com datas", tabVac], sup: ["Suplementos", tabSup], cresc: ["Metas de ganho", tabCresc], tri: ["Triagens e consultas", tabTri] };
let tab = "idade";
function render(){
  const B = readBaby();
  let h = `<div class="filters" style="margin-bottom:10px">${Object.entries(TABS).map(([k,[n]]) => `<button type="button" class="fbtn" data-pmtab="${k}" aria-pressed="${k===tab}">${n}</button>`).join("")}</div>`;
  if (B.ok && B.pmaDays < 308) h += `<div class="box hot" style="margin-top:0"><b>IPM &lt;44 semanas (${wd(B.pmaDays)}):</b> muitos fármacos têm dose e intervalo neonatais. Use formulário neonatal antes de prescrever pelo catálogo (paracetamol: 10 mg/kg/dose 8/8h a 12/12h).</div>`;
  h += TABS[tab][1](B);
  $("pmPanel").innerHTML = h;
  guiaRender();
  $("pmTitle").textContent = B.ok ? (B.preterm ? `Seguimento do prematuro — ${classIG(B.ig)[0].toLowerCase()}` : "Seguimento — nascido a termo") : "Seguimento do prematuro";
}
function setTab(t){ if (TABS[t]) { tab = t; render(); } }
let guiaDone = false;
function guiaRender(){ if (guiaDone) return; guiaDone = true; $("pmGuia").innerHTML = GUIA; }
return { render, setTab, guiaRender };
})();
