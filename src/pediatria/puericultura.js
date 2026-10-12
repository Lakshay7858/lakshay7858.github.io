// =====================================================================
// PUERICULTURA — crescimento (escore-z OMS), ganhos, marcos e roteiro
// =====================================================================

// Marcos da Caderneta da Criança (MS) — faixa: [mês inicial, mês final, itens]
const MARCOS = [
  [0, 1, ['Postura flexora (de costas, braços e pernas fletidos)', 'Observa um rosto (olha o seu rosto a ~30 cm)', 'Reage ao som (palmas/chocalho)', 'Eleva a cabeça de bruços']],
  [1, 2, ['Sorriso social', 'Abre as mãos em alguns momentos', 'Emite sons (além do choro)', 'Movimenta ativamente os membros']],
  [2, 4, ['Contato social ativo (responde com sorriso e sons)', 'Segura objetos', 'Ri alto', 'Apoia nos antebraços de bruços e levanta a cabeça']],
  [4, 6, ['Busca objetos ao alcance', 'Leva objetos à boca', 'Localiza o som (vira para o chocalho)', 'Rola de costas para de bruços']],
  [6, 9, ['Brinca de esconde-achou', 'Transfere objetos de uma mão para a outra', 'Duplica sílabas (papá, dadá)', 'Senta sem apoio']],
  [9, 12, ['Imita gestos (tchau, palmas)', 'Faz pinça (polegar + indicador)', 'Produz “jargão”', 'Anda com apoio']],
  [12, 15, ['Mostra o que quer (aponta, sem chorar)', 'Coloca blocos na caneca', 'Diz uma palavra', 'Anda sem apoio']],
  [15, 18, ['Usa colher ou garfo', 'Constrói torre de 2 cubos', 'Fala 3 palavras', 'Anda para trás']],
  [18, 24, ['Tira a roupa', 'Constrói torre de 3 cubos', 'Aponta 2 figuras entre 5', 'Chuta bola']],
  [24, 30, ['Veste-se com supervisão', 'Constrói torre de 6 cubos', 'Forma frases com 2 palavras', 'Pula com ambos os pés']],
  [30, 36, ['Brinca com outras crianças', 'Imita uma linha (traço ≥ 5 cm)', 'Reconhece 2 ações (“quem mia?”)', 'Arremessa bola por cima do braço']],
  [36, 60, ['Copia círculo e cruz', 'Fala clara e compreensível', 'Pula em um pé só', 'Veste-se sem ajuda', 'Define 5 palavras', 'Equilíbrio em um pé 3–5 s']],
  [60, 120, ['Desenha pessoa com 6 partes', 'Faz analogias', 'Marcha ponta-calcanhar (≥ 4 passos)', 'Copia quadrado e define 7 palavras']]
];
const FENOTIPO = 'fenda palpebral oblíqua, olhos afastados, orelhas de implantação baixa, lábio leporino, fenda palatina, pescoço curto/largo, prega palmar única, 5º dedo curto e recurvado';

// Roteiro por consulta (Guia de Puericultura V2 — PNI 2026, SBP 2024/2026, MS)
const CONSULTAS = [
  { m:0.25, nome:'1ª semana', foco:'Primeira consulta do RN (3º–5º dia)',
    meca:'Peso × PN (perda até 10%, recuperar em 10–15 d) · comprimento 48–53 cm · PC 33–38 cm (microcefalia se < −2 DP)',
    exame:'Icterícia (alerta < 24 h, zona ≥ 3 de Kramer ou > 14 d) · fontanelas · reflexo vermelho · palato e frênulo · clavículas · sopros e pulsos femorais · coto · genitália, ânus · Ortolani/Barlow · linha média lombossacra · reflexos (sucção, Moro, preensão)',
    alim:'AME em livre demanda (observar mamada) · vitamina D 400 UI/dia desde a 1ª semana',
    vac:'BCG · Hepatite B. VSR: mãe vacinada? Nirsevimabe (SUS) se prematuro ≤ 36s6d ou < 2 a com comorbidade.',
    triagem:'Conferir pezinho (3º–5º d), orelhinha (até 1 m), olhinho, coraçãozinho (SpO₂ ≥ 95%, diferença < 3%), linguinha',
    oriente:'Sono de barriga para cima no quarto dos pais · coto com álcool 70% · bebê-conforto de costas · nunca sacudir',
    alerta:'Não mama/vomita tudo · convulsão, apneia, letargia · icterícia < 24 h ou abaixo do umbigo · fezes claras/colúria · onfalite · FR ≥ 60, gemência, cianose · T ≥ 37,5 ou < 35,5 °C' },
  { m:1, nome:'1 mês', foco:'Consolidar amamentação · icterícia prolongada · humor materno',
    meca:'Ganho 25–35 g/dia (mínimo 20 g/dia no AME) · PC +2 cm/mês · comprimento ~3–4 cm/mês',
    exame:'Icterícia > 14 d → bilirrubinas (BD!) · granuloma/hérnia umbilical · reflexo vermelho · monilíase, dermatite de fraldas · torcicolo, plagiocefalia · Ortolani/Barlow · testículos',
    alim:'AME · vitamina D 400 UI · prematuro/BPN: ferro desde 30 d (2–4 mg/kg/d)',
    vac:'Nenhuma nova — conferir BCG e Hep B.', triagem:'Reteste da orelhinha / 2ª amostra do pezinho se pendentes',
    oriente:'Tempo de bruços acordado e supervisionado · nunca deixar sozinho no trocador · técnicas para acalmar o choro',
    alerta:'Icterícia persistente/fezes claras · não ganha peso · triagem alterada sem seguimento · depressão materna' },
  { m:2, nome:'2 meses', foco:'Primeiras vacinas · sorriso social',
    meca:'Ganho ~25–30 g/dia · PC +2 cm/mês · FR < 50 a partir de 2 m',
    exame:'Fontanela posterior fechada · reflexo vermelho · fixa e segue objetos · Ortolani/Barlow · hérnia inguinal × umbilical · testículos · hemangiomas · sopros, pulsos femorais',
    alim:'AME — sem água ou chá · vitamina D 400 UI',
    vac:'Penta D1 · VIP D1 · Rotavírus D1 · Pneumo 20 D1 (transição VPC10/VPC20). 3 m: Meningo C D1.', triagem:'—',
    oriente:'Reações vacinais · conversar, cantar, contato face a face · quedas',
    alerta:'Não sorri, não fixa o olhar, não reage ao som · assimetria · cianose/sudorese às mamadas' },
  { m:4, nome:'4 meses', foco:'Controle cefálico · quadril e olhos com novos testes',
    meca:'Ganho ~20 g/dia (~600 g/mês) · PC +1 cm/mês · dobra o PN aos 4–5 m',
    exame:'Sem queda da cabeça na tração · Hirschberg + cover · quadril: abdução, pregas, Galeazzi (Ortolani perde valor) · Moro e RTCA desaparecendo · tônus · testículos',
    alim:'AME até 6 m · vitamina D 400 UI · termo com fator de risco: ferro 10–12,5 mg/dia já aos 4 m',
    vac:'Penta D2 · VIP D2 · Rotavírus D2 · Pneumo D2. 5 m: Meningo C D2.', triagem:'—',
    oriente:'Rola: nunca em superfície alta · objetos pequenos fora do alcance · evitar telas',
    alerta:'Não sustenta a cabeça · mãos sempre fechadas/polegar incluso · não ri nem vocaliza · estrabismo constante · RTCA persistente' },
  { m:6, nome:'6 meses', foco:'Introdução alimentar · ferro · testículos na bolsa',
    meca:'Ganho ~15–20 g/dia · PC +1 cm/mês · comprimento ~2 cm/mês',
    exame:'Dentes (1º ~6 m) · reflexo vermelho + Hirschberg/cover · quadril · testículo fora da bolsa aos 6 m → cirurgia · Moro e preensão palmar ausentes · dermatite atópica',
    alim:'LM + almoço + 2 lanches de fruta (amassado, nunca liquidificado) · sem açúcar < 2 a, sem mel < 1 a · ferro 10–12,5 mg/dia (ciclo I 6 → 9 m) · vit D 400 UI · vit A 100.000 UI se área do programa',
    vac:'Penta D3 · VIP D3 · COVID-19 D1 · Influenza (1ª vez: 2 doses com 30 d). 7 m: COVID-19 D2.', triagem:'—',
    oriente:'Engasgo: comer sentado e supervisionado · 1º dente: escova + creme ≥ 1.000 ppm (grão de arroz) · andador contraindicado',
    alerta:'Não rola, não busca objetos, não vira para o som · queda no canal de peso · perda de habilidades' },
  { m:9, nome:'9 meses', foco:'Senta sem apoio · febre amarela · acidentes',
    meca:'Ganho ~15 g/dia (~500 g/mês) · PC +0,5 cm/mês · comprimento ~1,5 cm/mês',
    exame:'Reflexo vermelho + Hirschberg/cover · dentes · otoscopia · paraquedas (8–9 m) · pinça · quadril · preferência manual antes de 12–18 m = alerta',
    alim:'LM + almoço + jantar + 2 lanches · pedaços macios · ferro: pausa 9 → 12 m (prematuro/BPN contínuo) · vit D 400 UI',
    vac:'Febre amarela D1 · COVID-19 D3.', triagem:'—',
    oriente:'Engatinha: escadas, tomadas, produtos trancados · afogamento (baldes, banheira) · ler e nomear objetos',
    alerta:'Não senta sem apoio · não transfere · não balbucia · não responde ao nome · assimetria' },
  { m:12, nome:'12 meses', foco:'Comida da família · 2º ciclo de ferro',
    meca:'Peso ~3× o PN · comprimento +25 cm no 1º ano · PC +12 cm no 1º ano',
    exame:'Fontanela anterior (fecha 9–18 m) · dentes (nenhum aos 13 m → investigar) · olhos, otoscopia · marcha com apoio; geno varo fisiológico · genitália (fimose: não forçar)',
    alim:'5 refeições + LM · leite de vaca integral só após 12 m, sem excesso · ferro ciclo II 12 → 15 m (10–12,5 mg/dia) · vit D 600 UI/dia',
    vac:'Pneumo 20 reforço · Meningo ACWY · Tríplice viral D1.', triagem:'Hemograma + ferritina + PCR (9–12 m) só se fator de risco — não é rotina',
    oriente:'Afogamento, queimaduras, janelas · largar mamadeira noturna · escovação 2×/dia com flúor',
    alerta:'Não fica em pé com apoio · não responde ao nome · não aponta/imita · nenhuma sílaba · regressão' },
  { m:15, nome:'15 meses', foco:'Marcha independente · reforços',
    meca:'Peso ~2–2,5 kg no 2º ano · comprimento ~12 cm no 2º ano · PC até 2 anos',
    exame:'Marcha independente (até 15–18 m); ponta dos pés persistente = alerta · dentes, cárie · olhos, otoscopia',
    alim:'Comida da família 5–6×/dia + LM · fim do ciclo II aos 15 m (prematuro/BPN: 1 mg/kg/d até 24 m) · vit D 600 UI',
    vac:'DTP 1º reforço · VIP 1º reforço · Tetraviral (SCR D2 + varicela) · Hepatite A.', triagem:'—',
    oriente:'Birras são esperadas · zero telas antes dos 2 anos · escadas, piscinas',
    alerta:'Não anda com apoio · nenhuma palavra · não aponta · pouco contato visual' },
  { m:18, nome:'18 meses', foco:'Linguagem · 1ª triagem de autismo (M-CHAT-R/F)',
    meca:'Peso, comprimento, PC — observar tendência da curva',
    exame:'Marcha estável, anda para trás · dentes · olhos, otoscopia · geno varo · neurológico',
    alim:'Comida da família; evitar sucos e ultraprocessados · vit D 600 UI',
    vac:'Nenhuma de rotina — conferir atrasos e influenza.', triagem:'M-CHAT-R/F (16–30 m): 0–2 baixo risco (repetir aos 24 m) · 3–7 entrevista · ≥ 8 encaminhar',
    oriente:'Ler e conversar todos os dias · 1ª ida ao dentista',
    alerta:'Não fala 3 palavras · não anda · não aponta para mostrar · perda de habilidades · M-CHAT positivo' },
  { m:24, nome:'24 meses', foco:'Estatura em pé · IMC · 2ª triagem de autismo',
    meca:'Estatura em pé a partir de 2 a (deitado mede ~0,7 cm a mais) · IMC (risco de sobrepeso > +1 Z) · última medida de PC de rotina',
    exame:'Hirschberg/cover + reflexo vermelho · 20 dentes até ~2,5–3 a · otoscopia · testículos, fimose · joelhos varo → valgo · corrida',
    alim:'Comida da família · prematuro/BPN: encerrar ferro · vit D 600 UI (até 18 a)',
    vac:'Nenhuma de rotina — influenza anual.', triagem:'M-CHAT-R/F (repetir) · PA se fator de risco',
    oriente:'Telas ≤ 1 h/dia (2–5 a) · cadeirinha no banco traseiro · desfralde com sinais de prontidão',
    alerta:'Sem frases de 2 palavras · perda de linguagem · não corre/chuta · M-CHAT positivo · IMC > +1 Z' },
  { m:36, nome:'3 anos', foco:'PA anual · 1ª acuidade visual',
    meca:'PA obrigatória a partir de 3 a (anual) · velocidade ~7 cm/ano',
    exame:'Acuidade visual (figuras/LEA) + cover · audição e fala · amígdalas, respiração oral · valgo fisiológico (3–7 a)',
    alim:'3 refeições + 2 lanches · vit D 600 UI',
    vac:'Nenhuma de rotina — próximas aos 4 anos; influenza anual.', triagem:'PA, acuidade visual',
    oriente:'Telas ≤ 1 h/dia · dentista a cada 6 meses · proteção do corpo',
    alerta:'Fala ininteligível para estranhos · não brinca de faz de conta · PA ≥ P90 · IMC ≥ +2 Z' },
  { m:48, nome:'4–5 anos', foco:'Reforços dos 4 anos · visão e escola',
    meca:'PA anual · curvas OMS 5–19 a a partir de 5 a · velocidade ~6–7 cm/ano',
    exame:'Acuidade anual (< 0,7 ou 2 linhas de diferença → oftalmo) · cover, audição · dentes · fimose, criptorquidia adquirida · coluna',
    alim:'Comida da família · vit D 600 UI',
    vac:'DTP 2º reforço · VIP 2º reforço · Varicela D2 · Febre amarela reforço.', triagem:'PA, IMC, acuidade',
    oriente:'Assento de elevação até 10 a ou 1,45 m · capacete · natação · sono 10–13 h',
    alerta:'Fala não compreensível · não copia círculo/cruz · enurese diurna · ronco com apneia' },
  { m:72, nome:'6–10 anos', foco:'Consultas anuais · escola, puberdade e risco cardiovascular',
    meca:'IMC (OMS 5–19 a) · PA anual · velocidade ~5–6 cm/ano · circunferência abdominal se excesso de peso',
    exame:'Acuidade, audição · Adams (escoliose) · Tanner (precoce < 8 a ♀ / < 9 a ♂) · acantose, tireoide',
    alim:'Café da manhã, lanche saudável, água · vit D 600 UI',
    vac:'HPV dose única (9–14 a) · Meningo ACWY (11–14 a) · Qdenga 10–14 a (municípios prioritários).', triagem:'Perfil lipídico universal aos 9–11 a (antes só se risco)',
    oriente:'Internet e cyberbullying · telas ≤ 1–2 h · sono 9–12 h · 1 h de atividade física',
    alerta:'Queda de rendimento · puberdade precoce · IMC ≥ +2 Z · PA ≥ P90 · estatura < −2 Z ou queda de canal' }
];

// Ganhos esperados (Tratado SBP / CAB 33)
function esperado(meses){
  if (meses < 3)  return { g:'25–30 g/dia (1ª consulta: 25–35)', gmin:20, c:'3–4 cm/mês', pc:'2 cm/mês' };
  if (meses < 6)  return { g:'~20 g/dia', gmin:15, c:'~2 cm/mês', pc:'1 cm/mês' };
  if (meses < 9)  return { g:'~15 g/dia', gmin:10, c:'~1,5 cm/mês', pc:'0,5 cm/mês' };
  if (meses < 12) return { g:'~10 g/dia', gmin:7, c:'~1,2–1,5 cm/mês', pc:'0,5 cm/mês' };
  if (meses < 24) return { g:'~6–7 g/dia (2–2,5 kg/ano)', gmin:4, c:'~1 cm/mês (12 cm/ano)', pc:'~2 cm/ano' };
  if (meses < 48) return { g:'~5–6 g/dia (2 kg/ano)', gmin:3, c:'~7 cm/ano', pc:'—' };
  if (meses < 72) return { g:'~2–3 kg/ano', gmin:3, c:'~6 cm/ano', pc:'—' };
  return { g:'~3 kg/ano', gmin:3, c:'~5–6 cm/ano até a puberdade', pc:'—' };
}

const PUER = { marcos:{}, fen:0, risco:false };

function parseDate(v){ if(!v) return null; const d = new Date(v+'T12:00:00'); return isNaN(d) ? null : d; }
const DAY = 86400000;
function fmtIdade(dias){
  if (dias < 0) return '—';
  if (dias < 31) return `${Math.round(dias)} dias`;
  const meses = dias/30.4375;
  if (meses < 24) { const m = Math.floor(meses), d = Math.round(dias - m*30.4375); return `${m} ${m===1?'mês':'meses'}${d?` e ${d} d`:''}`; }
  const a = Math.floor(meses/12), m = Math.floor(meses - a*12); return `${a} anos${m?` e ${m} ${m===1?'mês':'meses'}`:''}`;
}
function classZ(ind, z, meses){
  if (z === null || !isFinite(z)) return { t:'—', c:'' };
  if (ind==='wfa') return z<-3?{t:'Muito baixo peso',c:'z-bad'}:z<-2?{t:'Baixo peso',c:'z-warn'}:z>2?{t:'Peso elevado',c:'z-warn'}:{t:'Adequado',c:'z-ok'};
  if (ind==='lhfa') return z<-3?{t:'Muito baixa estatura',c:'z-bad'}:z<-2?{t:'Baixa estatura',c:'z-warn'}:{t:'Adequada',c:'z-ok'};
  if (ind==='hcfa') return z<-3?{t:'Microcefalia grave',c:'z-bad'}:z<-2?{t:'Microcefalia — investigar',c:'z-bad'}:z>2?{t:'Macrocefalia — investigar',c:'z-bad'}:{t:'Adequado',c:'z-ok'};
  const ate5 = meses < 60;
  if (z < -3) return {t:'Magreza acentuada',c:'z-bad'};
  if (z < -2) return {t:'Magreza',c:'z-warn'};
  if (z <= 1) return {t:'Eutrofia',c:'z-ok'};
  if (z <= 2) return ate5 ? {t:'Risco de sobrepeso',c:'z-warn'} : {t:'Sobrepeso',c:'z-warn'};
  if (z <= 3) return ate5 ? {t:'Sobrepeso',c:'z-warn'} : {t:'Obesidade',c:'z-bad'};
  return ate5 ? {t:'Obesidade',c:'z-bad'} : {t:'Obesidade grave',c:'z-bad'};
}
function pctl(z){ // normal CDF
  const t = 1/(1+0.2316419*Math.abs(z)); const d = 0.3989423*Math.exp(-z*z/2);
  let p = d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); p = z>0 ? 1-p : p; return p*100;
}

function puerData(){
  const dn = parseDate($('pnDN').value), dc = parseDate($('pnDC').value) || new Date();
  const sex = $('ptSex').value === 'F' ? 'F' : 'M';
  const igS = parseFloat($('pnIG').value) || 40, igD = parseFloat($('pnIGd').value) || 0;
  const ig = igS + igD/7;
  const { wReal, h } = pt();
  let dias;
  if (dn) dias = Math.round((dc - dn)/DAY);
  else { const { a } = pt(); dias = Math.round(a*365.25); }
  const prem = ig < 37;
  const limCorr = ig < 28 ? 36 : 24; // meses
  const corrDias = prem ? dias - Math.round((40-ig)*7) : dias;
  const usarCorr = prem && dias/30.4375 < limCorr;
  const diasZ = usarCorr ? corrDias : dias;
  const pc = parseFloat($('pnPC').value) || 0;
  return { dn, dc, sex, ig, igS, igD, prem, limCorr, dias, corrDias, usarCorr, diasZ, w:wReal, h, pc,
    pn: parseFloat($('pnPN').value) || 0, cn: parseFloat($('pnCN').value) || 0, pcn: parseFloat($('pnPCN').value) || 0,
    dAnt: parseDate($('pnDAnt').value), wAnt: parseFloat($('pnWAnt').value) || 0, hAnt: parseFloat($('pnHAnt').value) || 0, pcAnt: parseFloat($('pnPCAnt').value) || 0 };
}

function zRow(nome, ind, valor, unid, lms, meses){
  if (!valor) return `<tr><td>${nome}</td><td colspan="4" class="src">informe ${unid==='kg/m²'?'peso e estatura':'a medida'}</td></tr>`;
  if (!lms) return `<tr><td>${nome}</td><td>${nf(valor, unid==='kg'?2:1)} ${unid}</td><td colspan="3" class="src">fora da faixa da curva OMS para esta idade</td></tr>`;
  const z = WHO.z(lms, valor), c = classZ(ind, z, meses), med = lms[1];
  return `<tr><td>${nome}</td><td>${nf(valor, unid==='kg'?2:1)} ${unid}</td><td><b>${z>=0?'+':''}${nf(z,2)}</b></td><td>P${nf(pctl(z), pctl(z)<1||pctl(z)>99?1:0)}</td><td><span class="zpill ${c.c}">${c.t}</span><div class="src">mediana ${nf(med, unid==='kg'?2:1)} ${unid}</div></td></tr>`;
}

function renderPuer(){
  const P = puerData(), meses = P.diasZ/30.4375, mesesCron = P.dias/30.4375;
  const sx = P.sex;
  // --- idade
  let idHtml = `<dl class="kv"><dt>Idade cronológica</dt><dd>${fmtIdade(P.dias)} <span class="src">(${P.dias} dias)</span></dd>`;
  if (P.prem) idHtml += `<dt>Idade gestacional</dt><dd>${P.igS} sem ${P.igD?`${P.igD} d`:''} — prematuro</dd><dt>Idade corrigida</dt><dd>${P.corrDias<0?`ainda ${Math.round(-P.corrDias/7)} sem antes do termo`:fmtIdade(P.corrDias)}</dd><dt>Corrigir até</dt><dd>${P.limCorr} meses de idade cronológica ${P.usarCorr?'— <b>usando idade corrigida nas curvas</b>':'— já não corrige'}</dd>`;
  idHtml += `</dl>`;
  if (P.prem && P.corrDias < 0) idHtml += `<div class="warnline" style="margin-top:8px">Antes do termo corrigido: use curvas INTERGROWTH-21st/Fenton (OMS só a partir de 40 semanas).</div>`;
  if (!P.dn) idHtml += `<p class="src" style="margin-top:6px">Sem data de nascimento: usando a idade da barra do paciente.</p>`;
  $('puIdade').innerHTML = idHtml;

  // --- z-scores
  const bmi = P.w && P.h ? P.w/Math.pow(P.h/100,2) : 0;
  const ok = P.diasZ >= 0;
  let rows = '';
  rows += zRow('Peso/idade', 'wfa', P.w, 'kg', ok && P.diasZ<=1856 ? WHO.lmsAge('wfa', sx, P.diasZ) : null, meses);
  rows += zRow(meses<24?'Comprimento/idade':'Estatura/idade', 'lhfa', P.h, 'cm', ok ? WHO.lmsAge('lhfa', sx, P.diasZ) : null, meses);
  rows += zRow('PC/idade', 'hcfa', P.pc, 'cm', ok && P.diasZ<=1856 ? WHO.lmsAge('hcfa', sx, P.diasZ) : null, meses);
  rows += zRow('IMC/idade', 'bfa', bmi, 'kg/m²', ok ? WHO.lmsAge('bfa', sx, P.diasZ) : null, meses);
  if (P.w && P.h && meses < 60) { const ind = meses<24?'wfl':'wfh'; rows += zRow(meses<24?'Peso/comprimento':'Peso/estatura', 'wfl', P.w, 'kg', WHO.lmsLen(ind, sx, Math.round(P.h*2)/2), meses); }
  $('puZ').innerHTML = `<div class="tbl-wrap"><table class="vt"><thead><tr><th>Índice</th><th>Medida</th><th>Escore-z</th><th>Percentil</th><th>Classificação (MS/OMS)</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="src" style="margin-top:6px">Curvas OMS 2006 (0–5 a) e 2007 (5–19 a), ${sx==='F'?'meninas':'meninos'}${P.usarCorr?', idade corrigida':''}. Peso/idade só até 5 anos (depois use IMC/idade). PC é rotina até 2 anos.</p>`;

  // --- ganhos
  const exp = esperado(mesesCron);
  let g = `<dl class="kv"><dt>Esperado nesta idade</dt><dd>Peso ${exp.g} · Comp. ${exp.c} · PC ${exp.pc}</dd>`;
  if (P.pn && P.w) {
    const pnKg = P.pn/1000;
    if (P.dias <= 15) { const perda = (pnKg - P.w)/pnKg*100; g += `<dt>Variação desde o nascimento</dt><dd>${perda>0?'−':'+'}${nf(Math.abs(perda),1)}% do PN ${perda>10?'<span class="zpill z-bad">perda > 10%</span>':''}</dd>`; }
    else g += `<dt>Ganho desde o nascimento</dt><dd>${nf((P.w-pnKg)*1000/P.dias,1)} g/dia · ${nf(P.w/pnKg,2)}× o PN</dd>`;
  }
  if (P.cn && P.h && P.dias > 0) g += `<dt>Comprimento desde o nascimento</dt><dd>+${nf(P.h-P.cn,1)} cm (${nf((P.h-P.cn)/(P.dias/30.4375),2)} cm/mês)</dd>`;
  if (P.pcn && P.pc && P.dias > 0) g += `<dt>PC desde o nascimento</dt><dd>+${nf(P.pc-P.pcn,1)} cm (${nf((P.pc-P.pcn)/(P.dias/30.4375),2)} cm/mês)</dd>`;
  const intervalo = P.dAnt ? Math.round(((P.dc||new Date()) - P.dAnt)/DAY) : 0;
  if (intervalo > 0) {
    g += `<dt>Desde a última consulta</dt><dd>${intervalo} dias</dd>`;
    if (P.wAnt && P.w) { const gd = (P.w-P.wAnt)*1000/intervalo; const low = gd < exp.gmin; g += `<dt>Ganho de peso</dt><dd>${nf(gd,1)} g/dia (${nf((P.w-P.wAnt)*1000,0)} g) <span class="zpill ${low?'z-warn':'z-ok'}">${low?'abaixo do esperado':'adequado'}</span></dd>`; }
    if (P.hAnt && P.h) { const cm = P.h-P.hAnt; g += `<dt>Crescimento</dt><dd>+${nf(cm,1)} cm · ${nf(cm/(intervalo/30.4375),2)} cm/mês · ${nf(cm/(intervalo/365.25),1)} cm/ano</dd>`; }
    if (P.pcAnt && P.pc) { const cm = P.pc-P.pcAnt; g += `<dt>PC</dt><dd>+${nf(cm,1)} cm · ${nf(cm/(intervalo/30.4375),2)} cm/mês</dd>`; }
    if (P.wAnt && P.dAnt && P.diasZ>=0) { // mudança de canal (z anterior × atual)
      const dAntZ = P.diasZ - intervalo; if (dAntZ >= 0 && dAntZ <= 1856 && P.diasZ <= 1856) {
        const z0 = WHO.z(WHO.lmsAge('wfa', sx, dAntZ), P.wAnt), z1 = WHO.z(WHO.lmsAge('wfa', sx, P.diasZ), P.w), dz = z1 - z0;
        g += `<dt>Canal de peso (z)</dt><dd>${nf(z0,2)} → ${nf(z1,2)} (${dz>=0?'+':''}${nf(dz,2)}) ${dz <= -0.67 ? '<span class="zpill z-warn">queda de canal</span>' : (dz >= 0.67 ? '<span class="zpill z-warn">subida rápida de canal</span>' : '<span class="zpill z-ok">mantém canal</span>')}</dd>`;
      }
    }
  } else g += `<dt>Desde a última consulta</dt><dd class="src">preencha a medida anterior para calcular ganho por dia e por mês</dd>`;
  g += `</dl>`;
  $('puGanho').innerHTML = g;

  renderMarcos(mesesCron, P);
  renderConsulta(mesesCron);
  if (typeof PREM !== 'undefined') PREM.render();
  if (typeof MOD !== 'undefined') MOD.render(mesesCron);
}

function bandaAtual(meses){ let i = MARCOS.findIndex(b => meses >= b[0] && meses < b[1]); if (i < 0) i = meses >= 120 ? MARCOS.length-1 : 0; return i; }
function renderMarcos(mesesCron, P){
  const mesesUso = P.usarCorr ? Math.max(0, P.corrDias/30.4375) : mesesCron;
  const i = bandaAtual(mesesUso);
  const bandas = [i-1, i].filter(x => x >= 0);
  let h = '';
  bandas.forEach(bi => { const [m0, m1, itens] = MARCOS[bi];
    h += `<div class="mb-band"><div class="mb-h">${bi===i?'Faixa atual':'Faixa anterior'} · ${m0}–${m1} meses${P.usarCorr?' (idade corrigida)':''}</div>` +
      itens.map((t, j) => { const k = `${bi}-${j}`, v = PUER.marcos[k] || 'NV';
        return `<div class="mb-row"><span>${esc(t)}</span><span class="mb-sel" role="group" aria-label="${esc(t)}">${['P','A','NV'].map(o => `<button type="button" class="mb-b${v===o?' on '+o:''}" data-mk="${k}" data-mv="${o}">${o}</button>`).join('')}</span></div>`; }).join('') + `</div>`; });
  // classificação
  const absent = bi => MARCOS[bi][2].some((_, j) => (PUER.marcos[`${bi}-${j}`]||'NV')==='A');
  const zpc = P.pc && P.diasZ >= 0 && P.diasZ <= 1856 ? WHO.z(WHO.lmsAge('hcfa', P.sex, P.diasZ), P.pc) : null;
  let cls, cc, acao;
  if ((zpc !== null && Math.abs(zpc) > 2) || PUER.fen >= 3 || (i>0 && absent(i-1))) { cls='Provável atraso no desenvolvimento'; cc='z-bad'; acao='Encaminhar para avaliação neuropsicomotora (rede especializada).'; }
  else if (absent(i) || PUER.risco) { cls='Alerta para o desenvolvimento'; cc='z-warn'; acao='Orientar estimulação e retornar em 30 dias.'; }
  else if (MARCOS[i][2].some((_, j) => (PUER.marcos[`${i}-${j}`]||'NV')==='NV')) { cls='Classificação pendente'; cc=''; acao='Marque todos os marcos da faixa atual (P ou A) para classificar.'; }
  else { cls='Desenvolvimento adequado'; cc='z-ok'; acao='Elogiar, manter estímulo e informar os sinais de alerta.'; }
  h += `<div class="mb-extra"><label for="pnFen">Alterações fenotípicas (nº)</label><input type="number" id="pnFen" min="0" max="8" value="${PUER.fen}" style="width:80px">
    <label class="chk"><input type="checkbox" id="pnRisco" ${PUER.risco?'checked':''}> Há fator de risco (prematuridade, BPN, asfixia, STORCH/Zika, violência, depressão materna…)</label>
    <p class="src">Fenotípicas: ${FENOTIPO}.</p></div>
    <div class="mb-result"><span class="zpill ${cc}" style="font-size:.78rem">${cls}</span> <span>${acao}</span>${zpc!==null?`<div class="src">PC: z ${nf(zpc,2)}</div>`:''}</div>`;
  $('puMarcos').innerHTML = h;
  PUER.ultimaClass = cls + ' — ' + acao;
}

function renderConsulta(meses){
  let idx = 0; CONSULTAS.forEach((c, i) => { if (meses >= c.m - 0.3) idx = i; });
  if (PUER.consultaSel !== undefined) idx = PUER.consultaSel;
  const c = CONSULTAS[idx];
  const sel = `<div class="filters" style="margin-bottom:10px">${CONSULTAS.map((x,i) => `<button type="button" class="fbtn" data-cons="${i}" aria-pressed="${i===idx}">${x.nome}</button>`).join('')}</div>`;
  const row = (t, v) => `<div class="cs-row"><div class="cs-t">${t}</div><div>${esc(v)}</div></div>`;
  $('puConsulta').innerHTML = sel + `<div class="dx-title" style="font-size:1rem">${c.nome} — ${esc(c.foco)}</div>` +
    row('Meça e plote', c.meca) + row('Examine', c.exame) + row('Alimentação e suplementos', c.alim) + row('Vacinas (PNI 2026)', c.vac) + row('Triagens / exames', c.triagem) + row('Oriente', c.oriente) +
    `<div class="cs-row cs-alert"><div class="cs-t">Sinais de alerta → encaminhar</div><div>${esc(c.alerta)}</div></div>`;
}

function evolucaoTxt(){
  const P = puerData(), meses = P.diasZ/30.4375, sx = P.sex;
  const bmi = P.w && P.h ? P.w/Math.pow(P.h/100,2) : 0;
  const zf = (ind, v) => { if (!v || P.diasZ < 0) return null; const l = WHO.lmsAge(ind, sx, P.diasZ); return l && !(ind!=='lhfa' && ind!=='bfa' && P.diasZ>1856) ? WHO.z(l, v) : null; };
  const zs = (n, ind, v, u) => { const z = zf(ind, v); return v ? `${n} ${nf(v, u==='kg'?3:1)} ${u}${z!==null?` (z ${z>=0?'+':''}${nf(z,2)} — ${classZ(ind,z,meses).t.toLowerCase()})`:''}` : ''; };
  let t = `PUERICULTURA — ${$('ptName').value || 'Paciente'}\nIdade: ${fmtIdade(P.dias)}${P.prem?` · IG ${P.igS}s${P.igD?P.igD+'d':''} · idade corrigida ${P.corrDias>=0?fmtIdade(P.corrDias):'antes do termo'}`:''}\n`;
  t += `ANTROPOMETRIA: ` + [zs('Peso','wfa',P.w,'kg'), zs(meses<24?'Comprimento':'Estatura','lhfa',P.h,'cm'), zs('PC','hcfa',P.pc,'cm'), bmi?zs('IMC','bfa',bmi,'kg/m²'):''].filter(Boolean).join(' · ') + '\n';
  const intervalo = P.dAnt ? Math.round(((P.dc||new Date()) - P.dAnt)/DAY) : 0;
  if (intervalo > 0 && P.wAnt && P.w) t += `GANHO: ${nf((P.w-P.wAnt)*1000/intervalo,1)} g/dia em ${intervalo} dias${P.hAnt&&P.h?` · ${nf((P.h-P.hAnt)/(intervalo/30.4375),2)} cm/mês`:''}${P.pcAnt&&P.pc?` · PC ${nf((P.pc-P.pcAnt)/(intervalo/30.4375),2)} cm/mês`:''}\n`;
  t += `DNPM: ${PUER.ultimaClass || '—'}\n`;
  const ausentes = []; document.querySelectorAll('.mb-b.on.A').forEach(b => { const [bi, j] = b.dataset.mk.split('-').map(Number); ausentes.push(MARCOS[bi][2][j]); });
  if (ausentes.length) t += `Marcos ausentes: ${ausentes.join('; ')}\n`;
  return t;
}
