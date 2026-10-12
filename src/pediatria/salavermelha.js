// Sala Vermelha Pediátrica — portado do guia de plantão (set/2026), no padrão DoseCerta.
// Peso e idade vêm da barra do paciente. Escopo isolado para não colidir com nf/esc/QUICK do app.
const SV = (function(){
/* ===== helpers =====
 D(k, unidade, opções): dose por kg.
   opções: max (máx por dose), maxd (máx por dia), div (nº de doses/dia quando k é dose diária),
           c (concentração por mL da apresentação), cu (unidade do volume, padrão "mL"), min (mín por dose),
           dia:true (k é dose diária), vol:true (k já é volume em mL/kg)
*/
const D = (k, u, o = {}) => ({ t: "d", k, u, ...o });
const TOPICS = [];
const T = (o) => TOPICS.push(o);

/* ================= ABORDAGEM ================= */
T({ id: "abordagem", cat: "Abordagem inicial", title: "Primeiros 5 minutos: triagem, ABCDE e peso",
  cor: "vermelho", alias: ["triagem", "manchester", "abcde", "peso", "sinais vitais", "triangulo"],
  resumo: "Classifique, avalie pelo Triângulo de Avaliação Pediátrica, faça ABCDE, estime o peso e cheque glicemia.",
  secs: [
    { h: "Classificação de risco (Protocolo de Manchester)", li: [
      "**Vermelho — emergência:** atendimento imediato (sala vermelha).",
      "**Laranja — muito urgente:** até 10 min.",
      "**Amarelo — urgente:** até 60 min.",
      "**Verde — pouco urgente:** até 120 min. **Azul — não urgente:** até 240 min.",
      "Reclassifique sempre que a criança piorar enquanto espera." ] },
    { h: "Triângulo de Avaliação Pediátrica (olhar da porta, 30 s)", li: [
      "**Aparência (TICLS):** tônus, interação, consolabilidade, olhar, fala/choro.",
      "**Respiração:** ruídos (estridor, sibilo, gemência), tiragem, batimento de asa de nariz, posição.",
      "**Circulação da pele:** palidez, pele moteada, cianose.",
      "Aparência alterada = disfunção do SNC ou choque. Respiração alterada = desconforto/insuficiência respiratória. Pele alterada = choque." ] },
    { h: "ABCDE", li: [
      "**A** — via aérea pérvia? posicionar, aspirar, cânula; pensar em corpo estranho.",
      "**B** — FR, esforço, SpO₂ (alvo 94–98%), ausculta. O₂ se SpO₂ <94%.",
      "**C** — FC, pulsos centrais × periféricos, TEC (normal ≤2 s), PA, diurese. Acesso IV; se falhar em 90 s ou 2 tentativas → **intraósseo**.",
      "**D** — AVDI/Glasgow, pupilas, **glicemia capilar** (tratar se <60 mg/dL).",
      "**E** — despir, temperatura, pele (petéquias!), trauma." ] },
    { h: "Sinais vitais normais (aproximados)", table: {
      head: ["Idade", "FC (bpm)", "FR (irpm)", "PAS mínima (mmHg)"],
      rows: [["RN – 3 m", "100–180", "30–60", "60"], ["3 m – 1 a", "100–160", "30–50", "70"],
             ["1 – 3 a", "90–150", "24–40", "70 + 2×idade"], ["4 – 5 a", "80–140", "22–34", "70 + 2×idade"],
             ["6 – 10 a", "70–120", "18–30", "70 + 2×idade (até 90)"], ["> 10 a", "60–100", "12–20", "90"]] } },
    { h: "Peso estimado (APLS) — use o peso real sempre que possível", li: [
      "0–12 meses: **(0,5 × idade em meses) + 4**",
      "1–5 anos: **(2 × idade) + 8**",
      "6–12 anos: **(3 × idade) + 7**",
      "Fita de Broselow ou peso referido pela mãe também servem. Obeso: doses de emergência pelo peso ideal (exceto succinilcolina, que é pelo peso real)." ] },
    { h: "Material por idade", table: {
      head: ["", "Lactente", "1–3 a", "4–7 a", "8–12 a"],
      rows: [["Tubo com cuff (mm)", "3,0–3,5", "3,5–4,0", "4,5–5,0", "5,5–6,5"], ["Lâmina", "Reta 0–1", "Reta/curva 1–2", "Curva 2", "Curva 2–3"],
             ["Máscara laríngea", "1 – 1,5", "2", "2 – 2,5", "2,5 – 3"], ["Sonda de aspiração (Fr)", "6–8", "8–10", "10", "10–12"],
             ["Sonda vesical (Fr)", "5–8", "8", "8–10", "10–12"]] } },
  ],
  rx: [
    { h: "Hipoglicemia (glicemia <60 mg/dL)", li: [
      ["Glicose 10%: ", D(2, "mL", { vol: true, max: 250 }), " IV em bolus lento (0,2 g/kg). Refazer glicemia em 15 min; pode repetir até 5 mL/kg."],
      "Depois: manter soro com glicose (VIG 5–8 mg/kg/min) e investigar a causa.",
      ["Sem acesso: glucagon IM/SC ", D(0, "mg", { bands: [[25, 0.5], [1e9, 1]], c: 1 }), " (0,5 mg se <25 kg; 1 mg se ≥25 kg)."],
      "Consciente e deglutindo: 0,3 g/kg de açúcar VO (ex.: suco com açúcar)." ] },
  ],
  fontes: ["manchester", "pals2025", "apls"] });

/* ================= PCR ================= */
T({ id: "pcr", cat: "Ressuscitação", title: "Parada cardiorrespiratória (PALS 2025)", cor: "vermelho",
  alias: ["pcr", "parada", "rcp", "adrenalina", "desfibrilacao", "fv", "assistolia", "aesp"],
  resumo: "Compressões de qualidade + ventilação, adrenalina precoce nos ritmos não chocáveis, choque 2 → 4 J/kg nos chocáveis.",
  secs: [
    { h: "Reconhecer", li: [
      "Não responde + não respira (ou só gasping) + sem pulso em 10 s → **iniciar RCP**.",
      "**FC <60 bpm com má perfusão** apesar de oxigenação/ventilação adequadas → também iniciar compressões." ] },
    { h: "RCP de alta qualidade", li: [
      "Frequência **100–120/min**; profundidade **≥1/3 do diâmetro AP** (~4 cm no lactente, ~5 cm na criança, 5–6 cm no adolescente); retorno total do tórax; interrupções <10 s.",
      "Lactente: **2 polegares com mãos envolvendo o tórax** ou **região hipotenar de uma mão** (técnica de 2 dedos não é mais recomendada — AHA 2025).",
      "Sem via aérea avançada: **15:2** (2 socorristas) ou 30:2 (1 socorrista).",
      "Com via aérea avançada: compressões contínuas + **1 ventilação a cada 2–3 s (20–30/min)**.",
      "Trocar quem comprime a cada 2 min. Monitorar ETCO₂ se intubado (queda súbita / subida >40 = checar RCE)." ] },
    { h: "Ritmos", li: [
      "**Chocáveis (FV / TV sem pulso):** choque → 2 min de RCP → checar ritmo.",
      "**Não chocáveis (assistolia / AESP):** RCP + **adrenalina o mais cedo possível** → repetir a cada 3–5 min.",
      "Causas reversíveis (**6H e 5T**): hipóxia, hipovolemia, H⁺ (acidose), hipo/hipercalemia, hipotermia, hipoglicemia; tensão no tórax (pneumotórax), tamponamento, toxinas, trombose pulmonar, trombose coronária." ] },
    { h: "Pós-parada (RCE)", li: [
      "SpO₂ **94–99%** (evitar hiperóxia), PaCO₂ normal (35–45).",
      "PAS e PAM **acima do percentil 10** para a idade; adrenalina/noradrenalina se necessário.",
      "Controle de temperatura: evitar febre (manter ≤37,5 °C); tratar convulsões; glicemia normal; ECG, gasometria, eletrólitos." ] },
  ],
  rx: [
    { h: "Adrenalina (ampola 1 mg/mL)", li: [
      "Diluir **1 mL de adrenalina + 9 mL de SF 0,9%** = 0,1 mg/mL (1:10.000).",
      ["IV/IO: ", D(0.01, "mg", { max: 1, c: 0.1 }), " a cada 3–5 min, seguido de flush de 5 mL de SF."],
      ["Pelo tubo (sem acesso): ", D(0.1, "mg", { max: 2.5, c: 1 }), " da ampola pura (1 mg/mL), seguido de 5 mL de SF e 5 ventilações."] ] },
    { h: "Desfibrilação (FV/TV sem pulso)", li: [
      ["1º choque: ", D(2, "J", {}), " · 2º choque: ", D(4, "J", {}), " · seguintes: ≥4 J/kg, máx. 10 J/kg ou a dose de adulto."],
      "Pás infantis se <10 kg (ou <1 ano). DEA com atenuador em <8 anos; sem atenuador, usar mesmo assim." ] },
    { h: "Antiarrítmico (FV/TV refratária após o 2º–3º choque)", li: [
      ["Amiodarona (50 mg/mL): ", D(5, "mg", { max: 300, c: 50 }), " IV/IO em bolus — pode repetir até 3 doses (total 15 mg/kg)."],
      ["OU lidocaína 2% (20 mg/mL): ", D(1, "mg", { max: 100, c: 20 }), " IV/IO em bolus."] ] },
  ],
  fontes: ["pals2025"] });

/* ================= ARRITMIAS ================= */
T({ id: "arritmias", cat: "Ressuscitação", title: "Bradicardia e taquicardia com pulso", cor: "vermelho",
  alias: ["tsv", "taquicardia", "bradicardia", "adenosina", "cardioversao", "atropina"],
  resumo: "Instável = choque/alteração de consciência/hipotensão. Bradicardia com má perfusão → RCP + adrenalina. TSV estável → vagal e adenosina; instável → cardioversão.",
  secs: [
    { h: "Bradicardia", li: [
      "Causa mais comum em criança: **hipóxia** → primeiro oxigenar e ventilar.",
      "FC <60 com má perfusão apesar de O₂/ventilação → **compressões**.",
      "Atropina só se tônus vagal aumentado (ex.: laringoscopia) ou BAV primário." ] },
    { h: "Taquicardia de QRS estreito", li: [
      "**TSV:** FC geralmente >220 (lactente) ou >180 (criança), início e fim súbitos, sem variação com choro/febre, onda P ausente ou anormal.",
      "**Taquicardia sinusal:** FC variável, onda P normal, causa aparente (febre, dor, hipovolemia) — tratar a causa.",
      "QRS largo (>0,09 s) = tratar como **TV** até prova em contrário." ] },
    { h: "Manobras vagais (TSV estável)", li: [
      "Lactente: **saco de gelo com água gelada na face** por 15–20 s (sem ocluir nariz/boca).",
      "Criança maior: Valsalva modificada (soprar seringa de 10 mL por 15 s e deitar com pernas elevadas).",
      "Nunca comprimir globo ocular." ] },
  ],
  rx: [
    { h: "Bradicardia com má perfusão", li: [
      ["Adrenalina 0,1 mg/mL: ", D(0.01, "mg", { max: 1, c: 0.1 }), " IV/IO a cada 3–5 min."],
      ["Atropina (0,25 mg/mL — confira; há ampola de 0,5 mg/mL): ", D(0.02, "mg", { max: 0.5, c: 0.25 }), " IV/IO; pode repetir 1 vez."] ] },
    { h: "TSV", li: [
      ["Adenosina (3 mg/mL) 1ª dose: ", D(0.1, "mg", { max: 6, c: 3 }), " IV em **push rápido** na veia mais próxima do coração, seguido de flush imediato de 5–10 mL de SF (técnica das 2 seringas / torneira)."],
      ["2ª dose: ", D(0.2, "mg", { max: 12, c: 3 }), " se não reverter em 1–2 min."],
      ["Instável: cardioversão sincronizada ", D(0.5, "J", {}), " a 1 J/kg; se falhar, 2 J/kg. Sedação/analgesia se não atrasar (ex.: cetamina 1 mg/kg)."] ] },
    { h: "TV com pulso estável (com especialista)", li: [
      ["Amiodarona: ", D(5, "mg", { max: 300, c: 50 }), " IV **em 20–60 min** (diluída em SG 5%)."] ] },
  ],
  fontes: ["pals2025"] });

/* ================= IOT ================= */
T({ id: "iot", cat: "Ressuscitação", title: "Intubação: sequência rápida e sedação contínua", cor: "vermelho",
  alias: ["iot", "sri", "intubacao", "sequencia rapida", "sedacao", "cetamina", "rocuronio", "fentanil", "midazolam", "tubo"],
  resumo: "Prepare tudo (checklist), pré-oxigene, escolha indutor pelo cenário (cetamina no choque/asma), rocurônio 1–1,2 mg/kg, confirme com capnografia.",
  secs: [
    { h: "Indicações", li: [
      "Insuficiência respiratória que não melhora com O₂/CNAF/VNI; apneia; Glasgow ≤8 ou queda rápida; incapacidade de proteger via aérea; choque refratário; necessidade de transporte seguro." ] },
    { h: "Preparação (SOAP-ME)", li: [
      "**S**ucção pronta · **O**xigênio (pré-oxigenar 3 min com O₂ 100%; manter cateter nasal durante a laringoscopia) · **A**via aérea: tubo do tamanho calculado + 0,5 acima e abaixo, lâmina, fio-guia, máscara laríngea de resgate · **P**osição (coxim sob ombros no lactente) · **M**onitor (SpO₂, ECG, PA, capnografia) · **E**quipamento/drogas aspiradas e rotuladas.",
      "Choque: bolus de fluido e vasoativo **prontos antes** da indução." ] },
    { h: "Tubo e posição", li: [
      "Com cuff: **(idade ÷ 4) + 3,5**; sem cuff: **(idade ÷ 4) + 4**. RN a termo 3,0–3,5.",
      "Profundidade (lábio): **3 × diâmetro interno do tubo** (cm) ou (idade ÷ 2) + 12.",
      "Confirmar: **capnografia** (padrão ouro), expansão simétrica, ausculta, RX.",
      "Piora após IOT — **DOPE**: Deslocamento, Obstrução, Pneumotórax, Equipamento." ] },
    { h: "Ventilação inicial", li: [
      "Volume corrente 6–8 mL/kg (peso ideal), PEEP 5 cmH₂O, FR normal para a idade, FiO₂ para SpO₂ 92–97%, pressão de platô <28–30." ] },
  ],
  rx: [
    { h: "Pré-medicação (opcional)", li: [
      ["Atropina (0,25 mg/mL): ", D(0.02, "mg", { max: 0.5, c: 0.25 }), " IV — considerar em lactentes, bradicardia prévia ou uso de succinilcolina. Sem dose mínima."],
      ["Fentanil (50 mcg/mL): ", D(1, "mcg", { max: 100, c: 50 }), " a 2 mcg/kg IV **lento** (rápido causa tórax rígido) — útil na HIC; evitar no choque."] ] },
    { h: "Indutor (escolha um)", li: [
      ["**Cetamina** (50 mg/mL): ", D(1.5, "mg", { max: 150, c: 50 }), " IV (faixa 1–2 mg/kg) — **escolha no choque e na asma**. Se escetamina (S+), usar metade da dose."],
      ["Etomidato (2 mg/mL): ", D(0.3, "mg", { max: 20, c: 2 }), " IV — estável hemodinamicamente; **evitar na sepse**."],
      ["Midazolam (5 mg/mL): ", D(0.1, "mg", { max: 5, c: 5 }), " IV (0,1–0,2 mg/kg) — causa hipotensão."],
      ["Propofol (10 mg/mL): ", D(1.5, "mg", { max: 150, c: 10 }), " IV (1–2 mg/kg) — só se estável; hipotensão importante."] ] },
    { h: "Bloqueador neuromuscular", li: [
      ["**Rocurônio** (10 mg/mL): ", D(1.2, "mg", { max: 100, c: 10 }), " IV (1–1,2 mg/kg); age em 45–60 s. Reversão: sugamadex 16 mg/kg em emergência."],
      ["OU succinilcolina (100 mg em 10 mL = 10 mg/mL): ", D(2, "mg", { max: 150, c: 10 }), " IV (1–2 mg/kg; 2 mg/kg no lactente). Contraindicada: hipercalemia, queimadura/esmagamento >48 h, doença neuromuscular, história de hipertermia maligna."] ] },
    { h: "Sedação e analgesia contínuas após IOT (bomba de infusão)", li: [
      "**Fentanil** 1–4 mcg/kg/h — solução pura 50 mcg/mL (ou diluir 2 mL em 8 mL de SF = 10 mcg/mL para lactentes).",
      ["Velocidade para 2 mcg/kg/h com fentanil 50 mcg/mL: ", D(0.04, "mL/h", { vol: true, un: "mL/h" }), "."],
      "**Midazolam** 0,05–0,2 mg/kg/h — diluir 50 mg (10 mL de 5 mg/mL) em 40 mL de SF = 1 mg/mL.",
      ["Velocidade para 0,1 mg/kg/h com midazolam 1 mg/mL: ", D(0.1, "mL/h", { vol: true, un: "mL/h" }), "."],
      "Alternativa no broncoespasmo/choque: cetamina 0,5–2 mg/kg/h." ] },
  ],
  fontes: ["pals2025", "learnpicu"] });

/* ================= SEPSE ================= */
T({ id: "sepse", cat: "Ressuscitação", title: "Sepse e choque séptico (SSC pediátrico 2026)", cor: "vermelho",
  alias: ["sepse", "choque", "choque septico", "vasoativo", "noradrenalina", "fluido", "phoenix"],
  resumo: "ATB em até 1 h no choque (3 h na sepse sem choque), bolus de cristaloide balanceado 10–20 mL/kg com reavaliação, vasoativo precoce se não responde.",
  secs: [
    { h: "Suspeitar", li: [
      "Infecção + **taquicardia, taquipneia, TEC >2 s (ou enchimento em flash), pulsos finos ou amplos, pele moteada, alteração de consciência, oligúria**. Hipotensão é sinal **tardio** na criança.",
      "Petéquias/púrpura + febre = meningococcemia até prova em contrário.",
      "**Critérios de Phoenix (2024):** sepse = infecção com disfunção orgânica ameaçadora (≥2 pontos no escore de Phoenix); **choque séptico = sepse com ≥1 ponto cardiovascular** (hipotensão, lactato elevado ou vasoativo)." ] },
    { h: "Primeira hora", li: [
      "O₂, monitor, **2 acessos IV ou IO**, glicemia, **lactato**, gasometria, hemograma, PCR, eletrólitos, função renal, coagulação, **hemoculturas** (sem atrasar o ATB).",
      "**Antimicrobiano:** o mais rápido possível — ideal **≤1 h no choque séptico** e **≤3 h na sepse sem choque** (após avaliação).",
      "**Fluidos:** bolus de **10–20 mL/kg de cristaloide balanceado** (Ringer lactato/Plasma-Lyte; SF 0,9% se não houver ou se hiponatremia/HIC) em 5–20 min. Reavaliar após **cada** bolus.",
      "Com UTI disponível: até **40–60 mL/kg na 1ª hora**. Sem UTI: até 40 mL/kg no choque e **sem bolus** na sepse sem choque.",
      "**Parar** fluido se: hepatomegalia, estertores, piora do esforço respiratório ou choque resolvido." ] },
    { h: "Vasoativo", li: [
      "Se choque persiste após 40–60 mL/kg (ou antes, se sobrecarga): **adrenalina** ou **noradrenalina** — não esperar acesso central; pode iniciar **em veia periférica** diluída.",
      "Choque frio (extremidades frias, TEC lento) → adrenalina tende a ser melhor; choque quente (vasodilatado) → noradrenalina.",
      "Choque refratário a catecolaminas → **hidrocortisona**; considerar insuficiência adrenal." ] },
    { h: "Alvos", li: [
      "PAM ≥ percentil 5–50 para a idade, TEC ≤2 s, pulsos normais, diurese ≥1 mL/kg/h, melhora da consciência e do lactato.",
      "Glicemia 70–180; cálcio ionizado normal; Hb ≥7 g/dL se estável." ] },
  ],
  rx: [
    { h: "Fluidos", li: [
      ["Ringer lactato: ", D(20, "mL", { vol: true, max: 1000 }), " IV/IO em 5–20 min (ou 10 mL/kg se cardiopata/desnutrido). Reavaliar e repetir."] ] },
    { h: "Antibiótico empírico (comunidade, >1 mês)", li: [
      ["Ceftriaxona: ", D(100, "mg", { dia: true, maxd: 4000, div: 1 }), " IV 1x/dia (ou dividir 12/12h)."],
      ["+ Vancomicina se suspeita de S. aureus/MRSA, cateter, pele/partes moles, meningite: ", D(15, "mg", { max: 750 }), " IV 6/6h, correr em 1–2 h."],
      "< 1 mês: ampicilina + cefotaxima (ou gentamicina) — ver 'Lactente febril'. Foco abdominal: + metronidazol. Imunossuprimido/neutropênico: cefepima (± vanco)." ] },
    { h: "Drogas vasoativas (bomba) — regra prática", li: [
      ["**Adrenalina** 0,05–0,3 mcg/kg/min (até 1): diluir ", D(0.3, "mg", { vol: false, c: 1 }), " (peso × 0,3 mg) em SF até 50 mL → **1 mL/h = 0,1 mcg/kg/min**."],
      ["**Noradrenalina** 0,05–0,3 mcg/kg/min (até 1–2): mesma regra — ", D(0.3, "mg", { c: 1 }), " em 50 mL → 1 mL/h = 0,1 mcg/kg/min."],
      ["**Dobutamina** 5–10 mcg/kg/min (disfunção miocárdica): ", D(3, "mg", { c: 12.5 }), " (peso × 3 mg) em 50 mL → **1 mL/h = 1 mcg/kg/min**."],
      "Periférico: usar concentrações mais baixas (dobrar o volume da diluição) e acesso calibroso; vigiar extravasamento." ] },
    { h: "Choque refratário a catecolamina", li: [
      ["Hidrocortisona (100 mg/frasco): ", D(2, "mg", { max: 100 }), " IV em bolus, depois 1 mg/kg (máx. 50 mg) 6/6h."] ] },
  ],
  fontes: ["ssc2026", "phoenix"] });

/* ================= ANAFILAXIA ================= */
T({ id: "anafilaxia", cat: "Ressuscitação", title: "Anafilaxia", cor: "vermelho",
  alias: ["anafilaxia", "alergia", "choque anafilatico", "adrenalina im", "urticaria", "edema de glote"],
  resumo: "Adrenalina IM na coxa é o tratamento — sem atraso e repetindo a cada 5–15 min. Anti-histamínico e corticoide são adjuvantes.",
  secs: [
    { h: "Diagnóstico (critérios WAO)", li: [
      "Início agudo (minutos a horas) com **pele/mucosa** (urticária, prurido, angioedema) **+** comprometimento **respiratório** OU **hipotensão/má perfusão** OU sintomas **GI graves**; ou",
      "**Hipotensão, broncoespasmo ou edema laríngeo** logo após exposição a alérgeno provável, mesmo **sem** lesão de pele.",
      "Gatilhos mais comuns em criança: alimentos (leite, ovo, amendoim, castanhas, frutos do mar), medicamentos, insetos." ] },
    { h: "Manejo", li: [
      "Remover o gatilho. **Adrenalina IM imediatamente** (vasto lateral da coxa). Repetir a cada 5–15 min se necessário.",
      "Posição: deitado com pernas elevadas (sentado se dispneia; decúbito lateral se vômitos). **Não levantar bruscamente.**",
      "O₂, monitor, acesso IV, **expansão volêmica** se hipotensão/má perfusão.",
      "Broncoespasmo persistente: salbutamol. Estridor: adrenalina nebulizada.",
      "Refratário a 2–3 doses IM + fluido: **adrenalina em infusão contínua** (UTI).",
      "Observar **6–8 h** (casos leves) e **12–24 h** (graves, necessidade de >1 dose ou asma) — reação bifásica." ] },
  ],
  rx: [
    { h: "Prescrição", li: [
      ["**Adrenalina 1 mg/mL (1:1000) IM** na face anterolateral da coxa: ", D(0.01, "mg", { max: 0.5, amax: { age: 12, below: 0.3 }, c: 1 }), " (máx. 0,3 mg em <12 anos; 0,5 mg em adolescentes). Repetir a cada 5–15 min."],
      ["SF 0,9% ou Ringer: ", D(20, "mL", { vol: true, max: 1000 }), " IV rápido se hipotensão/má perfusão; repetir conforme resposta."],
      ["Adrenalina em infusão (refratária): 0,1–1 mcg/kg/min — diluir ", D(0.3, "mg", { c: 1 }), " (peso × 0,3 mg) em SF até 50 mL → 1 mL/h = 0,1 mcg/kg/min."],
      ["Adjuvante — difenidramina (50 mg/mL): ", D(1, "mg", { max: 50, c: 50 }), " IV lento (evitar prometazina em <2 anos)."],
      ["Adjuvante — metilprednisolona: ", D(1, "mg", { max: 60 }), " IV (não trata a crise; pode reduzir sintomas prolongados)."],
      ["Broncoespasmo: salbutamol spray 100 mcg com espaçador — ", "4–10 jatos", " a cada 20 min."] ] },
    { h: "Alta", li: [
      "Anti-histamínico oral por 3–5 dias se urticária; plano escrito de ação; **prescrever/orientar adrenalina autoinjetável** (0,15 mg se 10–25 kg; 0,3 mg se ≥25 kg); encaminhar ao alergista." ] },
  ],
  fontes: ["sbpanafilaxia", "wao"] });

/* ================= RESPIRATÓRIO ================= */
T({ id: "ivas", cat: "Respiratório", title: "IVAS: resfriado, gripe, faringoamigdalite, OMA e sinusite", cor: "verde",
  alias: ["ivas", "resfriado", "gripe", "influenza", "faringite", "amigdalite", "otite", "oma", "sinusite", "rinossinusite", "oseltamivir"],
  resumo: "A maioria é viral: sintomáticos e sinais de alerta. Antibiótico só na faringite estreptocócica, OMA com critério e sinusite bacteriana.",
  secs: [
    { h: "Resfriado comum", li: [
      "Coriza, obstrução nasal, espirros, tosse, febre baixa nos 3 primeiros dias; dura 7–10 dias (tosse até 3 semanas).",
      "Tratamento: lavagem nasal com SF, hidratação, antitérmico. Mel para tosse em **>1 ano**.",
      "**Não usar** descongestionantes, antitussígenos, anti-histamínicos ou mucolíticos em <6 anos." ] },
    { h: "Gripe (influenza)", li: [
      "Início súbito: febre alta, mialgia, cefaleia, tosse, dor de garganta. Lactente: febre sem foco, sonolência.",
      "**Oseltamivir** para: SRAG (qualquer idade) e síndrome gripal em grupo de risco — **<5 anos**, doença crônica, imunossupressão, obesidade, uso crônico de AAS, gestante. Iniciar idealmente em até 48 h (mas não negar depois disso se grave).",
      "Alerta: dispneia, SpO₂ <95%, piora após melhora (pneumonia bacteriana secundária), desidratação, sonolência." ] },
    { h: "Faringoamigdalite", li: [
      "**Viral** (a maioria; <3 anos quase sempre): coriza, tosse, rouquidão, conjuntivite, aftas, diarreia.",
      "**Estreptocócica** (pico 5–15 anos): início súbito, febre, dor forte, exsudato, petéquias no palato, linfonodo cervical anterior doloroso, **sem** coriza/tosse; escarlatina (rash áspero, língua em framboesa).",
      "Confirmar com **teste rápido/cultura** quando disponível. Tratar para prevenir febre reumática (até 9 dias do início).",
      "Complicações: abscesso periamigdaliano (trismo, voz de 'batata quente', úvula desviada) ou retrofaríngeo (rigidez cervical, disfagia) → TC e ORL." ] },
    { h: "Otite média aguda (OMA)", li: [
      "Diagnóstico = **abaulamento** da membrana timpânica (moderado/grave) ou otorreia recente; ou abaulamento leve + otalgia <48 h ou hiperemia intensa. **Hiperemia isolada não é OMA.**",
      "**Antibiótico:** <6 meses; 6–23 m bilateral; qualquer idade com otorreia ou quadro grave (febre ≥39 °C, otalgia intensa, >48 h).",
      "**Observação 48–72 h** (com retorno garantido): ≥6 m unilateral não grave; ≥2 anos bilateral não grave. Analgesia sempre.",
      "Amoxicilina-clavulanato se: amoxicilina nos últimos 30 dias, conjuntivite purulenta associada, falha terapêutica." ] },
    { h: "Rinossinusite bacteriana aguda", li: [
      "Suspeitar se: sintomas **>10 dias** sem melhora; **piora após melhora** inicial; ou início **grave** (febre ≥39 °C + secreção purulenta ≥3 dias).",
      "Diagnóstico clínico — **não pedir RX de seios**. TC só se complicação (edema/celulite orbitária, sinais neurológicos)." ] },
  ],
  rx: [
    { h: "Sintomáticos", li: [
      ["Paracetamol 200 mg/mL (gotas): ", D(15, "mg", { max: 750, c: 200, gt: 20 }), " VO até 6/6h se dor ou febre."],
      ["Dipirona 500 mg/mL (gotas): ", D(20, "mg", { max: 1000, c: 500, gt: 20 }), " VO até 6/6h (evitar em <3 meses/<5 kg)."],
      ["Ibuprofeno 50 mg/mL: ", D(10, "mg", { max: 400, c: 50 }), " VO 8/8h (>6 meses; evitar se desidratação, dengue ou varicela)."],
      "Soro fisiológico 0,9% nasal: 1–2 mL em cada narina várias vezes ao dia." ] },
    { h: "Influenza — oseltamivir 12/12h por 5 dias", li: [
      ["Oseltamivir: ", D(3, "mg", { bands: [[15, 30], [23, 45], [40, 60], [1e9, 75]], infantK: 3 }), " VO 12/12h (≤15 kg 30 mg · 15–23 kg 45 mg · 23–40 kg 60 mg · >40 kg 75 mg · <1 ano 3 mg/kg)."] ] },
    { h: "Faringoamigdalite estreptocócica", li: [
      ["Amoxicilina 250 mg/5 mL: ", D(50, "mg", { dia: true, maxd: 1000, div: 2, c: 50 }), " VO 12/12h por **10 dias** (ou dose diária única, máx. 1 g)."],
      ["OU penicilina G benzatina IM dose única: ", D(0, "UI", { bands: [[26.99, 600000], [1e9, 1200000]] }), " (<27 kg 600.000 UI; ≥27 kg 1.200.000 UI)."],
      ["Alergia não grave: cefalexina 250 mg/5 mL ", D(20, "mg", { max: 500, c: 50 }), " VO 12/12h por 10 dias."],
      ["Alergia grave (anafilaxia): azitromicina 200 mg/5 mL ", D(12, "mg", { max: 500, c: 40 }), " VO 1x/dia por 5 dias."] ] },
    { h: "OMA", li: [
      ["Amoxicilina 400 mg/5 mL: ", D(90, "mg", { dia: true, maxd: 4000, div: 2, c: 80 }), " VO 12/12h (80–90 mg/kg/dia) — **10 dias** se <2 anos ou grave; 7 dias se 2–5 anos; 5–7 dias se ≥6 anos."],
      ["Amoxicilina + clavulanato (400 + 57 mg/5 mL): ", D(90, "mg", { dia: true, maxd: 4000, div: 2, c: 80 }), " (de amoxicilina) VO 12/12h, mesma duração."],
      ["Alergia não grave: cefuroxima 250 mg/5 mL ", D(30, "mg", { dia: true, maxd: 1000, div: 2, c: 50 }), " VO 12/12h."] ] },
    { h: "Sinusite bacteriana", li: [
      ["Amoxicilina 400 mg/5 mL: ", D(90, "mg", { dia: true, maxd: 4000, div: 2, c: 80 }), " VO 12/12h por 10 dias (45 mg/kg/dia se sem fator de risco; clavulanato se <2 anos, creche ou ATB recente)."] ] },
  ],
  fontes: ["msinfluenza", "einsteinoma", "sbpfaringite"] });

T({ id: "crupe", cat: "Respiratório", title: "Laringotraqueobronquite (crupe)", cor: "laranja",
  alias: ["crupe", "laringite", "estridor", "tosse ladrante", "dexametasona"],
  resumo: "Tosse ladrante + estridor em 6 m–3 a. Dexametasona para todos; adrenalina nebulizada se estridor em repouso.",
  secs: [
    { h: "Quadro clínico", li: [
      "Pródromo de coriza 1–2 dias → **tosse 'de cachorro'**, **rouquidão**, **estridor inspiratório**, piora à noite e com choro. Pico 6 m–3 anos, outono/inverno (parainfluenza).",
      "Diagnóstico clínico. **Não examinar orofaringe à força nem pedir RX** de rotina; manter a criança calma no colo." ] },
    { h: "Gravidade (Alberta)", li: [
      "**Leve:** estridor só ao chorar/agitar, sem tiragem em repouso.",
      "**Moderada:** estridor em repouso + tiragem leve/moderada, sem agitação.",
      "**Grave:** estridor em repouso (às vezes bifásico), tiragem importante, agitação.",
      "**Insuficiência respiratória iminente:** letargia, cianose, SpO₂ <92%, estridor que 'diminui' com esforço ruim." ] },
    { h: "Diagnósticos diferenciais — pensar se atípico", li: [
      "**Epiglotite:** febre alta, toxemia, **salivação, disfagia, posição do tripé**, sem tosse ladrante → não manipular, via aérea em centro cirúrgico.",
      "**Traqueíte bacteriana:** febre alta, toxemia, sem resposta à adrenalina.",
      "**Corpo estranho**, anafilaxia, abscesso retrofaríngeo." ] },
    { h: "Conduta", li: [
      "Todos: **dexametasona** (dose única; VO se tolera).",
      "Moderada/grave: **adrenalina nebulizada**; observar **2–4 h** após (efeito rebote).",
      "O₂ se SpO₂ <92%. Internar se: >2 nebulizações de adrenalina, estridor em repouso 4 h após corticoide, <6 meses, desidratação, retorno em 24 h." ] },
  ],
  rx: [
    { h: "Prescrição", li: [
      ["Dexametasona (4 mg/mL IV/IM, ou VO): ", D(0.6, "mg", { max: 10, c: 4 }), " dose única (0,15 mg/kg é suficiente no leve)."],
      ["Adrenalina 1 mg/mL **pura** nebulizada: ", D(0.5, "mL", { vol: true, max: 5 }), " (máx. 5 mL) com O₂ 6–8 L/min; pode repetir a cada 20 min nos graves."],
      "Alta: sintomáticos, umidificação não é necessária, retorno se estridor em repouso, tiragem ou sonolência." ] },
  ],
  fontes: ["alberta"] });

T({ id: "bronquiolite", cat: "Respiratório", title: "Bronquiolite viral aguda", cor: "laranja",
  alias: ["bronquiolite", "vsr", "sibilancia lactente", "alto fluxo", "cnaf"],
  resumo: "Lactente <2 anos, primeiro episódio de sibilância após coriza. Tratamento é suporte: aspirar, oxigenar, hidratar.",
  secs: [
    { h: "Quadro clínico", li: [
      "**<2 anos** (pico <6 m), pródromo de coriza 2–3 dias → tosse, taquipneia, tiragem, **sibilos e/ou crepitações** difusos. Pior entre o **3º e 5º dia**; melhora em 2–3 semanas.",
      "Principal agente: **VSR**. Apneia pode ser o 1º sinal em prematuros e <2 meses." ] },
    { h: "Diagnóstico", li: [
      "Clínico. **Não pedir** RX, hemograma ou gasometria de rotina — só se grave, dúvida diagnóstica ou piora atípica.",
      "Painel viral útil para isolamento e em lactente febril <60 dias." ] },
    { h: "Fatores de risco / internar se", li: [
      "<3 meses, prematuro (<35 sem) com <6 m, cardiopatia, pneumopatia crônica, imunodeficiência, doença neuromuscular.",
      "Apneia, SpO₂ persistente <90–92%, desconforto moderado/grave, FR >60–70, recusa alimentar/ingesta <50%, desidratação, cuidado domiciliar inseguro." ] },
    { h: "Tratamento — o que FAZER", li: [
      "**Aspiração/lavagem nasal** com SF antes das mamadas.",
      "**O₂** se SpO₂ <90–92% (manter 92–96%). **Cateter nasal de alto fluxo (CNAF)** se desconforto moderado/grave ou falha do O₂ convencional: 1–2 L/kg/min, FiO₂ para SpO₂ alvo.",
      "Hidratação: fracionar dieta; **sonda nasogástrica** ou soro **isotônico** se não consegue mamar (restringir a 2/3 da manutenção se internado grave).",
      "Piora com CNAF → CPAP/VNI → IOT." ] },
    { h: "O que NÃO fazer (rotina)", li: [
      "Broncodilatador, adrenalina, **corticoide**, antibiótico (salvo infecção bacteriana), fisioterapia respiratória, **salina hipertônica** no PS (evidência fraca; pode ser tentada em internados)." ] },
  ],
  rx: [
    { h: "Prescrição (internação)", li: [
      "Dieta fracionada, cabeceira elevada 30°, aspiração nasal com SF 0,9% antes das mamadas e SOS.",
      "O₂ por cateter nasal/máscara se SpO₂ <92%, alvo 92–96%.",
      ["CNAF: fluxo ", D(2, "L/min", { vol: true, un: "L/min", max: 50 }), " (1–2 L/kg/min) se desconforto moderado/grave."],
      ["Se não mama: soro isotônico em ", D(4, "mL/h", { holliday: true }), " (manutenção de Holliday-Segar; considerar 2/3 dela) ou dieta por SNG."],
      "Monitorização de SpO₂ contínua se O₂; FR, esforço e diurese." ] },
  ],
  fontes: ["aapbronq", "sbpbronq"] });

T({ id: "asma", cat: "Respiratório", title: "Crise de asma", cor: "laranja",
  alias: ["asma", "broncoespasmo", "sibilancia", "salbutamol", "ipratropio", "sulfato de magnesio", "crise asmatica"],
  resumo: "Salbutamol a cada 20 min na 1ª hora, corticoide sistêmico em até 1 h, ipratrópio nos moderados/graves, sulfato de magnésio se não responde.",
  secs: [
    { h: "Classificação da crise", table: {
      head: ["", "Leve/moderada", "Grave", "Risco de morte"],
      rows: [["Fala", "Frases", "Palavras", "Não fala"], ["Consciência", "Normal/agitado", "Agitado", "Sonolento, confuso"],
             ["Musculatura acessória", "Não/leve", "Sim, importante", "Respiração paradoxal"], ["SpO₂ (ar ambiente)", "≥92%", "<92%", "<90%"],
             ["Ausculta", "Sibilos", "Sibilos ± MV reduzido", "Tórax silencioso"], ["FC", "Normal/aumentada", ">180 (0–3 a) / >150 (4–5 a) / >120 (>5 a)", "Bradicardia"]] } },
    { h: "Conduta", li: [
      "O₂ para SpO₂ **94–98%**. Sentado, ambiente calmo.",
      "**Salbutamol spray com espaçador** (preferido) ou nebulização a cada **20 min por 1 hora**.",
      "**Corticoide sistêmico na 1ª hora** (VO se consegue engolir).",
      "**Ipratrópio** junto do salbutamol nas crises moderadas/graves (1ª hora).",
      "Sem resposta após 1 h ou grave: **sulfato de magnésio IV**; considerar UTI, salbutamol/terbutalina IV, VNI.",
      "IOT só se falência (preferir **cetamina**); ventilação com FR baixa e tempo expiratório longo.",
      "**Não usar** de rotina: aminofilina, antibiótico, RX (só se suspeita de pneumotórax/pneumonia)." ] },
    { h: "Alta (após ≥1 h estável com salbutamol a cada 3–4 h, SpO₂ ≥94%)", li: [
      "Corticoide oral 3–5 dias, salbutamol 4/4h por 24–48 h e depois SOS, técnica do espaçador revisada, iniciar/ajustar **corticoide inalatório**, plano de ação escrito, retorno em até 7 dias." ] },
  ],
  rx: [
    { h: "Broncodilatador", li: [
      "**Salbutamol spray 100 mcg/jato com espaçador:** <6 anos 4–6 jatos; ≥6 anos 4–10 jatos — a cada 20 min por 3 vezes; depois de 1/1h a 4/4h conforme resposta.",
      ["OU salbutamol nebulização (5 mg/mL; 1 mL = 20 gotas): ", D(0.15, "mg", { min: 2.5, max: 5, c: 5, gt: 20 }), " + SF 0,9% até 4 mL, com O₂ 6–8 L/min, a cada 20 min por 3 vezes."],
      "**Brometo de ipratrópio** nas crises moderadas/graves, junto do salbutamol a cada 20 min por 3 vezes: nebulização 0,25 mg/mL — **<6 anos 20 gotas (250 mcg); ≥6 anos 40 gotas (500 mcg)**; ou spray 20 mcg/jato — 4 jatos (<6 a) / 8 jatos (≥6 a)." ] },
    { h: "Corticoide", li: [
      ["Prednisolona 3 mg/mL: ", D(1, "mg", { max: 40, c: 3 }), " VO 1x/dia (1–2 mg/kg; máx. 40 mg) por 3–5 dias."],
      ["OU dexametasona: ", D(0.6, "mg", { max: 16, c: 4 }), " VO/IM/IV dose única (pode repetir no dia seguinte)."],
      ["Sem VO: metilprednisolona ", D(1, "mg", { max: 60 }), " IV 6/6h a 12/12h (ataque até 2 mg/kg, máx. 60 mg)."] ] },
    { h: "Crise grave sem resposta", li: [
      ["Sulfato de magnésio 50% (500 mg/mL): ", D(50, "mg", { max: 2000, c: 500 }), " IV (25–50 mg/kg; máx. 2 g), diluído em 20–50 mL de SF 0,9%, correr em 20 min. Monitorar PA."] ] },
  ],
  fontes: ["gina2025", "asthmahandbook"] });

T({ id: "pneumonia", cat: "Respiratório", title: "Pneumonia adquirida na comunidade", cor: "amarelo",
  alias: ["pneumonia", "pac", "broncopneumonia", "amoxicilina", "penicilina cristalina", "derrame pleural"],
  resumo: "Febre + tosse + taquipneia. Amoxicilina VO é a escolha no ambulatório; penicilina cristalina ou ampicilina na internação.",
  secs: [
    { h: "Quadro clínico", li: [
      "Febre, tosse, **taquipneia** (melhor sinal isolado), tiragem, crepitações, MV diminuído localizado; dor abdominal em pneumonia de base.",
      "**Taquipneia (OMS):** <2 m ≥60 · 2–11 m ≥50 · 1–4 a ≥40 · ≥5 a >30 irpm.",
      "Sibilância difusa em <5 anos sugere etiologia viral; em escolar, pensar em Mycoplasma (tosse arrastada, cefaleia)." ] },
    { h: "Diagnóstico", li: [
      "Clínico. **RX não é necessário** no caso leve ambulatorial; pedir se internação, grave, dúvida, suspeita de derrame ou falha terapêutica.",
      "Internados: hemograma, PCR, hemocultura; USG de tórax se derrame (toracocentese se significativo)." ] },
    { h: "Internar se", li: [
      "<2–3 meses; SpO₂ <92%; tiragem subcostal importante, gemência, BAN, FR >70 (lactente) / >50 (criança); toxemia; não aceita VO/desidratação; complicações (derrame, necrose, abscesso); doença de base; falha em 48–72 h de VO." ] },
  ],
  rx: [
    { h: "Ambulatorial", li: [
      ["Amoxicilina 400 mg/5 mL: ", D(50, "mg", { dia: true, maxd: 4000, div: 2, c: 80 }), " VO 12/12h (ou 8/8h) por 5–7 dias. Reavaliar em 48–72 h."],
      ["Suspeita de atípico (≥5 anos): azitromicina 200 mg/5 mL ", D(10, "mg", { max: 500, c: 40 }), " VO 1x/dia por 5 dias."] ] },
    { h: "Internação (enfermaria)", li: [
      ["Penicilina G cristalina: ", D(200000, "UI", { dia: true, maxd: 24000000, div: 4 }), " IV 6/6h (150.000–200.000 UI/kg/dia)."],
      ["OU ampicilina: ", D(50, "mg", { max: 2000 }), " IV 6/6h."],
      "< 2 meses: ampicilina + gentamicina (ver 'Lactente febril')." ] },
    { h: "Grave / complicada / UTI", li: [
      ["Ceftriaxona: ", D(100, "mg", { dia: true, maxd: 4000, div: 2 }), " IV 12/12h (50–100 mg/kg/dia)."],
      ["+ Oxacilina se suspeita de S. aureus (pneumatocele, empiema, pós-varicela/influenza): ", D(50, "mg", { max: 2000 }), " IV 6/6h (200 mg/kg/dia)."],
      ["(MRSA/alergia: clindamicina ", D(10, "mg", { max: 600 }), " IV 6/6h a 8/8h, ou vancomicina 15 mg/kg 6/6h.)"] ] },
  ],
  fontes: ["sbppac"] });

/* ================= HIDRATAÇÃO ================= */
T({ id: "diarreia", cat: "Hidratação e GI", title: "Diarreia aguda e desidratação (Planos A, B e C)", cor: "amarelo",
  alias: ["diarreia", "gastroenterite", "desidratacao", "vomito", "plano a", "plano b", "plano c", "sro", "ondansetrona", "zinco"],
  resumo: "Avalie a hidratação e escolha o plano do MS. Ondansetrona se vômitos atrapalham a TRO. Antibiótico só em disenteria com comprometimento ou cólera.",
  secs: [
    { h: "Avaliar a hidratação (MS)", table: {
      head: ["", "Hidratado (A)", "Algum grau (B) — 2 ou mais sinais", "Grave (C) — 2 ou mais sinais"],
      rows: [["Estado geral", "Alerta", "Irritado, intranquilo", "Comatoso, hipotônico, letárgico"], ["Olhos", "Normais", "Fundos", "Muito fundos"],
             ["Lágrimas", "Presentes", "Ausentes", "Ausentes"], ["Sede", "Bebe normal", "Sedento, bebe rápido", "Bebe mal ou não bebe"],
             ["Sinal da prega", "Desaparece rápido", "Desaparece lento", "Muito lento (>2 s)"], ["Pulso", "Cheio", "Rápido, débil", "Muito débil/ausente"],
             ["Enchimento capilar", "≤2 s", "3–5 s", ">5 s"]] } },
    { h: "Conduta", li: [
      "**Plano A** (casa): SRO após cada evacuação, manter alimentação e aleitamento, **zinco**, sinais de alerta.",
      "**Plano B** (na unidade): **SRO 50–100 mL/kg em 4–6 h**, em pequenas quantidades; reavaliar. Hidratou → Plano A.",
      "**Plano C** (grave): **hidratação venosa imediata** (fase rápida) e reavaliar a cada 15–30 min.",
      "Vômitos atrapalhando a TRO: **ondansetrona** (>6 meses) e tentar de novo em 15–30 min; SNG (gastróclise 20–30 mL/kg/h) é alternativa.",
      "**Antibiótico:** só disenteria (sangue nas fezes) com comprometimento do estado geral, cólera grave ou imunossuprimido. Não usar antidiarreicos (loperamida)." ] },
  ],
  rx: [
    { h: "Plano A / B", li: [
      "SRO após cada evacuação: **<1 ano 50–100 mL · 1–10 anos 100–200 mL · >10 anos à vontade**.",
      ["Plano B: SRO ", D(75, "mL", { vol: true }), " (50–100 mL/kg) em 4–6 h na unidade."],
      ["Zinco: ", D(0, "mg", { ageBands: [[0.5, 10], [99, 20]] }), " VO 1x/dia por 10–14 dias (<6 meses 10 mg; ≥6 meses 20 mg)."],
      ["Ondansetrona (VO/IV, >6 m): ", D(0.15, "mg", { max: 4, c: 2 }), " (ampola 2 mg/mL; ou comprimido orodispersível 4 mg) dose única."] ] },
    { h: "Plano C — fase rápida", li: [
      ["**<5 anos:** SF 0,9% ", D(20, "mL", { vol: true, max: 1000 }), " em 30 min — repetir até hidratar (RN e cardiopatas: 10 mL/kg)."],
      ["**≥5 anos:** SF 0,9% ", D(30, "mL", { vol: true, max: 1000 }), " em 30 min, depois Ringer lactato ", D(70, "mL", { vol: true, max: 2500 }), " em 2 h 30 min."] ] },
    { h: "Plano C — manutenção + reposição (após hidratar)", li: [
      ["Manutenção (Holliday-Segar): ", D(4, "mL/h", { holliday: true }), " de SG 5% + SF 0,9% (4:1) — ou solução isotônica."],
      ["Reposição: ", D(50, "mL", { vol: true }), " /dia de SG 5% + SF 0,9% (1:1), ajustando às perdas."],
      "KCl 10%: 2 mL para cada 100 mL de soro (após diurese). Reavaliar em 2–4 h; iniciar SRO/dieta assim que possível." ] },
    { h: "Disenteria com comprometimento", li: [
      ["Ciprofloxacino (suspensão 250 mg/5 mL): ", D(15, "mg", { max: 500, c: 50 }), " VO 12/12h por 3 dias."] ] },
  ],
  fontes: ["msdiarreia", "sbpdiarreia"] });

T({ id: "hv", cat: "Hidratação e GI", title: "Hidratação venosa de manutenção", cor: "azul",
  alias: ["hidratacao venosa", "soro de manutencao", "holliday", "hv", "isotonico", "vig"],
  resumo: "Holliday-Segar para o volume; solução isotônica com glicose e potássio para quase todos (AAP 2018).",
  secs: [
    { h: "Volume (Holliday-Segar)", li: [
      "Até 10 kg: **100 mL/kg/dia** · 10–20 kg: **1.000 mL + 50 mL/kg acima de 10** · >20 kg: **1.500 mL + 20 mL/kg acima de 20** (máx. ~2.400 mL/dia).",
      "Atalho por hora (4-2-1): 4 mL/kg/h nos 1ºs 10 kg + 2 mL/kg/h nos próximos 10 + 1 mL/kg/h acima de 20.",
      "Restringir (2/3) se: bronquiolite/pneumonia grave, meningite, TCE, pós-operatório, SIADH." ] },
    { h: "Solução", li: [
      "**Isotônica** (Na 130–154 mEq/L) + **glicose 5%** + **K 20 mEq/L** para crianças de 28 dias a 18 anos — reduz hiponatremia hospitalar.",
      "Exceções (discutir): RN, insuficiência renal/cardíaca, hepatopatia, hipernatremia, diabetes insípido.",
      "Checar eletrólitos e glicemia diariamente enquanto em soro." ] },
  ],
  rx: [
    { h: "Prescrição", li: [
      ["Volume de manutenção: ", D(0, "mL/dia", { hollidayDay: true }), " → velocidade ", D(4, "mL/h", { holliday: true }), "."],
      "Receita de solução isotônica (≈ Na 139, glicose 4,5%, K 23 mEq/L): **SF 0,9% 500 mL + Glicose 50% 50 mL + KCl 19,1% 5 mL**.",
      "Alternativa pronta: solução balanceada (Plasma-Lyte/Ringer) com glicose 5% + KCl conforme protocolo do serviço.",
      "Concentração máxima em veia periférica: glicose 12,5%; potássio 40–60 mEq/L." ] },
  ],
  fontes: ["aapfluids"] });

/* ================= NEURO ================= */
T({ id: "convulsao", cat: "Neurológico", title: "Crise convulsiva e estado de mal epiléptico", cor: "vermelho",
  alias: ["convulsao", "crise", "estado de mal", "epilepsia", "midazolam", "diazepam", "fenitoina", "levetiracetam", "fenobarbital", "convulsao febril"],
  resumo: "Crise >5 min = tratar. Benzodiazepínico (até 2 doses) → 2ª linha em 15–20 min (levetiracetam, fenitoína ou fenobarbital) → refratário: IOT + infusão.",
  secs: [
    { h: "0–5 min", li: [
      "ABC, decúbito lateral, O₂, monitor, **glicemia capilar**, acesso IV/IO. Cronometrar a crise.",
      "Coletar: eletrólitos (Na, Ca, Mg), gasometria, hemograma; nível sérico se usa anticonvulsivante; toxicológico se suspeita." ] },
    { h: "Tempo de tratamento", li: [
      "**5 min:** 1º benzodiazepínico (IM/intranasal/bucal se sem acesso).",
      "**10 min:** 2º benzodiazepínico (máx. 2 doses no total, incluindo a pré-hospitalar).",
      "**15–20 min:** droga de 2ª linha — levetiracetam, fenitoína/fosfenitoína, valproato ou fenobarbital (eficácia semelhante; ~50% param).",
      "**40 min / refratário:** IOT e infusão contínua (midazolam) em UTI; considerar 2ª droga de 2ª linha antes.",
      "Pensar: hipoglicemia, hiponatremia, hipocalcemia (lactente), meningite/encefalite, TCE/maus-tratos, intoxicação, HIC." ] },
    { h: "Convulsão febril", li: [
      "**Simples:** 6 m–5 anos, generalizada, <15 min, única em 24 h, sem déficit pós-ictal prolongado → não precisa de exames, EEG ou imagem de rotina; procurar o foco da febre.",
      "**Punção lombar** se sinais meníngeos/sonolência persistente; considerar se 6–12 m sem vacina Hib/pneumo completa ou em uso de antibiótico.",
      "**Complexa** (focal, >15 min, recorrente em 24 h): investigar conforme o quadro.",
      "Orientar: risco de recorrência ~30%; antitérmico **não** previne crise; como agir em casa." ] },
  ],
  rx: [
    { h: "1ª linha — benzodiazepínico (até 2 doses)", li: [
      ["Sem acesso: **midazolam IM ou intranasal** (5 mg/mL): ", D(0.2, "mg", { max: 10, c: 5 }), " (IN: dividir entre as narinas com atomizador)."],
      ["Com acesso: midazolam IV ", D(0.2, "mg", { max: 10, c: 5 }), " (0,1–0,2 mg/kg) OU diazepam IV (5 mg/mL) ", D(0.3, "mg", { max: 10, c: 5 }), " lento."],
      ["Diazepam retal (sem acesso, se não houver midazolam): ", D(0.5, "mg", { max: 20, c: 5 }), " (usar a ampola com seringa sem agulha)."] ] },
    { h: "2ª linha (escolha uma)", li: [
      ["**Levetiracetam** (100 mg/mL): ", D(60, "mg", { max: 4500, c: 100 }), " IV diluído em 100 mL de SF 0,9%, em 15 min."],
      ["**Fenitoína** (50 mg/mL): ", D(20, "mg", { max: 1500, c: 50 }), " IV diluída **só em SF 0,9%**, velocidade ≤1 mg/kg/min (máx. 50 mg/min) — monitorar ECG e PA."],
      ["**Fenobarbital** (100 mg/mL): ", D(20, "mg", { max: 1000, c: 100 }), " IV em 20 min (depressão respiratória e hipotensão)."],
      ["Valproato IV (se disponível): ", D(40, "mg", { max: 3000 }), " em 10 min (evitar <2 anos, hepatopatia, doença mitocondrial)."] ] },
    { h: "Refratário (UTI, após IOT)", li: [
      ["Midazolam: bolus ", D(0.2, "mg", { max: 10, c: 5 }), " e infusão 0,05–2 mg/kg/h (solução 1 mg/mL: 50 mg em 50 mL)."],
      "Alternativas: cetamina (bolus 1–2 mg/kg + 0,5–3 mg/kg/h), tiopental/propofol conforme serviço; EEG contínuo." ] },
    { h: "Hipoglicemia associada", li: [
      ["Glicose 10%: ", D(2, "mL", { vol: true, max: 250 }), " IV (0,2 g/kg)."] ] },
  ],
  fontes: ["abemse", "ilae"] });

T({ id: "tce", cat: "Neurológico", title: "Traumatismo cranioencefálico (TCE)", cor: "laranja",
  alias: ["tce", "trauma de cranio", "queda", "pecarn", "tomografia", "glasgow", "hipertensao intracraniana"],
  resumo: "Use a regra PECARN para decidir TC no TCE leve. No grave: evitar hipóxia e hipotensão, IOT, salina hipertônica se sinais de herniação.",
  secs: [
    { h: "Glasgow pediátrico (<2 anos — resposta verbal)", li: [
      "Verbal: **5** balbucia/sorri, segue objetos · **4** choro consolável · **3** choro inconsolável/irritado · **2** gemidos · **1** nenhuma.",
      "TCE leve = Glasgow 14–15 · moderado 9–13 · grave ≤8." ] },
    { h: "PECARN (Glasgow 14–15) — <2 anos", li: [
      "**TC indicada:** Glasgow 14 ou alteração do estado mental, ou fratura de crânio palpável.",
      "**Observar ou TC (decisão compartilhada):** hematoma de couro cabeludo occipital/parietal/temporal, perda de consciência ≥5 s, mecanismo grave, criança 'não está normal' para os pais.",
      "Nenhum dos itens: risco muito baixo (<0,02%) — **sem TC**." ] },
    { h: "PECARN — ≥2 anos", li: [
      "**TC indicada:** Glasgow 14 ou alteração do estado mental, ou sinais de fratura de base de crânio (hemotímpano, olhos de guaxinim, sinal de Battle, rinorreia/otorreia).",
      "**Observar ou TC:** perda de consciência, vômitos, mecanismo grave, cefaleia intensa.",
      "**Mecanismo grave:** acidente automobilístico com ejeção/morte/capotamento; atropelamento; ciclista sem capacete; queda >0,9 m (<2 a) ou >1,5 m (≥2 a); impacto de objeto em alta velocidade.",
      "Observação: 4–6 h após o trauma; piora → TC." ] },
    { h: "TCE grave", li: [
      "IOT (Glasgow ≤8), SpO₂ ≥94%, **PaCO₂ 35–40** (hiperventilação só se herniação), PAS normal para a idade, cabeceira 30° e cabeça na linha média, colar cervical, normotermia e normoglicemia, tratar convulsões.",
      "Sinais de herniação (anisocoria, postura, tríade de Cushing): **salina hipertônica 3%** ou manitol, neurocirurgia imediata.",
      "Sempre considerar **maus-tratos** (história incompatível, <1 ano, lesões em fases diferentes)." ] },
  ],
  rx: [
    { h: "HIC / herniação", li: [
      ["NaCl 3%: ", D(4, "mL", { vol: true, max: 250 }), " IV em 10–20 min (3–5 mL/kg). Preparo de 100 mL: **SF 0,9% 89 mL + NaCl 20% 11 mL**."],
      ["OU manitol 20%: ", D(0.75, "g", { max: 50, c: 0.2 }), " IV em 20 min (0,5–1 g/kg)."] ] },
    { h: "TCE leve em observação", li: [
      ["Analgesia: dipirona ", D(20, "mg", { max: 1000, c: 500, gt: 20 }), " VO ou paracetamol; ondansetrona ", D(0.15, "mg", { max: 4, c: 2 }), " se vômitos."],
      "Alta com adulto responsável; retornar se vômitos repetidos, sonolência, cefaleia progressiva, convulsão, alteração de comportamento ou marcha." ] },
  ],
  fontes: ["pecarn"] });

/* ================= INFECCIOSO ================= */
T({ id: "febre", cat: "Infeccioso", title: "Lactente febril e febre sem sinais localizatórios", cor: "laranja",
  alias: ["febre", "lactente febril", "febre sem sinais", "fssl", "neonato febril", "ampicilina", "gentamicina", "cefotaxima"],
  resumo: "Febre ≥38 °C: ≤21 dias → investigação completa, internação e ATB. 22–60 dias → urina + marcadores decidem. 3–36 meses vacinados → foco principal é ITU.",
  secs: [
    { h: "Qualquer idade com aparência toxêmica", li: [
      "Toxemia (letargia, má perfusão, hipoventilação, cianose) = **sepse**: culturas + ATB imediato + suporte (ver Sepse)." ] },
    { h: "8–21 dias (bem aparente) — AAP 2021", li: [
      "EAS + urocultura (sondagem), hemocultura, **punção lombar**; internar e iniciar ATB (ampicilina + gentamicina ou ceftazidima/cefotaxima).",
      "Aciclovir se: vesículas, convulsão, hipotermia, alteração de enzimas hepáticas, pleocitose liquórica, mãe com herpes." ] },
    { h: "22–28 dias", li: [
      "EAS, hemocultura e **marcadores inflamatórios**: procalcitonina >0,5 ng/mL, PCR >2 mg/dL (20 mg/L), neutrófilos >4.000/mm³ ou T >38,5 °C = alterado.",
      "Marcador alterado → **punção lombar**, internar, ATB. Todos normais → LCR opcional; internar ou alta com ATB parenteral e retorno em 24 h." ] },
    { h: "29–60 dias", li: [
      "EAS e marcadores inflamatórios (hemocultura se alterados). Tudo normal → **alta sem ATB** com retorno em 24–36 h.",
      "EAS alterado e marcadores normais → tratar ITU VO (ou IV) com retorno em 24 h. Marcadores alterados → considerar LCR; ceftriaxona." ] },
    { h: "3–36 meses, vacinados e bem aparentes", li: [
      "Procurar o foco. Sem foco e febre ≥39 °C: **EAS + urocultura** em meninas <24 m, meninos <12 m (ou não circuncidados <24 m) e febre >48 h.",
      "Vacinação incompleta (pneumo/Hib) e T ≥39 °C: considerar hemograma e hemocultura.",
      "Febre ≥5 dias: pensar em **doença de Kawasaki** (conjuntivite não purulenta, lábios/língua, exantema, extremidades, linfonodo cervical)." ] },
  ],
  rx: [
    { h: "Antibióticos no lactente jovem", li: [
      ["≤28 dias — ampicilina: ", D(50, "mg"), " IV 8/8h (≤7 dias) ou 6/6h (>7 dias); **100 mg/kg/dose** se meningite."],
      ["+ gentamicina (10 ou 40 mg/mL): ", D(4, "mg"), " IV 1x/dia (4–5 mg/kg; ajustar por idade gestacional)."],
      ["OU + cefotaxima (se meningite): ", D(50, "mg"), " IV 8/8h (6/6h em >7 dias)."],
      ["Aciclovir (se indicado): ", D(20, "mg"), " IV 8/8h."],
      ["29–60 dias — ceftriaxona: ", D(50, "mg", { max: 2000 }), " IV/IM 1x/dia (**100 mg/kg/dia** se suspeita de meningite)."] ] },
  ],
  fontes: ["aap2021febrile"] });

T({ id: "meningite", cat: "Infeccioso", title: "Meningite bacteriana", cor: "vermelho",
  alias: ["meningite", "meningococo", "puncao lombar", "liquor", "dexametasona", "ceftriaxona", "quimioprofilaxia"],
  resumo: "Não atrasar o antibiótico: se a punção demorar, colher hemocultura e tratar. Dexametasona antes ou junto da 1ª dose em >6 semanas.",
  secs: [
    { h: "Quadro clínico", li: [
      "Criança maior: febre, cefaleia, vômitos, rigidez de nuca, Kernig/Brudzinski, alteração de consciência, convulsão.",
      "Lactente: **febre ou hipotermia, irritabilidade/choro 'paradoxal', recusa alimentar, fontanela abaulada, letargia** — sinais meníngeos frequentemente ausentes.",
      "Petéquias/púrpura progressivas = **meningococcemia**: ATB imediato." ] },
    { h: "Diagnóstico", li: [
      "**Punção lombar** — adiar (e dar ATB antes) se: instabilidade hemodinâmica/respiratória, sinais de HIC/déficit focal, Glasgow ≤8, coagulopatia/plaquetas <50 mil, infecção no local.",
      "TC antes da punção só se déficit focal, papiledema, Glasgow baixo ou imunossupressão.",
      "LCR bacteriano: turvo, **células >1.000 com predomínio de neutrófilos, glicose baixa (<40 ou razão <0,4), proteína alta**; Gram, cultura, látex/PCR.",
      "**Notificação compulsória imediata.**" ] },
  ],
  rx: [
    { h: "Prescrição (>1 mês)", li: [
      ["Dexametasona (4 mg/mL): ", D(0.15, "mg", { max: 10, c: 4 }), " IV 6/6h por 2–4 dias — **15–20 min antes ou junto da 1ª dose de ATB** (>6 semanas de vida)."],
      ["Ceftriaxona: ", D(50, "mg", { max: 2000 }), " IV 12/12h (100 mg/kg/dia; máx. 4 g/dia)."],
      ["+ Vancomicina se Gram com cocos Gram-positivos ou grave: ", D(15, "mg", { max: 1000 }), " IV 6/6h (60 mg/kg/dia)."],
      "< 1 mês: ampicilina 100 mg/kg/dose + cefotaxima (ver 'Lactente febril'). Isolamento respiratório por 24 h de ATB." ] },
    { h: "Quimioprofilaxia de contactantes (meningococo)", li: [
      ["Rifampicina: ", D(10, "mg", { max: 600 }), " VO 12/12h por 2 dias (<1 mês: 5 mg/kg). Adultos: 600 mg 12/12h."],
      "Alternativas: ceftriaxona IM dose única (125 mg <12 anos; 250 mg ≥12 anos) ou ciprofloxacino 500 mg VO (adultos). Hib: rifampicina 20 mg/kg 1x/dia por 4 dias." ] },
  ],
  fontes: ["msmeningite", "aap2021febrile"] });

T({ id: "itu", cat: "Infeccioso", title: "Infecção do trato urinário (ITU)", cor: "amarelo",
  alias: ["itu", "infeccao urinaria", "pielonefrite", "cistite", "urocultura", "cefalexina"],
  resumo: "Principal infecção bacteriana grave do lactente febril. Urocultura por sondagem antes do ATB; VO se bem, IV se toxêmico ou <2–3 meses.",
  secs: [
    { h: "Quadro", li: [
      "Lactente: **febre sem foco**, irritabilidade, vômitos, baixo ganho de peso. Maior: disúria, polaciúria, urgência, dor lombar/abdominal, enurese nova." ] },
    { h: "Diagnóstico", li: [
      "Sem controle esfincteriano: urina por **sondagem vesical** (ou punção suprapúbica). Saco coletor **só serve se negativo**.",
      "EAS sugestivo: leucocitúria, nitrito positivo, bacteriúria. **Confirmar com urocultura**: ≥50.000 UFC/mL (sondagem) ou ≥100.000 (jato médio).",
      "Após 1ª ITU febril em <2 anos: **USG de rins e vias urinárias**." ] },
    { h: "Internar / IV se", li: [
      "<2–3 meses, toxemia/sepse, vômitos que impedem VO, desidratação, falha de VO em 48 h, uropatia conhecida/imunossupressão." ] },
  ],
  rx: [
    { h: "Oral (7–10 dias na ITU febril; 3–5 dias na cistite)", li: [
      ["Cefalexina 250 mg/5 mL: ", D(50, "mg", { dia: true, maxd: 4000, div: 4, c: 50 }), " VO 6/6h (50–100 mg/kg/dia)."],
      ["OU cefuroxima 250 mg/5 mL: ", D(30, "mg", { dia: true, maxd: 1000, div: 2, c: 50 }), " VO 12/12h."],
      ["OU amoxicilina + clavulanato 400+57 mg/5 mL: ", D(50, "mg", { dia: true, maxd: 1750, div: 2, c: 80 }), " VO 12/12h (se sensível)."] ] },
    { h: "Parenteral", li: [
      ["Ceftriaxona: ", D(75, "mg", { max: 2000 }), " IV/IM 1x/dia (50–75 mg/kg/dia) — trocar para VO quando afebril 24–48 h."],
      ["OU gentamicina (se sem nefropatia): ", D(6, "mg", { max: 300 }), " IV 1x/dia (5–7,5 mg/kg/dia)."],
      "Ajustar pelo antibiograma. Reavaliar em 48–72 h." ] },
  ],
  fontes: ["aapitu", "sbpitu"] });

T({ id: "dengue", cat: "Infeccioso", title: "Dengue (MS 2024)", cor: "amarelo",
  alias: ["dengue", "arbovirose", "sinais de alarme", "grupo a", "grupo b", "grupo c", "grupo d", "plaquetas", "hematocrito"],
  resumo: "Classifique em A, B, C ou D. Hidratação é o tratamento. Sinais de alarme → soro IV. Nunca AINE nem AAS.",
  secs: [
    { h: "Suspeita", li: [
      "Febre 2–7 dias + 2 ou mais: náusea/vômitos, exantema, mialgia/artralgia, cefaleia/dor retro-orbitária, petéquias/prova do laço +, leucopenia. Criança: febre + sem foco pode bastar em área endêmica.",
      "**Fase crítica:** entre o 3º e 7º dia, geralmente na **queda da febre** — é quando surgem os sinais de alarme." ] },
    { h: "Sinais de alarme (→ grupo C)", li: [
      "Dor abdominal intensa e contínua · vômitos persistentes · acúmulo de líquidos (ascite, derrame pleural/pericárdico) · hipotensão postural/lipotimia · hepatomegalia >2 cm · sangramento de mucosa · letargia/irritabilidade · **aumento progressivo do hematócrito**." ] },
    { h: "Sinais de choque (→ grupo D)", li: [
      "Taquicardia, extremidades frias, TEC >2 s, pulso fraco, **PA convergente (diferencial ≤20 mmHg)**, hipotensão, oligúria; sangramento grave; disfunção grave de órgão." ] },
    { h: "Grupos", li: [
      "**A:** sem alarme, sem sangramento, sem risco → casa com hidratação oral; hemograma a critério.",
      "**B:** sem alarme, **com** sangramento de pele (petéquias/prova do laço+) **ou** condição de risco (lactente, comorbidade, risco social) → hemograma obrigatório; hidratação oral supervisionada até o resultado.",
      "**C:** sinais de alarme → **hidratação IV imediata**, internação mínimo 48 h.",
      "**D:** choque/sangramento grave/disfunção de órgão → **expansão rápida**, UTI." ] },
  ],
  rx: [
    { h: "Grupos A e B — hidratação oral (criança)", li: [
      ["Volume diário: ", D(0, "mL/dia", { dengueOral: true }), " (<10 kg 130 mL/kg · 10–20 kg 100 mL/kg · >20 kg 80 mL/kg) — **1/3 em SRO** e 2/3 em água, sucos, chás; 1/3 do total nas primeiras 4–6 h."],
      ["Paracetamol 200 mg/mL: ", D(15, "mg", { max: 750, c: 200, gt: 20 }), " VO 6/6h ou dipirona ", D(20, "mg", { max: 1000, c: 500, gt: 20 }), " VO 6/6h."],
      "**Proibido:** AAS, ibuprofeno e outros AINE; corticoide. Retorno no dia da melhora da febre (fase crítica) e se sinais de alarme." ] },
    { h: "Grupo C", li: [
      ["Fase de expansão: SF 0,9% ", D(10, "mL", { vol: true, max: 1000 }), " na 1ª hora; reavaliar (clínica + hematócrito em 2 h); repetir até 3 vezes."],
      ["Melhorou → manutenção: ", D(25, "mL", { vol: true }), " em 6 h, depois 25 mL/kg em 8 h. Meta de diurese 1 mL/kg/h."],
      "Sem melhora após 3 fases → conduzir como grupo D." ] },
    { h: "Grupo D", li: [
      ["SF 0,9% ", D(20, "mL", { vol: true, max: 1000 }), " em até 20 min; repetir até 3 vezes, reavaliando a cada 15–30 min e hematócrito a cada 2 h."],
      ["Sem resposta com hematócrito em alta: albumina ", D(0.75, "g", { max: 50 }), " (0,5–1 g/kg); hematócrito em queda/sangramento: concentrado de hemácias 10–15 mL/kg. Vasoativo se persistir."] ] },
  ],
  fontes: ["msdengue"] });

/* ================= METABÓLICO ================= */
T({ id: "cad", cat: "Metabólico", title: "Cetoacidose diabética (CAD)", cor: "vermelho",
  alias: ["cad", "cetoacidose", "diabetes", "insulina", "hiperglicemia", "edema cerebral"],
  resumo: "Fluido primeiro, insulina regular 0,05–0,1 U/kg/h 1 h depois, potássio desde o início, glicose no soro quando <250–300. Vigiar edema cerebral.",
  secs: [
    { h: "Diagnóstico", li: [
      "**Glicemia >200 mg/dL + pH <7,3 ou bicarbonato <18 + cetonemia ≥3 mmol/L ou cetonúria ≥2+.**",
      "Gravidade: leve pH <7,3 / HCO₃ <18 · moderada pH <7,2 / HCO₃ <10 · grave pH <7,1 / HCO₃ <5.",
      "Quadro: poliúria, polidipsia, perda de peso, vômitos, dor abdominal, respiração de Kussmaul, hálito cetônico, desidratação, sonolência." ] },
    { h: "Monitorização", li: [
      "Glicemia capilar **1/1h**; gasometria, Na, K, cloro a cada 2–4 h; balanço hídrico; **neurológico 1/1h**.",
      "Sódio corrigido = Na + 1,6 × [(glicemia − 100)/100]. Deve subir conforme a glicose cai." ] },
    { h: "Edema cerebral (principal causa de morte)", li: [
      "Cefaleia, bradicardia, hipertensão, vômitos recorrentes, irritabilidade/sonolência, alteração pupilar, incontinência — geralmente 4–12 h após início do tratamento.",
      "Tratar **imediatamente** (antes da TC): manitol ou salina 3%, reduzir fluido em 1/3, cabeceira elevada." ] },
  ],
  rx: [
    { h: "Fluidos", li: [
      ["Se má perfusão: SF 0,9% ou Ringer ", D(10, "mL", { vol: true, max: 1000 }), " em 20–30 min (pode repetir; choque: 20 mL/kg)."],
      "Depois: repor déficit estimado (5–10%) **em 24–48 h** + manutenção, com SF 0,9%/solução balanceada. Não repor diurese osmótica.",
      "**Potássio:** acrescentar **40 mEq/L** de soro assim que K <5,5 e houver diurese (KCl 19,1% ≈ 1,6 mL para cada 100 mL). Se K <3,0: repor antes da insulina.",
      "Glicose <250–300 mg/dL: trocar para soro com **glicose 5%** (10% se <150 e ainda acidótico). Não reduzir a insulina abaixo de 0,05 U/kg/h enquanto houver acidose." ] },
    { h: "Insulina regular IV (iniciar 1 h após o início dos fluidos; sem bolus)", li: [
      "Preparo: **insulina regular 50 U em 50 mL de SF 0,9% (1 U/mL)** — lavar o equipo com 20 mL da solução.",
      ["0,1 U/kg/h: ", D(0.1, "mL/h", { vol: true, un: "mL/h" }), " · 0,05 U/kg/h (<5 anos, CAD leve): ", D(0.05, "mL/h", { vol: true, un: "mL/h" }), "."],
      "Meta: queda de glicemia de 50–100 mg/dL/h. Bicarbonato **não** é indicado de rotina." ] },
    { h: "Edema cerebral", li: [
      ["Manitol 20%: ", D(0.75, "g", { max: 50, c: 0.2 }), " IV em 10–15 min (0,5–1 g/kg) OU NaCl 3%: ", D(4, "mL", { vol: true, max: 250 }), " em 10–15 min (2,5–5 mL/kg)."] ] },
  ],
  fontes: ["ispad2022", "rchdka"] });

/* ================= TOXICOLOGIA ================= */
T({ id: "intox", cat: "Toxicologia e trauma", title: "Intoxicações exógenas", cor: "laranja",
  alias: ["intoxicacao", "envenenamento", "carvao ativado", "naloxona", "paracetamol", "acetilcisteina", "organofosforado", "toxindrome", "ciatox"],
  resumo: "ABCDE + glicemia, reconhecer a toxíndrome, ligar para o CIATox. Carvão ativado até 1 h se indicado. Antídoto certo na dose certa.",
  secs: [
    { h: "Primeiros passos", li: [
      "ABCDE, glicemia, ECG (QRS e QT), temperatura. Descobrir: o quê, quanto, quando, via.",
      "**Disque-Intoxicação: 0800 722 6001** (24 h) — ou CIATox regional.",
      "**Não induzir vômito.** Cáusticos e hidrocarbonetos: não dar carvão nem lavagem; jejum; endoscopia em 12–24 h se cáustico sintomático." ] },
    { h: "Toxíndromes", table: {
      head: ["Síndrome", "Sinais", "Exemplos"],
      rows: [["Anticolinérgica", "Pele quente e seca, midríase, taquicardia, retenção urinária, delírio", "Anti-histamínicos, atropina, tricíclicos, antiparkinsonianos"],
             ["Colinérgica", "Miose, sialorreia, broncorreia, bradicardia, vômitos, diarreia, fasciculação", "Organofosforados, carbamatos ('chumbinho')"],
             ["Opioide", "Miose, depressão respiratória, sonolência", "Codeína, tramadol, morfina, fentanil"],
             ["Simpaticomimética", "Midríase, taquicardia, hipertensão, sudorese, agitação", "Cocaína, anfetaminas, descongestionantes"],
             ["Sedativo-hipnótica", "Sonolência, hipotonia, pupilas normais", "Benzodiazepínicos, anticonvulsivantes"],
             ["Extrapiramidal", "Distonia, torcicolo, crise oculógira", "Metoclopramida, bromoprida, haloperidol"]] } },
  ],
  rx: [
    { h: "Descontaminação", li: [
      ["Carvão ativado: ", D(1, "g", { max: 50 }), " VO/SNG (diluído em água ou suco), idealmente **até 1 h** — não usar se rebaixamento sem via aérea protegida, cáusticos, hidrocarbonetos, álcool, ferro, lítio."] ] },
    { h: "Antídotos", li: [
      ["**Naloxona** (0,4 mg/mL): ", D(0.1, "mg", { max: 2, c: 0.4 }), " IV/IM/IN; repetir a cada 2–3 min (dose menor, 0,01 mg/kg, se usuário crônico)."],
      ["**N-acetilcisteína IV** (paracetamol ≥150 mg/kg ou nível tóxico no nomograma a partir de 4 h): 1ª bolsa ", D(150, "mg"), " em 1 h · 2ª ", D(50, "mg"), " em 4 h · 3ª ", D(100, "mg"), " em 16 h (diluir em SG 5%, volume conforme peso)."],
      ["**Atropina** (organofosforado/carbamato): ", D(0.05, "mg", { max: 2, c: 0.25 }), " IV a cada 5–10 min até secar secreções (0,02–0,05 mg/kg) — o alvo é secreção pulmonar, não a pupila."],
      ["**Biperideno** (reação extrapiramidal; 5 mg/mL): ", D(0.04, "mg", { max: 2, c: 5 }), " IM/IV lento; pode repetir em 30 min."],
      ["**Bicarbonato de sódio 8,4%** (tricíclico com QRS >100 ms): ", D(1.5, "mEq", { max: 100, c: 1 }), " IV (1–2 mEq/kg); diluir 1:1 em lactentes."],
      ["**Flumazenil** (0,1 mg/mL) — evitar se convulsão/uso crônico/coingestão de tricíclico: ", D(0.01, "mg", { max: 0.2, c: 0.1 }), " IV."],
      ["Hipoglicemia (sulfonilureia, álcool, betabloqueador): glicose 10% ", D(2, "mL", { vol: true, max: 250 }), " IV."] ] },
  ],
  fontes: ["ciatox"] });

T({ id: "queimadura", cat: "Toxicologia e trauma", title: "Queimaduras", cor: "laranja",
  alias: ["queimadura", "parkland", "scq", "superficie corporal queimada", "grande queimado"],
  resumo: "Calcule a superfície corporal queimada (2º e 3º graus). Criança com ≥10% SCQ: hidratação venosa pela fórmula de Parkland (3 mL/kg/%SCQ) + manutenção com glicose se <30 kg.",
  secs: [
    { h: "Avaliação", li: [
      "ABCDE; **via aérea**: queimadura de face, vibrissas queimadas, escarro carbonáceo, rouquidão, estridor → IOT precoce.",
      "Profundidade: **1º grau** (eritema, não conta na SCQ) · **2º superficial** (bolhas, muito doloroso) · **2º profundo** (esbranquiçado, menos dor) · **3º grau** (branco/marrom, indolor, seco).",
      "**SCQ na criança:** palma da mão do paciente (com dedos) ≈ 1%. Lactente: cabeça 18%, cada membro inferior 14%, cada membro superior 9%, tronco anterior 18%, posterior 18%. A cada ano acima de 1: cabeça −1% e cada perna +0,5% (use Lund-Browder).",
      "Sempre pensar em maus-tratos (padrão em luva/meia, bordas nítidas, história incompatível) e intoxicação por CO." ] },
    { h: "Conduta", li: [
      "Resfriar com água corrente em temperatura ambiente por 20 min (até 3 h após); não usar gelo. Remover roupas/adornos. Manter aquecido.",
      "Analgesia potente precoce. Curativo limpo e não aderente; não romper bolhas no PS.",
      "Profilaxia do tétano conforme caderneta. Sem antibiótico profilático.",
      "**Encaminhar a centro de queimados:** 2º grau >10% SCQ, qualquer 3º grau, face/mãos/pés/genitália/articulações, elétrica, química, inalação, lesão circunferencial, comorbidades ou maus-tratos." ] },
  ],
  rx: [
    { h: "Hidratação (≥10% SCQ em criança) — ATLS 10ª ed.", li: [
      ["Ringer lactato — Parkland 3 mL × kg × %SCQ nas primeiras 24 h: ", D(3, "mL", { vol: true, perSCQ: true }), " por cada 1% de SCQ; **metade nas primeiras 8 h** (contadas da hora da queimadura) e metade nas 16 h seguintes."],
      ["<30 kg: somar a manutenção com glicose (SG 5% em solução isotônica): ", D(4, "mL/h", { holliday: true }), "."],
      "Ajustar pela **diurese: 1 mL/kg/h** em <30 kg (0,5 mL/kg/h se maior); sondagem vesical se ≥15–20% SCQ." ] },
    { h: "Analgesia", li: [
      ["Morfina (10 mg/mL — diluir 1 mL + 9 mL SF = 1 mg/mL): ", D(0.1, "mg", { max: 5, c: 1 }), " IV lento; repetir conforme dor."],
      ["Sem acesso: fentanil intranasal (50 mcg/mL) ", D(1.5, "mcg", { max: 100, c: 50 }), " (dividir entre as narinas)."],
      ["Curativos: cetamina ", D(1, "mg", { max: 100, c: 50 }), " IV (analgesia/sedação para procedimento; 0,5–1,5 mg/kg)."] ] },
  ],
  fontes: ["atls", "msqueimadura"] });

/* ================= ANALGESIA ================= */
T({ id: "analgesia", cat: "Toxicologia e trauma", title: "Febre, dor e sedação para procedimentos", cor: "verde",
  alias: ["febre", "dor", "analgesia", "dipirona", "paracetamol", "ibuprofeno", "morfina", "cetamina", "sedacao procedimento", "fentanil intranasal"],
  resumo: "Tratar desconforto, não o número do termômetro. Escada analgésica por peso; cetamina é a sedação de escolha para procedimentos dolorosos no PS.",
  secs: [
    { h: "Febre", li: [
      "Objetivo: conforto. Não alternar antitérmicos de rotina. Banho morno opcional (nunca álcool/água fria).",
      "Sinais de alerta em qualquer febre: toxemia, petéquias, rigidez de nuca, desconforto respiratório, desidratação, <3 meses." ] },
    { h: "Dor", li: [
      "Use escalas: FLACC (<4 anos), faces (4–7), numérica (≥8).",
      "Leve: dipirona/paracetamol/ibuprofeno · Moderada: + opioide fraco ou fentanil IN · Intensa: morfina IV ou fentanil; cetamina em dose analgésica." ] },
    { h: "Sedação para procedimentos (sutura, redução de fratura)", li: [
      "Jejum não deve atrasar procedimento urgente. Monitor, O₂, aspirador, material de via aérea e alguém dedicado à via aérea.",
      "**Cetamina** preserva reflexos e respiração; efeitos: vômito, laringoespasmo (raro), agitação na recuperação. Evitar em <3 meses." ] },
  ],
  rx: [
    { h: "Antitérmicos/analgésicos", li: [
      ["Dipirona 500 mg/mL gotas: ", D(20, "mg", { max: 1000, c: 500, gt: 20 }), " VO até 6/6h · IV: ", D(20, "mg", { max: 1000, c: 500 }), " diluída em SF, lenta."],
      ["Paracetamol 200 mg/mL gotas: ", D(15, "mg", { max: 750, c: 200, gt: 20 }), " VO até 6/6h (máx. 75 mg/kg/dia)."],
      ["Ibuprofeno 50 mg/mL: ", D(10, "mg", { max: 400, c: 50 }), " VO 8/8h (>6 meses)."],
      ["Morfina 1 mg/mL (diluída): ", D(0.1, "mg", { max: 5, c: 1 }), " IV lento até 4/4h."],
      ["Fentanil intranasal (50 mcg/mL): ", D(1.5, "mcg", { max: 100, c: 50 }), " IN (pode repetir 0,5–1 mcg/kg em 10 min)."] ] },
    { h: "Sedação para procedimento", li: [
      ["Cetamina IV (50 mg/mL): ", D(1.5, "mg", { max: 100, c: 50 }), " em 1 min (1–2 mg/kg); repetir 0,5 mg/kg se necessário."],
      ["Cetamina IM: ", D(4, "mg", { max: 200, c: 50 }), " (3–4 mg/kg)."],
      ["Ondansetrona antes (reduz vômitos): ", D(0.15, "mg", { max: 4, c: 2 }), " IV."],
      ["Midazolam intranasal (ansiólise; 5 mg/mL): ", D(0.3, "mg", { max: 10, c: 5 }), " com atomizador."] ] },
  ],
  fontes: ["sbpdor"] });

const REFS = {
  pals2025: ["AHA/AAP — 2025 Guidelines for CPR and ECC: Pediatric Basic and Advanced Life Support (out/2025)", "https://newsroom.heart.org/news/updated-cpr-guidelines-released-for-pediatric-and-neonatal-emergency-care-and-resuscitation"],
  pals2025b: ["JournalFeed — New AHA 2025 Pediatric BLS: big changes for little patients", "https://journalfeed.org/article-a-day/2025/new-aha-2025-pediatric-bls-big-changes-for-little-patients/"],
  manchester: ["Grupo Brasileiro de Classificação de Risco — Sistema Manchester de Classificação de Risco", ""],
  apls: ["APLS — Advanced Paediatric Life Support, 7ª ed. (fórmulas de peso por idade)", ""],
  learnpicu: ["LearnPICU — Intubation / RSI (doses e tamanho de tubo)", "https://www.learnpicu.com/respiratory/intubation-rsi"],
  ssc2026: ["Surviving Sepsis Campaign — International Guidelines for Sepsis and Septic Shock in Children 2026 (Intensive Care Med)", "https://link.springer.com/article/10.1007/s00134-026-08360-2"],
  phoenix: ["Schlapbach LJ et al. International Consensus Criteria for Pediatric Sepsis (Phoenix). JAMA 2024", ""],
  sbpanafilaxia: ["SBP — Anafilaxia: atualização 2021", "https://www.sbp.com.br/fileadmin/user_upload/22970c-GPA-Anafilaxia_-_Atualizacao_2021.pdf"],
  wao: ["World Allergy Organization — Anaphylaxis Guidance 2020", ""],
  msinfluenza: ["Ministério da Saúde — Guia/Protocolo de tratamento de influenza (oseltamivir)", ""],
  einsteinoma: ["Hospital Israelita Albert Einstein — Guia do episódio de cuidado: OMA em crianças (v.4)", "https://medicalsuite.einstein.br/pratica-medica/Pathways/Otite%20Me%CC%81dia%20Aguda%20em%20Crianc%CC%A7as%20e%20Adolescentes%20V.4.pdf"],
  sbpfaringite: ["SBP — Faringoamigdalites / IDSA 2012 — Group A Streptococcal Pharyngitis", ""],
  alberta: ["Alberta/University of Calgary — Croup, Pediatric: Emergency and Inpatient guideline", "https://papers.ucalgary.ca/paediatrics/assets/croup-guideline.pdf"],
  aapbronq: ["AAP — Clinical Practice Guideline: Bronchiolitis (Ralston et al., Pediatrics 2014)", ""],
  sbpbronq: ["Afya/CBUEP 2024 — Bronquiolite viral aguda: além dos guidelines", "https://portal.afya.com.br/pediatria/cbuep-2024-bronquiolite-viral-aguda-alem-dos-guidelines"],
  gina2025: ["GINA — Global Strategy for Asthma Management and Prevention, 2025 update", "https://ginasthma.org/wp-content/uploads/2025/11/GINA-2025-Update-25_11_08-WMS.pdf"],
  asthmahandbook: ["Australian Asthma Handbook — Managing acute asthma in children 6–11 years in the ED", "https://www.asthmahandbook.org.au/acute-asthma/children-6-11-years/managing-acute-asthma-in-children-6-11-years-in-ed"],
  sbppac: ["SBP — Pneumonias adquiridas na comunidade não complicadas (Documento Científico, 2021)", "https://www.sbp.com.br/fileadmin/user_upload/23054d-DC-Pneumonias_Adquiridas_Nao_Complicadas.pdf"],
  msdiarreia: ["Ministério da Saúde — Manejo do paciente com diarreia (cartaz)", "https://bvsms.saude.gov.br/bvs/cartazes/manejo_paciente_diarreia_cartaz.pdf"],
  sbpdiarreia: ["SBP — Diarreia aguda infecciosa (Guia Prático, 2023)", "https://www.sbp.com.br/fileadmin/user_upload/sbp/2023/junho/14/24048aPRESS-GPA-Diarreia_Aguda_Infecciosa-pSITE.pdf"],
  aapfluids: ["Feld LG et al. AAP Clinical Practice Guideline: Maintenance IV Fluids in Children. Pediatrics 2018", ""],
  abemse: ["ABEM — Key Advances: Pediatric Status Epilepticus (2024)", "https://www.abem.org/wp-content/uploads/2024/10/Key-Advances_Pediatric-Status-Epilepticus_Practice-Advance.pdf"],
  ilae: ["ESETT (Kapur J et al., NEJM 2019) — levetiracetam, fosfenitoína e valproato no estado de mal", ""],
  pecarn: ["Kuppermann N et al. PECARN — Identification of children at very low risk of clinically-important brain injuries after head trauma. Lancet 2009", ""],
  aap2021febrile: ["AAP — Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old (Pediatrics 2021)", "https://publications.aap.org/pediatrics/article/148/2/e2021052228/179783/Evaluation-and-Management-of-Well-Appearing"],
  msmeningite: ["Ministério da Saúde — Guia de Vigilância em Saúde: meningites (quimioprofilaxia)", ""],
  aapitu: ["AAP — Urinary Tract Infection: Clinical Practice Guideline (2011, reafirmado 2016)", ""],
  sbpitu: ["SBP — Infecção do trato urinário (Departamento de Nefrologia)", ""],
  msdengue: ["Ministério da Saúde — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed. (2024)", "https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca"],
  ispad2022: ["ISPAD Clinical Practice Consensus Guidelines 2022: Diabetic ketoacidosis and hyperglycemic hyperosmolar state", "https://www.researchgate.net/publication/364397763_ISPAD_Clinical_Practice_Consensus_Guidelines_2022_Diabetic_ketoacidosis_and_hyperglycemic_hyperosmolar_state"],
  rchdka: ["Royal Children's Hospital Melbourne — Clinical Practice Guideline: Diabetic ketoacidosis", "https://www.rch.org.au/clinicalguide/guideline_index/Diabetic_Ketoacidosis/"],
  ciatox: ["ANVISA/Rede Renaciat — Disque-Intoxicação 0800 722 6001", ""],
  atls: ["American College of Surgeons — ATLS, 10ª ed. (queimaduras)", ""],
  msqueimadura: ["Afya — Avaliação e manejo inicial de queimaduras (pediatria)", "https://portal.afya.com.br/pediatria/avaliacao-e-manejo-inicial-de-queimaduras"],
  sbpdor: ["SBP / Tratado de Pediatria 6ª ed. — analgesia e sedação em pediatria", ""],
};

/* ===== formatação (escopo local) ===== */
const nf = (x) => {
  if (x === null || x === undefined || isNaN(x)) return "—";
  const a = Math.abs(x);
  const d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : a >= 0.1 ? 2 : 3;
  return Number(x.toFixed(d)).toLocaleString("pt-BR", { maximumFractionDigits: d });
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
let W = null, AGE = null;
const holliday = (w) => { let d = w <= 10 ? 100 * w : w <= 20 ? 1000 + 50 * (w - 10) : 1500 + 20 * (w - 20); return Math.min(d, 2400); };

function doseHTML(d) {
  const u = d.u, rule = [];
  const maxTxt = () => (d.max ? `máx. ${nf(d.max)} ${u}` : "");
  if (d.holliday) rule.push("manutenção de Holliday-Segar");
  else if (d.hollidayDay) rule.push("Holliday-Segar (mL/dia)");
  else if (d.dengueOral) rule.push("130/100/80 mL/kg/dia conforme peso");
  else if (d.bands) rule.push("dose conforme faixa de peso");
  else if (d.ageBands) rule.push("dose conforme idade");
  else if (d.perSCQ) rule.push(`${nf(d.k)} mL/kg por 1% de SCQ`);
  else if (d.dia) rule.push(`${nf(d.k)} ${u}/kg/dia ÷ ${d.div}` + (d.maxd ? ` (máx. ${nf(d.maxd)} ${u}/dia)` : ""));
  else if (d.vol) rule.push(`${nf(d.k)} ${u === "mL" ? "mL" : u}/kg` + (d.max ? ` (máx. ${nf(d.max)})` : ""));
  else { rule.push(`${nf(d.k)} ${u}/kg`); if (d.max) rule.push(maxTxt()); }
  if (!W) {
    let extra = "";
    if (d.c && !d.dia && !d.vol && !d.bands && !d.ageBands) { const mlkg = d.k / d.c; extra = ` = ${nf(mlkg)} mL/kg` + (d.gt ? ` (${nf(mlkg * d.gt)} gotas/kg)` : ""); }
    if (d.bands && d.infantK) rule.push(`<1 ano: ${nf(d.infantK)} ${u}/kg`);
    return `<span class="sv-dose">${esc(rule.join("; "))}${esc(extra)}</span>`;
  }
  let amt, unit = u, out = "";
  if (d.holliday) { const day = holliday(W); return `<span class="sv-dose">${nf(day / 24)} mL/h <small>(${nf(day)} mL/dia · Holliday-Segar)</small></span>`; }
  if (d.hollidayDay) { const day = holliday(W); return `<span class="sv-dose">${nf(day)} mL/dia <small>(${nf(day / 24)} mL/h)</small></span>`; }
  if (d.dengueOral) { const k = W < 10 ? 130 : W <= 20 ? 100 : 80; const day = k * W; return `<span class="sv-dose">${nf(day)} mL/dia <small>(${k} mL/kg; SRO ${nf(day / 3)} mL; 1ª 4–6 h: ${nf(day / 3)} mL)</small></span>`; }
  if (d.perSCQ) { return `<span class="sv-dose">${nf(d.k * W)} mL × %SCQ <small>(ex.: 10% = ${nf(d.k * W * 10)} mL em 24 h; metade em 8 h = ${nf(d.k * W * 5 / 8)} mL/h)</small></span>`; }
  if (d.bands) {
    if (d.infantK && AGE !== null && AGE < 1) amt = d.infantK * W;
    else { amt = d.bands.find((b) => W <= b[0])[1]; }
  } else if (d.ageBands) {
    if (AGE === null) return `<span class="sv-dose">informe a idade <small>(${esc(rule.join("; "))})</small></span>`;
    amt = d.ageBands.find((b) => AGE < b[0])[1];
  } else if (d.dia) {
    let day = d.k * W; if (d.maxd) day = Math.min(day, d.maxd);
    amt = day / d.div; if (d.max) amt = Math.min(amt, d.max);
    out = ` <small>(${nf(day)} ${u}/dia)</small>`;
  } else {
    amt = d.k * W;
    if (d.min) amt = Math.max(amt, d.min);
    let mx = d.max;
    if (d.amax && (AGE === null || AGE < d.amax.age)) mx = Math.min(mx || Infinity, d.amax.below);
    if (mx) amt = Math.min(amt, mx);
  }
  let vol = "";
  if (d.c) { const ml = amt / d.c; vol = ` = <b>${nf(ml)} mL</b>` + (d.gt ? ` (${Math.max(1, Math.round(ml * d.gt))} gotas)` : ""); }
  const perDose = d.dia ? "/dose" : "";
  const capped = !d.vol && !d.bands && !d.ageBands && !d.dia && d.max && d.k * W > d.max ? " · dose máxima" : "";
  return `<span class="sv-dose">${nf(amt)} ${esc(unit)}${perDose}${vol}${out}<small> [${esc(rule.join("; "))}${capped}]</small></span>`;
}
function lineHTML(li) { if (typeof li === "string") return md(li); return li.map((p) => (typeof p === "string" ? md(p) : doseHTML(p))).join(""); }
function tableHTML(t) {
  return `<div class="tbl-wrap sv-tbl"><table class="vt"><thead><tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function ettHTML() {
  if (AGE === null) return `<p class="sv-wnote">Informe a <b>idade</b> na barra do paciente para calcular tubo e profundidade.</p>`;
  if (AGE < 1) return `<div class="sv-ett"><div>Tubo com cuff: 3,0–3,5 mm</div><div>Profundidade: ~9–10,5 cm</div><div>Lâmina reta 0–1</div></div>`;
  const cuff = Math.round((AGE / 4 + 3.5) * 2) / 2, semc = Math.round((AGE / 4 + 4) * 2) / 2;
  return `<div class="sv-ett"><div>Com cuff: ${nf(cuff)} mm</div><div>Sem cuff: ${nf(semc)} mm</div><div>Profundidade: ${nf(cuff * 3)} cm no lábio</div><div>Ter à mão: ${nf(cuff - 0.5)} e ${nf(cuff + 0.5)}</div></div>`;
}
function wnote(){ return W ? `<p class="sv-wnote">Doses calculadas para <b>${nf(W)} kg</b>${AGE !== null ? ` · <b>${nf(AGE)} ano(s)</b>` : ""} (barra do paciente). Confira sempre a concentração do frasco disponível.</p>` : `<p class="sv-wnote">Digite o <b>peso</b> na barra do paciente para ver as doses em mg e mL.</p>`; }
function topicHTML(t) {
  let h = `<div class="sv-kick">${esc(t.cat)}</div><div class="dx-title"><span class="sv-dot c-${t.cor}"></span>${esc(t.title)}</div>`;
  h += `<p class="sv-lead">${md(t.resumo)}</p>` + wnote();
  for (const s of t.secs) {
    h += `<section class="sv-s"><h4>${esc(s.h)}</h4>`;
    if (s.li) h += `<ul>${s.li.map((l) => `<li>${lineHTML(l)}</li>`).join("")}</ul>`;
    if (s.table) h += tableHTML(s.table);
    h += `</section>`;
  }
  if (t.id === "iot") h += `<section class="sv-s"><h4>Tubo para esta criança</h4>${ettHTML()}</section>`;
  for (const r of t.rx) h += `<div class="opt sv-rx"><div class="opt-h"><h4>${esc(r.h)}</h4><span class="src">prescrição</span></div><ol>${r.li.map((l) => `<li>${lineHTML(l)}</li>`).join("")}</ol></div>`;
  const fs = (t.fontes || []).map((k) => REFS[k]).filter(Boolean);
  if (fs.length) h += `<div class="sv-src"><b>Fontes:</b> ${fs.map(([n, u]) => (u ? `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>` : esc(n))).join(" · ")}</div>`;
  h += `<p class="disclaimer">Material de apoio para consulta rápida. Confira doses, diluições e protocolos do seu serviço antes de prescrever.</p>`;
  return h;
}
const QUICK = [
  ["Adrenalina PCR (0,1 mg/mL)", D(0.01, "mg", { max: 1, c: 0.1 }), "IV/IO a cada 3–5 min"],
  ["Adrenalina IM anafilaxia (1 mg/mL)", D(0.01, "mg", { max: 0.5, amax: { age: 12, below: 0.3 }, c: 1 }), "coxa; máx. 0,3 mg (<12 a) / 0,5 mg (≥12 a)"],
  ["Choque desfibrilação", D(2, "J", {}), "depois 4 J/kg"],
  ["Amiodarona (50 mg/mL)", D(5, "mg", { max: 300, c: 50 }), "FV/TV sem pulso"],
  ["Adenosina (3 mg/mL)", D(0.1, "mg", { max: 6, c: 3 }), "2ª: 0,2 mg/kg"],
  ["Atropina (0,25 mg/mL)", D(0.02, "mg", { max: 0.5, c: 0.25 }), ""],
  ["Cetamina (50 mg/mL)", D(1.5, "mg", { max: 150, c: 50 }), "indução"],
  ["Etomidato (2 mg/mL)", D(0.3, "mg", { max: 20, c: 2 }), "indução"],
  ["Fentanil (50 mcg/mL)", D(1, "mcg", { max: 100, c: 50 }), "1–2 mcg/kg"],
  ["Midazolam (5 mg/mL)", D(0.2, "mg", { max: 10, c: 5 }), "convulsão IM/IN/IV"],
  ["Rocurônio (10 mg/mL)", D(1.2, "mg", { max: 100, c: 10 }), ""],
  ["Succinilcolina (10 mg/mL)", D(2, "mg", { max: 150, c: 10 }), ""],
  ["Diazepam IV (5 mg/mL)", D(0.3, "mg", { max: 10, c: 5 }), ""],
  ["Levetiracetam (100 mg/mL)", D(60, "mg", { max: 4500, c: 100 }), "em 15 min"],
  ["Fenitoína (50 mg/mL)", D(20, "mg", { max: 1500, c: 50 }), "≤1 mg/kg/min"],
  ["Fenobarbital (100 mg/mL)", D(20, "mg", { max: 1000, c: 100 }), "em 20 min"],
  ["Glicose 10%", D(2, "mL", { vol: true, max: 250 }), "hipoglicemia"],
  ["Bolus de cristaloide", D(20, "mL", { vol: true, max: 1000 }), "10–20 mL/kg"],
  ["Sulfato de magnésio 50%", D(50, "mg", { max: 2000, c: 500 }), "asma, em 20 min"],
  ["Dexametasona (4 mg/mL)", D(0.6, "mg", { max: 10, c: 4 }), "crupe"],
  ["Ceftriaxona (meningite)", D(50, "mg", { max: 2000 }), "12/12h"],
  ["Naloxona (0,4 mg/mL)", D(0.1, "mg", { max: 2, c: 0.4 }), ""],
  ["NaCl 3%", D(4, "mL", { vol: true, max: 250 }), "HIC"],
  ["Manutenção (Holliday)", D(4, "mL/h", { holliday: true }), ""],
];
function quickHTML() {
  return `<div class="sv-kick">Consulta rápida</div><div class="dx-title">Doses de emergência por peso</div>${wnote()}<div class="tbl-wrap sv-tbl"><table class="vt"><thead><tr><th>Droga</th><th>Dose</th><th>Obs.</th></tr></thead><tbody>${QUICK.map(([n, d, o]) => `<tr><td><b>${esc(n)}</b></td><td>${doseHTML(d)}</td><td>${esc(o)}</td></tr>`).join("")}</tbody></table></div>`;
}
const CATS = [...new Set(TOPICS.map((t) => t.cat))];
let current = "tabela";
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function navHTML(filter) {
  const f = norm(filter || "");
  const match = (t) => !f || norm(t.title + " " + t.alias.join(" ")).includes(f);
  let h = `<button class="dx-btn" type="button" data-sv="tabela" aria-current="${current === "tabela"}"><span class="dot" style="background:var(--danger)"></span>Tabela rápida de doses</button>`;
  for (const c of CATS) {
    const ts = TOPICS.filter((t) => t.cat === c && match(t));
    if (!ts.length) continue;
    h += `<div class="dx-group">${esc(c)}</div>` + ts.map((t) => `<button class="dx-btn" type="button" data-sv="${t.id}" aria-current="${current === t.id}"><span class="dot c-${t.cor}"></span>${esc(t.title)}</button>`).join("");
  }
  return h;
}
function readPt(){ const p = pt(); W = p.wReal > 0 && p.wReal < 200 ? p.wReal : null; AGE = $('ptAgeVal').value === '' ? null : p.a; }
function render(){
  readPt();
  $('svNav').innerHTML = navHTML($('svSearch').value);
  $('svMain').innerHTML = current === "tabela" ? quickHTML() : topicHTML(TOPICS.find((t) => t.id === current) || TOPICS[0]);
}
function go(id){ current = id; try { store.set('dc_sv_topic', id); } catch(e){} render(); }
function estimar(){
  readPt(); if (AGE === null) { $('ptAgeVal').focus(); return null; }
  const w = AGE < 1 ? 0.5 * (AGE * 12) + 4 : AGE <= 5 ? 2 * AGE + 8 : 3 * AGE + 7;
  return Math.round(w * 10) / 10;
}
function init(){ const s = store.get('dc_sv_topic'); if (s && (s === 'tabela' || TOPICS.some(t => t.id === s))) current = s; }
return { render, go, estimar, init, navOnly: () => { $('svNav').innerHTML = navHTML($('svSearch').value); }, count: TOPICS.length };

})();
