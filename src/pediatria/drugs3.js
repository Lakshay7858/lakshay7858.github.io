// ---------------- TGI, DIARREIA & CONSTIPAÇÃO ----------------
D({ id:'sro', cat:'tgi', acc:'SUS', route:'Uso Oral',
  name:'Sais de reidratação oral (osmolaridade reduzida)', ind:'Diarreia/vômitos — Plano A (prevenção) e Plano B (desidratação)',
  calc:(w,a)=>{ const pA = a<1?'50–100 mL':(a<10?'100–200 mL':'à vontade'); return { title:'Sais de reidratação oral — envelope',
    inst:`Diluir 1 envelope em 1 L de água filtrada/fervida (usar em até 24 h).\n• Plano A: oferecer ${pA} após cada evacuação líquida ou vômito.\n• Plano B (com desidratação): ${nf(w*50,0)}–${nf(w*100,0)} mL em 4–6 h (50–100 mL/kg) na unidade, em pequenas alíquotas a cada 1–2 min; reavaliar.` }; },
  v:{ planoA:(w,a)=>({ title:'Sais de reidratação oral — Plano A (domicílio)',
      inst:`Diluir 1 envelope em 1 L de água filtrada/fervida.\n• Oferecer ${a<1?'50–100 mL':(a<10?'100–200 mL':'à vontade')} após cada evacuação líquida ou vômito, em pequenos goles.\n• Manter aleitamento e alimentação habitual.` }),
      planoB:(w)=>({ title:'Sais de reidratação oral — Plano B (na unidade)',
      inst:`Oferecer ${nf(w*50,0)}–${nf(w*100,0)} mL (50–100 mL/kg) em 4–6 h, em colheradas/goles a cada 1–2 min.\n• Se vômitos: aguardar 10 min e recomeçar mais devagar; considerar ondansetrona.\n• Reavaliar a cada hora; ao hidratar, passar ao Plano A.` }) } });

D({ id:'zinco', cat:'tgi', acc:'SUS', route:'Uso Oral',
  name:'Sulfato de zinco 4 mg/mL (xarope)', ind:'Diarreia aguda e persistente (OMS/UNICEF, MS)',
  calc:(w,a)=>{ const mg = a<0.5?10:20; return { title:'Sulfato de zinco 4 mg/mL — xarope',
    inst:`Dar ${nf(mg/4,1)} mL VO 1x/dia por 10–14 dias (${mg} mg/dia; < 6 m: 10 mg; ≥ 6 m: 20 mg).\n• OMS 2024 sugere dose menor (5 mg/dia = 1,25 mL), com eficácia semelhante e menos vômitos.` }; } });

D({ id:'ondansetrona_vo', cat:'tgi', acc:'SUS', route:'Uso Oral',
  name:'Ondansetrona 4 mg orodispersível', ind:'Vômitos na GECA para viabilizar TRO · ≥ 6 meses / ≥ 8 kg',
  min:{a:0.5, w:8, txt:'≥ 6 meses e ≥ 8 kg'},
  calc:(w)=>{ const t = w<15?'2 mg (½ comprimido)':(w<30?'4 mg (1 comprimido)':'8 mg (2 comprimidos)'); return { title:'Ondansetrona 4 mg — comprimido orodispersível',
    inst:`Dar ${t} sobre a língua, dose única no PS (≈ 0,15 mg/kg); pode repetir 8/8 h se vômitos (máx. 2–3 dias).\n• Aguardar 15–30 min e reiniciar SRO. Atenção a QT longo.` }; } });

D({ id:'ondansetrona_ev', cat:'tgi', acc:'SUSH', route:'Uso Intravenoso',
  name:'Ondansetrona 2 mg/mL (EV)', ind:'Vômitos sem via oral',
  calc:(w)=>{ const mg=cap(w*0.15,4); return { title:'Ondansetrona 2 mg/mL — ampola',
    inst:`Fazer ${nf(mg/2,2)} mL (${nf(mg,1)} mg = 0,15 mg/kg; máx. 4 mg) EV lento, diluído em 20–50 mL SF, em 15 min; até 8/8 h.` }; } });

D({ id:'bromoprida', cat:'tgi', acc:'PART', route:'Uso Oral',
  name:'Bromoprida gotas 4 mg/mL', ind:'Náuseas · ≥ 1 ano · preferir ondansetrona (extrapiramidal)',
  min:{a:1, txt:'≥ 1 ano'},
  calc:(w)=>{ const g=gts(w,58); return { title:'Bromoprida 4 mg/mL — gotas',
    inst:`Dar ${g} gotas VO de 8/8 h se náuseas/vômitos (1 gota/kg; 0,5–1 mg/kg/dia; máx. 58 gotas).\n• Risco de distonia aguda — se ocorrer: difenidramina/biperideno.` }; } });

D({ id:'racecadotrila', cat:'tgi', acc:'PART', route:'Uso Oral',
  name:'Racecadotrila sachê 10 / 30 mg', ind:'Antissecretor na diarreia aguda (ESPGHAN: pode considerar) · ≥ 3 meses',
  min:{a:0.25, txt:'≥ 3 meses'},
  calc:(w)=>{ const t = w<9?'10 mg (1 sachê infantil)':(w<13?'20 mg (2 sachês infantis)':(w<27?'30 mg (1 sachê criança)':'60 mg (2 sachês criança)'));
    return { title:'Racecadotrila — sachê', inst:`Dar ${t} VO de 8/8 h até 2 evacuações normais (máx. 7 dias) (≈ 1,5 mg/kg/dose).\n• Adjuvante: não substitui a reidratação.` }; } });

D({ id:'sboulardii', cat:'tgi', acc:'PART', route:'Uso Oral',
  name:'Saccharomyces boulardii 200–250 mg', ind:'Probiótico na GECA (ESPGHAN 2023: considerar; OMS 2024: não sugere)',
  calc:()=>({ title:'Saccharomyces boulardii — sachê/cápsula',
    inst:`Dar 250 mg (1 sachê) VO de 12/12 h por 5–7 dias (250–750 mg/dia).\n• Evitar em imunossuprimidos e com cateter venoso central.` }) });

D({ id:'lactulose', cat:'tgi', acc:'SUS', route:'Uso Oral',
  name:'Lactulose 667 mg/mL', ind:'Constipação funcional — opção do SUS (liberada para lactentes)',
  calc:(w)=>{ const ml=cap(w*0.5,30); return { title:'Lactulose 667 mg/mL — xarope',
    inst:`Dar ${nf(ml,1)} mL VO de 12/12 h (1 mL/kg/dia; faixa 1–2 mL/kg/dia; máx. 60 mL/dia).\n• Ajustar para 1–2 evacuações pastosas/dia. Pode causar gases/cólica.` }; } });

D({ id:'peg', cat:'tgi', acc:'PART', route:'Uso Oral',
  name:'Polietilenoglicol 3350/4000 (pó)', ind:'Constipação funcional — 1ª linha ESPGHAN/NASPGHAN',
  min:{a:0.5, txt:'Bula ≥ 6 meses (estudos ≥ 1 ano mais robustos)'},
  calc:(w)=>{ const m=cap(w*0.6,17), d=cap(w*1.5,100); return { title:'PEG 3350/4000 — pó para solução oral',
    inst:`Manutenção: ${nf(m,1)} g VO 1x/dia (0,4–0,8 g/kg/dia; máx. 17 g/dia) diluído em 120–240 mL de água/suco.\n• Desimpactação: ${nf(d,0)} g/dia (1–1,5 g/kg/dia) por 3–6 dias.\n• Ajustar para 1–2 evacuações pastosas/dia; manter ≥ 2 meses.` }; } });

D({ id:'oleo_mineral', cat:'tgi', acc:'SUS', route:'Uso Oral',
  name:'Óleo mineral', ind:'Constipação · ≥ 1 ano, sem risco de aspiração',
  min:{a:1, txt:'Não usar < 1 ano, disfagia, DRGE grave ou neuropatas (pneumonia lipoídica)'},
  calc:(w)=>{ const ml=cap(w*1,30); return { title:'Óleo mineral — uso oral',
    inst:`Dar ${nf(ml,0)} mL VO 1x/dia, longe das refeições (1–3 mL/kg/dia; máx. 30 mL/dia de manutenção).\n• Nunca deitar a criança logo após (risco de aspiração).` }; } });

D({ id:'omeprazol', cat:'tgi', acc:'SUS', route:'Uso Oral',
  name:'Omeprazol 10 / 20 mg cápsula', ind:'DRGE com esofagite, úlcera, H. pylori',
  calc:(w)=>{ const mg = w<10?5:(w<20?10:20); return { title:'Omeprazol — cápsula',
    inst:`Dar ${mg} mg VO 1x/dia, 30 min antes do café (≈ 1 mg/kg/dia).\n• Para doses fracionadas: abrir a cápsula e misturar os grânulos em alimento ácido (não triturar).` }; } });

// ---------------- ANTIPARASITÁRIOS & ECTOPARASITOSES ----------------
D({ id:'albendazol', cat:'antiparasitarios', acc:'SUS', route:'Uso Oral',
  name:'Albendazol 400 mg (40 mg/mL ou cp mastigável)', ind:'Ascaridíase, ancilostomíase, tricuríase, oxiurose; larva migrans',
  min:{a:1, txt:'1–2 anos: 200 mg (5 mL); ≥ 2 anos: 400 mg'},
  calc:(w,a)=>{ const d = a<2?'5 mL (200 mg)':'10 mL (400 mg) ou 1 comprimido mastigável'; return { title:'Albendazol 40 mg/mL — suspensão oral',
    inst:`Dar ${d} VO em dose única.\n• Oxiurose: repetir em 2 semanas e tratar contactantes.\n• Larva migrans: 400 mg 1x/dia por 3 dias. Estrongiloidíase/giardíase: 400 mg 1x/dia por 5 dias (ivermectina/metronidazol são preferíveis).` }; },
  v:{ larva:(w,a)=>({ title:'Albendazol 400 mg — larva migrans',
      inst:`Dar ${a<2?'200 mg (5 mL)':'400 mg (10 mL ou 1 cp)'} VO 1x/dia por 3 dias (até 7 dias se extensa).` }) } });

D({ id:'mebendazol', cat:'antiparasitarios', acc:'MISTO', route:'Uso Oral',
  name:'Mebendazol 100 mg/5 mL', ind:'Helmintíases, oxiurose · ≥ 1 ano',
  min:{a:1, txt:'≥ 1 ano'},
  calc:()=>({ title:'Mebendazol 100 mg/5 mL — suspensão oral',
    inst:`Dar 5 mL (100 mg) VO de 12/12 h por 3 dias; repetir em 2 semanas.\n• Oxiurose: 5 mL dose única, repetir em 2 semanas.` }) });

D({ id:'ivermectina', cat:'antiparasitarios', acc:'SUS', route:'Uso Oral',
  name:'Ivermectina 6 mg comprimido', ind:'Escabiose, pediculose, estrongiloidíase, larva migrans · ≥ 15 kg',
  min:{w:15, txt:'Bula: ≥ 15 kg (e ≥ 5 anos)'},
  calc:(w)=>{ const c = w<15?0:(w<25?0.5:(w<36?1:(w<51?1.5:(w<66?2:(w<80?2.5:3)))));
    return { title:'Ivermectina 6 mg — comprimido', inst:`Dar ${c? nf(c,1)+' comprimido(s)':'— (peso < 15 kg: não indicada)'} VO em dose única, em jejum (≈ 200 mcg/kg).\n• Escabiose/pediculose: repetir em 7–14 dias. Tratar contactantes.` }; } });

D({ id:'nitazoxanida', cat:'antiparasitarios', acc:'PART', route:'Uso Oral',
  name:'Nitazoxanida 20 mg/mL', ind:'Giardíase, criptosporidiose, amebíase · ≥ 1 ano',
  min:{a:1, txt:'≥ 1 ano'},
  calc:(w,a)=>{ const t = a<4?'5 mL (100 mg)':(a<12?'10 mL (200 mg)':'500 mg (comprimido ou 25 mL)'); return { title:'Nitazoxanida 20 mg/mL — suspensão oral',
    inst:`Dar ${t} VO de 12/12 h por 3 dias, com alimento.` }; } });

D({ id:'secnidazol', cat:'antiparasitarios', acc:'PART', route:'Uso Oral',
  name:'Secnidazol 30 mg/kg (suspensão)', ind:'Giardíase/amebíase em dose única',
  calc:(w)=>{ const mg=cap(w*30,2000); return { title:'Secnidazol — dose única',
    inst:`Dar ${nf(mg,0)} mg VO (30 mg/kg; máx. 2 g) em dose única, após o jantar.` }; } });

D({ id:'praziquantel', cat:'antiparasitarios', acc:'SUSE', route:'Uso Oral',
  name:'Praziquantel 600 mg', ind:'Esquistossomose (Programa MS), teníase',
  calc:(w)=>{ const mg=w*60, mt=w*10; return { title:'Praziquantel 600 mg — comprimido',
    inst:`Esquistossomose (criança): ${nf(mg,0)} mg VO dose única (60 mg/kg) → ${nf(half(mg/600),1)} comprimido(s).\nTeníase: ${nf(mt,0)} mg VO dose única (10 mg/kg).` }; } });

D({ id:'permetrina5', cat:'antiparasitarios', acc:'SUS', route:'Uso Tópico',
  name:'Permetrina 5% loção', ind:'Escabiose — 1ª escolha · ≥ 2 meses',
  min:{a:1/6, txt:'≥ 2 meses (< 2 meses: enxofre precipitado 5–10%)'},
  calc:(w,a)=>({ title:'Permetrina 5% — loção',
    inst:`Aplicar à noite em todo o corpo ${a<2?'(incluindo couro cabeludo, face e orelhas, poupando olhos e boca)':'do pescoço aos pés'}, inclusive entre dedos, sob unhas e genitais.\n• Retirar com banho após 8–14 h. Repetir em 7 dias.\n• Tratar todos os contactantes; lavar roupas de cama/uso a ≥ 60 °C.` }) });

D({ id:'permetrina1', cat:'antiparasitarios', acc:'SUS', route:'Uso Tópico',
  name:'Permetrina 1% loção/xampu', ind:'Pediculose · ≥ 2 meses',
  min:{a:1/6, txt:'≥ 2 meses'},
  calc:()=>({ title:'Permetrina 1% — loção capilar',
    inst:`Lavar o cabelo, secar com toalha e aplicar até encharcar couro cabeludo e cabelo; deixar 10 min e enxaguar.\n• Passar pente fino. Repetir em 7–10 dias.` }) });

D({ id:'dimeticona4', cat:'antiparasitarios', acc:'PART', route:'Uso Tópico',
  name:'Dimeticona 4% loção', ind:'Pediculose (mecanismo físico, sem resistência) · ≥ 6 meses',
  min:{a:0.5, txt:'≥ 6 meses'},
  calc:()=>({ title:'Dimeticona 4% — loção',
    inst:`Aplicar no cabelo seco até cobrir todo o couro cabeludo; deixar 8 h (à noite) e lavar com xampu.\n• Repetir em 7 dias. Pente fino.` }) });

D({ id:'enxofre', cat:'antiparasitarios', acc:'PART', route:'Uso Tópico',
  name:'Enxofre precipitado 5–10% em vaselina (manipulado)', ind:'Escabiose em < 2 meses e gestantes',
  calc:()=>({ title:'Enxofre precipitado 5% em vaselina — manipulado',
    inst:`Aplicar em todo o corpo à noite por 3 noites consecutivas; banho 24 h após a última aplicação.\n• Repetir o ciclo após 1 semana se necessário.` }) });

// ---------------- ANTIVIRAIS & ANTIFÚNGICOS ----------------
D({ id:'oseltamivir', cat:'antiinfec', acc:'SUSE', route:'Uso Oral',
  name:'Oseltamivir 30 / 45 / 75 mg', ind:'Influenza: SRAG ou SG com fator de risco (< 5 anos é grupo de risco) — iniciar ≤ 48 h',
  calc:(w,a)=>{ let mg, txt;
    if (a < 0.75) { mg = w*3; txt = `${nf(mg,1)} mg (3 mg/kg)`; }
    else if (a < 1) { mg = w*3.5; txt = `${nf(mg,1)} mg (3,5 mg/kg)`; }
    else { mg = w<=15?30:(w<=23?45:(w<=40?60:75)); txt = `${mg} mg`; }
    return { title:'Oseltamivir — cápsula (preparo 15 mg/mL)',
    inst:`Dar ${txt} VO de 12/12 h por 5 dias.\n• Preparo: abrir cápsula de 75 mg em 5 mL de água (15 mg/mL) → ${nf(mg/15,1)} mL por dose.\n• Iniciar mesmo após 48 h em SRAG/grupo de risco. Disponível nas UBS (Componente Estratégico).` }; } });

D({ id:'aciclovir_vo', cat:'antiinfec', acc:'MISTO', route:'Uso Oral',
  name:'Aciclovir 200 mg cp (SUS) / suspensão 200 mg/5 mL', ind:'Varicela (≥ 12 a, risco), gengivoestomatite herpética',
  calc:(w)=>{ const mg=cap(w*20,800), mh=cap(w*15,200); return { title:'Aciclovir — via oral',
    inst:`Varicela: ${nf(mg,0)} mg VO 4x/dia por 5 dias (20 mg/kg/dose; máx. 800 mg/dose) — iniciar em até 24 h do exantema.\nGengivoestomatite herpética: ${nf(mh,0)} mg VO 5x/dia por 7 dias (15 mg/kg/dose; máx. 200 mg).\n• SUS: comprimido 200 mg; suspensão é particular.` }; },
  v:{ varicela:(w)=>({ title:'Aciclovir — varicela',
      inst:`Dar ${nf(cap(w*20,800),0)} mg VO 4x/dia por 5 dias (20 mg/kg/dose; máx. 800 mg/dose), iniciar ≤ 24 h do exantema.` }) } });

D({ id:'nistatina_oral', cat:'antiinfec', acc:'SUS', route:'Uso Oral',
  name:'Nistatina suspensão 100.000 UI/mL', ind:'Candidíase oral (monilíase)',
  calc:(w,a)=>{ const t = a<1?'1 mL em cada lado da boca (2 mL)':'2–3 mL em cada lado da boca (4–6 mL)'; return { title:'Nistatina 100.000 UI/mL — suspensão oral',
    inst:`Aplicar ${t} de 6/6 h, com gaze/seringa nas lesões, por 7–14 dias (manter 48 h após desaparecer).\n• Tratar mamilos/bicos e ferver chupetas.` }; } });

D({ id:'miconazol_gel', cat:'antiinfec', acc:'PART', route:'Uso Oral',
  name:'Miconazol gel oral 20 mg/g', ind:'Candidíase oral — maior taxa de cura que nistatina · ≥ 4 meses',
  min:{a:0.33, txt:'≥ 4 meses (risco de engasgo)'},
  calc:(w,a)=>({ title:'Miconazol 20 mg/g — gel oral',
    inst:`Aplicar ${a<2?'1,25 mL (¼ da colher-medida)':'2,5 mL (½ colher-medida)'} 4x/dia nas lesões, por 7 dias após a cura (em pequenas porções, longe da garganta).` }) });

D({ id:'fluconazol', cat:'antiinfec', acc:'SUS', route:'Uso Oral',
  name:'Fluconazol 10 mg/mL (suspensão) / 150 mg', ind:'Candidíase orofaríngea refratária, esofagite, vulvovaginal (adolescente)',
  calc:(w)=>{ const d1=cap(w*6,400), dm=cap(w*3,200); return { title:'Fluconazol 10 mg/mL — suspensão oral',
    inst:`D1: ${nf(d1/10,1)} mL (${nf(d1,0)} mg = 6 mg/kg); depois ${nf(dm/10,1)} mL (3 mg/kg) 1x/dia por 7–14 dias.\n• Vulvovaginal (adolescente): 150 mg VO dose única.` }; } });

D({ id:'griseofulvina', cat:'antiinfec', acc:'MISTO', route:'Uso Oral',
  name:'Griseofulvina 500 mg', ind:'Tinea capitis · ≥ 2 anos',
  min:{a:2, txt:'≥ 2 anos'},
  calc:(w)=>{ const mg=cap(w*20,1000); return { title:'Griseofulvina — micronizada',
    inst:`Dar ${nf(mg,0)} mg VO 1x/dia com alimento gorduroso (20–25 mg/kg/dia; máx. 1 g) por 6–8 semanas.` }; } });

D({ id:'terbinafina', cat:'antiinfec', acc:'PART', route:'Uso Oral',
  name:'Terbinafina 250 mg', ind:'Tinea capitis (Trichophyton) — ciclo mais curto',
  calc:(w)=>{ const t = w<20?'62,5 mg (¼ cp)':(w<=40?'125 mg (½ cp)':'250 mg (1 cp)'); return { title:'Terbinafina 250 mg — comprimido',
    inst:`Dar ${t} VO 1x/dia por 4–6 semanas.` }; } });
