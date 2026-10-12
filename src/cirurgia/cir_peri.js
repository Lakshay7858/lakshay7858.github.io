// Perioperatório: risco, exames, jejum, medicações (com calculadora de suspensão de anticoagulantes), profilaxias, ERAS.
const PERI = [];
const PE = (o) => PERI.push(o);
const ul = (arr) => `<ul>${arr.map((x) => `<li>${md(x)}</li>`).join('')}</ul>`;
const sec = (h, inner) => `<section class="sv-s"><h4>${esc(h)}</h4>${inner}</section>`;

PE({ id: 'risco', nome: 'Avaliação de risco (SBC 2024 / ACC-AHA 2024)', html: () =>
  sec('Passo a passo', ul([
    '**1. Urgência?** Emergência/urgência → operar com monitorização e otimização possível no tempo disponível.',
    '**2. Condição cardíaca ativa?** SCA, IC descompensada, arritmia grave (BAVT, TV, FA com resposta alta), valvopatia grave sintomática → **adiar** cirurgia eletiva e tratar.',
    '**3. Risco do procedimento**: baixo (<1%: superficiais, mama, olhos, endoscópicas, hérnia), intermediário (1–5%: intraperitoneal, intratorácica, ortopédica maior, carótida, próstata, cabeça e pescoço), alto (>5%: aorta e vascular maior, revascularização periférica aberta, esofagectomia, pancreatectomia, transplante).',
    '**4. Risco do paciente**: **RCRI (Lee)** ou AUB-HAS2 (aba Calculadoras → Escores) + **capacidade funcional** (≥4 METs = subir 2 lances de escada) + fragilidade.',
    '**5. Exames adicionais** só se mudarem a conduta: BNP/NT-proBNP (>65 anos ou 45–64 com DCV/fatores de risco); **troponina ultrassensível pré e no 1º–2º dia pós-op** em risco intermediário/alto + cirurgia de risco intermediário/alto; ecocardiograma se IC/valvopatia sem avaliação recente; teste funcional só com baixa capacidade funcional e cirurgia de maior risco.',
    'Medicações (SBC 2024): **manter** betabloqueador (não iniciar <7 dias antes), estatina (iniciar em cirurgia vascular), BCC, diuréticos, clonidina; IECA/BRA: individualizar.',
    'Risco alto + cirurgia de risco intermediário/alto: considerar **UTI por 48 h**.'])) +
  sec('Pulmonar e outros', ul(['Fatores de risco de complicação pulmonar: idade >60, ASA ≥II, DPOC, IC, AOS (STOP-Bang), tabagismo, cirurgia abdominal alta/torácica/>3 h, anestesia geral, albumina <3,5. Medidas: cessar tabagismo (ideal ≥4–8 semanas), fisioterapia/incentivo respiratório, analgesia regional, mobilização precoce.', 'Hepatopata: **Child-Pugh e MELD** (aba Calculadoras) — Child C/MELD >15–20: evitar cirurgia eletiva.', 'Desnutrição: NRS-2002 ≥3 → terapia nutricional; perda >10–15% do peso/albumina <3: adiar eletiva 7–14 dias para nutrir (ESPEN).']))
});

PE({ id: 'exames', nome: 'Exames pré-operatórios', html: () =>
  `<p class="sv-lead">Não há "pré-operatório de rotina": pedir exames conforme idade, comorbidades e porte cirúrgico. ASA I–II em cirurgia de baixo risco geralmente não precisa de exames.</p>` +
  tableHTML({ head: ['Exame', 'Indicar quando'], rows: [
    ['**ECG**', 'Doença cardiovascular conhecida/suspeita, DM, DRC, obesidade, >40 anos, cirurgia de risco intermediário/alto (SBC 2024)'],
    ['**Hemograma**', 'Cirurgia com perda sanguínea prevista, suspeita de anemia, DRC, hepatopatia, idosos, cirurgia de grande porte'],
    ['**Creatinina/eletrólitos**', 'DRC, DM, HAS, IC, uso de diuréticos/IECA/BRA/AINE, >50–65 anos, contraste, cirurgia de grande porte'],
    ['**Glicemia/HbA1c**', 'DM (HbA1c >8–9%: considerar adiar eletiva), obesidade, corticoide'],
    ['**Coagulograma**', 'Anticoagulante, hepatopatia, história de sangramento, neuroeixo/neurocirurgia; não de rotina'],
    ['**β-hCG**', 'Toda mulher em idade fértil (conforme protocolo)'],
    ['**Tipagem/reserva**', 'Cirurgias com risco relevante de transfusão'],
    ['**RX de tórax**', 'Doença cardiopulmonar sintomática/descompensada, cirurgia torácica; não de rotina'],
    ['**TSH, albumina, função hepática**', 'Conforme clínica (hepatopata, desnutrido, tireoidopatia)']] })
});

PE({ id: 'jejum', nome: 'Jejum (ASA 2023) e carboidrato', html: () =>
  tableHTML({ head: ['Ingesta', 'Tempo mínimo antes da anestesia'], rows: [
    ['**Líquidos claros** (água, chá, café sem leite, suco sem polpa, bebida com carboidrato)', '**2 h**'], ['Leite materno', '4 h'], ['Fórmula infantil, leite não humano', '6 h'],
    ['Refeição leve (torrada, líquidos claros)', '6 h'], ['Refeição gordurosa, frituras, carne', '8 h ou mais']] }) +
  sec('Observações', ul(['Bebida com carboidrato (maltodextrina) até 2 h antes é segura em não diabéticos (ERAS) — reduz resistência insulínica e desconforto.', 'Goma de mascar não precisa adiar a cirurgia.', '**GLP-1/GIP (semaglutida, tirzepatida, liraglutida)**: ver aba Medicações — risco de estômago cheio apesar do jejum.']))
});

PE({ id: 'meds', nome: 'Medicações — suspender ou manter (com calculadora)', html: () => {
  const p = P();
  return `<div class="opt sv-rx"><div class="opt-h"><h4>Calculadora de suspensão de anticoagulante/antiagregante</h4><span class="src">usa o ClCr da barra do paciente${p.clcr ? `: ${nf(p.clcr, 0)} mL/min` : ' (informe creatinina)'}</span></div><div class="opt-b">
    <div class="inf-row"><div><label for="acDrug">Medicamento</label><select id="acDrug">${[['apixabana', 'Apixabana'], ['rivaroxabana', 'Rivaroxabana'], ['edoxabana', 'Edoxabana'], ['dabigatrana', 'Dabigatrana'], ['varfarina', 'Varfarina'], ['enoxa_t', 'Enoxaparina terapêutica'], ['enoxa_p', 'Enoxaparina profilática'], ['hnf', 'Heparina IV (HNF)'], ['aas', 'AAS'], ['clopidogrel', 'Clopidogrel'], ['ticagrelor', 'Ticagrelor'], ['prasugrel', 'Prasugrel']].map(([v, l]) => `<option value="${v}" ${PERI_ST.drug === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
    <div><label for="acRisk">Risco de sangramento da cirurgia</label><select id="acRisk"><option value="baixo">Baixo/mínimo (hérnia, pele, endoscopia simples)</option><option value="alto" ${PERI_ST.risk === 'alto' ? 'selected' : ''}>Alto (abdominal maior, neuroeixo, neuro, urológica, vascular)</option></select></div></div>
    <div id="acOut"></div></div></div>` +
  tableHTML({ head: ['Classe', 'Conduta'], rows: [
    ['Betabloqueador, estatina, BCC, clonidina', '**Manter** (inclusive no dia). Não iniciar betabloqueador <7 dias antes.'],
    ['IECA / BRA / sacubitril-valsartana', 'Individualizar; em geral **suspender 24 h antes** se risco de hipotensão (manter se IC com HAS difícil). Reintroduzir quando estável.'],
    ['Diuréticos', 'Manter (SBC 2024) ou suspender na manhã se risco de hipovolemia/hipocalemia.'],
    ['**iSGLT2** (dapagliflozina, empagliflozina, canagliflozina)', '**Suspender 3 dias antes** (ertugliflozina 4 dias) — risco de cetoacidose euglicêmica. Reiniciar quando comendo normalmente.'],
    ['**GLP-1 / GIP-GLP-1** (semaglutida, liraglutida, tirzepatida, dulaglutida)', 'Multissocietário 2024: a maioria pode **manter**. Alto risco de estômago cheio (fase de escalonamento de dose, sintomas GI, dose alta, gastroparesia) → **dieta líquida 24 h antes**, USG gástrico se disponível, adiar eletiva se sintomas. (Conduta alternativa antiga da ASA 2023: suspender semanal 1 semana antes / diário no dia.)'],
    ['Metformina', 'Suspender no dia da cirurgia (e 48 h após contraste se TFG <30/IRA).'],
    ['Sulfonilureias, glinidas', 'Suspender no dia (hipoglicemia em jejum).'],
    ['Insulina', 'Basal (glargina/NPH): **75–80%** da dose na noite anterior (NPH da manhã: 50%); prandial suspensa em jejum; correção com insulina rápida; alvo 100–180 mg/dL.'],
    ['Corticoide crônico', 'Manter + **dose de estresse**: pequena cirurgia — dose usual; média/grande — hidrocortisona 50–100 mg IV na indução e 25–50 mg 8/8h por 24–48 h.'],
    ['Anticoncepcional / TRH', 'Considerar suspender 4–6 semanas antes em cirurgia de alto risco de TEV (ou profilaxia farmacológica).'],
    ['Antidepressivos, antipsicóticos, anticonvulsivantes, levotiroxina, broncodilatadores', 'Manter. IMAO: discutir com anestesia. Lítio: suspender 72 h antes em cirurgia de grande porte (risco de toxicidade).'],
    ['Fitoterápicos (ginkgo, alho, ginseng, erva-de-são-joão, ômega-3 em dose alta)', 'Suspender ~7 dias antes.'],
    ['Stent coronariano', 'Cirurgia eletiva idealmente **≥6 meses após ICP eletiva** e **≥12 meses após SCA**; mínimo 1 mês se urgente, mantendo AAS. Decidir com o cardiologista.']] });
} });

PE({ id: 'atb', nome: 'Profilaxia antibiótica cirúrgica', html: () => {
  const p = P();
  const cef = p.w >= 120 ? '3 g' : '2 g';
  return `<p class="sv-lead">Dose IV <b>30–60 min antes da incisão</b> (vancomicina/quinolona: 60–120 min). Repetir se cirurgia prolongada ou sangramento >1,5 L. Duração: <b>dose única ou ≤24 h</b> (prolongar não reduz infecção).</p>` +
  tableHTML({ head: ['Cirurgia', 'Esquema', 'Alergia grave a betalactâmico'], rows: [
    ['Colecistectomia lap. eletiva de **baixo risco**', 'Não indicada', '—'],
    ['Colecistectomia de alto risco (>70 a, colecistite aguda, icterícia, conversão, gestante, imunossupressão, DM)', `Cefazolina ${cef}`, 'Clindamicina 900 mg + gentamicina 5 mg/kg'],
    ['Apendicectomia (não complicada)', `Cefazolina ${cef} + metronidazol 500 mg (ou cefoxitina 2 g)`, 'Clindamicina + gentamicina, ou metronidazol + gentamicina'],
    ['Hernioplastia com tela (aberta)', `Cefazolina ${cef} — se fatores de risco (recidiva, idade avançada, imunossupressão, DM, cirurgia longa); em baixo risco o benefício é pequeno`, 'Clindamicina 900 mg'],
    ['Gastroduodenal, bariátrica, biliar aberta', `Cefazolina ${cef}`, 'Clindamicina + gentamicina'],
    ['Delgado sem obstrução / com obstrução', `Cefazolina ${cef} / + metronidazol 500 mg`, 'Clindamicina + gentamicina'],
    ['**Colorretal**', `Cefazolina ${cef} + metronidazol 500 mg (ou ceftriaxona 2 g + metronidazol; ertapenem 1 g) + preparo mecânico com **ATB oral** na véspera (neomicina 1 g + metronidazol 500 mg às 19, 20 e 23 h, ou conforme protocolo)`, 'Clindamicina + gentamicina, ou metronidazol + gentamicina/aztreonam'],
    ['Limpa sem prótese (mama, tireoide, pele, partes moles)', 'Não indicada (exceto fatores de risco)', '—'],
    ['Urológica com abertura do trato (RTU, nefrectomia)', `Cefazolina ${cef} (ou conforme urocultura)`, 'Gentamicina / ciprofloxacino'],
    ['MRSA colonizado / alta prevalência', 'Associar vancomicina 15 mg/kg (início 60–120 min antes)', '—']] }) +
  sec('Repique intraoperatório', ul(['Cefazolina: a cada **4 h** · cefoxitina: 2 h · ampicilina-sulbactam: 2 h · clindamicina: 6 h · metronidazol, gentamicina, vancomicina, ertapenem: sem repique em geral.', `Gentamicina dose única ${p.w ? nf(Math.min(5 * (p.imc >= 30 ? p.aj : p.w), 500), 0) + ' mg' : '5 mg/kg'} (peso ajustado se obeso).`]));
} });

PE({ id: 'tev', nome: 'Profilaxia de TEV e neuroeixo', html: () => {
  const p = P();
  return `<p class="sv-lead">Calcule o <b>Caprini</b> na aba Calculadoras → Escores clínicos.</p>` +
  tableHTML({ head: ['Caprini', 'Risco', 'Profilaxia'], rows: [
    ['0', 'Muito baixo', 'Deambulação precoce'], ['1–2', 'Baixo', 'Mecânica (compressão pneumática intermitente/meias)'],
    ['3–4', 'Moderado', `Enoxaparina ${p.clcr && p.clcr < 30 ? '20 mg (ClCr <30)' : '40 mg'} SC 1x/dia ou HNF 5.000 UI SC 8/8–12/12h (mecânica se alto risco de sangramento)`],
    ['≥5', 'Alto', 'Farmacológica + mecânica; **câncer abdominopélvico: 28 dias** de enoxaparina']] }) +
  sec('Doses especiais', ul([`Obesidade IMC ≥40: enoxaparina 40 mg 12/12h${p.imc >= 40 ? ' (este paciente)' : ''}; ClCr <30: 20 mg/dia ou HNF.`, 'Iniciar 12 h antes ou 6–12 h após a cirurgia (sangramento controlado).'])) +
  sec('Anestesia neuroaxial (ASRA 2018)', ul(['Enoxaparina profilática: **12 h** entre a última dose e a punção/retirada de cateter; terapêutica: **24 h**.', 'Próxima dose: ≥4 h após retirada do cateter (profilática); 24 h após punção para dose terapêutica.', 'HNF profilática SC: 4–6 h antes; AAS isolado não contraindica.', 'DOAC: suspender ≥72 h (rivaroxabana/apixabana) e 4–5 dias (dabigatrana, conforme ClCr) antes do bloqueio.']));
} });

PE({ id: 'eras', nome: 'ERAS e cuidados pós-operatórios', html: () =>
  sec('Pré', ul(['Educação e expectativa de alta', 'Cessar tabagismo/álcool, otimizar anemia (ferro IV se ferropriva), nutrição, controle glicêmico', 'Jejum abreviado + carboidrato 2 h antes; sem pré-medicação sedativa de longa ação'])) +
  sec('Intra', ul(['Profilaxia antibiótica e de TEV; laparoscopia quando possível', 'Analgesia multimodal: anestesia regional (peridural torácica, TAP, QL, infiltração), dipirona, paracetamol, AINE, dexametasona, cetamina/lidocaína em baixa dose', 'Profilaxia de NVPO conforme Apfel; fluido guiado por metas (evitar sobrecarga); normotermia; evitar drenos e SNG de rotina'])) +
  sec('Pós', ul(['Dieta oral precoce (horas após); goma de mascar', 'Mobilização no dia da cirurgia', 'Retirada precoce de sonda vesical (1º dia) e acessos', 'Analgesia poupadora de opioide; laxante se opioide', 'Glicemia 140–180 mg/dL (evitar >180)', 'Critérios de alta: dor controlada VO, tolera dieta, deambula, trânsito/flatos, sem sinais de complicação'])) +
  sec('Transfusão', ul(['Restritiva: **Hb <7 g/dL** (cardiopata/ortopédico/oncológico: <8); plaquetas ≥50 mil para cirurgia (≥100 mil neuro/olho posterior); INR ≤1,5 para procedimentos de maior risco.']))
});

const PERI_ST = { id: 'risco', drug: 'apixabana', risk: 'baixo' };
function acCalc() {
  const el = $('acOut'); if (!el) return;
  const d = ($('acDrug') || {}).value || PERI_ST.drug, r = ($('acRisk') || {}).value || PERI_ST.risk; PERI_ST.drug = d; PERI_ST.risk = r;
  const p = P(), cl = p.clcr, hi = r === 'alto';
  let t = '', cls = 'warnb';
  const dias = (h) => `${h} h (~${nf(h / 24, 1)} dia(s))`;
  if (['apixabana', 'rivaroxabana', 'edoxabana'].includes(d)) {
    if (cl && cl < 15) { t = 'ClCr <15: uso não recomendado — discutir com hematologia/cardiologia; suspender ≥72 h.'; cls = 'bad'; }
    else { const h = hi ? 48 : (cl && cl < 30 ? 36 : 24); t = `Última dose **${dias(h)}** antes da cirurgia (${hi ? 'alto' : 'baixo'} risco${cl ? `, ClCr ${nf(cl, 0)}` : ''}). **Sem ponte** com heparina. Neuroeixo: ≥72 h. Reiniciar ${hi ? '48–72 h' : '24 h'} após, com hemostasia garantida (profilática antes, se indicado).`; }
  } else if (d === 'dabigatrana') {
    if (!cl) t = 'Informe a creatinina (o intervalo depende do ClCr).';
    else if (cl < 30) { t = 'ClCr <30: dabigatrana contraindicada/acumula — suspender ≥4–5 dias e discutir; considerar dosar TT/dTT.'; cls = 'bad'; }
    else { const h = cl >= 80 ? (hi ? 48 : 24) : cl >= 50 ? (hi ? 72 : 36) : (hi ? 96 : 48); t = `ClCr ${nf(cl, 0)}: última dose **${dias(h)}** antes. Sem ponte. Reiniciar ${hi ? '48–72 h' : '24 h'} após.`; }
  } else if (d === 'varfarina') {
    t = 'Suspender **5 dias antes**; INR na véspera (<1,5; se 1,5–1,9: vitamina K 1–2 mg VO). **Ponte com enoxaparina 1 mg/kg 12/12h** só em alto risco trombótico: prótese mecânica mitral/antiga ou com AVC, TEV <3 meses, trombofilia grave, FA com AVC recente — iniciar 3 dias antes e última dose 24 h antes (metade da dose). FA comum: **sem ponte** (BRIDGE). Reiniciar na noite da cirurgia/dia seguinte.';
  } else if (d === 'enoxa_t') t = 'Última dose **24 h** antes (dar metade da dose diária). Reiniciar 24 h (baixo risco) a 48–72 h (alto risco) após.';
  else if (d === 'enoxa_p') t = 'Última dose **12 h** antes (inclusive para neuroeixo). Reiniciar 6–12 h após a cirurgia.';
  else if (d === 'hnf') t = 'Suspender infusão **4–6 h** antes (TTPa normal). Reiniciar sem bolus 12–24 h após (alto risco: 48 h).';
  else if (d === 'aas') { t = 'Prevenção secundária: **manter** na maioria das cirurgias. Suspender **7 dias** apenas em neurocirurgia, cirurgia medular, câmara posterior do olho, RTU de próstata ou risco de sangramento muito alto — ou se prevenção primária.'; cls = 'ok'; }
  else if (d === 'clopidogrel') t = 'Suspender **5 dias** antes (manter AAS). Stent recente: não suspender sem discutir com cardiologia.';
  else if (d === 'ticagrelor') t = 'Suspender **3–5 dias** antes (manter AAS).';
  else if (d === 'prasugrel') t = 'Suspender **7 dias** antes (manter AAS).';
  el.innerHTML = box(cls, md(t));
}
