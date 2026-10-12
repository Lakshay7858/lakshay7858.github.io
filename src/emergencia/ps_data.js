// Prescrições do PS por diagnóstico — adulto. Itens: [texto ou função(p), acesso].
// acesso: SUS (RENAME/UBS), HOSP (uso hospitalar/UPA no SUS), MISTO (parte do SUS / componente especializado / varia por município), PART (particular).
const kgDose = (p, mgkg, max, u = 'mg') => p.w ? `${nf(Math.min(mgkg * p.w, max || 1e9), 0)} ${u}` : `${mgkg} ${u}/kg`;
const renal = (p, lim, txt) => (p.clcr && p.clcr < lim ? ` ⚠ ClCr ${nf(p.clcr, 0)}: ${txt}` : '');
const PSX = [];
const PS = (o) => PSX.push(o);

/* ---------- DOR, CEFALEIA, NEURO ---------- */
PS({ id: 'enxaqueca', grupo: 'Dor e neurologia', nome: 'Enxaqueca / cefaleia primária',
  quando: 'Cefaleia com padrão conhecido, sem sinais de alarme (SNOOP: sistêmicos, neurológicos, início súbito >50 a, mudança de padrão, posicional, gestação, imunossupressão).',
  exames: 'Sem exames se típica. Sinais de alarme → TC de crânio (Ottawa SAH na aba Calculadoras).',
  ideal: { nota: 'Combinação antidopaminérgico + AINE/dipirona; dexametasona reduz recorrência em 72 h.', ps: [
    ['Dipirona 1 g IV diluída em 10 mL de SF (ou paracetamol 1 g VO)', 'SUS'],
    ['Metoclopramida 10 mg IV lento em 100 mL de SF em 15 min (reduz acatisia)', 'SUS'],
    ['Cetoprofeno 100 mg IV em 100 mL de SF (ou ibuprofeno 600 mg VO)', 'HOSP'],
    ['Dexametasona 10 mg IV (prevenção de recorrência)', 'SUS'],
    ['Sumatriptano 6 mg SC (se sem resposta e sem contraindicação cardiovascular)', 'PART'],
    ['Acatisia pela metoclopramida: difenidramina 25–50 mg IV ou biperideno 2–5 mg IM', 'HOSP']],
    alta: [
    ['Dipirona 1 g VO 6/6h se dor (ou paracetamol 750 mg–1 g 6/6h)', 'SUS'],
    ['Ibuprofeno 600 mg VO 8/8h por até 3 dias, após refeições', 'SUS'],
    ['Naratriptano 2,5 mg ou sumatriptano 50–100 mg VO no início da crise (máx. 2×/dia)', 'PART'],
    ['Metoclopramida 10 mg VO até 8/8h se náuseas', 'SUS']] },
  sus: { nota: 'Mesma conduta, sem triptano (não está na RENAME); dipirona + metoclopramida + AINE disponível.', ps: [
    ['Dipirona 1 g IV', 'SUS'], ['Metoclopramida 10 mg IV lento', 'SUS'], ['Dexametasona 10 mg IV', 'SUS'], ['Clorpromazina 0,1 mg/kg IV (máx. 25 mg) em 250 mL SF se refratária (hipotensão)', 'HOSP']],
    alta: [['Dipirona 500 mg 2 cp VO 6/6h se dor', 'SUS'], ['Ibuprofeno 600 mg VO 8/8h por até 3 dias', 'SUS'], ['Metoclopramida 10 mg VO até 8/8h se náuseas', 'SUS']] },
  orient: 'Diário da cefaleia; evitar analgésico >10 dias/mês (cefaleia por abuso). Retornar se pior cefaleia da vida, febre com rigidez de nuca, déficit neurológico, confusão, convulsão. Encaminhar à UBS/neurologia para profilaxia se ≥4 crises/mês.',
  fonte: 'SBCe 2022; AHS 2021' });

PS({ id: 'colicarenal', grupo: 'Dor e neurologia', nome: 'Cólica renal (litíase ureteral)',
  quando: 'Dor lombar em cólica irradiada para flanco/genitais, hematúria. Excluir: febre/ITU obstrutiva (urgência urológica), rim único, IRA, aneurisma de aorta (>60 a).',
  exames: 'EAS, creatinina, hemograma; β-hCG em mulheres. Imagem: USG (gestante/jovem) ou **TC sem contraste** (padrão-ouro) se dúvida, febre, 1º episódio >50 a, dor refratária.',
  ideal: { nota: 'AINE é a 1ª linha (superior a opioide); tansulosina facilita a expulsão de cálculos distais de 5–10 mm.', ps: [
    ['Cetoprofeno 100 mg IV em 100 mL SF (ou diclofenaco 75 mg IM)', 'HOSP'],
    ['Dipirona 1 g IV', 'SUS'],
    ['Escopolamina (butilbrometo) 20 mg IV se componente espástico (benefício limitado)', 'HOSP'],
    [(p) => `Morfina 0,05–0,1 mg/kg IV = ${p.w ? nf(0.05 * p.w, 0) + '–' + nf(Math.min(0.1 * p.w, 10), 0) + ' mg' : '2–6 mg'} se dor refratária`, 'SUS'],
    ['Ondansetrona 4–8 mg IV se vômitos (ou metoclopramida 10 mg)', 'HOSP']],
    alta: [
    ['Ibuprofeno 600 mg VO 8/8h (ou naproxeno 500 mg 12/12h) por 5–7 dias, se função renal normal', 'SUS'],
    ['Dipirona 1 g VO 6/6h se dor', 'SUS'],
    ['Tansulosina 0,4 mg VO 1x/dia por até 4 semanas (cálculo distal 5–10 mm)', 'PART'],
    ['Peneirar a urina; hidratação 2–3 L/dia', 'SUS']] },
  sus: { nota: 'Igual, sem tansulosina (fora da RENAME).', ps: [['Dipirona 1 g IV', 'SUS'], ['AINE IV/IM disponível na unidade (cetoprofeno/diclofenaco)', 'HOSP'], ['Morfina 2–4 mg IV se refratária', 'SUS']],
    alta: [['Ibuprofeno 600 mg VO 8/8h por 5 dias', 'SUS'], ['Dipirona 500 mg 2 cp 6/6h se dor', 'SUS']] },
  orient: 'Retornar se febre, calafrios, vômitos que impedem medicação, dor incontrolável, redução da urina. Encaminhar à urologia se cálculo >10 mm, não eliminação em 4–6 semanas, ou recorrência.',
  fonte: 'EAU 2025; SBU' });

PS({ id: 'lombalgia', grupo: 'Dor e neurologia', nome: 'Lombalgia aguda inespecífica',
  quando: 'Sem bandeiras vermelhas: déficit neurológico progressivo, síndrome da cauda equina (retenção urinária, anestesia em sela), febre, câncer, trauma importante, perda de peso, imunossupressão, uso de drogas IV, >50 a com 1º episódio.',
  exames: 'Sem imagem nas primeiras 6 semanas se sem bandeiras vermelhas. Cauda equina → RM urgente.',
  ideal: { nota: 'AINE + calor local + manter-se ativo. Opioide só curto prazo e em dor intensa.', ps: [
    ['Cetoprofeno 100 mg IV ou diclofenaco 75 mg IM', 'HOSP'], ['Dipirona 1 g IV', 'SUS'], ['Tramadol 50 mg IV lento se dor intensa', 'HOSP']],
    alta: [
    ['Ibuprofeno 600 mg VO 8/8h (ou naproxeno 500 mg 12/12h) por 5–7 dias', 'SUS'],
    ['Ciclobenzaprina 5–10 mg VO à noite por até 7 dias (sonolência)', 'PART'],
    ['Dipirona 1 g VO 6/6h se dor', 'SUS'], ['Compressa morna 20 min 3×/dia', 'SUS']] },
  sus: { nota: 'Sem relaxante muscular na RENAME; AINE + dipirona.', ps: [['Dipirona 1 g IV', 'SUS'], ['AINE disponível (IM/IV)', 'HOSP']], alta: [['Ibuprofeno 600 mg VO 8/8h por 5 dias', 'SUS'], ['Dipirona 500 mg 2 cp 6/6h se dor', 'SUS']] },
  orient: 'Manter atividades leves; evitar repouso no leito. Retornar se fraqueza nas pernas, perda de controle urinário/fecal, dormência na região genital, febre.',
  fonte: 'ACP 2017; NICE NG59' });

PS({ id: 'vertigem', grupo: 'Dor e neurologia', nome: 'Vertigem periférica (VPPB / neurite vestibular)',
  quando: 'VPPB: episódios <1 min ao mudar a posição da cabeça, Dix-Hallpike positivo. Neurite: vertigem contínua por dias, nistagmo horizontal unidirecional, **HINTS periférico**. Central se: HINTS central, déficit focal, ataxia de marcha importante, cefaleia occipital, fatores de risco vascular → TC/RM e neurologia.',
  exames: 'Glicemia, ECG. Suspeita central: RM com difusão (TC tem baixa sensibilidade na fossa posterior).',
  ideal: { nota: 'VPPB: manobra de reposicionamento (Epley) é o tratamento; supressor vestibular só por 1–3 dias.', ps: [
    ['Manobra de Epley (canal posterior) — repetir se necessário', 'SUS'],
    ['Dimenidrinato 50 mg IV em 100 mL SF (ou 30 mg + piridoxina)', 'HOSP'],
    ['Metoclopramida 10 mg IV se náuseas intensas', 'SUS']],
    alta: [
    ['Dimenidrinato 50 mg VO 8/8h se crise, por até 3 dias', 'PART'],
    ['Meclizina 25 mg VO 8/8–12/12h por até 3 dias', 'PART'],
    ['Neurite vestibular (até 72 h): prednisona 60 mg/dia por 5 dias e reduzir em 5 dias', 'SUS']] },
  sus: { nota: 'Supressor vestibular disponível na RENAME: prometazina.', ps: [['Manobra de Epley', 'SUS'], ['Prometazina 25 mg IM ou dimenidrinato IV (disponibilidade local)', 'SUS']], alta: [['Prometazina 25 mg VO até 12/12h por até 3 dias (sonolência)', 'SUS'], ['Neurite: prednisona 20 mg 3 cp/dia por 5 dias', 'SUS']] },
  orient: 'Levantar devagar; evitar dirigir em crise. Reabilitação vestibular se persistente. Retornar se fala enrolada, fraqueza, visão dupla, dificuldade para andar, cefaleia intensa.',
  fonte: 'AAO-HNS 2017; HINTS (Kattah 2009)' });

PS({ id: 'convulsao1', grupo: 'Dor e neurologia', nome: 'Crise convulsiva única resolvida',
  quando: 'Paciente de volta ao basal. Se crise ≥5 min ou não recupera entre crises → protocolo Estado de mal (Sala Vermelha).',
  exames: 'Glicemia, Na, Ca, Mg, função renal/hepática, hemograma, β-hCG, toxicológico/etanol, ECG (QT, Brugada), TC de crânio (1ª crise). Nível sérico se epiléptico em tratamento. EEG e RM ambulatoriais.',
  ideal: { nota: '1ª crise não provocada: em geral não iniciar anticonvulsivante no PS (decisão com neurologia). Epiléptico conhecido: rever adesão/doses.', ps: [
    ['Monitorização e observação por 4–6 h; corrigir causas metabólicas', 'SUS'], ['Se nova crise >5 min: diazepam 10 mg IV (ver Estado de mal)', 'SUS']],
    alta: [['Levetiracetam 500 mg VO 12/12h (se indicado pelo neurologista)', 'PART'], ['Encaminhamento à neurologia com EEG e RM', 'SUS']] },
  sus: 'igual',
  orient: '**Não dirigir** até liberação médica (Resolução CONTRAN: em geral 1 ano sem crises para quem tem epilepsia). Evitar nadar sozinho, altura, privação de sono, álcool. Retornar se nova crise.',
  fonte: 'ILAE 2015; AAN/AES 2015' });

/* ---------- CARDIOVASCULAR ---------- */
PS({ id: 'pasem', grupo: 'Cardiovascular', nome: 'PA elevada sem lesão de órgão-alvo',
  quando: 'PA muito elevada (geralmente ≥180/110) sem lesão aguda de órgão-alvo (antiga "urgência hipertensiva"). Com lesão → Emergência hipertensiva (Sala Vermelha).',
  exames: 'ECG, creatinina, EAS (proteinúria/hematúria), fundo de olho se disponível; troponina só se dor torácica.',
  ideal: { nota: 'Repouso 30 min e tratar dor/ansiedade; muitos normalizam sem medicação. Meta PAS <160 e PAD <100; ajuste ambulatorial em 1–7 dias.', ps: [
    ['Repouso em ambiente calmo por 30 min e remedir', 'SUS'],
    ['Captopril 25 mg VO (repetir em 1 h se necessário)', 'SUS'],
    ['OU clonidina 0,1–0,2 mg VO (evitar se bradicardia)', 'SUS'],
    ['NÃO usar nifedipino de liberação rápida sublingual', 'SUS']],
    alta: [
    ['Retomar/ajustar anti-hipertensivo: losartana 50 mg 12/12h ou 100 mg/dia', 'SUS'],
    ['Anlodipino 5–10 mg VO 1x/dia', 'SUS'], ['Hidroclorotiazida 25 mg ou clortalidona 12,5–25 mg 1x/dia', 'SUS'],
    ['Combinação em comprimido único (ex.: olmesartana + anlodipino)', 'PART']] },
  sus: 'igual',
  orient: 'Medir PA na UBS em até 7 dias. Reduzir sal (<5 g/dia), atividade física, adesão. Retornar se dor no peito, falta de ar, fraqueza/fala alterada, confusão, visão turva.',
  fonte: 'Diretriz Brasileira de Hipertensão 2025' });

PS({ id: 'tvp', grupo: 'Cardiovascular', nome: 'TVP proximal (tratamento ambulatorial)',
  quando: 'TVP confirmada por Doppler, estável, sem TEP de risco intermediário/alto, sem sangramento ativo, com adesão e suporte. Calcule Wells na aba Calculadoras.',
  exames: 'Doppler venoso, hemograma, plaquetas, creatinina (ClCr), TGO/TGP, TP/TTPa. Considerar rastreio de câncer dirigido se não provocada.',
  ideal: { nota: 'DOAC é a 1ª escolha (sem ponte com heparina para rivaroxabana/apixabana). Mínimo 3 meses.', ps: [
    ['Rivaroxabana 15 mg VO no PS', 'PART']],
    alta: [
    [(p) => `Rivaroxabana 15 mg VO 12/12h por 21 dias, depois 20 mg 1x/dia com refeição${renal(p, 15, 'contraindicada <15')}`, 'PART'],
    ['OU apixabana 10 mg VO 12/12h por 7 dias, depois 5 mg 12/12h', 'PART']] },
  sus: { nota: 'Enoxaparina + varfarina (INR 2–3); suspender enoxaparina após ≥5 dias e INR ≥2 por 24 h.', ps: [
    [(p) => `Enoxaparina ${p.w ? nf(Math.min(p.w, 180), 0) + ' mg' : '1 mg/kg'} SC 12/12h${p.clcr && p.clcr < 30 ? ' — ClCr <30: 1 mg/kg 1x/dia' : ''}`, 'MISTO']],
    alta: [[(p) => `Enoxaparina ${p.w ? nf(Math.min(p.w, 180), 0) + ' mg' : '1 mg/kg'} SC 12/12h até INR ≥2 (mín. 5 dias)`, 'MISTO'], ['Varfarina 5 mg VO 1x/dia (idoso/hepatopata: 2,5 mg) — INR em 3–5 dias', 'SUS']] },
  orient: 'Deambular conforme tolerância; meia de compressão para sintomas. Retornar se falta de ar, dor no peito, sangramento, fezes escuras. Evitar AINE.',
  fonte: 'CHEST 2021; ESC 2019; ASH 2020' });

PS({ id: 'faestavel', grupo: 'Cardiovascular', nome: 'FA estável — controle de frequência e alta',
  quando: 'FA sem instabilidade, FC controlável. Instável → Sala Vermelha (Taquicardias).',
  exames: 'ECG, eletrólitos (K, Mg), TSH, creatinina, hemograma, troponina se dor; ecocardiograma ambulatorial.',
  ideal: { nota: 'Alvo FC <110 em repouso. Anticoagular por CHA₂DS₂-VA (aba Calculadoras) — DOAC preferido.', ps: [
    ['Metoprolol 5 mg IV a cada 5 min (máx. 15 mg) ou metoprolol 50 mg VO', 'HOSP'],
    ['IC com FE reduzida: amiodarona 150 mg IV em 10 min ou digoxina 0,25 mg IV', 'HOSP']],
    alta: [
    ['Succinato de metoprolol 50–100 mg VO 1x/dia (ou bisoprolol 2,5–5 mg)', 'PART'],
    ['Apixabana 5 mg VO 12/12h (2,5 mg se ≥2: idade ≥80, peso ≤60 kg, Cr ≥1,5) se CHA₂DS₂-VA ≥2', 'PART'],
    ['OU rivaroxabana 20 mg 1x/dia (15 mg se ClCr 15–49)', 'PART']] },
  sus: { nota: 'Betabloqueador da RENAME + varfarina (INR 2–3).', ps: [['Metoprolol (tartarato) 25–50 mg VO', 'SUS']],
    alta: [['Metoprolol (tartarato) 25–50 mg VO 12/12h ou atenolol 25–50 mg 1x/dia', 'SUS'], ['Varfarina 5 mg/dia com controle de INR (alvo 2–3) se CHA₂DS₂-VA ≥2', 'SUS']] },
  orient: 'Retornar se palpitação persistente, falta de ar, dor no peito, desmaio, fraqueza/fala alterada, sangramento. Encaminhar à cardiologia.',
  fonte: 'ESC 2024 FA; SBC 2016/atualização' });

PS({ id: 'icleve', grupo: 'Cardiovascular', nome: 'IC descompensada leve (congestão sem hipoperfusão)',
  quando: 'Perfil quente e úmido, SpO₂ ≥90%, sem EAP, sem SCA. EAP/choque → Sala Vermelha.',
  exames: 'ECG, RX tórax, BNP/NT-proBNP, troponina, eletrólitos, creatinina, hemograma, TSH; POCUS (linhas B, VCI).',
  ideal: { nota: 'Furosemida IV 1–2,5× a dose oral diária; identificar o gatilho (adesão, sal, isquemia, FA, infecção, AINE).', ps: [
    ['Furosemida 40 mg IV (usuário crônico: 1–2,5× a dose VO diária em bolus)', 'SUS'],
    ['Cabeceira elevada, O₂ se SpO₂ <90%, restrição hídrica/sódica', 'SUS'],
    ['Balanço hídrico, peso diário, K/Mg/creatinina', 'SUS']],
    alta: [
    ['Furosemida 40 mg VO (ajustar à congestão)', 'SUS'],
    ['Otimizar "4 pilares" (FEVE reduzida): sacubitril-valsartana (PART) ou enalapril/losartana (SUS); betabloqueador (carvedilol SUS); espironolactona 25 mg (SUS); dapagliflozina 10 mg (MISTO)', 'MISTO']] },
  sus: 'igual',
  orient: 'Pesar-se diariamente (aumento >2 kg em 3 dias = procurar UBS), restringir sal, adesão. Retornar se falta de ar em repouso ou ao deitar, inchaço progressivo.',
  fonte: 'ESC 2021/2023 IC; SBC IC 2021' });

/* ---------- RESPIRATÓRIO ---------- */
PS({ id: 'asmaps', grupo: 'Respiratório', nome: 'Exacerbação de asma (leve a moderada)',
  quando: 'Fala frases, SpO₂ ≥92%, FC <120, PFE >50%. Grave/risco de vida → Sala Vermelha.',
  exames: 'Em geral nenhum. RX se suspeita de pneumonia/pneumotórax; gasometria se SpO₂ <92%.',
  ideal: { nota: 'SABA repetido + corticoide sistêmico; na alta, ICS-formoterol (manutenção e resgate) — SABA isolado não é recomendado.', ps: [
    ['Salbutamol spray 100 mcg: 4–10 jatos com espaçador a cada 20 min na 1ª hora', 'SUS'],
    ['Ipratrópio 500 mcg (40 gotas) junto com salbutamol se moderada (até 3 doses)', 'SUS'],
    ['Prednisona 40–50 mg VO (dose no PS)', 'SUS'], ['O₂ para SpO₂ 93–95%', 'SUS']],
    alta: [
    ['Budesonida-formoterol 160/4,5 mcg: 1 inalação 12/12h + 1 inalação se sintomas (máx. 12/dia)', 'MISTO'],
    ['Prednisona 40 mg VO 1x/dia por 5 dias', 'SUS'], ['Técnica inalatória revisada; plano de ação escrito', 'SUS']] },
  sus: { nota: 'Alternativa da RENAME: beclometasona + salbutamol (budesonida-formoterol via Componente Especializado/PCDT asma).', ps: [['Salbutamol spray 4–10 jatos 20/20 min', 'SUS'], ['Ipratrópio 40 gotas por nebulização', 'SUS'], ['Prednisona 40 mg VO', 'SUS']],
    alta: [['Beclometasona 250 mcg 1–2 jatos 12/12h (uso regular)', 'SUS'], ['Salbutamol 100 mcg 2–4 jatos se falta de ar (espaçador)', 'SUS'], ['Prednisona 20 mg 2 cp/dia por 5 dias', 'SUS']] },
  orient: 'Retorno na UBS em 2–7 dias. Retornar se não conseguir falar frases, lábios roxos, alívio <3–4 h com o resgate, sonolência.',
  fonte: 'GINA 2025; PCDT Asma 2026' });

PS({ id: 'dpocps', grupo: 'Respiratório', nome: 'Exacerbação de DPOC (ambulatorial)',
  quando: 'Sem acidose respiratória, SpO₂ adequada com O₂ baixo fluxo, sem confusão. Grave → Sala Vermelha (DPOC).',
  exames: 'RX tórax, gasometria se SpO₂ <88%, ECG, hemograma; BNP/D-dímero se dúvida (IC/TEP).',
  ideal: { nota: 'Broncodilatador + prednisona 5 dias + antibiótico se escarro purulento.', ps: [
    ['Salbutamol 4–8 jatos + ipratrópio 4–8 jatos (ou nebulização) a cada 20–60 min', 'SUS'], ['Prednisona 40 mg VO', 'SUS'], ['O₂ para SpO₂ 88–92%', 'SUS']],
    alta: [
    ['Prednisona 40 mg VO 1x/dia por 5 dias', 'SUS'],
    ['Amoxicilina-clavulanato 875/125 mg VO 12/12h por 5 dias (se escarro purulento)', 'SUS'],
    ['OU azitromicina 500 mg VO 1x/dia por 3 dias / doxiciclina 100 mg 12/12h por 5 dias', 'SUS'],
    ['Manutenção: LAMA/LABA (ex.: tiotrópio/olodaterol) ± ICS se eosinófilos ≥300', 'MISTO']] },
  sus: 'igual',
  orient: 'Cessar tabagismo; vacinas (influenza, pneumocócica, VSR ≥60 a, COVID). Reabilitação pulmonar. Retornar se piora da falta de ar, sonolência, confusão.',
  fonte: 'GOLD 2026; SBPT' });

PS({ id: 'pac', grupo: 'Respiratório', nome: 'Pneumonia adquirida na comunidade',
  quando: 'Calcule CURB-65 (aba Calculadoras): 0–1 ambulatorial; 2 internação; ≥3 grave.',
  exames: 'RX de tórax (ou USG/TC); hemograma, ureia, creatinina, eletrólitos, PCR; gasometria e lactato se grave; hemoculturas e escarro se internado; teste de influenza/COVID na sazonalidade.',
  ideal: { nota: 'Ambulatorial: 5 dias na maioria. Internada: betalactâmico + macrolídeo. Sem cobertura anaeróbia de rotina (SSC 2026).', ps: [
    ['Internação não grave: ceftriaxona 1 g IV 24/24h (2 g se grave) + azitromicina 500 mg IV/VO 1x/dia', 'HOSP'],
    ['PAC grave em UTI: + hidrocortisona 200 mg/dia em infusão por 4–7 dias (CAPE-COD; excluir influenza/choque séptico com corticoide já em uso)', 'HOSP'],
    ['Risco de Pseudomonas/MRSA (hospitalização/ATB IV recente, colonização): pipe-tazo 4,5 g 6/6h ± vancomicina', 'HOSP']],
    alta: [
    ['Hígido: amoxicilina 1 g VO 8/8h por 5 dias', 'SUS'],
    ['Comorbidades (DPOC, IC, DM, IRC, etilismo, neoplasia): amoxicilina-clavulanato 875/125 mg VO 12/12h + azitromicina 500 mg/dia (3 dias) — ou levofloxacino 750 mg 1x/dia por 5 dias', 'MISTO'],
    ['Alergia a penicilina: azitromicina 500 mg 1x/dia por 3 dias ou doxiciclina 100 mg 12/12h por 5 dias', 'SUS']] },
  sus: { nota: 'Opções da RENAME: amoxicilina, amoxicilina-clavulanato, azitromicina, doxiciclina, ceftriaxona.', ps: [['Ceftriaxona 1 g IV/dia + azitromicina 500 mg/dia', 'HOSP']], alta: [['Amoxicilina 500 mg 2 cáps VO 8/8h por 5 dias', 'SUS'], ['Comorbidade: amoxicilina-clavulanato 500/125 mg 8/8h + azitromicina 500 mg/dia por 3 dias', 'SUS']] },
  orient: 'Reavaliar em 48–72 h. Retornar se falta de ar, confusão, febre persistente >72 h, lábios roxos.',
  fonte: 'ATS/IDSA 2019; SBPT 2018; SSC 2026' });

PS({ id: 'faringite', grupo: 'Respiratório', nome: 'Faringoamigdalite bacteriana',
  quando: 'Centor/McIsaac ≥4 ou teste rápido positivo (aba Calculadoras). Viral (tosse, coriza, conjuntivite, rouquidão) → só sintomáticos.',
  exames: 'Teste rápido para estreptococo se disponível. Abscesso periamigdaliano (trismo, voz abafada, desvio de úvula) → USG/TC e otorrino.',
  ideal: { nota: 'Objetivo: prevenir febre reumática — 10 dias de amoxicilina ou penicilina benzatina dose única.', ps: [['Dipirona 1 g IV/VO ou ibuprofeno 600 mg VO', 'SUS'], ['Dexametasona 10 mg IM/VO dose única (dor intensa)', 'SUS']],
    alta: [
    ['Amoxicilina 500 mg VO 8/8h (ou 875 mg 12/12h) por 10 dias', 'SUS'],
    ['OU penicilina G benzatina 1.200.000 UI IM dose única', 'SUS'],
    ['Alergia (não anafilática): cefalexina 500 mg VO 12/12h por 10 dias; anafilática: azitromicina 500 mg/dia por 5 dias', 'SUS'],
    ['Ibuprofeno 600 mg 8/8h por 3 dias se dor', 'SUS']] },
  sus: 'igual',
  orient: 'Contágio cessa 24 h após início do ATB. Retornar se dificuldade de abrir a boca, voz abafada, salivação, falta de ar.',
  fonte: 'IDSA 2012; SBORL' });

PS({ id: 'sinusite', grupo: 'Respiratório', nome: 'Rinossinusite bacteriana aguda',
  quando: 'Sintomas >10 dias sem melhora, piora após melhora inicial ("dupla piora") ou febre ≥39 + secreção purulenta por 3–4 dias. Viral (<10 dias) → lavagem e sintomáticos.',
  exames: 'Clínico. TC se complicação (edema periorbitário, alteração visual, cefaleia intensa, sinais meníngeos) → urgência.',
  ideal: { nota: 'Amoxicilina 5–7 dias; amoxicilina-clavulanato se risco (ATB recente, >65 a, imunossuprimido, grave).', ps: [],
    alta: [
    ['Amoxicilina 500 mg VO 8/8h (ou 875 mg 12/12h) por 5–7 dias', 'SUS'],
    ['OU amoxicilina-clavulanato 875/125 mg 12/12h por 5–7 dias', 'SUS'],
    ['Alergia: doxiciclina 100 mg 12/12h por 5–7 dias', 'SUS'],
    ['Lavagem nasal com SF 0,9% em alto volume 3–4×/dia', 'SUS'],
    ['Budesonida nasal 32–64 mcg: 2 jatos em cada narina 1–2×/dia', 'SUS']] },
  sus: 'igual',
  orient: 'Retornar se inchaço/vermelhidão ao redor dos olhos, visão dupla, rigidez de nuca, confusão.',
  fonte: 'EPOS 2020; IDSA 2012' });

PS({ id: 'influenza', grupo: 'Respiratório', nome: 'Síndrome gripal / influenza',
  quando: 'Febre + tosse ou dor de garganta + cefaleia/mialgia. SRAG (dispneia, SpO₂ <95%, desconforto) → internar, notificar.',
  exames: 'Teste para influenza/COVID se disponível (não atrasar o oseltamivir no grupo de risco). SRAG: RX, gasometria, hemograma.',
  ideal: { nota: 'Oseltamivir em até 48 h (ou a qualquer tempo se grave/grupo de risco): ≥60 a, gestante/puérpera, imunossuprimido, comorbidade crônica, obeso IMC ≥40, indígena, SRAG.', ps: [['Dipirona 1 g ou paracetamol 750 mg VO', 'SUS']],
    alta: [
    [(p) => `Oseltamivir 75 mg VO 12/12h por 5 dias (grupo de risco/SRAG)${p.clcr && p.clcr < 60 ? ` ⚠ ClCr ${nf(p.clcr, 0)}: ${p.clcr < 30 ? '30 mg 1x/dia' : '30 mg 12/12h'}` : ''}`, 'SUS'],
    ['Paracetamol 750 mg VO 6/6h ou dipirona 1 g 6/6h se febre/dor', 'SUS'], ['Hidratação e repouso', 'SUS']] },
  sus: 'igual',
  orient: 'Isolamento domiciliar até 24 h sem febre; etiqueta respiratória. Retornar se falta de ar, dor no peito, lábios roxos, confusão, piora após melhora. Vacinação anual.',
  fonte: 'MS — Guia de manejo da influenza 2023/2024' });

/* ---------- INFECÇÃO ---------- */
PS({ id: 'cistite', grupo: 'Infecções', nome: 'Cistite não complicada (mulher)',
  quando: 'Disúria, polaciúria, urgência, sem febre/dor lombar, não gestante. Homem, gestante, cateter, alteração anatômica = ITU complicada.',
  exames: 'Diagnóstico clínico; EAS/urocultura se recorrente, falha, gestante, homem, atípica.',
  ideal: { nota: '1ª linha: nitrofurantoína 5 dias ou fosfomicina dose única.', ps: [],
    alta: [
    [(p) => `Nitrofurantoína 100 mg VO 6/6h por 5 dias${renal(p, 30, 'evitar (ineficaz/tóxica) — usar fosfomicina ou cefalexina')}`, 'SUS'],
    ['OU fosfomicina trometamol 3 g VO dose única (dissolver em água, à noite após urinar)', 'PART'],
    ['Alternativas: cefalexina 500 mg 6/6h por 5–7 dias; SMX-TMP 800/160 mg 12/12h por 3 dias (se resistência local <20%)', 'SUS'],
    ['Fenazopiridina 200 mg VO 8/8h por até 2 dias (alivia a disúria; urina alaranjada)', 'PART']] },
  sus: { nota: 'RENAME: nitrofurantoína, cefalexina, SMX-TMP.', ps: [], alta: [[(p) => `Nitrofurantoína 100 mg VO 6/6h por 5 dias${renal(p, 30, 'evitar — cefalexina')}`, 'SUS'], ['OU cefalexina 500 mg 6/6h por 7 dias', 'SUS']] },
  orient: 'Hidratação; retornar se febre, dor nas costas, vômitos, ou sem melhora em 48–72 h.',
  fonte: 'IDSA/ESCMID 2011; EAU 2025; SBU' });

PS({ id: 'pielo', grupo: 'Infecções', nome: 'Pielonefrite aguda',
  quando: 'Febre, dor lombar, Giordano +, ± sintomas urinários. Internar se sepse, vômitos, gestante, obstrução, imunossupressão, falha ambulatorial.',
  exames: 'EAS + **urocultura** (antes do ATB), hemograma, creatinina, PCR; hemoculturas se internado; USG ou TC se sem melhora em 48–72 h, obstrução suspeita, cálculo, sepse.',
  ideal: { nota: 'Dose IV inicial de ceftriaxona + quinolona VO (se resistência local <10%); ajustar pela urocultura.', ps: [['Ceftriaxona 1 g IV (dose única no PS ou 1x/dia se internado)', 'HOSP'], ['Dipirona 1 g IV; ondansetrona 4 mg se vômitos', 'SUS']],
    alta: [
    [(p) => `Ciprofloxacino 500 mg VO 12/12h por 7 dias${renal(p, 30, '250–500 mg 1x/dia')}`, 'SUS'],
    ['OU levofloxacino 750 mg VO 1x/dia por 5 dias', 'MISTO'],
    ['OU cefuroxima 500 mg 12/12h / amoxicilina-clavulanato por 10–14 dias (se sensível)', 'MISTO']] },
  sus: { nota: 'Ceftriaxona + ciprofloxacino (RENAME).', ps: [['Ceftriaxona 1 g IV/IM', 'HOSP']], alta: [['Ciprofloxacino 500 mg VO 12/12h por 7 dias', 'SUS']] },
  orient: 'Retorno com urocultura em 48–72 h. Retornar se vômitos, febre persistente >72 h, tontura, piora da dor.',
  fonte: 'IDSA 2011/2025; EAU 2025' });

PS({ id: 'celulite', grupo: 'Infecções', nome: 'Celulite / erisipela',
  quando: 'Eritema, calor, edema, dor. Internar se sinais sistêmicos (SIRS), progressão rápida, imunossupressão, face/periorbitária, falha VO. Dor desproporcional, bolhas hemorrágicas, crepitação → **fasceíte necrosante** (cirurgia urgente).',
  exames: 'Clínico. Hemograma, PCR, creatinina, CK se grave; USG se suspeita de abscesso.',
  ideal: { nota: 'Celulite não purulenta: cobrir estreptococo (± MSSA). Purulenta/abscesso: drenar ± cobrir MRSA.', ps: [['Internação: cefazolina 2 g IV 8/8h (ou oxacilina 2 g 4/4h)', 'HOSP'], ['MRSA/grave: + vancomicina 15–20 mg/kg 8–12/12h', 'HOSP']],
    alta: [
    ['Cefalexina 500 mg VO 6/6h por 5–7 dias (prolongar se não melhorar)', 'SUS'],
    ['Erisipela típica: amoxicilina 500 mg VO 8/8h ou penicilina', 'SUS'],
    ['Alergia/MRSA: clindamicina 300–450 mg VO 6/6h ou SMX-TMP 800/160 mg 2 cp 12/12h (+ cefalexina para estreptococo)', 'SUS'],
    ['Elevar o membro; tratar intertrigo/tinha interdigital (porta de entrada)', 'SUS']] },
  sus: 'igual',
  orient: 'Demarcar a borda com caneta. Retornar se a vermelhidão passar a marca, febre, bolhas, dor intensa desproporcional.',
  fonte: 'IDSA 2014; SBD' });

PS({ id: 'mordedura', grupo: 'Infecções', nome: 'Mordedura animal, raiva e tétano',
  quando: 'Toda mordedura: lavagem abundante com água e sabão, avaliar profilaxia da raiva (MS) e do tétano.',
  exames: 'RX se suspeita de fratura/corpo estranho (dente).',
  ideal: { nota: 'Profilaxia com amoxicilina-clavulanato por 3–5 dias se alto risco: gato, mãos/face/genitais/articulação, ferida profunda/puntiforme, edema, imunossupressão, esplenectomia.', ps: [
    ['Lavar com água e sabão por 15 min; não suturar mordedura de mão (exceto face — avaliar)', 'SUS'],
    ['Raiva (MS): cão/gato observável 10 dias → observar; acidente grave/animal suspeito/silvestre/morcego → vacina D0, D3, D7, D14 IM ± soro/imunoglobulina antirrábica no D0 (infiltrar na ferida)', 'SUS'],
    ['Tétano: <3 doses ou desconhecido → vacina dT + imunoglobulina humana antitetânica 250 UI IM (ou SAT 5.000 UI); ≥3 doses e última >5 anos (ferida suja) → reforço dT', 'SUS']],
    alta: [['Amoxicilina-clavulanato 875/125 mg VO 12/12h por 3–5 dias (profilaxia) ou 7–10 dias (infectada)', 'SUS'], ['Alergia: doxiciclina 100 mg 12/12h + metronidazol 500 mg 8/8h', 'SUS'], ['Dipirona 1 g 6/6h se dor', 'SUS']] },
  sus: 'igual',
  orient: 'Completar o esquema antirrábico na data marcada. Observar o animal por 10 dias e informar se adoecer/sumir/morrer. Retornar se vermelhidão, pus, febre.',
  fonte: 'MS — Protocolo de profilaxia da raiva humana (NT 8/2022); PNI' });

PS({ id: 'ferimento', grupo: 'Infecções', nome: 'Ferimento corto-contuso e sutura',
  quando: 'Avaliar tendão, nervo, vaso, corpo estranho, contaminação. Sutura até ~12–24 h (face até 24 h).',
  exames: 'RX se corpo estranho radiopaco/fratura.',
  ideal: { nota: 'Anestesia local respeitando dose máxima por peso; profilaxia antitetânica conforme histórico.', ps: [
    [(p) => `Lidocaína 2% sem vasoconstritor: máx. 4,5 mg/kg = ${p.w ? nf(Math.min(4.5 * p.w, 300), 0) + ' mg = ' + nf(Math.min(4.5 * p.w, 300) / 20, 1) + ' mL' : '—'} (1%: ${p.w ? nf(Math.min(4.5 * p.w, 300) / 10, 1) + ' mL' : '—'})`, 'SUS'],
    [(p) => `Lidocaína com vasoconstritor: máx. 7 mg/kg = ${p.w ? nf(Math.min(7 * p.w, 500), 0) + ' mg = ' + nf(Math.min(7 * p.w, 500) / 20, 1) + ' mL a 2%' : '—'} (evitar em extremidades finais apenas se doença vascular)`, 'HOSP'],
    ['Irrigação abundante com SF; desbridamento; sutura (pontos: face 5 dias, couro cabeludo/tronco 7–10, membros 10–14, articulações 14)', 'SUS'],
    ['Tétano: ver tabela em Mordedura (vacina dT ± imunoglobulina)', 'SUS']],
    alta: [['Paracetamol 750 mg ou dipirona 1 g VO 6/6h se dor', 'SUS'], ['Curativo com SF, manter seco 24–48 h', 'SUS'], ['ATB só se contaminação grosseira/mordedura/fratura exposta', 'SUS']] },
  sus: 'igual',
  orient: 'Retirar pontos na UBS na data indicada. Retornar se vermelhidão, pus, febre, dormência, perda de movimento.',
  fonte: 'ATLS; MS — Tétano' });

PS({ id: 'zoster', grupo: 'Infecções', nome: 'Herpes zóster',
  quando: 'Vesículas em dermátomo com dor. Oftálmico (ponta do nariz — Hutchinson) → oftalmologia urgente. Disseminado/imunossuprimido → aciclovir IV.',
  exames: 'Clínico.',
  ideal: { nota: 'Antiviral em até 72 h do início das lesões (ou após, se novas lesões, >50 a, imunossuprimido, oftálmico).', ps: [],
    alta: [['Valaciclovir 1 g VO 8/8h por 7 dias', 'PART'], [(p) => `OU aciclovir 800 mg VO 5×/dia por 7 dias${renal(p, 25, 'ajustar intervalo')}`, 'SUS'], ['Dipirona/paracetamol; dor intensa: gabapentina 300 mg à noite, titular', 'MISTO'], ['Compressas frias; manter lesões cobertas', 'SUS']] },
  sus: { nota: 'Aciclovir oral (RENAME).', ps: [], alta: [['Aciclovir 200 mg 4 cp VO 5×/dia por 7 dias', 'SUS'], ['Dipirona 500 mg 2 cp 6/6h se dor', 'SUS']] },
  orient: 'Contagioso para quem não teve varicela (gestantes, imunossuprimidos) até as crostas. Vacina recombinante (≥50 a) após a fase aguda.',
  fonte: 'IDSA; SBD' });

PS({ id: 'dengue', grupo: 'Infecções', nome: 'Dengue (classificação A–D)',
  quando: 'Febre 2–7 dias + 2 de: náusea/vômito, exantema, mialgia/artralgia, cefaleia/dor retro-orbital, petéquias/prova do laço +, leucopenia. **Notificar.**',
  exames: 'A: sem exames obrigatórios. B: hemograma (Ht, plaquetas). C/D: hemograma, albumina, TGO/TGP, função renal, eletrólitos, gasometria; RX/USG (derrames).',
  ideal: { nota: 'A: sem alarme, sem comorbidade. B: sem alarme com comorbidade/risco (gestante, >65 a, risco social) ou sangramento espontâneo/prova do laço +. C: sinais de alarme. D: choque/sangramento grave/disfunção.', ps: [
    [(p) => `Grupo C — expansão: SF 0,9% ou RL ${p.w ? nf(10 * p.w, 0) + ' mL' : '10 mL/kg'} na 1ª hora; reavaliar (clínica + Ht em 2 h) e repetir até 3×. Melhora → ${p.w ? nf(25 * p.w, 0) + ' mL' : '25 mL/kg'} em 6 h, depois ${p.w ? nf(25 * p.w, 0) + ' mL' : '25 mL/kg'} em 8 h`, 'SUS'],
    [(p) => `Grupo D — choque: SF 0,9% ${p.w ? nf(20 * p.w, 0) + ' mL' : '20 mL/kg'} em 20 min, até 3×; sem resposta e Ht alto → albumina 0,5–1 g/kg; Ht em queda → hemácias; vasopressor`, 'HOSP'],
    ['Dipirona 1 g IV ou paracetamol; antiemético se vômitos', 'SUS']],
    alta: [
    [(p) => `Hidratação oral: ${p.w ? nf(60 * p.w, 0) + ' mL/dia' : '60 mL/kg/dia'} — 1/3 com SRO e 2/3 com água, sucos, chás (adulto)`, 'SUS'],
    ['Dipirona 1 g VO 6/6h ou paracetamol 750 mg 6/6h (máx. 3 g/dia) se febre/dor', 'SUS'],
    ['NÃO usar AAS, AINE (ibuprofeno, diclofenaco, nimesulida) nem corticoide', 'SUS']] },
  sus: 'igual',
  orient: 'Reavaliação no 1º dia sem febre (fase crítica) — grupo B: diária. Retornar já se dor abdominal intensa, vômitos persistentes, sangramento, tontura ao levantar, sonolência/irritabilidade, diminuição da urina, falta de ar.',
  fonte: 'MS — Dengue: diagnóstico e manejo clínico 6ª ed. (2024)' });

PS({ id: 'chik', grupo: 'Infecções', nome: 'Chikungunya',
  quando: 'Febre alta + poliartralgia intensa simétrica (mãos, pés). Excluir dengue (manejo de dengue até descartar). Notificar.',
  exames: 'Hemograma; PCR (até 5º dia) ou sorologia IgM (após 5º dia).',
  ideal: { nota: 'Fase aguda (até 14 dias): analgésicos simples ± opioide; sem AINE/corticoide enquanto dengue não descartada.', ps: [['Dipirona 1 g IV', 'SUS']],
    alta: [['Dipirona 1 g VO 6/6h + paracetamol 750 mg 6/6h (alternados) se dor', 'SUS'], ['Dor intensa: codeína 30 mg + paracetamol 6/6h ou tramadol 50 mg 6/6h', 'MISTO'], ['Subaguda (>14 dias–3 meses): prednisona 0,5 mg/kg/dia (máx. 40 mg) por 5 dias e reduzir; AINE se dengue excluída', 'SUS'], ['Compressas frias nas articulações', 'SUS']] },
  sus: 'igual',
  orient: 'Hidratação; repouso articular relativo. Retornar se sinais de alarme de dengue, confusão, fraqueza nas pernas.',
  fonte: 'MS — Chikungunya: manejo clínico (2017/2024)' });

PS({ id: 'ist', grupo: 'Infecções', nome: 'Corrimento uretral / vaginal (IST)',
  quando: 'Abordagem sindrômica (MS). Oferecer testagem HIV, sífilis, hepatites B/C; tratar parcerias.',
  exames: 'Testes rápidos HIV/sífilis/HBV/HCV; β-hCG; NAAT/cultura se disponível.',
  ideal: { nota: 'PCDT IST (MS).', ps: [['Uretrite: ceftriaxona 500 mg IM dose única + azitromicina 1 g VO dose única', 'SUS']],
    alta: [
    ['Alternativa para clamídia: doxiciclina 100 mg VO 12/12h por 7 dias (não gestante)', 'SUS'],
    ['Vaginose bacteriana/tricomoníase: metronidazol 500 mg VO 12/12h por 7 dias (sem álcool)', 'SUS'],
    ['Candidíase: fluconazol 150 mg VO dose única (ou miconazol creme vaginal 7 noites)', 'SUS'],
    ['Sífilis recente: penicilina G benzatina 2,4 milhões UI IM (1,2 em cada glúteo) dose única', 'SUS']] },
  sus: 'igual',
  orient: 'Abstinência sexual por 7 dias após tratamento (dele e da parceria); preservativo; PEP/PrEP conforme exposição; notificar.',
  fonte: 'MS — PCDT IST 2022' });

PS({ id: 'escabiose', grupo: 'Infecções', nome: 'Escabiose',
  quando: 'Prurido noturno, lesões em interdígitos, punhos, axilas, genitais; contactantes com prurido.',
  exames: 'Clínico.',
  ideal: { nota: 'Tratar todos os contactantes ao mesmo tempo.', ps: [],
    alta: [[(p) => { const b = [[24, 0.5], [35, 1], [50, 1.5], [65, 2], [79, 2.5], [1e9, 3]]; const c = p.w ? b.find((x) => p.w <= x[0])[1] : null; return `Ivermectina 6 mg (200 mcg/kg) VO dose única${c ? ` = **${nf(c, 1)} comprimido(s)**` : ' (15–24 kg ½ cp; 25–35 kg 1; 36–50 kg 1½; 51–65 kg 2; 66–79 kg 2½; ≥80 kg 3)'}; repetir em 7–14 dias`; }, 'SUS'],
      ['OU permetrina 5% loção: do pescoço aos pés à noite, enxaguar em 8–14 h; repetir em 7 dias', 'SUS'],
      ['Loratadina 10 mg 1x/dia se prurido', 'SUS']] },
  sus: 'igual',
  orient: 'Lavar roupas de cama e uso pessoal em água quente (ou guardar em saco fechado por 3 dias). Prurido pode durar 2–4 semanas após o tratamento.',
  fonte: 'MS; SBD' });

/* ---------- GASTRO ---------- */
PS({ id: 'gastroenterite', grupo: 'Gastrointestinal', nome: 'Diarreia aguda / gastroenterite',
  quando: 'Avaliar desidratação. Antibiótico só se disenteria (sangue) com febre/toxemia, cólera, imunossuprimido, viajante grave.',
  exames: 'Geralmente nenhum. Desidratação grave/idoso: eletrólitos, creatinina. Disenteria/surto: coprocultura; uso recente de ATB: toxina C. difficile.',
  ideal: { nota: 'Reidratação oral é o principal tratamento; antiemético facilita a hidratação.', ps: [
    ['Desidratação grave: SF 0,9% ou RL 20–30 mL/kg IV em 30–60 min, reavaliar', 'SUS'],
    ['Ondansetrona 4–8 mg IV/VO se vômitos', 'HOSP'], ['Escopolamina 20 mg IV se cólica', 'HOSP']],
    alta: [
    ['Sais de reidratação oral: 200–400 mL após cada evacuação líquida + líquidos à vontade', 'SUS'],
    ['Ondansetrona 4–8 mg VO/sublingual 8/8h se vômitos (até 3 dias)', 'MISTO'],
    ['Racecadotrila 100 mg VO 8/8h (diarreia aquosa, sem sangue)', 'PART'],
    ['Disenteria febril: azitromicina 500 mg VO 1x/dia por 3 dias (ou ciprofloxacino 500 mg 12/12h por 3 dias)', 'SUS']] },
  sus: { nota: 'SRO + antiemético da RENAME.', ps: [['Hidratação IV se necessário', 'SUS'], ['Metoclopramida 10 mg IV ou dimenidrinato', 'SUS']], alta: [['SRO após cada evacuação', 'SUS'], ['Metoclopramida 10 mg VO 8/8h se vômitos', 'SUS'], ['Disenteria febril: azitromicina 500 mg/dia por 3 dias', 'SUS']] },
  orient: 'Manter alimentação leve; lavar as mãos. Retornar se sangue nas fezes, febre alta, vômitos que impedem beber, sede intensa, pouca urina, tontura.',
  fonte: 'MS 2023; IDSA 2017' });

PS({ id: 'dispepsia', grupo: 'Gastrointestinal', nome: 'Dispepsia / DRGE / gastrite',
  quando: 'Excluir: SCA (ECG/troponina se fatores de risco), pancreatite, cólica biliar; sinais de alarme (perda de peso, disfagia, anemia, sangramento, >60 a com sintoma novo) → EDA.',
  exames: 'ECG se dor epigástrica com fatores de risco; lipase, TGO/TGP se dúvida.',
  ideal: { nota: 'IBP 4–8 semanas; pesquisar H. pylori ambulatorialmente.', ps: [['Omeprazol 40 mg IV (ou pantoprazol 40 mg)', 'SUS'], ['Hidróxido de alumínio/magnésio 10–20 mL VO', 'SUS'], ['Escopolamina 20 mg IV se cólica', 'HOSP']],
    alta: [['Omeprazol 20–40 mg VO em jejum 1x/dia por 4–8 semanas (ou pantoprazol 40 mg)', 'SUS'], ['Antiácido 10 mL VO após refeições e ao deitar se sintomas', 'SUS'], ['Domperidona 10 mg antes das refeições se plenitude (por pouco tempo)', 'PART']] },
  sus: 'igual',
  orient: 'Evitar AINE, álcool, tabaco, refeições volumosas à noite; elevar a cabeceira. Retornar se vômito com sangue, fezes pretas, dor intensa, perda de peso.',
  fonte: 'ACG 2022; FBG' });

PS({ id: 'nauseas', grupo: 'Gastrointestinal', nome: 'Náuseas e vômitos',
  quando: 'Investigar causa: gestação, abdome agudo, CAD, HIC, intoxicação, IAM inferior, gastroenterite.',
  exames: 'Conforme causa: β-hCG, glicemia, eletrólitos, função renal, lipase, ECG.',
  ideal: { nota: 'Ondansetrona prolonga QT (cuidado com outras drogas). Metoclopramida: acatisia/distonia.', ps: [['Ondansetrona 4–8 mg IV', 'HOSP'], ['OU metoclopramida 10 mg IV lento', 'SUS'], ['OU bromoprida 10 mg IV', 'HOSP'], ['Hidratação IV se desidratado', 'SUS']],
    alta: [['Ondansetrona 4–8 mg VO 8/8h se náuseas', 'MISTO'], ['OU metoclopramida 10 mg VO 8/8h (máx. 5 dias)', 'SUS']] },
  sus: { nota: 'Metoclopramida/dimenidrinato/prometazina.', ps: [['Metoclopramida 10 mg IV lento', 'SUS']], alta: [['Metoclopramida 10 mg VO 8/8h por até 5 dias', 'SUS']] },
  orient: 'Pequenos volumes de líquidos frequentes. Retornar se não conseguir beber, vômitos com sangue, dor abdominal intensa.',
  fonte: 'Consenso de antieméticos; bula' });

PS({ id: 'colicabiliar', grupo: 'Gastrointestinal', nome: 'Cólica biliar / colecistite',
  quando: 'Dor em HCD/epigástrio após refeição gordurosa. Colecistite: dor >6 h, febre, Murphy +, leucocitose. Colangite: febre + icterícia + dor (Charcot) → ATB + CPRE urgente.',
  exames: 'Hemograma, PCR, TGO/TGP, FA, GGT, bilirrubinas, lipase; **USG de abdome**.',
  ideal: { nota: 'Cólica biliar: analgesia e colecistectomia eletiva. Colecistite: ATB + colecistectomia precoce (≤72 h).', ps: [
    ['Dipirona 1 g IV + escopolamina 20 mg IV', 'SUS'], ['Cetoprofeno 100 mg IV (AINE reduz progressão para colecistite)', 'HOSP'],
    ['Colecistite: jejum, hidratação, ceftriaxona 2 g IV 1x/dia + metronidazol 500 mg IV 8/8h (grave/colangite: pipe-tazo 4,5 g 6/6h)', 'HOSP'], ['Avaliação da cirurgia', 'SUS']],
    alta: [['Cólica biliar: dipirona 1 g 6/6h + escopolamina 10 mg 8/8h se dor', 'SUS'], ['Dieta pobre em gordura; encaminhar à cirurgia geral', 'SUS']] },
  sus: 'igual',
  orient: 'Retornar se dor >6 h, febre, pele/olhos amarelos, urina escura.',
  fonte: 'Tokyo Guidelines 2018' });

PS({ id: 'pancreatite', grupo: 'Gastrointestinal', nome: 'Pancreatite aguda',
  quando: '2 de 3: dor típica, lipase/amilase ≥3× LSN, imagem compatível. Avaliar gravidade (BISAP, SIRS persistente).',
  exames: 'Lipase, hemograma, PCR, ureia/creatinina, eletrólitos, Ca, triglicerídeos, TGO/TGP/bilirrubinas, gasometria/lactato; **USG** (etiologia biliar). TC com contraste só se dúvida diagnóstica ou após 72–96 h se piora.',
  ideal: { nota: 'Hidratação moderada (WATERFALL), analgesia adequada (opioide permitido), dieta oral precoce assim que tolerar. Sem ATB profilático.', ps: [
    [(p) => `Ringer lactato: bolus ${p.w ? nf(10 * p.w, 0) + ' mL' : '10 mL/kg'} se hipovolêmico, depois ${p.w ? nf(1.5 * p.w, 0) + ' mL/h' : '1,5 mL/kg/h'}; reavaliar em 12 h (evitar hiper-hidratação)`, 'SUS'],
    ['Dipirona 1 g IV 6/6h + morfina 2–4 mg IV até 4/4h se dor', 'SUS'], ['Ondansetrona 4–8 mg IV se vômitos', 'HOSP'],
    ['Dieta oral leve assim que tolerar (24–48 h)', 'SUS'], ['Biliar com colangite: CPRE urgente; colecistectomia na mesma internação (leve)', 'SUS']],
    alta: [] },
  sus: 'igual',
  orient: 'Suspender álcool; colecistectomia programada se biliar.',
  fonte: 'ACG 2024; AGA; WATERFALL (NEJM 2022)' });

PS({ id: 'diverticulite', grupo: 'Gastrointestinal', nome: 'Diverticulite aguda não complicada',
  quando: 'Dor em FIE, febre, leucocitose; TC confirma e exclui complicação (abscesso, perfuração, obstrução).',
  exames: 'Hemograma, PCR, função renal, EAS, β-hCG; **TC de abdome com contraste**.',
  ideal: { nota: 'Não complicada em imunocompetente sem sinais sistêmicos: antibiótico pode ser omitido (AGA 2021) — usar se febre, comorbidade, imunossupressão, PCR alta.', ps: [['Dipirona 1 g IV; escopolamina 20 mg IV', 'SUS']],
    alta: [['Amoxicilina-clavulanato 875/125 mg VO 12/12h por 7 dias (se indicado)', 'SUS'], ['OU ciprofloxacino 500 mg 12/12h + metronidazol 500 mg 8/8h por 7 dias', 'SUS'], ['Dieta líquida/leve por 2–3 dias, depois rica em fibras', 'SUS']] },
  sus: 'igual',
  orient: 'Retornar se febre persistente, piora da dor, vômitos. Colonoscopia após 6–8 semanas (1º episódio, se não feita recentemente).',
  fonte: 'AGA 2021; ASCRS 2020' });

PS({ id: 'constipacao', grupo: 'Gastrointestinal', nome: 'Constipação / fecaloma',
  quando: 'Excluir obstrução intestinal (distensão, vômitos, parada de gases) e sinais de alarme (sangue, perda de peso, >50 a com mudança de hábito).',
  exames: 'RX de abdome se suspeita de obstrução/fecaloma.',
  ideal: { nota: 'Fecaloma: desimpactação + enema; depois laxativo osmótico.', ps: [['Enema de fosfato de sódio 1 frasco via retal (evitar em IRC) ou enema glicerinado', 'SUS'], ['Desimpactação manual se fecaloma baixo', 'SUS']],
    alta: [['Macrogol (PEG 3350) 17 g diluído em água 1–2×/dia', 'PART'], ['OU lactulose 15–30 mL VO 1–2×/dia', 'SUS'], ['Fibras, água 2 L/dia, atividade física', 'SUS']] },
  sus: { nota: 'Lactulose/óleo mineral da RENAME.', ps: [['Enema disponível na unidade', 'SUS']], alta: [['Lactulose 15–30 mL VO 1–2×/dia', 'SUS']] },
  orient: 'Retornar se dor abdominal intensa, barriga distendida, vômitos, não eliminar gases.',
  fonte: 'AGA 2023' });

/* ---------- OUTROS ---------- */
PS({ id: 'urticaria', grupo: 'Alergia e pele', nome: 'Urticária / reação alérgica (sem anafilaxia)',
  quando: 'Pápulas pruriginosas migratórias ± angioedema, sem acometimento respiratório/circulatório. Anafilaxia → Sala Vermelha. Angioedema sem urticária (IECA, hereditário) → bradicinina: não responde a anti-H1/corticoide.',
  exames: 'Em geral nenhum.',
  ideal: { nota: 'Anti-H1 de 2ª geração; pode quadruplicar a dose. Corticoide só em casos intensos e por curto prazo.', ps: [['Difenidramina 50 mg IV ou prometazina 25–50 mg IM (sedativos)', 'HOSP'], ['Hidrocortisona 200 mg IV ou prednisona 40 mg VO se intensa', 'SUS']],
    alta: [['Fexofenadina 180 mg VO 1x/dia (até 2×/dia) por 7–14 dias', 'PART'], ['OU loratadina 10 mg (até 4×/dia se refratária)', 'SUS'], ['Prednisona 40 mg VO 1x/dia por 3–5 dias se intensa', 'SUS']] },
  sus: { nota: 'Loratadina e prednisona da RENAME.', ps: [['Prometazina 50 mg IM', 'SUS'], ['Hidrocortisona 200 mg IV se intensa', 'SUS']], alta: [['Loratadina 10 mg VO 1x/dia (até 2–4×/dia)', 'SUS'], ['Prednisona 20 mg 2 cp/dia por 3–5 dias se intensa', 'SUS']] },
  orient: 'Evitar o gatilho suspeito (medicamento/alimento). Retornar já se falta de ar, inchaço na língua/garganta, rouquidão, tontura.',
  fonte: 'EAACI/GA²LEN 2021; ASBAI' });

PS({ id: 'gota', grupo: 'Alergia e pele', nome: 'Crise de gota',
  quando: 'Monoartrite aguda (hálux, tornozelo, joelho) com rubor intenso. Febre/prótese/imunossupressão → artrite séptica até prova em contrário (artrocentese).',
  exames: 'Ácido úrico (pode estar normal na crise), creatinina, hemograma, PCR; artrocentese se dúvida.',
  ideal: { nota: 'Tratar nas primeiras 24 h. Não iniciar nem suspender alopurinol durante a crise.', ps: [['Prednisona 30–40 mg VO (ou triancinolona intra-articular)', 'SUS'], ['Cetoprofeno 100 mg IV ou naproxeno 500 mg VO', 'HOSP']],
    alta: [['Colchicina 1 mg VO agora + 0,5 mg em 1 h, depois 0,5 mg 12/12h até resolver (ajustar na IRC; interações com claritromicina/azóis)', 'SUS'], ['OU prednisona 30–35 mg VO 1x/dia por 5 dias', 'SUS'], ['OU naproxeno 500 mg 12/12h por 5–7 dias (se função renal normal)', 'PART'], ['Gelo local 20 min 3–4×/dia; repouso articular', 'SUS']] },
  sus: { nota: 'Colchicina, prednisona e ibuprofeno na RENAME.', ps: [['Prednisona 40 mg VO', 'SUS']], alta: [['Colchicina 0,5 mg: 2 cp agora + 1 cp em 1 h, depois 1 cp 12/12h', 'SUS'], ['OU ibuprofeno 600 mg 8/8h por 5 dias', 'SUS']] },
  orient: 'Hidratação, reduzir álcool (cerveja), carnes vermelhas e frutos do mar. Retornar se febre ou piora.',
  fonte: 'ACR 2020; SBR' });

PS({ id: 'ansiedade', grupo: 'Psiquiatria', nome: 'Crise de ansiedade / ataque de pânico',
  quando: 'Diagnóstico de exclusão: ECG, glicemia, SpO₂; considerar SCA, TEP, arritmia, hipertireoidismo, intoxicação, abstinência.',
  exames: 'ECG, glicemia capilar; demais conforme suspeita.',
  ideal: { nota: 'Acolhimento, respiração diafragmática; benzodiazepínico só se intenso, dose única.', ps: [['Respiração lenta (4 s inspira / 6 s expira) por 5 min', 'SUS'], ['Clonazepam 0,5 mg VO/SL ou diazepam 5–10 mg VO, dose única se crise intensa', 'SUS']],
    alta: [['Encaminhar à UBS/CAPS/psiquiatria e psicoterapia (TCC)', 'SUS'], ['Tratamento de manutenção (no seguimento): sertralina 25–50 mg/dia (SUS: fluoxetina 20 mg)', 'MISTO'], ['Evitar prescrever benzodiazepínico de uso contínuo pelo PS', 'SUS']] },
  sus: 'igual',
  orient: 'Explicar a natureza benigna dos sintomas físicos. Evitar cafeína, álcool. Retornar se dor no peito diferente, desmaio, ideação suicida (CVV 188).',
  fonte: 'NICE CG113; ABP' });

PS({ id: 'epistaxe', grupo: 'Otorrino e olhos', nome: 'Epistaxe anterior',
  quando: 'Avaliar sinais vitais, uso de anticoagulante, PA. Posterior (sangramento pela orofaringe, bilateral, refratária) → tamponamento posterior/otorrino.',
  exames: 'Hemograma e coagulograma se volumosa/recorrente/anticoagulado.',
  ideal: { nota: 'Compressão bidigital contínua 10–15 min com cabeça inclinada para frente.', ps: [
    ['Compressão da asa nasal por 10–15 min (sem soltar)', 'SUS'], ['Algodão embebido em oximetazolina 0,05% (ou lidocaína com vasoconstritor) por 10 min', 'PART'],
    ['Ácido tranexâmico tópico: 500 mg (5 mL da ampola) em gaze/algodão na fossa nasal', 'HOSP'], ['Cauterização química (nitrato de prata) do ponto visível ou tamponamento anterior (gaze com vaselina/esponja)', 'SUS'], ['Controlar PA se muito elevada (tratar dor/ansiedade)', 'SUS']],
    alta: [['Pomada de vaselina ou neomicina na narina 2×/dia por 7 dias', 'SUS'], ['Umidificação; não assoar/manipular por 1 semana', 'SUS'], ['Tampão anterior: retirar em 48–72 h (considerar cefalexina se >48 h)', 'SUS']] },
  sus: 'igual',
  orient: 'Se sangrar: sentar, inclinar para frente e apertar o nariz por 15 min. Retornar se não parar após 20 min ou sangramento pela boca.',
  fonte: 'AAO-HNS 2020' });

PS({ id: 'conjuntivite', grupo: 'Otorrino e olhos', nome: 'Conjuntivite',
  quando: 'Olho vermelho sem dor intensa, sem baixa visual, pupila normal. Dor, fotofobia, baixa visual, lente de contato, trauma → oftalmologia (ceratite, uveíte, glaucoma agudo).',
  exames: 'Clínico.',
  ideal: { nota: 'Viral: autolimitada (7–14 dias). Bacteriana: secreção purulenta — colírio ATB. Alérgica: prurido — anti-histamínico tópico.', ps: [],
    alta: [['Viral: compressas frias, lágrima artificial 4–6×/dia, higiene das mãos', 'SUS'], ['Bacteriana: moxifloxacino colírio 1 gota 8/8h por 7 dias (usuário de lente de contato: obrigatório quinolona)', 'PART'], ['OU tobramicina colírio 1 gota 4/4–6/6h por 7 dias', 'MISTO'], ['Alérgica: cetotifeno/olopatadina colírio 12/12h', 'PART']] },
  sus: { nota: 'Disponibilidade de colírios varia por município.', ps: [], alta: [['Compressas, lágrima artificial; colírio antibiótico disponível na rede se bacteriana', 'MISTO']] },
  orient: 'Não usar colírio com corticoide sem avaliação oftalmológica. Afastamento de 3–7 dias (viral). Retornar se dor, baixa visual, sensibilidade à luz.',
  fonte: 'AAO PPP 2023' });

PS({ id: 'alcoolps', grupo: 'Psiquiatria', nome: 'Intoxicação alcoólica aguda',
  quando: 'Sempre investigar TCE, hipoglicemia, outras intoxicações, abstinência de outras drogas. Rebaixamento com via aérea em risco → Sala Vermelha.',
  exames: 'Glicemia capilar; eletrólitos se vômitos; TC de crânio se trauma, sinais focais ou não melhora em 4–6 h.',
  ideal: { nota: 'Suporte e observação até sobriedade clínica; tiamina antes de glicose.', ps: [['Tiamina 100–300 mg IV/IM', 'SUS'], ['SF 0,9% 1 L IV se desidratado; depois SG 5% (após tiamina) se hipoglicemia', 'SUS'], ['Ondansetrona 4 mg IV se vômitos; decúbito lateral', 'HOSP'], ['Agitação: haloperidol 5 mg IM (evitar BZD na intoxicação aguda)', 'SUS']],
    alta: [['Tiamina 300 mg VO 1x/dia por 30 dias', 'SUS'], ['Encaminhar ao CAPS AD', 'SUS']] },
  sus: 'igual',
  orient: 'Alta com acompanhante, sóbrio, deambulando. Não dirigir. Oferecer ajuda para o uso de álcool.',
  fonte: 'ASAM 2020' });

PS({ id: 'hiperglicemia', grupo: 'Metabólico', nome: 'Hiperglicemia sem cetoacidose',
  quando: 'Glicemia >250 sem acidose/cetose significativa e sem hiperosmolaridade. Com cetose/acidose → CAD (Sala Vermelha).',
  exames: 'Glicemia, cetonemia/cetonúria, gasometria venosa, eletrólitos, creatinina, EAS; procurar gatilho (infecção, má adesão, IAM).',
  ideal: { nota: 'Hidratar, insulina regular de correção, ajustar tratamento.', ps: [['SF 0,9% 1 L IV se desidratado', 'SUS'], ['Insulina regular SC conforme glicemia: 250–300 → 4 UI; 301–350 → 6 UI; >350 → 8 UI (ajustar à sensibilidade); reavaliar em 2 h', 'SUS']],
    alta: [['DM2: retomar/ajustar metformina 500–1.000 mg 12/12h; iniciar/ajustar insulina NPH 0,1–0,2 UI/kg à noite se muito descompensado', 'SUS'], ['iSGLT2 (dapagliflozina 10 mg) se DCV/IC/DRC', 'MISTO'], ['Glicemia capilar e retorno à UBS em 1 semana', 'SUS']] },
  sus: 'igual',
  orient: 'Hidratação; reconhecer sintomas (sede, urina excessiva, vômitos, sonolência) — retornar se presentes.',
  fonte: 'SBD 2024; ADA 2025' });
