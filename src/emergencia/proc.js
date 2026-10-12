// Procedimentos de sala vermelha/PS — técnica resumida + gerador de descrição para o prontuário.
// campos: {id, l (rótulo), o (opções; 1ª = padrão) | t:'txt' (texto livre, d = padrão) | t:'num'}
const nowStr = () => { const d = new Date(); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} às ${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}`; };
const sn = (v, s, n) => (v === 'Sim' ? s : n || '');
const LADO = ['direita', 'esquerda'];
const INTERC = (extra = []) => ['sem intercorrências', ...extra];
const tail = (v) => `${v.interc && v.interc !== 'sem intercorrências' ? `Intercorrência: ${v.interc}.` : 'Procedimento sem intercorrências imediatas.'}${v.obs ? ' ' + v.obs : ''}`;
const TOPO = (v, nome, p) => `DESCRIÇÃO DE PROCEDIMENTO — ${nome.toUpperCase()}\nData/hora: ${v.hora}\n${$('ptName').value ? `Paciente: ${$('ptName').value}\n` : ''}`;
const CAMPO_HORA = { id: 'hora', l: 'Data/hora', t: 'txt', d: '@now' };
const CAMPO_OBS = { id: 'obs', l: 'Observações adicionais', t: 'txt', d: '' };
const CAMPO_CONS = { id: 'cons', l: 'Consentimento', o: ['obtido do paciente', 'obtido do responsável legal', 'dispensado — situação de emergência com risco à vida'] };

T({ id: 'p_iot', cat: 'Procedimentos', cor: 'azul', title: 'Intubação orotraqueal (SRI / sequência atrasada)',
  alias: ['iot', 'intubacao', 'sri', 'isr', 'descricao intubacao', 'dsi', 'sequencia atrasada', 'pre-intubacao', 'checklist'],
  resumo: 'Checklist pré-intubação, otimização fisiológica e descrição padronizada (indução, bloqueio, laringoscopia, Cormack, tubo, rima, confirmação por capnografia).',
  secs: [
    { h: 'Checklist pré-intubação (SOAP-ME + 7 Ps)', li: [
      '**S**ucção funcionando · **O**xigênio (máscara não reinalante + cateter nasal 15 L/min) · **A**via aérea: laringoscópio/videolaringoscópio, lâminas, tubos (7,0–8,0) com cuff testado, fio-guia/bougie, supraglótico, kit de cricotireoidostomia · **P**osicionamento (orelha-esterno, cabeceira 20–30°) · **M**onitorização (SpO₂, PA ciclando a cada 3 min, ECG, **capnografia**) · **E**quipe com papéis definidos e plano A-B-C verbalizado.',
      'Avaliar via aérea difícil anatômica (LEMON, MOANS) e **fisiológica** (hipoxemia, hipotensão, acidose metabólica grave, VD).',
      '**Otimização pré-intubação**: pré-oxigenação 3 min (ou VNI/CNAF se hipoxêmico), volume/noradrenalina se choque index >0,8, push-dose de adrenalina preparado, FR alta pós-IOT se acidose.' ] },
    { h: 'Sequência atrasada (DSI)', li: [ 'Paciente agitado/delirante que não tolera a pré-oxigenação: **cetamina 1 mg/kg IV** (dissociação, mantém drive) → pré-oxigenar 3 min com máscara/VNI → bloqueador neuromuscular → intubar. Doses na tela Intubação (SRI).' ] },
    { h: 'Complicações', li: [ 'Intubação esofágica (capnografia sem curva), seletiva (ausculta assimétrica — tracionar 1–2 cm), hipoxemia, hipotensão/PCR pós-indução, broncoaspiração, trauma dentário/de via aérea, pneumotórax.' ] },
  ],
  rx: [],
  proc: { campos: [CAMPO_HORA,
    { id: 'tipo', l: 'Técnica', o: ['sequência rápida de intubação (SRI)', 'sequência atrasada de intubação (DSI)', 'intubação com paciente acordado (topicalização)', 'intubação em parada cardiorrespiratória (sem drogas)'] },
    { id: 'ind', l: 'Indicação', o: ['insuficiência respiratória aguda hipoxêmica', 'insuficiência respiratória hipercápnica', 'rebaixamento do nível de consciência (Glasgow ≤8) para proteção de via aérea', 'choque refratário', 'parada cardiorrespiratória', 'estado de mal epiléptico refratário', 'trauma com via aérea ameaçada', 'agitação grave com necessidade de exames/procedimentos'] },
    { id: 'preox', l: 'Pré-oxigenação', o: ['máscara não reinalante 15 L/min + cateter nasal 15 L/min (oxigenação apneica) por 3 min', 'ventilação não invasiva (FiO₂ 100%) por 3 min', 'cateter nasal de alto fluxo', 'bolsa-válvula-máscara com PEEP'] },
    { id: 'pre', l: 'Pré-tratamento', o: ['sem pré-tratamento', 'fentanil', 'cristaloide em bolus + noradrenalina já em infusão'] },
    { id: 'ind1', l: 'Indutor', o: ['etomidato', 'cetamina', 'propofol', 'midazolam', 'sem indutor'] },
    { id: 'dind', l: 'Dose do indutor (mg)', t: 'txt', d: '' },
    { id: 'bnm', l: 'Bloqueador neuromuscular', o: ['rocurônio', 'succinilcolina', 'sem bloqueador'] },
    { id: 'dbnm', l: 'Dose do bloqueador (mg)', t: 'txt', d: '' },
    { id: 'disp', l: 'Dispositivo', o: ['laringoscopia direta com lâmina curva (Macintosh) nº 3', 'laringoscopia direta com lâmina curva nº 4', 'videolaringoscópio', 'laringoscopia direta com lâmina reta (Miller)'] },
    { id: 'cl', l: 'Cormack-Lehane', o: ['I', 'IIa', 'IIb', 'III', 'IV'] },
    { id: 'bougie', l: 'Bougie', o: ['Não', 'Sim'] },
    { id: 'tubo', l: 'Tubo (mm)', o: ['7,5', '8,0', '7,0', '6,5', '8,5'] },
    { id: 'rima', l: 'Fixação na rima labial (cm)', o: ['22', '21', '23', '24', '20'] },
    { id: 'tent', l: 'Tentativas', o: ['1', '2', '3'] },
    { id: 'conf', l: 'Confirmação', o: ['capnografia com curva sustentada, ausculta pulmonar simétrica e ausência de ruídos em epigástrio; RX de tórax solicitado', 'capnografia com curva sustentada e POCUS (deslizamento pleural bilateral)', 'ausculta e expansibilidade simétricas (capnografia indisponível); RX solicitado'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['dessaturação transitória (SpO₂ mínima de __%) revertida com ventilação com bolsa-válvula-máscara', 'hipotensão pós-indução tratada com adrenalina push-dose e noradrenalina', 'intubação esofágica reconhecida pela capnografia e corrigida imediatamente', 'broncoaspiração de conteúdo gástrico', 'trauma dentário / sangramento de orofaringe']) },
    { id: 'vm', l: 'Ventilação inicial', t: 'txt', d: '@vm' },
    { id: 'sed', l: 'Sedoanalgesia contínua', o: ['fentanil + propofol em bomba de infusão', 'fentanil + midazolam em bomba de infusão', 'fentanil + cetamina em bomba de infusão', 'fentanil isolado (analgesia)'] },
    CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Intubação orotraqueal', p) +
      `Indicação: ${v.ind}. Técnica: ${v.tipo}.\n` +
      `Checklist pré-intubação realizado (material de via aérea, aspiração, monitorização com oximetria, PA não invasiva, cardioscopia e capnografia). Paciente posicionado em decúbito dorsal com cabeceira elevada e alinhamento orelha-esterno. Pré-oxigenação com ${v.preox}.\n` +
      `${v.pre === 'sem pré-tratamento' ? '' : `Pré-tratamento: ${v.pre}. `}${v.ind1 === 'sem indutor' ? 'Sem indutor' : `Indução com ${v.ind1} ${v.dind} mg IV`}${v.bnm === 'sem bloqueador' ? '' : ` e bloqueio neuromuscular com ${v.bnm} ${v.dbnm} mg IV`}, aguardados 45–60 s.\n` +
      `Realizada ${v.disp}, visualizado Cormack-Lehane ${v.cl}${v.bougie === 'Sim' ? ', com auxílio de bougie' : ''}. Intubação orotraqueal com tubo nº ${v.tubo} com cuff, em ${v.tent} tentativa(s), fixado a ${v.rima} cm na rima labial; cuff insuflado (pressão 20–30 cmH₂O).\n` +
      `Confirmação: ${v.conf}.\n` +
      `Ventilação mecânica inicial: ${v.vm}. Iniciada sedoanalgesia contínua com ${v.sed}.\n` + tail(v),
    dyn: (v, p) => { const k = { etomidato: 0.3, cetamina: 1.5, propofol: 1.5, midazolam: 0.2 }[v.ind1], b = { 'rocurônio': 1.2, succinilcolina: 1.5 }[v.bnm]; const wi = v.ind1 === 'propofol' ? (p.aj || p.w) : p.w; return { dind: k && p.w ? nf(k * wi, 0) : '___', dbnm: b && p.w ? nf(Math.min(b * p.w, v.bnm === 'succinilcolina' ? 200 : 1e9), 0) : '___' }; },
    calc: (p) => ({ vm: p.pp ? `VCV, VC ${nf(6 * p.pp, 0)} mL (6 mL/kg de peso predito ${nf(p.pp, 1)} kg), FR 16–18 irpm, PEEP 5–8 cmH₂O, FiO₂ 100% titulada para SpO₂ 92–96%` : 'VCV, VC 6 mL/kg de peso predito, FR 16–18, PEEP 5–8 cmH₂O, FiO₂ 100% titulada para SpO₂ 92–96%' }) },
  fontes: ['tbxsri', 'ardsnet', 'das2018'] });

T({ id: 'p_cvc', cat: 'Procedimentos', cor: 'azul', title: 'Acesso venoso central (jugular, subclávia, femoral)',
  alias: ['cvc', 'acesso central', 'cateter venoso central', 'jugular', 'subclavia', 'femoral', 'puncao venosa central', 'seldinger'],
  resumo: 'Técnica de Seldinger guiada por ultrassom (padrão de segurança), barreira máxima estéril e confirmação da posição antes do uso.',
  secs: [
    { h: 'Escolha do sítio', table: { head: ['Sítio', 'Vantagens', 'Desvantagens', 'Profundidade aprox. (adulto)'], rows: [
      ['**Jugular interna D**', 'Trajeto reto até a VCS, compressível, melhor visualização ao USG', 'Desconforto, contaminação por secreções (traqueostomia)', '**13–15 cm**'],
      ['Jugular interna E', 'Compressível', 'Trajeto mais longo/curvo; ducto torácico', '15–17 cm'],
      ['**Subclávia** (D ou E)', '**Menor taxa de infecção e trombose**, confortável, referência na PCR/trauma (colar cervical)', 'Pneumotórax, não compressível (evitar na coagulopatia)', 'D 15–16 cm · E 17–18 cm'],
      ['**Femoral**', 'Rápida, longe da via aérea/RCP, compressível', 'Maior risco de trombose/infecção; dificulta mobilização', '20–24 cm']] } },
    { h: 'Técnica (resumo)', li: [
      'Checklist: indicação, coagulação/plaquetas (não contraindicam com USG em sítio compressível), consentimento, **USG**, material, posição (Trendelenburg para jugular/subclávia).',
      '**Barreira máxima**: gorro, máscara, avental e luvas estéreis, campo amplo; **clorexidina alcoólica 2%** (aguardar secar).',
      'Anestesia local (lidocaína 1–2%); punção sob visão do USG (eixo curto/longo) com aspiração contínua → fio-guia (observar arritmia) → **confirmar fio no vaso ao USG** → bisturi → dilatador → cateter → retirar o fio (**conferir que saiu inteiro**) → aspirar e lavar todas as vias → fixar → curativo transparente.',
      'Confirmação: RX de tórax (ponta na junção cavoatrial/VCS distal, sem pneumotórax) ou USG (bolhas no átrio direito, deslizamento pleural). Gasometria do sangue se dúvida arterial.' ] },
    { h: 'Complicações', li: [ 'Punção arterial (retirar e comprimir; **nunca dilatar** sem certeza venosa), pneumotórax, hemotórax, arritmia (fio-guia profundo), embolia gasosa, perda do fio-guia, infecção, trombose, mau posicionamento.' ] },
  ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS,
    { id: 'ind', l: 'Indicação', o: ['infusão de drogas vasoativas', 'acesso venoso periférico inviável', 'reposição volêmica / hemodiálise', 'monitorização de PVC/SvcO₂', 'nutrição parenteral / soluções irritantes'] },
    { id: 'sitio', l: 'Sítio', o: ['veia jugular interna', 'veia subclávia', 'veia femoral'] },
    { id: 'lado', l: 'Lado', o: LADO },
    { id: 'usg', l: 'Guiado por USG', o: ['Sim', 'Não'] },
    { id: 'cat', l: 'Cateter', o: ['duplo lúmen 7 Fr 20 cm', 'triplo lúmen 7 Fr 20 cm', 'duplo lúmen 7 Fr 15 cm', 'cateter de hemodiálise (Shilley) 12 Fr', 'introdutor 8,5 Fr'] },
    { id: 'fix', l: 'Fixado a (cm)', t: 'txt', d: '@fix' },
    { id: 'tent', l: 'Punções', o: ['1', '2', '3'] },
    { id: 'conf', l: 'Confirmação', o: ['RX de tórax solicitado (aguardar laudo antes de usar para vasoativo, exceto emergência)', 'RX de tórax com ponta do cateter na junção cavoatrial, sem pneumotórax', 'USG com bolhas de solução salina no átrio direito e deslizamento pleural preservado', 'posição femoral — dispensa RX'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['punção arterial inadvertida com agulha, sem dilatação, compressão por 10 min sem hematoma', 'extrassístoles durante a passagem do fio-guia, resolvidas com tração', 'múltiplas tentativas por anatomia desfavorável']) },
    CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Acesso venoso central', p) +
      `Indicação: ${v.ind}. Consentimento: ${v.cons}.\n` +
      `Paciente em ${v.sitio === 'veia femoral' ? 'decúbito dorsal' : 'Trendelenburg'}. Realizada paramentação completa (gorro, máscara, avental e luvas estéreis), antissepsia com clorexidina alcoólica 2% e colocação de campos estéreis amplos.${v.usg === 'Sim' ? ` Avaliação ultrassonográfica prévia da ${v.sitio} ${v.lado}, pérvia e compressível.` : ''} Anestesia local com lidocaína 2% sem vasoconstritor.\n` +
      `Punção da ${v.sitio} ${v.lado}${v.usg === 'Sim' ? ' sob visualização ultrassonográfica em tempo real' : ' por técnica de reparos anatômicos'}, em ${v.tent} punção(ões), com refluxo de sangue venoso não pulsátil. Passagem de fio-guia pela técnica de Seldinger${v.usg === 'Sim' ? ', com confirmação do fio no interior da veia ao USG' : ''}, sem resistência, dilatação do trajeto e inserção de cateter venoso central ${v.cat}, fixado a ${v.fix} cm na pele. Fio-guia retirado íntegro.\n` +
      `Refluxo sanguíneo satisfatório e lavagem com SF 0,9% em todas as vias. Fixação com ponto de náilon e curativo estéril transparente.\n` +
      `Confirmação: ${v.conf}.\n` + tail(v),
    calc: () => ({ fix: '' }), dyn: (v) => ({ fix: v.sitio === 'veia femoral' ? '20' : v.sitio === 'veia subclávia' ? (v.lado === 'direita' ? '15' : '17') : (v.lado === 'direita' ? '14' : '16') }) },
  fontes: ['nejmv', 'asacvc2020'] });

T({ id: 'p_pai', cat: 'Procedimentos', cor: 'azul', title: 'Pressão arterial invasiva (cateter arterial)',
  alias: ['pai', 'pam invasiva', 'linha arterial', 'cateter arterial', 'radial'],
  resumo: 'Monitorização contínua da PA (choque, vasoativos em dose alta, emergência hipertensiva com droga IV) e coleta seriada de gasometria.',
  secs: [ { h: 'Técnica', li: [ '1ª escolha: **artéria radial** (avaliar circulação colateral/USG); alternativa femoral ou braquial. Antissepsia, anestesia local, punção a 30–45° guiada por USG, Seldinger (kit) ou cateter sobre agulha 20G; conectar ao transdutor nivelado no 4º EIC linha axilar média (eixo flebostático) e zerar.', 'Teste da onda quadrada (flush) para checar amortecimento.' ] },
    { h: 'Complicações', li: [ 'Isquemia distal, hematoma, trombose, infecção, injeção intra-arterial inadvertida (identificar a linha em vermelho).' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'ind', l: 'Indicação', o: ['choque em uso de vasoativos', 'emergência hipertensiva em uso de droga IV titulável', 'coletas seriadas de gasometria arterial', 'monitorização hemodinâmica em paciente crítico'] },
    { id: 'art', l: 'Artéria', o: ['radial', 'femoral', 'braquial', 'pediosa'] }, { id: 'lado', l: 'Lado', o: LADO },
    { id: 'usg', l: 'Guiado por USG', o: ['Sim', 'Não'] }, { id: 'cat', l: 'Material', o: ['cateter 20G com fio-guia (kit arterial)', 'cateter sobre agulha 20G', 'cateter arterial femoral 4 Fr'] },
    { id: 'tent', l: 'Punções', o: ['1', '2', '3'] }, { id: 'interc', l: 'Intercorrências', o: INTERC(['hematoma local controlado com compressão']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Cateterização arterial', p) + `Indicação: ${v.ind}.\n${v.art === 'radial' ? 'Avaliada circulação colateral da mão (perfusão ulnar preservada). ' : ''}Antissepsia com clorexidina alcoólica 2%, campos estéreis e anestesia local com lidocaína 2%. Punção da artéria ${v.art} ${v.lado}${v.usg === 'Sim' ? ' guiada por ultrassom' : ' por palpação'}, em ${v.tent} tentativa(s), com refluxo pulsátil, e inserção de ${v.cat}. Conectado a sistema de transdutor de pressão nivelado no eixo flebostático e zerado; curva de pressão adequada (teste de flush com amortecimento ótimo). Fixação com ponto e curativo estéril. Perfusão distal preservada após o procedimento.\n` + tail(v) },
  fontes: ['nejmv'] });

T({ id: 'p_io', cat: 'Procedimentos', cor: 'azul', title: 'Acesso intraósseo',
  alias: ['intraosseo', 'io', 'ez-io', 'acesso io'],
  resumo: 'Alternativa rápida quando o acesso venoso não é obtido (PCR, choque). Qualquer droga/volume da reanimação pode ser infundido.',
  secs: [ { h: 'Sítios no adulto', table: { head: ['Sítio', 'Referência', 'Agulha (EZ-IO)'], rows: [
      ['**Úmero proximal**', 'Tubérculo maior, braço aduzido e mão sobre o abdome (maior fluxo)', '45 mm (amarela)'],
      ['**Tíbia proximal**', '2 cm medial e 1–2 cm abaixo da tuberosidade tibial', '25 mm (azul) — 45 mm se obeso'],
      ['Tíbia distal', '3 cm acima do maléolo medial', '25 mm']] } },
    { h: 'Técnica', li: [ 'Contraindicações: fratura ou acesso IO prévio no mesmo osso, infecção local, prótese. Antissepsia → inserir perpendicular até perder resistência → retirar o mandril → aspirar (opcional) → **lidocaína 2% sem vasoconstritor 40 mg (2 mL) IO em 2 min** no consciente → flush de 10 mL SF sob pressão → infusão pressurizada.', 'Retirar em até 24 h. Complicações: extravasamento/síndrome compartimental, osteomielite, fratura.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'ind', l: 'Indicação', o: ['parada cardiorrespiratória sem acesso venoso', 'choque com acesso venoso periférico inviável após 2 tentativas'] },
    { id: 'sitio', l: 'Sítio', o: ['úmero proximal', 'tíbia proximal', 'tíbia distal'] }, { id: 'lado', l: 'Lado', o: LADO },
    { id: 'disp', l: 'Dispositivo', o: ['perfurador elétrico (EZ-IO) com agulha 45 mm', 'perfurador elétrico (EZ-IO) com agulha 25 mm', 'agulha manual de intraósseo'] },
    { id: 'lido', l: 'Lidocaína IO', o: ['Sim', 'Não'] }, { id: 'interc', l: 'Intercorrências', o: INTERC(['extravasamento — acesso removido e trocado de sítio']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Acesso intraósseo', p) + `Indicação: ${v.ind}.\nAntissepsia com clorexidina. Punção intraóssea em ${v.sitio} ${v.lado} com ${v.disp}, com perda de resistência ao atingir a cavidade medular e agulha firme no osso. Retirado o mandril${v.lido === 'Sim' ? '; administrada lidocaína 2% sem vasoconstritor 40 mg IO em 2 min' : ''}. Flush com 10 mL de SF 0,9% sem resistência e sem extravasamento. Fixado com dispositivo próprio; infusão sob pressão. Membro sem sinais de extravasamento. Retirar em até 24 h.\n` + tail(v) },
  fontes: ['acls2025'] });

T({ id: 'p_dreno', cat: 'Procedimentos', cor: 'azul', title: 'Drenagem torácica (toracostomia)',
  alias: ['dreno de torax', 'drenagem toracica', 'toracostomia', 'pneumotorax', 'hemotorax', 'selo dagua', 'pigtail'],
  resumo: 'Triângulo de segurança (5º EIC, entre linhas axilares anterior e média), dissecção romba pela borda superior da costela inferior e selo d\'água.',
  secs: [ { h: 'Escolha do dreno', li: [ 'Pneumotórax espontâneo/iatrogênico estável: **pigtail 10–14 Fr** (Seldinger). Hemotórax/trauma: **24–28 Fr** (ATLS aceita 28–32; drenos menores ~14 Fr têm desempenho semelhante em estáveis). Empiema: 14–20 Fr (pigtail) com lavagem.', 'Hemotórax: drenagem inicial **≥1.500 mL** ou **>200 mL/h por 2–4 h** → toracotomia/cirurgia.' ] },
    { h: 'Técnica', li: [ 'Decúbito dorsal, braço acima da cabeça; USG para confirmar o espaço. Antissepsia, campos, **anestesia generosa** (pele, periósteo, pleura parietal — lidocaína até 4,5 mg/kg). Incisão de 2–3 cm paralela à costela, dissecção romba sobre a **borda superior da costela inferior**, abertura da pleura com pinça, exploração digital, introdução do dreno direcionado (ápice no pneumotórax, posterior-basal no hemotórax), conectar ao selo d\'água, fixar com ponto em U/bailarina.', 'Confirmar: oscilação, borbulhamento (pneumotórax), saída de líquido; **RX de tórax**.' ] },
    { h: 'Complicações', li: [ 'Mau posicionamento (subcutâneo, fissura, intra-abdominal), lesão de pulmão/vaso intercostal/fígado/baço, edema de reexpansão (drenar ≤1–1,5 L de uma vez no derrame crônico), infecção, enfisema subcutâneo.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'ind', l: 'Indicação', o: ['pneumotórax', 'hemotórax', 'hemopneumotórax traumático', 'derrame pleural volumoso/empiema', 'pneumotórax hipertensivo após descompressão por agulha'] },
    { id: 'lado', l: 'Hemitórax', o: LADO }, { id: 'eic', l: 'Local', o: ['5º espaço intercostal entre as linhas axilares anterior e média', '4º espaço intercostal na linha axilar média', '2º espaço intercostal na linha hemiclavicular (pigtail)'] },
    { id: 'usg', l: 'USG prévio', o: ['Sim', 'Não'] }, { id: 'tec', l: 'Técnica', o: ['dissecção romba (cirúrgica)', 'Seldinger (pigtail)'] },
    { id: 'dreno', l: 'Dreno', o: ['tubular 28 Fr', 'tubular 24 Fr', 'tubular 32 Fr', 'pigtail 14 Fr', 'pigtail 10 Fr'] },
    { id: 'saida', l: 'Saída imediata', o: ['saída de ar em grande quantidade', 'saída de ar e ___ mL de sangue', 'saída de ___ mL de sangue', 'saída de ___ mL de líquido seroso/citrino', 'saída de ___ mL de secreção purulenta'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['sangramento de parede controlado com compressão', 'enfisema subcutâneo']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Drenagem torácica', p) + `Indicação: ${v.ind} à ${v.lado}. Consentimento: ${v.cons}.\nPaciente em decúbito dorsal com membro superior ${v.lado} abduzido.${v.usg === 'Sim' ? ' Local confirmado ao ultrassom.' : ''} Antissepsia com clorexidina, campos estéreis e anestesia local com lidocaína 2% por planos (pele, subcutâneo, periósteo e pleura parietal). ${v.tec === 'Seldinger (pigtail)' ? `Punção no ${v.eic} com aspiração de ar/líquido, passagem de fio-guia, dilatação e inserção de dreno ${v.dreno} pela técnica de Seldinger.` : `Incisão de 2–3 cm no ${v.eic}, dissecção romba pela borda superior da costela inferior, abertura da pleura parietal, exploração digital da cavidade (sem aderências/órgãos) e introdução de dreno ${v.dreno}.`}\nConectado a sistema fechado em selo d'água, com ${v.saida}, oscilação presente. Fixação com ponto em U e bailarina; curativo oclusivo. RX de tórax de controle solicitado.\n` + tail(v) },
  fontes: ['atls', 'bts2023'] });

T({ id: 'p_agulha', cat: 'Procedimentos', cor: 'azul', title: 'Descompressão torácica por agulha',
  alias: ['toracocentese de alivio', 'descompressao', 'pneumotorax hipertensivo', 'agulha'],
  resumo: 'Pneumotórax hipertensivo (hipotensão, desvio de traqueia, MV abolido, turgência jugular) é diagnóstico clínico: descomprimir sem esperar RX e drenar em seguida.',
  secs: [ { h: 'Técnica', li: [ 'Adulto: **4º–5º EIC na linha axilar média** (ATLS — parede mais fina) ou 2º EIC na linha hemiclavicular. Cateter **14G de 8 cm** sobre a borda superior da costela, até saída de ar; manter o cateter e preparar **drenagem torácica**.', 'Alternativa: toracostomia digital (simples) no paciente em VM.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'lado', l: 'Hemitórax', o: LADO }, { id: 'loc', l: 'Local', o: ['4º–5º espaço intercostal na linha axilar média', '2º espaço intercostal na linha hemiclavicular'] }, { id: 'cat', l: 'Cateter', o: ['14G 8 cm', '14G 5 cm', '16G'] },
    { id: 'res', l: 'Resultado', o: ['saída de ar sob pressão com melhora hemodinâmica e da saturação', 'saída de ar sem melhora clínica — reavaliar diagnóstico'] }, { id: 'interc', l: 'Intercorrências', o: INTERC() }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Descompressão torácica por agulha', p) + `Indicação: suspeita clínica de pneumotórax hipertensivo à ${v.lado} (instabilidade hemodinâmica, murmúrio vesicular abolido, hipertimpanismo).\nAntissepsia local. Punção com cateter ${v.cat} no ${v.loc} ${v.lado === 'direita' ? 'direito' : 'esquerdo'}, sobre a borda superior da costela inferior, com ${v.res}. Cateter mantido e fixado; programada drenagem torácica em selo d'água.\n` + tail(v) },
  fontes: ['atls'] });

T({ id: 'p_toraco', cat: 'Procedimentos', cor: 'azul', title: 'Toracocentese',
  alias: ['toracocentese', 'derrame pleural', 'puncao pleural', 'light'],
  resumo: 'Diagnóstica (derrame novo) ou de alívio (dispneia). Guiada por USG; retirar até ~1–1,5 L por vez.',
  secs: [ { h: 'Técnica e exames', li: [ 'Paciente sentado inclinado para frente; ponto 1–2 EIC abaixo do topo do derrame na linha axilar posterior/escapular, marcado ao **USG**, sobre a borda superior da costela.', 'Exames: proteína e DHL (pleural e sérico — critérios de Light), glicose, pH, celularidade diferencial, Gram/cultura, citologia oncótica, ADA (TB), triglicerídeos se quiloso.', 'Interromper se dor torácica, tosse persistente ou dispneia (edema de reexpansão). RX pós se ar aspirado/sintomas.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'fin', l: 'Finalidade', o: ['diagnóstica e de alívio', 'diagnóstica', 'de alívio'] }, { id: 'lado', l: 'Hemitórax', o: LADO },
    { id: 'usg', l: 'Guiada por USG', o: ['Sim', 'Não'] }, { id: 'vol', l: 'Volume drenado (mL)', t: 'txt', d: '' },
    { id: 'asp', l: 'Aspecto', o: ['citrino', 'sero-hemático', 'turvo', 'purulento', 'hemático', 'leitoso'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['tosse ao final, procedimento interrompido', 'reação vasovagal transitória']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Toracocentese', p) + `Finalidade: ${v.fin}. Derrame pleural à ${v.lado}. Consentimento: ${v.cons}.\nPaciente sentado. ${v.usg === 'Sim' ? 'Ponto de punção demarcado ao ultrassom. ' : ''}Antissepsia com clorexidina, campos estéreis, anestesia local com lidocaína 2% até a pleura parietal. Punção sobre a borda superior da costela inferior, na linha axilar posterior, com obtenção de líquido de aspecto ${v.asp}. Drenados ${v.vol || '___'} mL. Material enviado para análise (proteínas, DHL, glicose, pH, celularidade, Gram/cultura, citologia${v.asp === 'leitoso' ? ', triglicerídeos' : ''}). Curativo oclusivo.\n` + tail(v) },
  fontes: ['bts2023'] });

T({ id: 'p_parac', cat: 'Procedimentos', cor: 'azul', title: 'Paracentese',
  alias: ['paracentese', 'ascite', 'pbe', 'puncao abdominal', 'albumina'],
  resumo: 'Diagnóstica em toda ascite nova ou cirrótico internado/descompensado (PBE: PMN ≥250/mm³). De alívio: albumina 6–8 g por litro retirado se >5 L.',
  secs: [ { h: 'Técnica', li: [ 'Local: **fossa ilíaca esquerda**, 2/3 da linha umbigo–espinha ilíaca anterossuperior (lateral aos vasos epigástricos), confirmado ao USG. Técnica em Z para reduzir vazamento.', 'Coagulopatia da cirrose **não** contraindica (exceto CIVD/fibrinólise clinicamente evidente).', 'Exames: celularidade com diferencial, albumina (GASA = albumina sérica − ascítica; ≥1,1 = hipertensão portal), proteína total, cultura em frasco de hemocultura à beira-leito, Gram; glicose/DHL/amilase/citologia conforme suspeita.' ] } ],
  rx: [ { h: 'Albumina após paracentese de alívio', li: [ 'Retirada >5 L: **albumina 20% 6–8 g por litro retirado** (ex.: 8 L → 48–64 g = 240–320 mL de albumina 20%).', 'PBE: ceftriaxona 2 g/dia + albumina 1,5 g/kg no D1 e 1 g/kg no D3.' ] } ],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'fin', l: 'Finalidade', o: ['diagnóstica e de alívio', 'diagnóstica', 'de alívio'] }, { id: 'loc', l: 'Local', o: ['fossa ilíaca esquerda', 'fossa ilíaca direita', 'infraumbilical na linha média'] },
    { id: 'usg', l: 'Guiada por USG', o: ['Sim', 'Não'] }, { id: 'vol', l: 'Volume (mL)', t: 'txt', d: '' }, { id: 'asp', l: 'Aspecto', o: ['citrino', 'turvo', 'hemático', 'leitoso', 'purulento'] },
    { id: 'alb', l: 'Albumina reposta', t: 'txt', d: '' }, { id: 'interc', l: 'Intercorrências', o: INTERC(['vazamento de líquido pelo orifício, curativo compressivo']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Paracentese', p) + `Finalidade: ${v.fin}. Consentimento: ${v.cons}.\nPaciente em decúbito dorsal. ${v.usg === 'Sim' ? 'Ponto demarcado ao ultrassom, sem alças interpostas. ' : ''}Antissepsia com clorexidina, campos estéreis e anestesia local com lidocaína 2%. Punção em ${v.loc} com técnica em Z, obtendo-se líquido de aspecto ${v.asp}. Drenados ${v.vol || '___'} mL. Coletado material para celularidade com diferencial, albumina, proteínas totais, Gram e cultura (frascos de hemocultura à beira-leito).${v.alb ? ` Reposição de albumina: ${v.alb}.` : ''} Curativo oclusivo.\n` + tail(v) },
  fontes: ['aasld2021'] });

T({ id: 'p_pl', cat: 'Procedimentos', cor: 'azul', title: 'Punção lombar',
  alias: ['puncao lombar', 'liquor', 'lcr', 'meningite', 'raquicentese', 'pressao de abertura'],
  resumo: 'Suspeita de meningite/encefalite, HSA com TC normal, pressão de abertura (HIC idiopática). TC antes se déficit focal, papiledema, rebaixamento, imunossupressão, convulsão recente ou >60 anos.',
  secs: [ { h: 'Técnica', li: [ 'Decúbito lateral (para medir pressão de abertura) ou sentado; espaço **L3–L4 ou L4–L5** (linha entre as cristas ilíacas = L4). Agulha 20–22G (preferir atraumática), bisel paralelo às fibras longitudinais.', 'Pressão de abertura normal: 6–25 cmH₂O (decúbito lateral, pernas estendidas). Colher 4 tubos (1: bioquímica; 2: Gram/cultura; 3: celularidade; 4: extras — PCR viral, VDRL, criptococo, citologia).', 'Meningite bacteriana suspeita: **não atrasar ceftriaxona + dexametasona** pela TC/PL.', 'Anticoagulação/plaquetas <50 mil: corrigir antes quando possível.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'ind', l: 'Indicação', o: ['suspeita de meningite/meningoencefalite', 'suspeita de hemorragia subaracnóidea com TC sem alterações', 'medida de pressão de abertura', 'investigação de doença neurológica'] },
    { id: 'tc', l: 'TC prévia', o: ['TC de crânio sem contraindicações à punção', 'TC dispensada (sem critérios clínicos de risco)'] },
    { id: 'pos', l: 'Posição', o: ['decúbito lateral esquerdo', 'decúbito lateral direito', 'sentado'] }, { id: 'esp', l: 'Espaço', o: ['L3–L4', 'L4–L5', 'L2–L3'] },
    { id: 'ag', l: 'Agulha', o: ['22G Quincke', '20G Quincke', '22G atraumática (Sprotte/Whitacre)'] }, { id: 'tent', l: 'Tentativas', o: ['1', '2', '3'] },
    { id: 'pa', l: 'Pressão de abertura (cmH₂O)', t: 'txt', d: '' }, { id: 'asp', l: 'Aspecto do líquor', o: ['límpido e incolor ("água de rocha")', 'turvo', 'xantocrômico', 'hemorrágico com clareamento nos tubos sequenciais (acidente de punção)', 'hemorrágico sem clareamento'] },
    { id: 'vol', l: 'Volume coletado (mL)', t: 'txt', d: '10' }, { id: 'interc', l: 'Intercorrências', o: INTERC(['acidente de punção', 'parestesia transitória em membro inferior durante a punção']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Punção lombar', p) + `Indicação: ${v.ind}. ${v.tc}. Consentimento: ${v.cons}.\nPaciente em ${v.pos}, com flexão de quadril e cervical. Antissepsia com clorexidina, campos estéreis, anestesia local com lidocaína 2%. Punção no espaço ${v.esp} com agulha ${v.ag}, em ${v.tent} tentativa(s), obtendo-se líquor de aspecto ${v.asp}${v.pa ? `, pressão de abertura de ${v.pa} cmH₂O` : ''}. Coletados ${v.vol} mL em 4 tubos (bioquímica, Gram/cultura, celularidade e reserva). Retirada a agulha com mandril recolocado; curativo.\n` + tail(v) },
  fontes: ['idsa_men'] });

T({ id: 'p_peric', cat: 'Procedimentos', cor: 'azul', title: 'Pericardiocentese',
  alias: ['pericardiocentese', 'tamponamento', 'derrame pericardico'],
  resumo: 'Tamponamento com instabilidade (hipotensão, turgência jugular, abafamento de bulhas, colapso de VD ao POCUS). No trauma: preferir toracotomia/janela pericárdica — pericardiocentese só como ponte.',
  secs: [ { h: 'Técnica guiada por USG', li: [ 'Escolher a janela com **maior coleção e mais próxima da pele** sem estruturas interpostas (paraesternal, apical ou subxifoide). Subxifoide clássica: agulha 18G entre o apêndice xifoide e o rebordo costal esquerdo, 30–45° com a pele, direcionada ao ombro esquerdo.', 'Confirmar posição com solução salina agitada ao eco; Seldinger e cateter pigtail para drenagem contínua. Aspirar 50–100 mL já melhora a hemodinâmica.', 'Complicações: punção de VD/coronária, arritmia, pneumotórax, lesão hepática.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'jan', l: 'Acesso', o: ['subxifoide', 'paraesternal esquerdo', 'apical'] }, { id: 'usg', l: 'Guiada por USG', o: ['Sim', 'Não (emergência)'] },
    { id: 'vol', l: 'Volume aspirado (mL)', t: 'txt', d: '' }, { id: 'asp', l: 'Aspecto', o: ['sero-hemático', 'hemático que não coagula', 'citrino', 'purulento'] }, { id: 'pig', l: 'Pigtail deixado', o: ['Sim', 'Não'] },
    { id: 'res', l: 'Resposta', o: ['melhora da PA e da FC após a aspiração', 'sem melhora hemodinâmica'] }, { id: 'interc', l: 'Intercorrências', o: INTERC(['extrassístoles ventriculares durante a punção']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Pericardiocentese', p) + `Indicação: tamponamento cardíaco com instabilidade hemodinâmica. Consentimento: ${v.cons}.\nMonitorização cardíaca contínua. ${v.usg === 'Sim' ? 'Ecocardiografia à beira-leito com derrame pericárdico volumoso e sinais de tamponamento; definida janela ' + v.jan + '.' : 'Acesso ' + v.jan + ' por reparos anatômicos.'} Antissepsia, campos estéreis, anestesia local. Punção com agulha 18G ${v.usg === 'Sim' ? 'sob visão ultrassonográfica' : 'direcionada ao ombro esquerdo'}, com aspiração de ${v.vol || '___'} mL de líquido ${v.asp}${v.pig === 'Sim' ? '; passagem de fio-guia e cateter pigtail para drenagem contínua' : ''}. Evoluiu com ${v.res}.\n` + tail(v) },
  fontes: ['esc2015peric'] });

T({ id: 'p_cve', cat: 'Procedimentos', cor: 'azul', title: 'Cardioversão elétrica / desfibrilação',
  alias: ['cardioversao', 'cve', 'desfibrilacao', 'choque sincronizado', 'fa', 'flutter', 'tsv', 'tv'],
  resumo: 'Sincronizada para taquiarritmias com pulso instáveis (ou eletivas); não sincronizada (desfibrilação) para FV/TV sem pulso e TV polimórfica.',
  secs: [ { h: 'Cuidados', li: [ 'Pás anterolateral ou **anteroposterior** (melhor na FA), afastadas ≥8 cm de marca-passo/CDI. Sedação (etomidato 0,15–0,2 mg/kg ou propofol 0,5–1 mg/kg + fentanil) com material de via aérea. **Reativar o modo SINC antes de cada choque** (alguns aparelhos voltam ao modo não sincronizado).', 'Energia (bifásico): TSV 50–100 J · flutter/FA **≥200 J** · TV monomórfica 100 J.', 'FA/flutter >48 h ou duração incerta sem anticoagulação adequada: ETE ou anticoagular 3 semanas (exceto instabilidade); anticoagular por ≥4 semanas após.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'ritmo', l: 'Ritmo', o: ['fibrilação atrial com resposta ventricular elevada', 'flutter atrial', 'taquicardia supraventricular', 'taquicardia ventricular monomórfica com pulso'] },
    { id: 'inst', l: 'Indicação', o: ['instabilidade hemodinâmica (hipotensão/má perfusão)', 'dor torácica isquêmica', 'insuficiência cardíaca aguda', 'rebaixamento do nível de consciência', 'cardioversão eletiva'] },
    { id: 'sed', l: 'Sedação', t: 'txt', d: '@sed' }, { id: 'pas', l: 'Posição das pás', o: ['anteroposterior', 'anterolateral'] },
    { id: 'en', l: 'Choques (energias)', t: 'txt', d: '200 J' }, { id: 'res', l: 'Resultado', o: ['reversão para ritmo sinusal', 'controle da frequência sem reversão do ritmo', 'sem resposta'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['hipotensão transitória pós-sedação', 'bradicardia transitória pós-choque']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Cardioversão elétrica sincronizada', p) + `Ritmo: ${v.ritmo}. Indicação: ${v.inst}. Consentimento: ${v.cons}.\nMonitorização multiparamétrica, acesso venoso, material de via aérea e aspiração disponíveis, O₂ suplementar. Sedação com ${v.sed}. Pás em posição ${v.pas}, modo sincronizado confirmado (marcação sobre o QRS). Realizado(s) choque(s) bifásico(s) sincronizado(s): ${v.en}. Resultado: ${v.res}. ECG de 12 derivações após o procedimento.\n` + tail(v),
    calc: (p) => ({ sed: p.w ? `fentanil ${nf(Math.min(p.w, 100), 0)} mcg IV + etomidato ${nf(0.15 * p.w, 0)} mg IV` : 'fentanil 50 mcg IV + etomidato 0,15 mg/kg IV' }) },
  fontes: ['acls2025'] });

T({ id: 'p_pcrdesc', cat: 'Procedimentos', cor: 'azul', title: 'Descrição de atendimento à PCR',
  alias: ['descricao pcr', 'rcp', 'evolucao pcr', 'obito', 'rce', 'reanimacao'],
  resumo: 'Registro cronológico da reanimação: horário de início, ritmos, choques, drogas, via aérea, causas tratadas e desfecho (RCE ou óbito).',
  secs: [ { h: 'Dicas', li: [ 'Designar um anotador no início. Registrar cada ciclo de 2 min, ritmo, choque (energia), adrenalina (horário), antiarrítmico, via aérea, ETCO₂ e causas reversíveis.', 'Óbito: registrar horário da constatação, ausência de pulso central, apneia, pupilas, e comunicação à família.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'local', l: 'Local', o: ['sala vermelha', 'chegada pelo SAMU já em PCR', 'enfermaria/observação', 'pré-hospitalar com RCP em curso'] },
    { id: 'ini', l: 'Hora de início da PCR / RCP', t: 'txt', d: '' }, { id: 'rit', l: 'Ritmo inicial', o: ['fibrilação ventricular', 'taquicardia ventricular sem pulso', 'atividade elétrica sem pulso', 'assistolia'] },
    { id: 'nch', l: 'Choques (nº e energia)', t: 'txt', d: '' }, { id: 'nadr', l: 'Doses de adrenalina 1 mg', t: 'txt', d: '' }, { id: 'aa', l: 'Antiarrítmico', o: ['não utilizado', 'amiodarona 300 mg', 'amiodarona 300 mg + 150 mg', 'lidocaína'] },
    { id: 'via', l: 'Via aérea', o: ['intubação orotraqueal com confirmação por capnografia', 'bolsa-válvula-máscara', 'dispositivo supraglótico', 'via aérea avançada já instalada'] },
    { id: 'acc', l: 'Acesso', o: ['venoso periférico', 'intraósseo', 'venoso central prévio'] }, { id: 'causa', l: 'Causas avaliadas/tratadas', t: 'txt', d: '5H e 5T avaliados; POCUS sem derrame pericárdico ou pneumotórax' },
    { id: 'des', l: 'Desfecho', o: ['retorno da circulação espontânea (RCE)', 'óbito constatado'] }, { id: 'fim', l: 'Hora do desfecho', t: 'txt', d: '' }, CAMPO_OBS],
    texto: (v, p) => `DESCRIÇÃO DE ATENDIMENTO — PARADA CARDIORRESPIRATÓRIA\nData: ${v.hora}\n${$('ptName').value ? `Paciente: ${$('ptName').value}\n` : ''}` +
      `Local: ${v.local}. Constatada PCR (irresponsivo, sem respiração normal e sem pulso central) às ${v.ini || '__h__'}, com início imediato de RCP de alta qualidade (compressões 100–120/min, 5–6 cm, revezamento a cada 2 min) e monitorização. Ritmo inicial: ${v.rit}.\n` +
      `Acesso ${v.acc}. Via aérea: ${v.via}. ${v.nch ? `Desfibrilação: ${v.nch}. ` : ''}${v.nadr ? `Adrenalina 1 mg IV/IO a cada 3–5 min, total de ${v.nadr} dose(s). ` : ''}${v.aa !== 'não utilizado' ? `Antiarrítmico: ${v.aa}. ` : ''}\nCausas reversíveis: ${v.causa}.\n` +
      (v.des === 'óbito constatado' ? `Apesar das manobras, sem retorno da circulação espontânea. Óbito constatado às ${v.fim || '__h__'} (ausência de pulso central, apneia, pupilas midriáticas fixas, assistolia confirmada em duas derivações). Família comunicada.` : `Retorno da circulação espontânea às ${v.fim || '__h__'}, com pulso central palpável e elevação da ETCO₂. Iniciados cuidados pós-PCR (ECG de 12 derivações, gasometria, alvo de SpO₂ 90–98%, PAM >65 mmHg, controle de temperatura).`) + (v.obs ? ' ' + v.obs : '') },
  fontes: ['acls2025'] });

T({ id: 'p_mptc', cat: 'Procedimentos', cor: 'azul', title: 'Marca-passo transcutâneo',
  alias: ['marca-passo', 'mp transcutaneo', 'bav', 'bradicardia', 'pacing'],
  resumo: 'Bradicardia instável refratária à atropina como ponte para marca-passo transvenoso.',
  secs: [ { h: 'Técnica', li: [ 'Pás anteroposterior (preferível) ou anterolateral. Modo **demanda**, FC 60–80 bpm, corrente iniciando em 0 e subindo até **captura elétrica** (QRS largo após cada espícula) **e mecânica** (pulso femoral — a carótida é enganosa pelo artefato); programar 5–10 mA acima do limiar. Analgesia/sedação (fentanil, midazolam/cetamina).' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'rit', l: 'Ritmo', o: ['BAV total', 'BAV 2º grau Mobitz II', 'bradicardia sinusal grave', 'BAV avançado com escape ventricular'] }, { id: 'pas', l: 'Pás', o: ['anteroposterior', 'anterolateral'] },
    { id: 'fc', l: 'FC programada', t: 'txt', d: '70' }, { id: 'ma', l: 'Limiar / corrente (mA)', t: 'txt', d: '' }, { id: 'sed', l: 'Analgesia', t: 'txt', d: 'fentanil 50 mcg IV' },
    { id: 'interc', l: 'Intercorrências', o: INTERC() }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Marca-passo transcutâneo', p) + `Indicação: ${v.rit} com instabilidade hemodinâmica refratária à atropina.\nAnalgesia com ${v.sed}. Pás em posição ${v.pas}; modo demanda, FC ${v.fc} bpm. Corrente elevada progressivamente até captura elétrica e mecânica (pulso femoral palpável) com limiar de ${v.ma || '___'} mA, mantida corrente de segurança 10 mA acima. Solicitada avaliação para marca-passo transvenoso.\n` + tail(v) },
  fontes: ['acls2025'] });

T({ id: 'p_crico', cat: 'Procedimentos', cor: 'azul', title: 'Cricotireoidostomia cirúrgica',
  alias: ['cricotireoidostomia', 'cricostomia', 'via aerea cirurgica', 'nao intubo nao oxigeno', 'cico'],
  resumo: '"Não intubo, não oxigeno" (CICO) após falha de IOT e de ventilação com máscara/supraglótico: técnica bisturi-bougie-tubo (DAS).',
  secs: [ { h: 'Técnica (bisturi–bougie–tubo)', li: [ 'Extensão cervical; identificar a membrana cricotireóidea (laryngeal handshake; USG se houver tempo). Mão não dominante estabiliza a laringe.', 'Membrana palpável: incisão **transversal** da pele e membrana com lâmina nº 10, girar 90° (corte para caudal), passar o **bougie** ao longo da lâmina, deslizar **tubo 6,0 com cuff**. Membrana não palpável: incisão vertical de 8–10 cm, dissecção romba digital e depois transversal.', 'Confirmar com capnografia, insuflar cuff, fixar. Cirurgia/otorrino para traqueostomia formal.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'tec', l: 'Técnica', o: ['bisturi–bougie–tubo com incisão transversal', 'incisão vertical + dissecção digital + incisão transversal da membrana'] }, { id: 'tubo', l: 'Tubo/cânula', o: ['tubo orotraqueal 6,0 com cuff', 'cânula de traqueostomia 6,0', 'tubo 5,5 com cuff'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['sangramento de parede controlado com compressão', 'dessaturação grave prévia ao procedimento']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Cricotireoidostomia cirúrgica', p) + `Indicação: situação "não intubo, não oxigeno" após falha de intubação orotraqueal e de ventilação com máscara/dispositivo supraglótico.\nPaciente em extensão cervical, antissepsia rápida. Identificada a membrana cricotireóidea. Realizada cricotireoidostomia por ${v.tec}, com passagem de bougie e inserção de ${v.tubo}, cuff insuflado. Confirmação por capnografia com curva sustentada e ausculta simétrica. Fixação. Solicitada avaliação de cirurgia/otorrinolaringologia para via aérea definitiva.\n` + tail(v) },
  fontes: ['das2018', 'atls'] });

T({ id: 'p_svd', cat: 'Procedimentos', cor: 'azul', title: 'Sondagem vesical e nasogástrica',
  alias: ['sonda vesical', 'svd', 'sva', 'sng', 'sonda nasogastrica', 'sog', 'cateterismo vesical', 'retencao urinaria'],
  resumo: 'SVD: controle de diurese no choque, retenção urinária, cirurgia. SNG: descompressão (obstrução, HDA), dieta, lavagem. Sondagem orogástrica no intubado/fratura de base de crânio.',
  secs: [ { h: 'Cuidados', li: [ 'SVD: técnica estéril, lidocaína gel 2% intrauretral (homem: 10 mL, aguardar 3–5 min), sonda 14–16 Fr (coágulos: 3 vias 20–22 Fr). **Insuflar o balão só após saída de urina**. Contraindicada se suspeita de lesão uretral (sangue no meato, hematoma perineal, próstata alta) → urologia/cistostomia.', 'SNG: medir nariz–lóbulo da orelha–apêndice xifoide; confirmar posição (aspirado com pH ≤5 e/ou **RX** antes de dieta — ausculta isolada não é confiável). Evitar via nasal na fratura de base de crânio.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'tipo', l: 'Procedimento', o: ['sondagem vesical de demora', 'sondagem vesical de alívio', 'sondagem nasogástrica', 'sondagem orogástrica', 'sondagem nasoenteral'] },
    { id: 'ind', l: 'Indicação', t: 'txt', d: '' }, { id: 'cal', l: 'Calibre (Fr)', t: 'txt', d: '16' }, { id: 'res', l: 'Resultado', t: 'txt', d: '' },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['dificuldade de progressão, sem sangramento', 'epistaxe leve autolimitada']) }, CAMPO_OBS],
    texto: (v, p) => { const vesical = /vesical/.test(v.tipo); return TOPO(v, v.tipo, p) + `Indicação: ${v.ind || '___'}.\n` + (vesical ? `Técnica asséptica, antissepsia do meato com clorexidina aquosa, lidocaína gel 2% intrauretral. Introduzida sonda ${v.tipo.includes('demora') ? 'Foley' : 'uretral'} ${v.cal} Fr sem resistência, com saída de ${v.res || '___ mL de urina de aspecto ___'}${v.tipo.includes('demora') ? '; balão insuflado com 10 mL de água destilada após o retorno de urina e sonda conectada a sistema coletor fechado, fixada na face interna da coxa (mulher) ou região hipogástrica (homem)' : ''}.` : `Medida a extensão (nariz–lóbulo da orelha–apêndice xifoide). Lubrificação com lidocaína gel 2% e introdução de sonda ${v.cal} Fr via ${v.tipo.includes('oro') ? 'oral' : 'nasal'} até a marca, sem resistência. Posição confirmada por ${v.res || 'aspirado gástrico e RX de abdome/tórax solicitado'}. Fixada.`) + '\n' + tail(v); } },
  fontes: ['nejmv'] });

T({ id: 'p_sutura', cat: 'Procedimentos', cor: 'azul', title: 'Sutura de ferimento',
  alias: ['sutura', 'ferimento', 'laceracao', 'pontos', 'lidocaina'],
  resumo: 'Exploração, irrigação, anestesia dentro da dose máxima e sutura por planos; profilaxia antitetânica (ver Prescrições PS → Ferimento).',
  secs: [ { h: 'Fios e retirada de pontos', table: { head: ['Região', 'Fio', 'Retirada'], rows: [
    ['Face', 'Náilon 5-0/6-0', '5 dias'], ['Couro cabeludo', 'Náilon 3-0/4-0 ou grampos', '7–10 dias'], ['Tronco e membros', 'Náilon 4-0', '10–14 dias'], ['Mãos/pés, articulações', 'Náilon 4-0/5-0', '10–14 dias'], ['Subcutâneo/mucosa', 'Absorvível (poliglactina/catgut) 4-0/5-0', '—']] } } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, { id: 'loc', l: 'Local do ferimento', t: 'txt', d: '' }, { id: 'tam', l: 'Extensão (cm)', t: 'txt', d: '' },
    { id: 'tipo', l: 'Tipo', o: ['corto-contuso', 'cortante (bordas regulares)', 'lácero-contuso', 'puntiforme'] }, { id: 'expl', l: 'Exploração', o: ['sem lesão de tendão, nervo ou vaso; sem corpo estranho', 'com corpo estranho removido', 'com lesão tendínea — encaminhado à ortopedia/cirurgia de mão'] },
    { id: 'anest', l: 'Anestesia', t: 'txt', d: '@lido' }, { id: 'fio', l: 'Fio e técnica', t: 'txt', d: 'náilon 4-0, pontos simples separados (n = __)' },
    { id: 'tet', l: 'Profilaxia antitetânica', o: ['esquema vacinal completo há <5 anos — sem necessidade', 'reforço com dT aplicado', 'vacina dT + imunoglobulina antitetânica 250 UI IM', 'encaminhado à sala de vacina'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC() }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Sutura de ferimento', p) + `Ferimento ${v.tipo} em ${v.loc || '___'}, de aproximadamente ${v.tam || '___'} cm.\nAntissepsia com clorexidina/PVPI, campos estéreis, anestesia local com ${v.anest}. Exploração: ${v.expl}. Irrigação abundante com SF 0,9% e desbridamento de tecidos desvitalizados. Sutura com ${v.fio}. Curativo oclusivo. Profilaxia antitetânica: ${v.tet}. Orientada retirada dos pontos na UBS conforme a região.\n` + tail(v),
    calc: (p) => ({ lido: p.w ? `lidocaína 2% sem vasoconstritor __ mL (máx. ${nf(Math.min(4.5 * p.w, 300) / 20, 1)} mL = 4,5 mg/kg)` : 'lidocaína 2% sem vasoconstritor __ mL (máx. 4,5 mg/kg)' }) },
  fontes: ['nejmv'] });

T({ id: 'p_sedproc', cat: 'Procedimentos', cor: 'azul', title: 'Sedação e analgesia para procedimento',
  alias: ['sedacao', 'sedoanalgesia', 'procedimento', 'cetamina', 'propofol', 'reducao de luxacao', 'jejum'],
  resumo: 'Para redução de luxação/fratura, cardioversão, drenagem de abscesso, etc. Monitorização, O₂, capnografia e profissional dedicado à via aérea.',
  secs: [ { h: 'Opções (adulto)', table: { head: ['Droga', 'Dose IV', 'Observação'], rows: [
    ['**Cetamina**', '1–1,5 mg/kg (repetir 0,5 mg/kg)', 'Mantém drive e PA; laringoespasmo raro; ondansetrona reduz vômito'],
    ['**Propofol**', '0,5–1 mg/kg + 0,25–0,5 mg/kg a cada 3–5 min', 'Hipotensão/apneia; sem analgesia — associar fentanil'],
    ['**Cetofol**', 'cetamina 0,5 mg/kg + propofol 0,5 mg/kg', 'Menos hipotensão'],
    ['Etomidato', '0,1–0,15 mg/kg', 'Mioclonias; útil em cardioversão'],
    ['Fentanil + midazolam', '1 mcg/kg + 0,02–0,05 mg/kg', 'Titular; reversores: naloxona e flumazenil']] } },
    { h: 'Segurança', li: [ 'Jejum não é obrigatório na urgência (pesar risco). Classificação ASA, via aérea, consentimento. Alta: consciência no basal, sinais vitais estáveis, deambulando, acompanhado.' ] } ],
  rx: [],
  proc: { campos: [CAMPO_HORA, CAMPO_CONS, { id: 'proc', l: 'Procedimento realizado', t: 'txt', d: '' }, { id: 'asa', l: 'ASA', o: ['I', 'II', 'III', 'IV'] },
    { id: 'drogas', l: 'Drogas e doses', t: 'txt', d: '@sed' }, { id: 'rec', l: 'Recuperação', o: ['recuperação completa em __ min, retorno ao nível de consciência basal', 'recuperação prolongada, mantido em observação'] },
    { id: 'interc', l: 'Intercorrências', o: INTERC(['dessaturação transitória corrigida com elevação da mandíbula e O₂', 'apneia breve com ventilação assistida por bolsa-válvula-máscara', 'vômito sem broncoaspiração', 'reação de emergência (agitação) com cetamina, tratada com midazolam 1–2 mg']) }, CAMPO_OBS],
    texto: (v, p) => TOPO(v, 'Sedação e analgesia para procedimento', p) + `Procedimento: ${v.proc || '___'}. ASA ${v.asa}. Consentimento: ${v.cons}.\nMonitorização com oximetria, cardioscopia, PA não invasiva e capnografia; O₂ suplementar; material de via aérea e aspiração disponíveis; profissional dedicado à monitorização. Sedação com ${v.drogas}. ${v.rec}.\n` + tail(v),
    calc: (p) => ({ sed: p.w ? `cetamina ${nf(p.w, 0)} mg IV (1 mg/kg) + ondansetrona 4 mg IV` : 'cetamina 1 mg/kg IV + ondansetrona 4 mg IV' }) },
  fontes: ['acep_psa'] });

const PF_ST = {};
function procValues(t) {
  const p = P(); const st = PF_ST[t.id] || (PF_ST[t.id] = {});
  const base = t.proc.calc ? t.proc.calc(p) : {};
  const v = {};
  t.proc.campos.forEach((c) => {
    let def = c.o ? c.o[0] : c.d ?? '';
    if (def === '@now') def = nowStr();
    else if (typeof def === 'string' && def.startsWith('@')) def = base[def.slice(1)] ?? '';
    v[c.id] = st[c.id] ?? def;
  });
  if (t.proc.dyn) { const d = t.proc.dyn(v, p); Object.keys(d).forEach((k) => { if (st[k] === undefined) v[k] = d[k]; }); }
  return v;
}
function procFormHTML(t) {
  const v = procValues(t);
  const f = t.proc.campos.map((c) => {
    const id = `pf_${c.id}`;
    if (c.o) return `<div><label for="${id}">${esc(c.l)}</label><select id="${id}" data-pf="${c.id}">${c.o.map((o) => `<option ${o === v[c.id] ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`;
    return `<div${c.id === 'obs' || c.id === 'vm' || c.id === 'causa' ? ' style="grid-column:1/-1"' : ''}><label for="${id}">${esc(c.l)}</label><input id="${id}" data-pf="${c.id}" value="${esc(v[c.id])}"></div>`;
  }).join('');
  return `<div class="opt sv-rx"><div class="opt-h"><h4>Descrição para o prontuário</h4><span><button class="btn btn-line btn-sm" type="button" id="pfReset">Limpar</button> <button class="btn btn-primary btn-sm" type="button" id="pfCopy">Copiar descrição</button></span></div>
    <div class="opt-b"><div class="inf-row" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${f}</div>
    <pre class="pre-out" id="pfOut">${esc(t.proc.texto(v, P()))}</pre><p class="src">Edite os campos ou o texto copiado; substitua os "___" pelos dados reais. Descreva apenas o que foi efetivamente realizado.</p></div></div>`;
}
