// Modelos de prontuário de puericultura — portado de "Modelos-Prontuario-Puericultura" (set/2026), padrão DoseCerta.
// Sexo vem da barra do paciente; idade da consulta é escolhida automaticamente pela idade (pode trocar).
const MOD = (function(){
/* ---------- blocos compartilhados ---------- */
const VITD400 = "Colecalciferol (vitamina D3) solução oral ___ UI/gota — dar ___ gotas (= 400 UI) VO 1x/dia, uso contínuo. [ex.: 200 UI/gota = 2 gotas]";
const VITD600 = "Colecalciferol (vitamina D3) solução oral ___ UI/gota — dar ___ gotas (= 600 UI) VO 1x/dia, uso contínuo. [ex.: 200 UI/gota = 3 gotas]";
const FERRO_CICLO = (ini, fim) => `Sulfato ferroso solução oral 25 mg/mL de Fe elementar (1 gota ≈ 1,25 mg) — dar 8 a 10 gotas (10–12,5 mg) VO 1x/dia, longe do leite, por 3 meses (${ini} → ${fim}).`;
const FERRO_PT = "Sulfato ferroso solução oral 25 mg/mL de Fe elementar (1 gota ≈ 1,25 mg) — dar ___ gotas VO 1x/dia (___ mg/kg/dia: 2 mg/kg se PN 1.500–2.500 g; 3 mg/kg se 1.000–1.500 g; 4 mg/kg se <1.000 g), até 12 meses; depois 1 mg/kg/dia até 24 meses.";
const PARACET = "Paracetamol solução oral 200 mg/mL — dar ___ gotas (1 gota/kg/dose; máx. 35 gotas) VO se febre ≥37,8 °C ou dor após a vacina, com intervalo mínimo de 6 h.";

const G = {
  lact: {
    M: "Genitália: típica masculina; testículos tópicos e de volume habitual bilateralmente; meato uretral tópico; fimose fisiológica (não retrair); sem hérnias inguinais ou hidrocele.",
    F: "Genitália: típica feminina; pequenos e grandes lábios sem alterações; sem sinéquias, secreção ou lesões; regiões inguinais sem hérnias."
  },
  rn: {
    M: "Genitália: típica masculina; testículos tópicos bilateralmente; meato uretral tópico; fimose fisiológica; bolsa escrotal sem hidrocele; sem hérnias inguinais.",
    F: "Genitália: típica feminina; pequenos lábios e clitóris sem alterações; sem sinéquias; secreção vaginal esbranquiçada fisiológica ___ (ausente/presente)."
  },
  esc: {
    M: "Genitália: típica masculina; testículos tópicos, volume ___ mL (orquidômetro); prepúcio ___ (retrátil/fimose); sem hérnias. Tanner G___P___.",
    F: "Genitália típica feminina, sem sinéquias ou secreção. Mamas e pelos: Tanner M___P___."
  }
};

const ANTRO_L = "Peso: ___ g (z ___) | Comprimento: ___ cm (z ___) | PC: ___ cm (z ___) | P/C: z ___ | IMC: ___ (z ___)";
const ANTRO_E = "Peso: ___ kg (z ___) | Estatura: ___ cm (z ___) | IMC: ___ kg/m² (z ___)";
const SV = "FC: ___ bpm | FR: ___ irpm | Tax: ___ °C";
const PA = "PA: ___ x ___ mmHg (percentil ___ para sexo, idade e estatura)";

const GERAL = "Geral: BEG, ativo(a) e reativo(a), corado(a), hidratado(a), acianótico(a), anictérico(a), afebril, eupneico(a).";
const AR = "AR: tórax simétrico, sem retrações; MV presente bilateralmente, sem ruídos adventícios.";
const ACV_L = "ACV: RCR em 2T, BNF, sem sopros; pulsos braquiais e femorais palpáveis e simétricos; TEC <2 s.";
const ACV_E = "ACV: RCR em 2T, BNF, sem sopros; pulsos periféricos palpáveis e simétricos; TEC <2 s.";
const ABD = "Abdome: plano/globoso, flácido, indolor, sem visceromegalias ou massas palpáveis; cicatriz umbilical sem hérnia ou granuloma.";
const ANUS = "Ânus: tópico, pérvio, sem fissuras.";
const COLUNA = "Coluna: linha média lombossacra sem fosseta, tufo piloso ou lesões.";
const OTO = "Otoscopia: membranas timpânicas íntegras e translúcidas bilateralmente.";
const ORO = "Oroscopia: mucosa úmida e corada, orofaringe sem alterações.";
const OLHOS_L = "Olhos: reflexo vermelho presente e simétrico bilateralmente; reflexo fotomotor presente; Hirschberg centrado; cover test sem desvio; sem secreção.";
const OLHOS_E = "Olhos: reflexo vermelho presente e simétrico; Hirschberg centrado; cover test sem desvio. Acuidade visual: OD ___ | OE ___ (tabela ___).";

const ORI_SEMPRE = [
  "Manter caderneta da criança sempre nas consultas e vacinas."
];

/* ---------- idades ---------- */
const AGES = [
{ id:"rn", label:"1ª sem", title:"1ª semana", sub:"Primeira consulta do RN · idealmente 3º–5º dia",
  exam:(s)=>[
  "EXAME FÍSICO",
  ANTRO_L,
  "Peso ao nascer: ___ g | Variação: ___% do PN (esperado: perda ≤10%, recuperar até 10–15 dias)",
  SV,
  "Geral: BEG, ativo e reativo ao manuseio, choro forte, postura em flexão generalizada, corado, hidratado, acianótico, anictérico (se ictérico: zona ___ de Kramer), afebril, eupneico.",
  "Pele: íntegra; ___ (eritema tóxico / milium / mancha mongólica em ___ — achados fisiológicos).",
  "Cabeça: normocefálica; fontanela anterior normotensa (___ x ___ cm); fontanela posterior ___; suturas sem cavalgamento; sem bossa ou cefalematoma.",
  "Olhos: reflexo vermelho presente e simétrico bilateralmente; reflexo fotomotor presente; sem secreção.",
  "Orelhas: implantação e forma habituais. Nariz: pérvio, sem secreção.",
  "Boca: palato íntegro; freio lingual sem alterações; sem monilíase; sucção eficaz.",
  "Pescoço: sem massas; ECM sem nodulações; clavículas íntegras, sem crepitação.",
  AR,
  ACV_L,
  "Abdome: globoso, flácido, sem visceromegalias ou massas; coto umbilical ___ (mumificado/caído), sem hiperemia periumbilical, secreção ou odor.",
  G.rn[s],
  ANUS,
  COLUNA,
  "Membros: simétricos, sem deformidades; Ortolani e Barlow negativos bilateralmente; pés sem deformidades estruturais.",
  "Neurológico: tônus em semiflexão; reflexos primitivos presentes e simétricos (sucção, busca, preensão palmar e plantar, Moro, marcha reflexa).",
  "",
  "DESENVOLVIMENTO (0–1 m): postura flexora, observa um rosto, reage ao som. Classificação: desenvolvimento adequado.",
  "TRIAGENS NEONATAIS: pezinho ___ | orelhinha ___ | olhinho ___ | coraçãozinho ___ | linguinha ___",
  "Mamada observada: pega ___, posição ___, sucção ___."
  ],
  presc:[ VITD400 ],
  vac:"BCG e hepatite B ___ (aplicadas na maternidade, conferido na caderneta / encaminhado à sala de vacina). Mãe vacinada contra VSR na gestação: ___.",
  ori:[
  "Aleitamento materno exclusivo em livre demanda (8–12 mamadas/dia). Não oferecer água, chás ou outros leites. Revisadas pega e posição.",
  "Sono seguro: bebê de barriga para cima, em berço próprio no quarto dos pais, sem travesseiro, protetores ou objetos soltos.",
  "Coto umbilical: limpar com álcool 70% após o banho; não usar faixas, moedas ou pomadas. Costuma cair até ~15 dias.",
  "Banho com água morna; testar a temperatura antes. Evitar fumo no domicílio; higiene das mãos das visitas.",
  "Transporte sempre em bebê-conforto voltado para trás, no banco traseiro.",
  "Nunca sacudir o bebê.",
  "Observar a cor das fezes com o cartão da caderneta (fezes claras = procurar atendimento).",
  "SINAIS DE ALERTA (procurar atendimento imediatamente): dificuldade para mamar, vômitos em tudo, febre ≥37,5 °C ou temperatura baixa, respiração rápida ou com esforço, gemência, pele amarelada abaixo do umbigo, fezes claras, umbigo vermelho ou com secreção, sonolência excessiva, convulsão."
  ],
  enc:[
  "Solicito coleta do teste do pezinho (não realizado / 2ª amostra).",
  "Encaminho para triagem auditiva (EOA/PEATE): teste da orelhinha não realizado / falha em ___.",
  "Encaminho à oftalmologia pediátrica COM URGÊNCIA: reflexo vermelho ___ (ausente/assimétrico/leucocoria) em ___.",
  "Encaminho à cardiologia pediátrica + solicito ecocardiograma: ___ (sopro / pulsos femorais diminuídos / teste do coraçãozinho alterado).",
  "Encaminho à ortopedia pediátrica + solicito USG de quadril: Ortolani/Barlow positivo à ___.",
  "Encaminho para avaliação de frênulo lingual (odontopediatria/fonoaudiologia): protocolo alterado.",
  "Solicito bilirrubina total e frações: icterícia zona ___ de Kramer.",
  "Indicação de nirsevimabe (SUS): prematuro ≤36s6d ___ / comorbidade ___ — encaminho à sala de vacina/referência.",
  "Encaminho ao apoio à amamentação (dificuldade de pega/fissuras) / psicologia (sinais de depressão pós-parto)."
  ],
  ret:"Retorno em 1 mês (consulta do 1º mês), ou antes se sinais de alerta."
},
{ id:"m1", label:"1 m", title:"1 mês", sub:"Amamentação, icterícia prolongada, humor materno",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L,
  "Ganho de peso: ___ g/dia desde a última consulta (esperado 25–35 g/dia; mínimo 20).",
  SV, GERAL,
  "Pele: íntegra, sem dermatite de fraldas ou lesões.",
  "Cabeça: normocefálica, sem plagiocefalia; fontanela anterior normotensa (___ x ___ cm).",
  "Olhos: reflexo vermelho presente e simétrico bilateralmente; fixa o olhar no rosto do examinador; sem secreção.",
  "Boca: sem monilíase; palato íntegro.",
  "Pescoço: ECM sem nodulações, rotação cervical livre e simétrica.",
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Quadril: Ortolani e Barlow negativos bilateralmente; pregas simétricas.",
  "Neurológico: tônus adequado; reflexos primitivos presentes e simétricos (Moro, preensão palmar e plantar, sucção, busca).",
  "",
  "DESENVOLVIMENTO (0–1 m): postura flexora, observa um rosto, reage ao som, eleva a cabeça em prono. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD400, "SE PREMATURO/BAIXO PESO: " + FERRO_PT ],
  vac:"Sem vacinas nesta idade. BCG e hepatite B conferidas na caderneta: ___.",
  ori:[
  "Manter aleitamento materno exclusivo em livre demanda.",
  "Sono seguro de barriga para cima; colocar de bruços apenas acordado e supervisionado (\"tempo de barriga\").",
  "Cólica do lactente é esperada até 3–4 meses: colo, contato pele a pele, massagem; não usar chás ou medicações sem orientação.",
  "Regurgitação após mamadas é comum; manter o bebê elevado após mamar.",
  "Nunca deixar o bebê sozinho no trocador ou na cama; nunca sacudir.",
  "Conversar, cantar e olhar para o bebê durante as mamadas.",
  "SINAIS DE ALERTA: pele amarelada persistente, fezes claras, não ganha peso, dificuldade para mamar, febre, respiração rápida, sonolência excessiva."
  ],
  enc:[
  "Solicito bilirrubina total e frações: icterícia persistente com >14 dias de vida.",
  "Encaminho para reteste auditivo (EOA/PEATE): triagem pendente/falha.",
  "Encaminho à fisioterapia: torcicolo congênito / plagiocefalia posicional.",
  "Encaminho ao apoio à amamentação: ganho ponderal insuficiente / dificuldade na pega.",
  "Encaminho à psicologia/saúde mental: rastreio positivo para depressão pós-parto."
  ],
  ret:"Retorno aos 2 meses (vacinas + consulta), ou antes se sinais de alerta."
},
{ id:"m2", label:"2 m", title:"2 meses", sub:"Primeiras vacinas do calendário",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, "Ganho de peso: ___ g/dia (esperado 25–30 g/dia).", SV, GERAL,
  "Pele: íntegra; hemangiomas ___ (ausentes / presentes em ___, ___ cm).",
  "Cabeça: normocefálica; fontanela anterior normotensa (___ x ___ cm); fontanela posterior fechada.",
  "Olhos: reflexo vermelho presente e simétrico bilateralmente; fixa e segue objetos.",
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Quadril: Ortolani e Barlow negativos; abdução simétrica.",
  "Neurológico: tônus e movimentação ativa simétricos; reflexos primitivos presentes e simétricos.",
  "",
  "DESENVOLVIMENTO (1–2 m): sorriso social, abre as mãos, emite sons, movimenta ativamente os membros. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD400, PARACET ],
  vac:"Encaminhado à sala de vacina: pentavalente D1, VIP D1, rotavírus D1, pneumocócica 20 D1. Próxima: meningocócica C D1 aos 3 meses.",
  ori:[
  "Manter aleitamento materno exclusivo. Retorno ao trabalho: orientadas ordenha e armazenamento do leite.",
  "Reações vacinais esperadas: febre baixa, dor e vermelhidão local por 24–48 h; usar antitérmico prescrito se necessário.",
  "Sono seguro; tempo de barriga acordado.",
  "Conversar, cantar, contato olho no olho; oferecer objetos coloridos.",
  "Prevenção de quedas: não deixar sozinho em superfícies altas.",
  "SINAIS DE ALERTA: febre alta ou persistente após vacina, choro inconsolável por >3 h, moleza, cansaço/suor durante as mamadas, respiração rápida."
  ],
  enc:[
  "Encaminho à cirurgia pediátrica: hérnia inguinal ___ (à direita/esquerda).",
  "Encaminho à dermatologia pediátrica: hemangioma em localização de risco / crescimento rápido em ___.",
  "Encaminho à cardiologia pediátrica + ecocardiograma: sopro ___ / sinais de insuficiência cardíaca às mamadas.",
  "Encaminho à neuropediatria: ausência de sorriso social / assimetria de movimentos."
  ],
  ret:"Retorno aos 4 meses. Sala de vacina aos 3 meses (meningocócica C)."
},
{ id:"m4", label:"4 m", title:"4 meses", sub:"Controle cefálico · olhos e quadril com novos testes",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, "Ganho de peso: ___ g/dia (esperado ~20 g/dia).", SV, GERAL,
  "Cabeça: normocefálica, sem plagiocefalia; fontanela anterior normotensa (___ x ___ cm).",
  OLHOS_L,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Quadril: abdução simétrica e sem limitação; pregas simétricas; Galeazzi negativo.",
  "Neurológico: controle cefálico completo (sem queda da cabeça na manobra de tração); mãos abertas; tônus normal; Moro e RTCA em desaparecimento.",
  "",
  "DESENVOLVIMENTO (2–4 m): resposta ativa ao contato social, segura objetos, ri alto, de bruços levanta a cabeça apoiando-se nos antebraços. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD400, "SE FATOR DE RISCO (ex.: uso de leite de vaca): " + FERRO_CICLO("4 m","7 m"), PARACET ],
  vac:"Encaminhado à sala de vacina: pentavalente D2, VIP D2, rotavírus D2, pneumocócica D2 (VPC10/VPC20 conforme disponibilidade). Meningocócica C D1 (3 m) conferida: ___. Próxima: meningocócica C D2 aos 5 meses.",
  ori:[
  "Manter aleitamento materno exclusivo até 6 meses; não introduzir outros alimentos antes disso.",
  "Criança começa a rolar: nunca deixar sozinha em cama, sofá ou trocador.",
  "Manter objetos pequenos, sacolas plásticas e cordões fora do alcance.",
  "Estimular: brinquedos coloridos e sonoros, tempo de barriga, conversar.",
  "Evitar telas (TV, celular, tablet) antes dos 2 anos.",
  "SINAIS DE ALERTA: não sustenta a cabeça, mãos sempre fechadas, não sorri ou não acompanha objetos, olho desviado constante."
  ],
  enc:[
  "Encaminho à oftalmologia pediátrica: estrabismo ___ (Hirschberg descentrado / cover test com desvio).",
  "Encaminho à ortopedia pediátrica + USG/RX de quadril: limitação da abdução / Galeazzi positivo à ___.",
  "Encaminho à neuropediatria + estimulação precoce: ausência de controle cefálico / hipertonia / persistência de reflexos primitivos.",
  "Testículo não palpável na bolsa: reavaliar aos 6 meses (encaminhar se persistir)."
  ],
  ret:"Retorno aos 6 meses. Sala de vacina aos 5 meses (meningocócica C D2)."
},
{ id:"m6", label:"6 m", title:"6 meses", sub:"Introdução alimentar · ferro · testículos",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, SV, GERAL,
  "Cabeça: normocefálica; fontanela anterior normotensa (___ x ___ cm).",
  OLHOS_L,
  "Boca: ___ dentes (esperado início ~6 m); gengivas e mucosa sem alterações; sem manchas brancas.",
  OTO,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Quadril: abdução simétrica sem limitação; Galeazzi negativo.",
  "Neurológico: senta com apoio; Moro e preensão palmar ausentes; tônus normal.",
  "",
  "DESENVOLVIMENTO (4–6 m): busca ativa de objetos, leva objetos à boca, localiza o som, rola. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD400, FERRO_CICLO("6 m","9 m") + " Após, pausa de 3 meses; ciclo II aos 12 m.",
  "Vitamina A 100.000 UI VO, dose única, administrada na unidade (se área de risco do programa).", PARACET ],
  vac:"Encaminhado à sala de vacina: pentavalente D3, VIP D3, COVID-19 D1, influenza (1ª vez: 2 doses com 30 dias). Meningocócica C D2 (5 m) conferida: ___. Próxima: COVID-19 D2 aos 7 meses.",
  ori:[
  "Introdução alimentar: manter leite materno + 3 refeições (almoço ou jantar + 2 lanches de fruta). Prato com cereal ou tubérculo, feijão, legumes/verduras e carne ou ovo.",
  "Comida amassada com garfo (nunca liquidificada ou peneirada); oferecer água potável nos intervalos.",
  "Não oferecer açúcar até 2 anos, mel até 1 ano, nem ultraprocessados (biscoitos, embutidos, sucos de caixa, refrigerante).",
  "Prevenção de engasgo: criança sentada e supervisionada; evitar uva inteira, pipoca, castanhas e pedaços duros.",
  "Primeiro dente: escovar 2x/dia com escova macia e creme dental com flúor (≥1.000 ppm) na quantidade de um grão de arroz. Agendar consulta odontológica.",
  "Não usar andador. Proteger tomadas e evitar quedas.",
  "SINAIS DE ALERTA: não rola, não busca objetos, não vira para o som, perda de habilidades já adquiridas."
  ],
  enc:[
  "Encaminho à cirurgia pediátrica/urologia pediátrica: testículo não palpável na bolsa escrotal à ___ aos 6 meses.",
  "Encaminho à odontologia: primeira consulta odontológica.",
  "Encaminho à nutrição: dificuldade na introdução alimentar / ganho ponderal inadequado.",
  "Encaminho à neuropediatria + estimulação precoce: marcos ausentes para a faixa anterior."
  ],
  ret:"Retorno aos 9 meses. Sala de vacina aos 7 meses (COVID-19 D2)."
},
{ id:"m9", label:"9 m", title:"9 meses", sub:"Senta sem apoio · febre amarela · acidentes",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, SV, GERAL,
  "Cabeça: fontanela anterior normotensa (___ x ___ cm).",
  OLHOS_L,
  "Boca: ___ dentes, sem manchas brancas ou cáries.",
  OTO, ORO,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Quadril: abdução simétrica; Galeazzi negativo.",
  "Neurológico: senta sem apoio; reação de paraquedas presente; pinça em formação; uso simétrico das mãos.",
  "",
  "DESENVOLVIMENTO (6–9 m): brinca de esconde-achou, transfere objetos entre as mãos, duplica sílabas, senta sem apoio. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD400, "Sulfato ferroso: encerrado o ciclo I aos 9 meses — pausa até 12 meses (prematuro/baixo peso: manter dose por kg sem pausa).", PARACET ],
  vac:"Encaminhado à sala de vacina: febre amarela D1, COVID-19 D3. COVID-19 D2 (7 m) conferida: ___. Influenza conforme campanha.",
  ori:[
  "Manter leite materno + almoço, jantar e 2 lanches de fruta. Alimentos picados, desfiados, em pedaços macios para pegar com a mão.",
  "Criança engatinha: proteger escadas, tomadas e quinas; produtos de limpeza e medicamentos trancados e fora do alcance.",
  "Afogamento: nunca deixar sozinha no banho; esvaziar baldes e bacias; piscinas cercadas.",
  "Estranhar pessoas desconhecidas é esperado nesta idade.",
  "Ler, nomear objetos e conversar; evitar telas.",
  "SINAIS DE ALERTA: não senta sem apoio, não balbucia sílabas, não responde ao nome, usa só uma das mãos."
  ],
  enc:[
  "Encaminho à neuropediatria + estimulação precoce: não senta sem apoio / assimetria / preferência manual precoce.",
  "Encaminho à audiologia (audiometria/PEATE) e fonoaudiologia: não balbucia / não reage a sons.",
  "Encaminho à odontologia: manchas brancas / cárie precoce."
  ],
  ret:"Retorno aos 12 meses."
},
{ id:"m12", label:"12 m", title:"12 meses", sub:"Comida da família · ciclo II de ferro",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, SV, GERAL,
  "Cabeça: fontanela anterior ___ (normotensa ___ cm / fechada).",
  OLHOS_L,
  "Boca: ___ dentes, sem cáries ou manchas brancas.",
  OTO, ORO,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Membros: geno varo fisiológico; pés planos flexíveis; quadril sem limitação.",
  "Neurológico: fica em pé com apoio, anda com apoio; pinça polpa a polpa; tônus normal.",
  "",
  "DESENVOLVIMENTO (9–12 m): imita gestos, faz pinça, produz jargão, anda com apoio. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD600, FERRO_CICLO("12 m","15 m"),
  "SE FATOR DE RISCO (prematuridade, baixo peso, falha da profilaxia, alimentação ou crescimento inadequados): solicito hemograma completo, ferritina sérica e PCR." ],
  vac:"Encaminhado à sala de vacina: pneumocócica 20 (reforço), meningocócica ACWY, tríplice viral D1.",
  ori:[
  "Criança passa a comer a comida da família: café da manhã, lanche, almoço, lanche da tarde e jantar; manter leite materno.",
  "Leite de vaca integral só a partir de agora, sem excesso; evitar mamadeira noturna (risco de cárie).",
  "Sem açúcar até 2 anos; sem ultraprocessados; água ao longo do dia.",
  "Queimaduras: cabo de panela voltado para dentro, criança longe do fogão e de líquidos quentes. Janelas e sacadas com tela.",
  "Intoxicações: medicamentos e produtos de limpeza trancados, nunca em garrafas de refrigerante.",
  "Escovação 2x/dia com creme dental com flúor (grão de arroz).",
  "SINAIS DE ALERTA: não fica em pé com apoio, não aponta, não imita, não fala sílabas, perda de habilidades."
  ],
  enc:[
  "Encaminho à odontologia: ausência de erupção dentária aos 12–13 meses / cárie.",
  "Encaminho à neuropediatria: não fica em pé com apoio / regressão do desenvolvimento.",
  "Encaminho à fonoaudiologia + audiometria: ausência de balbucio/jargão."
  ],
  ret:"Retorno aos 15 meses (vacinas + consulta)."
},
{ id:"m15", label:"15 m", title:"15 meses", sub:"Marcha independente · reforços vacinais",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, SV, GERAL,
  "Cabeça: fontanela anterior ___ (fechada/em fechamento).",
  OLHOS_L,
  "Boca: ___ dentes, sem cáries.",
  OTO, ORO,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Membros e marcha: marcha independente com base alargada; geno varo fisiológico.",
  "",
  "DESENVOLVIMENTO (12–15 m): mostra o que quer, coloca blocos na caneca, diz uma palavra, anda sem apoio. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD600, "Sulfato ferroso: encerrado o ciclo II aos 15 meses (prematuro/baixo peso: manter 1 mg/kg/dia até 24 meses).", PARACET ],
  vac:"Encaminhado à sala de vacina: DTP (1º reforço), VIP (1º reforço), tetraviral (tríplice viral D2 + varicela D1), hepatite A.",
  ori:[
  "Comida da família com 5–6 refeições; manter leite materno.",
  "Birras são esperadas: manter calma, rotina e limites consistentes.",
  "Prevenção de quedas (escadas, janelas) e afogamentos (piscinas, baldes).",
  "Calçado apenas para proteção; andar descalço em casa é benéfico.",
  "SINAIS DE ALERTA: não anda com apoio, não fala nenhuma palavra, não aponta, pouco contato visual."
  ],
  enc:[
  "Encaminho à ortopedia pediátrica: marcha na ponta dos pés persistente / claudicação.",
  "Encaminho à fonoaudiologia + audiometria: ausência de palavras."
  ],
  ret:"Retorno aos 18 meses."
},
{ id:"m18", label:"18 m", title:"18 meses", sub:"Linguagem · M-CHAT-R/F",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_L, SV, GERAL,
  OLHOS_L,
  "Boca: ___ dentes, sem cáries.",
  OTO, ORO,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Membros e marcha: marcha estável, anda para trás; geno varo fisiológico.",
  "",
  "DESENVOLVIMENTO (15–18 m): usa colher ou garfo, torre de 2 cubos, fala 3 palavras, anda para trás. Classificação: desenvolvimento adequado.",
  "M-CHAT-R/F: ___ pontos (0–2 baixo risco / 3–7 entrevista de seguimento / ≥8 alto risco)."
  ],
  presc:[ VITD600, "Sulfato ferroso apenas se prematuro/baixo peso: 1 mg/kg/dia até 24 meses." ],
  vac:"Sem vacinas de rotina nesta idade. Caderneta conferida: ___ (em dia / atualizar ___).",
  ori:[
  "Estimular linguagem: ler, nomear objetos, conversar, cantar.",
  "Evitar telas antes dos 2 anos, inclusive nas refeições.",
  "Sono de 11–14 h/dia com rotina fixa.",
  "Prevenção de afogamento, intoxicação e queimaduras.",
  "SINAIS DE ALERTA: não fala 3 palavras, não aponta para mostrar algo, não responde ao nome, perda de habilidades."
  ],
  enc:[
  "M-CHAT-R/F positivo (___ pontos): encaminho para avaliação diagnóstica de TEA (neuropediatria/CER) e início de intervenção precoce com fonoaudiologia, terapia ocupacional e psicologia.",
  "Encaminho à fonoaudiologia + audiometria: atraso de linguagem expressiva.",
  "Encaminho à neuropediatria: não anda / regressão do desenvolvimento."
  ],
  ret:"Retorno aos 24 meses."
},
{ id:"m24", label:"24 m", title:"24 meses", sub:"Estatura em pé · IMC · 2º M-CHAT",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_E + " | PC: ___ cm (z ___)",
  "(estatura medida em pé; se deitado, descontar 0,7 cm)",
  SV, GERAL,
  OLHOS_L,
  "Boca: ___ dentes, sem cáries; amígdalas sem hipertrofia.",
  OTO,
  AR, ACV_L, ABD, G.lact[s], ANUS, COLUNA,
  "Membros e marcha: corre com equilíbrio; joelhos ___ (varo/retos/valgo fisiológico); pés planos flexíveis.",
  "",
  "DESENVOLVIMENTO (18–24 m): tira a roupa, torre de 3 cubos, aponta 2 figuras, chuta bola. Classificação: desenvolvimento adequado.",
  "M-CHAT-R/F: ___ pontos."
  ],
  presc:[ VITD600, "Sulfato ferroso: encerrado aos 24 meses (prematuro/baixo peso).",
  "Albendazol 400 mg (suspensão 40 mg/mL) — tomar 10 mL VO dose única (conforme protocolo municipal)." ],
  vac:"Sem vacinas de rotina. Influenza anual (6 m a 5 anos). Caderneta conferida: ___.",
  ori:[
  "Telas: no máximo 1 h/dia, com supervisão e conteúdo adequado; nunca nas refeições ou antes de dormir.",
  "Desfralde quando houver sinais de prontidão (avisa, fica seca por 2 h, interesse), sem pressão.",
  "Comida da família; limitar açúcar e ultraprocessados; leite sem excesso.",
  "Escovação supervisionada 2x/dia com creme dental com flúor; consulta odontológica a cada 6 meses.",
  "Cadeirinha no banco traseiro; atenção a piscinas e janelas.",
  "SINAIS DE ALERTA: não forma frases de 2 palavras, não corre, não entende ordens simples, perda de linguagem."
  ],
  enc:[
  "M-CHAT-R/F positivo: encaminho para avaliação diagnóstica de TEA e intervenção precoce.",
  "Encaminho à nutrição: IMC z ___ (risco de sobrepeso >+1 / sobrepeso >+2 / magreza <−2).",
  "Encaminho à fonoaudiologia + audiometria: ausência de frases de 2 palavras.",
  "Encaminho à odontologia: consulta de rotina / cárie."
  ],
  ret:"Retorno aos 3 anos (ou 30 meses, conforme o serviço)."
},
{ id:"a3", label:"3 a", title:"3 anos", sub:"PA anual · primeira acuidade visual",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_E, PA, SV, GERAL,
  OLHOS_E,
  "Boca: dentição decídua completa, sem cáries; amígdalas grau ___.",
  OTO,
  AR, ACV_E, ABD, G.lact[s], ANUS, COLUNA,
  "Membros e marcha: marcha e corrida sem alterações; geno valgo fisiológico; pés planos flexíveis.",
  "",
  "DESENVOLVIMENTO (30–36 m): brinca com outras crianças, imita linha, reconhece 2 ações, arremessa bola. Fala compreensível. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD600 ],
  vac:"Sem vacinas de rotina. Influenza anual. Próximas vacinas aos 4 anos. Caderneta conferida: ___.",
  ori:[
  "Telas no máximo 1 h/dia, supervisionadas; sem telas 1 h antes de dormir.",
  "Sono de 10–13 h/dia com rotina.",
  "3 refeições + 2 lanches com a comida da família; evitar bebidas açucaradas e ultraprocessados.",
  "Brincar ativo e ao ar livre todos os dias.",
  "Segurança: cadeirinha no banco traseiro, mão dada no trânsito, afogamento, produtos tóxicos trancados.",
  "Ensinar sobre partes íntimas do corpo e que ninguém pode tocá-las.",
  "Escovação supervisionada e dentista a cada 6 meses."
  ],
  enc:[
  "Encaminho à oftalmologia: acuidade visual reduzida (OD ___ / OE ___) / estrabismo.",
  "Encaminho à otorrinolaringologia: ronco com pausas respiratórias / respiração oral / hipertrofia amigdaliana.",
  "Encaminho à fonoaudiologia: fala pouco compreensível para estranhos.",
  "PA ≥P90: repetir em 6 meses; ≥P95: repetir em 1–2 semanas e investigar (nefrologia/cardiologia pediátrica).",
  "Encaminho à nutrição: IMC z ___ (sobrepeso/obesidade)."
  ],
  ret:"Retorno anual (4 anos), ou antes se necessário."
},
{ id:"a4", label:"4–5 a", title:"4 a 5 anos", sub:"Reforços dos 4 anos · visão · escola",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_E, PA, SV, GERAL,
  OLHOS_E,
  "Boca: dentes sem cáries; amígdalas grau ___.",
  OTO,
  AR, ACV_E, ABD, G.lact[s], ANUS, COLUNA,
  "Membros e marcha: sem alterações; pula em um pé; geno valgo fisiológico.",
  "",
  "DESENVOLVIMENTO (42–60 m): copia círculo e cruz, fala clara, pula em um pé, veste-se sem ajuda, define palavras, equilíbrio em um pé por ___ s. Classificação: desenvolvimento adequado."
  ],
  presc:[ VITD600, PARACET ],
  vac:"Encaminhado à sala de vacina (4 anos): DTP (2º reforço), VIP (2º reforço), varicela D2, febre amarela (reforço). Influenza anual até 5 anos 11 meses.",
  ori:[
  "Assento de elevação no banco traseiro até 10 anos ou 1,45 m de altura.",
  "Bicicleta com capacete; aulas de natação e supervisão constante na água.",
  "Telas no máximo 1 h/dia; sono de 10–13 h; atividade física diária.",
  "Escola: acompanhar aprendizagem, comportamento e possíveis situações de bullying.",
  "Enurese noturna pode ser normal até 5 anos.",
  "Escovação e dentista a cada 6 meses."
  ],
  enc:[
  "Encaminho à oftalmologia: acuidade <0,7 ou diferença ≥2 linhas entre os olhos.",
  "Encaminho à fonoaudiologia / psicopedagogia: dificuldade de fala ou aprendizagem.",
  "Encaminho à urologia/nefrologia pediátrica: enurese diurna / enurese após 5 anos com sintomas miccionais.",
  "Encaminho à otorrinolaringologia: ronco com apneia.",
  "PA ≥P90: seguir protocolo de reavaliação."
  ],
  ret:"Retorno anual."
},
{ id:"a6", label:"6–10 a", title:"6 a 10 anos", sub:"Consulta anual · escola, puberdade e risco cardiovascular",
  exam:(s)=>[
  "EXAME FÍSICO", ANTRO_E, "Circunferência abdominal: ___ cm (se excesso de peso)", PA, SV, GERAL,
  OLHOS_E,
  "Boca: dentição mista, sem cáries; oclusão ___.",
  OTO, "Pescoço: tireoide não palpável/sem nódulos; sem linfonodomegalias.",
  "Pele: sem acantose nigricans ou lesões.",
  AR, ACV_E, ABD, G.esc[s],
  "Coluna: teste de Adams negativo (sem giba); sem desvios laterais.",
  "Membros e marcha: sem alterações.",
  "",
  "DESENVOLVIMENTO: desempenho escolar ___; socialização adequada; sem queixas comportamentais."
  ],
  presc:[ VITD600,
  "SE 9–11 ANOS (ou 2–8 anos com fator de risco): solicito perfil lipídico (colesterol total, HDL, LDL, não-HDL, triglicerídeos)." ],
  vac:"HPV dose única (9–14 anos) ___; meningocócica ACWY (11–14 anos) ___; dengue (Qdenga, 10–14 anos, municípios prioritários) ___. Conferir atrasos (febre amarela, tríplice viral, varicela).",
  ori:[
  "Transporte: banco traseiro com dispositivo de retenção até 10 anos ou 1,45 m.",
  "Telas no máximo 1–2 h/dia supervisionadas; sem telas 1 h antes de dormir; supervisão da internet (cyberbullying).",
  "Sono de 9–12 h por noite.",
  "Atividade física de pelo menos 1 h/dia.",
  "Café da manhã, lanche escolar saudável e água; limitar açúcar, ultraprocessados e fast food.",
  "Conversar sobre corpo, puberdade e prevenção de abuso.",
  "Dentista a cada 6 meses; protetor solar."
  ],
  enc:[
  "Encaminho à endocrinologia pediátrica: sinais puberais antes de 8 anos (menina) / 9 anos (menino) / baixa estatura (z <−2) ou queda de canal.",
  "Encaminho à ortopedia + solicito RX panorâmico de coluna: teste de Adams positivo.",
  "Encaminho à oftalmologia: acuidade visual reduzida.",
  "Encaminho à neuropediatria/psicologia/psicopedagogia: queixa escolar ou de atenção (SNAP-IV ___).",
  "Encaminho à nutrição: IMC z ___ (sobrepeso >+1 / obesidade >+2).",
  "PA ≥P90: seguir protocolo de reavaliação; ≥P95 persistente: investigar."
  ],
  ret:"Retorno anual."
}
];


/* ---------- exame físico enxuto ---------- */
const GS = {
  lact:{ M:"GENITÁLIA: TÍPICA MASCULINA, TESTÍCULOS TÓPICOS BILATERAIS, MEATO TÓPICO, FIMOSE FISIOLÓGICA, SEM HÉRNIAS/HIDROCELE.",
         F:"GENITÁLIA: TÍPICA FEMININA, SEM SINÉQUIAS OU SECREÇÃO, SEM HÉRNIAS." },
  esc:{ M:"GENITÁLIA: TÍPICA MASCULINA, TESTÍCULOS TÓPICOS, SEM HÉRNIAS. TANNER G___P___.",
        F:"GENITÁLIA: TÍPICA FEMININA, SEM ALTERAÇÕES. TANNER M___P___." }
};
const S_ANT_L = "PESO ___ G (Z ___) | COMP ___ CM (Z ___) | PC ___ CM (Z ___) | IMC Z ___ | FC ___ | FR ___ | TAX ___";
const S_ANT_E = "PESO ___ KG (Z ___) | EST ___ CM (Z ___) | IMC ___ (Z ___) | PA ___X___ MMHG (P___) | FC ___ | FR ___";
const S_GER = "BEG, ATIVO(A), CORADO(A), HIDRATADO(A), ACIANÓTICO(A), ANICTÉRICO(A), AFEBRIL, EUPNEICO(A).";
const S_CARD = "AR: MV+ BILATERAL, SEM RA. ACV: RCR 2T, BNF, SEM SOPROS, PULSOS FEMORAIS PALPÁVEIS, TEC <2 S.";
const S_ABD = "ABD: FLÁCIDO, INDOLOR, SEM VMG OU MASSAS.";
const S_OLHO = "OLHOS: RV PRESENTE E SIMÉTRICO BILATERAL, HIRSCHBERG CENTRADO, COVER TEST SEM DESVIO.";
const SHORT = {
 rn:(s)=>["EXAME FÍSICO", S_ANT_L, "PN ___ G | VARIAÇÃO ___% DO PN",
  "BEG, ATIVO E REATIVO, CHORO FORTE, POSTURA FLEXORA, CORADO, HIDRATADO, ACIANÓTICO, ANICTÉRICO (OU ICTÉRICO ZONA ___ KRAMER), AFEBRIL.",
  "CABEÇA: FA NORMOTENSA ___ X ___ CM, SEM BOSSA/CEFALEMATOMA. OLHOS: RV PRESENTE E SIMÉTRICO BILATERAL. BOCA: PALATO ÍNTEGRO, FREIO LINGUAL NORMAL. CLAVÍCULAS ÍNTEGRAS.",
  S_CARD,
  "ABD: FLÁCIDO, SEM VMG; COTO UMBILICAL ___ SEM SINAIS FLOGÍSTICOS.",
  s==="M" ? "GENITÁLIA: TÍPICA MASCULINA, TESTÍCULOS TÓPICOS BILATERAIS, MEATO TÓPICO. ÂNUS PÉRVIO." : "GENITÁLIA: TÍPICA FEMININA, SEM ALTERAÇÕES. ÂNUS PÉRVIO.",
  "COLUNA ÍNTEGRA. ORTOLANI E BARLOW NEGATIVOS. REFLEXOS PRIMITIVOS PRESENTES E SIMÉTRICOS.",
  "DNPM ADEQUADO (0–1 M). TRIAGENS: PEZINHO ___ | ORELHINHA ___ | OLHINHO ___ | CORAÇÃOZINHO ___ | LINGUINHA ___"],
 m1:(s)=>["EXAME FÍSICO", S_ANT_L, "GANHO ___ G/DIA", S_GER,
  "FA NORMOTENSA ___ CM. OLHOS: RV PRESENTE E SIMÉTRICO BILATERAL, FIXA O OLHAR. ECM SEM NODULAÇÕES.",
  S_CARD, S_ABD + " CICATRIZ UMBILICAL SEM GRANULOMA.", GS.lact[s],
  "ORTOLANI E BARLOW NEGATIVOS. REFLEXOS PRIMITIVOS PRESENTES E SIMÉTRICOS.",
  "DNPM ADEQUADO (0–1 M): POSTURA FLEXORA, OBSERVA ROSTO, REAGE AO SOM, ELEVA A CABEÇA."],
 m2:(s)=>["EXAME FÍSICO", S_ANT_L, "GANHO ___ G/DIA", S_GER,
  "FA NORMOTENSA ___ CM. OLHOS: RV PRESENTE E SIMÉTRICO BILATERAL, FIXA E SEGUE.",
  S_CARD, S_ABD, GS.lact[s],
  "ORTOLANI E BARLOW NEGATIVOS. TÔNUS E MOVIMENTAÇÃO SIMÉTRICOS.",
  "DNPM ADEQUADO (1–2 M): SORRISO SOCIAL, ABRE AS MÃOS, EMITE SONS, MOVIMENTA MEMBROS."],
 m4:(s)=>["EXAME FÍSICO", S_ANT_L, S_GER,
  "FA NORMOTENSA ___ CM. " + S_OLHO,
  S_CARD, S_ABD, GS.lact[s],
  "QUADRIL: ABDUÇÃO SIMÉTRICA, GALEAZZI NEGATIVO. CONTROLE CEFÁLICO COMPLETO, MÃOS ABERTAS.",
  "DNPM ADEQUADO (2–4 M): CONTATO SOCIAL ATIVO, SEGURA OBJETOS, RI ALTO, APOIA NOS ANTEBRAÇOS."],
 m6:(s)=>["EXAME FÍSICO", S_ANT_L, S_GER,
  "FA NORMOTENSA ___ CM. " + S_OLHO + " ___ DENTES. OTOSCOPIA NORMAL.",
  S_CARD, S_ABD, GS.lact[s],
  "QUADRIL: ABDUÇÃO SIMÉTRICA. SENTA COM APOIO; MORO AUSENTE.",
  "DNPM ADEQUADO (4–6 M): BUSCA OBJETOS, LEVA À BOCA, LOCALIZA O SOM, ROLA."],
 m9:(s)=>["EXAME FÍSICO", S_ANT_L, S_GER,
  "FA ___ CM. " + S_OLHO + " ___ DENTES SEM CÁRIES. OTOSCOPIA NORMAL.",
  S_CARD, S_ABD, GS.lact[s],
  "SENTA SEM APOIO, PARAQUEDAS PRESENTE, USO SIMÉTRICO DAS MÃOS.",
  "DNPM ADEQUADO (6–9 M): ESCONDE-ACHOU, TRANSFERE OBJETOS, DUPLICA SÍLABAS, SENTA SEM APOIO."],
 m12:(s)=>["EXAME FÍSICO", S_ANT_L, S_GER,
  "FA ___ (___ CM/FECHADA). " + S_OLHO + " ___ DENTES SEM CÁRIES. OTOSCOPIA NORMAL.",
  S_CARD, S_ABD, GS.lact[s],
  "GENO VARO FISIOLÓGICO. ANDA COM APOIO, PINÇA PRESENTE.",
  "DNPM ADEQUADO (9–12 M): IMITA GESTOS, FAZ PINÇA, JARGÃO, ANDA COM APOIO."],
 m15:(s)=>["EXAME FÍSICO", S_ANT_L, S_GER,
  S_OLHO + " ___ DENTES SEM CÁRIES. OTOSCOPIA NORMAL.",
  S_CARD, S_ABD, GS.lact[s],
  "MARCHA INDEPENDENTE, BASE ALARGADA.",
  "DNPM ADEQUADO (12–15 M): MOSTRA O QUE QUER, BLOCOS NA CANECA, 1 PALAVRA, ANDA SEM APOIO."],
 m18:(s)=>["EXAME FÍSICO", S_ANT_L, S_GER,
  S_OLHO + " ___ DENTES SEM CÁRIES. OTOSCOPIA NORMAL.",
  S_CARD, S_ABD, GS.lact[s],
  "MARCHA ESTÁVEL, ANDA PARA TRÁS.",
  "DNPM ADEQUADO (15–18 M): USA COLHER, TORRE DE 2 CUBOS, 3 PALAVRAS, ANDA PARA TRÁS. M-CHAT-R/F: ___ PONTOS."],
 m24:(s)=>["EXAME FÍSICO", S_ANT_E.replace(" | PA ___X___ MMHG (P___)", "") + " | PC ___ CM (Z ___)", S_GER,
  S_OLHO + " ___ DENTES SEM CÁRIES. OTOSCOPIA NORMAL.",
  S_CARD, S_ABD, GS.lact[s],
  "CORRE COM EQUILÍBRIO; JOELHOS ___ (FISIOLÓGICO).",
  "DNPM ADEQUADO (18–24 M): TIRA ROUPA, TORRE DE 3 CUBOS, APONTA 2 FIGURAS, CHUTA BOLA. M-CHAT-R/F: ___ PONTOS."],
 a3:(s)=>["EXAME FÍSICO", S_ANT_E, S_GER,
  S_OLHO + " AV: OD ___ OE ___. DENTES SEM CÁRIES; AMÍGDALAS GRAU ___. OTOSCOPIA NORMAL.",
  S_CARD.replace("PULSOS FEMORAIS", "PULSOS"), S_ABD, GS.lact[s],
  "MARCHA NORMAL; GENO VALGO FISIOLÓGICO.",
  "DNPM ADEQUADO (30–36 M): BRINCA COM OUTRAS CRIANÇAS, IMITA LINHA, RECONHECE 2 AÇÕES, ARREMESSA BOLA."],
 a4:(s)=>["EXAME FÍSICO", S_ANT_E, S_GER,
  S_OLHO + " AV: OD ___ OE ___. DENTES SEM CÁRIES; AMÍGDALAS GRAU ___. OTOSCOPIA NORMAL.",
  S_CARD.replace("PULSOS FEMORAIS", "PULSOS"), S_ABD, GS.lact[s],
  "MARCHA NORMAL; PULA EM UM PÉ.",
  "DNPM ADEQUADO: COPIA CÍRCULO/CRUZ, FALA CLARA, VESTE-SE SEM AJUDA, EQUILÍBRIO EM UM PÉ ___ S."],
 a6:(s)=>["EXAME FÍSICO", S_ANT_E, S_GER,
  "AV: OD ___ OE ___; COVER TEST SEM DESVIO. DENTIÇÃO MISTA SEM CÁRIES. TIREOIDE NÃO PALPÁVEL. SEM ACANTOSE.",
  S_CARD.replace("PULSOS FEMORAIS", "PULSOS"), S_ABD, GS.esc[s],
  "ADAMS NEGATIVO.",
  "DESEMPENHO ESCOLAR ___; SOCIALIZAÇÃO ADEQUADA."]
};

/* ---------- montagem ---------- */

const st = { age: null, ver: 'enx' };
try { const s = store.get('dc_mod'); if (s && s.ver) st.ver = s.ver; } catch(e){}
const AGE_M = { rn:0, m1:1, m2:2, m4:4, m6:6, m9:9, m12:12, m15:15, m18:18, m24:24, a3:36, a4:48, a6:72 };
function autoAge(meses){ let id = 'rn'; for (const a of AGES) if (meses >= AGE_M[a.id] - 0.3) id = a.id; return id; }
function texts(a, sex, ver){
  const exam = (ver === "comp" ? a.exam(sex) : SHORT[a.id](sex)).join("\n");
  const presc = "PRESCRIÇÃO\n" + a.presc.map((p, i) => `${i + 1}. ${p}`).join("\n");
  const vac = "VACINAS\n" + a.vac;
  const ori = "ORIENTAÇÕES AO ACOMPANHANTE\nOriento:\n" + a.ori.map(o => "- " + o).join("\n");
  const enc = "ENCAMINHAMENTOS (usar só o que se aplicar)\n" + a.enc.map(o => "- " + o).join("\n");
  const ret = "RETORNO\n" + a.ret;
  const plano = [presc, vac, ori, ret].join("\n\n");
  const U = (x) => x.toUpperCase();
  return { exam:U(exam), presc:U(presc), vac:U(vac), ori:U(ori), enc:U(enc), ret:U(ret), plano:U(plano) };
}
const escH = (s) => s.replace(/[&<>]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;" }[c]));
const mark = (s) => escH(s).replace(/_{3,}/g, m => `<span class="md-b">${m}</span>`);
function block(id, title, small, text, cls){
  return `<div class="opt md-block ${cls || ""}"><div class="opt-h"><h4>${title}${small ? ` <span class="src">${small}</span>` : ""}</h4>
  <button class="btn btn-line btn-sm" type="button" data-mcopy="${id}">Copiar</button></div><pre class="md-pre">${mark(text)}</pre></div>`;
}
let current = {}, lastM = 0;
function render(meses){
  if (meses !== undefined) lastM = meses;
  if (st.age === null || st._auto !== false) { st.age = autoAge(lastM); }
  const a = AGES.find(x => x.id === st.age) || AGES[0];
  const sex = $('ptSex').value === 'F' ? 'F' : 'M';
  const t = texts(a, sex, st.ver);
  current = { exam: t.exam, presc: t.presc, vac: t.vac, ori: t.ori, enc: t.enc, ret: t.ret, all: t.exam + "\n\n" + t.plano };
  const btns = `<div class="filters" style="margin-bottom:6px">${AGES.map(x => `<button type="button" class="fbtn" data-mage="${x.id}" aria-pressed="${x.id===a.id}">${x.label}</button>`).join('')}</div>
  <div class="acc-filter" role="group" aria-label="Versão do exame"><span>Exame físico:</span><button class="fbtn" type="button" data-mver="enx" aria-pressed="${st.ver==='enx'}">Enxuto</button><button class="fbtn" type="button" data-mver="comp" aria-pressed="${st.ver==='comp'}">Completo</button>
  <span style="margin-left:auto"></span><button class="btn btn-primary btn-sm" type="button" data-mcopy="all">Copiar exame + plano</button></div>`;
  $('mdBox').innerHTML = btns + `<div class="dx-title" style="font-size:1rem">${a.title} <span class="src">· ${escH(a.sub)} · ${sex==='M'?'menino':'menina'}</span></div>
  ${(() => { const ig = parseFloat($('pnIG').value)||40, pn = parseFloat($('pnPN').value)||0; return (ig < 37 || (pn && pn < 2500)) ? `<div class="warnline" style="margin-top:8px">Prematuro/baixo peso: os modelos trazem o ferro em ciclos do bebê a termo — troque pelo esquema contínuo por kg (card “Seguimento do prematuro” → Suplementos). Vacinas pela idade cronológica; exame e marcos pela idade corrigida.</div>` : ''; })()}
  <div class="md-grid">
    ${block("exam", st.ver === "comp" ? "Exame físico normal — completo" : "Exame físico normal — enxuto", "", t.exam)}
    ${block("presc", "Prescrição", "", t.presc)}
    ${block("vac", "Vacinas", "PNI 2026", t.vac)}
    ${block("ori", "Orientações ao acompanhante", "", t.ori)}
    ${block("enc", "Encaminhamentos se houver alteração", "fora do “Copiar exame + plano”", t.enc, "md-enc")}
    ${block("ret", "Retorno", "", t.ret)}
  </div>`;
}
function pick(id){ st.age = id; st._auto = false; }
function ver(v){ st.ver = v; try { store.set('dc_mod', { ver: v }); } catch(e){} }
function text(id){ return current[id] || ''; }
return { render, pick, ver, text };
})();
