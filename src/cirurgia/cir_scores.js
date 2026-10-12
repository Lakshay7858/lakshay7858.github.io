// Escores cirúrgicos: mantém os da Emergência úteis em cirurgia e acrescenta os específicos.
(function () {
  const KEEP = ['alvarado', 'bisap', 'childpugh', 'glasgow', 'gbs', 'wellstep', 'perc', 'wellstvp', 'cthead', 'nexus', 'ccspine', 'cha2ds2va', 'hasbled', 'news2', 'qsofa', 'rass', 'ciwa'];
  for (let i = SCORES.length - 1; i >= 0; i--) if (!KEEP.includes(SCORES[i].id)) SCORES.splice(i, 1);
  SCORES.forEach((s) => { if (['alvarado', 'bisap', 'childpugh', 'gbs'].includes(s.id)) s.grupo = 'Abdome agudo'; });
})();
const v1 = (vals, i) => !!vals[i];
const resBox = (cls, html) => `<div class="sc-total">${box(cls, html)}</div>`;
SCORES.unshift(
  { id: 'air', nome: 'AIR — Appendicitis Inflammatory Response', grupo: 'Abdome agudo', itens: [
    { q: 'Vômitos', c: 1 }, { q: 'Dor em fossa ilíaca direita', c: 1 },
    { q: 'Descompressão dolorosa / defesa', o: [['Ausente', 0], ['Leve', 1], ['Moderada', 2], ['Intensa', 3]] },
    { q: 'Temperatura ≥38,5 °C', c: 1 },
    { q: 'Leucócitos (×10³/mm³)', o: [['<10', 0], ['10–14,9', 1], ['≥15', 2]] },
    { q: 'Neutrófilos (%)', o: [['<70', 0], ['70–84', 1], ['≥85', 2]] },
    { q: 'PCR (mg/L)', o: [['<10', 0], ['10–49', 1], ['≥50', 2]] }],
    interp: [R(0, 4, 'ok', '0–4: baixa probabilidade — observação/alta com reavaliação'), R(5, 8, 'warnb', '5–8: indeterminada — imagem (USG/TC) ou observação ativa'), R(9, 12, 'bad', '9–12: alta probabilidade — avaliação cirúrgica')], fonte: 'Andersson 2008; WSES 2025' },
  { id: 'aas', nome: 'AAS — Adult Appendicitis Score', grupo: 'Abdome agudo', itens: [
    { q: 'Dor em FID', c: 2 }, { q: 'Migração da dor para a FID', c: 2 },
    { q: 'Sensibilidade em FID', o: [['Ausente', 0], ['Presente — mulher 16–49 anos', 1], ['Presente — demais pacientes', 3]] },
    { q: 'Defesa/descompressão', o: [['Ausente', 0], ['Leve', 2], ['Moderada a intensa', 4]] },
    { q: 'Leucócitos (×10³)', o: [['<7,2', 0], ['7,2–10,8', 1], ['10,9–13,9', 2], ['≥14', 3]] },
    { q: 'Neutrófilos (%)', o: [['<62', 0], ['62–74', 2], ['75–82', 3], ['≥83', 4]] },
    { q: 'PCR (mg/L) — sintomas <24 h', o: [['<4 ou não se aplica', 0], ['4–10', 2], ['11–24', 3], ['25–82', 5], ['≥83', 1]] },
    { q: 'PCR (mg/L) — sintomas ≥24 h', o: [['<12 ou não se aplica', 0], ['12–52', 2], ['53–151', 2], ['≥152', 1]] }],
    interp: [R(0, 10, 'ok', '0–10: baixa probabilidade'), R(11, 15, 'warnb', '11–15: intermediária — imagem'), R(16, 30, 'bad', '≥16: alta probabilidade — cirurgia')], nota: 'Preencha só uma das linhas de PCR conforme o tempo de sintomas.', fonte: 'Sammalkorpi 2014; WSES 2025' },
  { id: 'tg18c', nome: 'Tokyo 2018 — colecistite aguda', grupo: 'Abdome agudo', custom: 'tg', itens: [
    { q: 'A1 — Sinal de Murphy', c: 1 }, { q: 'A2 — Massa, dor ou defesa em HCD', c: 1 },
    { q: 'B1 — Febre', c: 1 }, { q: 'B2 — PCR elevada', c: 1 }, { q: 'B3 — Leucocitose', c: 1 }, { q: 'C — Imagem compatível (USG/TC)', c: 1 },
    { q: 'III — Disfunção cardiovascular (dopamina ≥5 ou qualquer noradrenalina)', c: 1 }, { q: 'III — Disfunção neurológica (rebaixamento)', c: 1 }, { q: 'III — Respiratória (P/F <300)', c: 1 }, { q: 'III — Renal (oligúria ou Cr >2)', c: 1 }, { q: 'III — Hepática (INR >1,5)', c: 1 }, { q: 'III — Hematológica (plaquetas <100 mil)', c: 1 },
    { q: 'II — Leucócitos >18 mil', c: 1 }, { q: 'II — Massa palpável dolorosa em HCD', c: 1 }, { q: 'II — Sintomas >72 h', c: 1 }, { q: 'II — Inflamação local acentuada (gangrenosa, enfisematosa, abscesso, peritonite biliar)', c: 1 }],
    result: (v) => { const A = v1(v, 0) || v1(v, 1), B = v1(v, 2) || v1(v, 3) || v1(v, 4), Cc = v1(v, 5); const g3 = [6, 7, 8, 9, 10, 11].some((i) => v1(v, i)), g2 = [12, 13, 14, 15].some((i) => v1(v, i));
      const dx = A && B && Cc ? '<b>Diagnóstico definitivo</b>' : A && B ? '<b>Diagnóstico suspeito</b> (confirmar com imagem)' : 'Critérios diagnósticos não preenchidos';
      const gr = g3 ? '<b>Grau III (grave)</b> — suporte + drenagem da vesícula; colecistectomia precoce só em centro avançado com disfunção reversível e baixo risco' : g2 ? '<b>Grau II (moderado)</b> — colecistectomia laparoscópica precoce em centro experiente (CCI ≤5/ASA ≤2), senão drenagem' : '<b>Grau I (leve)</b> — colecistectomia laparoscópica precoce';
      return resBox(g3 ? 'bad' : g2 ? 'warnb' : 'ok', `${dx}<br>${A && B ? gr : ''}`); },
    fonte: 'Tokyo Guidelines 2018' },
  { id: 'tg18a', nome: 'Tokyo 2018 — colangite aguda', grupo: 'Abdome agudo', custom: 'tg', itens: [
    { q: 'A1 — Febre >38 °C e/ou calafrios', c: 1 }, { q: 'A2 — Resposta inflamatória laboratorial (leucócitos <4 ou >10 mil, PCR ≥1 mg/dL)', c: 1 },
    { q: 'B1 — Icterícia (BT ≥2 mg/dL)', c: 1 }, { q: 'B2 — FA, GGT, TGO ou TGP >1,5× LSN', c: 1 },
    { q: 'C1 — Dilatação biliar', c: 1 }, { q: 'C2 — Etiologia na imagem (cálculo, estenose, prótese)', c: 1 },
    { q: 'III — Disfunção orgânica (CV, neuro, respiratória, renal, hepática, hematológica)', c: 1 },
    { q: 'II — Leucócitos >12 mil ou <4 mil', c: 1 }, { q: 'II — Febre ≥39 °C', c: 1 }, { q: 'II — Idade ≥75 anos', c: 1 }, { q: 'II — BT ≥5 mg/dL', c: 1 }, { q: 'II — Hipoalbuminemia (<0,7× LSN)', c: 1 }],
    result: (v) => { const A = v1(v, 0) || v1(v, 1), B = v1(v, 2) || v1(v, 3), Cc = v1(v, 4) || v1(v, 5); const g3 = v1(v, 6), n2 = [7, 8, 9, 10, 11].filter((i) => v1(v, i)).length;
      const dx = A && B && Cc ? '<b>Diagnóstico definitivo</b>' : A && (B || Cc) ? '<b>Diagnóstico suspeito</b>' : 'Critérios não preenchidos';
      const gr = g3 ? '<b>Grau III</b> — drenagem biliar <b>urgente</b> após estabilização' : n2 >= 2 ? '<b>Grau II</b> — drenagem biliar <b>precoce</b> (CPRE <24–48 h)' : '<b>Grau I</b> — ATB; drenagem se sem resposta em 24 h';
      return resBox(g3 ? 'bad' : n2 >= 2 ? 'warnb' : 'ok', `${dx}${A && (B || Cc) ? '<br>' + gr : ''}`); },
    fonte: 'Tokyo Guidelines 2018' },
  { id: 'asge', nome: 'ASGE 2019 — risco de coledocolitíase', grupo: 'Abdome agudo', custom: 'tg', itens: [
    { q: 'ALTO: cálculo no colédoco à imagem (USG/TC)', c: 1 }, { q: 'ALTO: colangite aguda', c: 1 }, { q: 'ALTO: BT >4 mg/dL + colédoco dilatado (>6 mm com vesícula)', c: 1 },
    { q: 'INTERMEDIÁRIO: enzimas hepáticas alteradas', c: 1 }, { q: 'INTERMEDIÁRIO: idade >55 anos', c: 1 }, { q: 'INTERMEDIÁRIO: colédoco dilatado ao USG', c: 1 }],
    result: (v) => [0, 1, 2].some((i) => v1(v, i)) ? resBox('bad', '<b>Alto risco</b> — CPRE (pré-operatória) ou exploração intraoperatória') : [3, 4, 5].some((i) => v1(v, i)) ? resBox('warnb', '<b>Risco intermediário</b> — colangio-RM ou EUS pré-op, ou colangiografia/USG intraoperatório') : resBox('ok', '<b>Baixo risco</b> — colecistectomia sem investigação adicional'),
    fonte: 'ASGE 2019' },
  { id: 'ranson', nome: 'Ranson (pancreatite)', grupo: 'Abdome agudo', itens: [
    { q: 'Admissão: idade >55 anos', c: 1 }, { q: 'Admissão: leucócitos >16 mil', c: 1 }, { q: 'Admissão: glicemia >200 mg/dL', c: 1 }, { q: 'Admissão: DHL >350 UI/L', c: 1 }, { q: 'Admissão: TGO >250 UI/L', c: 1 },
    { q: '48 h: queda do Ht >10%', c: 1 }, { q: '48 h: aumento da ureia >10 mg/dL (BUN >5)', c: 1 }, { q: '48 h: cálcio <8 mg/dL', c: 1 }, { q: '48 h: PaO₂ <60 mmHg', c: 1 }, { q: '48 h: déficit de bases >4 mEq/L', c: 1 }, { q: '48 h: sequestro de líquidos >6 L', c: 1 }],
    interp: [R(0, 2, 'ok', '0–2: leve (mortalidade ~1%)'), R(3, 4, 'warnb', '3–4: grave (~15%)'), R(5, 6, 'bad', '5–6: ~40%'), R(7, 11, 'bad', '≥7: ~100%')], nota: 'Critérios para pancreatite não biliar; só fecha com 48 h. Prefira BISAP/falência orgânica (Atlanta).', fonte: 'Ranson 1974' },
  { id: 'hinchey', nome: 'Hinchey modificada (diverticulite)', grupo: 'Abdome agudo', itens: [
    { q: 'Estágio', o: [['0 — diverticulite clínica leve', 0], ['Ia — inflamação/flegmão pericólico', 1], ['Ib — abscesso pericólico/mesocólico', 2], ['II — abscesso pélvico/distante', 3], ['III — peritonite purulenta generalizada', 4], ['IV — peritonite fecal', 5]] }],
    interp: [R(0, 1, 'ok', 'ATB oral/ambulatorial seletivo'), R(2, 2, 'warnb', 'ATB IV; drenagem se >4 cm'), R(3, 3, 'warnb', 'Drenagem percutânea + ATB'), R(4, 4, 'bad', 'Cirurgia: ressecção ± anastomose (lavagem laparoscópica em selecionados)'), R(5, 5, 'bad', 'Cirurgia: Hartmann (instável/fecal)')], fonte: 'Hinchey 1978 (mod. Wasvary 1999); WSES 2020' },
  { id: 'boey', nome: 'Boey (úlcera perfurada)', grupo: 'Abdome agudo', itens: [ { q: 'Choque na admissão (PAS <90)', c: 1 }, { q: 'Comorbidade grave', c: 1 }, { q: 'Perfuração >24 h', c: 1 }],
    interp: [R(0, 0, 'ok', 'Mortalidade ~0–1%'), R(1, 1, 'warnb', '~8–10%'), R(2, 2, 'bad', '~30–45%'), R(3, 3, 'bad', '>50%')], fonte: 'Boey 1987' },
  { id: 'mpi', nome: 'Índice de Peritonite de Mannheim', grupo: 'Abdome agudo', itens: [
    { q: 'Idade >50 anos', c: 5 }, { q: 'Sexo feminino', c: 5 }, { q: 'Falência orgânica', c: 7 }, { q: 'Malignidade', c: 4 }, { q: 'Duração pré-operatória >24 h', c: 4 }, { q: 'Origem não colônica', c: 4 }, { q: 'Peritonite difusa generalizada', c: 6 },
    { q: 'Exsudato', o: [['Claro', 0], ['Turvo/purulento', 6], ['Fecal', 12]] }],
    interp: [R(0, 21, 'ok', '≤21: mortalidade ~2%'), R(22, 29, 'warnb', '22–29: ~20%'), R(30, 47, 'bad', '>29: ~60%')], fonte: 'Linder 1987' },
  { id: 'lrinec', nome: 'LRINEC (fasceíte necrosante)', grupo: 'Abdome agudo', itens: [
    { q: 'PCR ≥150 mg/L', c: 4 }, { q: 'Leucócitos (×10³)', o: [['<15', 0], ['15–25', 1], ['>25', 2]] }, { q: 'Hemoglobina (g/dL)', o: [['>13,5', 0], ['11–13,5', 1], ['<11', 2]] },
    { q: 'Sódio <135 mEq/L', c: 2 }, { q: 'Creatinina >1,6 mg/dL', c: 2 }, { q: 'Glicemia >180 mg/dL', c: 1 }],
    interp: [R(0, 5, 'ok', '≤5: baixo risco (não exclui — a clínica manda)'), R(6, 7, 'warnb', '6–7: risco intermediário'), R(8, 13, 'bad', '≥8: alto risco')], fonte: 'Wong 2004' },
  { id: 'twist', nome: 'TWIST (torção testicular)', grupo: 'Urologia', itens: [ { q: 'Edema testicular', c: 2 }, { q: 'Testículo endurecido', c: 2 }, { q: 'Reflexo cremastérico ausente', c: 1 }, { q: 'Náuseas/vômitos', c: 1 }, { q: 'Testículo alto (elevado)', c: 1 }],
    interp: [R(0, 2, 'ok', '0–2: baixo risco'), R(3, 4, 'warnb', '3–4: intermediário — Doppler'), R(5, 7, 'bad', '≥5: alto — exploração cirúrgica sem esperar Doppler')], fonte: 'Barbosa 2013' },
  { id: 'asa', nome: 'ASA (estado físico)', grupo: 'Perioperatório', itens: [
    { q: 'Classe', o: [['I — saudável', 1], ['II — doença sistêmica leve (HAS/DM controlados, tabagista, IMC 30–40, gestante)', 2], ['III — doença sistêmica grave (DM/HAS mal controlados, DPOC, IMC ≥40, marca-passo, FE reduzida moderada, DRC dialítica)', 3], ['IV — ameaça constante à vida (IAM/AVC <3 meses, isquemia ativa, FE muito reduzida, sepse)', 4], ['V — moribundo, não sobrevive sem a cirurgia', 5], ['VI — morte encefálica (doador)', 6]] }],
    interp: [R(1, 2, 'ok', 'Baixo risco anestésico'), R(3, 3, 'warnb', 'Risco moderado'), R(4, 6, 'bad', 'Alto risco')], nota: 'Acrescentar "E" se emergência.', fonte: 'ASA 2020' },
  { id: 'rcri', nome: 'RCRI (Lee) — risco cardíaco', grupo: 'Perioperatório', itens: [
    { q: 'Cirurgia de alto risco (intraperitoneal, intratorácica, vascular suprainguinal)', c: 1 }, { q: 'Doença coronariana', c: 1 }, { q: 'Insuficiência cardíaca', c: 1 }, { q: 'Doença cerebrovascular', c: 1 }, { q: 'Diabetes em uso de insulina', c: 1 }, { q: 'Creatinina >2 mg/dL', c: 1 }],
    interp: [R(0, 1, 'ok', '0–1: baixo risco — operar se capacidade funcional ≥4 METs'), R(2, 2, 'warnb', '2: risco intermediário — BNP/troponina; testes só se mudarem a conduta'), R(3, 6, 'bad', '≥3: alto risco — biomarcadores, troponina pós-op (1º e 2º dias), considerar UTI')], nota: 'Combine com capacidade funcional (subir 2 lances de escada ≈ ≥4 METs) e fragilidade.', fonte: 'Lee 1999; SBC 2024' },
  { id: 'caprini', nome: 'Caprini — risco de TEV cirúrgico', grupo: 'Perioperatório', itens: [
    ...['Idade 41–60 anos', 'Cirurgia menor', 'IMC >25', 'Edema de MMII', 'Varizes', 'Gestação ou puerpério', 'Abortos de repetição/inexplicados', 'Anticoncepcional ou reposição hormonal', 'Sepse (<1 mês)', 'Doença pulmonar grave/pneumonia (<1 mês)', 'IAM', 'Insuficiência cardíaca (<1 mês)', 'Doença inflamatória intestinal', 'Paciente clínico acamado'].map((q) => ({ q, c: 1 })),
    ...['Idade 61–74 anos', 'Cirurgia aberta maior (>45 min)', 'Laparoscopia >45 min', 'Câncer (atual ou prévio)', 'Acamado >72 h', 'Imobilização gessada', 'Cateter venoso central'].map((q) => ({ q, c: 2 })),
    ...['Idade ≥75 anos', 'História de TEV', 'História familiar de TEV', 'Trombofilia (fator V Leiden, protrombina, anticoagulante lúpico, anticardiolipina, homocisteína, outra)', 'Trombocitopenia induzida por heparina'].map((q) => ({ q, c: 3 })),
    ...['AVC (<1 mês)', 'Artroplastia eletiva de quadril/joelho', 'Fratura de quadril, pelve ou perna', 'Lesão medular aguda (<1 mês)'].map((q) => ({ q, c: 5 }))],
    interp: [R(0, 0, 'ok', '0: muito baixo — deambulação precoce'), R(1, 2, 'ok', '1–2: baixo — profilaxia mecânica'), R(3, 4, 'warnb', '3–4: moderado — enoxaparina 40 mg/dia ou HNF 5.000 UI 8/8–12/12h (mecânica se alto risco de sangramento)'), R(5, 99, 'bad', '≥5: alto — farmacológica + mecânica; câncer abdominopélvico: enoxaparina por 28 dias')], fonte: 'Caprini 2005; ACCP 2012' },
  { id: 'apfel', nome: 'Apfel — náuseas e vômitos pós-operatórios', grupo: 'Perioperatório', itens: [ { q: 'Sexo feminino', c: 1 }, { q: 'Não tabagista', c: 1 }, { q: 'História de NVPO ou cinetose', c: 1 }, { q: 'Uso de opioide no pós-operatório', c: 1 }],
    interp: [R(0, 0, 'ok', '~10%'), R(1, 1, 'ok', '~20% — 1–2 antieméticos'), R(2, 2, 'warnb', '~40% — 2 antieméticos (dexametasona 4–8 mg + ondansetrona 4 mg)'), R(3, 3, 'bad', '~60% — ≥3 estratégias (+ TIVA, evitar opioide)'), R(4, 4, 'bad', '~80%')], fonte: 'Apfel 1999; Consenso de NVPO 2020' },
  { id: 'stopbang', nome: 'STOP-Bang (apneia do sono)', grupo: 'Perioperatório', itens: [ { q: 'Ronco alto', c: 1 }, { q: 'Cansaço/sonolência diurna', c: 1 }, { q: 'Apneia observada', c: 1 }, { q: 'Pressão alta (tratada)', c: 1 }, { q: 'IMC >35', c: 1 }, { q: 'Idade >50 anos', c: 1 }, { q: 'Circunferência cervical >40 cm', c: 1 }, { q: 'Sexo masculino', c: 1 }],
    interp: [R(0, 2, 'ok', '0–2: baixo risco de AOS'), R(3, 4, 'warnb', '3–4: intermediário'), R(5, 8, 'bad', '5–8: alto — cuidado com opioides/sedativos, via aérea difícil, CPAP pós-op')], fonte: 'Chung 2008' },
  { id: 'nrs2002', nome: 'NRS-2002 (risco nutricional)', grupo: 'Perioperatório', itens: [
    { q: 'Estado nutricional', o: [['Normal', 0], ['Perda >5% em 3 meses ou ingestão 50–75%', 1], ['Perda >5% em 2 meses, ou IMC 18,5–20,5 + estado geral comprometido, ou ingestão 25–60%', 2], ['Perda >5% em 1 mês, ou IMC <18,5 + estado geral comprometido, ou ingestão 0–25%', 3]] },
    { q: 'Gravidade da doença', o: [['Normal', 0], ['Leve: fratura de quadril, crônico com complicação, cirrose, DPOC, hemodiálise, DM, câncer', 1], ['Moderada: cirurgia abdominal maior, AVC, pneumonia grave, neoplasia hematológica', 2], ['Grave: TCE, transplante de medula, UTI (APACHE >10)', 3]] },
    { q: 'Idade ≥70 anos', c: 1 }],
    interp: [R(0, 2, 'ok', '<3: sem risco — reavaliar semanalmente'), R(3, 7, 'bad', '≥3: risco nutricional — terapia nutricional; desnutrição grave: 7–14 dias pré-op (ESPEN); imunonutrição em cirurgia oncológica GI maior')], fonte: 'Kondrup 2003; ESPEN 2021' },
  { id: 'clavien', nome: 'Clavien-Dindo (complicações)', grupo: 'Perioperatório', itens: [
    { q: 'Grau', o: [['I — desvio do curso sem tratamento específico (antieméticos, analgésicos, diuréticos, eletrólitos, fisioterapia, ferida aberta à beira-leito)', 1], ['II — medicamentos além do grau I, transfusão, NPT', 2], ['IIIa — intervenção sem anestesia geral', 3], ['IIIb — intervenção sob anestesia geral', 4], ['IVa — disfunção de 1 órgão (UTI)', 5], ['IVb — disfunção de múltiplos órgãos', 6], ['V — óbito', 7]] }],
    interp: [R(1, 2, 'ok', 'Complicação menor'), R(3, 7, 'bad', 'Complicação maior (≥III)')], fonte: 'Dindo 2004' },
);
