// Prescrições cirúrgicas (pré/pós-operatório e condutas) — formato [texto|função(p), acesso]; ideal × SUS.
const PSX = [];
const PS = (o) => PSX.push(o);
const enox = (p) => `Enoxaparina ${p.clcr && p.clcr < 30 ? '20 mg' : p.imc >= 40 ? '40 mg 12/12h' : '40 mg'} SC 1x/dia${p.imc >= 40 ? ' (IMC ≥40)' : ''}${p.clcr && p.clcr < 30 ? ' (ClCr <30)' : ''} — iniciar 6–12 h após a cirurgia (ou heparina 5.000 UI SC 8/8–12/12h)`;
const ANALG_PO = [
  ['Dipirona 1 g IV 6/6h (fixo)', 'SUS'],
  ['Cetoprofeno 100 mg IV 12/12h (se função renal normal, sem sangramento/úlcera; até 72 h)', 'HOSP'],
  ['Tramadol 50–100 mg IV lento 6/6h se dor moderada/intensa (máx. 400 mg/dia)', 'HOSP'],
  ['Morfina 2–3 mg IV até 4/4h se dor intensa refratária', 'SUS'],
  ['Ondansetrona 4–8 mg IV 8/8h se náuseas/vômitos', 'HOSP'] ];

/* ---------- PERIOPERATÓRIO ---------- */
PS({ id: 'preop', grupo: 'Perioperatório', nome: 'Pré-operatório eletivo (admissão / véspera)',
  quando: 'Paciente com avaliação pré-operatória concluída (aba Perioperatório: risco, exames, medicações a suspender).',
  exames: 'Conforme idade/comorbidades e porte (não pedir exames de rotina em ASA I–II de baixo risco). Tipagem/reserva em cirurgias com risco de sangramento.',
  ideal: { nota: 'ERAS: jejum abreviado com líquido claro com carboidrato até 2 h antes; profilaxia antibiótica 30–60 min antes da incisão; TEV conforme Caprini.', ps: [
    ['Jejum: sólidos e refeição leve 6 h (gordurosa 8 h); **líquidos claros até 2 h** antes da anestesia', 'SUS'],
    ['Bebida com maltodextrina 12,5% (ex.: 400 mL na noite anterior e 200 mL 2 h antes) — não diabéticos', 'PART'],
    ['Banho com sabonete na noite anterior/manhã; **não raspar** (tricotomia com tricotomizador elétrico só se necessário, imediatamente antes)', 'SUS'],
    ['Manter: betabloqueador, estatina, BCC, diuréticos (avaliar), levotiroxina, anticonvulsivantes, psicotrópicos', 'SUS'],
    ['Suspender conforme tabela (aba Perioperatório): anticoagulantes, antiagregantes, iSGLT2 (3 dias), metformina no dia, IECA/BRA na manhã (individualizar), GLP-1 (ver regra)', 'SUS'],
    [(p) => `Profilaxia antibiótica na indução: cefazolina ${p.w >= 120 ? '3 g' : '2 g'} IV 30–60 min antes da incisão (repetir a cada 4 h de cirurgia ou se sangramento >1,5 L)`, 'HOSP'],
    ['Profilaxia de TEV conforme Caprini: mecânica (meias/compressão pneumática) ± enoxaparina 40 mg SC', 'MISTO'],
    ['Diabético: glicemia capilar 4/4h no jejum; insulina basal 75–80% da dose na noite anterior; alvo 100–180 mg/dL', 'SUS'],
    ['Corticoide crônico (≥5 mg prednisona >3 semanas): hidrocortisona 50–100 mg IV na indução e 25–50 mg 8/8h por 24–48 h em cirurgia de médio/grande porte', 'SUS']],
    alta: [] },
  sus: 'igual',
  orient: 'Consentimento informado assinado; marcação de lateralidade; checklist de cirurgia segura (OMS) na sala.',
  fonte: 'ASA 2023 (jejum); ERAS Society; ASHP/IDSA 2013; SBC 2024' });

/* ---------- PÓS-OPERATÓRIOS ---------- */
PS({ id: 'po_colec', grupo: 'Pós-operatório', nome: 'Pós-operatório de colecistectomia videolaparoscópica',
  quando: 'Colecistectomia eletiva ou por colecistite grau I–II sem complicações.',
  exames: 'Sem exames de rotina. Dor/febre/icterícia → hemograma, PCR, bilirrubinas, enzimas, USG/TC (bilioma, lesão de via biliar).',
  ideal: { nota: 'Alta em 24 h (muitas no mesmo dia). Analgesia multimodal poupadora de opioide.', ps: [
    ['Dieta líquida 4–6 h após a cirurgia e leve a seguir, conforme aceitação', 'SUS'],
    ['Ringer lactato ou SF 0,9% 80–100 mL/h até aceitar dieta (suspender assim que beber)', 'SUS'],
    ...ANALG_PO,
    [(p) => enox(p) + ' se Caprini ≥3 (ou deambulação precoce isolada se baixo risco)', 'MISTO'],
    ['Deambulação precoce; cabeceira elevada; incentivo respiratório', 'SUS'],
    ['Colecistite: manter antibiótico até 24 h após a cirurgia (grau I–II)', 'HOSP']],
    alta: [
    ['Dipirona 1 g VO 6/6h por 3–5 dias (depois se dor)', 'SUS'],
    ['Ibuprofeno 600 mg VO 8/8h por 3 dias, após refeições', 'SUS'],
    ['Tramadol 50 mg VO 8/8h se dor intensa, por até 3 dias', 'PART'],
    ['Ondansetrona 4 mg sublingual 8/8h se náuseas', 'MISTO'],
    ['Curativo: lavar com água e sabão no banho, manter seco; retirar pontos em 7–10 dias (se não absorvíveis)', 'SUS']] },
  sus: { nota: 'Opioide oral da RENAME: codeína.', ps: 'ideal', alta: [['Dipirona 500 mg 2 cp VO 6/6h', 'SUS'], ['Ibuprofeno 600 mg VO 8/8h por 3 dias', 'SUS'], ['Paracetamol 500 mg + codeína 30 mg 1 cp 6/6h se dor intensa (até 3 dias)', 'SUS'], ['Metoclopramida 10 mg VO 8/8h se náuseas', 'SUS']] },
  orient: 'Atividade leve e caminhadas desde o 1º dia; evitar esforço/peso >10 kg por 2–4 semanas; dor no ombro (CO₂) é comum. Retornar se febre, icterícia, dor abdominal progressiva, vômitos, secreção na ferida. Consulta de revisão em 7–15 dias com anatomopatológico.',
  fonte: 'ERAS Society; PROSPECT (laparoscopic cholecystectomy)' });

PS({ id: 'po_apend', grupo: 'Pós-operatório', nome: 'Pós-operatório de apendicectomia',
  quando: 'Não complicada (sem ATB após a cirurgia) × complicada (ATB 2–3 dias após controle do foco).',
  exames: 'Complicada com febre/dor após o 5º dia: hemograma, PCR, TC (abscesso pélvico).',
  ideal: { nota: 'WSES 2025: ATB pós-operatório só na complicada, por 2–3 dias.', ps: [
    ['Dieta líquida após recuperar da anestesia, progredir conforme aceitação', 'SUS'],
    ['Hidratação venosa até aceitação oral', 'SUS'], ...ANALG_PO,
    ['Complicada: ceftriaxona 2 g IV 1x/dia + metronidazol 500 mg IV 8/8h por 2–3 dias (ou amoxicilina-clavulanato 1,2 g IV 8/8h)', 'HOSP'],
    [(p) => enox(p) + ' se Caprini ≥3', 'MISTO'], ['Deambulação precoce', 'SUS']],
    alta: [['Dipirona 1 g VO 6/6h por 3–5 dias', 'SUS'], ['Ibuprofeno 600 mg VO 8/8h por 3 dias', 'SUS'], ['Complicada com alta antes de completar o ATB: amoxicilina-clavulanato 875/125 mg VO 12/12h até completar 3–4 dias no total', 'SUS']] },
  sus: 'igual',
  orient: 'Retornar se febre após o 3º dia, dor progressiva, diarreia com tenesmo (abscesso pélvico), secreção na ferida. Revisão em 7–14 dias.',
  fonte: 'WSES 2025; STOP-IT (NEJM 2015)' });

PS({ id: 'po_hernia', grupo: 'Pós-operatório', nome: 'Pós-operatório de hernioplastia / pequena cirurgia ambulatorial',
  quando: 'Hernioplastia inguinal/umbilical, exérese de lesões, postectomia — alta no mesmo dia.',
  exames: 'Nenhum de rotina.',
  ideal: { nota: 'Analgesia multimodal e retorno precoce às atividades leves.', ps: [['Dieta livre após recuperação anestésica', 'SUS'], ['Dipirona 1 g IV na RPA; cetoprofeno 100 mg IV', 'HOSP'], ['Gelo local 20 min 3–4×/dia nas primeiras 48 h', 'SUS'], ['Micção espontânea antes da alta (raquianestesia/inguinal)', 'SUS']],
    alta: [['Dipirona 1 g VO 6/6h por 3–5 dias', 'SUS'], ['Ibuprofeno 600 mg VO 8/8h por 3–5 dias', 'SUS'], ['Tramadol 50 mg VO 8/8h se dor intensa por até 3 dias', 'PART'], ['Suspensório escrotal/cueca justa (inguinal) por 7 dias', 'SUS']] },
  sus: { nota: 'Codeína como opioide oral.', ps: 'ideal', alta: [['Dipirona 500 mg 2 cp VO 6/6h', 'SUS'], ['Ibuprofeno 600 mg VO 8/8h por 3 dias', 'SUS'], ['Paracetamol + codeína 30 mg 6/6h se dor intensa', 'SUS']] },
  orient: 'Caminhar no mesmo dia; atividades leves em 1–2 dias; esforço intenso após 2–4 semanas (conforme dor). Retornar se inchaço volumoso, febre, vermelhidão, retenção urinária.',
  fonte: 'HerniaSurge; PROSPECT' });

PS({ id: 'po_laparo', grupo: 'Pós-operatório', nome: 'Pós-operatório de laparotomia / cirurgia colorretal (ERAS)',
  quando: 'Colectomias, enterectomias, laparotomias eletivas ou de urgência.',
  exames: 'Hemograma, eletrólitos (K, Mg, P), creatinina no 1º dia; **PCR no 3º–4º dia** (<150 mg/L torna fístula improvável).',
  ideal: { nota: 'ERAS: sem SNG de rotina, dieta precoce, analgesia peridural/TAP poupadora de opioide, mobilização no dia, retirada precoce de sonda e drenos.', ps: [
    ['Dieta líquida no POI/1º dia e progressão conforme tolerância (sem SNG de rotina)', 'SUS'],
    ['Cristaloide balanceado 1–1,5 mL/kg/h até aceitar via oral (evitar balanço positivo)', 'SUS'],
    ['Analgesia peridural (bupivacaína 0,1% + fentanil) por 48–72 h ou bloqueio TAP/QL; dipirona 1 g 6/6h; paracetamol 1 g 6/6h', 'HOSP'],
    ['Ondansetrona 4 mg IV 8/8h se náuseas; dexametasona 8 mg na indução (profilaxia de NVPO)', 'HOSP'],
    [(p) => enox(p) + ' — câncer abdominopélvico: manter por **28 dias** após a alta', 'MISTO'],
    ['Sonda vesical: retirar no 1º dia (pelve: até 3º dia)', 'SUS'],
    ['Mobilização: sentar fora do leito no dia da cirurgia e deambular a partir do 1º dia; fisioterapia respiratória', 'SUS'],
    ['Goma de mascar 3×/dia (acelera o retorno do trânsito)', 'PART'],
    ['Glicemia 140–180 mg/dL; reposição de K/Mg; omeprazol só se risco de úlcera de estresse', 'SUS']],
    alta: [['Dipirona 1 g VO 6/6h + paracetamol 750 mg 6/6h se dor', 'SUS'], ['Enoxaparina 40 mg SC 1x/dia até completar 28 dias (cirurgia oncológica abdominopélvica)', 'MISTO'], ['Cuidados com a estomia (estomaterapia) se houver', 'SUS']] },
  sus: 'igual',
  orient: 'Sinais de alerta: febre, dor progressiva, distensão, vômitos, taquicardia, secreção pela ferida, saída de líquido entérico. Evitar esforço por 4–6 semanas.',
  fonte: 'ERAS Society 2018 (colorretal); ASCO/ACCP — TEV estendida' });

PS({ id: 'po_procto', grupo: 'Pós-operatório', nome: 'Pós-operatório de hemorroidectomia / cirurgia orificial',
  quando: 'Hemorroidectomia, fistulotomia, esfincterotomia, drenagem de abscesso.',
  exames: 'Nenhum de rotina.',
  ideal: { nota: 'A dor é o principal problema: analgesia regular, evitar constipação, metronidazol oral reduz a dor pós-hemorroidectomia.', ps: [['Dieta laxativa; dipirona e AINE IV', 'SUS'], ['Micção espontânea antes da alta (retenção urinária é comum)', 'SUS']],
    alta: [
    ['Dipirona 1 g VO 6/6h + ibuprofeno 600 mg 8/8h por 5–7 dias', 'SUS'], ['Tramadol 50 mg VO 8/8h se dor intensa, por até 5 dias', 'PART'],
    ['Metronidazol 500 mg VO 8/8h por 7 dias (hemorroidectomia — analgesia)', 'SUS'],
    ['Psyllium 5 g 1–2×/dia + lactulose 15 mL 1–2×/dia (evitar esforço evacuatório)', 'MISTO'],
    ['Diltiazem 2% pomada anal 2×/dia por 2–4 semanas (espasmo esfincteriano)', 'PART'],
    ['Banho de assento com água morna 3×/dia e após evacuar', 'SUS']] },
  sus: { nota: 'Sem diltiazem tópico na rede; lactulose da RENAME.', ps: 'ideal', alta: [['Dipirona 500 mg 2 cp 6/6h + ibuprofeno 600 mg 8/8h por 5 dias', 'SUS'], ['Metronidazol 250 mg 2 cp VO 8/8h por 7 dias', 'SUS'], ['Lactulose 15 mL VO 2×/dia', 'SUS'], ['Codeína + paracetamol se dor intensa (atenção: constipa)', 'SUS']] },
  orient: 'Sangramento leve ao evacuar é esperado até 2 semanas. Retornar se sangramento volumoso, febre, retenção urinária, dor que piora após o 5º dia.',
  fonte: 'ASCRS 2024; PROSPECT (hemorroidectomia)' });

/* ---------- CONDUTAS POR DIAGNÓSTICO ---------- */
PS({ id: 'rx_apend_naoop', grupo: 'Condutas', nome: 'Apendicite — tratamento não operatório',
  quando: 'Apendicite não complicada na TC, **sem apendicolito**, adulto que opta por evitar cirurgia após decisão compartilhada.',
  exames: 'TC confirmando apendicite não complicada (sem apendicolito, perfuração, abscesso).',
  ideal: { nota: 'Falha/recorrência em ~25–40% em 5 anos (CODA, APPAC). Reavaliar em 24–48 h.', ps: [['Ertapenem 1 g IV 1x/dia ou ceftriaxona 2 g IV/dia + metronidazol 500 mg IV 8/8h por 24–48 h', 'HOSP'], ['Dieta líquida conforme dor; analgesia', 'SUS']],
    alta: [['Amoxicilina-clavulanato 875/125 mg VO 12/12h até completar 7–10 dias (ou ciprofloxacino 500 mg 12/12h + metronidazol 500 mg 8/8h)', 'SUS'], ['Dipirona 1 g 6/6h se dor', 'SUS']] },
  sus: 'igual',
  orient: 'Retornar se piora da dor, febre persistente após 48 h, vômitos. Colonoscopia/TC de controle se >40 anos (neoplasia).',
  fonte: 'WSES 2025; CODA (NEJM 2020); APPAC' });

PS({ id: 'rx_colecistite', grupo: 'Condutas', nome: 'Colecistite aguda — internação',
  quando: 'Diagnóstico pelos critérios TG18; gravidade orienta antibiótico e momento da cirurgia (ver Clínica cirúrgica).',
  exames: 'Hemograma, PCR, TGO/TGP/FA/GGT/bilirrubinas, lipase, creatinina, coagulograma; USG de abdome; colangio-RM se risco intermediário de coledocolitíase.',
  ideal: { nota: 'Colecistectomia laparoscópica precoce (≤72 h) — graus I e II.', ps: [
    ['Jejum (até decisão cirúrgica); Ringer lactato 1,5 mL/kg/h', 'SUS'],
    ['Grau I: cefazolina 2 g IV 8/8h · Grau II: ceftriaxona 2 g IV/dia (± metronidazol 500 mg 8/8h) · Grau III: piperacilina-tazobactam 4,5 g IV 6/6h', 'HOSP'],
    ['Dipirona 1 g IV 6/6h + cetoprofeno 100 mg IV 12/12h (AINE) + morfina 2–3 mg se refratária', 'HOSP'], ['Ondansetrona 4 mg IV 8/8h se vômitos', 'HOSP'],
    [(p) => enox(p), 'MISTO'], ['Programar colecistectomia laparoscópica precoce', 'SUS']],
    alta: [] },
  sus: 'igual',
  orient: '—',
  fonte: 'Tokyo Guidelines 2018' });

PS({ id: 'rx_colangite', grupo: 'Condutas', nome: 'Colangite aguda',
  quando: 'Febre + icterícia + dor (Charcot) ou critérios TG18; grau III = disfunção orgânica.',
  exames: 'Hemoculturas, hemograma, PCR, bilirrubinas, enzimas, creatinina, coagulograma, lactato; USG/colangio-RM.',
  ideal: { nota: 'Antibiótico na 1ª hora + drenagem biliar (CPRE) conforme gravidade.', ps: [
    ['Hemoculturas antes do antibiótico', 'SUS'],
    ['Graus I–II: ceftriaxona 2 g IV/dia + metronidazol 500 mg IV 8/8h · Grau III/prótese biliar/hospitalar: piperacilina-tazobactam 4,5 g IV 6/6h', 'HOSP'],
    ['Ressuscitação volêmica; noradrenalina se choque (Sala Vermelha)', 'HOSP'], ['CPRE: urgente (grau III, após estabilização) / precoce <24–48 h (grau II)', 'HOSP'],
    [(p) => enox(p) + ' (avaliar coagulograma)', 'MISTO']], alta: [] },
  sus: 'igual', orient: '—', fonte: 'Tokyo Guidelines 2018' });

PS({ id: 'rx_panc', grupo: 'Condutas', nome: 'Pancreatite aguda — internação',
  quando: 'Atlanta: 2 de 3 critérios. Calcule BISAP/Ranson (aba Calculadoras).',
  exames: 'Lipase, hemograma, PCR (48 h), ureia, creatinina, eletrólitos, Ca, triglicerídeos, enzimas hepáticas, gasometria; USG de abdome (litíase).',
  ideal: { nota: 'Hidratação moderada, analgesia, dieta precoce; sem ATB profilático.', ps: [
    [(p) => `Ringer lactato ${p.w ? nf(1.5 * p.w, 0) + ' mL/h' : '1,5 mL/kg/h'} (bolus de ${p.w ? nf(10 * p.w, 0) + ' mL' : '10 mL/kg'} se hipovolêmico); reavaliar em 12 h`, 'SUS'],
    ['Dieta oral leve/hipogordurosa assim que tolerar (não manter jejum prolongado)', 'SUS'],
    ['Dipirona 1 g IV 6/6h + morfina 2–4 mg IV 4/4h se dor (ou fentanil); ondansetrona 4–8 mg 8/8h', 'SUS'],
    [(p) => enox(p), 'MISTO'], ['Biliar leve: colecistectomia na mesma internação', 'SUS'], ['Sem antibiótico profilático', 'SUS']], alta: [] },
  sus: 'igual', orient: 'Abstinência de álcool; dieta pobre em gordura até a colecistectomia.', fonte: 'ACG 2024; IAP/APA; WATERFALL' });

PS({ id: 'rx_divert', grupo: 'Condutas', nome: 'Diverticulite aguda não complicada / com abscesso pequeno',
  quando: 'TC: WSES 0–1B. Ambulatorial se tolera VO, sem sinais sistêmicos, sem imunossupressão, com suporte.',
  exames: 'Hemograma, PCR, creatinina, EAS; TC com contraste.',
  ideal: { nota: 'Imunocompetente sem sinais sistêmicos: antibiótico pode ser omitido (DIABOLO, AVOD).', ps: [['Internado (1B/comorbidades): ceftriaxona 2 g IV/dia + metronidazol 500 mg IV 8/8h; dieta líquida', 'HOSP']],
    alta: [['Amoxicilina-clavulanato 875/125 mg VO 12/12h por 7 dias (se indicado ATB)', 'SUS'], ['OU ciprofloxacino 500 mg 12/12h + metronidazol 500 mg 8/8h por 7 dias', 'SUS'], ['Dipirona 1 g 6/6h + paracetamol se dor (evitar AINE e opioide em excesso)', 'SUS'], ['Dieta líquida/leve por 2–3 dias; depois rica em fibras', 'SUS']] },
  sus: 'igual', orient: 'Retornar se febre, piora da dor, vômitos. Colonoscopia em 6–8 semanas.', fonte: 'WSES 2020; AGA 2021' });

PS({ id: 'rx_obst', grupo: 'Condutas', nome: 'Obstrução intestinal por bridas — tratamento conservador',
  quando: 'Sem sinais de estrangulamento/peritonite na clínica e na TC.',
  exames: 'Hemograma, eletrólitos (K, Mg), creatinina, lactato, gasometria; TC com contraste; RX após contraste hidrossolúvel.',
  ideal: { nota: 'Até 72 h; contraste hidrossolúvel diagnóstico e terapêutico.', ps: [
    ['Jejum; SNG aberta em frasco (anotar débito 6/6h)', 'SUS'], ['SF 0,9% ou Ringer: manutenção + reposição do débito da SNG (mL a mL)', 'SUS'],
    ['KCl conforme K sérico; MgSO₄ se Mg <2', 'SUS'], ['Diatrizoato (gastrografina) 100 mL pela SNG, clampear 2–4 h; RX de abdome em 8–24 h', 'MISTO'],
    ['Dipirona 1 g IV 6/6h; ondansetrona 4 mg 8/8h; evitar opioide em excesso', 'SUS'], [(p) => enox(p), 'MISTO'], ['Exame abdominal seriado a cada 4–6 h', 'SUS']], alta: [] },
  sus: 'igual', orient: '—', fonte: 'WSES (Bologna) 2017' });

PS({ id: 'rx_peritonite', grupo: 'Condutas', nome: 'Peritonite secundária / infecção intra-abdominal',
  quando: 'Perfuração, apendicite/diverticulite complicada, fístula, abscesso. Controle do foco é obrigatório.',
  exames: 'Hemoculturas, lactato, hemograma, PCR, função renal/hepática; cultura do líquido peritoneal; TC.',
  ideal: { nota: 'Comunitária leve-moderada × grave/hospitalar. Duração: ~4 dias após controle adequado do foco (STOP-IT).', ps: [
    ['Comunitária leve-moderada: ceftriaxona 2 g IV/dia + metronidazol 500 mg IV 8/8h (ou amoxicilina-clavulanato 1,2 g IV 8/8h)', 'HOSP'],
    ['Grave ou hospitalar/pós-operatória: piperacilina-tazobactam 4,5 g IV 6/6h (infusão estendida) ou meropenem 1 g IV 8/8h (risco de ESBL)', 'HOSP'],
    ['+ vancomicina se MRSA/Enterococcus resistente; + antifúngico (equinocandina) se pós-operatória com fatores de risco/choque', 'HOSP'],
    ['Controle do foco: cirurgia ou drenagem percutânea', 'SUS']], alta: [] },
  sus: 'igual', orient: '—', fonte: 'WSES 2017 (IAI); SIS 2017; STOP-IT; SSC 2026' });

PS({ id: 'rx_abscperi', grupo: 'Condutas', nome: 'Abscesso perianal — alta após drenagem',
  quando: 'Drenagem realizada; ATB se celulite extensa, diabetes, imunossupressão, sepse ou valvopatia.',
  exames: '—',
  ideal: { nota: 'Drenagem é o tratamento principal.', ps: [],
    alta: [['Banho de assento morno 3×/dia e após evacuar; troca de curativo', 'SUS'], ['Dipirona 1 g 6/6h + ibuprofeno 600 mg 8/8h por 5 dias', 'SUS'],
      ['Se indicado: amoxicilina-clavulanato 875/125 mg VO 12/12h por 5–7 dias (ou ciprofloxacino 500 mg 12/12h + metronidazol 500 mg 8/8h)', 'SUS'], ['Psyllium/lactulose para fezes macias', 'MISTO']] },
  sus: 'igual', orient: 'Retornar em 48–72 h. Persistência de secreção após 6–8 semanas sugere fístula (coloproctologia).', fonte: 'ASCRS 2022' });

PS({ id: 'rx_hemorroida', grupo: 'Condutas', nome: 'Crise hemorroidária / trombose externa (clínico)',
  quando: 'Trombose >72 h ou crise sem indicação de excisão.',
  exames: 'Anuscopia; colonoscopia se sangramento com fatores de risco (>45 anos, anemia, mudança de hábito).',
  ideal: { nota: 'Trombose externa <72 h com dor intensa: considerar excisão sob anestesia local.', ps: [],
    alta: [['Diosmina + hesperidina 1.000 mg: 3 cp/dia por 4 dias e 2 cp/dia por 3 dias', 'PART'], ['Ibuprofeno 600 mg 8/8h por 5 dias + dipirona 1 g 6/6h se dor', 'SUS'],
      ['Pomada com lidocaína (± corticoide por ≤7 dias) 3×/dia', 'PART'], ['Psyllium 5 g 2×/dia + água 2 L/dia', 'MISTO'], ['Banho de assento morno 3×/dia', 'SUS']] },
  sus: { nota: 'Sem flavonoides na RENAME.', ps: [], alta: [['Ibuprofeno 600 mg 8/8h por 5 dias + dipirona se dor', 'SUS'], ['Lactulose 15 mL 2×/dia; banho de assento', 'SUS']] },
  orient: 'Evitar esforço evacuatório e ficar muito tempo sentado no vaso. Retornar se sangramento volumoso, febre, dor intensa.', fonte: 'ASCRS 2024' });

PS({ id: 'rx_fissura', grupo: 'Condutas', nome: 'Fissura anal',
  quando: 'Dor intensa ao evacuar com sangue vivo; fissura posterior/anterior na linha média.',
  exames: 'Exame proctológico delicado. Atípica/lateral: investigar Crohn, IST, HIV, TB, neoplasia.',
  ideal: { nota: 'Crônica (>6 semanas): esfincterotomia química por 6–8 semanas antes da cirurgia.', ps: [],
    alta: [['Diltiazem 2% pomada (manipulada): aplicar no ânus 2×/dia por 8 semanas', 'PART'], ['OU nitroglicerina 0,2–0,4% pomada 2×/dia (cefaleia)', 'PART'],
      ['Psyllium 5 g 1–2×/dia + água; lactulose se necessário', 'MISTO'], ['Lidocaína gel antes de evacuar; banho de assento morno', 'MISTO']] },
  sus: { nota: 'Pomadas manipuladas não disponíveis no SUS na maioria dos municípios.', ps: [], alta: [['Fibras, lactulose 15 mL 2×/dia, banho de assento, lidocaína gel', 'SUS']] },
  orient: 'Falha após 8 semanas → toxina botulínica ou esfincterotomia lateral interna (coloproctologia).', fonte: 'ASCRS 2023' });

PS({ id: 'rx_isc', grupo: 'Condutas', nome: 'Infecção de sítio cirúrgico superficial',
  quando: 'Hiperemia, calor, secreção purulenta na ferida (geralmente 5º–10º dia).',
  exames: 'Cultura da secreção; avaliar coleção profunda/fístula (USG/TC) se sinais sistêmicos.',
  ideal: { nota: 'Abrir a ferida e drenar é o tratamento; ATB se celulite >5 cm, sinais sistêmicos ou imunossupressão.', ps: [['Abertura parcial/total da ferida, drenagem, lavagem com SF', 'SUS']],
    alta: [['Curativo com SF 1–2×/dia (ou pressão negativa se grande)', 'SUS'], ['Se celulite: cefalexina 500 mg VO 6/6h por 5–7 dias (cirurgia intestinal: amoxicilina-clavulanato 875/125 12/12h)', 'SUS'], ['MRSA suspeito: SMX-TMP 800/160 mg 2 cp 12/12h ou clindamicina 300–450 mg 6/6h', 'SUS']] },
  sus: 'igual', orient: 'Retornar se febre, vermelhidão se espalhando, saída de líquido intestinal.', fonte: 'IDSA 2014; CDC/WHO SSI' });

PS({ id: 'rx_fournier', grupo: 'Condutas', nome: 'Fasceíte necrosante / Fournier (internação)',
  quando: 'Suspeita clínica — desbridamento cirúrgico imediato.',
  exames: 'Hemoculturas, lactato, hemograma, PCR, creatinina, glicemia, CK, sódio (LRINEC); culturas de tecido.',
  ideal: { nota: 'Antibiótico de amplo espectro + clindamicina antitoxina; reabordagens.', ps: [
    ['Piperacilina-tazobactam 4,5 g IV 6/6h (ou meropenem 1 g 8/8h)', 'HOSP'],
    [(p) => `Vancomicina ataque ${p.w ? nf(Math.min(Math.round(25 * p.w / 250) * 250, 3000), 0) + ' mg' : '25 mg/kg'} IV, depois 15–20 mg/kg 8–12/12h (nível)`, 'HOSP'],
    ['Clindamicina 900 mg IV 8/8h', 'HOSP'], ['Ressuscitação (Sala Vermelha → Sepse); controle glicêmico; nutrição', 'HOSP'], ['Desbridamento no centro cirúrgico e reabordagem em 24 h', 'SUS']], alta: [] },
  sus: 'igual', orient: '—', fonte: 'WSES/SIS 2018; IDSA 2014' });

PS({ id: 'rx_orqui', grupo: 'Condutas', nome: 'Orquiepididimite',
  quando: 'Dor escrotal gradual, Prehn +, febre/disúria. **Excluir torção** (TWIST/Doppler).',
  exames: 'EAS, urocultura; NAAT para clamídia/gonococo se <35 anos ou IST; Doppler.',
  ideal: { nota: 'Escolha pelo provável agente.', ps: [],
    alta: [['<35 anos/IST: ceftriaxona 500 mg IM dose única + doxiciclina 100 mg VO 12/12h por 10 dias', 'SUS'], ['>35 anos/entérica/sexo anal insertivo: levofloxacino 500 mg VO 1x/dia por 10 dias', 'MISTO'],
      ['Ibuprofeno 600 mg 8/8h por 5–7 dias; suspensório escrotal; gelo', 'SUS']] },
  sus: { nota: 'Ciprofloxacino como quinolona da RENAME.', ps: [], alta: [['Ceftriaxona 500 mg IM + doxiciclina 100 mg 12/12h 10 dias (IST)', 'SUS'], ['Entérica: ciprofloxacino 500 mg 12/12h por 10 dias', 'SUS'], ['Ibuprofeno 600 mg 8/8h', 'SUS']] },
  orient: 'Tratar parceria (IST); abstinência sexual até cura. Retornar se piora, abscesso, febre persistente.', fonte: 'EAU 2025; CDC STI 2021' });

PS({ id: 'rx_retencao', grupo: 'Condutas', nome: 'Retenção urinária aguda (HPB) — alta com sonda',
  quando: 'Após sondagem vesical; excluir causas neurológicas e medicamentosas.',
  exames: 'Creatinina, EAS/urocultura; PSA após 6 semanas (não durante retenção/ITU).',
  ideal: { nota: 'Alfabloqueador por 2–3 dias e tentativa de retirada da sonda (TWOC).', ps: [['Sondagem vesical de demora 16 Fr; medir volume drenado', 'SUS']],
    alta: [['Tansulosina 0,4 mg VO 1x/dia à noite (manter)', 'PART'], ['Retirada da sonda em 2–3 dias na UBS/urologia', 'SUS'], ['Corrigir constipação; suspender anticolinérgicos/descongestionantes', 'SUS']] },
  sus: { nota: 'RENAME: doxazosina.', ps: 'ideal', alta: [['Doxazosina 2 mg VO à noite (hipotensão postural — levantar devagar)', 'SUS'], ['Retirada da sonda em 2–3 dias', 'SUS']] },
  orient: 'Cuidados com a sonda (bolsa abaixo da bexiga, higiene). Encaminhar à urologia.', fonte: 'EAU 2025 (LUTS/BPO)' });

PS({ id: 'rx_queim', grupo: 'Condutas', nome: 'Queimadura pequena ambulatorial',
  quando: '2º grau superficial <10% SCQ, sem áreas especiais, sem inalação/elétrica/química, sem comorbidades graves.',
  exames: '—',
  ideal: { nota: 'Curativos que mantenham ambiente úmido; sulfadiazina de prata atrasa a epitelização (não usar em superficiais limpas).', ps: [['Resfriar com água corrente 20 min; limpar com SF/clorexidina degermante; desbridar bolhas rotas', 'SUS'], ['Analgesia: dipirona 1 g IV/VO + opioide se necessário', 'SUS'], ['Tétano conforme esquema', 'SUS']],
    alta: [['Curativo com hidrocoloide/espuma/prata nanocristalina ou gaze com vaselina; trocas a cada 2–3 dias', 'PART'], ['Sulfadiazina de prata 1% 1–2×/dia se área contaminada/profunda', 'SUS'], ['Dipirona 1 g 6/6h + ibuprofeno 600 mg 8/8h por 3–5 dias', 'SUS'], ['Hidratante e protetor solar na pele epitelizada', 'PART']] },
  sus: { nota: 'Sulfadiazina de prata e gaze vaselinada na rede.', ps: 'ideal', alta: [['Sulfadiazina de prata 1% ou gaze vaselinada; curativo na UBS a cada 1–2 dias', 'SUS'], ['Dipirona + ibuprofeno', 'SUS']] },
  orient: 'Retornar se febre, secreção purulenta, piora da dor ou sem epitelização em 10–14 dias (avaliar enxerto).', fonte: 'ABA; MS — Cartilha de tratamento de queimaduras' });
