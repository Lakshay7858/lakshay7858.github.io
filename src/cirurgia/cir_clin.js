// Clínica cirúrgica — abdome agudo e urgências. Mesmo formato dos protocolos (secs/rx com D()).
const CLIN = [];
const C = (o) => CLIN.push(o);

/* ================= ABDOME AGUDO ================= */
C({ id: 'aa', cat: 'Abdome agudo', cor: 'vermelho', title: 'Abdome agudo — abordagem e o que não pode faltar',
  alias: ['abdome agudo', 'dor abdominal', 'sinais', 'blumberg', 'rovsing', 'murphy', 'giordano', 'cullen', 'grey turner', 'jobert', 'kehr', 'psoas', 'obturador', 'toque retal'],
  resumo: 'Classifique em uma das 5 síndromes (inflamatória, obstrutiva, perfurativa, vascular, hemorrágica), estabilize, analgesie e decida: cirurgia agora, imagem ou observação com reavaliação seriada.',
  secs: [
    { h: '✅ Checklist — o que o cirurgião não pode esquecer', li: [
      '**Sinais vitais completos + glicemia capilar** (CAD simula abdome agudo); índice de choque (FC/PAS ≥1 = gravidade).',
      '**β-hCG em toda mulher em idade fértil** — gravidez ectópica rota mata.',
      '**Examinar todas as regiões herniárias** (inguinal, femoral, umbilical, incisional) — hérnia encarcerada é causa clássica de obstrução esquecida, especialmente femoral em idosa.',
      '**Toque retal** (sangue, fecaloma, abaulamento/dor no fundo de saco, tumor) e exame ginecológico quando indicado.',
      '**Testículos no homem** com dor abdominal baixa/inguinal (torção).',
      '**ECG** se dor epigástrica/abdome superior e >40 anos ou fatores de risco (IAM inferior); **lipase**; EAS; função renal; lactato se suspeita de isquemia.',
      '**Pulsos e massa pulsátil** em idoso hipertenso/tabagista (AAA roto: dor + hipotensão + massa).',
      '**Dor desproporcional ao exame físico = isquemia mesentérica** até prova em contrário (FA, idoso, vasculopata).',
      'Idoso, imunossuprimido, diabético, uso de corticoide, cirrótico e gestante: **sinais atenuados** → limiar baixo para TC.',
      '**Analgesia precoce** (inclusive opioide) não mascara o diagnóstico nem atrasa a decisão.',
      'Causas extra-abdominais: pneumonia de base, IAM, CAD, cólica renal, herpes-zóster, porfiria, crise falciforme.',
      '**Reavaliação seriada** (idealmente pelo mesmo examinador) e documentação horária do exame.' ] },
    { h: 'Síndromes', table: { head: ['Síndrome', 'Pistas', 'Exemplos'], rows: [
      ['**Inflamatória**', 'Dor progressiva e localizada, febre, peritonite localizada', 'Apendicite, colecistite, diverticulite, pancreatite, DIP, abscesso'],
      ['**Obstrutiva**', 'Cólica, vômitos, distensão, parada de gases e fezes', 'Bridas, hérnias, neoplasia de cólon, volvo, íleo biliar, intussuscepção'],
      ['**Perfurativa**', 'Dor súbita intensa, abdome em tábua, pneumoperitônio (sinal de Jobert)', 'Úlcera péptica, diverticulite, neoplasia, corpo estranho, Boerhaave'],
      ['**Vascular**', 'Dor desproporcional, FA, lactato alto, sangramento retal tardio', 'Isquemia mesentérica aguda, colite isquêmica, AAA roto'],
      ['**Hemorrágica**', 'Choque + dor + abdome distendido, Kehr, Cullen/Grey-Turner', 'Ectópica rota, AAA roto, rotura esplênica/hepática, cisto hemorrágico']] } },
    { h: 'Sinais semiológicos', table: { head: ['Sinal', 'Achado', 'Sugere'], rows: [
      ['Blumberg', 'Descompressão brusca dolorosa no ponto de McBurney', 'Peritonite (apendicite)'], ['Rovsing', 'Dor em FID ao comprimir FIE', 'Apendicite'],
      ['Psoas', 'Dor à extensão do quadril direito', 'Apêndice retrocecal'], ['Obturador', 'Dor à rotação interna do quadril fletido', 'Apêndice pélvico'],
      ['Dunphy', 'Dor em FID à tosse', 'Apendicite'], ['Murphy', 'Parada da inspiração à palpação do HCD', 'Colecistite'],
      ['Courvoisier-Terrier', 'Vesícula palpável indolor + icterícia', 'Neoplasia periampular'], ['Jobert', 'Timpanismo na loja hepática', 'Pneumoperitônio'],
      ['Cullen / Grey-Turner', 'Equimose periumbilical / em flancos', 'Hemorragia retroperitoneal, pancreatite necro-hemorrágica'], ['Kehr', 'Dor referida no ombro esquerdo', 'Hemoperitônio (baço)'],
      ['Giordano', 'Dor à punho-percussão lombar', 'Pielonefrite, cólica renal'], ['Lenander', 'Temp. retal >1 °C acima da axilar', 'Processo inflamatório pélvico'],
      ['Chandelier', 'Dor intensa à mobilização do colo uterino', 'DIP'], ['Carnett', 'Dor que piora com a parede contraída', 'Dor de parede (não visceral)']] } },
    { h: 'Exames iniciais', li: [ 'Hemograma, PCR, lipase, ureia/creatinina, Na/K, glicemia, TGO/TGP/FA/GGT/bilirrubinas, EAS, β-hCG, gasometria com lactato (choque/isquemia), coagulograma e tipagem se cirurgia provável.',
      'Imagem: **TC de abdome com contraste** é o exame de escolha no adulto com dor indiferenciada; **USG** para via biliar, gestante, ginecológica e jovem magro; RX de tórax em pé (pneumoperitônio) e RX de abdome (obstrução) se TC indisponível.' ] },
  ],
  rx: [ { h: 'Conduta inicial', li: [
    'Jejum, 2 acessos calibrosos, cristaloide balanceado se hipovolemia, analgesia (dipirona 1 g IV ± morfina 0,05–0,1 mg/kg IV), antiemético.',
    'SNG se vômitos incoercíveis/obstrução; sondagem vesical se instável (diurese).',
    'Antibiótico **precoce** se peritonite/sepse (ver Prescrições → peritonite); avaliação cirúrgica imediata se instável ou peritonite difusa.' ] } ],
  fontes: ['sabiston21', 'usp_cirurgia', 'wses_ia2017'] });

C({ id: 'obstrutivo', cat: 'Abdome agudo', cor: 'laranja', title: 'Abdome agudo obstrutivo (delgado, cólon, volvo, Ogilvie)',
  alias: ['obstrucao intestinal', 'bridas', 'asbo', 'volvo', 'sigmoide', 'grao de cafe', 'empilhamento de moedas', 'gastrografina', 'ogilvie', 'pseudo-obstrucao', 'ileo biliar', 'rigler', 'neostigmina'],
  resumo: 'Diferencie alto × baixo, mecânico × funcional, simples × estrangulado. Sinais de estrangulamento indicam cirurgia imediata; obstrução por bridas sem sofrimento → conservador até 72 h com contraste hidrossolúvel.',
  secs: [
    { h: 'Causas', table: { head: ['Delgado', 'Cólon'], rows: [
      ['**Bridas/aderências (60–75%)**', '**Neoplasia (≈60%)**'], ['Hérnias (inguinal, femoral, incisional, interna)', 'Volvo (sigmoide > ceco)'], ['Neoplasias, carcinomatose', 'Diverticulite (estenose)'],
      ['Crohn, estenoses actínicas', 'Fecaloma, pseudo-obstrução (Ogilvie)'], ['**Íleo biliar** (tríade de Rigler: pneumobilia + obstrução + cálculo ectópico)', 'Hérnias'], ['Intussuscepção (no adulto: lesão de base — ressecar), bezoar', '—']] } },
    { h: 'Imagem', li: [
      'RX: delgado com **pregas coniventes ("empilhamento de moedas")** e níveis hidroaéreos centrais; cólon com **haustrações** periféricas. Dilatação: delgado >3 cm, cólon >6 cm, **ceco >9–12 cm = risco de perfuração**.',
      'Volvo de sigmoide: **"grão de café"/U invertido** apontando para o QSD; volvo de ceco: alça dilatada no QSE.',
      '**TC com contraste**: ponto de transição, causa e **sinais de sofrimento**: alça fechada (closed loop), redemoinho (whirl), espessamento/hipo-realce da parede, pneumatose, gás portal, edema mesentérico, ascite, "fezes no delgado" (feces sign).' ] },
    { h: 'Obstrução por bridas (WSES — Bologna)', li: [
      '**Cirurgia imediata**: peritonite, sinais de estrangulamento (clínicos ou na TC), febre + leucocitose + lactato, dor contínua.',
      '**Conservador** (sem sinais de sofrimento): jejum, **SNG**, hidratação, correção de K/Mg, analgesia, reavaliação seriada.',
      '**Contraste hidrossolúvel** (diatrizoato/"gastrografina" 50–150 mL pela SNG, clampeada 2–4 h): RX em **8–24 h** — contraste no cólon prediz resolução (diagnóstico e terapêutico, reduz tempo de internação).',
      'Sem resolução em **72 h** → cirurgia (enterólise; laparoscopia em casos selecionados).' ] },
    { h: 'Volvo de sigmoide e de ceco', li: [
      'Sigmoide sem isquemia/perfuração: **distorção endoscópica** (retossigmoidoscopia flexível) + sonda retal; **sigmoidectomia na mesma internação** (recorrência ~60%).',
      'Sinais de necrose/perfuração ou falha endoscópica → **retossigmoidectomia (Hartmann)**.',
      'Volvo de ceco: **cirurgia** (colectomia direita); endoscopia raramente eficaz.' ] },
    { h: 'Pseudo-obstrução colônica aguda (Ogilvie)', li: [
      'Pós-operatório, idoso acamado, distúrbio eletrolítico, opioides. Excluir obstrução mecânica (TC).',
      'Suporte 24–48 h (corrigir K/Mg, suspender opioides/anticolinérgicos, SNG, sonda retal, mobilização).',
      'Ceco >12 cm ou falha → **neostigmina 2 mg IV em 3–5 min** com monitor (atropina à mão; contraindicada se obstrução mecânica, bradicardia, broncoespasmo); repetir 1×. Falha → descompressão colonoscópica; perfuração/isquemia → cirurgia.' ] },
  ],
  rx: [ { h: 'Prescrição inicial', li: [
    'Jejum, SNG aberta em frasco (anotar débito), sondagem vesical se instável.',
    ['Cristaloide balanceado: ', D(20, 'mL', { max: 1000, round: 50 }), ' em bolus se desidratado, depois manutenção + reposição do débito da SNG.'],
    'KCl conforme K sérico (aba Calculadoras → Potássio); manter Mg >2.',
    'Analgesia: dipirona 1 g IV 6/6h + morfina 2–4 mg IV se dor; ondansetrona 4–8 mg IV.',
    'Contraste hidrossolúvel 100 mL pela SNG (após descompressão), clampear 2 h; RX de abdome em 8–24 h.' ] } ],
  fontes: ['wses_asbo2017', 'ascrs_volvulus2021', 'asge_ogilvie'] });

C({ id: 'perfurativo', cat: 'Abdome agudo', cor: 'vermelho', title: 'Abdome agudo perfurativo (úlcera péptica perfurada)',
  alias: ['perfuracao', 'pneumoperitonio', 'ulcera perfurada', 'boey', 'graham', 'boerhaave', 'peritonite'],
  resumo: 'Dor súbita "em punhalada", abdome em tábua, pneumoperitônio. Reanimação, antibiótico, IBP e cirurgia precoce (rafia + omentopexia). Mortalidade aumenta a cada hora de atraso.',
  secs: [
    { h: 'Diagnóstico', li: [ 'RX de tórax em pé ou decúbito lateral esquerdo com raios horizontais: ar sob as cúpulas (sensibilidade ~70%). **TC** (mais sensível): ar livre, local da perfuração, coleções.', 'Escore de **Boey**: choque na admissão, comorbidade grave, perfuração >24 h — 0: mortalidade ~1%; 1: ~8–10%; 2: ~30–45%; 3: >50%.' ] },
    { h: 'Conduta (WSES 2020)', li: [
      'Reanimação, SNG, **IBP IV** (pantoprazol/omeprazol 80 mg em bolus, depois 40 mg 12/12h), antibiótico de amplo espectro.',
      '**Cirurgia precoce**: rafia simples com patch de omento (Graham) — laparoscópica se estável e equipe treinada. Úlcera gástrica: **biópsia** das bordas (câncer). Perfuração grande (>2 cm)/duodenal gigante: técnicas complexas (exclusão pilórica, ressecção).',
      'Não operatório (Taylor) apenas excepcionalmente: perfuração tamponada (sem extravasamento de contraste), estável, sem peritonite difusa.',
      'Pós-operatório: **erradicação do H. pylori** e EDA de controle em 6–8 semanas (úlcera gástrica). Suspender AINE.' ] },
    { h: 'Outras perfurações', li: [ 'Boerhaave (esôfago após vômitos — dor torácica, enfisema, derrame pleural esquerdo): TC com contraste oral, jejum, ATB, IBP, cirurgia/stent em centro especializado.', 'Perfuração de cólon (diverticulite, neoplasia, iatrogênica): ver Diverticulite / Hartmann.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    'Jejum, SNG, sonda vesical, 2 acessos, cristaloide balanceado.',
    'Pantoprazol 80 mg IV em bolus, depois 40 mg IV 12/12h.',
    'Ceftriaxona 2 g IV 1x/dia + metronidazol 500 mg IV 8/8h (ou piperacilina-tazobactam 4,5 g 6/6h se grave/hospitalar); antifúngico só se imunossuprimido/choque refratário/perfuração recorrente.',
    'Analgesia e antiemético; profilaxia de TEV após a cirurgia.' ] } ],
  fontes: ['wses_pud2020'] });

C({ id: 'vascular', cat: 'Abdome agudo', cor: 'vermelho', title: 'Abdome agudo vascular (isquemia mesentérica, AAA roto)',
  alias: ['isquemia mesenterica', 'mesenterica', 'embolia', 'aaa', 'aneurisma roto', 'colite isquemica', 'nomi', 'trombose venosa mesenterica', 'heparina'],
  resumo: 'Dor desproporcional ao exame em paciente com FA/vasculopatia = isquemia mesentérica até prova em contrário: angio-TC imediata, heparina, revascularização e ressecção do intestino inviável.',
  secs: [
    { h: 'Isquemia mesentérica aguda (ESVS 2017 / WSES 2022)', table: { head: ['Tipo', 'Contexto', 'Tratamento-chave'], rows: [
      ['**Embolia da AMS** (~50%)', 'FA, IAM recente, início súbito', 'Embolectomia (aberta/endovascular) + ressecção'],
      ['Trombose arterial', 'Aterosclerose, angina abdominal prévia, perda de peso', 'Revascularização (stent/bypass) + ressecção'],
      ['NOMI (não oclusiva)', 'Choque, vasopressor, diálise, cirurgia cardíaca', 'Tratar a causa; vasodilatador intra-arterial (papaverina)'],
      ['Trombose venosa mesentérica', 'Trombofilia, cirrose, neoplasia, pós-op', '**Anticoagulação**; cirurgia só se necrose']] } },
    { h: 'Diagnóstico e conduta', li: [
      '**Angio-TC (fases arterial e venosa) imediata** — não esperar lactato (normal não exclui; elevação é tardia). D-dímero normal torna o diagnóstico improvável.',
      '**Heparina não fracionada imediata**, ressuscitação, antibiótico de amplo espectro, SNG.',
      'Peritonite/necrose: laparotomia — revascularizar **antes** de ressecar; ressecar apenas o inviável; **second look em 24–48 h** (controle de danos).',
      'Colite isquêmica (hipotensão, idoso, dor + hematoquezia): geralmente conservador (hidratação, ATB se moderada/grave); cirurgia se peritonite/necrose (cólon direito tem pior prognóstico).' ] },
    { h: 'Aneurisma de aorta abdominal roto', li: [
      'Tríade: dor abdominal/lombar + hipotensão + massa pulsátil (presente em <50%). POCUS mostra aorta >3 cm.',
      '**Hipotensão permissiva** (PAS 70–90 mmHg se consciente), evitar volume excessivo, sangue tipo-específico/O-, acionar cirurgia vascular. Estável: angio-TC para planejar **EVAR** (preferido se anatomia favorável); instável: centro cirúrgico.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    ['Heparina não fracionada: bolus ', D(80, 'UI', { max: 10000, round: 100 }), ' IV + ', D(18, 'UI/h', { round: 10 }), ' (TTPa 1,5–2,5×) — exceto AAA roto/sangramento.'],
    'Ceftriaxona 2 g + metronidazol 500 mg 8/8h IV (ou pipe-tazo 4,5 g 6/6h).',
    'Cristaloide balanceado guiado por perfusão; noradrenalina se necessário (evitar vasopressor em altas doses na NOMI quando possível).',
    'Analgesia com opioide (dor intensa).' ] } ],
  fontes: ['esvs2017', 'wses_ami2022', 'esvs2024aaa'] });

C({ id: 'hemorragico', cat: 'Abdome agudo', cor: 'vermelho', title: 'Abdome agudo hemorrágico',
  alias: ['abdome agudo hemorragico', 'gravidez ectopica', 'ectopica rota', 'rotura esplenica', 'hemoperitonio', 'hematoma reto abdominal'],
  resumo: 'Choque + dor abdominal + β-hCG positivo = ectópica rota até prova em contrário. Reanimação com sangue e cirurgia/embolização sem atraso.',
  secs: [ { h: 'Causas e pistas', table: { head: ['Causa', 'Pista', 'Conduta'], rows: [
    ['**Gravidez ectópica rota**', 'β-hCG +, atraso menstrual, USG transvaginal sem saco intrauterino + líquido livre', 'Instável: laparotomia/laparoscopia (salpingectomia)'],
    ['AAA roto', 'Idoso, tabagista, massa pulsátil', 'Ver Abdome agudo vascular'],
    ['Rotura esplênica atraumática', 'Mononucleose, malária, neoplasia hematológica, anticoagulado', 'Embolização ou esplenectomia'],
    ['Adenoma/CHC roto', 'Usuária de ACO (adenoma), cirrótico (CHC)', 'Embolização arterial'],
    ['Cisto ovariano hemorrágico / corpo lúteo', 'Meio do ciclo, dor súbita', 'Geralmente conservador; cirurgia se instável'],
    ['Hematoma de reto abdominal/retroperitoneal', 'Anticoagulado, tosse, massa de parede (sinal de Fothergill)', 'Reverter anticoagulação, embolização se ativo']] } } ],
  rx: [ { h: 'Conduta', li: [ 'Dois acessos calibrosos, tipagem/prova cruzada, protocolo de transfusão maciça se necessário (1:1:1), ácido tranexâmico 1 g IV se trauma/hemorragia obstétrica, reverter anticoagulantes, centro cirúrgico ou radiologia intervencionista.' ] } ],
  fontes: ['atls', 'rcog_ectopic'] });

/* ================= INFLAMATÓRIOS ================= */
C({ id: 'apendicite', cat: 'Inflamatório', cor: 'laranja', title: 'Apendicite aguda (WSES 2025)',
  alias: ['apendicite', 'alvarado', 'air', 'aas', 'mcburney', 'plastrao', 'abscesso apendicular', 'apendicectomia', 'coda'],
  resumo: 'Use escores (AIR ou AAS preferidos; Alvarado) para estratificar, imagem nos intermediários, apendicectomia laparoscópica (pode aguardar até 24 h na não complicada) e ATB curto na complicada.',
  secs: [
    { h: 'Estratificação (aba Calculadoras)', table: { head: ['Escore', 'Baixo', 'Intermediário', 'Alto'], rows: [
      ['**AIR**', '0–4 → observação/alta com reavaliação', '5–8 → imagem', '9–12 → cirurgia'],
      ['**AAS** (Adult Appendicitis Score)', '0–10', '11–15 → imagem', '≥16 → cirurgia'],
      ['Alvarado', '≤4', '5–6 → imagem', '≥7']] } },
    { h: 'Imagem', li: [ '**USG** primeiro em crianças, jovens magros e gestantes; **TC (baixa dose)** no adulto com escore intermediário/dúvida; **RM** na gestante com USG inconclusivo.', 'Complicada: perfuração, abscesso, apendicolito, gangrena, peritonite.' ] },
    { h: 'Tratamento', li: [
      '**Apendicectomia laparoscópica** é o padrão (inclusive gestante, obeso, idoso, complicada). Na não complicada, a cirurgia pode ser feita **em até 24 h** sem aumento de complicações.',
      '**Tratamento não operatório (antibiótico)** é opção na **não complicada sem apendicolito** em adultos que preferem evitar cirurgia — falha/recorrência ~25–40% em 5 anos; apendicolito aumenta falha (CODA).',
      'Não complicada operada: **profilaxia em dose única**, sem ATB pós-operatório. Complicada: ATB pós-operatório **2–3 dias** (WSES 2025; até 4 dias — STOP-IT).',
      '**Plastrão/abscesso** em paciente estável: ATB ± **drenagem percutânea** (abscesso >3–4 cm). Apendicectomia de intervalo **não rotineira**, exceto adultos **≥35 anos** (risco de neoplasia) — e colonoscopia/TC de controle.' ] },
  ],
  rx: [ { h: 'Antibióticos', li: [
    'Profilaxia (não complicada): **cefazolina 2 g IV + metronidazol 500 mg IV** 30–60 min antes da incisão (≥120 kg: cefazolina 3 g).',
    'Complicada (terapêutico): **ceftriaxona 2 g IV 1x/dia + metronidazol 500 mg IV 8/8h** ou **amoxicilina-clavulanato 1,2 g IV 8/8h**; grave/hospitalar: piperacilina-tazobactam 4,5 g 6/6h.',
    'Não operatório: ceftriaxona + metronidazol IV 1–3 dias, depois amoxicilina-clavulanato 875/125 mg VO 12/12h para completar 7–10 dias.' ] } ],
  fontes: ['wses2025ap', 'coda2020', 'stopit'] });

C({ id: 'colecistite', cat: 'Inflamatório', cor: 'laranja', title: 'Colecistite aguda (Tokyo 2018)',
  alias: ['colecistite', 'tokyo', 'tg18', 'murphy', 'colecistostomia', 'vesicula'],
  resumo: 'Diagnóstico por critérios A (local) + B (sistêmico) + C (imagem); gravidade I–III orienta: colecistectomia laparoscópica precoce (I/II) ou drenagem da vesícula (III sem condições).',
  secs: [
    { h: 'Critérios diagnósticos TG18', table: { head: ['Grupo', 'Critérios'], rows: [
      ['**A — local**', 'Sinal de Murphy; massa, dor ou defesa em HCD'], ['**B — sistêmico**', 'Febre; PCR elevada; leucocitose'], ['**C — imagem**', 'Achados de colecistite (USG: espessamento >4 mm, líquido pericolecístico, Murphy ultrassonográfico, cálculo impactado)'],
      ['Diagnóstico', '**Suspeito**: 1 de A + 1 de B · **Definitivo**: A + B + C']] } },
    { h: 'Gravidade TG18', table: { head: ['Grau', 'Critério', 'Conduta'], rows: [
      ['**III (grave)**', 'Disfunção orgânica: cardiovascular (vasopressor), neurológica, respiratória (P/F <300), renal (oligúria/Cr >2), hepática (INR >1,5), hematológica (plaquetas <100 mil)', 'Suporte + **drenagem percutânea da vesícula**; colecistectomia precoce só em centro avançado se disfunção reversível (CV/renal), sem icterícia (BT ≥2), sem disfunção neurológica/respiratória e baixo risco (CCI ≤3, ASA ≤2)'],
      ['**II (moderada)**', 'Leucócitos >18 mil, massa palpável em HCD, sintomas >72 h, inflamação local acentuada (gangrenosa, enfisematosa, abscesso, peritonite biliar)', 'Colecistectomia laparoscópica precoce em centro experiente (CCI ≤5/ASA ≤2); senão, drenagem'],
      ['**I (leve)**', 'Sem critérios de II ou III', '**Colecistectomia laparoscópica precoce**']] } },
    { h: 'Pontos práticos', li: [ 'Colecistectomia **precoce (≤72 h, aceitável até 7–10 dias)** é superior à tardia (menos reinternação, mesma segurança).', 'Investigar coledocolitíase (ASGE) — ver Colangite/coledocolitíase. Colecistite alitiásica: paciente crítico — drenagem percutânea.', 'Na cirurgia: visão crítica de segurança; bail-out (subtotal) se anatomia hostil — ver Descrições cirúrgicas.' ] },
  ],
  rx: [ { h: 'Antibióticos (TG18)', li: [
    'Grau I: **cefazolina 2 g 8/8h** ou cefuroxima 1,5 g 8/8h ou ceftriaxona 1–2 g/dia (± metronidazol se anastomose biliodigestiva).',
    'Grau II: **ceftriaxona 2 g/dia ± metronidazol 500 mg 8/8h**, ou amoxicilina-clavulanato, ou pipe-tazo.',
    'Grau III: **piperacilina-tazobactam 4,5 g 6/6h** ou cefepime 2 g 8/8h + metronidazol, ou meropenem 1 g 8/8h; + vancomicina se Enterococcus/MRSA suspeito.',
    'Duração: graus I–II — suspender **até 24 h após a colecistectomia**; grau III — **4–7 dias** após controle do foco.' ] } ],
  fontes: ['tg18', 'wses_colec2020'] });

C({ id: 'colangite', cat: 'Inflamatório', cor: 'vermelho', title: 'Colangite aguda e coledocolitíase',
  alias: ['colangite', 'charcot', 'reynolds', 'coledocolitiase', 'cpre', 'asge', 'colangiorm', 'ictericia obstrutiva'],
  resumo: 'Colangite = infecção + obstrução biliar: antibiótico + drenagem biliar (CPRE) no tempo certo conforme gravidade TG18. Coledocolitíase: estratificar risco ASGE para escolher CPRE × colangio-RM/EUS.',
  secs: [
    { h: 'Colangite — TG18', table: { head: ['', 'Critérios'], rows: [
      ['A — inflamação sistêmica', 'Febre >38 °C/calafrios; leucocitose/PCR'], ['B — colestase', 'Icterícia (BT ≥2 mg/dL); enzimas >1,5× LSN'], ['C — imagem', 'Dilatação biliar; etiologia (cálculo, estenose, prótese)'],
      ['Diagnóstico', 'Suspeito: A + B ou C · Definitivo: A + B + C'],
      ['**Grau III**', 'Disfunção orgânica → drenagem biliar **urgente** após estabilização'],
      ['**Grau II**', '≥2: leucócitos >12 mil ou <4 mil, febre ≥39 °C, idade ≥75, BT ≥5, albumina <0,7× LSN → drenagem **precoce** (<24–48 h)'],
      ['**Grau I**', 'ATB; drenagem se não responder em 24 h / para tratar a causa']] } },
    { h: 'Coledocolitíase — ASGE 2019', table: { head: ['Risco', 'Critérios', 'Conduta'], rows: [
      ['**Alto**', 'Cálculo no colédoco à imagem **ou** colangite **ou** BT >4 mg/dL + colédoco dilatado (>6 mm com vesícula)', '**CPRE** pré-operatória (ou exploração de via biliar intraoperatória)'],
      ['**Intermediário**', 'Enzimas hepáticas alteradas, idade >55 anos, colédoco dilatado ao USG', '**Colangio-RM ou EUS** pré-op, ou colangiografia/USG intraoperatório'],
      ['Baixo', 'Nenhum preditor', 'Colecistectomia sem investigação adicional']] } },
    { h: 'Pontos práticos', li: [ 'Tríade de Charcot (febre, icterícia, dor) e pêntade de Reynolds (+ choque, confusão).', 'Drenagem: CPRE com papilotomia/prótese; falha → drenagem percutânea transparieto-hepática; cirurgia só se as outras falharem.', 'Colecistectomia na mesma internação após clareamento da via biliar.' ] },
  ],
  rx: [ { h: 'Antibióticos', li: [ 'Grau I–II comunitário: **ceftriaxona 2 g/dia + metronidazol 500 mg 8/8h** (ou amoxicilina-clavulanato).', 'Grau III/hospitalar/prótese biliar: **piperacilina-tazobactam 4,5 g 6/6h** ou meropenem 1 g 8/8h (± vancomicina).', 'Duração: **4–7 dias após a drenagem** efetiva (bacteremia por Gram+ como Enterococcus: ≥2 semanas).' ] } ],
  fontes: ['tg18', 'asge2019'] });

C({ id: 'pancreatite', cat: 'Inflamatório', cor: 'laranja', title: 'Pancreatite aguda (Atlanta revisada)',
  alias: ['pancreatite', 'atlanta', 'bisap', 'ranson', 'necrose', 'walled off', 'pseudocisto', 'step-up', 'lipase'],
  resumo: 'Diagnóstico (2 de 3), gravidade pela falência orgânica, hidratação moderada com Ringer, analgesia, dieta oral precoce, sem antibiótico profilático; necrose infectada → step-up, de preferência após 4 semanas.',
  secs: [
    { h: 'Diagnóstico e gravidade (Atlanta 2012)', table: { head: ['', ''], rows: [
      ['Diagnóstico (2 de 3)', 'Dor típica · lipase/amilase ≥3× LSN · imagem compatível'],
      ['**Leve**', 'Sem falência orgânica nem complicações'], ['**Moderadamente grave**', 'Falência orgânica transitória (<48 h) e/ou complicações locais/sistêmicas'],
      ['**Grave**', 'Falência orgânica **persistente (>48 h)** — Marshall modificado ≥2'],
      ['Coleções', '<4 semanas: coleção fluida peripancreática aguda / coleção necrótica aguda · ≥4 semanas: **pseudocisto** / **necrose encapsulada (WON)**']] } },
    { h: 'Manejo (ACG 2024 / IAP-APA)', li: [
      '**Ringer lactato**, ressuscitação **moderada** (WATERFALL): bolus 10 mL/kg se hipovolêmico + 1,5 mL/kg/h, reavaliar em 12, 24, 48 e 72 h (evitar sobrecarga).',
      'Analgesia (opioides são seguros). **Dieta oral precoce (24–48 h)** conforme tolerância; se não tolerar, enteral por SNG/SNE (não parenteral).',
      '**Sem antibiótico profilático**, mesmo na necrose. Suspeita de necrose infectada (gás na TC, deterioração após 7–10 dias): carbapenêmico (ou quinolona + metronidazol).',
      'TC com contraste **não** na admissão (exceto dúvida diagnóstica) — após 72–96 h se piora/não melhora.',
      '**CPRE urgente só se colangite** (ou obstrução biliar persistente).',
      'Biliar leve: **colecistectomia na mesma internação** (PONCHO). Etiologia: USG, triglicerídeos (>1.000), cálcio, álcool, drogas, pós-CPRE.',
      'Necrose infectada: **step-up** — drenagem percutânea/endoscópica → necrosectomia endoscópica/minimamente invasiva, idealmente **após 4 semanas** (encapsulamento).' ] },
  ],
  rx: [ { h: 'Prescrição de internação', li: [
    ['Ringer lactato: bolus ', D(10, 'mL', { round: 50 }), ' se hipovolêmico, depois ', D(1.5, 'mL/h', { round: 5 }), ' — reavaliar em 12 h.'],
    'Dieta oral leve assim que tolerar (sem jejum prolongado).',
    'Dipirona 1 g IV 6/6h + morfina 2–4 mg IV até 4/4h (ou fentanil/PCA) + ondansetrona 4–8 mg IV.',
    'Profilaxia de TEV (enoxaparina 40 mg SC/dia), controle glicêmico, monitorizar diurese, Ht, ureia, creatinina e PCR (>150 em 48 h = gravidade).' ] } ],
  fontes: ['acg2024panc', 'atlanta2012', 'waterfall'] });

C({ id: 'diverticulite', cat: 'Inflamatório', cor: 'laranja', title: 'Diverticulite aguda (WSES 2020 / Hinchey)',
  alias: ['diverticulite', 'hinchey', 'abscesso pericolico', 'hartmann', 'drenagem percutanea', 'sigmoide'],
  resumo: 'TC com contraste para classificar. Não complicada: ambulatorial, antibiótico opcional em imunocompetente. Abscesso >4 cm: drenagem percutânea. Peritonite: cirurgia.',
  secs: [
    { h: 'Classificação', table: { head: ['WSES (TC)', 'Hinchey modificada', 'Conduta'], rows: [
      ['0 — não complicada', '0 / Ia (flegmão)', 'Ambulatorial; ATB seletivo (imunossupressão, comorbidade, sinais sistêmicos)'],
      ['1A — bolhas/líquido pericólico', 'Ia', 'ATB'],
      ['1B — abscesso ≤4 cm', 'Ib', '**ATB IV**'],
      ['2A — abscesso >4 cm', 'II', '**Drenagem percutânea + ATB**'],
      ['2B — gás distante (>5 cm)', '—', 'ATB; cirurgia se piora'],
      ['3 — líquido difuso sem ar distante', 'III (purulenta)', '**Cirurgia**: ressecção ± anastomose; lavagem laparoscópica só em selecionados'],
      ['4 — líquido difuso com ar distante', 'IV (fecal)', '**Cirurgia** (Hartmann se instável/fecal)']] } },
    { h: 'Pontos práticos', li: [ 'Paciente estável com peritonite: ressecção com **anastomose primária ± ileostomia de proteção** é alternativa ao Hartmann.', '**Colonoscopia em 6–8 semanas** após episódio complicado (ou se não feita recentemente) para excluir neoplasia.', 'Sigmoidectomia eletiva individualizada (não pelo número de episódios); imunossuprimidos têm limiar menor.' ] },
  ],
  rx: [ { h: 'Antibióticos', li: [ 'Ambulatorial (se indicado): **amoxicilina-clavulanato 875/125 mg VO 12/12h** por 7 dias (alergia: ciprofloxacino 500 mg 12/12h + metronidazol 500 mg 8/8h).', 'Internado: **ceftriaxona 2 g/dia + metronidazol 500 mg IV 8/8h** (ou amoxicilina-clavulanato 1,2 g IV 8/8h); peritonite/grave: pipe-tazo 4,5 g 6/6h.', 'Após controle do foco: **4 dias** de antibiótico em geral suficientes (STOP-IT).' ] } ],
  fontes: ['wses2020div', 'aga2021div', 'stopit'] });

C({ id: 'fasceite', cat: 'Inflamatório', cor: 'vermelho', title: 'Fasceíte necrosante e gangrena de Fournier',
  alias: ['fasceite', 'fournier', 'lrinec', 'gangrena', 'necrose', 'crepitacao'],
  resumo: 'Dor desproporcional, edema além do eritema, bolhas hemorrágicas, crepitação e sepse: desbridamento cirúrgico imediato é o tratamento (imagem não deve atrasar).',
  secs: [ { h: 'Diagnóstico', li: [ 'Clínico; **LRINEC ≥6** sugere (sensibilidade limitada — escore baixo não exclui). TC pode mostrar gás em partes moles, mas não atrasar a cirurgia.', 'Fournier: períneo/genitais, fatores de risco DM, etilismo, imunossupressão, fonte urológica/anorretal.' ] },
    { h: 'Conduta', li: [ 'Ressuscitação (sepse), **antibiótico imediato** e **desbridamento radical em centro cirúrgico**; reabordagem em 24–48 h até não haver necrose.', 'Derivação fecal (colostomia) se acometimento perianal extenso; cistostomia se uretra comprometida. Oxigenoterapia hiperbárica é adjuvante (não atrasar cirurgia).' ] } ],
  rx: [ { h: 'Antibióticos', li: [ '**Piperacilina-tazobactam 4,5 g 6/6h** (ou meropenem 1 g 8/8h) **+ vancomicina** (ataque 25–30 mg/kg) **+ clindamicina 900 mg 8/8h** (inibe toxinas) — ajustar por cultura.', 'Controle glicêmico, nutrição, profilaxia de TEV.' ] } ],
  fontes: ['wses_sti2018', 'idsa2014'] });

/* ================= HÉRNIAS ================= */
C({ id: 'hernias', cat: 'Hérnias', cor: 'amarelo', title: 'Hérnias da parede abdominal (eletivas e complicadas)',
  alias: ['hernia', 'hernia inguinal', 'hernia femoral', 'hernia umbilical', 'encarcerada', 'estrangulada', 'taxe', 'nyhus', 'herniasurge'],
  resumo: 'Diagnóstico clínico (USG se dúvida). Inguinal no homem oligossintomático: cirurgia ou conduta expectante; mulher e femoral: operar. Estrangulamento = cirurgia de urgência.',
  secs: [
    { h: 'Recomendações (HerniaSurge 2018 / atualização 2023)', li: [
      'Reparo **com tela** para todos os adultos (Lichtenstein ou laparoendoscópica TEP/TAPP, conforme experiência).',
      'Homem oligo/assintomático: **conduta expectante** é aceitável (mas ~70% operam em 5–10 anos).',
      '**Mulher**: preferir laparoendoscópica (detecta/trata hérnia femoral oculta). **Femoral**: sempre operar (alto risco de estrangulamento).',
      'Bilateral ou recidiva após aberta: laparoendoscópica. Recidiva após posterior: Lichtenstein.',
      'Profilaxia antibiótica: não rotineira em baixo risco com tela (aberta); usar se fatores de risco (ver Perioperatório).' ] },
    { h: 'Encarcerada × estrangulada', li: [
      'Encarcerada há poucas horas, sem sinais de sofrimento: **redução manual (taxe)** com analgesia/sedação e Trendelenburg; observar após redução; reparo eletivo precoce.',
      '**Não reduzir** se suspeita de estrangulamento (dor intensa contínua, pele hiperemiada, febre, leucocitose, lactato, obstrução) — risco de redução "em bloco" de alça necrótica.',
      'Estrangulada: **cirurgia de urgência**, avaliar viabilidade; tela de polipropileno é segura em campo limpo e limpo-contaminado (WSES 2017).' ] },
    { h: 'Hérnia umbilical no cirrótico', li: [ 'Controlar ascite e operar eletivamente quando possível; urgência se encarceramento ou ruptura (síndrome de Flood).' ] } ],
  rx: [],
  fontes: ['herniasurge', 'wses_hernia2017', 'ehs_ahs2020'] });

/* ================= TRAUMA ================= */
C({ id: 'traumaabd', cat: 'Trauma', cor: 'vermelho', title: 'Trauma abdominal e controle de danos',
  alias: ['trauma abdominal', 'fast', 'laparotomia', 'manejo nao operatorio', 'aast', 'baco', 'figado', 'sindrome compartimental abdominal', 'pia', 'faf', 'fab', 'controle de danos'],
  resumo: 'Instável + FAST positivo = centro cirúrgico. Estável: TC e manejo não operatório de vísceras sólidas quando possível. Tríade letal = controle de danos.',
  secs: [
    { h: 'Indicações de laparotomia', li: [ 'Instabilidade hemodinâmica com FAST positivo (ou LPD positiva).', 'Peritonite, evisceração, pneumoperitônio, ruptura diafragmática.', '**Ferimento por arma de fogo** que penetra a cavidade (na maioria).', 'Ferimento por arma branca com instabilidade, peritonite ou evisceração (estável sem peritonite: exploração local/TC/observação seriada).' ] },
    { h: 'Manejo não operatório (baço, fígado, rim)', li: [ 'Requisitos: **estabilidade hemodinâmica**, ausência de peritonite/outras lesões cirúrgicas, monitorização e centro cirúrgico disponível 24 h.', 'Extravasamento de contraste (blush) em estável → **angioembolização**.', 'Graduação AAST (I–V) orienta, mas a fisiologia decide.' ] },
    { h: 'Controle de danos', li: [ 'Indicações: pH <7,2, temperatura <35 °C, coagulopatia, transfusão maciça, lesões complexas. Cirurgia abreviada (empacotamento, ligadura/shunt, fechar alças sem anastomose), peritoneostomia, UTI, reabordagem em 24–48 h.' ] },
    { h: 'Síndrome compartimental abdominal (WSACS)', li: [ 'Pressão intra-abdominal pela sonda vesical (25 mL de SF, fim da expiração, decúbito dorsal, zero na linha axilar média). **HIA ≥12 mmHg**; **SCA = PIA >20 mmHg + nova disfunção orgânica**.', 'Medidas: sedação/BNM, SNG/sonda retal, evitar hipervolemia, drenagem de ascite; refratária → **laparotomia descompressiva**.' ] },
    { h: 'Pelve instável', li: [ '**Cinta pélvica** no nível dos trocânteres; sangramento arterial → angioembolização; venoso → empacotamento pré-peritoneal; REBOA em centros selecionados.' ] } ],
  rx: [ { h: 'Ressuscitação', li: [ 'Ácido tranexâmico 1 g IV em 10 min (≤3 h) + 1 g em 8 h; hemoderivados 1:1:1; cálcio; hipotensão permissiva (exceto TCE); aquecimento.' ] } ],
  fontes: ['atls', 'wses_spleen2017', 'wsacs2013'] });

C({ id: 'queimadura', cat: 'Trauma', cor: 'laranja', title: 'Queimaduras — avaliação, Parkland e transferência',
  alias: ['queimadura', 'queimado', 'parkland', 'regra dos 9', 'scq', 'escarotomia', 'inalacao'],
  resumo: 'ABCDE com atenção à via aérea (inalação), estimar a superfície queimada (2º e 3º graus), reposição pela fórmula de Parkland titulada pela diurese e transferência para centro de queimados quando indicado.',
  secs: [
    { h: 'Superfície corporal queimada (regra dos 9 — adulto)', table: { head: ['Região', '%'], rows: [['Cabeça e pescoço', '9'], ['Cada membro superior', '9'], ['Tronco anterior', '18'], ['Tronco posterior', '18'], ['Cada membro inferior', '18'], ['Períneo', '1'], ['Palma do paciente (com dedos)', '~1']] } },
    { h: 'Reposição e metas', li: [ '**Parkland/ATLS**: Ringer lactato **2 mL/kg/%SCQ** (adulto, térmica; 4 mL/kg/% na elétrica) nas primeiras 24 h — **metade nas primeiras 8 h contadas da hora da queimadura**. Calculadora: aba Calculadoras → Queimadura.', 'Titular pela **diurese 0,5 mL/kg/h** (elétrica: 1 mL/kg/h até urina clarear). Evitar hiper-ressuscitação (síndrome compartimental).', 'Só 2º e 3º graus entram no cálculo; 1º grau não.' ] },
    { h: 'Via aérea', li: [ '**IOT precoce** se: estridor, rouquidão progressiva, queimadura facial profunda/circunferencial cervical, fuligem em orofaringe com escarro carbonáceo, rebaixamento, SCQ >40–50%. Carboxi-hemoglobina (O₂ 100%); cianeto em incêndio fechado (hidroxocobalamina).' ] },
    { h: 'Transferir para centro de queimados (critérios ABA)', li: [ '2º grau >10% SCQ; qualquer 3º grau; face, mãos, pés, genitais, períneo, grandes articulações; elétrica (incluindo raio), química, inalação; comorbidades; trauma associado; crianças sem estrutura; necessidades sociais/reabilitação.' ] },
    { h: 'Outros', li: [ '**Escarotomia** em queimaduras circunferenciais de 3º grau com compressão (membros: isquemia; tórax: restrição ventilatória).', 'Resfriar com água corrente por 20 min (até 3 h), cobrir com plástico/filme limpo, prevenir hipotermia; tétano; analgesia com opioide IV.' ] } ],
  rx: [ { h: 'Cálculo para este paciente (exemplo 20% SCQ)', li: [ (p) => p.w ? `Parkland 2 mL/kg/%: ${nf(2 * p.w * 20, 0)} mL em 24 h → ${nf(2 * p.w * 20 / 2 / 8, 0)} mL/h nas primeiras 8 h (use a calculadora para a SCQ real).` : 'Informe o peso para calcular.' ] } ],
  fontes: ['atls', 'aba2018'] });

C({ id: 'isquemiamembro', cat: 'Trauma', cor: 'vermelho', title: 'Isquemia aguda de membro',
  alias: ['isquemia aguda', 'oclusao arterial aguda', '6ps', 'rutherford', 'embolectomia', 'fasciotomia'],
  resumo: 'Os 6 Ps (dor, palidez, ausência de pulso, parestesia, paralisia, poiquilotermia). Heparina imediata e revascularização conforme a classe de Rutherford.',
  secs: [ { h: 'Classificação de Rutherford', table: { head: ['Classe', 'Achados', 'Conduta'], rows: [
    ['I — viável', 'Sem perda sensitiva/motora, Doppler arterial audível', 'Revascularização eletiva/urgente (imagem)'],
    ['IIa — ameaçado marginalmente', 'Perda sensitiva mínima (dedos), sem fraqueza', 'Revascularização urgente (endovascular/cirurgia)'],
    ['IIb — ameaçado imediatamente', 'Perda sensitiva além dos dedos + fraqueza leve/moderada', '**Revascularização imediata**'],
    ['III — irreversível', 'Anestesia e paralisia profundas, rigidez', 'Amputação primária']] } },
    { h: 'Pontos práticos', li: [ 'Embolia (FA, início súbito, pulsos contralaterais normais) × trombose (DAP prévia).', '**Fasciotomia** se isquemia >4–6 h ou sinais de síndrome compartimental após reperfusão. Vigiar hipercalemia, mioglobinúria (LRA).' ] } ],
  rx: [ { h: 'Prescrição', li: [ ['Heparina não fracionada: bolus ', D(80, 'UI', { max: 10000, round: 100 }), ' IV + ', D(18, 'UI/h', { round: 10 }), '.'], 'Analgesia com opioide; membro pendente, proteger de calor/pressão; acionar cirurgia vascular.' ] } ],
  fontes: ['esvs2020ali'] });

/* ================= PÓS-OPERATÓRIO ================= */
C({ id: 'febrepo', cat: 'Pós-operatório', cor: 'amarelo', title: 'Febre e complicações pós-operatórias',
  alias: ['febre pos operatoria', '5 w', 'deiscencia', 'fistula anastomotica', 'evisceracao', 'ileo pos operatorio', 'isc', 'infeccao de sitio cirurgico', 'clavien'],
  resumo: 'Relacione o tempo de pós-operatório às causas mais prováveis. Taquicardia inexplicada após anastomose = fístula até prova em contrário.',
  secs: [
    { h: 'Febre por dia de pós-operatório ("5 W")', table: { head: ['Quando', 'Causas'], rows: [
      ['<24–48 h', 'Resposta inflamatória ao trauma cirúrgico (comum, benigna); **fasceíte necrosante por estreptococo/clostrídio** (rara, grave); aspiração; hipertermia maligna/transfusional'],
      ['Dias 1–3 (Wind)', 'Pneumonia/aspiração (atelectasia raramente causa febre)'],
      ['Dias 3–5 (Water)', 'ITU (sonda), flebite'],
      ['Dias 5–7 (Wound)', '**Infecção de sítio cirúrgico**, **fístula/deiscência de anastomose**, abscesso intracavitário'],
      ['>5–7 dias (Walking / Wonder drugs)', 'TVP/TEP; febre por drogas; colite por C. difficile; infecção de cateter']] } },
    { h: 'Fístula/deiscência de anastomose', li: [ 'Pico entre o **3º e 7º dia**: taquicardia, febre, dor, íleo prolongado, oligúria, saída entérica pelo dreno/ferida. **PCR <150 mg/L no 3º–5º dia** tem alto valor preditivo negativo.', 'TC com contraste (oral/retal). Conduta: ATB, drenagem percutânea se coleção localizada e estável; peritonite → reoperação (frequentemente estomia).' ] },
    { h: 'Fístula enterocutânea', li: [ 'Débito: baixo <200, moderado 200–500, **alto >500 mL/24 h**. Manejo **SNAPP**: Sepse (controlar), Nutrição (enteral/parenteral), Anatomia (fistulografia/TC), Proteção da pele (bolsa), Plano/Procedimento (cirurgia definitiva após 3–6 meses).', 'Fechamento espontâneo improvável — **FRIENDS**: corpo estranho, radiação, inflamação/Crohn, epitelização, neoplasia, obstrução distal, sepse/trajeto curto (<2 cm).', 'Octreotida reduz o débito, mas não aumenta o fechamento.' ] },
    { h: 'Evisceração e deiscência de ferida', li: [ 'Saída de líquido serossanguinolento pela ferida (5º–10º dia) precede a deiscência aponeurótica. Evisceração: cobrir com compressa úmida estéril, jejum, ATB, **centro cirúrgico**.' ] },
    { h: 'Íleo pós-operatório × obstrução precoce', li: [ 'Íleo: hipoperistaltismo difuso, 2–4 dias (cólon até 72 h); prevenir com ERAS (analgesia poupadora de opioide, mobilização, dieta precoce, evitar sobrecarga hídrica, chiclete). >5 dias ou retorno após melhora → TC (obstrução, abscesso, fístula).' ] },
    { h: 'Infecção de sítio cirúrgico (CDC) e Clavien-Dindo', li: [ 'ISC superficial (pele/subcutâneo), profunda (fáscia/músculo), órgão/espaço (abscesso). Superficial: **abrir e drenar a ferida**; ATB só se celulite extensa/sistêmico.', '**Clavien-Dindo**: I desvio sem tratamento específico; II medicamentos/transfusão/NPT; IIIa intervenção sem anestesia geral; IIIb com anestesia geral; IVa disfunção de 1 órgão (UTI); IVb múltiplos órgãos; V óbito.' ] } ],
  rx: [],
  fontes: ['sabiston21', 'cdc_ssi', 'clavien2004'] });

/* ================= PROCTOLOGIA ================= */
C({ id: 'procto', cat: 'Proctologia', cor: 'amarelo', title: 'Urgências proctológicas (hemorroida, fissura, abscesso, pilonidal)',
  alias: ['hemorroida', 'trombose hemorroidaria', 'fissura anal', 'abscesso perianal', 'fistula anal', 'pilonidal', 'goligher', 'diltiazem topico'],
  resumo: 'Trombose hemorroidária externa <72 h: excisão; fissura: tratamento tópico; abscesso: drenar sem esperar flutuação.',
  secs: [
    { h: 'Doença hemorroidária', li: [ 'Graus (Goligher): I sangra sem prolapso; II prolapsa e reduz sozinha; III redução manual; IV irredutível.', 'I–II: fibras, água, flavonoides, ligadura elástica. III–IV/mista: hemorroidectomia (ou THD/grampeador).', '**Trombose externa**: <72 h e dor intensa → **excisão** (não incisão simples) sob anestesia local; >72 h → conservador (dor já em melhora).', 'Trombose interna/prolapso estrangulado: analgesia, banhos, redução; cirurgia se necrose.' ] },
    { h: 'Fissura anal', li: [ 'Aguda (<6 semanas): fibras, laxante, banho de assento, analgésico tópico — cicatriza em ~50%.', 'Crônica: **diltiazem 2% pomada** ou **nitroglicerina 0,2–0,4%** 2×/dia por 6–8 semanas; falha → toxina botulínica ou **esfincterotomia lateral interna**.', 'Fissura fora da linha média (lateral) ou múltipla: investigar Crohn, IST, HIV, TB, neoplasia.' ] },
    { h: 'Abscesso e fístula anorretal', li: [ 'Drenar precocemente (não esperar flutuação); abscesso supraelevador/em ferradura: TC/RM e drenagem no centro cirúrgico.', 'ATB se celulite, diabetes, imunossupressão, sepse, valvopatia de risco.', 'Fístula: classificação de Parks (interesfincteriana, transesfincteriana, supraesfincteriana, extraesfincteriana); setton se envolve esfíncter.' ] },
    { h: 'Doença pilonidal', li: [ 'Abscesso: drenagem com incisão lateral à linha média. Crônica: técnicas mínimas ou retalhos (Karydakis/Limberg); depilação a laser reduz recidiva.' ] } ],
  rx: [ { h: 'Receitas', li: [ 'Fissura: **diltiazem 2% pomada** (manipulada) no ânus 2×/dia por 8 semanas + psyllium 5 g 1–2×/dia + banho de assento morno 3×/dia.', 'Hemorroida: dipirona 1 g 6/6h ± ibuprofeno 600 mg 8/8h; diosmina+hesperidina 1.000 mg 2×/dia por 4 dias e 1×/dia por 3 dias (crise); fibras; pomada com lidocaína.', 'Pós-drenagem de abscesso: banhos de assento, analgesia; ATB se indicado (amoxicilina-clavulanato 875/125 12/12h por 5–7 dias ou ciprofloxacino + metronidazol).' ] } ],
  fontes: ['ascrs_hem2024', 'ascrs_fissure2023', 'ascrs_abscess2022'] });

/* ================= UROLOGIA ================= */
C({ id: 'urouro', cat: 'Urologia', cor: 'laranja', title: 'Urgências urológicas (escroto agudo, retenção, priapismo, parafimose)',
  alias: ['escroto agudo', 'torcao testicular', 'twist', 'orquiepididimite', 'retencao urinaria', 'priapismo', 'fenilefrina', 'parafimose', 'hematuria', 'uretra', 'pielonefrite obstrutiva', 'duplo j', 'nefrostomia'],
  resumo: 'Torção testicular é emergência (<6 h); pielonefrite obstrutiva exige desobstrução urgente; priapismo isquêmico >4 h exige aspiração e fenilefrina intracavernosa.',
  secs: [
    { h: 'Escroto agudo', table: { head: ['', 'Torção', 'Orquiepididimite', 'Torção de apêndice'], rows: [
      ['Início', 'Súbito, intenso', 'Gradual', 'Súbito, menos intenso'], ['Idade', 'Neonato e adolescente', 'Adulto sexualmente ativo / idoso', '7–12 anos'],
      ['Exame', 'Testículo alto, horizontalizado; **reflexo cremastérico ausente**', 'Prehn + (alívio à elevação), febre, disúria', '"Blue dot", dor no polo superior'],
      ['Conduta', '**Exploração cirúrgica imediata** (TWIST ≥5 sem esperar Doppler)', 'ATB, anti-inflamatório, suspensório', 'Conservador']] } },
    { h: 'TWIST (aba Calculadoras)', li: [ 'Edema testicular 2, testículo endurecido 2, reflexo cremastérico ausente 1, náuseas/vômitos 1, testículo alto 1 → **0–2 baixo** (alta probabilidade de outra causa), **3–4 intermediário (Doppler)**, **≥5 alto (cirurgia)**.' ] },
    { h: 'Retenção urinária aguda', li: [ 'Sondagem vesical (Foley 16 Fr; falha → coudé ou cistostomia por punção — ver Beira-leito). Drenagem completa é segura (hematúria ex vacuo é rara). Vigiar **diurese pós-obstrutiva** (>200 mL/h).', 'Causas: HPB, fármacos (anticolinérgicos, opioides, descongestionantes), constipação, coágulos, estenose, neurogênica, **compressão medular** (exame neurológico!).', 'HPB: **tansulosina 0,4 mg/dia** e tentativa de retirada da sonda em 2–3 dias.' ] },
    { h: 'Pielonefrite obstrutiva / cálculo infectado', li: [ 'Febre + cálculo obstrutivo = **emergência urológica**: ATB + **desobstrução** (duplo J ou nefrostomia percutânea); tratamento definitivo do cálculo só depois.' ] },
    { h: 'Priapismo isquêmico (>4 h)', li: [ 'Gasometria do corpo cavernoso (escuro, hipóxico, acidótico) × não isquêmico (arterial, pós-trauma). Isquêmico: bloqueio peniano, **aspiração com agulha 16–19G** às 10 ou 2 h + irrigação com SF; falha → **fenilefrina intracavernosa 100–500 mcg/mL**: 1 mL a cada 3–5 min por até 1 h (monitorar PA/FC); falha → shunt cirúrgico.' ] },
    { h: 'Parafimose', li: [ 'Analgesia/bloqueio, compressão do edema (gelo, compressa, punturas), redução manual (polegares empurram a glande, dedos trazem o prepúcio); falha → incisão dorsal; postectomia eletiva.' ] },
    { h: 'Trauma de uretra e hematúria com coágulos', li: [ 'Sangue no meato, hematoma perineal, próstata alta → **não sondar**: uretrocistografia retrógrada; cistostomia.', 'Hematúria com retenção por coágulos: **SVD 3 vias 20–22 Fr**, lavagem manual e irrigação contínua com SF; avaliar anticoagulação; investigar (TC urografia/cistoscopia).' ] } ],
  rx: [ { h: 'Prescrições', li: [
    'Orquiepididimite <35 anos/IST: **ceftriaxona 500 mg IM dose única + doxiciclina 100 mg VO 12/12h por 10 dias**; >35 anos/entérica: **levofloxacino 500 mg/dia por 10 dias** (ou ciprofloxacino 500 mg 12/12h).',
    'Pielonefrite obstrutiva: **ceftriaxona 2 g IV/dia** (ou pipe-tazo se grave/hospitalar) + desobstrução.',
    'Retenção por HPB: **tansulosina 0,4 mg VO 1x/dia** à noite.',
    'Priapismo: **fenilefrina** — diluir 1 mL (10 mg/mL) em 49 mL de SF = 200 mcg/mL; injetar 0,5–1 mL (100–200 mcg) intracavernoso a cada 3–5 min (máx. ~1 mg/h).' ] } ],
  fontes: ['eau_ped_torsion', 'eau_uti2025', 'aua_priapism2022', 'eau_trauma'] });
