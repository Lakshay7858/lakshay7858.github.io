// Escores clínicos — itens com opções [rótulo, pontos] (escolha única) ou caixas (c: pontos).
const R = (lo, hi, cls, txt) => ({ lo, hi, cls, txt });
const SCORES = [
  { id: 'glasgow', nome: 'Glasgow (GCS-P)', grupo: 'Neuro', itens: [
    { q: 'Abertura ocular', o: [['Espontânea', 4], ['Ao som/voz', 3], ['À pressão', 2], ['Nenhuma', 1]] },
    { q: 'Resposta verbal', o: [['Orientada', 5], ['Confusa', 4], ['Palavras', 3], ['Sons', 2], ['Nenhuma', 1]] },
    { q: 'Resposta motora', o: [['Obedece comandos', 6], ['Localiza', 5], ['Flexão normal (retirada)', 4], ['Flexão anormal (decorticação)', 3], ['Extensão (descerebração)', 2], ['Nenhuma', 1]] },
    { q: 'Reatividade pupilar (GCS-P = GCS − pontos)', o: [['Ambas reagem', 0], ['Uma não reage', -1], ['Nenhuma reage', -2]] }],
    interp: [R(-99, 8, 'bad', 'Grave (≤8): proteger via aérea — considerar IOT'), R(9, 12, 'warnb', 'Moderado (9–12)'), R(13, 15, 'ok', 'Leve (13–15)')], fonte: 'Teasdale 2014/2018 (GCS-P)' },
  { id: 'nihss', nome: 'NIHSS', grupo: 'Neuro', itens: [
    { q: '1a. Nível de consciência', o: [['Alerta', 0], ['Sonolento (desperta a estímulo leve)', 1], ['Estupor (estímulo repetido/doloroso)', 2], ['Coma / só reflexos', 3]] },
    { q: '1b. Perguntas (mês e idade)', o: [['Ambas corretas', 0], ['Uma correta', 1], ['Nenhuma', 2]] },
    { q: '1c. Comandos (abrir/fechar olhos e mão)', o: [['Ambos', 0], ['Um', 1], ['Nenhum', 2]] },
    { q: '2. Olhar conjugado', o: [['Normal', 0], ['Paresia parcial', 1], ['Desvio forçado', 2]] },
    { q: '3. Campos visuais', o: [['Normal', 0], ['Hemianopsia parcial', 1], ['Hemianopsia completa', 2], ['Bilateral / cegueira', 3]] },
    { q: '4. Paresia facial', o: [['Normal', 0], ['Menor (sulco apagado)', 1], ['Parcial (face inferior)', 2], ['Completa (sup. e inf.)', 3]] },
    { q: '5a. Motor — braço esquerdo (10 s)', o: [['Sem queda', 0], ['Queda antes de 10 s', 1], ['Algum esforço contra gravidade', 2], ['Sem esforço contra gravidade', 3], ['Sem movimento', 4]] },
    { q: '5b. Motor — braço direito (10 s)', o: [['Sem queda', 0], ['Queda antes de 10 s', 1], ['Algum esforço contra gravidade', 2], ['Sem esforço contra gravidade', 3], ['Sem movimento', 4]] },
    { q: '6a. Motor — perna esquerda (5 s)', o: [['Sem queda', 0], ['Queda antes de 5 s', 1], ['Algum esforço contra gravidade', 2], ['Sem esforço contra gravidade', 3], ['Sem movimento', 4]] },
    { q: '6b. Motor — perna direita (5 s)', o: [['Sem queda', 0], ['Queda antes de 5 s', 1], ['Algum esforço contra gravidade', 2], ['Sem esforço contra gravidade', 3], ['Sem movimento', 4]] },
    { q: '7. Ataxia de membros', o: [['Ausente', 0], ['Em 1 membro', 1], ['Em 2 membros', 2]] },
    { q: '8. Sensibilidade', o: [['Normal', 0], ['Perda leve a moderada', 1], ['Perda grave / total', 2]] },
    { q: '9. Linguagem', o: [['Normal', 0], ['Afasia leve a moderada', 1], ['Afasia grave', 2], ['Mutismo / afasia global', 3]] },
    { q: '10. Disartria', o: [['Normal', 0], ['Leve a moderada', 1], ['Grave / ininteligível', 2]] },
    { q: '11. Extinção / negligência', o: [['Ausente', 0], ['Em 1 modalidade', 1], ['Profunda / >1 modalidade', 2]] }],
    interp: [R(0, 0, 'ok', 'Sem déficit mensurável'), R(1, 4, 'warnb', 'AVC leve (1–4) — avaliar se o déficit é incapacitante'), R(5, 15, 'bad', 'Moderado (5–15)'), R(16, 20, 'bad', 'Moderado a grave (16–20)'), R(21, 42, 'bad', 'Grave (21–42)')], fonte: 'NIH Stroke Scale' },
  { id: 'news2', nome: 'NEWS2', grupo: 'Triagem e sepse', itens: [
    { q: 'Frequência respiratória', o: [['≤8', 3], ['9–11', 1], ['12–20', 0], ['21–24', 2], ['≥25', 3]] },
    { q: 'SpO₂ (escala 1)', o: [['≤91%', 3], ['92–93%', 2], ['94–95%', 1], ['≥96%', 0]] },
    { q: 'Oxigênio suplementar', o: [['Ar ambiente', 0], ['Em O₂', 2]] },
    { q: 'PAS (mmHg)', o: [['≤90', 3], ['91–100', 2], ['101–110', 1], ['111–219', 0], ['≥220', 3]] },
    { q: 'Frequência cardíaca', o: [['≤40', 3], ['41–50', 1], ['51–90', 0], ['91–110', 1], ['111–130', 2], ['≥131', 3]] },
    { q: 'Consciência', o: [['Alerta', 0], ['Confusão nova / voz / dor / sem resposta', 3]] },
    { q: 'Temperatura (°C)', o: [['≤35,0', 3], ['35,1–36,0', 1], ['36,1–38,0', 0], ['38,1–39,0', 1], ['≥39,1', 2]] }],
    interp: [R(0, 4, 'ok', 'Baixo risco (0–4) — mas qualquer parâmetro isolado = 3 exige avaliação médica urgente'), R(5, 6, 'warnb', 'Risco médio (5–6): avaliação médica urgente; considerar sepse'), R(7, 99, 'bad', 'Alto risco (≥7): avaliação de emergência, considerar UTI')], nota: 'SSC 2026 recomenda NEWS/NEWS2, MEWS ou SIRS para triagem de sepse (não qSOFA isolado). DPOC hipercápnico: escala 2 de SpO₂ (alvo 88–92%).', fonte: 'Royal College of Physicians 2017' },
  { id: 'qsofa', nome: 'qSOFA', grupo: 'Triagem e sepse', itens: [
    { q: 'FR ≥22 irpm', c: 1 }, { q: 'Alteração do estado mental', c: 1 }, { q: 'PAS ≤100 mmHg', c: 1 }],
    interp: [R(0, 1, 'ok', '<2: não exclui sepse'), R(2, 3, 'bad', '≥2: maior risco de mortalidade — investigar disfunção orgânica')], nota: 'Prognóstico, não diagnóstico. Não usar isoladamente como triagem (SSC 2026).', fonte: 'Sepsis-3 (2016)' },
  { id: 'curb65', nome: 'CURB-65', grupo: 'Respiratório', itens: [
    { q: 'Confusão mental nova', c: 1 }, { q: 'Ureia >43 mg/dL (7 mmol/L)', c: 1 }, { q: 'FR ≥30 irpm', c: 1 }, { q: 'PAS <90 ou PAD ≤60 mmHg', c: 1 }, { q: 'Idade ≥65 anos', c: 1 }],
    interp: [R(0, 1, 'ok', '0–1: tratamento ambulatorial'), R(2, 2, 'warnb', '2: internação (ou observação/curta permanência)'), R(3, 5, 'bad', '3–5: PAC grave — internar; 4–5 avaliar UTI')], fonte: 'BTS / SBPT 2018' },
  { id: 'wellstep', nome: 'Wells — TEP', grupo: 'Cardiovascular', itens: [
    { q: 'Sinais clínicos de TVP', c: 3 }, { q: 'TEP é o diagnóstico mais provável', c: 3 }, { q: 'FC >100 bpm', c: 1.5 }, { q: 'Imobilização ≥3 dias ou cirurgia nas últimas 4 semanas', c: 1.5 }, { q: 'TVP ou TEP prévios', c: 1.5 }, { q: 'Hemoptise', c: 1 }, { q: 'Câncer ativo (tratamento ≤6 meses ou paliativo)', c: 1 }],
    interp: [R(0, 4, 'ok', '≤4: TEP improvável → D-dímero (ajustado à idade se >50 anos: idade × 10 ng/mL FEU); negativo exclui'), R(4.5, 99, 'bad', '>4: TEP provável → angio-TC de tórax (cintilografia se contraindicada)')], fonte: 'Wells 2000; ESC 2019' },
  { id: 'perc', nome: 'PERC (exclusão de TEP)', grupo: 'Cardiovascular', itens: [
    { q: 'Idade ≥50 anos', c: 1 }, { q: 'FC ≥100 bpm', c: 1 }, { q: 'SpO₂ <95% em ar ambiente', c: 1 }, { q: 'Edema unilateral de perna', c: 1 }, { q: 'Hemoptise', c: 1 }, { q: 'Cirurgia ou trauma nas últimas 4 semanas', c: 1 }, { q: 'TVP/TEP prévio', c: 1 }, { q: 'Uso de estrogênio', c: 1 }],
    interp: [R(0, 0, 'ok', 'PERC negativo: com probabilidade clínica BAIXA (gestalt <15%), TEP excluído sem D-dímero'), R(1, 8, 'warnb', 'PERC positivo: seguir com D-dímero / Wells')], fonte: 'Kline 2004' },
  { id: 'wellstvp', nome: 'Wells — TVP', grupo: 'Cardiovascular', itens: [
    { q: 'Câncer ativo', c: 1 }, { q: 'Paralisia, paresia ou imobilização gessada recente de MMII', c: 1 }, { q: 'Acamado ≥3 dias ou cirurgia maior nas últimas 12 semanas', c: 1 }, { q: 'Dor à palpação no trajeto venoso profundo', c: 1 }, { q: 'Edema de todo o membro', c: 1 }, { q: 'Panturrilha >3 cm maior que a contralateral', c: 1 }, { q: 'Edema com cacifo (só no membro sintomático)', c: 1 }, { q: 'Veias superficiais colaterais (não varicosas)', c: 1 }, { q: 'TVP prévia documentada', c: 1 }, { q: 'Diagnóstico alternativo tão ou mais provável', c: -2 }],
    interp: [R(-9, 1, 'ok', '<2: TVP improvável → D-dímero; se positivo, Doppler'), R(2, 99, 'bad', '≥2: TVP provável → Doppler venoso')], fonte: 'Wells 2003' },
  { id: 'heart', nome: 'HEART (dor torácica)', grupo: 'Cardiovascular', itens: [
    { q: 'História', o: [['Pouco suspeita', 0], ['Moderadamente suspeita', 1], ['Altamente suspeita', 2]] },
    { q: 'ECG', o: [['Normal', 0], ['Repolarização inespecífica / BRE / HVE / MP', 1], ['Infra de ST significativo', 2]] },
    { q: 'Idade', o: [['<45', 0], ['45–64', 1], ['≥65', 2]] },
    { q: 'Fatores de risco (HAS, DM, DLP, tabagismo, obesidade, HF)', o: [['Nenhum', 0], ['1–2', 1], ['≥3 ou doença aterosclerótica conhecida', 2]] },
    { q: 'Troponina inicial', o: [['≤ limite normal', 0], ['1–3× o limite', 1], ['>3× o limite', 2]] }],
    interp: [R(0, 3, 'ok', '0–3: baixo risco (MACE ~1–2%) — alta com seguimento se troponinas seriadas negativas'), R(4, 6, 'warnb', '4–6: risco moderado — observação, troponina seriada, teste funcional/cardiologia'), R(7, 10, 'bad', '7–10: alto risco — estratégia invasiva precoce')], fonte: 'Six/Backus 2008' },
  { id: 'cha2ds2va', nome: 'CHA₂DS₂-VA (FA)', grupo: 'Cardiovascular', itens: [
    { q: 'Insuficiência cardíaca', c: 1 }, { q: 'Hipertensão', c: 1 }, { q: 'Idade ≥75 anos', c: 2 }, { q: 'Diabetes', c: 1 }, { q: 'AVC/AIT/tromboembolismo prévio', c: 2 }, { q: 'Doença vascular (IAM, DAP, placa aórtica)', c: 1 }, { q: 'Idade 65–74 anos', c: 1 }],
    interp: [R(0, 0, 'ok', '0: anticoagulação não indicada'), R(1, 1, 'warnb', '1: considerar anticoagulação (individualizar)'), R(2, 9, 'bad', '≥2: anticoagulação oral recomendada (DOAC preferível à varfarina, exceto prótese mecânica/estenose mitral moderada-grave)')], nota: 'ESC 2024 retirou o sexo feminino do escore.', fonte: 'ESC 2024 (FA)' },
  { id: 'hasbled', nome: 'HAS-BLED', grupo: 'Cardiovascular', itens: [
    { q: 'Hipertensão não controlada (PAS >160)', c: 1 }, { q: 'Função renal anormal (diálise, transplante, Cr >2,26)', c: 1 }, { q: 'Função hepática anormal (cirrose, bilirrubina >2× ou TGO/TGP >3×)', c: 1 }, { q: 'AVC prévio', c: 1 }, { q: 'Sangramento prévio ou predisposição', c: 1 }, { q: 'INR lábil', c: 1 }, { q: 'Idade >65 anos', c: 1 }, { q: 'Antiplaquetário ou AINE', c: 1 }, { q: 'Álcool ≥8 doses/semana', c: 1 }],
    interp: [R(0, 2, 'ok', '0–2: risco de sangramento baixo/moderado'), R(3, 9, 'warnb', '≥3: alto risco — corrigir fatores modificáveis e reavaliar com frequência (não contraindica anticoagulação)')], fonte: 'Pisters 2010' },
  { id: 'spesi', nome: 'sPESI (TEP)', grupo: 'Cardiovascular', itens: [
    { q: 'Idade >80 anos', c: 1 }, { q: 'Câncer', c: 1 }, { q: 'Doença cardiopulmonar crônica', c: 1 }, { q: 'FC ≥110 bpm', c: 1 }, { q: 'PAS <100 mmHg', c: 1 }, { q: 'SpO₂ <90%', c: 1 }],
    interp: [R(0, 0, 'ok', '0: baixo risco (mortalidade 30 d ~1%) — considerar alta precoce se sem disfunção de VD/troponina'), R(1, 6, 'warnb', '≥1: risco intermediário — avaliar VD e troponina; internar')], fonte: 'ESC 2019' },
  { id: 'gbs', nome: 'Glasgow-Blatchford (HDA)', grupo: 'Gastro', itens: [
    { q: 'Ureia (mg/dL)', o: [['<39', 0], ['39–47', 2], ['48–59', 3], ['60–149', 4], ['≥150', 6]] },
    { q: 'Hemoglobina — se homem', opt: true, o: [['≥13', 0], ['12–12,9', 1], ['10–11,9', 3], ['<10', 6]] },
    { q: 'Hemoglobina — se mulher', opt: true, o: [['≥12', 0], ['10–11,9', 1], ['<10', 6]] },
    { q: 'PAS (mmHg)', o: [['≥110', 0], ['100–109', 1], ['90–99', 2], ['<90', 3]] },
    { q: 'FC ≥100 bpm', c: 1 }, { q: 'Melena', c: 1 }, { q: 'Síncope', c: 2 }, { q: 'Hepatopatia', c: 2 }, { q: 'Insuficiência cardíaca', c: 2 }],
    interp: [R(0, 1, 'ok', '0–1: muito baixo risco — alta e EDA ambulatorial'), R(2, 7, 'warnb', '2–7: internar, EDA em até 24 h'), R(8, 99, 'bad', '≥8: alto risco de intervenção/transfusão')], nota: 'Preencha só a linha de hemoglobina do sexo do paciente.', fonte: 'Blatchford 2000; ESGE 2021' },
  { id: 'childpugh', nome: 'Child-Pugh', grupo: 'Gastro', itens: [
    { q: 'Bilirrubina total (mg/dL)', o: [['<2', 1], ['2–3', 2], ['>3', 3]] },
    { q: 'Albumina (g/dL)', o: [['>3,5', 1], ['2,8–3,5', 2], ['<2,8', 3]] },
    { q: 'INR', o: [['<1,7', 1], ['1,7–2,3', 2], ['>2,3', 3]] },
    { q: 'Ascite', o: [['Ausente', 1], ['Leve / controlada', 2], ['Moderada a grave', 3]] },
    { q: 'Encefalopatia', o: [['Ausente', 1], ['Grau I–II', 2], ['Grau III–IV', 3]] }],
    interp: [R(5, 6, 'ok', 'Classe A (5–6)'), R(7, 9, 'warnb', 'Classe B (7–9)'), R(10, 15, 'bad', 'Classe C (10–15)')], fonte: 'Pugh 1973' },
  { id: 'bisap', nome: 'BISAP (pancreatite)', grupo: 'Gastro', itens: [
    { q: 'Ureia >53 mg/dL (BUN >25)', c: 1 }, { q: 'Alteração do estado mental', c: 1 }, { q: 'SIRS (≥2 critérios)', c: 1 }, { q: 'Idade >60 anos', c: 1 }, { q: 'Derrame pleural', c: 1 }],
    interp: [R(0, 2, 'ok', '0–2: baixo risco de mortalidade'), R(3, 5, 'bad', '≥3: risco aumentado de pancreatite grave e mortalidade')], fonte: 'Wu 2008' },
  { id: 'alvarado', nome: 'Alvarado (apendicite)', grupo: 'Gastro', itens: [
    { q: 'Dor migratória para FID', c: 1 }, { q: 'Anorexia', c: 1 }, { q: 'Náuseas/vômitos', c: 1 }, { q: 'Dor à palpação em FID', c: 2 }, { q: 'Descompressão brusca dolorosa', c: 1 }, { q: 'Febre ≥37,3 °C', c: 1 }, { q: 'Leucocitose >10.000', c: 2 }, { q: 'Desvio à esquerda (neutrofilia)', c: 1 }],
    interp: [R(0, 4, 'ok', '≤4: baixa probabilidade'), R(5, 6, 'warnb', '5–6: intermediária — imagem (USG/TC)'), R(7, 10, 'bad', '≥7: alta — avaliação cirúrgica')], fonte: 'Alvarado 1986' },
  { id: 'cthead', nome: 'Canadian CT Head Rule', grupo: 'Imagem (quando fazer TC)', itens: [
    { q: 'Glasgow <15 duas horas após o trauma', c: 1 }, { q: 'Suspeita de fratura aberta ou com afundamento', c: 1 }, { q: 'Sinal de fratura de base (hemotímpano, olhos de guaxinim, Battle, otorreia/rinorreia de LCR)', c: 1 }, { q: '≥2 episódios de vômito', c: 1 }, { q: 'Idade ≥65 anos', c: 1 }, { q: 'Amnésia retrógrada ≥30 min', c: 1 }, { q: 'Mecanismo perigoso (atropelamento, ejeção, queda >1 m ou 5 degraus)', c: 1 }],
    interp: [R(0, 0, 'ok', 'Nenhum critério: TC de crânio não necessária'), R(1, 9, 'bad', 'TC de crânio sem contraste indicada')], nota: 'Aplica-se a TCE leve (Glasgow 13–15 com perda de consciência, amnésia ou desorientação). Não se aplica: <16 anos, anticoagulado, convulsão pós-trauma, déficit focal — nesses, TC.', fonte: 'Stiell 2001' },
  { id: 'nexus', nome: 'NEXUS (coluna cervical)', grupo: 'Imagem (quando fazer TC)', itens: [
    { q: 'Dor à palpação na linha média posterior', c: 1 }, { q: 'Déficit neurológico focal', c: 1 }, { q: 'Alteração do nível de consciência', c: 1 }, { q: 'Intoxicação', c: 1 }, { q: 'Lesão dolorosa que distrai', c: 1 }],
    interp: [R(0, 0, 'ok', 'Nenhum critério: dispensa imagem da coluna cervical'), R(1, 5, 'bad', 'Imagem indicada (TC de coluna cervical no adulto)')], fonte: 'Hoffman 2000' },
  { id: 'ccspine', nome: 'Canadian C-Spine Rule', grupo: 'Imagem (quando fazer TC)', custom: 'ccs', itens: [
    { q: 'ALTO RISCO: idade ≥65, mecanismo perigoso ou parestesias nas extremidades', c: 100 },
    { q: 'BAIXO RISCO presente (colisão traseira simples, sentado no PS, deambulou, dor cervical de início tardio ou sem dor na linha média)', c: 10 },
    { q: 'Consegue rodar o pescoço 45° para ambos os lados', c: 1 }],
    nota: 'Paciente alerta (Glasgow 15) e estável com trauma cervical.', fonte: 'Stiell 2001' },
  { id: 'ottawahsa', nome: 'Ottawa SAH Rule', grupo: 'Imagem (quando fazer TC)', itens: [
    { q: 'Idade ≥40 anos', c: 1 }, { q: 'Dor ou rigidez cervical', c: 1 }, { q: 'Perda de consciência testemunhada', c: 1 }, { q: 'Início durante esforço', c: 1 }, { q: 'Cefaleia em trovoada (pico instantâneo)', c: 1 }, { q: 'Limitação da flexão cervical ao exame', c: 1 }],
    interp: [R(0, 0, 'ok', 'Nenhum critério: HSA excluída com alta sensibilidade'), R(1, 6, 'bad', 'Investigar HSA: TC de crânio (≤6 h); após 6 h, TC ± punção lombar/angio-TC')], nota: 'Cefaleia não traumática com pico em ≤1 h, alerta, ≥15 anos; não se aplica a déficit focal, aneurisma/HSA prévios, tumor, ou cefaleias recorrentes semelhantes.', fonte: 'Perry 2013' },
  { id: 'abcd2', nome: 'ABCD² (AIT)', grupo: 'Neuro', itens: [
    { q: 'Idade ≥60 anos', c: 1 }, { q: 'PA ≥140/90 na avaliação', c: 1 },
    { q: 'Clínica', o: [['Outros sintomas', 0], ['Distúrbio de fala sem fraqueza', 1], ['Fraqueza unilateral', 2]] },
    { q: 'Duração', o: [['<10 min', 0], ['10–59 min', 1], ['≥60 min', 2]] }, { q: 'Diabetes', c: 1 }],
    interp: [R(0, 3, 'ok', '0–3: baixo risco'), R(4, 5, 'warnb', '4–5: moderado — dupla antiagregação se sem indicação de anticoagulação'), R(6, 7, 'bad', '6–7: alto risco')], nota: 'Investigar todos os AIT em até 24 h (imagem vascular, ECG/Holter) independentemente do escore.', fonte: 'Johnston 2007' },
  { id: 'ichscore', nome: 'ICH score (AVCh)', grupo: 'Neuro', itens: [
    { q: 'Glasgow', o: [['13–15', 0], ['5–12', 1], ['3–4', 2]] }, { q: 'Volume do hematoma ≥30 mL (A×B×C/2)', c: 1 }, { q: 'Hemorragia intraventricular', c: 1 }, { q: 'Origem infratentorial', c: 1 }, { q: 'Idade ≥80 anos', c: 1 }],
    interp: [R(0, 0, 'ok', 'Mortalidade 30 d ~0%'), R(1, 1, 'ok', '~13%'), R(2, 2, 'warnb', '~26%'), R(3, 3, 'bad', '~72%'), R(4, 4, 'bad', '~97%'), R(5, 6, 'bad', '~100%')], nota: 'Não usar isoladamente para limitar suporte nas primeiras 24 h.', fonte: 'Hemphill 2001' },
  { id: 'centor', nome: 'Centor / McIsaac', grupo: 'Infecção', itens: [
    { q: 'Febre >38 °C', c: 1 }, { q: 'Ausência de tosse', c: 1 }, { q: 'Adenopatia cervical anterior dolorosa', c: 1 }, { q: 'Exsudato ou edema amigdaliano', c: 1 },
    { q: 'Idade', o: [['15–44 anos', 0], ['3–14 anos', 1], ['≥45 anos', -1]] }],
    interp: [R(-1, 1, 'ok', '≤1: não testar nem tratar com antibiótico'), R(2, 3, 'warnb', '2–3: teste rápido/cultura; tratar se positivo'), R(4, 5, 'bad', '≥4: teste rápido ou tratamento empírico')], fonte: 'McIsaac 1998' },
  { id: 'padua', nome: 'Padua (profilaxia de TEV)', grupo: 'Internação', itens: [
    { q: 'Câncer ativo', c: 3 }, { q: 'TEV prévio', c: 3 }, { q: 'Mobilidade reduzida (≥3 dias)', c: 3 }, { q: 'Trombofilia conhecida', c: 3 }, { q: 'Trauma ou cirurgia no último mês', c: 2 }, { q: 'Idade ≥70 anos', c: 1 }, { q: 'Insuficiência cardíaca ou respiratória', c: 1 }, { q: 'IAM ou AVC isquêmico agudo', c: 1 }, { q: 'Infecção aguda e/ou doença reumatológica', c: 1 }, { q: 'Obesidade (IMC ≥30)', c: 1 }, { q: 'Terapia hormonal', c: 1 }],
    interp: [R(0, 3, 'ok', '<4: baixo risco — profilaxia farmacológica não indicada'), R(4, 99, 'bad', '≥4: alto risco — enoxaparina 40 mg SC 1x/dia (ClCr <30: 20 mg) ou HNF 5.000 UI SC 8/8–12/12h, se sem contraindicação')], fonte: 'Barbar 2010' },
  { id: 'ciwa', nome: 'CIWA-Ar (abstinência alcoólica)', grupo: 'Toxicologia', itens: [
    ...['Náuseas e vômitos', 'Tremor', 'Sudorese paroxística', 'Ansiedade', 'Agitação', 'Distúrbios táteis', 'Distúrbios auditivos', 'Distúrbios visuais', 'Cefaleia / cabeça pesada'].map((q) => ({ q: q + ' (0–7)', o: [0, 1, 2, 3, 4, 5, 6, 7].map((n) => [String(n), n]) })),
    { q: 'Orientação (0–4)', o: [0, 1, 2, 3, 4].map((n) => [String(n), n]) }],
    interp: [R(0, 7, 'ok', '<8: abstinência leve — suporte, sem BZD obrigatório'), R(8, 14, 'warnb', '8–14: moderada — diazepam 10–20 mg e reavaliar em 1 h'), R(15, 67, 'bad', '≥15: grave — BZD em doses repetidas, considerar UTI se ≥20')], fonte: 'Sullivan 1989' },
  { id: 'rass', nome: 'RASS (sedação)', grupo: 'Internação', itens: [
    { q: 'Nível', o: [['+4 combativo', 4], ['+3 muito agitado', 3], ['+2 agitado', 2], ['+1 inquieto', 1], ['0 alerta e calmo', 0], ['−1 sonolento (>10 s à voz)', -1], ['−2 sedação leve (<10 s)', -2], ['−3 moderada (movimento à voz, sem contato visual)', -3], ['−4 profunda (só ao estímulo físico)', -4], ['−5 não desperta', -5]] }],
    interp: [R(1, 4, 'warnb', 'Agitação — buscar causa (dor, delirium, hipóxia) antes de sedar'), R(-2, 0, 'ok', 'Alvo usual na VM: RASS −2 a 0'), R(-5, -3, 'warnb', 'Sedação profunda — justificar (SDRA grave, HIC, BNM) ou reduzir')], fonte: 'Sessler 2002' },
];

const SC_ST = { id: 'glasgow', v: {} };
function scoreTotal(s) { const vals = SC_ST.v[s.id] || {}; let t = 0, n = 0; s.itens.forEach((it, i) => { const v = vals[i]; if (v !== undefined && v !== null && v !== false) { t += +v; n++; } }); return { t, n }; }
function scoreHTML() {
  const s = SCORES.find((x) => x.id === SC_ST.id) || SCORES[0];
  const vals = SC_ST.v[s.id] || {};
  const grupos = [...new Set(SCORES.map((x) => x.grupo))];
  let h = `<div class="acc-filter" style="margin-bottom:10px"><label for="scSel" style="margin:0">Escore:</label><select id="scSel" style="max-width:320px">${grupos.map((g) => `<optgroup label="${esc(g)}">${SCORES.filter((x) => x.grupo === g).map((x) => `<option value="${x.id}" ${x.id === s.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</optgroup>`).join('')}</select><button class="btn btn-line btn-sm" type="button" id="scReset">Limpar</button></div>`;
  h += `<div class="dx-title" style="font-size:1rem">${esc(s.nome)}</div>`;
  h += s.itens.map((it, i) => {
    if (it.o) return `<div class="sc-item"><div class="q">${esc(it.q)}</div><div class="sc-opts">${it.o.map(([l, pts]) => `<button type="button" class="fbtn" data-sc="${i}" data-pts="${pts}" aria-pressed="${vals[i] !== undefined && +vals[i] === pts}">${esc(l)} <span class="src">(${pts > 0 ? '+' : ''}${pts})</span></button>`).join('')}</div></div>`;
    return `<div class="sc-item chk-list"><label><input type="checkbox" data-scc="${i}" ${vals[i] ? 'checked' : ''}> ${esc(it.q)} ${s.custom ? '' : `<span class="src">(${it.c > 0 ? '+' : ''}${nf(it.c, 1)})</span>`}</label></div>`;
  }).join('');
  const { t, n } = scoreTotal(s);
  let res = '';
  if (s.custom === 'ccs') {
    const hi = vals[0], lo = vals[1], rot = vals[2];
    res = hi ? box('bad', '<b>Alto risco → imagem (TC de coluna cervical)</b>') : !lo ? box('bad', '<b>Sem fator de baixo risco que permita testar a mobilidade → imagem</b>') : rot ? box('ok', '<b>Roda 45° para ambos os lados → sem imagem</b>') : box('bad', '<b>Não roda 45° → imagem</b>');
  } else {
    const all = s.itens.every((it, i) => !it.o || it.opt || vals[i] !== undefined);
    const r = s.interp.find((x) => t >= x.lo && t <= x.hi);
    res = `<div class="sc-total"><div class="big-out" style="color:var(--fg)">Total: ${nf(t, 1)}</div>${!all ? '<div class="src">Responda todos os itens de múltipla escolha.</div>' : ''}${r ? box(r.cls, r.txt) : ''}</div>`;
  }
  h += res;
  if (s.nota) h += `<p class="src" style="margin-top:6px">${esc(s.nota)}</p>`;
  h += `<p class="src">Fonte: ${esc(s.fonte)}</p>`;
  return h;
}
