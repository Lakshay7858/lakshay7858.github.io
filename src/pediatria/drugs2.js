// ---------------- ANTIBIÓTICOS IV/IM ----------------
D({ id:'pen_benzatina', cat:'atb_iv', acc:'SUS', route:'Uso Intramuscular',
  name:'Penicilina G benzatina 600.000 / 1.200.000 UI', ind:'Faringite estreptocócica (dose única), profilaxia de febre reumática',
  calc:(w)=>{ const d = w<27?'600.000 UI':'1.200.000 UI'; return { title:`Penicilina G benzatina ${d} — IM`,
    inst:`Aplicar ${d} IM profundo (glúteo/vasto lateral) em dose única.\n• < 27 kg: 600.000 UI · ≥ 27 kg: 1.200.000 UI (AHA/SBP).\n• Pó liofilizado: reconstituir com 4 mL AD (ou AD + lidocaína 1% sem vasoconstritor). Observar 30 min após.` }; } });

D({ id:'ceftriaxona_ev', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Ceftriaxona 1 g (IV/IM)', ind:'Sepse, meningite, PAC grave, pielonefrite, OMA refratária (IM)',
  calc:(w)=>{ const dM=cap(w*50,2000), d1=cap(w*75,2000); return { title:'Ceftriaxona 1 g — frasco-ampola',
    inst:`Reconstituir 1 g em 10 mL AD (100 mg/mL).\n• Habitual: ${nf(d1/100,1)} mL (${nf(d1,0)} mg; 50–75 mg/kg) EV 1x/dia, diluído em 50–100 mL SF, em 30 min.\n• Meningite: ${nf(dM/100,1)} mL (${nf(dM,0)} mg = 50 mg/kg) de 12/12 h (100 mg/kg/dia; máx. 4 g/dia).\n• Não infundir com soluções contendo cálcio (RN).` }; },
  v:{ im_oma:(w)=>({ title:'Ceftriaxona — IM (OMA com falha/sem via oral)',
      inst:`Aplicar ${nf(cap(w*50,1000),0)} mg IM 1x/dia por 1–3 dias (50 mg/kg; máx. 1 g).\n• Reconstituir 1 g em 3,5 mL de lidocaína 1% (≈ 285 mg/mL) → ${nf(cap(w*50,1000)/285,1)} mL IM.` }),
      pielo:(w)=>({ title:'Ceftriaxona — pielonefrite/ITU febril',
      inst:`Fazer ${nf(cap(w*75,2000),0)} mg EV/IM 1x/dia (75 mg/kg/dia; 50–75) até melhora clínica (24–72 h afebril), depois trocar para VO conforme urocultura.` }),
      sepse:(w)=>({ title:'Ceftriaxona — sepse / choque séptico (1ª hora)',
      inst:`Fazer ${nf(cap(w*100,2000),0)} mg EV (100 mg/kg; máx. 2 g) dentro da 1ª hora, após hemoculturas.\n• Associar vancomicina se suspeita de S. aureus/pneumococo resistente ou meningite.` }) } });

D({ id:'pen_cristalina', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Penicilina G cristalina (potássica)', ind:'PAC hospitalar sem complicações (SBP), sífilis congênita, meningite',
  calc:(w)=>{ const ui=cap(w*50000,4000000); return { title:'Penicilina G cristalina — 200.000 UI/kg/dia',
    inst:`Fazer ${nf(ui,0)} UI EV de 6/6 h (50.000 UI/kg/dose = 200.000 UI/kg/dia).\n• FA 5.000.000 UI + 8 mL AD = 500.000 UI/mL → aspirar ${nf(ui/500000,2)} mL e rediluir em SF (< 1 a: 50.000 UI/mL; > 1 a: 100.000 UI/mL).\n• Meningite: 300–400.000 UI/kg/dia de 4/4 h.` }; } });

D({ id:'ampicilina', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Ampicilina 1 g (IV)', ind:'PAC hospitalar (SBP/OMS), sepse neonatal (+ gentamicina), meningite',
  calc:(w)=>{ const mg=cap(w*50,2000); return { title:'Ampicilina 1 g — frasco-ampola',
    inst:`Reconstituir 1 g em 10 mL AD (100 mg/mL).\n• PAC: ${nf(mg/100,1)} mL (${nf(mg,0)} mg = 50 mg/kg) EV de 6/6 h (200 mg/kg/dia).\n• Meningite: 75–100 mg/kg/dose 6/6 h (máx. 12 g/dia).\n• < 2 meses ou grave (OMS): associar gentamicina 7,5 mg/kg 1x/dia.` }; } });

D({ id:'gentamicina', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Gentamicina 40 mg/mL', ind:'Pielonefrite, sepse neonatal (com ampicilina), PAC < 2 meses',
  calc:(w,a)=>{ const dk = a<1/12?4:7.5; const mg=w*dk; return { title:'Gentamicina 40 mg/mL — dose diária única',
    inst:`Fazer ${nf(mg,1)} mg (${nf(mg/40,2)} mL; ${dk} mg/kg) EV 1x/dia, diluído para ≤ 10 mg/mL em SF, em 30–60 min.\n• Faixa: 5–7,5 mg/kg/dia (RN: 4–5 mg/kg/dose com intervalo por IG).\n• Ajustar à função renal; nível sérico se > 5 dias.` }; } });

D({ id:'amicacina', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Amicacina 50 mg/mL', ind:'Gram-negativos resistentes, neutropenia febril',
  calc:(w)=>{ const mg=cap(w*15,1500); return { title:'Amicacina 50 mg/mL',
    inst:`Fazer ${nf(mg,0)} mg (${nf(mg/50,1)} mL; 15 mg/kg) EV 1x/dia em 30–60 min (máx. 1,5 g/dia).` }; } });

D({ id:'oxacilina_ev', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Oxacilina 500 mg', ind:'S. aureus sensível: celulite grave, osteomielite, PAC complicada',
  calc:(w)=>{ const mg=cap(w*50,2000); return { title:'Oxacilina 500 mg — frasco-ampola',
    inst:`Reconstituir 500 mg em 5 mL AD (100 mg/mL).\n• Fazer ${nf(mg/100,1)} mL (${nf(mg,0)} mg = 50 mg/kg) EV de 6/6 h (200 mg/kg/dia; faixa 150–200; máx. 12 g/dia), diluído em SF, 30–60 min.` }; } });

D({ id:'clindamicina_ev', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Clindamicina 150 mg/mL', ind:'MRSA comunitário, alergia a betalactâmico, abscessos, choque tóxico',
  calc:(w)=>{ const mg=cap(w*10,900); return { title:'Clindamicina 150 mg/mL',
    inst:`Fazer ${nf(mg,0)} mg (${nf(mg/150,2)} mL; 10 mg/kg) EV de 8/8 h (30–40 mg/kg/dia; máx. 900 mg/dose), diluído a ≤ 18 mg/mL, em 30 min.` }; } });

D({ id:'vancomicina', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Vancomicina 500 mg', ind:'MRSA, meningite (com ceftriaxona), choque séptico com suspeita de Gram+',
  calc:(w)=>{ const mg=cap(w*15,1000); return { title:'Vancomicina 500 mg — frasco-ampola',
    inst:`Fazer ${nf(mg,0)} mg (15 mg/kg) EV de 6/6 h (60 mg/kg/dia), diluído a ≤ 5 mg/mL em SF/SG 5%, em 60–120 min.\n• Infusão rápida → síndrome do homem vermelho.\n• Vale-alvo 10–15 (ou AUC 400–600).` }; } });

D({ id:'meropenem_ev', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Meropenem 1 g', ind:'Infecção nosocomial grave, intra-abdominal complicada, neutropenia febril',
  calc:(w)=>{ const mg=cap(w*20,1000), mM=cap(w*40,2000); return { title:'Meropenem 1 g — frasco-ampola',
    inst:`Reconstituir 1 g em 20 mL AD (50 mg/mL).\n• Habitual: ${nf(mg/50,1)} mL (${nf(mg,0)} mg = 20 mg/kg) EV 8/8 h.\n• Meningite/neutropenia: ${nf(mM/50,1)} mL (${nf(mM,0)} mg = 40 mg/kg) 8/8 h (máx. 2 g/dose).\n• Diluir em 50–100 mL SF; infundir em 30 min (ou 3 h estendida).` }; } });

D({ id:'cefepima', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Cefepima 1 g', ind:'Neutropenia febril, Pseudomonas',
  calc:(w)=>{ const mg=cap(w*50,2000); return { title:'Cefepima 1 g — frasco-ampola',
    inst:`Fazer ${nf(mg,0)} mg (50 mg/kg) EV de 8/8 h (máx. 2 g/dose), diluído a 40 mg/mL, em 30 min.` }; } });

D({ id:'metronidazol_ev', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Metronidazol 5 mg/mL (bolsa)', ind:'Anaeróbios: abdome agudo, abscesso',
  calc:(w)=>{ const mg=cap(w*10,500); return { title:'Metronidazol 5 mg/mL — solução injetável',
    inst:`Fazer ${nf(mg/5,0)} mL (${nf(mg,0)} mg = 10 mg/kg) EV de 8/8 h em 60 min (máx. 500 mg/dose).` }; } });

D({ id:'aciclovir_ev', cat:'atb_iv', acc:'SUSH', route:'Uso Intravenoso',
  name:'Aciclovir 250 mg (IV)', ind:'Encefalite herpética, varicela em imunossuprimido, HSV neonatal',
  calc:(w,a)=>{ const dk = a<12?15:10; const mg=w*dk; return { title:'Aciclovir 250 mg — frasco-ampola',
    inst:`Fazer ${nf(mg,0)} mg (${dk} mg/kg) EV de 8/8 h em 60 min, diluído a ≤ 7 mg/mL.\n• RN/HSV neonatal e encefalite < 12 a: 20 mg/kg/dose 8/8 h.\n• Hidratar bem (nefrotoxicidade).` }; } });

// ---------------- RESPIRATÓRIO & ASMA ----------------
D({ id:'salbutamol_spray', cat:'respiratorio', acc:'SUS', route:'Uso Inalatório',
  name:'Salbutamol spray 100 mcg/jato (com espaçador)', ind:'Crise de asma/sibilância — 1ª escolha (GINA)',
  calc:(w,a)=>{ const j = a<=5 ? cap(flo(Math.round(w/3),2),6) : cap(flo(Math.round(w/3),4),10);
    return { title:'Salbutamol 100 mcg/jato — aerossol + espaçador',
    inst:`Crise: ${j} jatos com espaçador (e máscara se < 4–5 anos) a cada 20 min por até 3 vezes na 1ª hora.\n• ${a<=5?'≤ 5 anos: até 6 jatos/dose':'> 5 anos: 4–10 jatos/dose'}; depois 2–4 jatos até de 4/4 h conforme resposta.\n• Técnica: 1 jato por vez, 5–6 respirações (ou 10 s) entre jatos.` }; },
  v:{ casa:(w,a)=>({ title:'Salbutamol 100 mcg/jato — resgate domiciliar',
      inst:`Usar ${a<=5?'2':'2 a 4'} jatos com espaçador se tosse/chiado/falta de ar, até de 4/4 h.\n• Se precisar antes de 4 h ou sem melhora: procurar atendimento.` }) } });

D({ id:'fenoterol_neb', cat:'respiratorio', acc:'PART', route:'Uso Inalatório',
  name:'Fenoterol gotas 5 mg/mL (nebulização)', ind:'Prática comum em UPA; spray + espaçador é preferível',
  calc:(w)=>{ const g=gts(w/3,10); return { title:'Fenoterol 5 mg/mL — nebulização',
    inst:`Nebulizar ${g} gotas (1 gota/3 kg; máx. 10) + SF 0,9% 3–5 mL com O₂ 6–8 L/min, a cada 20 min até 3 vezes.\n• Mais taquicardia/hipocalemia; não é superior ao spray com espaçador.` }; } });

D({ id:'salbutamol_neb', cat:'respiratorio', acc:'MISTO', route:'Uso Inalatório',
  name:'Salbutamol solução 5 mg/mL (nebulização)', ind:'Crise grave sem cooperação para espaçador; nebulização contínua em UTI',
  calc:(w)=>{ const mg=cap(flo(w*0.15,2.5),5); return { title:'Salbutamol 5 mg/mL — nebulização',
    inst:`Nebulizar ${nf(mg/5,2)} mL (${nf(mg,1)} mg; 0,15 mg/kg; mín. 2,5 mg, máx. 5 mg) + SF até 4 mL, a cada 20 min ×3.\n• Contínua (UTI): 0,5 mg/kg/h (máx. 20 mg/h).` }; } });

D({ id:'ipratropio', cat:'respiratorio', acc:'SUS', route:'Uso Inalatório',
  name:'Brometo de ipratrópio 0,25 mg/mL', ind:'Crise moderada a grave — associar ao β2 na 1ª hora',
  calc:(w)=>{ const g = w<10?10:(w<20?20:40); return { title:'Ipratrópio 0,25 mg/mL — solução para inalação',
    inst:`Associar ${g} gotas (${g*12.5} mcg) à nebulização com β2 a cada 20 min, por 3 vezes (só na 1ª hora).\n• Spray 20 mcg/jato: ${w<20?'2–4':'4–8'} jatos com espaçador.\n• Não há benefício em manter após a fase inicial.` }; } });

D({ id:'beclometasona', cat:'respiratorio', acc:'SUS', route:'Uso Inalatório',
  name:'Beclometasona spray 50 mcg/jato', ind:'Controle da asma (corticoide inalatório) — opção do SUS',
  calc:(w,a)=>{ const t = a<6?'1 jato de 12/12 h (100 mcg/dia — dose baixa)':(a<12?'1–2 jatos de 12/12 h (100–200 mcg/dia — dose baixa)':'2–4 jatos de 12/12 h (200–400 mcg/dia — dose baixa)');
    return { title:'Beclometasona 50 mcg/jato — aerossol + espaçador', inst:`Usar ${t} com espaçador${a<5?' e máscara':''}.\n• Enxaguar a boca após uso. Reavaliar controle em 2–3 meses.\n• SUS: há também 200/250 mcg/jato.` }; } });

D({ id:'budform_100', cat:'respiratorio', acc:'PART', route:'Uso Inalatório',
  name:'Budesonida + formoterol 100/6 mcg (ou 80/4,5)', ind:'GINA 2025–2026: 6–11 anos, MART ou só alívio (substitui SABA isolado)',
  min:{a:6, txt:'Esquema MART com 100/6 a partir de 6 anos (GINA)'},
  calc:(w,a)=>({ title:'Budesonida + formoterol 100/6 mcg — inalador',
    inst:`Manutenção e alívio (MART): 1 inalação de 12/12 h${a<12?'':' (ou 1–2)'} + 1 inalação extra se sintomas.\n• Máx. 8 inalações/dia (6–11 anos).\n• Alternativa só-alívio: 1 inalação quando tiver sintomas.` }) });

D({ id:'budform_200', cat:'respiratorio', acc:'SUSESP', route:'Uso Inalatório',
  name:'Budesonida + formoterol 200/6 mcg', ind:'≥ 12 anos: via preferencial GINA (MART) · SUS via PCDT Asma 2026',
  min:{a:12, txt:'Esquema 200/6 a partir de 12 anos'},
  calc:()=>({ title:'Budesonida + formoterol 200/6 mcg — cápsula/inalador',
    inst:`Asma leve: 1 inalação quando houver sintomas (alívio anti-inflamatório).\nAsma moderada (MART): 1–2 inalações de 12/12 h + 1 extra se sintomas (máx. 12/dia).\n• SUS: retirada no Componente Especializado mediante LME e PCDT.` }) });

D({ id:'budesonida_neb', cat:'respiratorio', acc:'PART', route:'Uso Inalatório',
  name:'Budesonida suspensão 0,25 mg/mL (nebulização)', ind:'Controle da sibilância/asma em ≤ 5 anos sem colaboração com espaçador',
  calc:()=>({ title:'Budesonida 0,25 mg/mL — nebulização',
    inst:`Nebulizar 1–2 mL (0,25–0,5 mg) de 12/12 h (dose baixa ≤ 5 anos: 0,5 mg/dia).\n• Lavar o rosto após a nebulização.` }) });

D({ id:'montelucaste', cat:'respiratorio', acc:'PART', route:'Uso Oral',
  name:'Montelucaste 4 / 5 / 10 mg', ind:'Alternativa de controle, rinite + asma · ⚠ alerta neuropsiquiátrico (FDA)',
  min:{a:0.5, txt:'≥ 6 meses (sachê 4 mg)'},
  calc:(w,a)=>{ const t = a<6?'4 mg (sachê ou comprimido mastigável)':(a<15?'5 mg (comprimido mastigável)':'10 mg (comprimido)');
    return { title:`Montelucaste ${t.split(' ')[0]} mg`, inst:`Dar ${t} VO 1x/dia, à noite.\n• Orientar família sobre pesadelos, agitação e alterações de humor.` }; } });

D({ id:'mgso4', cat:'respiratorio', acc:'SUSH', route:'Uso Intravenoso',
  name:'Sulfato de magnésio 50% (500 mg/mL)', ind:'Crise grave refratária à 1ª hora (≥ 2–6 anos)',
  min:{a:2, txt:'Evidência sobretudo ≥ 6 anos; considerar 2–5 anos com cautela'},
  calc:(w)=>{ const mg=cap(w*50,2000); return { title:'Sulfato de magnésio 50% — EV',
    inst:`Fazer ${nf(mg/500,2)} mL (${nf(mg,0)} mg = 50 mg/kg; faixa 25–75; máx. 2 g) diluído em 50 mL SF 0,9%, EV em 20 min.\n• Monitorar PA, reflexos e FR. Antídoto: gluconato de cálcio.` }; } });

D({ id:'adrenalina_neb', cat:'respiratorio', acc:'SUS', route:'Uso Inalatório',
  name:'L-adrenalina 1 mg/mL (nebulização)', ind:'Crupe moderado/grave (estridor em repouso)',
  calc:(w)=>{ const ml=cap(w*0.5,5); return { title:'Adrenalina 1 mg/mL (1:1.000) — nebulização',
    inst:`Nebulizar ${nf(ml,1)} mL (0,5 mL/kg; máx. 5 mL) puro ou com SF até 5 mL, com O₂.\n• Pode repetir a cada 20 min se necessário. Observar ≥ 2–3 h após (efeito rebote).` }; } });

D({ id:'salina_3_neb', cat:'respiratorio', acc:'SUSH', route:'Uso Inalatório',
  name:'NaCl 3% nebulização', ind:'Bronquiolite internada (opcional, AAP: não na emergência)',
  calc:()=>({ title:'Solução salina 3% — nebulização',
    inst:`Preparo: 1,5 mL NaCl 20% + 8,5 mL AD = 10 mL a 3%.\n• Nebulizar 4 mL de 8/8 h (somente pacientes internados).\n• Suspender se broncoespasmo.` }) });

D({ id:'lavagem_nasal', cat:'respiratorio', acc:'SUS', route:'Uso Nasal',
  name:'Soro fisiológico 0,9% nasal (lavagem)', ind:'IVAS, bronquiolite, rinite, sinusite',
  calc:(w,a)=>{ const t = a<0.5?'1 mL (conta-gotas/seringa) em cada narina':(a<2?'2–3 mL em cada narina com seringa (sem agulha)':'5–10 mL em cada narina com seringa ou frasco de alto volume');
    return { title:'Soro fisiológico 0,9% — lavagem nasal', inst:`Aplicar ${t}, 3 a 6 vezes ao dia e antes das mamadas/refeições.\n• Cabeça levemente inclinada para frente; aspirar secreção se necessário.` }; } });

D({ id:'budesonida_nasal', cat:'respiratorio', acc:'SUS', route:'Uso Nasal',
  name:'Budesonida nasal 32 ou 50 mcg/jato', ind:'Rinite alérgica persistente · SUS (≥ 6 anos)',
  min:{a:6, txt:'Bula SUS: a partir de 6 anos'},
  calc:()=>({ title:'Budesonida 32 mcg/jato — spray nasal',
    inst:`Aplicar 1–2 jatos em cada narina 1x/dia (máx. 256 mcg/dia) por 30–60 dias; reduzir à menor dose eficaz.\n• Direcionar o jato para fora do septo.` }) });

D({ id:'mometasona_nasal', cat:'respiratorio', acc:'PART', route:'Uso Nasal',
  name:'Mometasona nasal 50 mcg/jato', ind:'Rinite alérgica — menor biodisponibilidade sistêmica · ≥ 2 anos',
  min:{a:2, txt:'≥ 2 anos'},
  calc:(w,a)=>({ title:'Mometasona 50 mcg/jato — spray nasal',
    inst:`Aplicar ${a<12?'1 jato':'2 jatos'} em cada narina 1x/dia por 30–60 dias.` }) });

// ---------------- CORTICOIDES ----------------
D({ id:'prednisolona', cat:'corticoides', acc:'SUS', route:'Uso Oral',
  name:'Prednisolona 3 mg/mL (fosfato sódico)', ind:'Crise de asma, crupe (alternativa), urticária intensa',
  calc:(w,a)=>{ const mx = a<2?20:(a<6?30:40); const mg=cap(w*1.5,mx); return { title:'Prednisolona 3 mg/mL — solução oral',
    inst:`Dar ${nf(mg/3,1)} mL VO 1x/dia pela manhã por 3–5 dias (${nf(mg,0)} mg; 1–2 mg/kg/dia).\n• Máx. GINA: < 2 a 20 mg; 2–5 a 30 mg; 6–11 a 40 mg; adolescentes 50 mg.\n• Sem necessidade de desmame se ≤ 7 dias.` }; } });

D({ id:'prednisolona_gotas', cat:'corticoides', acc:'PART', route:'Uso Oral',
  name:'Prednisolona gotas 11 mg/mL', ind:'Mesma indicação, em gotas',
  calc:(w,a)=>{ const mx = a<2?20:(a<6?30:40); const mg=cap(w*1.1,mx); return { title:'Prednisolona 11 mg/mL — gotas (1 gota ≈ 0,55 mg)',
    inst:`Dar ${gts(mg/0.55)} gotas VO 1x/dia por 3–5 dias (≈ ${nf(mg,0)} mg; 2 gotas/kg ≈ 1,1 mg/kg).` }; } });

D({ id:'prednisona', cat:'corticoides', acc:'SUS', route:'Uso Oral',
  name:'Prednisona 5 mg / 20 mg comprimido', ind:'Para quem engole comprimido',
  calc:(w)=>{ const mg=cap(half(w*1/5)*5,40); return { title:'Prednisona — comprimido',
    inst:`Dar ${nf(mg,0)} mg VO 1x/dia pela manhã por 3–5 dias (≈ 1 mg/kg; até 2 mg/kg, máx. 40–60 mg).` }; } });

D({ id:'dexa_vo', cat:'corticoides', acc:'SUS', route:'Uso Oral',
  name:'Dexametasona elixir 0,1 mg/mL', ind:'Crupe (dose única), anti-inflamatório',
  calc:(w)=>{ const mg=cap(w*0.6,16), mgL=cap(w*0.15,16); return { title:'Dexametasona 0,1 mg/mL — elixir',
    inst:`Crupe: dar ${nf(mg*10,0)} mL VO dose única (0,6 mg/kg; máx. 16 mg).\n• Crupe leve: 0,15 mg/kg = ${nf(mgL*10,0)} mL é suficiente.\n• Volume alto: pode usar a ampola 4 mg/mL por VO.` }; } });

D({ id:'dexa_inj', cat:'corticoides', acc:'SUS', route:'Uso Intramuscular',
  name:'Dexametasona 4 mg/mL injetável', ind:'Crupe (IM/EV/VO), meningite bacteriana (adjuvante)',
  calc:(w)=>{ const mg=cap(w*0.6,16), mgM=cap(w*0.15,10); return { title:'Dexametasona 4 mg/mL — ampola',
    inst:`Crupe: ${nf(mg/4,2)} mL (${nf(mg,1)} mg = 0,6 mg/kg; máx. 16 mg) IM ou EV dose única.\nMeningite (> 6 semanas, Hib/pneumococo): ${nf(mgM/4,2)} mL (0,15 mg/kg) EV 6/6 h por 2–4 dias, antes ou com a 1ª dose de antibiótico.` }; },
  v:{ crupe:(w)=>({ title:'Dexametasona 4 mg/mL — crupe',
      inst:`Fazer ${nf(cap(w*0.6,16)/4,2)} mL (${nf(cap(w*0.6,16),1)} mg = 0,6 mg/kg; máx. 16 mg) IM, EV ou VO, dose única.` }) } });

D({ id:'hidrocortisona_asma', cat:'corticoides', acc:'SUSH', route:'Uso Intravenoso',
  name:'Hidrocortisona 100/500 mg (asma, anafilaxia)', ind:'Crise grave sem via oral',
  calc:(w)=>{ const mg=cap(w*5,100); return { title:'Hidrocortisona — EV',
    inst:`Reconstituir 100 mg em 2 mL AD (50 mg/mL).\n• Fazer ${nf(mg/50,1)} mL (${nf(mg,0)} mg = 5 mg/kg; máx. 100 mg) EV de 6/6 h.\n• Ataque opcional na asma grave: 10 mg/kg (máx. 250 mg).` }; } });

D({ id:'metilpred', cat:'corticoides', acc:'SUSH', route:'Uso Intravenoso',
  name:'Metilprednisolona 125/500 mg', ind:'Asma grave, anafilaxia refratária',
  calc:(w)=>{ const a1=cap(w*2,60), m=cap(w*1,60); return { title:'Metilprednisolona — EV',
    inst:`Ataque: ${nf(a1,0)} mg EV (2 mg/kg; máx. 60 mg).\nManutenção: ${nf(m,0)} mg EV de 12/12 h (1 mg/kg/dose) ou 0,5 mg/kg 6/6 h (máx. 120 mg/dia).` }; } });

// ---------------- ANTI-HISTAMÍNICOS ----------------
D({ id:'loratadina', cat:'antihistaminicos', acc:'SUS', route:'Uso Oral',
  name:'Loratadina 1 mg/mL xarope', ind:'Rinite, urticária, prurido — 2ª geração disponível no SUS · ≥ 2 anos',
  min:{a:2, txt:'Bula: ≥ 2 anos'},
  calc:(w)=>{ const ml = w<=30?5:10; return { title:'Loratadina 1 mg/mL — xarope',
    inst:`Dar ${ml} mL VO 1x/dia (${w<=30?'≤ 30 kg: 5 mg':'> 30 kg: 10 mg'}) por 5–14 dias ou enquanto houver sintomas.` }; } });

D({ id:'dexclorfeniramina', cat:'antihistaminicos', acc:'SUS', route:'Uso Oral',
  name:'Dexclorfeniramina 2 mg/5 mL', ind:'Prurido/urticária quando sedação é desejável · ≥ 2 anos',
  min:{a:2, txt:'Contraindicado < 2 anos'},
  calc:(w,a)=>{ const ml = a<6?1.25:(a<12?2.5:5); return { title:'Dexclorfeniramina 0,4 mg/mL — solução oral',
    inst:`Dar ${nf(ml,2)} mL VO de 8/8 h por 5 dias (2–6 a: 1,25 mL; 6–12 a: 2,5 mL; > 12 a: 5 mL).\n• 1ª geração: sonolência; evitar em convulsão e asma descompensada.` }; } });

D({ id:'desloratadina', cat:'antihistaminicos', acc:'PART', route:'Uso Oral',
  name:'Desloratadina 0,5 mg/mL', ind:'Rinite/urticária · ≥ 6 meses',
  min:{a:0.5, txt:'≥ 6 meses'},
  calc:(w,a)=>{ const ml = a<1?2:(a<6?2.5:(a<12?5:10)); return { title:'Desloratadina 0,5 mg/mL — xarope',
    inst:`Dar ${nf(ml,1)} mL VO 1x/dia (6–11 m: 2 mL; 1–5 a: 2,5 mL; 6–11 a: 5 mL; ≥ 12 a: 10 mL).` }; } });

D({ id:'cetirizina', cat:'antihistaminicos', acc:'PART', route:'Uso Oral',
  name:'Cetirizina 1 mg/mL', ind:'Urticária aguda (leve vantagem), rinite · ≥ 6 meses',
  min:{a:0.5, txt:'≥ 6 meses (FDA); bula BR ≥ 2 anos'},
  calc:(w,a)=>{ const t = a<2?'2,5 mL 1x/dia (12–23 m pode 12/12 h)':(a<6?'2,5 mL de 12/12 h':'5 mL de 12/12 h (ou 10 mL 1x/dia)');
    return { title:'Cetirizina 1 mg/mL — solução oral', inst:`Dar ${t} VO enquanto houver sintomas.` }; } });

D({ id:'hidroxizina', cat:'antihistaminicos', acc:'MISTO', route:'Uso Oral',
  name:'Hidroxizina 2 mg/mL', ind:'Prurido intenso (varicela, dermatite) · ≥ 6 meses',
  min:{a:0.5, txt:'≥ 6 meses'},
  calc:(w)=>{ const mg=cap(w*0.5,25); return { title:'Hidroxizina 2 mg/mL (10 mg/5 mL) — xarope',
    inst:`Dar ${nf(mg/2,1)} mL VO de 8/8 h (${nf(mg,1)} mg = 0,5 mg/kg/dose; máx. 25 mg/dose) por 5 dias.\n• Sedativo; consta em algumas REMUMEs.` }; } });

D({ id:'prometazina_inj', cat:'antihistaminicos', acc:'SUSH', route:'Uso Intramuscular',
  name:'Prometazina 25 mg/mL (IM)', ind:'Reação alérgica no PS · ⚠ proibido < 2 anos',
  min:{a:2, txt:'Contraindicado < 2 anos (depressão respiratória fatal — FDA)'},
  calc:(w)=>{ const mg=cap(w*0.5,25); return { title:'Prometazina 25 mg/mL — ampola',
    inst:`Aplicar ${nf(mg/25,2)} mL (${nf(mg,1)} mg = 0,5 mg/kg; máx. 25 mg) IM profundo.\n• Não é tratamento da anafilaxia (adrenalina primeiro).` }; } });

D({ id:'difenidramina_inj', cat:'antihistaminicos', acc:'SUSH', route:'Uso Intravenoso',
  name:'Difenidramina 50 mg/mL', ind:'Urticária/reação alérgica, distonia por bromoprida/metoclopramida',
  calc:(w)=>{ const mg=cap(w*1,50); return { title:'Difenidramina 50 mg/mL — ampola',
    inst:`Fazer ${nf(mg/50,2)} mL (${nf(mg,0)} mg = 1 mg/kg; máx. 50 mg) EV lento ou IM.` }; } });
