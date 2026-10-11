// ---------------- PELE, OLHOS & OUVIDOS ----------------
D({ id:'mupirocina', cat:'topicos', acc:'PART', route:'Uso Tópico',
  name:'Mupirocina 2% pomada', ind:'Impetigo localizado — 1ª escolha tópica',
  calc:()=>({ title:'Mupirocina 20 mg/g — pomada',
    inst:`Limpar com água e sabão, remover crostas e aplicar fina camada nas lesões de 8/8 h por 5–7 dias.` }) });

D({ id:'neo_bacitracina', cat:'topicos', acc:'MISTO', route:'Uso Tópico',
  name:'Neomicina + bacitracina pomada', ind:'Opção de baixo custo para impetigo muito localizado (menos eficaz; sensibilização)',
  calc:()=>({ title:'Neomicina + bacitracina — pomada',
    inst:`Aplicar nas lesões limpas de 8/8 h por 5–7 dias.\n• Se > 3 lesões, lesões extensas ou sem melhora em 48–72 h: antibiótico VO.` }) });

D({ id:'miconazol_creme', cat:'topicos', acc:'SUS', route:'Uso Tópico',
  name:'Miconazol 2% creme', ind:'Candidíase cutânea, dermatite de fraldas com candidíase, tinea corporis',
  calc:()=>({ title:'Nitrato de miconazol 20 mg/g — creme',
    inst:`Aplicar fina camada na área afetada de 12/12 h por 2 semanas (manter 1 semana após melhora).\n• Fralda: aplicar antes da pasta de barreira.` }) });

D({ id:'nistatina_zinco', cat:'topicos', acc:'PART', route:'Uso Tópico',
  name:'Nistatina + óxido de zinco pomada', ind:'Dermatite de fraldas com suspeita de Candida',
  calc:()=>({ title:'Nistatina 100.000 UI/g + óxido de zinco 200 mg/g — pomada',
    inst:`Aplicar camada generosa a cada troca de fralda (4–6x/dia) por 7–14 dias.\n• Trocas frequentes, períodos sem fralda, limpar só com água/algodão.` }) });

D({ id:'dexa_creme', cat:'topicos', acc:'SUS', route:'Uso Tópico',
  name:'Dexametasona 0,1% creme', ind:'Dermatite atópica/contato leve a moderada (opção SUS)',
  calc:()=>({ title:'Dexametasona 1 mg/g — creme dermatológico',
    inst:`Aplicar fina camada nas lesões 1–2x/dia por até 7 dias; evitar face, dobras e área da fralda.\n• Hidratar a pele 2–3x/dia.` }) });

D({ id:'mometasona_creme', cat:'topicos', acc:'PART', route:'Uso Tópico',
  name:'Mometasona 0,1% creme', ind:'Dermatite atópica (corpo) — potência média, 1x/dia',
  calc:()=>({ title:'Furoato de mometasona 1 mg/g — creme',
    inst:`Aplicar fina camada nas lesões 1x/dia por 5–7 dias; depois manutenção 2x/semana (proativa) se recidiva.\n• Face/dobras: preferir hidrocortisona 1% ou desonida.` }) });

D({ id:'hidrocortisona_creme', cat:'topicos', acc:'PART', route:'Uso Tópico',
  name:'Hidrocortisona 1% creme', ind:'Dermatite em face, dobras e área de fralda',
  calc:()=>({ title:'Hidrocortisona 10 mg/g — creme',
    inst:`Aplicar fina camada 2x/dia por até 7 dias (< 4 anos: máx. 3 semanas contínuas).` }) });

D({ id:'sulfadiazina', cat:'topicos', acc:'SUS', route:'Uso Tópico',
  name:'Sulfadiazina de prata 1% creme', ind:'Queimadura de 2º grau ambulatorial · ≥ 2 meses',
  min:{a:1/6, txt:'Evitar < 2 meses (kernicterus)'},
  calc:()=>({ title:'Sulfadiazina de prata 10 mg/g — creme',
    inst:`Limpar com SF 0,9%, aplicar camada de 3–5 mm e cobrir com gaze 1–2x/dia até epitelização.\n• 1º grau: só hidratante e analgesia.` }) });

D({ id:'cetoconazol_xampu', cat:'topicos', acc:'SUS', route:'Uso Tópico',
  name:'Cetoconazol xampu 2%', ind:'Dermatite seborreica, pitiríase versicolor, adjuvante na tinea capitis',
  calc:()=>({ title:'Cetoconazol 20 mg/mL — xampu',
    inst:`Aplicar no couro cabeludo/lesões, deixar 3–5 min e enxaguar, 2–3x/semana por 2–4 semanas.\n• Crosta láctea: amolecer antes com óleo vegetal.` }) });

D({ id:'tobramicina_col', cat:'topicos', acc:'PART', route:'Uso Oftálmico',
  name:'Tobramicina 0,3% colírio', ind:'Conjuntivite bacteriana',
  calc:()=>({ title:'Tobramicina 3 mg/mL — colírio',
    inst:`Pingar 1–2 gotas em cada olho de 4/4 h por 2 dias, depois de 6/6 h até completar 7 dias.\n• Limpar secreção com SF 0,9% antes. < 1 mês/conjuntivite neonatal: avaliar com oftalmologia.` }) });

D({ id:'moxi_col', cat:'topicos', acc:'PART', route:'Uso Oftálmico',
  name:'Moxifloxacino 0,5% colírio', ind:'Conjuntivite bacteriana — espectro amplo, 3x/dia · ≥ 1 ano',
  calc:()=>({ title:'Moxifloxacino 5 mg/mL — colírio',
    inst:`Pingar 1 gota em cada olho afetado de 8/8 h por 7 dias.` }) });

D({ id:'cipro_hidro_oto', cat:'topicos', acc:'PART', route:'Uso Otológico',
  name:'Ciprofloxacino + hidrocortisona otológico', ind:'Otite externa aguda; otorreia por tubo de ventilação · ≥ 1 ano',
  calc:()=>({ title:'Ciprofloxacino 0,2% + hidrocortisona 1% — solução otológica',
    inst:`Pingar 3 gotas no ouvido afetado de 12/12 h por 7 dias.\n• Não molhar o ouvido no período. Analgesia VO associada.` }) });

// ---------------- PUERICULTURA & PREVENÇÃO ----------------
D({ id:'ferro_prof', cat:'puericultura', acc:'SUS', route:'Uso Oral',
  name:'Sulfato ferroso 25 mg/mL Fe (profilaxia)', ind:'Profilaxia de anemia — SBP 2021 / PNSF (MS)',
  calc:(w)=>{ const mg=cap(w*1,15); return { title:'Sulfato ferroso 25 mg/mL de ferro elementar — gotas',
    inst:`Dar ${nf(mg,0)} mg de ferro elementar/dia = ${nf(mg/25,2)} mL (≈ ${gts(mg)} gotas; 1 mg/kg/dia) VO 1x/dia, 30 min antes da refeição, com suco cítrico.\n• SBP: termo AIG — dos 90 dias (fator de risco) ou 180 dias (sem risco) até 24 meses. Baixo peso/prematuro: 2–4 mg/kg/dia a partir de 30 dias por 1 ano, depois 1 mg/kg/dia.\n• Gotas/mL varia (≈ 1–1,25 mg Fe/gota) — conferir rótulo.` }; } });

D({ id:'ferro_trat', cat:'puericultura', acc:'SUS', route:'Uso Oral',
  name:'Sulfato ferroso 25 mg/mL Fe (tratamento)', ind:'Anemia ferropriva — 3 a 6 mg/kg/dia (SBP)',
  calc:(w)=>{ const mg=cap(w*4,120); return { title:'Sulfato ferroso 25 mg/mL — tratamento',
    inst:`Dar ${nf(mg/25,1)} mL (${nf(mg,0)} mg Fe = 4 mg/kg/dia; faixa 3–6) VO 1x/dia ou dividido 12/12 h, 30 min antes das refeições, longe de leite.\n• Hemograma + reticulócitos em 30–45 dias (esperado ↑ Hb ≥ 1 g/dL). Manter até repor estoques (≈ 6 meses / ferritina normal).` }; } });

D({ id:'ferro_quelato', cat:'puericultura', acc:'PART', route:'Uso Oral',
  name:'Ferro quelato glicinato / ferripolimaltose 50 mg/mL', ind:'Melhor tolerância GI; pode tomar com refeição',
  calc:(w)=>{ const mp=cap(w,15), mt=cap(w*4,120); return { title:'Ferro aminoácido quelato / polimaltose 50 mg/mL (2,5 mg/gota)',
    inst:`Profilaxia: ${gts(mp/2.5)} gotas VO 1x/dia (1 mg/kg/dia).\nTratamento: ${gts(mt/2.5)} gotas VO 1x/dia (4 mg/kg/dia).\n• Concentração varia por marca (2,5 ou 5 mg/gota) — conferir.` }; } });

D({ id:'vitd', cat:'puericultura', acc:'PART', route:'Uso Oral',
  name:'Colecalciferol (vitamina D3) 200 UI/gota', ind:'Profilaxia de raquitismo — SBP: 400 UI até 1 ano, 600 UI de 1 a 2 anos',
  calc:(w,a)=>{ const g = a<1?2:3, ui = a<1?400:600; return { title:'Vitamina D3 200 UI/gota — solução oral',
    inst:`Dar ${g} gotas (${ui} UI) VO 1x/dia, todos os dias${a<2?' até 2 anos':''}.\n• > 2 anos: 600 UI/dia nos grupos de risco (pouca exposição solar, obesidade, anticonvulsivantes, má absorção).\n• Não há vitamina D isolada na RENAME.` }; } });

D({ id:'vita_megadose', cat:'puericultura', acc:'SUSE', route:'Uso Oral',
  name:'Vitamina A (palmitato de retinol) megadose', ind:'Programa Nacional de Suplementação de Vitamina A (MS)',
  min:{a:0.5, txt:'6 a 59 meses'},
  calc:(w,a)=>{ const t = a<1?'100.000 UI (cápsula amarela) — dose única':(a<5?'200.000 UI (cápsula vermelha) a cada 6 meses':'Fora da faixa do programa (6–59 meses)'); return { title:'Vitamina A — megadose (cápsula)',
    inst:`Administrar ${t} VO, abrindo a cápsula na boca da criança.\n• Registrar na Caderneta e no e-SUS. Na desnutrição grave/sarampo: esquema terapêutico próprio.` }; } });

D({ id:'nirsevimabe', cat:'puericultura', acc:'SUSE', route:'Uso Intramuscular',
  name:'Nirsevimabe 50 / 100 mg (anticorpo anti-VSR)', ind:'Prevenção de VSR — SUS (NT 109/2025): prematuros ≤ 36s6d e < 24 m com comorbidades',
  calc:(w)=>{ const d = w<5?'50 mg (0,5 mL)':'100 mg (1 mL)'; return { title:'Nirsevimabe — IM dose única',
    inst:`1ª sazonalidade: ${d} IM no vasto lateral, dose única (< 5 kg: 50 mg; ≥ 5 kg: 100 mg).\n• 2ª sazonalidade (comorbidade, < 24 m): 200 mg (2 × 100 mg).\n• SUS: maternidades de referência/Rede de Imunobiológicos; demais crianças: rede privada.` }; } });

// ---------------- CRISES EPILÉPTICAS ----------------
D({ id:'midazolam_crise', cat:'convulsao', acc:'SUSH', route:'Uso Intranasal/IM/EV',
  name:'Midazolam 5 mg/mL — crise ≥ 5 min', ind:'1ª linha (IM/intranasal sem acesso; EV com acesso)',
  calc:(w)=>{ const mg=cap(w*0.2,10), mgE=cap(w*0.15,10); return { title:'Midazolam 5 mg/mL — ampola',
    inst:`Sem acesso: ${nf(mg/5,2)} mL (${nf(mg,1)} mg = 0,2 mg/kg; máx. 10 mg) IM no vasto lateral ou intranasal com atomizador (metade em cada narina).\nCom acesso: ${nf(mgE/5,2)} mL (${nf(mgE,1)} mg = 0,15 mg/kg; máx. 10 mg) EV lento.\n• Pode repetir 1 vez após 5 min. Preparar suporte ventilatório.` }; } });

D({ id:'diazepam_crise', cat:'convulsao', acc:'SUSH', route:'Uso Intravenoso/Retal',
  name:'Diazepam 5 mg/mL — crise ≥ 5 min', ind:'1ª linha EV ou retal',
  calc:(w)=>{ const mg=cap(w*0.3,10), mr=cap(w*0.5,20); return { title:'Diazepam 10 mg/2 mL — ampola',
    inst:`EV: ${nf(mg/5,2)} mL (${nf(mg,1)} mg = 0,3 mg/kg; máx. 10 mg) puro, lento (≤ 2 mg/min). Pode repetir 1x em 5 min.\nRetal: ${nf(mr/5,2)} mL (${nf(mr,1)} mg = 0,5 mg/kg; máx. 20 mg) com sonda curta.` }; } });

D({ id:'fenitoina_ataque', cat:'convulsao', acc:'SUSH', route:'Uso Intravenoso',
  name:'Fenitoína 50 mg/mL — ataque', ind:'2ª linha após 2 doses de benzodiazepínico',
  calc:(w)=>{ const mg=cap(w*20,1500); return { title:'Fenitoína 50 mg/mL — ataque 20 mg/kg',
    inst:`Aspirar ${nf(mg/50,1)} mL (${nf(mg,0)} mg; máx. 1,5 g) e diluir em SF 0,9% (NUNCA SG — precipita) a ≤ 10 mg/mL.\n• Infundir em 20 min (≤ 1 mg/kg/min; máx. 50 mg/min) com monitor cardíaco.\n• Se persistir: +10 mg/kg. Manutenção 5 mg/kg/dia ÷ 12/12 h após 12 h.` }; } });

D({ id:'levetiracetam_ev', cat:'convulsao', acc:'MISTO', route:'Uso Intravenoso',
  name:'Levetiracetam 100 mg/mL — ataque', ind:'2ª linha (ESETT: eficácia igual, menos efeitos)',
  calc:(w)=>{ const mg=cap(w*60,4500); return { title:'Levetiracetam 500 mg/5 mL — ataque 60 mg/kg',
    inst:`Fazer ${nf(mg/100,1)} mL (${nf(mg,0)} mg = 60 mg/kg; máx. 4,5 g) diluído em 100 mL SF ou SG 5%, EV em 10–15 min.\n• Disponibilidade EV variável na rede SUS.` }; } });

D({ id:'fenobarbital_ataque', cat:'convulsao', acc:'SUSH', route:'Uso Intravenoso',
  name:'Fenobarbital 100 mg/mL — ataque', ind:'2ª/3ª linha; 1ª linha no período neonatal',
  calc:(w)=>{ const mg=cap(w*20,1000); return { title:'Fenobarbital 200 mg/2 mL — ataque 20 mg/kg',
    inst:`Fazer ${nf(mg/100,2)} mL (${nf(mg,0)} mg; máx. 1 g) diluído 1:10 em SF, EV em 20 min (≤ 1 mg/kg/min; máx. 30 mg/min).\n• Risco de depressão respiratória e hipotensão (sobretudo após benzodiazepínico).\n• Manutenção: 3–5 mg/kg/dia após 12–24 h.` }; } });

// ---------------- PCR, CHOQUE & ANAFILAXIA ----------------
D({ id:'adrenalina_pcr', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Adrenalina IV/IO — PCR', ind:'PCR (todos os ritmos) — PALS/AHA 2025',
  calc:(w)=>{ const ml=cap(w*0.1,10); return { title:'Adrenalina 1:10.000 (0,1 mg/mL) — IV/IO',
    inst:`Diluir 1 mL de adrenalina 1 mg/mL + 9 mL SF 0,9%.\n• Fazer ${nf(ml,1)} mL (${nf(ml/10,2)} mg = 0,01 mg/kg; máx. 1 mg) IV/IO em bólus + flush 5 mL, a cada 3–5 min.\n• Ritmo não chocável: dar o mais precoce possível. Via traqueal: 0,1 mg/kg (1 mg/mL).` }; } });

D({ id:'energia_choque', cat:'urgencia_pcr', acc:'SUSH', route:'Orientações',
  name:'Desfibrilação e cardioversão — energias', ind:'FV/TV sem pulso; TSV/TV com pulso instável',
  calc:(w)=>({ title:'Energias para choque elétrico',
    inst:`Desfibrilação: 1º choque ${nf(w*2,0)} J (2 J/kg) → 2º ${nf(w*4,0)} J (4 J/kg) → seguintes ≥ 4 J/kg (máx. 10 J/kg ou dose adulto).\nCardioversão sincronizada: ${nf(w*0.5,0)}–${nf(w*1,0)} J (0,5–1 J/kg) → até ${nf(w*2,0)} J (2 J/kg).` }) });

D({ id:'amiodarona', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Amiodarona 50 mg/mL', ind:'FV/TV sem pulso refratária; TV com pulso',
  calc:(w)=>{ const mg=cap(w*5,300); return { title:'Amiodarona 150 mg/3 mL',
    inst:`PCR: ${nf(mg/50,1)} mL (${nf(mg,0)} mg = 5 mg/kg; máx. 300 mg) IV/IO em bólus; repetir até 3 doses (15 mg/kg).\nCom pulso: mesma dose em 20–60 min (diluída em SG 5%).\n• Alternativa: lidocaína 1 mg/kg.` }; } });

D({ id:'adenosina', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Adenosina 3 mg/mL', ind:'TSV estável/instável com acesso',
  calc:(w)=>{ const d1=cap(w*0.1,6), d2=cap(w*0.2,12); return { title:'Adenosina 6 mg/2 mL',
    inst:`1ª dose: ${nf(d1/3,2)} mL (${nf(d1,1)} mg = 0,1 mg/kg; máx. 6 mg) IV em bólus rápido + flush 5–10 mL (técnica das 2 seringas).\n2ª dose: ${nf(d2/3,2)} mL (${nf(d2,1)} mg = 0,2 mg/kg; máx. 12 mg).` }; } });

D({ id:'atropina', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Atropina 0,5 mg/mL', ind:'Bradicardia por tônus vagal/BAV; pré-IOT selecionada',
  calc:(w)=>{ const mg=cap(w*0.02,0.5); return { title:'Atropina 0,5 mg/mL',
    inst:`Fazer ${nf(mg/0.5,2)} mL (${nf(mg,2)} mg = 0,02 mg/kg; máx. 0,5 mg/dose) IV/IO; pode repetir 1x (máx. total 1 mg criança / 3 mg adolescente).\n• Bradicardia com hipoperfusão: adrenalina é a 1ª droga.` }; } });

D({ id:'adrenalina_anafilaxia', cat:'urgencia_pcr', acc:'SUS', route:'Uso Intramuscular',
  name:'Adrenalina 1 mg/mL IM — anafilaxia', ind:'1ª linha imediata na anafilaxia (vasto lateral)',
  calc:(w,a)=>{ const mx = a>=12?0.5:0.3; const mg=cap(w*0.01,mx); return { title:'Adrenalina 1 mg/mL (1:1.000) — IM',
    inst:`Aplicar ${nf(mg,2)} mL (${nf(mg,2)} mg = 0,01 mg/kg; máx. ${nf(mx,1)} mg) IM na face anterolateral da coxa AGORA.\n• Repetir a cada 5–15 min se necessário. Deitar com pernas elevadas; O₂; SF 20 mL/kg se hipotensão.\n• Anti-H1 e corticoide são adjuvantes, nunca substitutos.` }; } });

D({ id:'expansao', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Expansão volêmica — cristaloide', ind:'Choque hipovolêmico/séptico (SSC 2020): 10–20 mL/kg com reavaliação',
  calc:(w)=>({ title:'Ringer lactato (preferencial) ou SF 0,9% — bólus',
    inst:`Fazer ${nf(w*10,0)}–${nf(w*20,0)} mL (10–20 mL/kg) EV em 5–20 min; reavaliar perfusão, FC, fígado e ausculta após cada bólus.\n• Até 40–60 mL/kg na 1ª hora se UTI disponível e sem sinais de sobrecarga.\n• Cristaloide balanceado é preferível ao SF (SSC 2020).` }) });

D({ id:'adrenalina_choque_bic', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Adrenalina em BIC — choque', ind:'Choque frio / refratário a volume (0,05–0,3 mcg/kg/min, até 1)',
  calc:(w)=>({ title:'Adrenalina infusão contínua (10 mcg/mL)',
    inst:`Preparo: 1 mL adrenalina 1 mg/mL + 99 mL SG 5% ou SF (10 mcg/mL).\n• Iniciar ${nf(w*0.3,1)} mL/h (0,05 mcg/kg/min) e titular até ${nf(w*1.8,1)} mL/h (0,3 mcg/kg/min).\n• Pode iniciar em veia periférica calibrosa enquanto obtém acesso central.` }) });

D({ id:'noradrenalina_bic', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Noradrenalina em BIC — choque quente', ind:'Choque vasoplégico (0,05–1 mcg/kg/min)',
  calc:(w)=>({ title:'Noradrenalina infusão contínua (16 mcg/mL)',
    inst:`Preparo: 4 mL noradrenalina (4 mg) + 246 mL SG 5% (16 mcg/mL).\n• Iniciar ${nf(w*0.1*60/16,1)} mL/h (0,1 mcg/kg/min) e titular até ${nf(w*1*60/16,1)} mL/h (1 mcg/kg/min) conforme PAM e perfusão.` }) });

D({ id:'dobutamina', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Dobutamina — disfunção miocárdica', ind:'Choque cardiogênico/baixo débito (5–20 mcg/kg/min)',
  calc:(w)=>({ title:'Dobutamina infusão contínua (1.000 mcg/mL)',
    inst:`Preparo: 1 ampola (250 mg/20 mL) + 230 mL SG 5% (1 mg/mL).\n• Iniciar ${nf(w*5*60/1000,1)} mL/h (5 mcg/kg/min) e titular até ${nf(w*20*60/1000,1)} mL/h (20 mcg/kg/min).` }) });

D({ id:'glicose_hipo', cat:'urgencia_pcr', acc:'SUSH', route:'Uso Intravenoso',
  name:'Glicose 10% — hipoglicemia', ind:'HGT < 60 mg/dL sintomática ou sem via oral',
  calc:(w,a)=>({ title:'Glicose 10% — bólus',
    inst:`Fazer ${nf(w*(a<1/12?2:3),0)} mL (${a<1/12?'2':'3'} mL/kg; faixa 2–5 mL/kg = 0,2–0,5 g/kg) EV em 2–3 min.\n• Preparo SG 10%: 1 parte de glicose 50% + 4 partes de AD.\n• Reavaliar HGT em 15 min e manter TIG (SG com 5–8 mg/kg/min).\n• Sem acesso: glucagon ${w<25?'0,5 mg':'1 mg'} IM.` }) });

// ---------------- SEDAÇÃO, ANALGESIA & SRI ----------------
D({ id:'cetamina', cat:'sedacao_sri', acc:'SUSH', route:'Uso Intravenoso',
  name:'Cetamina 50 mg/mL', ind:'Indução na SRI (asma, choque), sedoanalgesia para procedimento',
  calc:(w)=>({ title:'Cetamina 50 mg/mL',
    inst:`SRI: ${nf(w*2,0)} mg (${nf(w*2/50,2)} mL = 2 mg/kg) EV.\nProcedimento: ${nf(w*1,0)}–${nf(w*1.5,0)} mg (1–1,5 mg/kg) EV lento ou ${nf(w*4,0)} mg (4 mg/kg) IM.\n• Evitar < 3 meses. Ter aspiração pronta (sialorreia).` }) });

D({ id:'fentanil', cat:'sedacao_sri', acc:'SUSH', route:'Uso Intravenoso',
  name:'Fentanil 50 mcg/mL', ind:'Analgesia na SRI e para procedimentos',
  calc:(w)=>{ const m=cap(w*2,100); return { title:'Fentanil 50 mcg/mL',
    inst:`Fazer ${nf(m/50,2)} mL (${nf(m,0)} mcg = 1–2 mcg/kg; máx. 100 mcg) EV lento em 1–2 min (rigidez torácica se rápido).` }; } });

D({ id:'etomidato', cat:'sedacao_sri', acc:'SUSH', route:'Uso Intravenoso',
  name:'Etomidato 2 mg/mL', ind:'Indução hemodinamicamente neutra · evitar no choque séptico',
  calc:(w)=>{ const mg=cap(w*0.3,20); return { title:'Etomidato 2 mg/mL',
    inst:`Fazer ${nf(mg/2,1)} mL (${nf(mg,1)} mg = 0,3 mg/kg; máx. 20 mg) EV em 30–60 s.\n• Supressão adrenal: evitar na sepse.` }; } });

D({ id:'rocuronio', cat:'sedacao_sri', acc:'SUSH', route:'Uso Intravenoso',
  name:'Rocurônio 10 mg/mL', ind:'Bloqueio neuromuscular na SRI',
  calc:(w)=>({ title:'Rocurônio 10 mg/mL',
    inst:`Fazer ${nf(w*1.2/10,2)} mL (${nf(w*1.2,1)} mg = 1–1,2 mg/kg) EV em bólus.\n• Reversão: sugamadex 16 mg/kg (imediata).` }) });

D({ id:'succinilcolina', cat:'sedacao_sri', acc:'SUSH', route:'Uso Intravenoso',
  name:'Succinilcolina 100 mg (10 mg/mL após diluição)', ind:'BNM de curta ação · CI: hipercalemia, queimado > 48 h, miopatia',
  calc:(w,a)=>{ const dk=a<1?2:1.5; return { title:'Succinilcolina 100 mg + 10 mL AD (10 mg/mL)',
    inst:`Fazer ${nf(w*dk/10,2)} mL (${nf(w*dk,0)} mg = ${dk} mg/kg) EV em bólus.\n• Lactentes: 2 mg/kg; crianças: 1–1,5 mg/kg. Considerar atropina em < 1 ano.` }; } });

D({ id:'sedacao_continua', cat:'sedacao_sri', acc:'SUSH', route:'Uso Intravenoso',
  name:'Midazolam + fentanil em BIC — sedação contínua', ind:'Paciente em ventilação mecânica',
  calc:(w)=>({ title:'Sedoanalgesia contínua — solução única (1 mL/h)',
    inst:`Midazolam 5 mg/mL ${nf(w*0.1*24/5,1)} mL (0,1 mg/kg/h)\nFentanil 50 mcg/mL ${nf(w*1*24/50,1)} mL (1 mcg/kg/h)\nSF 0,9% q.s.p. 24 mL → correr EV em BIC a 1 mL/h.\n• Titular: midazolam 0,05–0,3 mg/kg/h; fentanil 1–4 mcg/kg/h. Escala COMFORT-B.` }) });

// ---------------- INTOXICAÇÕES & ANTÍDOTOS ----------------
D({ id:'naloxona', cat:'intox', acc:'SUSH', route:'Uso Intravenoso',
  name:'Naloxona 0,4 mg/mL', ind:'Intoxicação por opioide (depressão respiratória)',
  calc:(w)=>{ const mg=cap(w*0.1,2); return { title:'Naloxona 0,4 mg/mL',
    inst:`Reversão total (intoxicação): ${nf(mg/0.4,2)} mL (${nf(mg,2)} mg = 0,1 mg/kg; máx. 2 mg) IV/IM/IN; repetir a cada 2–3 min.\nDepressão por opioide terapêutico: 1–5 mcg/kg titulado.` }; } });

D({ id:'flumazenil', cat:'intox', acc:'SUSH', route:'Uso Intravenoso',
  name:'Flumazenil 0,1 mg/mL', ind:'Depressão por benzodiazepínico iatrogênico · evitar em epilépticos',
  calc:(w)=>{ const mg=cap(w*0.01,0.2); return { title:'Flumazenil 0,1 mg/mL',
    inst:`Fazer ${nf(mg/0.1,2)} mL (${nf(mg,2)} mg = 0,01 mg/kg; máx. 0,2 mg) IV em 15 s; repetir a cada 1 min até 1 mg total.\n• Risco de convulsão; meia-vida curta (ressedação).` }; } });

D({ id:'carvao', cat:'intox', acc:'SUSH', route:'Uso Oral',
  name:'Carvão ativado', ind:'Ingestão tóxica < 1–2 h com via aérea protegida (não para álcool, ferro, lítio, cáusticos, hidrocarbonetos)',
  calc:(w)=>{ const g=cap(w*1,50); return { title:'Carvão ativado — pó',
    inst:`Dar ${nf(g,0)} g (1 g/kg; máx. 50 g) VO/SNG diluído em 8–10 mL de água/SF por grama.\n• Dose múltipla (fenobarbital, carbamazepina): 0,5 g/kg 4/4 h.` }; } });

// ---------------- ELETRÓLITOS & HIDRATAÇÃO EV ----------------
D({ id:'hv_manutencao', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'Hidratação venosa de manutenção isotônica (AAP 2018)', ind:'Manutenção em > 28 dias — reduz hiponatremia hospitalar',
  calc:(w)=>{ const hol = w<=10?w*100:(w<=20?1000+(w-10)*50:Math.min(1500+(w-20)*20,2400));
    const kcl = hol/1000*20/1.34, g50 = hol/1000*50*2; const sf = hol - kcl - g50;
    return { title:`Soro de manutenção 24 h — ${nf(hol,0)} mL (Holliday-Segar)`,
    inst:`SF 0,9% ........ ${nf(sf,0)} mL\nGlicose 50% .... ${nf(g50,0)} mL (≈ SG 5%)\nKCl 10% ........ ${nf(kcl,1)} mL (20 mEq/L)\n→ Volume ${nf(hol,0)} mL EV em BIC a ${nf(hol/24,1)} mL/h.\n• Na ≈ 140 mEq/L, glicose ≈ 5%. K só após diurese. Reduzir para ⅔ se SIADH (bronquiolite, meningite, pós-op).` }; } });

D({ id:'plano_c', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'Plano C — desidratação grave (MS/OMS)', ind:'Desidratação grave/choque hipovolêmico na diarreia',
  calc:(w,a)=>{ const f1=w*30, f2=w*70; const t = a<1?['1 h','5 h']:['30 min','2 h 30 min'];
    return { title:'Plano C — reidratação EV (Ringer lactato ou SF 0,9%)',
    inst:`1ª etapa: ${nf(f1,0)} mL (30 mL/kg) em ${t[0]}.\n2ª etapa: ${nf(f2,0)} mL (70 mL/kg) em ${t[1]}.\n• Choque: começar com bólus 20 mL/kg em 5–10 min e repetir conforme resposta.\n• Iniciar SRO (5 mL/kg/h) assim que puder beber; reavaliar a cada 15–30 min.` }; } });

D({ id:'kcl_correcao', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'KCl 10% — hipocalemia grave (K < 2,5 ou ECG alterado)', ind:'Reposição EV monitorizada',
  calc:(w)=>{ const meq=cap(w*0.5,40); const ml=meq/1.34, vol=Math.ceil(meq/8*100);
    return { title:`KCl 10% — ${nf(meq,1)} mEq em 1–2 h`,
    inst:`Aspirar ${nf(ml,1)} mL de KCl 10% (${nf(meq,1)} mEq = 0,5 mEq/kg; máx. 40 mEq) e diluir em ≥ ${vol} mL de SF 0,9% (periférico ≤ 8 mEq/100 mL; central ≤ 15–20 mEq/100 mL).\n• Infundir em 1–2 h (≤ 0,5–1 mEq/kg/h) com monitor cardíaco. Dosar K após.` }; } });

D({ id:'gluconato_calcio_10', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'Gluconato de cálcio 10%', ind:'Hipercalemia com ECG alterado, hipocalcemia sintomática, hipermagnesemia',
  calc:(w)=>{ const ml=cap(w*0.5,20); return { title:'Gluconato de cálcio 10% (100 mg/mL)',
    inst:`Fazer ${nf(ml,1)} mL (0,5 mL/kg = 50 mg/kg; máx. 20 mL = 2 g) diluído em igual volume de SF, EV em 5–10 min com monitor.\n• Suspender se bradicardia. Não misturar com bicarbonato.` }; } });

D({ id:'solucao_polarizante', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'Insulina + glicose (hipercalemia K > 6,5)', ind:'Desvio intracelular de potássio',
  calc:(w)=>({ title:'Solução polarizante — insulina regular + glicose',
    inst:`Insulina regular ${nf(cap(w*0.1,10),1)} UI (0,1 UI/kg; máx. 10 UI) + glicose 10% ${nf(w*5,0)} mL (0,5 g/kg) EV em 30 min.\n• HGT a cada 30 min por 2 h. Associar salbutamol inalatório e tratar causa.` }) });

D({ id:'nacl_3', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'NaCl 3% — hiponatremia sintomática / HIC', ind:'Na < 125 com convulsão/rebaixamento; edema cerebral',
  calc:(w)=>{ const ml=cap(w*3,150); return { title:'NaCl 3% (salina hipertônica)',
    inst:`Preparo: 15 mL NaCl 20% + 85 mL AD (ou 100 mL SF 0,9% + 12 mL NaCl 20%).\n• Fazer ${nf(ml,0)} mL (3 mL/kg; faixa 2–5; máx. 150 mL) EV em 10–20 min; repetir até cessar sintomas.\n• Elevar Na ≤ 8–10 mEq/L em 24 h após controle dos sintomas.` }; } });

D({ id:'bicarbonato', cat:'disturbios_he', acc:'SUSH', route:'Uso Intravenoso',
  name:'Bicarbonato de sódio 8,4% (1 mEq/mL)', ind:'Acidose grave pH < 7,0–7,1 selecionada, hipercalemia, intoxicação por tricíclico',
  calc:(w)=>({ title:'Bicarbonato de sódio 8,4%',
    inst:`Fazer ${nf(w,1)} mL (1 mEq/kg) diluído 1:1 em AD (< 6 meses: usar 4,2%), EV lento.\n• Déficit = 0,3 × peso × (15 − HCO₃); repor metade em 2–4 h e repetir gasometria.\n• Não usar rotineiramente na CAD ou PCR.` }) });

// ---------------- CAD & ENDÓCRINO ----------------
D({ id:'cad_volume', cat:'cetoacidose_endocrino', acc:'SUSH', route:'Uso Intravenoso',
  name:'CAD — expansão inicial (ISPAD 2022)', ind:'1ª hora da cetoacidose diabética',
  calc:(w)=>({ title:'SF 0,9% ou Ringer lactato — CAD',
    inst:`Fazer ${nf(w*10,0)}–${nf(w*20,0)} mL (10–20 mL/kg) EV em 20–60 min; repetir se má perfusão.\n• Depois: déficit (5–10%) + manutenção em 24–48 h, com SF/RL + KCl 40 mEq/L.\n• Choque: 20 mL/kg rápido.` }) });

D({ id:'cad_insulina_bic', cat:'cetoacidose_endocrino', acc:'SUSH', route:'Uso Intravenoso',
  name:'Insulina regular em BIC — CAD', ind:'Iniciar 1–2 h após a expansão; K ≥ 3,5',
  calc:(w)=>{ const uiH=w*0.1, mlH=uiH*10; return { title:`Insulina regular 0,05–0,1 UI/kg/h (${nf(uiH,2)} UI/h)`,
    inst:`Preparo (0,1 UI/mL): 25 UI insulina regular + 250 mL SF 0,9%; desprezar 50 mL no equipo.\n• Correr ${nf(mlH,1)} mL/h (0,1 UI/kg/h) — ou ${nf(mlH/2,1)} mL/h (0,05) em < 5 anos/glicemia muito alta. Sem bólus.\n• Glicemia < 250–300: associar SG 5–10% e manter insulina até pH > 7,30 e HCO₃ > 15.\n• Queda ideal da glicemia: 50–100 mg/dL/h.` }; } });

D({ id:'cad_edema', cat:'cetoacidose_endocrino', acc:'SUSH', route:'Uso Intravenoso',
  name:'Edema cerebral na CAD — manitol / NaCl 3%', ind:'Cefaleia, bradicardia, HAS, rebaixamento',
  calc:(w)=>({ title:'Manitol 20% ou NaCl 3% — edema cerebral',
    inst:`Manitol 20%: ${nf(w*2.5,0)}–${nf(w*5,0)} mL (0,5–1 g/kg) EV em 10–15 min.\nou NaCl 3%: ${nf(w*2.5,0)}–${nf(w*5,0)} mL (2,5–5 mL/kg) em 10–15 min.\n• Elevar cabeceira 30°, reduzir volume de hidratação, chamar UTI.` }) });

D({ id:'hidrocortisona_adrenal', cat:'cetoacidose_endocrino', acc:'SUSH', route:'Uso Intravenoso',
  name:'Hidrocortisona — crise adrenal', ind:'HAC, insuficiência adrenal, choque refratário a catecolaminas',
  calc:(w,a)=>{ const bol = a<3?25:(a<12?50:100); const bsa=(w*4+7)/(w+90); const m=Math.round(bsa*100/4);
    return { title:`Hidrocortisona — ataque ${bol} mg + manutenção`,
    inst:`Ataque: ${bol} mg EV em bólus agora (≈ 50–100 mg/m²; < 3 a 25 mg; 3–12 a 50 mg; > 12 a 100 mg).\nManutenção: ≈ ${m} mg EV de 6/6 h (100 mg/m²/dia) até estabilizar.\n• Corrigir hipoglicemia e hiponatremia (SG + SF). SC estimada se altura ausente.` }; } });

// ---------------- NUTRIÇÃO & DESNUTRIÇÃO ----------------
D({ id:'npt_tig_glicose', cat:'nutricao_parenteral', acc:'SUSH', route:'Uso Intravenoso',
  name:'TIG e glicose (taxa de infusão de glicose)', ind:'Jejum prolongado / NP — oferta de carboidrato',
  calc:(w,a)=>{ const tig = a<28/365?6:(a<1?5:(a<10?4:3)); const g=tig*w*1.44;
    return { title:`TIG inicial ${tig} mg/kg/min — ${nf(g,1)} g de glicose/dia`,
    inst:`• Glicose/dia = peso × TIG × 1,44 = ${nf(g,1)} g (3,4 kcal/g) = ${nf(g*2,0)} mL de glicose 50%.\n• Concentração máx.: periférica 12,5%; central 25%.\n• HGT 6/6 h; alvo 70–180 mg/dL (NP: < 145).` }; } });

D({ id:'npt_aminoacidos_10', cat:'nutricao_parenteral', acc:'SUSH', route:'Uso Intravenoso',
  name:'Aminoácidos 10% (NP)', ind:'Aporte proteico parenteral (ESPGHAN 2018)',
  calc:(w,a)=>{ const gk = a<1?2.5:(a<10?2:1.5); const g=w*gk; return { title:`Aminoácidos 10% — ${gk} g/kg/dia`,
    inst:`Infundir ${nf(g*10,0)} mL/dia (${nf(g,1)} g) na solução de NP.\n• Iniciar 1–1,5 g/kg/dia e progredir até a meta (lactente 2–3; criança 1–2; adolescente 1–2 g/kg/dia).\n• 4 kcal/g; 1 g N = 6,25 g proteína.` }; } });

D({ id:'npt_lipidios_20', cat:'nutricao_parenteral', acc:'SUSH', route:'Uso Intravenoso',
  name:'Emulsão lipídica 20% (NP)', ind:'Calorias e ácidos graxos essenciais',
  calc:(w)=>{ const ml=w*1*5; return { title:'Emulsão lipídica 20% — 1 g/kg/dia',
    inst:`Infundir ${nf(ml,1)} mL em 24 h (${nf(ml/24,1)} mL/h) em via dedicada.\n• Progredir até 2–3 g/kg/dia (máx. 3–4). 1 mL = 2 kcal.\n• Triglicerídeos > 250–400 mg/dL: reduzir.` }; } });

D({ id:'desnutricao_micronutrientes', cat:'nutricao_parenteral', acc:'MISTO', route:'Uso Oral',
  name:'Desnutrição grave — micronutrientes (OMS)', ind:'Fase de estabilização (prevenir síndrome de realimentação)',
  calc:(w,a)=>{ const vitA = a<0.5?'50.000':(a<1?'100.000':'200.000'); const zn=cap(w*2,20), cu=cap(w*0.3,2);
    return { title:'Desnutrição grave — suplementação (OMS)',
    inst:`1. Vitamina A: ${vitA} UI VO no D1 (se sinais oculares, sarampo ou sem F-75/F-100 enriquecidos; repetir D2 e D14 se lesão ocular).\n2. Zinco: ${nf(zn,1)} mg/dia (2 mg/kg).\n3. Cobre: ${nf(cu,2)} mg/dia (0,3 mg/kg).\n4. Ácido fólico: 5 mg no D1, depois 1 mg/dia.\n5. Polivitamínico: 2× a recomendação diária.\n6. Ferro: NÃO na estabilização; 3 mg/kg/dia só na reabilitação (ganho de peso).` }; } });
