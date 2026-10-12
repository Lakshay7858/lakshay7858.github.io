// Protocolos de sala vermelha / amarela — adulto. Doses por peso via D(); textos com **negrito**.
const TOPICS = [];
const T = (o) => TOPICS.push(o);

/* ================= RESSUSCITAÇÃO ================= */
T({ id: 'pcr', cat: 'Ressuscitação', cor: 'vermelho', title: 'Parada cardiorrespiratória (ACLS 2025)',
  alias: ['pcr', 'parada', 'rcp', 'fv', 'tv sem pulso', 'assistolia', 'aesp', 'adrenalina', 'amiodarona', 'desfibrilacao'],
  resumo: 'RCP de alta qualidade sem interrupções, choque precoce nos ritmos chocáveis, adrenalina o mais cedo possível nos não chocáveis e busca ativa das causas (5H/5T).',
  secs: [
    { h: 'RCP de alta qualidade', li: [
      'Compressões **100–120/min**, profundidade **5–6 cm**, retorno total do tórax, interrupções **<10 s**; trocar o compressor a cada 2 min.',
      'Sem via aérea avançada: **30:2**. Com via aérea avançada: compressões contínuas + **1 ventilação a cada 6 s (10/min)**.',
      'Capnografia: ETCO₂ <10 mmHg = RCP ruim; subida súbita para ≥35–40 mmHg = provável RCE. ETCO₂ <10 após 20 min de RCP (intubado) = mau prognóstico (não usar isoladamente).',
      'Via aérea: bolsa-válvula-máscara é aceitável; IOT ou dispositivo supraglótico sem interromper compressões.',
      'Acesso: **IV periférico 1ª escolha**; **IO** se não obtido rapidamente. A via traqueal para drogas foi retirada do ACLS 2025.' ] },
    { h: 'Ritmos chocáveis (FV / TV sem pulso)', li: [
      '**Choque** → 2 min de RCP → checar ritmo (≤10 s). Bifásico: **120–200 J** (recomendação do fabricante; se desconhecida, carga máxima). Monofásico: 360 J.',
      '**Adrenalina** após o 2º choque, depois a cada 3–5 min. **Amiodarona** (ou lidocaína) após o 3º choque.',
      'FV persistente (≥3 choques): considerar **troca de vetor** (pás anteroposterior) ou **desfibrilação sequencial dupla** (classe IIb).' ] },
    { h: 'Ritmos não chocáveis (assistolia / AESP)', li: [
      'RCP + **adrenalina o mais cedo possível** (assim que houver acesso IV/IO), repetir a cada 3–5 min.',
      'Assistolia: confirmar em 2 derivações / ganho máximo (linha reta pode ser FV fina).' ] },
    { h: 'Causas reversíveis — 5H e 5T', table: { head: ['H', 'T'], rows: [
      ['Hipovolemia → volume/sangue', 'Tensão no tórax (pneumotórax) → descompressão (4º–5º EIC linha axilar média)'],
      ['Hipóxia → via aérea/O₂', 'Tamponamento → pericardiocentese (POCUS)'],
      ['H⁺ (acidose) → ventilação; bicarbonato só em casos selecionados', 'Toxinas → antídoto (ver Intoxicações)'],
      ['Hipo/Hipercalemia → cálcio, insulina+glicose, bicarbonato', 'Trombose pulmonar → trombólise'],
      ['Hipotermia → reaquecimento', 'Trombose coronária → ICP após RCE']] } },
    { h: 'Quando parar', li: [ 'Decisão da equipe considerando tempo sem RCP, ritmo inicial, causa, comorbidades, ETCO₂ e POCUS (ausência de atividade cardíaca). Registrar horário e conduta.' ] },
  ],
  rx: [
    { h: 'Drogas na PCR', li: [
      '**Adrenalina 1 mg** IV/IO (1 ampola de 1 mg/mL, pura ou diluída em 10 mL), seguida de **flush de 20 mL de SF** e elevação do membro — a cada **3–5 min**.',
      '**Amiodarona 300 mg** IV/IO em bolus (2 ampolas de 150 mg/3 mL); 2ª dose **150 mg**.',
      ['OU **lidocaína** 2% (20 mg/mL): ', D(1.5, 'mg', { c: 20, max: 150 }), ' (1–1,5 mg/kg); depois 0,5–0,75 mg/kg (máx. total 3 mg/kg).'],
      '**Sulfato de magnésio 2 g** IV em bolus — só se **torsades de pointes**.',
      ['**Bicarbonato de sódio 8,4%** (1 mEq/mL): ', D(1, 'mEq', { c: 1, max: 100 }), ' — apenas hipercalemia, intoxicação por tricíclicos ou acidose grave prévia conhecida (não rotina).'],
      '**Gluconato de cálcio 10% 30 mL** (ou cloreto de cálcio 10% 10 mL) — apenas hipercalemia, hipocalcemia ou intoxicação por bloqueador de canal de cálcio (não rotina).',
      '**Alteplase 50 mg** IV em bolus se TEP confirmado/muito provável; manter RCP por 60–90 min após (pode repetir 50 mg em 15 min).' ] },
  ],
  fontes: ['acls2025'] });

T({ id: 'posrce', cat: 'Ressuscitação', cor: 'vermelho', title: 'Cuidados pós-parada (RCE)',
  alias: ['rce', 'pos pcr', 'pos parada', 'controle de temperatura', 'hipotermia'],
  resumo: 'Otimizar oxigenação, ventilação e pressão, identificar causa (ECG/cateterismo), controle de temperatura e neuroprognóstico tardio.',
  secs: [
    { h: 'Metas', li: [
      '**SpO₂ 90–98%** (evitar hipóxia e hiperóxia); **PaCO₂ 35–45 mmHg**.',
      '**PAM >65 mmHg** (PAS ≥90); noradrenalina como 1ª escolha.',
      'Glicemia 140–180 mg/dL; tratar convulsões (EEG se comatoso).',
      '**Controle de temperatura 32–37,5 °C por ≥24 h** em quem não obedece a comandos; **evitar febre por ≥72 h**.' ] },
    { h: 'Investigação', li: [
      '**ECG de 12 derivações** imediato: supra de ST → **cateterismo de urgência**; sem supra, angiografia seletiva se suspeita de causa isquêmica.',
      'Gasometria, lactato, eletrólitos, troponina, POCUS; **TC de crânio** (± tórax/angio-TC) se causa não esclarecida.',
      'Neuroprognóstico multimodal **≥72 h** após normotermia — não decidir antes.' ] },
  ],
  rx: [ { h: 'Suporte inicial', li: [
    'Ventilação protetora: VC **6–8 mL/kg de peso predito** (ver Intubação).',
    'Noradrenalina em bomba (ver aba Infusões) para PAM ≥65.',
    'Sedoanalgesia contínua se intubado (fentanil ± propofol/midazolam).' ] } ],
  fontes: ['acls2025'] });

T({ id: 'bradi', cat: 'Ressuscitação', cor: 'vermelho', title: 'Bradicardia com pulso',
  alias: ['bradicardia', 'bav', 'bloqueio', 'atropina', 'marca-passo', 'mp transcutaneo'],
  resumo: 'FC <50 com sinais de instabilidade (hipotensão, rebaixamento, choque, dor torácica isquêmica, IC aguda) → atropina; se falhar, marca-passo transcutâneo ou adrenalina/dopamina em infusão.',
  secs: [
    { h: 'Avaliação', li: [
      'Monitor, O₂ se SpO₂ <94%, acesso, **ECG de 12 derivações** (BAV 2º grau Mobitz II / BAVT = risco alto).',
      'Causas: isquemia (IAM inferior), hipercalemia, intoxicação (betabloqueador, BCC, digoxina), hipotireoidismo, hipotermia, HIC (Cushing).' ] },
  ],
  rx: [ { h: 'Instável', li: [
    '**Atropina 1 mg** IV em bolus, repetir a cada 3–5 min (**máx. 3 mg**). Pouco efetiva em BAVT/infra-hissiano e coração transplantado.',
    '**Marca-passo transcutâneo**: modo demanda, FC 60–80, subir corrente até captura elétrica e mecânica (pulso femoral) + analgesia/sedação.',
    '**Adrenalina** 2–10 mcg/min **ou dopamina** 5–20 mcg/kg/min em bomba (ver aba Infusões) como ponte.',
    'Encaminhar para **marca-passo transvenoso**; tratar causa (cálcio/insulina na hipercalemia; glucagon no betabloqueador; anticorpo antidigoxina se disponível).' ] } ],
  fontes: ['acls2025'] });

T({ id: 'taqui', cat: 'Ressuscitação', cor: 'vermelho', title: 'Taquicardias (TSV, FA/flutter, TV com pulso)',
  alias: ['taquicardia', 'tsv', 'fibrilacao atrial', 'fa', 'flutter', 'tv', 'adenosina', 'cardioversao', 'amiodarona', 'metoprolol', 'diltiazem'],
  resumo: 'Instável (hipotensão, choque, rebaixamento, dor isquêmica, IC aguda) → cardioversão elétrica sincronizada. Estável → definir QRS estreito × largo e regular × irregular.',
  secs: [
    { h: 'Cardioversão sincronizada (instável)', table: { head: ['Ritmo', 'Energia inicial (bifásico)'], rows: [
      ['QRS estreito regular (TSV)', '50–100 J'], ['FA / flutter instável', '**≥200 J** (ACLS 2025)'],
      ['QRS largo regular (TV monomórfica)', '100 J'], ['TV polimórfica / sem pulso', '**Desfibrilar** (não sincronizar)']] } },
    { h: 'QRS estreito regular (TSV) — estável', li: [
      'Manobra vagal **modificada** (Valsalva 15 s sentado → deitar e elevar as pernas).',
      '**Adenosina 6 mg** IV em bolus rápido + flush 20 mL; se falhar, **12 mg** (pode repetir 12 mg). Avisar o paciente (sensação de morte iminente). Evitar em asma grave.',
      'Refratária: metoprolol ou diltiazem (abaixo).' ] },
    { h: 'FA / flutter com resposta ventricular alta — estável', li: [
      'Controle de FC (alvo <110 em repouso): **metoprolol 5 mg** IV em 2–5 min, repetir a cada 5 min (máx. 15 mg) — evitar se IC descompensada/hipotensão.',
      'Diltiazem IV 0,25 mg/kg em 2 min (ver dose abaixo); repetir 0,35 mg/kg após 15 min — evitar se FEVE reduzida.',
      'IC com FE reduzida/hipotensão limítrofe: **amiodarona 150 mg** em 10 min + infusão; ou **digoxina 0,25–0,5 mg** IV.',
      '**Cardioversão eletiva** só se <48 h de início (e baixo risco) **ou** anticoagulação ≥3 semanas / ETE sem trombo. Anticoagular conforme CHA₂DS₂-VA (aba Calculadoras).',
      'Pré-excitação (WPW) com FA: **não usar** adenosina, betabloqueador, BCC ou digoxina → cardioversão.' ] },
    { h: 'QRS largo — estável', li: [
      'Considerar TV até prova em contrário. **Amiodarona 150 mg** IV em 10 min (repetir 1×) + infusão 1 mg/min por 6 h e 0,5 mg/min por 18 h.',
      'Adenosina só se regular e monomórfica (pode diagnosticar TSV com aberrância).',
      'Torsades: **sulfato de magnésio 2 g** IV em 10–15 min; corrigir K/Mg; suspender drogas que alargam QT.' ] },
  ],
  rx: [ { h: 'Doses', li: [
    ['Diltiazem IV (5 mg/mL): ', D(0.25, 'mg', { c: 5, max: 25 }), ' em 2 min; 2ª dose 0,35 mg/kg após 15 min; manutenção 5–15 mg/h.'],
    'Amiodarona em infusão: **900 mg (6 ampolas) + SG 5% 232 mL** = 3,6 mg/mL → **17 mL/h** (1 mg/min) por 6 h, depois **8 mL/h** (0,5 mg/min) por 18 h.',
    'Sedação para cardioversão: **etomidato 0,15–0,2 mg/kg** ou **propofol 0,5–1 mg/kg** + fentanil 0,5–1 mcg/kg; via aérea preparada.' ] } ],
  fontes: ['acls2025', 'esc2024fa', 'sbcfa'] });

/* ================= VIA AÉREA ================= */
T({ id: 'iot', cat: 'Via aérea', cor: 'vermelho', title: 'Intubação em sequência rápida (SRI)',
  alias: ['iot', 'intubacao', 'sri', 'isr', 'sequencia rapida', 'etomidato', 'cetamina', 'rocuronio', 'succinilcolina', 'propofol', 'ventilacao mecanica'],
  resumo: 'Os 7 Ps: preparo, pré-oxigenação, otimização pré-intubação, paralisia com indução, posicionamento, passagem do tubo com confirmação por capnografia e cuidados pós-intubação.',
  secs: [
    { h: 'Preparo e pré-oxigenação', li: [
      'Checklist: aspirador, BVM, laringoscópio/videolaringoscópio, bougie, tubos (H 7,5–8,0; M 7,0–7,5), dispositivo supraglótico, kit de via aérea cirúrgica, capnografia.',
      '**Pré-oxigenação 3 min** com O₂ a 15 L/min (máscara não reinalante + cateter nasal 15 L/min = oxigenação apneica) ou VNI se hipoxêmico; cabeceira a 20–30°.',
      '**Otimizar hemodinâmica antes** (choque index >0,8–0,9): volume se responsivo, noradrenalina pronta/em curso, adrenalina "push-dose".' ] },
    { h: 'Escolha do indutor', table: { head: ['Situação', 'Preferir', 'Evitar/reduzir'], rows: [
      ['Choque / instabilidade', '**Cetamina** 0,5–1 mg/kg ou etomidato 0,15–0,2 mg/kg', 'Propofol, midazolam'],
      ['Broncoespasmo', '**Cetamina**', '—'],
      ['Estável / estado de mal', 'Propofol ou etomidato', '—'],
      ['TCE / HIC', 'Etomidato ou cetamina (não aumenta PIC de forma relevante)', 'Hipotensão (PAS <110)']] } },
    { h: 'Pós-intubação e ventilação inicial', li: [
      'Confirmar com **capnografia em curva** (padrão-ouro) + ausculta; RX de tórax (ponta 2–4 cm acima da carina). Fixar: ~21 cm (M) / ~23 cm (H) na rima labial.',
      '**VC 6 mL/kg de peso predito** (ver chips da barra do paciente), PEEP 5–8, FR 16–20 (acidose metabólica: FR maior para manter a compensação), FiO₂ 100% → titular para **SpO₂ 92–96%**.',
      'Pressão de platô **<30** e driving pressure **<15** cmH₂O.',
      'Asma/DPOC: FR 10–12, fluxo alto, relação I:E 1:4–1:5 (hipercapnia permissiva). SDRA grave: prona ≥16 h/dia.',
      'Sedoanalgesia contínua **logo após** o bloqueador (analgesia primeiro): fentanil + propofol ou midazolam (aba Infusões). Alvo RASS −2 a 0 se possível.' ] },
  ],
  rx: [
    { h: 'Pré-tratamento (opcional)', li: [
      ['Fentanil (50 mcg/mL): ', D(2, 'mcg', { c: 50, max: 200 }), ' IV 3 min antes (1–3 mcg/kg) — HIC, dissecção de aorta, SCA. Evitar no choque.'] ] },
    { h: 'Indução', li: [
      ['**Etomidato** (2 mg/mL): ', D(0.3, 'mg', { c: 2 }), ' IV (choque: 0,15–0,2 mg/kg).'],
      ['**Cetamina** (50 mg/mL): ', D(1.5, 'mg', { c: 50 }), ' IV (1–2 mg/kg; choque: 0,5–1 mg/kg).'],
      ['Propofol (10 mg/mL): ', D(1.5, 'mg', { c: 10, wt: 'aj' }), ' IV — só se estável (1–2,5 mg/kg; idoso: reduzir).'],
      ['Midazolam (5 mg/mL): ', D(0.2, 'mg', { c: 5 }), ' IV — causa hipotensão; início lento.'] ] },
    { h: 'Bloqueio neuromuscular', li: [
      ['**Rocurônio** (10 mg/mL): ', D(1.2, 'mg', { c: 10 }), ' IV — condições em 45–60 s; duração 45–70 min.'],
      ['**Succinilcolina** (100 mg → 10 mg/mL): ', D(1.5, 'mg', { c: 10, max: 200 }), ' IV — **contraindicada**: hipercalemia/IRC com K alto, queimadura/esmagamento/denervação/AVC >24–72 h, rabdomiólise, doença neuromuscular, história de hipertermia maligna.'],
      ['Reversão do rocurônio — **sugamadex**: ', D(16, 'mg', { c: 100 }), ' IV (imediata, "não intubo, não oxigeno"); 2–4 mg/kg para reversão eletiva.'] ] },
    { h: 'Hipotensão peri-intubação', li: [
      '**Adrenalina "push-dose" 10 mcg/mL**: 1 mL de adrenalina (1 mg/mL) + 9 mL SF (100 mcg/mL) → tirar 1 mL + 9 mL SF = 10 mcg/mL. Dar **0,5–2 mL (5–20 mcg)** a cada 2–5 min.',
      'Metaraminol (10 mg/mL → diluir 1 mL em 19 mL = 0,5 mg/mL): 0,5–1 mg IV em bolus.',
      'Iniciar/aumentar **noradrenalina** (pode ser periférica em veia calibrosa).' ] },
  ],
  fontes: ['hcfmusp', 'tbxsri', 'ardsnet'] });

/* ================= CHOQUE E INFECÇÃO ================= */
T({ id: 'sepse', cat: 'Choque e infecção', cor: 'vermelho', title: 'Sepse e choque séptico',
  alias: ['sepse', 'choque septico', 'lactato', 'noradrenalina', 'hidrocortisona', 'antibiotico', 'ilas', 'surviving sepsis'],
  resumo: 'Reconhecer cedo, colher lactato e culturas, antibiótico na 1ª hora, cristaloide balanceado se hipoperfusão, noradrenalina para PAM ≥65 e controle de foco.',
  secs: [
    { h: 'Reconhecer', li: [
      'Suspeita de infecção + disfunção orgânica (SOFA ≥2). Triagem com **NEWS/NEWS2, MEWS ou SIRS** — **não usar qSOFA isolado** (SSC 2026).',
      '**Choque séptico**: vasopressor para PAM ≥65 **e** lactato >2 mmol/L apesar de volume adequado.' ] },
    { h: 'Pacote da 1ª hora', li: [
      '**Lactato** (repetir em 2–4 h se >2).',
      '**Hemoculturas** (2 pares) antes do antibiótico — sem atrasá-lo.',
      '**Antibiótico IV**: choque ou sepse provável/definida → **imediato, idealmente até 1 h**; sepse possível sem choque → investigação rápida e antibiótico **em até 3 h** se mantida a suspeita. Betalactâmico: **ataque + infusão estendida** na manutenção.',
      '**Cristaloide ≥30 mL/kg nas primeiras 3 h** se hipoperfusão/choque (sugestão fraca; individualizar), preferindo **balanceado** (Ringer lactato/Plasma-Lyte). Usar peso ajustado/ideal se IMC >30. Guiar por medidas **dinâmicas** (elevação passiva das pernas, VPP/VVS) e reavaliar a cada 500 mL.',
      '**Noradrenalina** se PAM abaixo da meta durante/após volume — **iniciar em veia periférica** sem esperar o acesso central.',
      '**Meta de PAM 65 mmHg** (faixa ±5); **≥65 anos: PAM 60–65**.' ] },
    { h: 'Choque refratário', li: [
      'Noradrenalina em doses crescentes (≈0,25–0,5 mcg/kg/min) → associar **vasopressina 0,03 U/min**.',
      'Ainda refratário → **adrenalina** (ou adrenalina direto se não houver vasopressina). Disfunção miocárdica com hipoperfusão → **dobutamina**. Terlipressina, vitamina C e dopamina **não** recomendadas.',
      '**Corticoide IV no choque séptico**: hidrocortisona **200 mg/dia** (50 mg 6/6h) quando noradrenalina ≥0,25 mcg/kg/min por ≥4 h.',
      'Alvos: PAM na meta, **TEC** como adjuvante, **lactato seriado** (não insistir em volume até normalizar), diurese ≥0,5 mL/kg/h. Transfusão **restritiva** (Hb <7). Após estabilizar: **remoção ativa de fluido** se sobrecarga.',
      '**Controle de foco** em até 6–12 h (drenagem, desbridamento, retirada de cateter).' ] },
    { h: 'Antibiótico empírico (ajustar à flora local e à função renal)', table: { head: ['Cenário', 'Esquema'], rows: [
      ['Comunitária, sem risco de resistência', '**Ceftriaxona 2 g IV 24/24h** (± azitromicina 500 mg se pulmonar). **Sem cobertura anaeróbia** de rotina (PAC/ITU)'],
      ['Abdominal (perfuração) / partes moles necrosante', 'Ceftriaxona 2 g 24/24h + **metronidazol 500 mg 8/8h** (ou pipe-tazo); fasceíte: + clindamicina 900 mg 8/8h'],
      ['Hospitalar / risco de Pseudomonas', '**Piperacilina-tazobactam 4,5 g 6/6h** (infusão estendida 3–4 h) ou **cefepime 2 g 8/8h**'],
      ['Risco de ESBL / choque com uso recente de ATB', '**Meropenem 1–2 g 8/8h** (infusão estendida)'],
      ['Risco de MRSA (cateter, pele, colonização, pós-influenza)', '+ **vancomicina** ataque 25–30 mg/kg (máx. 3 g), depois 15–20 mg/kg 8–12/12h (nível/AUC)'],
      ['Neutropenia febril', 'Cefepime 2 g 8/8h ou pipe-tazo 4,5 g 6/6h (+ vancomicina se instável/pele/cateter)'],
      ['Meningite', 'Ver tópico Meningite']] } },
  ],
  rx: [ { h: 'Doses para este paciente', li: [
    ['Cristaloide balanceado (Ringer lactato): ', D(30, 'mL', { max: 4000, round: 50, wt: 'obeso' }), ' em até 3 h, em alíquotas de 500 mL com reavaliação.'],
    ['Vancomicina — ataque: ', D(25, 'mg', { max: 3000, round: 250 }), ' IV em ≥2 h (25–30 mg/kg); manutenção 15–20 mg/kg conforme ClCr/nível.'],
    'Noradrenalina: **4 ampolas (16 mg) + SG 5% 234 mL** (64 mcg/mL) — dose e mL/h na aba **Infusões**.',
    'Hidrocortisona **50 mg IV 6/6h** (choque refratário).' ] } ],
  fontes: ['ssc2026', 'ilas', 'hcfmusp'] });

T({ id: 'anafilaxia', cat: 'Choque e infecção', cor: 'vermelho', title: 'Anafilaxia',
  alias: ['anafilaxia', 'choque anafilatico', 'adrenalina im', 'angioedema', 'alergia grave'],
  resumo: 'Adrenalina IM na coxa é o tratamento — sem atraso e sem dose máxima de tentativas. Anti-histamínico e corticoide são adjuvantes e não tratam a anafilaxia.',
  secs: [
    { h: 'Critérios', li: [
      'Início agudo (minutos a horas) com pele/mucosa + comprometimento respiratório **ou** hipotensão/disfunção orgânica; **ou** hipotensão / broncoespasmo / acometimento laríngeo após exposição a alérgeno provável, mesmo sem pele (WAO 2020).' ] },
    { h: 'Conduta', li: [
      'Retirar o gatilho, chamar ajuda, **decúbito dorsal com MMII elevados** (sentado se dispneia; decúbito lateral esquerdo se gestante).',
      'O₂ alto fluxo, 2 acessos calibrosos, monitor. Via aérea difícil: preparar IOT precoce/cricotireoidostomia (angioedema).',
      'Observação **≥6 h** (até 24 h se grave, necessidade de >1 dose de adrenalina ou asma). Alta com prescrição de **autoinjetor de adrenalina** (particular), plano escrito e encaminhamento ao alergista.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    ['**Adrenalina 1 mg/mL IM** no vasto lateral da coxa: ', D(0.01, 'mg', { c: 1, max: 0.5 }), ' — repetir a cada **5–15 min** se necessário.'],
    'Hipotensão: **SF 0,9% ou Ringer 1–2 L** rápido (20 mL/kg), repetir conforme resposta.',
    'Refratária (≥2 doses IM + volume): **adrenalina em infusão 0,05–0,5 mcg/kg/min** (ex.: 1 mg em 250 mL = 4 mcg/mL; iniciar 1–4 mcg/min ≈ 15–60 mL/h) em monitorização.',
    'Broncoespasmo persistente: **salbutamol** 100 mcg 4–8 jatos com espaçador ou nebulização 5 mg (20 gotas).',
    'Em uso de betabloqueador e refratário: **glucagon 1–5 mg IV em 5 min**, depois 5–15 mcg/min.',
    'Adjuvantes (após a adrenalina): **difenidramina 50 mg IV** ou prometazina 25–50 mg IM; **hidrocortisona 200 mg IV** ou metilprednisolona 125 mg IV.' ] } ],
  fontes: ['wao2020', 'asbai'] });

T({ id: 'hemorragico', cat: 'Choque e infecção', cor: 'vermelho', title: 'Trauma e choque hemorrágico',
  alias: ['trauma', 'choque hemorragico', 'atls', 'acido tranexamico', 'transfusao macica', 'xabcde', 'politrauma'],
  resumo: 'xABCDE: controlar hemorragia exsanguinante primeiro, hipotensão permissiva, ácido tranexâmico até 3 h e transfusão balanceada precoce.',
  secs: [
    { h: 'xABCDE', li: [
      '**x** — hemorragia externa exsanguinante: compressão direta, **torniquete**, curativo hemostático.',
      '**A** — via aérea com proteção cervical. **B** — pneumotórax hipertensivo → descompressão (4º–5º EIC na linha axilar média).',
      '**C** — 2 acessos calibrosos (ou IO), **eFAST**, pelve (cinta pélvica), tipagem, gasometria/lactato, β-hCG.',
      '**D** — Glasgow, pupilas, glicemia. **E** — despir, prevenir hipotermia (aquecer fluidos).' ] },
    { h: 'Ressuscitação', li: [
      '**Hipotensão permissiva**: PAS 80–90 mmHg até controle do sangramento (contraindicada no **TCE**: manter PAS ≥100–110 / PAM ≥80).',
      'Limitar cristaloide (≤1 L); **hemoderivados precoces** 1:1:1 (hemácias:plasma:plaquetas). Escore ABC ≥2 → protocolo de transfusão maciça.',
      '**Cálcio** na transfusão maciça (alvo Ca iônico >1,1). Evitar a tríade letal: hipotermia, acidose, coagulopatia.',
      'Controle definitivo: centro cirúrgico / angioembolização; não atrasar transferência.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    '**Ácido tranexâmico 1 g IV em 10 min** (até **3 h** do trauma) + **1 g IV em 8 h** (1 g em 250 mL SF a ~31 mL/h).',
    '**Gluconato de cálcio 10% 10–30 mL** IV (ou cloreto de cálcio 10% 10 mL em acesso central) se Ca iônico baixo / transfusão maciça.',
    'Analgesia: **fentanil 0,5–1 mcg/kg IV** ou cetamina 0,1–0,3 mg/kg (preserva a pressão).',
    'Profilaxia antitetânica conforme esquema (ver Prescrições PS → Ferimentos).' ] } ],
  fontes: ['atls', 'crash2'] });

/* ================= CARDIOVASCULAR ================= */
T({ id: 'iamcsst', cat: 'Cardiovascular', cor: 'vermelho', title: 'IAM com supra de ST (IAMCSST)',
  alias: ['iam', 'infarto', 'supra', 'scacsst', 'fibrinolise', 'tenecteplase', 'alteplase', 'estreptoquinase', 'aas', 'clopidogrel', 'ticagrelor'],
  resumo: 'ECG em até 10 min. Reperfusão: ICP primária se porta-balão ≤90 min (ou transferência ≤120 min); senão, fibrinólise em até 30 min (dentro de 12 h de sintomas).',
  secs: [
    { h: 'Diagnóstico', li: [
      'Supra de ST ≥1 mm em 2 derivações contíguas (V2–V3: ≥2 mm em homens ≥40 a; ≥2,5 mm <40 a; ≥1,5 mm mulheres), BRE novo com isquemia (Sgarbossa), equivalentes (posterior, De Winter, supra de aVR com infra difuso).',
      'Fazer **V3R–V4R** no IAM inferior (VD: evitar nitrato/morfina, dar volume).' ] },
    { h: 'Contraindicações à fibrinólise', li: [
      '**Absolutas**: AVCh prévio; AVCi <3 meses; neoplasia/MAV intracraniana; dissecção de aorta; sangramento ativo; TCE/cirurgia intracraniana ou medular <2 meses; HAS grave não controlada (urgência).',
      '**Relativas**: PAS >180 ou PAD >110; RCP traumática/prolongada; cirurgia maior <3 semanas; anticoagulação oral; gestação; úlcera péptica ativa.',
      'Após fibrinólise: transferir para centro com hemodinâmica — **estratégia fármaco-invasiva** (cateterismo em 2–24 h; resgate imediato se não reperfundiu em 60–90 min).' ] },
  ],
  rx: [
    { h: 'Antiagregação e anticoagulação', li: [
      '**AAS 300 mg** VO mastigado (ataque), depois 100 mg/dia.',
      'ICP primária: **ticagrelor 180 mg** VO (ou prasugrel 60 mg se sem AVC/AIT prévio; ou clopidogrel 600 mg).',
      'Fibrinólise: **clopidogrel 300 mg** (≤75 anos) ou **75 mg** (>75 anos).',
      (p) => p.age >= 75 ? `Enoxaparina com fibrinólise (≥75 anos): **0,75 mg/kg SC 12/12h sem bolus** = ${nf(Math.min(0.75 * p.w, 75), 0)} mg (máx. 75 mg nas 2 primeiras doses). ClCr <30: 1 mg/kg 1x/dia.` : `Enoxaparina com fibrinólise (<75 anos): **30 mg IV em bolus** + **1 mg/kg SC 12/12h** = ${p.w ? nf(Math.min(p.w, 100), 0) : '—'} mg (máx. 100 mg nas 2 primeiras doses). ClCr <30: 1 mg/kg 1x/dia.`,
      ['OU heparina não fracionada: bolus ', D(60, 'UI', { max: 4000 }), ' IV + 12 UI/kg/h (máx. 1.000 UI/h), TTPa 1,5–2× o controle.'] ] },
    { h: 'Fibrinolítico (escolher um)', li: [
      ['**Tenecteplase** dose única em bolus (5–10 s): ', D(0, 'mg', { bands: [[59.99, 30], [69.99, 35], [79.99, 40], [89.99, 45], [1e9, 50]] }), (p) => p.age >= 75 ? ' — **≥75 anos: usar metade da dose** (STREAM-2).' : ' (≥75 anos: metade da dose).'],
      ['**Alteplase** (acelerada): 15 mg em bolus + ', D(0.75, 'mg', { max: 50 }), ' em 30 min + ', D(0.5, 'mg', { max: 35 }), ' em 60 min (total ≤100 mg).'],
      '**Estreptoquinase 1.500.000 UI** em 100 mL SF/SG 5% em 30–60 min (não repetir; hipotensão é comum — reduzir velocidade).' ] },
    { h: 'Demais', li: [
      '**Nitrato** SL (isossorbida 5 mg) se dor/HAS — não usar se PAS <90, IAM de VD ou inibidor de PDE-5 recente.',
      'Morfina 2–4 mg IV só para dor refratária. O₂ apenas se SpO₂ <90%.',
      '**Atorvastatina 80 mg** VO. Betabloqueador VO nas primeiras 24 h se sem IC/choque/BAV.' ] } ],
  fontes: ['accaha2025acs', 'sbc_iam', 'stream2'] });

T({ id: 'scasst', cat: 'Cardiovascular', cor: 'laranja', title: 'SCA sem supra / dor torácica',
  alias: ['scasst', 'iamssst', 'angina instavel', 'dor toracica', 'troponina', 'heart', 'fondaparinux'],
  resumo: 'ECG em 10 min, troponina ultrassensível 0/1–2 h, estratificação (HEART/GRACE) e estratégia invasiva conforme risco.',
  secs: [
    { h: 'Estratégia invasiva', li: [
      '**Imediata (<2 h)**: instabilidade hemodinâmica/elétrica, dor refratária, IC aguda, complicação mecânica.',
      '**Precoce (<24 h)**: IAMSSST confirmado, alterações dinâmicas de ST, GRACE >140.',
      'Baixo risco (HEART ≤3 e troponinas negativas): alta com seguimento / teste não invasivo.' ] },
    { h: 'Diferenciais que matam', li: [ 'Dissecção de aorta (dor lancinante, déficit de pulso, mediastino alargado), TEP, pneumotórax hipertensivo, tamponamento, ruptura esofágica.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    '**AAS 300 mg** VO mastigado; manter 100 mg/dia.',
    'Segundo antiagregante: **ticagrelor 180 mg** (ou clopidogrel 300–600 mg) — pode aguardar a anatomia se cateterismo precoce.',
    ['**Enoxaparina**: ', D(1, 'mg', { max: 150 }), ' SC 12/12h (ClCr <30: 1x/dia; ≥75 anos: 0,75 mg/kg) — ou **fondaparinux 2,5 mg SC 1x/dia** (menor sangramento).'],
    'Nitrato SL/IV para dor; betabloqueador VO se sem IC; **atorvastatina 80 mg**.' ] } ],
  fontes: ['accaha2025acs', 'esc2023acs', 'sbc_iam'] });

T({ id: 'eap', cat: 'Cardiovascular', cor: 'vermelho', title: 'IC aguda / edema agudo de pulmão',
  alias: ['eap', 'edema agudo', 'icc', 'ic descompensada', 'furosemida', 'nitroglicerina', 'vni', 'choque cardiogenico'],
  resumo: 'Perfil hemodinâmico (quente/frio, úmido/seco). EAP hipertensivo: VNI + nitrato em dose alta + diurético. Choque cardiogênico: noradrenalina ± dobutamina e reperfusão se isquêmico.',
  secs: [
    { h: 'Perfis', table: { head: ['Perfil', 'Conduta'], rows: [
      ['Quente e úmido (mais comum)', 'Diurético ± vasodilatador'],
      ['Quente e úmido hipertensivo (EAP)', '**VNI + nitroglicerina** (dose alta) + diurético'],
      ['Frio e úmido', 'PAS >90: vasodilatador + diurético; PAS <90: **noradrenalina ± dobutamina**'],
      ['Frio e seco', 'Volume cuidadoso; reavaliar']] } },
    { h: 'Monitorar', li: [ 'Diurese (meta >100–150 mL/h nas primeiras 6 h ou Na urinário >50–70 mEq/L em 2 h), K, Mg, creatinina; dobrar diurético se resposta inadequada.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    '**VNI** (CPAP 8–10 cmH₂O ou BiPAP IPAP 10–15 / EPAP 5–8) se desconforto/SpO₂ <90%.',
    '**Isossorbida 5 mg SL** a cada 5–10 min (até 3×) enquanto prepara a bomba; **nitroglicerina IV** iniciar 10–20 mcg/min e subir 10–20 a cada 3–5 min (até 200 mcg/min ou mais no EAP hipertensivo) — aba Infusões.',
    '**Furosemida IV**: virgem de diurético **40–80 mg**; usuário crônico **1–2,5× a dose oral diária** em bolus (repetir/dobrar em 2–6 h se diurese baixa).',
    'Choque cardiogênico: **noradrenalina** (PAM ≥65) + **dobutamina 2,5–10 mcg/kg/min**; ECG/eco; cateterismo se SCA.',
    'Morfina **não** é rotina (associada a pior desfecho).' ] } ],
  fontes: ['esc2023hf', 'sbc_ic'] });

T({ id: 'has', cat: 'Cardiovascular', cor: 'laranja', title: 'Emergência hipertensiva e dissecção de aorta',
  alias: ['crise hipertensiva', 'emergencia hipertensiva', 'urgencia hipertensiva', 'nitroprussiato', 'dissecao', 'aorta', 'esmolol', 'pre-eclampsia', 'hidralazina'],
  resumo: 'Emergência = PA muito elevada (geralmente ≥180/110) COM lesão aguda e progressiva de órgão-alvo → droga IV titulável. Sem lesão aguda ("elevação importante da PA sem LOA" — termo que substitui "urgência" na Diretriz 2025) → observação e anti-hipertensivo oral.',
  secs: [
    { h: 'Metas de redução', table: { head: ['Situação', 'Meta'], rows: [
      ['Geral (encefalopatia, LRA, retinopatia grave)', 'PAM **−20–25% na 1ª hora**, depois 160/100 em 2–6 h, normal em 24–48 h'],
      ['**Dissecção de aorta**', '**FC <60 e PAS 90–120 em 20 min** (betabloqueador IV ANTES do nitroprussiato; asmático: diltiazem)'],
      ['EAP hipertensivo', 'Nitroglicerina IV ± nitroprussiato + furosemida + VNI'],
      ['SCA', 'PAS <140 (evitar <120) por 24–72 h: nitroglicerina, esmolol/metoprolol; evitar hidralazina'],
      ['Encefalopatia hipertensiva', '−20–25% na 1ª hora; ~160/100 em até 48 h'],
      ['AVCi candidato a trombólise', '<185/110 antes; **<180/105 por 24 h** após'],
      ['AVCi sem trombólise', 'Tratar só se >220/120 (reduzir 15% em 24 h)'],
      ['AVC hemorrágico', 'PAS 150–220 → **~140** de forma gradual (evitar <130); PAS >220 → infusão contínua'],
      ['HSA', 'PAS <160 até tratar aneurisma; redução gradual'],
      ['Pré-eclâmpsia grave', 'PAS 140–150 / PAD 90–100; MgSO₄ para prevenção de eclâmpsia'],
      ['Crise adrenérgica (cocaína, feocromocitoma)', 'PAS <140 na 1ª h: **benzodiazepínico** + nitrato; graves NTG/NPS; feocromocitoma: alfabloqueio antes do beta']] } },
    { h: 'Elevação importante da PA sem lesão aguda (antiga "urgência")', li: [ 'Repouso em ambiente calmo por **30 min**, tratar dor/ansiedade; se persistir, **captopril 25 mg VO** ou **clonidina 0,1–0,2 mg VO**. Meta PAS <160 e PAD <100; reavaliação ambulatorial em **1–7 dias**. **Não** usar nifedipino de liberação rápida.' ] },
  ],
  rx: [ { h: 'Drogas IV', li: [
    '**Nitroprussiato** 0,25–10 mcg/kg/min (50 mg + SG 5% 248 mL = 200 mcg/mL; proteger da luz) — aba Infusões.',
    '**Nitroglicerina** 5–200 mcg/min (SCA, EAP).',
    '**Esmolol**: ataque 0,5 mg/kg em 1 min + 50–300 mcg/kg/min (dissecção) — ou **metoprolol 5 mg IV** a cada 5 min (até 15 mg).',
    '**Hidralazina** (20 mg/mL): 5 mg IV a cada 20 min (máx. 20–30 mg) na gestante; **sulfato de magnésio**: ataque 4–6 g IV em 20 min + 1–2 g/h (Zuspan).',
    'Dissecção tipo A → cirurgia de emergência; tipo B complicada → endovascular. Analgesia com opioide.' ] } ],
  fontes: ['dbh2025', 'esc2024has', 'febrasgo_pe'] });

T({ id: 'tep', cat: 'Cardiovascular', cor: 'laranja', title: 'Tromboembolismo pulmonar (TEP)',
  alias: ['tep', 'embolia', 'trombolise', 'enoxaparina', 'heparina', 'rivaroxabana', 'apixabana', 'tvp'],
  resumo: 'Probabilidade clínica (Wells/Genebra + PERC) → D-dímero ajustado à idade ou angio-TC. Estratificar (choque? sPESI, VD, troponina): alto risco = trombólise.',
  secs: [
    { h: 'Estratificação (ESC)', table: { head: ['Risco', 'Critério', 'Conduta'], rows: [
      ['**Alto**', 'Choque/hipotensão (PAS <90 por 15 min) ou PCR', '**Trombólise** sistêmica (ou embolectomia/cateter se contraindicada)'],
      ['Intermediário-alto', 'sPESI ≥1 + disfunção de VD **e** troponina ↑', 'Anticoagular (HNF), monitorar; trombólise de resgate se deteriorar'],
      ['Intermediário-baixo', 'sPESI ≥1 com VD **ou** troponina alterado', 'Anticoagular, internar'],
      ['Baixo', 'sPESI 0, sem VD/troponina', 'DOAC e considerar alta precoce']] } },
  ],
  rx: [ { h: 'Prescrição', li: [
    ['**Enoxaparina**: ', D(1, 'mg', { max: 180 }), ' SC 12/12h (ClCr <30: 1 mg/kg 1x/dia ou preferir HNF).'],
    ['OU **HNF**: bolus ', D(80, 'UI', { max: 10000, round: 100 }), ' IV + ', D(18, 'UI/h', { round: 10 }), ' (TTPa 1,5–2,5×) — preferir se alto risco/trombólise possível ou ClCr <30.'],
    '**Rivaroxabana 15 mg 12/12h por 21 dias**, depois 20 mg 1x/dia; ou **apixabana 10 mg 12/12h por 7 dias**, depois 5 mg 12/12h (particular).',
    '**Alto risco — alteplase 100 mg IV em 2 h** (10 mg em bolus + 90 mg em 2 h); suspender HNF durante e retomar quando TTPa <2×. Em PCR: 50 mg em bolus.',
    'Hipotensão: evitar volume excessivo (VD dilatado) — noradrenalina; O₂; evitar IOT se possível (colapso).' ] } ],
  fontes: ['esc2019tep', 'chest2021'] });

/* ================= NEUROLOGIA ================= */
T({ id: 'avci', cat: 'Neurologia', cor: 'vermelho', title: 'AVC isquêmico agudo — trombólise e trombectomia',
  alias: ['avc', 'avci', 'derrame', 'trombolise', 'alteplase', 'tenecteplase', 'trombectomia', 'nihss'],
  resumo: 'Hora do último momento visto bem. TC sem contraste (± angio-TC) imediata; glicemia. Trombólise IV até 4,5 h; trombectomia para oclusão de grande vaso até 24 h.',
  secs: [
    { h: 'Fluxo', li: [
      'Código AVC: glicemia capilar, **NIHSS** (aba Calculadoras), TC de crânio sem contraste **em até 20–25 min** da chegada, angio-TC de vasos intra/extracranianos se candidato a trombectomia.',
      'Trombólise IV (**alteplase ou tenecteplase**) até **4,5 h** para déficit **incapacitante**, independentemente do NIHSS. Déficit **não incapacitante** (ex.: sensitivo isolado): trombólise sem benefício → **dupla antiagregação**.',
      'Horário desconhecido / **4,5–9 h**: trombólise em selecionados com imagem avançada (mismatch DWI-FLAIR ou perfusão). Porta-agulha **≤60 min** (ideal ≤45).',
      'Trombectomia: oclusão de grande vaso anterior (ACI/M1) até **24 h** com critérios de imagem (inclui alguns núcleos extensos); **basilar até 24 h com NIHSS ≥10** (recomendação forte). Se não há transferência rápida, considerar levar direto ao centro com trombectomia.' ] },
    { h: 'Principais contraindicações à trombólise', li: [
      'Hemorragia na TC, hipodensidade extensa, AVC ou TCE grave <3 meses, cirurgia intracraniana/medular <3 meses, HSA, neoplasia intra-axial, sangramento GI <21 dias, coagulopatia (plaquetas <100 mil, INR >1,7, TTPa alterado), dose terapêutica de HBPM <24 h, DOAC <48 h (salvo exames normais/reversão), PA não controlável ≥185/110, glicemia <50.' ] },
    { h: 'Após a trombólise', li: [
      'PA **<180/105** por 24 h — **não** reduzir intensivamente para <140 após trombectomia (pode piorar); NIHSS de 15/15 min por 2 h; sem antitrombóticos por 24 h (TC de controle antes).',
      'Piora neurológica, cefaleia, vômitos → **parar infusão**, TC urgente, fibrinogênio; crioprecipitado 10 U e ácido tranexâmico 1 g.',
      'Angioedema (IECA): ver Anafilaxia.' ] },
    { h: 'Sem trombólise', li: [
      '**AAS 160–300 mg** assim que excluída hemorragia. AVC menor (NIHSS ≤3) ou AIT de alto risco: **AAS + clopidogrel 300 mg (ataque)** e manter dupla por 21 dias.',
      'Glicemia 140–180 (controle intensivo 80–130 **não** recomendado); tratar febre; avaliar deglutição antes de dieta VO; profilaxia de TEV.' ] },
  ],
  rx: [ { h: 'Trombolíticos', li: [
    ['**Alteplase 0,9 mg/kg** (máx. 90 mg): total ', D(0.9, 'mg', { max: 90 }), ' — **10% em bolus** em 1 min e o restante em 60 min.'],
    ['**Tenecteplase 0,25 mg/kg** (máx. 25 mg) em bolus único: ', D(0.25, 'mg', { max: 25 }), ' — equivalente à alteplase (AHA/ASA 2026); confirme a disponibilidade no protocolo local.'],
    'PA antes da trombólise ≥185/110: **metoprolol 5 mg IV** ou **nitroprussiato** em bomba (titular).' ] } ],
  fontes: ['aha_avc2026', 'sbdcv', 'ms_avc'] });

T({ id: 'avch', cat: 'Neurologia', cor: 'vermelho', title: 'AVC hemorrágico e HSA',
  alias: ['avch', 'hemorragia intracraniana', 'hip', 'hsa', 'aneurisma', 'nimodipino', 'reversao anticoagulante'],
  resumo: 'Controle pressórico precoce, reversão imediata de anticoagulantes, tratar HIC e avaliação neurocirúrgica.',
  secs: [
    { h: 'Hemorragia intraparenquimatosa', li: [
      '**PAS alvo ~140 mmHg** (130–150) em até 1 h, de forma suave e sustentada; evitar <130.',
      'Reverter anticoagulação (ver Intoxicações → Reversão). Plaquetas: transfundir só se cirurgia/plaquetopenia.',
      'Cabeceira 30°, normoglicemia, normotermia; **não** usar anticonvulsivante profilático. Escore ICH para prognóstico.',
      'Neurocirurgia: hemorragia cerebelar >3 cm ou com compressão de tronco/hidrocefalia; hidrocefalia → DVE.' ] },
    { h: 'Hemorragia subaracnóidea', li: [
      'Cefaleia súbita "a pior da vida": TC de crânio (sensibilidade ~100% em até 6 h); se TC normal após 6 h → punção lombar (xantocromia) ou angio-TC.',
      '**PAS <160** até tratar o aneurisma; analgesia; **nimodipino 60 mg VO 4/4h por 21 dias**; manter euvolemia e sódio.',
      'Tratamento precoce do aneurisma (embolização/clipagem) em até 24 h.' ] },
  ],
  rx: [ { h: 'Hipertensão intracraniana', li: [
    ['**Manitol 20%** (0,2 g/mL): ', D(1, 'g', { c: 0.2, max: 100 }), ' IV em 15–20 min (0,5–1 g/kg).'],
    ['OU **NaCl 3%**: ', D(3, 'mL', { max: 250, round: 10 }), ' em 10–20 min (ou NaCl 20% 30 mL em acesso central). Preparo de 500 mL de NaCl 3%: **SF 0,9% 445 mL + NaCl 20% 55 mL**.'],
    'Cabeceira 30°, PaCO₂ 35–40 (hiperventilação breve só como ponte), sedação, normotermia.' ] } ],
  fontes: ['aha_ich2022', 'aha_hsa2023'] });

T({ id: 'eme', cat: 'Neurologia', cor: 'vermelho', title: 'Crise convulsiva e estado de mal epiléptico',
  alias: ['convulsao', 'crise epileptica', 'estado de mal', 'eme', 'diazepam', 'midazolam', 'fenitoina', 'levetiracetam', 'fenobarbital'],
  resumo: 'Crise ≥5 min = estado de mal. Benzodiazepínico em dose adequada aos 5 min; 2ª linha aos 20 min; refratário → IOT e infusão contínua.',
  secs: [
    { h: 'Linha do tempo', table: { head: ['Tempo', 'Conduta'], rows: [
      ['0–5 min', 'ABC, O₂, monitor, **glicemia capilar** (glicose se <60), acesso; tiamina se etilista/desnutrido'],
      ['5–20 min', '**Benzodiazepínico** (pode repetir 1×)'],
      ['20–40 min', '**2ª linha** (levetiracetam, fenitoína ou valproato — eficácia semelhante, ESETT)'],
      ['>40 min (refratário)', '**IOT** + midazolam ou propofol contínuos; EEG contínuo; UTI']] } },
    { h: 'Investigar', li: [ 'Eletrólitos (Na, Ca, Mg), glicemia, função renal/hepática, nível sérico de anticonvulsivante, toxicológico, β-hCG, TC de crânio; punção lombar se febre/imunossupressão; eclâmpsia na gestante (MgSO₄).' ] },
  ],
  rx: [
    { h: '1ª linha (5 min)', li: [
      ['**Diazepam IV** (5 mg/mL): ', D(0.15, 'mg', { c: 5, max: 10 }), ' em 1–2 min; repetir 1× em 5 min.'],
      ['**Midazolam IM** (sem acesso; 5 mg/mL): ', D(0, 'mg', { bands: [[40, 5], [1e9, 10]], c: 5 }), ' (10 mg se >40 kg) — ou intranasal 0,2 mg/kg.'] ] },
    { h: '2ª linha (20 min)', li: [
      ['**Levetiracetam** (100 mg/mL): ', D(60, 'mg', { c: 100, max: 4500 }), ' IV em 100 mL SF em 10–15 min.'],
      ['OU **fenitoína** (50 mg/mL): ', D(20, 'mg', { c: 50, max: 2000 }), ' IV **só em SF 0,9%**, ≤50 mg/min (idoso/cardiopata ≤25 mg/min), com monitor (bradiarritmia, hipotensão).'],
      ['OU **ácido valproico IV**: ', D(40, 'mg', { max: 3000 }), ' em 10 min (evitar hepatopatia, gestação, doença mitocondrial).'],
      ['OU **fenobarbital** (100 mg/mL): ', D(15, 'mg', { c: 100, max: 1500 }), ' IV ≤50–100 mg/min (depressão respiratória).'] ] },
    { h: 'Refratário (IOT)', li: [
      ['**Midazolam**: bolus ', D(0.2, 'mg', { max: 20 }), ' + infusão 0,05–2 mg/kg/h (aba Infusões).'],
      ['OU **propofol**: bolus ', D(1.5, 'mg', { wt: 'aj' }), ' + 20–200 mcg/kg/min (risco de síndrome de infusão do propofol em doses altas prolongadas).'],
      'Cetamina 1–2 mg/kg + 0,5–5 mg/kg/h como adjuvante em super-refratário.' ] } ],
  fontes: ['aes2016', 'esett', 'hcfmusp'] });

T({ id: 'coma', cat: 'Neurologia', cor: 'laranja', title: 'Rebaixamento do nível de consciência',
  alias: ['coma', 'rebaixamento', 'glasgow', 'naloxona', 'tiamina', 'hipoglicemia', 'wernicke', 'flumazenil'],
  resumo: 'ABC, glicemia capilar imediata, tiamina antes da glicose em risco, naloxona se suspeita de opioide; Glasgow ≤8 com proteção de via aérea comprometida → IOT.',
  secs: [
    { h: 'Avaliação rápida', li: [
      'Glasgow (aba Calculadoras) + pupilas + sinais focais + meningismo.',
      'Exames: glicemia, gasometria com lactato, Na/K/Ca/Mg, ureia/creatinina, função hepática/amônia, hemograma, TSH, toxicológico/etanol, CK, culturas se febre, ECG; **TC de crânio** se focal/trauma/sem causa metabólica clara; punção lombar se febre.' ] },
  ],
  rx: [ { h: 'Medidas imediatas', li: [
    '**Tiamina 100–200 mg IV** (Wernicke suspeito: **500 mg IV 8/8h por 3 dias**) antes da glicose em etilistas/desnutridos.',
    'Glicemia <70: **glicose 50% 50 mL IV** (25 g), depois SG 10% em manutenção.',
    'Suspeita de opioide (miose + bradipneia): **naloxona 0,4 mg IV** (usuário crônico: começar com 0,04–0,1 mg) repetindo a cada 2–3 min até FR ≥12 (máx. ~10 mg); IM/IN 2–4 mg se sem acesso. Considerar infusão (2/3 da dose eficaz por hora).',
    'Flumazenil **não** é rotina (risco de convulsão em usuário crônico de BZD/tricíclico).' ] } ],
  fontes: ['hcfmusp'] });

/* ================= RESPIRATÓRIO ================= */
T({ id: 'asma', cat: 'Respiratório', cor: 'laranja', title: 'Crise de asma grave',
  alias: ['asma', 'broncoespasmo', 'salbutamol', 'ipratropio', 'magnesio', 'crise asmatica'],
  resumo: 'O₂ para SpO₂ 93–95%, SABA + ipratrópio repetidos, corticoide sistêmico na 1ª hora, sulfato de magnésio se grave; reavaliar em 1 h.',
  secs: [
    { h: 'Gravidade', li: [
      '**Grave**: fala em palavras, agitação, FR >30, FC >120, SpO₂ <90%, PFE ≤50%. **Risco de vida**: sonolência, confusão, tórax silencioso, cianose, hipotensão → UTI/IOT.',
      'Gasometria se SpO₂ <90% ou grave: **PaCO₂ normal ou alta = fadiga** (sinal de alerta).' ] },
    { h: 'IOT na asma', li: [ '**Cetamina** como indutor, tubo ≥8,0, FR 10–12, VC 6–8 mL/kg PP, I:E 1:4–1:5, platô <30; aceitar hipercapnia (pH >7,15). Hipotensão pós-IOT: desconectar e comprimir o tórax (auto-PEEP).' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    '**Salbutamol spray 100 mcg: 4–10 jatos** com espaçador a cada 20 min na 1ª hora — ou **nebulização salbutamol 5 mg (20 gotas de 5 mg/mL)** + SF 3 mL com O₂ 6–8 L/min a cada 20 min.',
    '**Brometo de ipratrópio 500 mcg (40 gotas de 0,25 mg/mL)** junto, a cada 20 min por 3 doses (crise moderada/grave).',
    '**Prednisona/prednisolona 40–50 mg VO** (ou **metilprednisolona 40–80 mg IV** / hidrocortisona 200 mg IV se não deglute) na 1ª hora; manter 5–7 dias.',
    '**Sulfato de magnésio 2 g IV** em 20 min (grave/sem resposta): 4 mL de MgSO₄ 50% em 100 mL SF.',
    'Alta: **budesonida-formoterol** (manutenção e resgate) ou corticoide inalatório regular — SABA isolado não é recomendado; retorno em 2–7 dias.' ] } ],
  fontes: ['gina2025', 'pcdt_asma'] });

T({ id: 'dpoc', cat: 'Respiratório', cor: 'laranja', title: 'DPOC exacerbada',
  alias: ['dpoc', 'exacerbacao', 'enfisema', 'bronquite cronica', 'vni', 'hipercapnia'],
  resumo: 'O₂ controlado (SpO₂ 88–92%), broncodilatador de curta ação, corticoide 5 dias, antibiótico se escarro purulento, VNI se acidose respiratória.',
  secs: [
    { h: 'VNI', li: [ 'Indicada se **pH ≤7,35 e PaCO₂ ≥45** e/ou desconforto importante: BiPAP IPAP 10–12 (até 20) / EPAP 4–5; reavaliar gasometria em 1–2 h. Falha/rebaixamento/instabilidade → IOT.' ] },
    { h: 'Exames', li: [ 'Gasometria, RX de tórax, ECG, hemograma, eletrólitos; BNP/troponina e angio-TC se suspeita de IC/TEP (diagnósticos diferenciais frequentes).' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    '**Salbutamol** 4–8 jatos (100 mcg) ou nebulização 2,5–5 mg + **ipratrópio 500 mcg** a cada 4–6 h (intervalos menores na 1ª hora).',
    '**Prednisona 40 mg VO 1x/dia por 5 dias** (ou metilprednisolona 40 mg IV).',
    'Antibiótico (escarro purulento + ↑ dispneia ou volume, ou VNI/IOT) por 5 dias: **amoxicilina-clavulanato 875/125 mg 12/12h**, **azitromicina 500 mg/dia por 3 dias** ou **doxiciclina 100 mg 12/12h**; risco de Pseudomonas: levofloxacino 750 mg/dia.',
    'Profilaxia de TEV se internado.' ] } ],
  fontes: ['gold2025'] });

/* ================= METABÓLICO ================= */
T({ id: 'cad', cat: 'Metabólico e eletrólitos', cor: 'laranja', title: 'Cetoacidose diabética e estado hiperosmolar',
  alias: ['cad', 'cetoacidose', 'ehh', 'hiperosmolar', 'insulina', 'hiperglicemia'],
  resumo: 'Volume primeiro, potássio antes da insulina se K <3,5, insulina regular IV 0,1 U/kg/h, glicose no soro quando glicemia <250 e investigar o gatilho.',
  secs: [
    { h: 'Critérios (ADA 2024)', li: [
      '**CAD**: glicemia ≥200 (ou DM conhecido) + **pH <7,3 ou HCO₃ <18** + **cetonemia ≥3 mmol/L** (ou cetonúria ≥2+). Atenção à CAD euglicêmica com iSGLT2.',
      '**EHH**: glicemia ≥600 + osmolaridade efetiva >300 mOsm/kg (ou total >320) + pH ≥7,3, HCO₃ ≥15, cetonemia <3.',
      'Resolução da CAD: **pH ≥7,3 e HCO₃ ≥18** e cetonemia <0,6 mmol/L.' ] },
    { h: 'Potássio (antes e durante a insulina)', table: { head: ['K⁺ sérico', 'Conduta'], rows: [
      ['<3,5', '**Não iniciar insulina**; KCl 10–20 mEq/h até K ≥3,5'],
      ['3,5–5,0', 'KCl **20–30 mEq em cada litro** de soro (alvo 4–5)'],
      ['>5,0', 'Sem K; checar a cada 2 h']] } },
    { h: 'Monitorar', li: [ 'Glicemia capilar 1/1h; eletrólitos/gasometria venosa a cada 2–4 h; Na corrigido (aba Calculadoras); queda de glicose 50–75 mg/dL/h; na EHH, queda de osmolaridade ≤3–8 mOsm/kg/h (risco de edema cerebral).' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    'Hidratação: **SF 0,9% ou Ringer lactato 1–1,5 L na 1ª hora**, depois 250–500 mL/h guiado por volemia e Na corrigido (Na corrigido normal/alto → NaCl 0,45%).',
    ['**Insulina regular IV contínua**: ', D(0.1, 'UI/h', { round: 0.5 }), ' (0,1 U/kg/h; bolus de 0,1 U/kg opcional). Solução: **100 UI em 100 mL SF** (1 UI/mL) → mesma vazão em mL/h.'],
    'Glicemia <250 (CAD) ou <300 (EHH): **associar SG 5% (ou 10%)** e reduzir insulina para **0,05 U/kg/h**, mantendo glicemia 150–200 (CAD) / 200–300 (EHH) até a resolução.',
    '**Bicarbonato** só se **pH <7,0**: 100 mEq (100 mL de NaHCO₃ 8,4%) em 400 mL de água destilada + 20 mEq KCl em 2 h.',
    'Fosfato se <1 mg/dL, IC, anemia ou depressão respiratória.',
    'Transição: insulina basal SC (ex.: NPH/glargina 0,2–0,3 U/kg/dia) **2 h antes** de desligar a bomba, com a resolução e aceitando dieta.' ] } ],
  fontes: ['ada2024crises', 'sbd2024'] });

T({ id: 'hipoglic', cat: 'Metabólico e eletrólitos', cor: 'laranja', title: 'Hipoglicemia',
  alias: ['hipoglicemia', 'glicose 50', 'glucagon', 'sulfonilureia', 'octreotida'],
  resumo: 'Glicemia <70 com sintomas: 15–20 g de carboidrato VO se consciente; senão glicose IV ou glucagon. Investigar causa e risco de recorrência.',
  secs: [ { h: 'Internar/observar', li: [ 'Sulfonilureia (hipoglicemia prolongada, até 24–72 h), insulina de ação longa, intoxicação intencional, insuficiência renal/hepática, sepse, etilismo.' ] } ],
  rx: [ { h: 'Prescrição', li: [
    'Consciente: **15–20 g de glicose VO** (1 colher de sopa de açúcar em água / 150 mL de suco); repetir em 15 min se <70.',
    'Inconsciente: **glicose 50% 40–50 mL IV** (20–25 g) em veia calibrosa (ou glicose 25% 80–100 mL), depois **SG 10% 80–100 mL/h**.',
    'Sem acesso: **glucagon 1 mg IM/SC** (pouco eficaz em etilistas/hepatopatas).',
    'Sulfonilureia: **octreotida 50–100 mcg SC 8/8h** + glicose; **tiamina 100 mg** antes em etilistas.' ] } ],
  fontes: ['ada2025', 'sbd2024'] });

T({ id: 'hiperk', cat: 'Metabólico e eletrólitos', cor: 'vermelho', title: 'Hipercalemia',
  alias: ['hipercalemia', 'potassio alto', 'k alto', 'gluconato de calcio', 'insulina glicose', 'sorcal', 'lokelma'],
  resumo: 'ECG imediato. Cálcio estabiliza a membrana (não baixa K); insulina+glicose e salbutamol deslocam K para dentro da célula; diurético, resina ou diálise retiram.',
  secs: [
    { h: 'Gravidade', li: [
      '**Grave**: K ≥6,5 ou alterações no ECG (T apiculada, PR longo, QRS largo, onda sinusoidal, bradiarritmia) → tratar já.',
      'Moderada 6,0–6,4 sem ECG alterado. Excluir pseudo-hipercalemia (hemólise, leucocitose/trombocitose).' ] },
    { h: 'Causas', li: [ 'Insuficiência renal, IECA/BRA/espironolactona, AINE, trimetoprima, heparina, rabdomiólise, lise tumoral, acidose, insuficiência adrenal, digoxina, betabloqueador.' ] },
  ],
  rx: [ { h: 'Prescrição', li: [
    '**Gluconato de cálcio 10% 30 mL** (3 g) IV em 5–10 min (ou cloreto de cálcio 10% 10 mL em acesso central); repetir se ECG persistir alterado. Início 1–3 min, dura 30–60 min.',
    '**Insulina regular 10 UI IV + glicose 50% 50 mL** (25 g) em 15 min — se glicemia <250. Reduz K ~0,6–1 mEq/L em 30–60 min. Insuficiência renal: considerar 5 UI. Glicemia capilar 1/1h por 6 h (risco de hipoglicemia); se glicemia inicial <126: SG 10% 50 mL/h por 5 h.',
    '**Salbutamol nebulização 10–20 mg** (40–80 gotas de 5 mg/mL) em 10 min — adjuvante (evitar se coronariopata/taquiarritmia).',
    '**Bicarbonato de sódio 8,4% 50–100 mL** IV só se acidose metabólica (pH <7,2 / HCO₃ <15).',
    '**Furosemida 40–80 mg IV** se hipervolêmico e com diurese.',
    'Resinas: **ciclossilicato de zircônio sódico 10 g VO 8/8h** por até 72 h (particular) ou **patiromer 8,4 g/dia**; **poliestirenossulfonato de cálcio 30 g** VO ou retal (Sorcal) — efeito lento.',
    '**Hemodiálise**: refratária, LRA/DRC oligúrica, rabdomiólise, intoxicação.' ] } ],
  fontes: ['ukka2023', 'kdigo2020k'] });

T({ id: 'hipona', cat: 'Metabólico e eletrólitos', cor: 'laranja', title: 'Hiponatremia grave e sódio',
  alias: ['hiponatremia', 'sodio', 'nacl 3', 'salina hipertonica', 'mielinolise', 'sindrome de desmielinizacao osmotica', 'hipernatremia'],
  resumo: 'Sintomas graves (convulsão, coma, vômitos) → NaCl 3% em bolus até subir 4–6 mEq/L. Limite de correção: 8–10 mEq/L em 24 h (8 se alto risco de desmielinização).',
  secs: [
    { h: 'Abordagem', li: [
      'Confirmar hiposmolaridade (excluir hiperglicemia — usar Na corrigido); avaliar volemia; osmolaridade e Na urinários.',
      '**Alto risco de desmielinização osmótica**: Na ≤105, hipocalemia, etilismo, desnutrição, hepatopatia → limite **8 mEq/L/24 h**.',
      'Calculadora de Adrogué-Madias e déficit de água livre: aba **Calculadoras → Sódio**.' ] },
    { h: 'Hipercorreção', li: [ 'Se ultrapassar o limite: **SG 5% 3 mL/kg/h** (água livre) ± **desmopressina 2 mcg IV/SC 6/6–8/8h** para re-baixar o Na.' ] },
    { h: 'Hipernatremia', li: [ 'Calcular déficit de água livre (aba Calculadoras). Crônica (>48 h): reduzir ≤10–12 mEq/L/24 h (~0,5 mEq/L/h). Hipovolêmico instável: SF primeiro; depois SG 5% ou NaCl 0,45% / água livre pela sonda.' ] },
  ],
  rx: [ { h: 'Prescrição — hiponatremia sintomática grave', li: [
    '**NaCl 3% 150 mL IV em 20 min** (ou 2 mL/kg); dosar Na em 20 min; **repetir até 2–3 vezes** até subir 5 mEq/L ou cessarem os sintomas.',
    'Preparo de NaCl 3%: **SF 0,9% 445 mL + NaCl 20% 55 mL** (500 mL) — ou SF 0,9% 89 mL + NaCl 20% 11 mL (100 mL).',
    'Depois: tratar a causa; Na a cada 4–6 h; restrição hídrica no SIADH (± ureia VO 15–30 g/dia).' ] } ],
  fontes: ['esh2014na', 'verbalis2013'] });

T({ id: 'adrenal', cat: 'Metabólico e eletrólitos', cor: 'vermelho', title: 'Crise adrenal',
  alias: ['crise adrenal', 'insuficiencia adrenal', 'addison', 'hidrocortisona'],
  resumo: 'Choque refratário a volume, hiponatremia, hipercalemia, hipoglicemia, dor abdominal em usuário crônico de corticoide ou com insuficiência adrenal → hidrocortisona imediata (não esperar exames).',
  secs: [ { h: 'Pistas', li: [ 'Uso prolongado de corticoide suspenso, doença intercorrente, Addison conhecido, hiperpigmentação, eosinofilia. Colher cortisol e ACTH antes, se não atrasar.' ] } ],
  rx: [ { h: 'Prescrição', li: [
    '**Hidrocortisona 100 mg IV em bolus**, depois **200 mg/24 h** (50 mg IV 6/6h ou infusão contínua) até estabilizar.',
    '**SF 0,9% 1 L na 1ª hora**, depois conforme volemia; glicose se hipoglicemia.',
    'Reduzir progressivamente para dose de manutenção em 1–3 dias; tratar o gatilho.' ] } ],
  fontes: ['endo_adrenal'] });

/* ================= GASTRO ================= */
T({ id: 'hda', cat: 'Gastrointestinal', cor: 'vermelho', title: 'Hemorragia digestiva alta',
  alias: ['hda', 'hemorragia digestiva', 'hematemese', 'melena', 'varizes', 'terlipressina', 'omeprazol', 'pantoprazol', 'octreotida', 'glasgow blatchford'],
  resumo: 'Estabilizar, transfusão restritiva, IBP em dose alta, EDA em até 24 h (≤12 h se varicosa). Suspeita de varizes: terlipressina + ceftriaxona antes da EDA.',
  secs: [
    { h: 'Estabilização', li: [
      '2 acessos calibrosos, tipagem, hemograma, coagulograma, ureia/creatinina; **Glasgow-Blatchford** (aba Calculadoras): 0–1 → alta e EDA ambulatorial.',
      'Transfundir se **Hb <7** (alvo 7–9); coronariopata/sangramento ativo com instabilidade: Hb <8. Varizes: evitar hipervolemia.',
      'Anticoagulados: avaliar reversão (Intoxicações → Reversão). IOT protetora se hematêmese maciça/rebaixamento.' ] },
  ],
  rx: [
    { h: 'Não varicosa (úlcera)', li: [
      '**Omeprazol ou pantoprazol 80 mg IV** em bolus, depois **40 mg IV 12/12h** (ou 8 mg/h) até a EDA; após hemostasia endoscópica de alto risco manter dose alta por 72 h.',
      '**Eritromicina 250 mg IV** 30–120 min antes da EDA (melhora a visualização) — se disponível.' ] },
    { h: 'Varicosa (cirrótico)', li: [
      (p) => `**Terlipressina ${p.w && p.w < 50 ? '1 mg' : '2 mg'} IV 4/4h** (1 mg se <50 kg) por 2–5 dias; após controle 1 mg 4/4h. Contraindicações relativas: isquemia coronária/periférica, hiponatremia grave.`,
      'OU **octreotida 50 mcg IV em bolus + 50 mcg/h** (500 mcg em 250 mL SF = 2 mcg/mL → 25 mL/h) — ou somatostatina 250 mcg bolus + 250–500 mcg/h.',
      '**Ceftriaxona 1 g IV 1x/dia por até 7 dias** (profilaxia de PBE/infecção).',
      '**EDA em até 12 h** (ligadura elástica). Sangramento incontrolável: balão de Sengstaken-Blakemore (≤24 h) / prótese → TIPS. Lactulose para prevenir encefalopatia.' ] } ],
  fontes: ['acg2021', 'baveno7', 'esge2021'] });

/* ================= TOXICOLOGIA ================= */
T({ id: 'intox', cat: 'Toxicologia', cor: 'laranja', title: 'Intoxicações e antídotos',
  alias: ['intoxicacao', 'antidoto', 'paracetamol', 'acetilcisteina', 'organofosforado', 'atropina', 'triciclico', 'betabloqueador', 'carvao ativado', 'metemoglobina', 'ciatox'],
  resumo: 'ABCDE, glicemia, ECG (QRS/QTc), toxíndrome. Ligue para o CIATox (0800 722 6001, 24 h). Carvão ativado até 1 h se via aérea protegida e substância adsorvível.',
  secs: [
    { h: 'Toxíndromes', table: { head: ['Síndrome', 'Achados', 'Exemplos'], rows: [
      ['Colinérgica', 'Miose, sialorreia, broncorreia, bradicardia, fasciculações, diarreia', 'Organofosforados, carbamatos ("chumbinho")'],
      ['Anticolinérgica', 'Midríase, pele seca/quente, retenção urinária, delirium, taquicardia', 'Tricíclicos, anti-histamínicos, atropina'],
      ['Simpatomimética', 'Midríase, sudorese, HAS, taquicardia, hipertermia, agitação', 'Cocaína, anfetaminas'],
      ['Opioide', 'Miose, bradipneia, rebaixamento', 'Morfina, tramadol, fentanil'],
      ['Sedativo-hipnótica', 'Rebaixamento com sinais vitais pouco alterados', 'Benzodiazepínicos, álcool, barbitúricos']] } },
    { h: 'Descontaminação', li: [ '**Carvão ativado 1 g/kg (máx. 50 g)** VO/SNG até 1 h da ingestão. Não usar: via aérea desprotegida, cáusticos, hidrocarbonetos, álcoois, metais (ferro, lítio).' ] },
  ],
  rx: [
    { h: 'Antídotos', li: [
      '**Paracetamol** → **N-acetilcisteína** IV (nomograma a partir de 4 h; ou ingestão >150 mg/kg/7,5 g): 150 mg/kg em 1 h + 50 mg/kg em 4 h + 100 mg/kg em 16 h (máx. calculado para 100 kg). VO: 140 mg/kg + 70 mg/kg 4/4h × 17 doses.',
      '**Opioide** → **naloxona 0,4–2 mg** IV/IM/IN, repetir (ver Rebaixamento).',
      '**Organofosforado/carbamato** → **atropina 1–2 mg IV, dobrando a dose a cada 5 min** até secar secreções brônquicas (não guiar por pupila/FC) + pralidoxima 30 mg/kg (se disponível) + benzodiazepínico se convulsão.',
      '**Tricíclico** (QRS >100 ms, arritmia, hipotensão) → **bicarbonato de sódio 8,4% 1–2 mEq/kg** IV em bolus, alvo pH 7,45–7,55.',
      '**Betabloqueador / BCC** → glucagon 3–10 mg IV + infusão; **gluconato de cálcio 10% 30–60 mL**; **insulina em alta dose 1 U/kg + 1 U/kg/h** com glicose; vasopressor.',
      '**Benzodiazepínico** → suporte; flumazenil 0,2 mg só em casos selecionados (sem uso crônico, sem pró-convulsivante).',
      '**Metemoglobinemia** (>20–30% ou sintomática) → **azul de metileno 1–2 mg/kg IV** em 5 min (evitar em deficiência de G6PD).',
      '**Anestésico local** (cardiotoxicidade) → **emulsão lipídica 20% 1,5 mL/kg** em bolus + 0,25 mL/kg/min.',
      '**Monóxido de carbono** → O₂ 100% (máscara não reinalante); câmara hiperbárica se grave/gestante. **Cianeto** → hidroxocobalamina 5 g IV.',
      '**Metanol/etilenoglicol** → etanol (ou fomepizol, se disponível) + hemodiálise; **ferro** → deferoxamina; **digoxina** → anticorpo antidigoxina (se disponível); **heparina** → protamina.' ] },
    { h: 'Reversão de anticoagulantes (sangramento grave)', li: [
      '**Varfarina** → **vitamina K 10 mg IV** lenta + **complexo protrombínico (CCP) 25–50 UI/kg** (conforme INR) ou plasma 15 mL/kg se sem CCP.',
      '**Dabigatrana** → **idarucizumabe 5 g IV** (2 × 2,5 g).',
      '**Rivaroxabana/apixabana/edoxabana** → **CCP 50 UI/kg** (ou andexanete alfa, se disponível).',
      '**HNF** → **protamina 1 mg para cada 100 UI** de heparina das últimas 2–3 h (máx. 50 mg). **Enoxaparina** → protamina 1 mg/mg de enoxaparina (<8 h).',
      'Antiagregantes: transfusão de plaquetas **não** recomendada no AVCh (PATCH), salvo neurocirurgia.' ] } ],
  fontes: ['ciatox', 'hcfmusp', 'acc2020reversal'] });

T({ id: 'agitacao', cat: 'Toxicologia', cor: 'amarelo', title: 'Agitação psicomotora e delirium',
  alias: ['agitacao', 'contencao', 'haloperidol', 'prometazina', 'midazolam', 'olanzapina', 'delirium', 'psicose'],
  resumo: 'Segurança da equipe, desescalada verbal, oferecer medicação VO; se necessário, IM. Sempre investigar causa orgânica (hipoglicemia, hipóxia, intoxicação, abstinência, infecção, TCE).',
  secs: [ { h: 'Cuidados', li: [
    'Contenção mecânica: equipe treinada, 5 pontos, reavaliação a cada 15–30 min, registro em prontuário.',
    'Idosos/delirium: doses menores (haloperidol 0,5–1 mg); evitar benzodiazepínico (exceto abstinência).',
    'Após medicação: SpO₂, PA, FC, ECG se haloperidol IV/doses repetidas (QTc).' ] } ],
  rx: [ { h: 'Opções', li: [
    'VO (colaborativo): **risperidona 2 mg** ou **olanzapina 10 mg** ou **haloperidol 5 mg** ± lorazepam 2 mg.',
    'IM: **haloperidol 5 mg + midazolam 5 mg** IM (pode repetir em 30–60 min) — ou **haloperidol 5 mg + prometazina 50 mg** IM.',
    'IM alternativa: **olanzapina 10 mg IM** (não associar benzodiazepínico parenteral na sequência; intervalo ≥1 h).',
    'Agitação extrema/perigosa: **cetamina 4–5 mg/kg IM** (ou 1–2 mg/kg IV) com monitorização e via aérea preparada.',
    'Intoxicação simpatomimética/abstinência alcoólica: preferir **benzodiazepínico** (diazepam 10 mg IV ou midazolam 5–10 mg IM).' ] } ],
  fontes: ['abp_agitacao', 'nice_agitation'] });

T({ id: 'alcool', cat: 'Toxicologia', cor: 'amarelo', title: 'Abstinência alcoólica e Wernicke',
  alias: ['abstinencia', 'alcool', 'delirium tremens', 'ciwa', 'tiamina', 'wernicke', 'diazepam'],
  resumo: 'Benzodiazepínico guiado por sintomas (CIWA-Ar), tiamina para todos e investigação de complicações (hipoglicemia, eletrólitos, TCE, infecção).',
  secs: [ { h: 'Gravidade', li: [
    'CIWA-Ar <8: leve (suporte); 8–15: moderada; ≥15–20: grave. **Delirium tremens** (48–96 h): agitação, alucinações, hipertermia, taquicardia → UTI.',
    'Repor **Mg, K, P**; glicemia; evitar SG antes da tiamina.' ] } ],
  rx: [ { h: 'Prescrição', li: [
    '**Diazepam 10–20 mg VO/IV a cada 1 h** enquanto CIWA-Ar ≥10 (dose de ataque), depois conforme sintomas. Hepatopatia grave/idoso: **lorazepam 1–4 mg**.',
    'Refratário a BZD (>200 mg de diazepam): **fenobarbital 10 mg/kg IV** em 30 min ou propofol/dexmedetomidina em UTI.',
    '**Tiamina 300 mg/dia** (profilaxia); suspeita de Wernicke (confusão, ataxia, oftalmoplegia): **500 mg IV 8/8h por 3 dias**, depois 250 mg/dia por 3–5 dias.',
    'Ácido fólico 5 mg/dia; complexo B; hidratação; reposição de Mg (sulfato de magnésio 1–2 g IV).' ] } ],
  fontes: ['asam2020', 'hcfmusp'] });
