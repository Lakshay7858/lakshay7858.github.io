// Descrições cirúrgicas (centro cirúrgico): indicações/contraindicações (PROC_IC), pontos técnicos e gerador de texto.
const ANEST = ['geral balanceada com intubação orotraqueal', 'raquianestesia', 'peridural', 'bloqueio regional + sedação', 'local + sedação', 'local'];
const CCH = [CAMPO_HORA, { id: 'cir', l: 'Cirurgião', t: 'txt', d: '' }, { id: 'aux', l: 'Auxiliar(es)', t: 'txt', d: '' }];
const CCF = [
  { id: 'sang', l: 'Sangramento estimado', o: ['mínimo (<50 mL)', '~100 mL', '~200–500 mL', '>500 mL (ver intercorrências)'] },
  { id: 'dreno', l: 'Dreno', o: ['sem drenos', 'dreno tubular de silicone (Blake) 19 Fr', 'dreno de Penrose', 'dreno tubulolaminar', 'dois drenos tubulares'] },
  { id: 'ap', l: 'Anatomopatológico', o: ['peça enviada para exame anatomopatológico', 'sem peça cirúrgica'] },
  { id: 'cont', l: 'Contagem', o: ['contagem de compressas, gazes e instrumentais conferida e correta', 'contagem conferida — ver intercorrências'] },
  { id: 'interc', l: 'Intercorrências', o: ['sem intercorrências', 'sangramento controlado', 'lesão inadvertida identificada e reparada (descrever)', 'conversão para cirurgia aberta (descrever motivo)'] },
  { id: 'dest', l: 'Destino', o: ['recuperação pós-anestésica (RPA)', 'enfermaria', 'UTI'] }, CAMPO_OBS];
function ccText(v, nome, body) {
  const up = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  const fim = [v.sang ? `Sangramento estimado: ${v.sang}.` : '', v.dreno ? `Drenos: ${v.dreno}.` : '', v.ap ? up(v.ap) + '.' : '', v.cont ? up(v.cont) + '.' : '', `Intercorrências: ${v.interc || 'sem intercorrências'}.`, v.obs || ''].filter(Boolean).join(' ');
  return `DESCRIÇÃO CIRÚRGICA\nData/hora: ${v.hora}\n${$('ptName').value ? `Paciente: ${$('ptName').value}\n` : ''}Cirurgião: ${v.cir || '___'}${v.aux ? `\nAuxiliar(es): ${v.aux}` : ''}\nAnestesia: ${v.anest}\nDiagnóstico pré-operatório: ${v.dpre || '___'}\nDiagnóstico pós-operatório: ${v.dpos || v.dpre || '___'}\nCirurgia realizada: ${nome}\n\nDESCRIÇÃO:\n${body}\n\n${fim}${v.dest ? `\nPaciente encaminhado à ${v.dest} em condições estáveis.` : ''}`;
}
function CC(o) {
  T({ id: o.id, cat: o.cat, cor: 'azul', title: o.title, alias: o.alias || [], resumo: o.resumo, secs: o.secs || [], rx: [],
    proc: { campos: [...CCH, { id: 'anest', l: 'Anestesia', o: o.anest || ANEST }, { id: 'dpre', l: 'Diagnóstico pré-operatório', t: 'txt', d: o.dpre || '' }, { id: 'dpos', l: 'Diagnóstico pós-operatório', t: 'txt', d: '' }, ...o.campos, ...(o.ccf || CCF)],
      texto: (v, p) => ccText(v, typeof o.nome === 'function' ? o.nome(v) : o.nome || o.title, o.body(v, p)), calc: o.calc, dyn: o.dyn },
    fontes: o.fontes || [] });
  if (o.ic) PROC_IC[o.id] = o.ic;
}
const PORTAIS_COLE = 'trocarte de 10 mm umbilical (óptica 30°), 10 mm epigástrico e dois de 5 mm em hipocôndrio direito';

/* ===================== VIAS BILIARES ===================== */
CC({ id: 'c_colec', cat: 'Vias biliares', title: 'Colecistectomia videolaparoscópica',
  alias: ['colecistectomia', 'vesicula', 'cvs', 'visao critica', 'colelitiase', 'colecistite', 'calot', 'bail-out', 'subtotal'],
  resumo: 'Cultura de segurança: visão crítica de segurança (CVS) antes de clipar qualquer estrutura; time-out; bail-out (subtotal, colecistostomia, conversão) quando a CVS não for obtida.',
  ic: { ind: ['Colelitíase sintomática (cólica biliar)', 'Colecistite aguda (TG18): colecistectomia precoce, idealmente ≤72 h (aceitável até 7–10 dias do início)', 'Pancreatite biliar leve: na mesma internação', 'Coledocolitíase após clearance (CPRE) — na mesma internação', 'Pólipo ≥10 mm (ou ≥6 mm com fatores de risco), vesícula em porcelana, cálculo >3 cm (relativa)'], ci: ['Instabilidade hemodinâmica / risco cirúrgico proibitivo (TG18 grau III com disfunção orgânica sem melhora → drenagem percutânea)', 'Suspeita de câncer de vesícula avançado (estadiar antes)', 'Relativas à laparoscopia: cirrose Child C, coagulopatia não corrigida, intolerância ao pneumoperitônio (cardiopatia/pneumopatia grave)'], mat: ['Torre de vídeo (óptica 30°), trocartes 10/5 mm, pinças de apreensão, dissector Maryland, gancho/espátula, clipador (clipes metálicos ou Hem-o-lok), tesoura, aspirador-irrigador, endobag, material de colangiografia e de conversão'], pos: ['Dieta líquida 6 h após e livre conforme aceitação; analgesia multimodal; deambulação precoce; alta em 24 h na maioria', 'Sinais de alerta: dor desproporcional, febre, icterícia, distensão (fístula/lesão biliar) → USG/TC, enzimas'] },
  secs: [
    { h: 'Visão crítica de segurança (Strasberg) — os 3 critérios', li: ['1) **Triângulo hepatocístico** limpo de gordura e tecido fibroso (não precisa expor o ducto colédoco).', '2) **Terço inferior da vesícula** separado do leito hepático (placa cística exposta).', '3) **Apenas duas estruturas** entrando na vesícula (ducto e artéria císticos). Documentar com foto (visão anterior e posterior/"doublet view").'] },
    { h: 'Bail-out (quando não há CVS ou há inflamação extrema)', li: ['**Colecistectomia subtotal fenestrada** (não fecha o coto da vesícula; drena) ou **reconstituinte** (fecha o coto) — preferível à dissecção arriscada.', 'Colecistostomia, ou conversão para cirurgia aberta (não reduz por si só a lesão biliar), ou abortar e encaminhar.', 'Considerar **colangiografia intraoperatória** em dúvida anatômica. Escala de dificuldade: **Parkland** (1–5) e Nassar.'] },
    { h: 'Complicações', li: ['**Lesão de via biliar** (0,3–0,5%; Strasberg A–E): suspeitar se dor, febre, icterícia, bilioma — TC/colangioRM e encaminhar a centro de HPB.', 'Fístula de coto cístico/ducto de Luschka (CPRE com prótese), sangramento (artéria cística, leito), cálculo perdido, lesão de alça/vascular na entrada.'] }],
  dpre: 'colelitíase sintomática',
  campos: [
    { id: 'acesso', l: 'Pneumoperitônio', o: ['técnica aberta (Hasson) umbilical', 'punção com agulha de Veress umbilical', 'punção em ponto de Palmer (abdome com cirurgia prévia)'] },
    { id: 'pres', l: 'Pressão (mmHg)', o: ['12', '14', '10'] },
    { id: 'port', l: 'Trocartes', t: 'txt', d: PORTAIS_COLE },
    { id: 'parkland', l: 'Achados (Parkland)', o: ['grau 1 — vesícula de aspecto normal, sem aderências', 'grau 2 — aderências menores no colo/corpo', 'grau 3 — hiperemia, líquido pericolecístico, aderências ao colo, vesícula distendida', 'grau 4 — aderências que encobrem a anatomia, vesícula intra-hepática/aumentada', 'grau 5 — perfuração, necrose, fístula, anatomia não identificável'] },
    { id: 'cvs', l: 'Visão crítica de segurança', o: ['obtida (3 critérios) e documentada', 'não obtida — realizado bail-out'] },
    { id: 'bail', l: 'Bail-out (se não houve CVS)', o: ['não se aplica', 'colecistectomia subtotal fenestrada', 'colecistectomia subtotal reconstituinte', 'colecistostomia', 'conversão para via aberta'] },
    { id: 'colang', l: 'Colangiografia', o: ['não realizada', 'realizada, sem falhas de enchimento e com passagem livre de contraste para o duodeno'] },
    { id: 'clip', l: 'Ligadura', o: ['ducto cístico com 2 clipes proximais e 1 distal; artéria cística com 2 clipes proximais e 1 distal', 'ducto cístico com endoloop e clipes; artéria cística com clipes', 'ducto cístico com clipes de polímero (Hem-o-lok)'] },
    { id: 'ret', l: 'Retirada da peça', o: ['em saco extrator pelo trocarte umbilical', 'em saco extrator pelo trocarte epigástrico'] },
    { id: 'fech', l: 'Fechamento', t: 'txt', d: 'aponeurose umbilical com poliglactina 0; pele com mononáilon 4-0 (ou sutura intradérmica)' }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia, antissepsia e colocação de campos estéreis. Time-out realizado. Pneumoperitônio por ${v.acesso} com CO₂ a ${v.pres} mmHg. Inventário da cavidade sem outras alterações. Posicionados ${v.port}. Posição de proclive com lateralização à esquerda.\nAchados: ${v.parkland}.\nTração cefálica do fundo e lateral do infundíbulo. Abertura do peritônio anterior e posterior do triângulo hepatocístico e dissecção com gancho/dissector. Visão crítica de segurança ${v.cvs}. Colangiografia intraoperatória ${v.colang}. ${v.bail === 'não se aplica' || v.cvs.startsWith('obtida') ? `Ligadura: ${v.clip}, com secção entre os clipes. Colecistectomia retrógrada com descolamento do leito hepático com eletrocautério. Revisão da hemostasia do leito e dos clipes, aspiração e irrigação. Vesícula retirada ${v.ret}.` : ({
    'colecistectomia subtotal fenestrada': 'Por impossibilidade de identificação segura das estruturas do triângulo hepatocístico, optado por colecistectomia subtotal fenestrada: abertura da vesícula no fundo/corpo, aspiração e retirada dos cálculos, ressecção da parede anterior e livre, preservação da parede posterior aderida ao leito hepático com cauterização da mucosa remanescente, sem fechamento do infundíbulo (orifício do ducto cístico fechado por sutura interna em bolsa quando visível). Cálculos e peça retirados em saco extrator. Dreno subepático deixado.',
    'colecistectomia subtotal reconstituinte': 'Por impossibilidade de identificação segura das estruturas do triângulo hepatocístico, optado por colecistectomia subtotal reconstituinte: abertura da vesícula, retirada dos cálculos, ressecção da maior parte da parede e fechamento do coto infundibular com sutura contínua/grampeador, formando remanescente fechado. Peça em saco extrator. Dreno subepático deixado.',
    'colecistostomia': 'Por inflamação extrema e risco de lesão de estruturas, optado por colecistostomia: abertura do fundo vesicular, aspiração e retirada dos cálculos acessíveis e fixação de sonda (Foley/Pezzer) com sutura em bolsa, exteriorizada pela parede; dreno subepático. Colecistectomia diferida.',
    'conversão para via aberta': 'Por impossibilidade de progressão segura, realizada conversão para laparotomia subcostal direita, colecistectomia anterógrada (do fundo para o infundíbulo) com identificação das estruturas, ligadura do ducto e da artéria císticos com fio absorvível/clipes.' }[v.bail] || '')} Retirada dos trocartes sob visão e esvaziamento do pneumoperitônio. Fechamento: ${v.fech}.`,
  fontes: ['tg18', 'sages_safe', 'strasberg'] });

CC({ id: 'c_coledoco', cat: 'Vias biliares', title: 'Exploração de via biliar / coledocotomia (aberta ou laparoscópica)',
  alias: ['coledocotomia', 'exploracao de via biliar', 'coledocolitiase', 'dreno de kehr', 'transcistica'],
  resumo: 'Alternativa à CPRE para coledocolitíase (estratégia em tempo único), por via transcística ou coledocotomia com dreno de Kehr ou fechamento primário.',
  ic: { ind: ['Coledocolitíase confirmada na colangiografia intraoperatória ou pré-operatória quando a CPRE não está disponível/falhou', 'Cálculos grandes/impactados'], ci: ['Colédoco fino (<6–8 mm) para coledocotomia (preferir transcística ou CPRE)', 'Colangite grave instável (drenar antes — CPRE/percutânea)'], mat: ['Coledocoscópio (se disponível), cesta de Dormia, cateter de Fogarty, pinças de Randall, dreno de Kehr 14–16 Fr, fios absorvíveis 4-0/5-0'], pos: ['Kehr: colangiografia pelo dreno em 7–14 dias, clampeamento e retirada após ~3–6 semanas (trajeto maduro)'] },
  dpre: 'coledocolitíase',
  campos: [{ id: 'via', l: 'Via', o: ['laparotomia subcostal direita', 'videolaparoscopia'] }, { id: 'tec', l: 'Técnica', o: ['coledocotomia longitudinal anterior de 1,5 cm', 'exploração transcística'] },
    { id: 'calc', l: 'Cálculos', t: 'txt', d: 'retirados ___ cálculos de ___ mm com pinça de Randall/cesta e lavagem com SF' }, { id: 'col', l: 'Diâmetro do colédoco (mm)', t: 'txt', d: '' },
    { id: 'fech2', l: 'Fechamento da via biliar', o: ['sobre dreno de Kehr 14 Fr com sutura contínua de PDS 5-0', 'fechamento primário com PDS 5-0', 'ligadura do ducto cístico (via transcística)'] },
    { id: 'col2', l: 'Colangiografia de controle', o: ['sem cálculos residuais, passagem livre para o duodeno', 'não realizada'] }],
  body: (v) => `Acesso por ${v.via}. Colecistectomia realizada conforme técnica habitual (visão crítica de segurança). Colédoco de ${v.col || '___'} mm. Realizada ${v.tec}; ${v.calc}. ${v.tec.includes('coledocotomia') ? 'Exploração com cateter de Fogarty até o duodeno. ' : ''}Fechamento ${v.fech2}. Colangiografia de controle: ${v.col2}. Revisão da hemostasia.`,
  fontes: ['asge2019', 'tg18'] });

/* ===================== APÊNDICE ===================== */
CC({ id: 'c_apvl', cat: 'Apêndice', title: 'Apendicectomia videolaparoscópica',
  alias: ['apendicectomia', 'apendicite', 'apendicectomia laparoscopica', 'endoloop'],
  resumo: 'Via de escolha (WSES 2025) inclusive em complicada, gestante, obeso e idoso. Aspiração sem irrigação; dreno não recomendado de rotina.',
  ic: { ind: ['Apendicite aguda (não complicada ou complicada)', 'Dúvida diagnóstica em dor de FID (laparoscopia diagnóstica)'], ci: ['Instabilidade hemodinâmica grave que impede pneumoperitônio', 'Plastrão/abscesso bem bloqueado em paciente estável → tratamento não operatório (ATB ± drenagem percutânea)', 'Relativas: aderências extensas, 3º trimestre (técnica adaptada, posicionamento de trocartes)'], mat: ['Torre de vídeo, trocartes 10/5/5 mm, pinças atraumáticas, bipolar/selador ou clipes, endoloops (ou grampeador linear), endobag, aspirador'], pos: ['Não complicada: **sem antibiótico pós-operatório**, dieta precoce, alta em 24 h', 'Complicada: antibiótico por **2–3 dias** após controle do foco (WSES 2025; até 4 dias — STOP-IT)'] },
  secs: [{ h: 'Pontos técnicos', li: ['Trocartes: 10 mm umbilical, 5 mm suprapúbico e 5 mm em FIE (triangulação). Trendelenburg com lateralização à esquerda.', 'Identificar a confluência das tênias no ceco. Secção do mesoapêndice (bipolar/selador/clipes) até a base.', 'Base: **2 endoloops proximais + 1 distal** ou grampeador linear se base necrótica/perfurada (inclui ceco). Não é necessário sepultar o coto.', 'Peça sempre em saco extrator. Aspirar coleções; **irrigação não reduz abscesso** (WSES). Dreno não recomendado de rotina.'] },
    { h: 'Complicações', li: ['Abscesso intracavitário (TC + drenagem percutânea), infecção de sítio, fístula do coto, íleo, apendicite de coto (coto >5 mm).'] }],
  dpre: 'apendicite aguda',
  campos: [{ id: 'acesso', l: 'Pneumoperitônio', o: ['técnica aberta (Hasson) umbilical', 'agulha de Veress umbilical'] },
    { id: 'achado', l: 'Fase', o: ['fase edematosa (catarral)', 'fase flegmonosa (supurativa)', 'fase gangrenosa (necrótica), sem perfuração', 'perfurada com abscesso bloqueado', 'perfurada com peritonite purulenta difusa'] },
    { id: 'pos', l: 'Posição do apêndice', o: ['anterior/pélvica', 'retrocecal', 'subcecal', 'pré-ileal', 'retroileal'] },
    { id: 'liq', l: 'Líquido', o: ['pequena quantidade de líquido seroso em FID', 'secreção purulenta em FID e pelve, aspirada', 'peritonite purulenta difusa, aspirada', 'sem líquido livre'] },
    { id: 'meso', l: 'Mesoapêndice', o: ['coagulado com energia bipolar', 'selado com dispositivo de energia avançada', 'ligado com clipes'] },
    { id: 'base', l: 'Base', o: ['íntegra; ligada com 2 endoloops proximais e 1 distal', 'friável; seccionada com grampeador linear incluindo margem de ceco', 'ligada com clipes de polímero'] }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia, antissepsia e campos estéreis. Time-out. Pneumoperitônio por ${v.acesso}. Trocartes de 10 mm umbilical, 5 mm suprapúbico e 5 mm em fossa ilíaca esquerda. Inventário da cavidade.\nAchados: apêndice cecal em posição ${v.pos}, em ${v.achado}; ${v.liq}.\nSecção do mesoapêndice: ${v.meso}. Base apendicular ${v.base}; secção do apêndice. Peça retirada em saco extrator. Revisão da hemostasia e do coto, aspiração da cavidade. Retirada dos trocartes sob visão, esvaziamento do pneumoperitônio, fechamento da aponeurose umbilical com poliglactina 0 e pele com mononáilon 4-0.`,
  fontes: ['wses2025ap'] });

CC({ id: 'c_apab', cat: 'Apêndice', title: 'Apendicectomia aberta (McBurney / Rocky-Davis)',
  alias: ['apendicectomia aberta', 'mcburney', 'rocky davis', 'bolsa de tabaco'],
  resumo: 'Quando a laparoscopia não está disponível. Incisão oblíqua (McBurney) ou transversa (Rocky-Davis) no ponto de McBurney; mediana se peritonite difusa/dúvida diagnóstica.',
  ic: { ind: ['Apendicite aguda sem disponibilidade de laparoscopia', 'Conversão'], ci: ['Peritonite difusa extensa — preferir mediana', 'Plastrão/abscesso em paciente estável (tratamento não operatório)'], mat: ['Caixa de laparotomia, afastadores (Farabeuf, Doyen), fios absorvíveis 2-0/3-0, poliglactina 0, compressas'], pos: ['Igual à laparoscópica; maior risco de infecção de ferida em complicada (considerar fechamento primário tardio da pele)'] },
  secs: [{ h: 'Pontos técnicos', li: ['Incisão sobre o ponto de McBurney (1/3 lateral da linha espinho-umbilical); divulsão das fibras do oblíquo externo, interno e transverso (incisão em grade); abertura do peritônio.', 'Exteriorizar o ceco, ligar o mesoapêndice, ligar a base (fio absorvível) e seccionar; sepultamento em bolsa de tabaco é opcional.', 'Fechamento por planos; pele: considerar deixar aberta se contaminação grosseira.'] }],
  dpre: 'apendicite aguda',
  campos: [{ id: 'inc', l: 'Incisão', o: ['oblíqua de McBurney', 'transversa de Rocky-Davis', 'mediana infraumbilical'] },
    { id: 'achado', l: 'Fase', o: ['fase edematosa', 'fase flegmonosa', 'fase gangrenosa', 'perfurada com abscesso', 'perfurada com peritonite difusa'] },
    { id: 'base', l: 'Base', o: ['ligada com poliglactina 2-0 e sepultada em bolsa de tabaco', 'ligada com poliglactina 2-0, sem sepultamento', 'friável — sutura em dois planos na parede do ceco'] },
    { id: 'pele', l: 'Pele', o: ['sutura com mononáilon 4-0', 'deixada aberta para fechamento por segunda intenção / primário tardio'] }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia, antissepsia e campos estéreis. Time-out. Incisão ${v.inc} em fossa ilíaca direita. ${v.inc.includes('mediana') ? 'Abertura da linha alba e do peritônio.' : 'Abertura da aponeurose do oblíquo externo e divulsão das fibras dos músculos oblíquo interno e transverso (incisão em grade); abertura do peritônio.'}\nAchados: apêndice em ${v.achado}.\nExteriorização do ceco, ligadura e secção do mesoapêndice com poliglactina 2-0. Base ${v.base}. Revisão da hemostasia, aspiração. Fechamento do peritônio com poliglactina 2-0 contínua, aproximação muscular, aponeurose do oblíquo externo com poliglactina 0 contínua; pele: ${v.pele}.`,
  fontes: ['wses2025ap'] });

/* ===================== HÉRNIAS ===================== */
CC({ id: 'c_lich', cat: 'Hérnias', title: 'Hernioplastia inguinal — Lichtenstein',
  alias: ['hernioplastia', 'herniorrafia', 'lichtenstein', 'hernia inguinal', 'tela', 'hernia femoral'],
  resumo: 'Técnica aberta padrão com tela (HerniaSurge). Identificar e preservar os 3 nervos; sobreposição de tela de 2 cm sobre o tubérculo púbico.',
  ic: { ind: ['Hérnia inguinal sintomática', 'Assintomática/oligossintomática: cirurgia ou conduta expectante (homem) — decisão compartilhada', '**Mulher: operar** (risco de femoral/encarceramento; preferir laparoendoscópica)', 'Hérnia femoral: sempre operar'], ci: ['Infecção ativa de pele no local', 'Risco cirúrgico proibitivo em hérnia assintomática (expectante)', 'Relativas: anticoagulação não suspensa, ascite volumosa não controlada'], mat: ['Caixa de pequena cirurgia, tela de polipropileno ~15 × 8 cm, polipropileno 2-0, poliglactina 2-0/3-0, dreno de Penrose para reparo do cordão'], pos: ['Alta no mesmo dia/24 h; analgesia; evitar esforço intenso por 2–4 semanas (atividade leve já liberada)', 'Dor crônica inguinal (neuralgia) é a principal complicação a longo prazo'] },
  secs: [{ h: 'Pontos técnicos', li: ['Incisão de 5–6 cm paralela ao ligamento inguinal; abertura da aponeurose do oblíquo externo até o anel externo.', 'Identificar **nervos ilioinguinal, ílio-hipogástrico e ramo genital do genitofemoral** (evitar fixação/neurectomia rotineira).', 'Indireta: dissecção e redução do saco (ressecção se grande). Direta: invaginação/imbricação da fáscia transversal.', 'Tela fixada com polipropileno 2-0 contínuo no **ligamento inguinal (de Poupart)** a partir de 2 cm medial ao tubérculo púbico; pontos separados no tendão conjunto/aponeurose do oblíquo interno; fenda para o cordão com cruzamento das caudas lateralmente ao anel interno.'] },
    { h: 'Classificações', li: ['**Nyhus**: I indireta com anel normal; II indireta com anel alargado; IIIa direta; IIIb indireta grande/mista; IIIc femoral; IV recidivada.', '**EHS**: P/R (primária/recidivada), L/M/F (lateral, medial, femoral), tamanho do defeito em dedos (1 dedo ≈1,5 cm).'] }],
  dpre: 'hérnia inguinal',
  campos: [{ id: 'lado', l: 'Lado', o: LADO },
    { id: 'tipo', l: 'Tipo', o: ['indireta (Nyhus II)', 'direta (Nyhus IIIa)', 'mista/em pantalona (Nyhus IIIb)', 'femoral (Nyhus IIIc)', 'recidivada (Nyhus IV)'] },
    { id: 'saco', l: 'Saco herniário', o: ['dissecado e reduzido', 'dissecado, ligado e ressecado', 'direto invaginado com sutura de imbricação da fáscia transversal'] },
    { id: 'nerv', l: 'Nervos', o: ['ilioinguinal, ílio-hipogástrico e ramo genital identificados e preservados', 'ilioinguinal com neurectomia por lesão/aprisionamento'] },
    { id: 'tela', l: 'Tela', t: 'txt', d: 'polipropileno 15 × 8 cm' }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia, antissepsia e campos estéreis. Time-out. Incisão inguinal ${v.lado} de 6 cm paralela ao ligamento inguinal. Abertura do subcutâneo e da fáscia de Scarpa, hemostasia. Abertura da aponeurose do oblíquo externo até o anel inguinal externo. Isolamento do cordão espermático (ligamento redondo na mulher) com dreno de Penrose.\nAchados: hérnia inguinal ${v.tipo} à ${v.lado}. Saco herniário ${v.saco}. Nervos ${v.nerv}.\nColocada tela de ${v.tela}, fixada com polipropileno 2-0 em sutura contínua ao ligamento inguinal desde 2 cm medial ao tubérculo púbico até lateral ao anel interno, e com pontos separados ao tendão conjunto/aponeurose do oblíquo interno; fenda para passagem do cordão com sobreposição das caudas lateralmente. Fechamento da aponeurose do oblíquo externo com poliglactina 2-0 contínua, subcutâneo com poliglactina 3-0 e pele com sutura intradérmica/mononáilon 4-0.`,
  fontes: ['herniasurge'] });

CC({ id: 'c_tapp', cat: 'Hérnias', title: 'Hernioplastia inguinal laparoscópica (TAPP / TEP)',
  alias: ['tapp', 'tep', 'hernioplastia laparoscopica', 'orificio miopectineo', 'fruchaud'],
  resumo: 'Cobre todo o orifício miopectíneo (direta, indireta e femoral). Preferida em bilateral, recidiva após aberta e mulheres (HerniaSurge), com equipe treinada.',
  ic: { ind: ['Hérnia bilateral', 'Recidiva após técnica aberta', 'Hérnia em mulher (cobre o canal femoral)', 'Retorno rápido às atividades'], ci: ['Contraindicação à anestesia geral', 'Recidiva após técnica posterior prévia (preferir Lichtenstein)', 'Relativas: prostatectomia/cirurgia pélvica prévia (espaço de Retzius), hérnia escrotal gigante, ascite'], mat: ['Torre de vídeo, trocartes 10/5/5 mm, tela ≥15 × 12 cm (anatômica ou plana), fixação (cola, tacker absorvível) ou sem fixação, fio farpado para fechamento do peritônio'], pos: ['Alta no mesmo dia; atividade leve imediata; seroma é comum e autolimitado'] },
  secs: [{ h: 'Pontos técnicos', li: ['Abertura do peritônio ~4–5 cm acima do orifício interno, da EIAS ao ligamento umbilical medial.', 'Dissecção do espaço de Retzius (medial: ligamento de Cooper, sínfise) e de Bogros (lateral); parietalização dos elementos do cordão (ducto deferente e vasos).', '**Evitar**: triângulo da desgraça (vasos ilíacos, entre ducto deferente e vasos gonadais) e triângulo da dor (nervos, lateral aos vasos gonadais abaixo do trato iliopúbico) — não fixar nessas áreas.', 'Tela ≥15 × 10–12 cm cobrindo todo o orifício miopectíneo de Fruchaud; fixação mínima no Cooper e acima do trato iliopúbico; fechamento completo do peritônio (TAPP).'] }],
  dpre: 'hérnia inguinal',
  anest: ['geral balanceada com intubação orotraqueal'],
  campos: [{ id: 'tec', l: 'Técnica', o: ['transabdominal pré-peritoneal (TAPP)', 'totalmente extraperitoneal (TEP)'] }, { id: 'lado', l: 'Lado', o: ['direita', 'esquerda', 'bilateral'] },
    { id: 'tipo', l: 'Achado', t: 'txt', d: 'hérnia indireta (EHS PL2)' }, { id: 'tela', l: 'Tela', t: 'txt', d: 'polipropileno 15 × 12 cm' },
    { id: 'fix', l: 'Fixação', o: ['cola de cianoacrilato no ligamento de Cooper e acima do trato iliopúbico', 'tackers absorvíveis no Cooper e acima do trato iliopúbico', 'sem fixação'] }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia geral, bexiga esvaziada, antissepsia e campos. Time-out. ${v.tec.includes('TAPP') ? 'Pneumoperitônio por técnica aberta umbilical; trocartes de 10 mm umbilical e dois de 5 mm nos flancos. Inventário da cavidade.' : 'Acesso ao espaço pré-peritoneal por incisão infraumbilical com balão dissector; trocartes na linha média.'}\nAchados: ${v.tipo} à ${v.lado}.\n${v.tec.includes('TAPP') ? 'Abertura do peritônio do ligamento umbilical medial à espinha ilíaca anterossuperior, ' : ''}Dissecção dos espaços de Retzius e Bogros, exposição do ligamento de Cooper, vasos epigástricos e trato iliopúbico; redução do saco herniário e parietalização dos elementos do cordão, evitando os triângulos da dor e da desgraça. Colocada tela de ${v.tela} cobrindo todo o orifício miopectíneo, com fixação: ${v.fix}. ${v.tec.includes('TAPP') ? 'Fechamento completo do peritônio com fio farpado contínuo. ' : ''}Esvaziamento sob visão, fechamento da aponeurose de 10 mm com poliglactina 0 e da pele com mononáilon 4-0.`,
  fontes: ['herniasurge'] });

CC({ id: 'c_ventral', cat: 'Hérnias', title: 'Hernioplastia umbilical / epigástrica / incisional',
  alias: ['hernia umbilical', 'hernia epigastrica', 'hernia incisional', 'eventracao', 'rives-stoppa', 'sublay', 'onlay'],
  resumo: 'Defeitos ≥1 cm: reparo com tela (EHS/AHS 2020) — preferir posição pré-peritoneal/retromuscular (sublay). Incisional: retromuscular (Rives-Stoppa) ± separação de componentes (TAR) se grande.',
  ic: { ind: ['Hérnia umbilical/epigástrica sintomática ou com risco de complicação', 'Hérnia incisional sintomática; encarcerada/estrangulada (urgência)'], ci: ['Infecção de pele/ferida ativa (adiar)', 'Tabagismo ativo, obesidade grave (IMC >35–40), diabetes descompensado — otimizar antes em eletivas', 'Ascite não controlada (cirrótico — controlar antes; operar se complicação)'], mat: ['Caixa de laparotomia, tela de polipropileno de tamanho adequado (sobreposição ≥3–5 cm), fios de absorção lenta/polipropileno, drenos se grande descolamento'], pos: ['Cinta abdominal opcional; evitar esforço por 4–6 semanas; seroma/hematoma/ISC'] },
  secs: [{ h: 'Classificação EHS', li: ['Umbilical/epigástrica: pequena <2 cm, média 2–4 cm, grande >4 cm.', 'Incisional: M1–M5 (linha média) / L1–L4 (lateral); largura W1 <4 cm, W2 4–10 cm, W3 >10 cm.', 'Defeito <1 cm: sutura primária aceitável; ≥1 cm: tela reduz recidiva.'] }],
  dpre: 'hérnia umbilical',
  campos: [{ id: 'tipo', l: 'Hérnia', o: ['umbilical', 'epigástrica', 'incisional mediana', 'paraumbilical'] }, { id: 'def', l: 'Defeito (cm)', t: 'txt', d: '' },
    { id: 'cont', l: 'Conteúdo', o: ['gordura pré-peritoneal/omento, viável', 'alça de delgado, viável após redução', 'alça com sofrimento — ver enterectomia'] },
    { id: 'tec', l: 'Técnica', o: ['sutura primária com polipropileno 0 (pontos separados)', 'tela de polipropileno em posição pré-peritoneal (sublay)', 'tela de polipropileno retromuscular (Rives-Stoppa)', 'tela de polipropileno supra-aponeurótica (onlay)', 'separação posterior de componentes (TAR) + tela retromuscular'] },
    { id: 'tela', l: 'Tela (cm)', t: 'txt', d: '' }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia, antissepsia e campos estéreis. Time-out. Incisão ${v.tipo === 'umbilical' ? 'periumbilical infraumbilical' : 'sobre o defeito/cicatriz prévia'}, dissecção do saco herniário até o anel aponeurótico.\nAchados: hérnia ${v.tipo} com defeito de ${v.def || '___'} cm; conteúdo: ${v.cont}.\nAbertura/redução do saco e do conteúdo. Reparo: ${v.tec}${v.tela ? `, tela de ${v.tela} cm com sobreposição de pelo menos 3–5 cm além das bordas do defeito` : ''}. Fechamento da aponeurose com fio de absorção lenta/polipropileno. ${v.tipo === 'umbilical' ? 'Reconstrução da cicatriz umbilical (fixação da derme à aponeurose). ' : ''}Subcutâneo com poliglactina 3-0 e pele com mononáilon 4-0.`,
  fontes: ['ehs_ahs2020'] });

CC({ id: 'c_herniaurg', cat: 'Hérnias', title: 'Hérnia encarcerada/estrangulada — cirurgia de urgência',
  alias: ['hernia encarcerada', 'hernia estrangulada', 'urgencia', 'richter', 'viabilidade de alca'],
  resumo: 'Avaliar viabilidade da alça (cor, brilho, peristalse, pulso mesentérico, sangramento de borda) após liberação e compressas mornas por 10 min; tela é segura em campo limpo e limpo-contaminado (WSES).',
  ic: { ind: ['Hérnia encarcerada dolorosa irredutível', 'Estrangulamento (dor intensa, sinais inflamatórios, febre, leucocitose, lactato, obstrução intestinal)', 'Redução manual (taxe) só se <6–12 h, sem sinais de estrangulamento — e observar'], ci: ['Não tentar redução manual se suspeita de estrangulamento ou peritonite'], mat: ['Caixa de laparotomia, telas, grampeadores/fios para enterectomia, compressas mornas'], pos: ['Se enterectomia: dieta conforme trânsito; antibiótico terapêutico se contaminação; risco de ISC maior'] },
  dpre: 'hérnia inguinal encarcerada',
  campos: [{ id: 'local', l: 'Hérnia', o: ['inguinal direita', 'inguinal esquerda', 'femoral direita', 'femoral esquerda', 'umbilical', 'incisional'] },
    { id: 'cont', l: 'Conteúdo', o: ['omento, viável', 'alça de delgado viável após liberação do anel e compressas mornas', 'alça de delgado necrótica — enterectomia segmentar', 'pinçamento parcial da borda antimesentérica (Richter)'] },
    { id: 'rep', l: 'Reparo', o: ['Lichtenstein com tela de polipropileno (campo limpo)', 'tela de polipropileno (campo limpo-contaminado, sem contaminação grosseira)', 'reparo sem tela (contaminação/necrose com peritonite)', 'herniorrafia femoral (McVay) / plug'] },
    { id: 'entero', l: 'Enterectomia', t: 'txt', d: '' }],
  body: (v) => `Paciente sob anestesia, antissepsia e campos. Time-out. Acesso sobre a hérnia ${v.local}. Abertura do saco herniário com proteção do conteúdo; secção do anel constritor.\nAchados: ${v.cont}.${v.entero ? ` Realizada enterectomia: ${v.entero}.` : ''}\nApós avaliação de viabilidade (cor, brilho, peristalse, pulso mesentérico) o conteúdo foi reduzido à cavidade. Reparo: ${v.rep}. Fechamento por planos.`,
  fontes: ['wses_hernia2017', 'herniasurge'] });

/* ===================== INTESTINO / LAPAROTOMIA ===================== */
CC({ id: 'c_le', cat: 'Intestino e laparotomia', title: 'Laparotomia exploradora (inventário sistemático)',
  alias: ['laparotomia', 'laparotomia exploradora', 'inventario', 'abdome agudo', 'fechamento parede', 'small bites'],
  resumo: 'Inventário completo e sistemático da cavidade; fechamento da aponeurose com sutura contínua de absorção lenta, "small bites" (5 mm × 5 mm) e relação fio:ferida ≥4:1.',
  ic: { ind: ['Abdome agudo com peritonite difusa, pneumoperitônio, isquemia, obstrução com sinais de sofrimento', 'Trauma: instabilidade com FAST+, peritonite, evisceração, ferimento por arma de fogo transfixante', 'Dúvida diagnóstica com deterioração (quando a laparoscopia não é adequada)'], ci: ['Paciente estável com quadro passível de tratamento não operatório/percutâneo', 'Cuidados paliativos/limitação terapêutica (decisão compartilhada)'], mat: ['Caixa de laparotomia, afastador autoestático (Gosset/Balfour), compressas, aspirador, fios, grampeadores'], pos: ['Analgesia multimodal (peridural/TAP), profilaxia de TEV, dieta precoce conforme o procedimento, deambulação'] },
  secs: [{ h: 'Inventário (ordem sugerida)', li: ['Aspirar e identificar o conteúdo livre (sangue, pus, bile, fezes, conteúdo entérico).', '**Andar superior**: fígado, vesícula, estômago (incluir face posterior pela bolsa omental), duodeno (Kocher se indicado), baço, diafragma.', '**Delgado** do ângulo de Treitz à válvula ileocecal (ambas as faces e mesentério); **cólon** do ceco ao reto, incluindo flexuras; pâncreas; retroperitônio (hematomas: zona I explorar; II/III conforme mecanismo).', 'Pelve: bexiga, útero e anexos.'] },
    { h: 'Fechamento (European Hernia Society)', li: ['Sutura contínua com fio monofilamentar de absorção lenta (PDS/polidioxanona 2-0 ou 0) em **pequenas mordidas (5 mm da borda, 5 mm de intervalo)** — reduz hérnia incisional e infecção (STITCH).', 'Pele: considerar fechamento primário tardio ou terapia por pressão negativa em contaminação grosseira.'] }],
  dpre: 'abdome agudo',
  campos: [{ id: 'inc', l: 'Incisão', o: ['mediana xifoumbilical', 'mediana infraumbilical', 'mediana xifopúbica', 'subcostal direita (Kocher)', 'transversa'] },
    { id: 'cont', l: 'Conteúdo livre', o: ['sem líquido livre', 'líquido seroso em pequena quantidade', 'secreção purulenta difusa', 'conteúdo entérico', 'conteúdo fecaloide', 'hemoperitônio (~___ mL)', 'bile'] },
    { id: 'ach', l: 'Achados principais', t: 'txt', d: '' }, { id: 'proc2', l: 'Procedimento realizado', t: 'txt', d: '' },
    { id: 'lav', l: 'Lavagem', o: ['aspiração do conteúdo, sem lavagem extensa', 'lavagem da cavidade com SF morno (___ L) até retorno claro'] },
    { id: 'fech', l: 'Fechamento', o: ['aponeurose com PDS 0 contínuo (small bites 5 × 5 mm); pele com grampos/mononáilon 3-0', 'aponeurose com PDS 0 contínuo; pele deixada aberta com curativo (fechamento primário tardio)', 'peritoneostomia temporária (ver controle de danos)'] }],
  body: (v) => `Paciente em decúbito dorsal, sob anestesia geral, sondagem vesical, antissepsia ampla e campos. Time-out. Laparotomia ${v.inc}, abertura da linha alba e do peritônio. Aspiração de ${v.cont}.\nInventário sistemático da cavidade: fígado, vesícula, estômago, duodeno, baço, pâncreas, delgado do ângulo de Treitz à válvula ileocecal, cólon e reto, pelve e retroperitônio.\nAchados: ${v.ach || '___'}.\nProcedimento: ${v.proc2 || '___'}.\nRevisão da hemostasia; ${v.lav}. Fechamento: ${v.fech}.`,
  fontes: ['ehs2015closure', 'stitch'] });

CC({ id: 'c_entero', cat: 'Intestino e laparotomia', title: 'Enterectomia segmentar com enteroanastomose',
  alias: ['enterectomia', 'anastomose', 'enteroanastomose', 'resseccao de delgado', 'grampeador'],
  resumo: 'Ressecção com margens viáveis (borda sangrante, peristalse) e anastomose sem tensão, bem vascularizada; fechar a brecha mesentérica.',
  ic: { ind: ['Necrose/sofrimento irreversível de alça (estrangulamento, volvo, isquemia)', 'Perfuração com contaminação extensa/lesão >50% da circunferência, tumor, estenose'], ci: ['Anastomose primária evitada se: choque com vasopressor em dose alta, acidose grave, peritonite fecal extensa, desnutrição grave → controle de danos/estomia'], mat: ['Pinças intestinais (Doyen), grampeador linear cortante (GIA) 60–80 mm, fios PDS/poliglactina 3-0/4-0'], pos: ['Dieta precoce conforme trânsito; vigiar sinais de fístula (POD 3–7: febre, taquicardia, dor, secreção entérica)'] },
  dpre: 'obstrução intestinal com sofrimento de alça',
  campos: [{ id: 'seg', l: 'Segmento', o: ['jejuno', 'íleo', 'íleo terminal + ceco (ileocolectomia)'] }, { id: 'dist', l: 'Distância de referência', t: 'txt', d: 'a ___ cm do ângulo de Treitz / ___ cm da válvula ileocecal' },
    { id: 'ext', l: 'Extensão ressecada (cm)', t: 'txt', d: '' }, { id: 'mot', l: 'Motivo', t: 'txt', d: 'necrose por estrangulamento' },
    { id: 'anast', l: 'Anastomose', o: ['laterolateral funcional terminoterminal mecânica com grampeador linear cortante, fechamento do óstio com grampeador/sutura', 'terminoterminal manual em plano único extramucoso com PDS 4-0 contínuo', 'terminoterminal manual em dois planos', 'sem anastomose — alças fechadas (controle de danos) / estomia'] },
    { id: 'rest', l: 'Delgado remanescente estimado (cm)', t: 'txt', d: '' }],
  body: (v) => `Identificado segmento de ${v.seg} ${v.dist}, com ${v.mot}. Delimitadas margens com borda sangrante, coloração e peristalse preservadas. Ligadura do mesentério com fio/selador e ressecção de ${v.ext || '___'} cm de ${v.seg}. Reconstrução: ${v.anast}. Anastomose pérvia, sem tensão e bem vascularizada; fechamento da brecha mesentérica com poliglactina 3-0. ${v.rest ? `Delgado remanescente estimado em ${v.rest} cm.` : ''}`,
  fontes: ['wses_asbo2017'] });

CC({ id: 'c_bridas', cat: 'Intestino e laparotomia', title: 'Enterólise (lise de bridas) por obstrução',
  alias: ['bridas', 'aderencias', 'enterolise', 'obstrucao intestinal', 'asbo'],
  resumo: 'Indicada após falha do tratamento conservador (até 72 h) ou se sinais de estrangulamento. Laparoscopia em casos selecionados (brida única, distensão moderada).',
  ic: { ind: ['Obstrução por bridas com sinais de sofrimento (TC: alça fechada, redução de realce, pneumatose, ascite, dor contínua, febre, leucocitose, lactato)', 'Falha do tratamento conservador após 72 h ou contraste hidrossolúvel que não chega ao cólon em 24 h'], ci: ['Obstrução parcial com melhora clínica (manter conservador)', 'Carcinomatose difusa com obstruções múltiplas (avaliar paliação)'], mat: ['Caixa de laparotomia ou vídeo, pinças atraumáticas, tesoura'], pos: ['SNG conforme débito; dieta com retorno do trânsito; vigiar lesão inadvertida não reconhecida (enterotomia tardia)'] },
  dpre: 'obstrução intestinal por bridas',
  campos: [{ id: 'via', l: 'Via', o: ['laparotomia mediana', 'videolaparoscopia', 'videolaparoscopia convertida para laparotomia'] },
    { id: 'ach', l: 'Achados', o: ['brida única causando obstrução de íleo, com distensão a montante e alças colabadas a jusante', 'múltiplas aderências com ponto de obstrução em íleo', 'hérnia interna por brida', 'volvo de delgado sobre brida'] },
    { id: 'via2', l: 'Viabilidade', o: ['alças viáveis após liberação', 'segmento necrótico — enterectomia (ver descrição própria)'] },
    { id: 'ent', l: 'Enterotomias', o: ['sem lesões de serosa/enterotomias', 'lesões de serosa reparadas com PDS 4-0', 'enterotomia inadvertida rafiada em dois planos'] }],
  body: (v) => `Acesso: ${v.via}. Achados: ${v.ach}. Realizada enterólise com secção das bridas, liberação do ponto de obstrução e revisão de todo o delgado do ângulo de Treitz à válvula ileocecal. Viabilidade: ${v.via2}. ${v.ent.charAt(0).toUpperCase() + v.ent.slice(1)}. Ordenha retrógrada do conteúdo para o estômago (aspirado pela SNG).`,
  fontes: ['wses_asbo2017'] });

CC({ id: 'c_graham', cat: 'Intestino e laparotomia', title: 'Ulcerorrafia com patch de omento (Graham)',
  alias: ['ulcera perfurada', 'graham', 'ulcerorrafia', 'patch omental', 'pneumoperitonio', 'boey'],
  resumo: 'Úlcera péptica perfurada: rafia + omentopexia (laparoscópica ou aberta), lavagem, IBP e erradicação de H. pylori. Úlcera gástrica: biópsia das bordas (excluir câncer).',
  ic: { ind: ['Úlcera péptica perfurada com pneumoperitônio/peritonite'], ci: ['Tratamento não operatório (Taylor) só em casos muito selecionados: perfuração tamponada (sem extravasamento de contraste), estável, sem peritonite difusa, <70 anos'], mat: ['Caixa de laparotomia/vídeo, poliglactina/PDS 2-0 ou 3-0, aspirador'], pos: ['IBP em dose alta (ex.: pantoprazol 40 mg 12/12h) e depois VO por 8 semanas; pesquisar e erradicar H. pylori; EDA de controle em 6–8 semanas (úlcera gástrica)'] },
  dpre: 'abdome agudo perfurativo (úlcera péptica perfurada)',
  campos: [{ id: 'via', l: 'Via', o: ['videolaparoscopia', 'laparotomia mediana supraumbilical'] },
    { id: 'loc', l: 'Localização', o: ['parede anterior do bulbo duodenal', 'região pré-pilórica', 'pequena curvatura gástrica', 'antro gástrico'] },
    { id: 'tam', l: 'Tamanho (mm)', t: 'txt', d: '' }, { id: 'cont', l: 'Contaminação', o: ['líquido bilioso/gástrico em andar superior', 'peritonite química difusa', 'peritonite purulenta difusa'] },
    { id: 'bx', l: 'Biópsia', o: ['não (úlcera duodenal)', 'biópsia das bordas enviada (úlcera gástrica)'] }],
  body: (v) => `Acesso: ${v.via}. Achados: perfuração de ${v.tam || '___'} mm em ${v.loc}, com ${v.cont}. Biópsia: ${v.bx}.\nRealizada rafia com pontos separados de poliglactina 2-0 em sentido transversal, sem atar inicialmente, interposição de retalho pediculado de omento maior sobre a perfuração e amarração dos pontos sobre o omento (técnica de Graham). Teste de estanqueidade com SF/ar. Aspiração e lavagem da cavidade com SF morno até retorno claro.`,
  fontes: ['wses_pud2020'] });

CC({ id: 'c_hartmann', cat: 'Intestino e laparotomia', title: 'Retossigmoidectomia (Hartmann) / ressecção com anastomose',
  alias: ['hartmann', 'colostomia', 'retossigmoidectomia', 'diverticulite perfurada', 'hinchey', 'volvo de sigmoide'],
  resumo: 'Diverticulite perfurada Hinchey III/IV, volvo de sigmoide com necrose, tumor obstrutivo/perfurado. Em estáveis: ressecção com anastomose primária ± ileostomia de proteção é alternativa; instáveis/fecal: Hartmann.',
  ic: { ind: ['Peritonite purulenta/fecal por diverticulite (Hinchey III/IV) — Hartmann se instável/imunossuprimido/fecal', 'Volvo de sigmoide com necrose/perfuração ou falha da descompressão endoscópica', 'Neoplasia obstrutiva/perfurada de sigmoide'], ci: ['Lavagem laparoscópica isolada só em Hinchey III selecionado (maior reintervenção)'], mat: ['Caixa de laparotomia, grampeadores linear e circular, afastador, bastão para estomia'], pos: ['Cuidado da colostomia (estomaterapia); reconstrução do trânsito após 3–6 meses'] },
  dpre: 'diverticulite aguda perfurada (Hinchey III)',
  campos: [{ id: 'via', l: 'Via', o: ['laparotomia mediana', 'videolaparoscopia'] }, { id: 'ach', l: 'Achados', t: 'txt', d: 'peritonite purulenta difusa por perfuração de divertículo em sigmoide (Hinchey III)' },
    { id: 'tec', l: 'Reconstrução', o: ['colostomia terminal em fossa ilíaca esquerda com fechamento do coto retal (Hartmann)', 'anastomose colorretal primária mecânica', 'anastomose colorretal primária + ileostomia em alça de proteção'] },
    { id: 'coto', l: 'Coto retal', o: ['fechado com grampeador linear e reparado com fio de polipropileno', 'fechado com sutura contínua em dois planos'] }],
  body: (v) => `Acesso: ${v.via}. Achados: ${v.ach}. Mobilização do cólon sigmoide pela linha de Toldt com identificação e preservação do ureter esquerdo e vasos gonadais. Ligadura dos vasos sigmoidianos/mesocólon e secção do cólon descendente distal e do reto alto com grampeador linear. Peça retirada. Reconstrução: ${v.tec}${v.tec.includes('Hartmann') ? `; coto retal ${v.coto}` : ''}. ${v.tec.includes('colostomia') || v.tec.includes('ileostomia') ? 'Estomia exteriorizada por incisão circular no local demarcado, através do músculo reto abdominal, maturada com pontos de poliglactina 3-0 (pele–seromuscular–mucosa). ' : ''}Lavagem da cavidade.`,
  fontes: ['wses2020div'] });

CC({ id: 'c_estomia', cat: 'Intestino e laparotomia', title: 'Ileostomia / colostomia em alça (derivação)',
  alias: ['ileostomia', 'colostomia em alca', 'estomia', 'derivacao', 'brooke'],
  resumo: 'Derivação de proteção ou paliação (obstrução, fístula, lesão perineal/Fournier). Demarcar o local no pré-operatório (dentro do reto abdominal, longe de pregas e cicatrizes).',
  ic: { ind: ['Proteção de anastomose baixa', 'Obstrução colorretal irressecável/paliação', 'Derivação fecal em Fournier extenso, lesão de reto, fístula complexa'], ci: [], mat: ['Bastão/ponte para estomia, poliglactina 3-0, bolsa coletora'], pos: ['Ileostomia: vigiar alto débito (>1,5 L/dia — risco de desidratação/LRA); estomaterapia'] },
  dpre: '',
  campos: [{ id: 'tipo', l: 'Estomia', o: ['ileostomia em alça', 'colostomia em alça de transverso', 'colostomia em alça de sigmoide'] }, { id: 'local', l: 'Local', o: ['fossa ilíaca direita', 'fossa ilíaca esquerda', 'hipocôndrio direito', 'hipocôndrio esquerdo'] },
    { id: 'via', l: 'Via', o: ['incisão local (trefina)', 'videolaparoscopia', 'laparotomia'] }],
  body: (v) => `Acesso: ${v.via}. Incisão circular de 2,5–3 cm na ${v.local}, no local previamente demarcado, abertura cruciforme da aponeurose e divulsão do músculo reto abdominal. Exteriorização da alça (${v.tipo}) sem torção e sem tensão, com bastão de sustentação. Abertura transversal da alça e maturação com pontos de poliglactina 3-0${v.tipo.includes('ileo') ? ', com eversão da boca aferente (técnica de Brooke, ~2–3 cm)' : ''}. Bolsa coletora instalada.`,
  fontes: ['ascrs_ostomy'] });

/* ===================== TRAUMA ===================== */
CC({ id: 'c_dcs', cat: 'Trauma', title: 'Laparotomia de controle de danos',
  alias: ['controle de danos', 'damage control', 'packing', 'peritoneostomia', 'bolsa de bogota', 'vac', 'triade letal'],
  resumo: 'Cirurgia abreviada (≤60–90 min): controlar hemorragia e contaminação, fechamento temporário, UTI para corrigir a tríade letal e reoperação planejada em 24–48 h.',
  ic: { ind: ['Trauma com choque hemorrágico e tríade letal: pH <7,2, temperatura <35 °C, coagulopatia (INR >1,5), transfusão maciça', 'Lesões complexas que exigem tempo prolongado; síndrome compartimental iminente', 'Sepse abdominal grave instável (peritonite fecal) — princípio análogo'], ci: [], mat: ['Caixa de laparotomia, compressas em grande quantidade, shunts vasculares, grampeadores, sistema de pressão negativa/bolsa de Bogotá'], pos: ['UTI: aquecimento, correção da coagulopatia, ressuscitação balanceada, cálcio; reabordagem em 24–48 h; fechamento definitivo o mais precoce possível'] },
  dpre: 'trauma abdominal com choque hemorrágico',
  campos: [{ id: 'mec', l: 'Mecanismo', o: ['ferimento por arma de fogo', 'ferimento por arma branca', 'trauma contuso (acidente automobilístico)', 'queda de altura'] },
    { id: 'hemop', l: 'Hemoperitônio (mL)', t: 'txt', d: '' }, { id: 'les', l: 'Lesões identificadas', t: 'txt', d: '' },
    { id: 'hem', l: 'Controle da hemorragia', t: 'txt', d: 'empacotamento peri-hepático com compressas (___ compressas)' }, { id: 'cont2', l: 'Controle da contaminação', t: 'txt', d: 'ressecção de segmento de íleo com alças deixadas fechadas com grampeador, sem anastomose' },
    { id: 'fech', l: 'Fechamento temporário', o: ['peritoneostomia com sistema de pressão negativa', 'bolsa de Bogotá', 'fechamento apenas da pele (temporário)'] }],
  body: (v) => `Indicação de controle de danos por instabilidade hemodinâmica e tríade letal. Laparotomia xifopúbica, aspiração de ~${v.hemop || '___'} mL de sangue e coágulos, empacotamento dos quatro quadrantes. Mecanismo: ${v.mec}.\nLesões: ${v.les || '___'}.\nControle da hemorragia: ${v.hem}. Controle da contaminação: ${v.cont2}. Fechamento temporário: ${v.fech}. Comunicado à equipe da UTI; reabordagem programada em 24–48 h.`,
  fontes: ['atls', 'wses_dcs'] });

CC({ id: 'c_espleno', cat: 'Trauma', title: 'Esplenectomia (trauma)',
  alias: ['esplenectomia', 'baco', 'trauma esplenico', 'aast', 'vacinas'],
  resumo: 'Lesão esplênica com instabilidade, falha do tratamento não operatório ou lesão de hilo. Vacinar (pneumococo, meningococo ACWY e B, Hib) após 14 dias ou antes da alta.',
  ic: { ind: ['Lesão esplênica (AAST IV–V) com instabilidade', 'Falha do manejo não operatório/angioembolização', 'Lesões associadas que exigem laparotomia com sangramento esplênico ativo'], ci: ['Paciente estável sem sangramento ativo: manejo não operatório ± angioembolização'], mat: ['Caixa de laparotomia, pinças vasculares, fios de seda/polipropileno, ligaduras'], pos: ['Vacinas (CRIE): pneumocócica, meningocócica ACWY e B, Haemophilus; plaquetose reativa (AAS se >1 milhão); orientação sobre sepse pós-esplenectomia'] },
  dpre: 'trauma esplênico',
  campos: [{ id: 'grau', l: 'Lesão (AAST)', o: ['grau III', 'grau IV — lesão de vasos segmentares/hilares com desvascularização >25%', 'grau V — baço pulverizado / lesão de hilo com desvascularização total'] },
    { id: 'pan', l: 'Cauda do pâncreas', o: ['identificada e preservada', 'com lesão — dreno locorregional'] }],
  body: (v) => `Laparotomia mediana, empacotamento, identificado sangramento ativo de origem esplênica: ${v.grau}. Mobilização do baço com secção dos ligamentos esplenorrenal, esplenofrênico e esplenocólico, rotação medial do baço e cauda do pâncreas. Ligadura dos vasos gástricos curtos. Ligadura do hilo esplênico (artéria e depois veia) com fio inabsorvível. Cauda do pâncreas ${v.pan}. Esplenectomia completada. Revisão da hemostasia do leito.`,
  fontes: ['wses_spleen2017', 'atls'] });

/* ===================== PROCTOLOGIA ===================== */
CC({ id: 'c_hemorr', cat: 'Proctologia', title: 'Hemorroidectomia (Milligan-Morgan / Ferguson)',
  alias: ['hemorroidectomia', 'hemorroida', 'milligan morgan', 'ferguson', 'mamilos'],
  resumo: 'Doença hemorroidária grau III–IV ou refratária, mista com componente externo. Preservar pontes mucocutâneas entre as feridas (prevenir estenose).',
  ic: { ind: ['Hemorroidas internas grau III–IV sintomáticas', 'Falha de tratamento ambulatorial (ligadura elástica) em grau I–II', 'Mistas com componente externo importante; trombose com necrose/ulceração'], ci: ['Doença de Crohn perianal ativa, imunossupressão grave, coagulopatia, incontinência pré-existente (relativas)', 'Gestação (adiar)'], mat: ['Afastador anal (Hill-Ferguson/Pratt), pinças, eletrocautério ou selador, poliglactina 2-0/3-0'], pos: ['Analgesia multimodal (AINE, dipirona, opioide de resgate), metronidazol VO 7 dias reduz dor, laxante osmótico + fibras, banhos de assento; retenção urinária é comum'] },
  dpre: 'doença hemorroidária grau III',
  anest: ['raquianestesia em sela', 'raquianestesia', 'geral balanceada', 'bloqueio perianal + sedação'],
  campos: [{ id: 'pos', l: 'Posição', o: ['litotomia', 'canivete (prona)'] }, { id: 'tec', l: 'Técnica', o: ['aberta (Milligan-Morgan)', 'fechada (Ferguson)'] },
    { id: 'mam', l: 'Mamilos ressecados', t: 'txt', d: 'nas posições de 3, 7 e 11 horas' }],
  body: (v) => `Paciente em posição de ${v.pos}, sob anestesia, antissepsia e campos. Toque retal e anuscopia: mamilos hemorroidários ${v.mam}. Realizada hemorroidectomia ${v.tec}: incisão em V na pele perianal de cada mamilo, dissecção do plexo hemorroidário do esfíncter anal interno (preservado), ligadura transfixante do pedículo com poliglactina 2-0 e ressecção${v.tec.includes('Ferguson') ? ', com fechamento das feridas com sutura contínua de poliglactina 3-0' : ', feridas deixadas abertas'}. Preservadas pontes mucocutâneas entre as feridas. Hemostasia. Curativo com gaze.`,
  fontes: ['ascrs_hem2024'] });

CC({ id: 'c_abscperi', cat: 'Proctologia', title: 'Drenagem de abscesso anorretal',
  alias: ['abscesso perianal', 'abscesso isquiorretal', 'abscesso anorretal', 'setton', 'fistula anal'],
  resumo: 'Drenagem precoce (não esperar flutuação). Incisão próxima à borda anal (trajeto de fístula curto). Fístula evidente: setton frouxo; não fazer fistulotomia agressiva no agudo.',
  ic: { ind: ['Abscesso perianal, isquiorretal, interesfincteriano ou supraelevador'], ci: ['Nenhuma — drenar; abscessos supraelevadores/complexos: TC/RM e drenagem em centro cirúrgico'], mat: ['Lâmina 11/15, pinças, estilete, dreno de Penrose ou cateter de Pezzer (abscessos profundos), setton (vessel loop)'], pos: ['Banhos de assento, analgesia; ATB se celulite extensa, diabetes, imunossupressão, prótese valvar ou sepse; reavaliar fístula em 6–8 semanas'] },
  dpre: 'abscesso perianal',
  anest: ['raquianestesia em sela', 'geral balanceada', 'local + sedação'],
  campos: [{ id: 'tipo', l: 'Tipo', o: ['perianal', 'isquiorretal', 'interesfincteriano', 'supraelevador', 'em ferradura'] }, { id: 'pos', l: 'Localização (horas)', t: 'txt', d: '' },
    { id: 'vol', l: 'Secreção drenada (mL)', t: 'txt', d: '' }, { id: 'fist', l: 'Fístula', o: ['orifício interno não identificado', 'orifício interno identificado — setton frouxo com vessel loop', 'fístula superficial — fistulotomia'] }],
  body: (v) => `Paciente em litotomia, sob anestesia. Exame sob anestesia: abscesso ${v.tipo} às ${v.pos || '___'} horas. Incisão radial/cruciforme próxima à borda anal, com drenagem de ${v.vol || '___'} mL de secreção purulenta. Rompimento das lojas, lavagem com SF. Fístula: ${v.fist}. Cavidade deixada aberta com gaze.`,
  fontes: ['ascrs_abscess2022'] });

CC({ id: 'c_pilon', cat: 'Proctologia', title: 'Cisto pilonidal (exérese ou drenagem)',
  alias: ['cisto pilonidal', 'doenca pilonidal', 'limberg', 'karydakis', 'pit picking'],
  resumo: 'Abscesso: drenagem lateral à linha média. Doença crônica: técnicas mínimas (pit picking) ou ressecção com fechamento fora da linha média (Karydakis/Bascom/Limberg) — evitar fechamento na linha média.',
  ic: { ind: ['Abscesso pilonidal (drenagem)', 'Doença crônica/recorrente sintomática (exérese)'], ci: ['Exérese definitiva durante abscesso agudo (drenar primeiro)'], mat: ['Lâmina, estilete, azul de metileno, eletrocautério, fios'], pos: ['Depilação/laser da região, higiene; curativos se ferida aberta'] },
  dpre: 'doença pilonidal sacrococcígea',
  campos: [{ id: 'tec', l: 'Técnica', o: ['drenagem de abscesso por incisão lateral à linha média', 'ressecção com ferida aberta (2ª intenção)', 'ressecção com retalho de Limberg (romboide)', 'ressecção com fechamento assimétrico (Karydakis)', 'pit picking (Bascom I)'] }, { id: 'or', l: 'Orifícios', t: 'txt', d: '' }],
  body: (v) => `Paciente em decúbito ventral (canivete), sob anestesia, afastamento dos glúteos com fita, antissepsia. Identificados ${v.or || '___'} orifícios (pits) na linha média sacrococcígea; injeção de azul de metileno. Realizada ${v.tec}. Hemostasia. Curativo.`,
  fontes: ['ascrs_pilonidal'] });

/* ===================== PELE E PARTES MOLES ===================== */
CC({ id: 'c_lesao', cat: 'Pele e partes moles', title: 'Exérese de lesão de pele / subcutâneo',
  alias: ['exerese', 'lipoma', 'cisto sebaceo', 'cisto epidermico', 'nevo', 'biopsia excisional', 'carcinoma basocelular'],
  resumo: 'Incisão fusiforme (3:1) no sentido das linhas de tensão; margens conforme a hipótese (nevo atípico 1–3 mm; CBC 4 mm; CEC 4–6 mm). Sempre enviar para anatomopatológico.',
  ic: { ind: ['Lesão suspeita (ABCDE), sintomática, com crescimento ou por estética', 'Cisto epidérmico recorrente/inflamado (após resolução da inflamação)', 'Lipoma sintomático ou >5 cm (excluir lipossarcoma com imagem se profundo/>5 cm)'], ci: ['Cisto inflamado/abscedado (drenar primeiro)', 'Suspeita de sarcoma — não fazer biópsia excisional "aberta"; imagem e biópsia planejada'], mat: ['Caixa de pequena cirurgia, lâmina 15, fios náilon 4-0/5-0, poliglactina 4-0, lidocaína com vasoconstritor, frasco com formol'], pos: ['Curativo seco; retirada de pontos conforme região; resultado do anatomopatológico'] },
  dpre: '',
  anest: ['local', 'local + sedação'],
  campos: [{ id: 'les', l: 'Lesão', o: ['cisto epidérmico', 'lipoma', 'nevo melanocítico', 'lesão suspeita de carcinoma basocelular', 'lesão suspeita de carcinoma espinocelular', 'lesão a esclarecer'] }, { id: 'loc', l: 'Local', t: 'txt', d: '' },
    { id: 'tam', l: 'Tamanho (cm)', t: 'txt', d: '' }, { id: 'marg', l: 'Margem (mm)', t: 'txt', d: '' }, { id: 'anl', l: 'Anestésico', t: 'txt', d: '@lido' },
    { id: 'sut', l: 'Sutura', t: 'txt', d: 'subcutâneo com poliglactina 4-0 e pele com náilon 4-0 pontos simples' }],
  ccf: [{ id: 'ap', l: 'Anatomopatológico', o: ['peça enviada para exame anatomopatológico (reparo de orientação no polo ___)', 'peça enviada para exame anatomopatológico'] }, { id: 'interc', l: 'Intercorrências', o: ['sem intercorrências', 'ruptura da cápsula do cisto, ressecado integralmente'] }, CAMPO_OBS],
  body: (v) => `Antissepsia, campos estéreis, anestesia local com ${v.anl}. Incisão fusiforme no sentido das linhas de tensão sobre ${v.les} em ${v.loc || '___'}, de ${v.tam || '___'} cm, com margem de ${v.marg || '___'} mm. Exérese completa da lesão${v.les === 'lipoma' || v.les === 'cisto epidérmico' ? ' com cápsula íntegra' : ''}. Hemostasia. Fechamento: ${v.sut}. Curativo.`,
  calc: (p) => ({ lido: p.w ? `lidocaína 2% com vasoconstritor __ mL (máx. ${nf(Math.min(7 * p.w, 500) / 20, 1)} mL = 7 mg/kg)` : 'lidocaína 2% com vasoconstritor' }),
  fontes: ['sbd_cir'] });

CC({ id: 'c_unha', cat: 'Pele e partes moles', title: 'Cantoplastia / matricectomia parcial (unha encravada)',
  alias: ['unha encravada', 'onicocriptose', 'cantoplastia', 'matricectomia', 'fenol'],
  resumo: 'Onicocriptose estágio II–III ou recorrente: ressecção da espícula lateral com matricectomia (cirúrgica ou química com fenol 88%).',
  ic: { ind: ['Onicocriptose com granuloma/infecção recorrente ou falha de medidas conservadoras'], ci: ['Doença arterial periférica grave/isquemia do pé (relativa — avaliação vascular)', 'Diabetes descompensado com neuropatia/isquemia (relativa)'], mat: ['Lidocaína 2%, garrote (dreno de Penrose), espátula, tesoura, pinça, cureta, fenol 88% (se química), gaze'], pos: ['Elevação do membro, curativo em 48 h, banhos com água e sabão; ATB só se celulite'] },
  dpre: 'onicocriptose',
  anest: ['local (bloqueio digital)'],
  campos: [{ id: 'dedo', l: 'Dedo', o: ['hálux direito', 'hálux esquerdo'] }, { id: 'bord', l: 'Borda', o: ['lateral', 'medial', 'ambas'] }, { id: 'tec', l: 'Matricectomia', o: ['química com fenol 88% (3 aplicações de 30 s) e neutralização com álcool', 'cirúrgica (exérese da matriz germinativa)'] }],
  ccf: [{ id: 'interc', l: 'Intercorrências', o: ['sem intercorrências'] }, CAMPO_OBS],
  body: (v) => `Antissepsia, bloqueio digital com lidocaína 2% sem vasoconstritor, garrote na base do ${v.dedo}. Descolamento da lâmina ungueal e secção longitudinal de 3–4 mm da borda ${v.bord} até a matriz; remoção da espícula e do tecido de granulação com cureta. Matricectomia ${v.tec}. Retirada do garrote, hemostasia, curativo compressivo.`,
  fontes: ['sbd_cir'] });

CC({ id: 'c_fournier', cat: 'Pele e partes moles', title: 'Desbridamento de Fournier / fasceíte necrosante',
  alias: ['fournier', 'fasceite necrosante', 'desbridamento', 'gangrena', 'lrinec'],
  resumo: 'Emergência: desbridamento radical até tecido sangrante e viável, antibiótico de amplo espectro + clindamicina, reabordagens a cada 24–48 h.',
  ic: { ind: ['Suspeita clínica de fasceíte necrosante (dor desproporcional, crepitação, bolhas hemorrágicas, necrose, sepse) — não esperar imagem', 'LRINEC ≥6 aumenta a suspeita (baixo valor para excluir)'], ci: ['Nenhuma — cirurgia é salvadora'], mat: ['Caixa de laparotomia/pequena cirurgia, eletrocautério, irrigação abundante, curativos/terapia por pressão negativa'], pos: ['Pipe-tazo ou meropenem + vancomicina + clindamicina; UTI; reabordagem em 24 h; considerar colostomia de derivação se acometimento perineal extenso; controle glicêmico'] },
  dpre: 'gangrena de Fournier',
  campos: [{ id: 'ext', l: 'Extensão', t: 'txt', d: 'períneo, bolsa escrotal e região inguinal ___' }, { id: 'test', l: 'Testículos', o: ['viáveis, preservados (irrigação independente)', 'necessidade de orquiectomia'] },
    { id: 'der', l: 'Derivação', o: ['sem derivação', 'colostomia em alça de sigmoide associada', 'cistostomia associada'] }, { id: 'cult', l: 'Culturas', o: ['coletadas (tecido profundo)', 'não coletadas'] }],
  body: (v) => `Paciente em litotomia, sob anestesia. Achados: necrose de pele, subcutâneo e fáscia com secreção fétida "água de lavar louça" acometendo ${v.ext}. Desbridamento radical de todo tecido desvitalizado até tecido sangrante e viável, com abertura dos planos fasciais e teste do dedo. Testículos ${v.test}. Culturas ${v.cult}. Lavagem abundante com SF. ${v.der.charAt(0).toUpperCase() + v.der.slice(1)}. Ferida deixada aberta com curativo (gaze úmida / pressão negativa). Reabordagem programada em 24 h.`,
  fontes: ['wses_sti2018', 'eau_fournier'] });

CC({ id: 'c_gtt', cat: 'Pele e partes moles', title: 'Gastrostomia (Stamm) aberta',
  alias: ['gastrostomia', 'stamm', 'sonda de gastrostomia', 'nutricao enteral'],
  resumo: 'Acesso enteral prolongado (>4–6 semanas) quando a gastrostomia endoscópica (PEG) não é possível (obstrução de orofaringe/esôfago).',
  ic: { ind: ['Necessidade de nutrição enteral >4–6 semanas sem possibilidade de PEG', 'Descompressão gástrica prolongada'], ci: ['Ascite volumosa, coagulopatia, carcinomatose peritoneal, varizes gástricas (relativas)'], mat: ['Caixa de laparotomia, sonda de Foley/gastrostomia 20–24 Fr, fios absorvíveis 2-0/3-0'], pos: ['Uso da sonda após 24 h; fixação e rotação diária; não trocar antes de 4–6 semanas (trajeto)'] },
  dpre: '',
  campos: [{ id: 'sonda', l: 'Sonda', o: ['Foley 20 Fr', 'sonda de gastrostomia 24 Fr', 'Foley 22 Fr'] }],
  body: (v) => `Laparotomia mediana supraumbilical (ou transversa em hipocôndrio esquerdo) de 5 cm. Identificada a parede anterior do corpo gástrico. Duas suturas em bolsa concêntricas com poliglactina 2-0, gastrotomia central e introdução de ${v.sonda}, balão insuflado; amarração das bolsas invaginando a parede. Exteriorização da sonda por contra-abertura no hipocôndrio esquerdo e fixação da parede gástrica ao peritônio parietal com 4 pontos (gastropexia). Fechamento da parede por planos e fixação da sonda à pele.`,
  fontes: ['espen2019'] });

/* ===================== UROLOGIA ===================== */
CC({ id: 'c_torcao', cat: 'Urologia', title: 'Exploração escrotal por torção testicular',
  alias: ['torcao testicular', 'escroto agudo', 'orquidopexia', 'orquiectomia', 'twist'],
  resumo: 'Torção é emergência: viabilidade cai muito após 6 h. Suspeita clínica alta (TWIST ≥5) → explorar sem esperar Doppler. Fixar o testículo contralateral.',
  ic: { ind: ['Suspeita clínica de torção (dor súbita, testículo horizontalizado/alto, reflexo cremastérico ausente)', 'Doppler com fluxo ausente/reduzido ou dúvida diagnóstica'], ci: ['Nenhuma — não atrasar por exames se TWIST alto (detorção manual "abrindo o livro" pode ser tentada como ponte)'], mat: ['Caixa de pequena cirurgia, fio inabsorvível 4-0 (polipropileno) para orquidopexia, compressas mornas'], pos: ['Analgesia, suspensório escrotal, retorno; orquiectomia: discutir prótese futura'] },
  dpre: 'torção testicular',
  anest: ['raquianestesia', 'geral balanceada'],
  campos: [{ id: 'lado', l: 'Lado', o: LADO }, { id: 'graus', l: 'Torção (graus)', t: 'txt', d: '360' }, { id: 'tempo', l: 'Tempo de sintomas (h)', t: 'txt', d: '' },
    { id: 'via', l: 'Viabilidade após detorção + compressas mornas por 10 min', o: ['testículo viável (recuperação da coloração e sangramento à incisão da túnica albugínea)', 'testículo inviável (necrose)'] },
    { id: 'cond', l: 'Conduta', o: ['orquidopexia bilateral com 3 pontos de polipropileno 4-0', 'orquiectomia do lado acometido + orquidopexia contralateral'] }],
  body: (v) => `Incisão na rafe mediana escrotal (ou transversa hemiescrotal ${v.lado}). Abertura da túnica vaginal com saída de líquido sero-hemático. Achados: torção intravaginal do cordão espermático de ${v.graus}° à ${v.lado}, com ${v.tempo || '___'} h de evolução. Detorção e aplicação de compressas mornas por 10 min: ${v.via}. Conduta: ${v.cond}. Hemostasia, fechamento da túnica dartos com poliglactina 3-0 e pele com categute/poliglactina 4-0.`,
  fontes: ['eau_ped_torsion', 'aua'] });

CC({ id: 'c_postec', cat: 'Urologia', title: 'Postectomia (circuncisão)',
  alias: ['postectomia', 'circuncisao', 'fimose', 'parafimose', 'balanopostite'],
  resumo: 'Fimose patológica (cicatricial, balanopostites de repetição, líquen escleroso), parafimose recorrente. Técnica de dupla incisão (manga) no adulto.',
  ic: { ind: ['Fimose patológica / falha de corticoide tópico (betametasona 0,05% 2×/dia por 4–8 semanas)', 'Balanopostites recorrentes, líquen escleroso, parafimose recorrente, ITU recorrente em lactentes com uropatia'], ci: ['Hipospádia/epispádia (prepúcio usado na correção)', 'Infecção aguda local (tratar antes)', 'Coagulopatia não corrigida'], mat: ['Caixa de pequena cirurgia, bisturi, tesoura, pinças mosquito, poliglactina rápida (Vicryl Rapide) ou categute 4-0/5-0'], pos: ['Analgesia, curativo com vaselina, evitar atividade sexual por 4–6 semanas, sinais de sangramento/infecção'] },
  dpre: 'fimose',
  anest: ['bloqueio peniano + sedação', 'raquianestesia', 'geral balanceada (criança)', 'local'],
  campos: [{ id: 'tec', l: 'Técnica', o: ['dupla incisão (manga)', 'ressecção dorsal + ventral (guilhotina guiada)'] }, { id: 'frenulo', l: 'Frênulo', o: ['preservado', 'frenuloplastia associada'] }],
  body: (v) => `Antissepsia, campos, bloqueio. Liberação de aderências balanoprepuciais. Postectomia por ${v.tec}: incisão circular na pele a ~1 cm do sulco coronal e incisão circular da mucosa interna, ressecção do anel prepucial entre elas. Frênulo ${v.frenulo}. Hemostasia rigorosa com bipolar/ligaduras. Aproximação mucocutânea com pontos separados de poliglactina de absorção rápida 4-0 (pontos cardeais e intercalares). Curativo com vaselina.`,
  fontes: ['eau_ped2024'] });
