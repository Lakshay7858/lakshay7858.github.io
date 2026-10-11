// =====================================================================
// UTILITÁRIOS DE CÁLCULO
// =====================================================================
const nf = (x, d = 1) => {
  const v = Number(x);
  if (!isFinite(v)) return '--';
  const p = Math.pow(10, d);
  return (Math.round(v * p) / p).toLocaleString('pt-BR', { maximumFractionDigits: d });
};
const cap = (v, m) => Math.min(v, m);
const flo = (v, m) => Math.max(v, m);
const gts = (v, max) => Math.max(1, Math.round(max ? Math.min(v, max) : v));
const half = v => Math.round(v * 2) / 2; // arredonda p/ 0,5
const idade = a => a < 1/12 ? `${Math.round(a*365)} dias` : (a < 2 ? `${Math.round(a*12)} meses` : `${nf(a,1)} anos`);

// Acesso / disponibilidade
// SUS = Componente Básico (RENAME 2024) — UBS/farmácia municipal
// SUSH = Uso hospitalar / urgência na rede SUS
// SUSE = Componente Estratégico (programas do MS)
// SUSESP = Componente Especializado (PCDT, via farmácia de alto custo)
// MISTO = parte das apresentações no SUS / consta em algumas REMUMEs
// PART = Particular / pago (não consta na RENAME)
const ACESSO = {
  SUS:    { lbl: 'SUS · RENAME básico', cls: 'acc-sus' },
  SUSH:   { lbl: 'SUS · hospitalar/urgência', cls: 'acc-hosp' },
  SUSE:   { lbl: 'SUS · estratégico (MS)', cls: 'acc-estr' },
  SUSESP: { lbl: 'SUS · especializado (PCDT)', cls: 'acc-estr' },
  MISTO:  { lbl: 'SUS parcial / REMUME', cls: 'acc-misto' },
  PART:   { lbl: 'Particular / pago', cls: 'acc-part' }
};

const CATS = [
  ['todos', 'Todos'],
  ['sintomaticos', 'Febre, dor & cólica'],
  ['antimicrobianos', 'Antibióticos VO'],
  ['atb_iv', 'Antibióticos IV/IM'],
  ['respiratorio', 'Respiratório & asma'],
  ['corticoides', 'Corticoides'],
  ['antihistaminicos', 'Anti-histamínicos'],
  ['tgi', 'TGI, diarreia & constipação'],
  ['antiparasitarios', 'Antiparasitários & ectoparasitoses'],
  ['antiinfec', 'Antivirais & antifúngicos'],
  ['topicos', 'Pele, olhos & ouvidos'],
  ['puericultura', 'Puericultura & prevenção'],
  ['convulsao', 'Crises epilépticas'],
  ['urgencia_pcr', 'PCR, choque & anafilaxia'],
  ['sedacao_sri', 'Sedação, analgesia & SRI'],
  ['intox', 'Intoxicações & antídotos'],
  ['disturbios_he', 'Eletrólitos & hidratação EV'],
  ['cetoacidose_endocrino', 'CAD & endócrino'],
  ['nutricao_parenteral', 'Nutrição & desnutrição']
];

// =====================================================================
// BASE FARMACOLÓGICA
// calc(w, a) -> { title, inst }   (w = peso kg; a = idade em anos)
// v: variantes nomeadas usadas pela aba SUS × Ideal
// =====================================================================
const DRUG_DATA = [];
const D = o => { DRUG_DATA.push(o); return o; };

// ---------------- FEBRE, DOR & CÓLICA ----------------
D({ id:'dipirona_gotas', cat:'sintomaticos', acc:'SUS', route:'Uso Oral',
  name:'Dipirona gotas 500 mg/mL', ind:'Febre e dor leve a moderada · ≥ 3 meses e ≥ 5 kg',
  min:{a:0.25, w:5, txt:'Bula: não usar < 3 meses ou < 5 kg'},
  calc:(w)=>{ const g=gts(w*0.6,40); return { title:'Dipirona 500 mg/mL — solução oral (gotas)',
    inst:`Dar ${g} gotas VO de 6/6 h se dor ou febre (Tax ≥ 37,8 °C).\n• 1 gota = 25 mg → ${nf(g*25,0)} mg/dose (≈ 15 mg/kg; faixa 10–25 mg/kg/dose).\n• Máx. 40 gotas (1 g)/dose e 4 doses/dia.` }; } });

D({ id:'dipirona_inj', cat:'sintomaticos', acc:'SUSH', route:'Uso Intravenoso',
  name:'Dipirona injetável 500 mg/mL (IM/EV)', ind:'Febre/dor no PS quando VO não é possível',
  min:{a:0.25, w:5, txt:'Evitar < 3 meses / < 5 kg'},
  calc:(w)=>{ const mg=cap(w*20,1000); return { title:'Dipirona 500 mg/mL — ampola 2 mL',
    inst:`Aspirar ${nf(mg/500,2)} mL (${nf(mg,0)} mg = 20 mg/kg; máx. 1 g) e diluir em 10 mL de AD/SF 0,9%.\n• EV lento (≥ 5 min) ou IM. Pode repetir 6/6 h.\n• Risco de hipotensão se EV rápido.` }; } });

D({ id:'paracetamol_gotas', cat:'sintomaticos', acc:'SUS', route:'Uso Oral',
  name:'Paracetamol gotas 200 mg/mL', ind:'Febre e dor · pode desde o RN · 1ª escolha na dengue',
  calc:(w,a)=>{ const g=gts(w,35); return { title:'Paracetamol 200 mg/mL — solução oral (gotas)',
    inst:`Dar ${g} gotas VO de 6/6 h se dor ou febre.\n• 1 gota/kg ≈ 10–13 mg/kg/dose (gotas/mL varia por fabricante — conferir bula).\n• Máx. 35 gotas/dose, 5 doses/dia e 75 mg/kg/dia (4 g/dia).${w>=40?'\n• ≥ 40 kg: preferir comprimido 500–750 mg/dose.':''}` }; } });

D({ id:'paracetamol_susp', cat:'sintomaticos', acc:'PART', route:'Uso Oral',
  name:'Paracetamol suspensão 32 mg/mL (160 mg/5 mL)', ind:'Mesma indicação; melhor para lactentes (dose em mL)',
  calc:(w)=>{ const ml=cap(w*0.45,20); return { title:'Paracetamol 32 mg/mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO de 6/6 h se dor ou febre (≈ ${nf(ml*32,0)} mg ≈ 15 mg/kg/dose).\n• Máx. 5 doses/dia (75 mg/kg/dia).` }; } });

D({ id:'ibuprofeno_50', cat:'sintomaticos', acc:'SUS', route:'Uso Oral',
  name:'Ibuprofeno 50 mg/mL (gotas/suspensão)', ind:'Febre e dor · ≥ 6 meses · evitar na dengue/desidratação',
  min:{a:0.5, w:5, txt:'Usar a partir de 6 meses (SBP)'},
  calc:(w)=>{ const g=gts(w*2,40); return { title:'Ibuprofeno 50 mg/mL — gotas (1 gota = 5 mg)',
    inst:`Dar ${g} gotas VO de 6/6 a 8/8 h se dor ou febre (${nf(g*5,0)} mg ≈ 10 mg/kg/dose).\n• Máx. 40 gotas (200 mg)/dose e 40 mg/kg/dia.\n• Contraindicado em dengue suspeita, desidratação, doença renal ou sangramento.` }; } });

D({ id:'ibuprofeno_100', cat:'sintomaticos', acc:'PART', route:'Uso Oral',
  name:'Ibuprofeno 100 mg/mL gotas', ind:'Febre, dor e ação anti-inflamatória · ≥ 6 meses',
  min:{a:0.5, w:5, txt:'Usar a partir de 6 meses'},
  calc:(w)=>{ const g=gts(w,40); return { title:'Ibuprofeno 100 mg/mL — gotas (1 gota = 10 mg)',
    inst:`Dar ${g} gotas VO de 6/6 a 8/8 h se dor ou febre (${nf(g*10,0)} mg ≈ 10 mg/kg/dose).\n• Máx. 40 gotas (400 mg)/dose e 40 mg/kg/dia (2,4 g/dia).` }; } });

D({ id:'cetoprofeno', cat:'sintomaticos', acc:'PART', route:'Uso Oral',
  name:'Cetoprofeno gotas 20 mg/mL', ind:'Dor inflamatória · ≥ 1 ano',
  min:{a:1, txt:'Uso a partir de 1 ano'},
  calc:(w,a)=>{ const g = a>=12?50:(a>=7?25:gts(w,50)); return { title:'Cetoprofeno 20 mg/mL — gotas (1 gota = 1 mg)',
    inst:`Dar ${g} gotas VO de 8/8 h por até 5 dias (≈ 1 mg/kg/dose; 7–11 anos 25 gotas; > 11 anos 50 gotas).` }; } });

D({ id:'escopolamina', cat:'sintomaticos', acc:'MISTO', route:'Uso Oral',
  name:'Butilbrometo de escopolamina gotas 10 mg/mL', ind:'Cólica abdominal · evitar em lactentes',
  min:{a:1, txt:'Evitar em lactentes (< 1 ano)'},
  calc:(w,a)=>{ const g = a<6 ? gts(cap(w*0.6,20)) : (a<12?gts(cap(w*0.6,20)):20); return { title:'Escopolamina 10 mg/mL — gotas (1 gota = 0,5 mg)',
    inst:`Dar ${g} gotas VO de 8/8 h se cólica (≈ 0,3 mg/kg/dose).\n• 1–6 anos: máx. 10 mg/dose (20 gotas); > 6 anos: 10–20 mg/dose.\n• SUS: comprimido 10 mg e ampola 20 mg/mL; gotas geralmente particular.` }; } });

D({ id:'simeticona', cat:'sintomaticos', acc:'PART', route:'Uso Oral',
  name:'Simeticona gotas 75 mg/mL', ind:'Desconforto por gases (benefício modesto)',
  calc:(w,a)=>{ const g = a<2?5:(a<12?10:15); return { title:'Simeticona 75 mg/mL — gotas',
    inst:`Dar ${g} gotas VO de 8/8 h se desconforto por gases.\n• < 2 anos: 4–6 gotas; 2–12 anos: 6–12 gotas; > 12 anos: 13–16 gotas.` }; } });

D({ id:'tramadol_gotas', cat:'sintomaticos', acc:'PART', route:'Uso Oral',
  name:'Tramadol gotas 100 mg/mL', ind:'Dor moderada a intensa · ⚠ evitar < 12 anos',
  min:{a:12, txt:'FDA/ANVISA: evitar < 12 anos (depressão respiratória em metabolizadores ultrarrápidos)'},
  calc:(w)=>{ const mg=cap(w*1,100); const g=gts(mg/2.5); return { title:'Tramadol 100 mg/mL — gotas (1 gota = 2,5 mg)',
    inst:`Dar ${g} gotas VO de 6/6 a 8/8 h se dor intensa (${nf(mg,0)} mg = 1 mg/kg/dose; máx. 100 mg/dose e 400 mg/dia).` }; } });

D({ id:'morfina_ev', cat:'sintomaticos', acc:'SUSH', route:'Uso Intravenoso',
  name:'Morfina 10 mg/mL (EV/SC)', ind:'Dor intensa em ambiente monitorizado',
  calc:(w,a)=>{ const dk = a<0.25?0.03:0.1; const mg=cap(w*dk,5); return { title:'Morfina 10 mg/mL — diluída a 1 mg/mL',
    inst:`Diluir 1 mL (10 mg) + 9 mL SF 0,9% (1 mg/mL).\n• Fazer ${nf(mg,2)} mL (${nf(mg,2)} mg = ${dk} mg/kg) EV lento, até 4/4 h.${a<0.25?'\n• < 3 meses: 0,03–0,05 mg/kg com monitorização de apneia.':''}\n• Antídoto: naloxona. Monitorar SpO₂ e FR.` }; } });

// ---------------- ANTIBIÓTICOS VO ----------------
D({ id:'amox250', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Amoxicilina 250 mg/5 mL (dose padrão 50 mg/kg/dia)', ind:'PAC, faringite, OMA (SBP), sinusite',
  calc:(w)=>{ const ml8=cap(w/3,10), ml12=cap(w/2,15); return { title:'Amoxicilina 250 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml8,1)} mL VO de 8/8 h (50 mg/kg/dia)\n  ou ${nf(ml12,1)} mL VO de 12/12 h.\n• Duração conforme diagnóstico (PAC 5–7 d; OMA 7–10 d; faringite 10 d).\n• Máx. 500 mg/dose no esquema padrão.` }; },
  v:{
    faringite:(w)=>{ const mg=cap(w*50,1000); return { title:'Amoxicilina 250 mg/5 mL — 1x/dia por 10 dias',
      inst:`Dar ${nf(mg/50,1)} mL VO 1 vez ao dia por 10 dias (50 mg/kg/dia; máx. 1 g/dia).\n• Alternativa: ${nf(cap(w/2,10),1)} mL de 12/12 h por 10 dias.` }; },
    pac:(w)=>{ const ml=cap(w/2,15); return { title:'Amoxicilina 250 mg/5 mL — PAC ambulatorial',
      inst:`Dar ${nf(ml,1)} mL VO de 12/12 h por 5 dias (50 mg/kg/dia — SBP).\n• OMS 2024: 3–5 dias se só taquipneia; 5 dias se tiragem sem sinais de perigo.\n• Reavaliar em 48–72 h.` }; }
  } });

D({ id:'amox_alta_sus', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Amoxicilina 250 mg/5 mL em dose alta (90 mg/kg/dia)', ind:'OMA (AAP 2023), pneumococo resistente — com a apresentação do SUS',
  calc:(w)=>{ const ml=cap(w*0.9,40); return { title:'Amoxicilina 250 mg/5 mL — dose alta (90 mg/kg/dia)',
    inst:`Dar ${nf(ml,1)} mL VO de 12/12 h (45 mg/kg/dose; máx. 2 g/dose).\n• Volume grande: se a criança recusar, dividir de 8/8 h → ${nf(cap(w*0.6,27),1)} mL 8/8 h.\n• OMA: 10 dias se < 2 anos ou grave; 7 dias se ≥ 2 anos leve/moderada.` }; } });

D({ id:'amox400', cat:'antimicrobianos', acc:'PART', route:'Uso Oral',
  name:'Amoxicilina 400 mg/5 mL (BD)', ind:'Mesmas indicações; menor volume, 12/12 h',
  calc:(w)=>{ const mlA=cap(w*0.5625,25), mlP=cap(w*0.3125,12.5); return { title:'Amoxicilina 400 mg/5 mL — suspensão BD',
    inst:`Dose alta (90 mg/kg/dia): ${nf(mlA,1)} mL VO de 12/12 h.\nDose padrão (50 mg/kg/dia): ${nf(mlP,1)} mL VO de 12/12 h.` }; },
  v:{ alta:(w)=>({ title:'Amoxicilina 400 mg/5 mL — dose alta 90 mg/kg/dia',
      inst:`Dar ${nf(cap(w*0.5625,25),1)} mL VO de 12/12 h (45 mg/kg/dose; máx. 2 g/dose).\n• OMA: 10 dias se < 2 anos ou grave; 7 dias se ≥ 2 anos leve/moderada.` }) } });

D({ id:'amoxclav_sus', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Amoxicilina + clavulanato 250 + 62,5 mg/5 mL (4:1)', ind:'Falha de amoxicilina, OMA + conjuntivite, sinusite, mordedura, ITU',
  calc:(w)=>{ const ml=cap(w/3,10); return { title:'Amoxicilina + clavulanato 250/62,5 mg/5 mL — suspensão',
    inst:`Dar ${nf(ml,1)} mL VO de 8/8 h (≈ 50 mg/kg/dia de amoxicilina) por 7–10 dias.\n• Formulação 4:1: NÃO usar para dose alta (clavulanato > 10 mg/kg/dia → diarreia).\n• Para chegar a 90 mg/kg/dia no SUS: somar amoxicilina pura 250 mg/5 mL ${nf(cap(w*0.4,20),1)} mL 12/12 h (+40 mg/kg/dia).` }; } });

D({ id:'amoxclav_bd', cat:'antimicrobianos', acc:'PART', route:'Uso Oral',
  name:'Amoxicilina + clavulanato 400 + 57 mg/5 mL (7:1, BD)', ind:'Dose alta com menos clavulanato',
  calc:(w)=>{ const mlA=cap(w*0.5625,25), mlP=cap(w*0.3125,12.5); return { title:'Amoxicilina + clavulanato 400/57 mg/5 mL — BD',
    inst:`Dose alta (90 mg/kg/dia de amoxicilina): ${nf(mlA,1)} mL VO de 12/12 h.\nDose padrão (50 mg/kg/dia): ${nf(mlP,1)} mL VO de 12/12 h.\n• Duração 7–10 dias; tomar no início das refeições.` }; },
  v:{ alta:(w)=>({ title:'Amoxicilina + clavulanato 400/57 mg/5 mL — dose alta',
      inst:`Dar ${nf(cap(w*0.5625,25),1)} mL VO de 12/12 h (90 mg/kg/dia de amoxicilina) por 10 dias.\n• Tomar no início das refeições.` }) } });

D({ id:'azitro', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Azitromicina 200 mg/5 mL', ind:'PAC atípica, coqueluche, alergia grave a penicilina, disenteria',
  calc:(w)=>{ const ml=cap(w/4,12.5); return { title:'Azitromicina 200 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO 1x/dia (10 mg/kg/dia; máx. 500 mg) por 3 dias\n  ou 10 mg/kg no D1 + ${nf(cap(w/8,6.25),1)} mL (5 mg/kg) do D2 ao D5.` }; },
  v:{
    faringite:(w)=>({ title:'Azitromicina 200 mg/5 mL — faringite (alergia à penicilina)',
      inst:`Dar ${nf(cap(w*12/40,12.5),1)} mL VO 1x/dia por 5 dias (12 mg/kg/dia; máx. 500 mg/dia).` }),
    coqueluche:(w,a)=> a<0.5 ? ({ title:'Azitromicina 200 mg/5 mL — coqueluche (< 6 meses)',
      inst:`Dar ${nf(w/4,1)} mL VO 1x/dia por 5 dias (10 mg/kg/dia).\n• < 1 mês: azitromicina é a droga de escolha (monitorar estenose hipertrófica de piloro).` })
      : ({ title:'Azitromicina 200 mg/5 mL — coqueluche',
      inst:`D1: ${nf(cap(w/4,12.5),1)} mL VO (10 mg/kg; máx. 500 mg).\nD2 a D5: ${nf(cap(w/8,6.25),1)} mL VO 1x/dia (5 mg/kg; máx. 250 mg).` }),
    oma:(w)=>({ title:'Azitromicina 200 mg/5 mL — OMA (alergia grave à penicilina)',
      inst:`D1: ${nf(cap(w/4,12.5),1)} mL VO (10 mg/kg); D2–D5: ${nf(cap(w/8,6.25),1)} mL 1x/dia (5 mg/kg).\n• Última opção na OMA (alta resistência do pneumococo).` }),
    disenteria:(w)=>({ title:'Azitromicina 200 mg/5 mL — disenteria/shigelose',
      inst:`Dar ${nf(cap(w/4,12.5),1)} mL VO 1x/dia por 3 dias (10 mg/kg/dia; máx. 500 mg).` })
  } });

D({ id:'claritro', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Claritromicina 250 mg/5 mL', ind:'Alternativa macrolídea (PAC atípica) · ≥ 6 meses',
  min:{a:0.5, txt:'Bula: ≥ 6 meses'},
  calc:(w)=>{ const ml=cap(w*0.15,10); return { title:'Claritromicina 250 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO de 12/12 h por 7–10 dias (7,5 mg/kg/dose; máx. 500 mg/dose).` }; } });

D({ id:'cefalexina', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Cefalexina 250 mg/5 mL', ind:'Impetigo extenso, celulite leve, cistite, faringite (alergia não grave)',
  calc:(w)=>{ const ml=cap(w/4,10), mlG=cap(w/2,20); return { title:'Cefalexina 250 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO de 6/6 h (50 mg/kg/dia) por 7–10 dias.\n• Infecção de pele moderada: até 100 mg/kg/dia → ${nf(mlG,1)} mL 6/6 h (máx. 4 g/dia).` }; },
  v:{ pele:(w)=>({ title:'Cefalexina 250 mg/5 mL — pele/partes moles',
      inst:`Dar ${nf(cap(w*75/4/50,20),1)} mL VO de 6/6 h (75 mg/kg/dia) por 7 dias (máx. 1 g/dose).` }) } });

D({ id:'cefadroxila', cat:'antimicrobianos', acc:'PART', route:'Uso Oral',
  name:'Cefadroxila 250 mg/5 mL', ind:'Alternativa à cefalexina com posologia 12/12 h',
  calc:(w)=>{ const ml=cap(w*0.3,20); return { title:'Cefadroxila 250 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO de 12/12 h por 10 dias (30 mg/kg/dia; máx. 2 g/dia).` }; } });

D({ id:'cefuroxima', cat:'antimicrobianos', acc:'PART', route:'Uso Oral',
  name:'Axetilcefuroxima 250 mg/5 mL', ind:'OMA/sinusite com alergia não grave, ITU febril VO · ≥ 3 meses',
  min:{a:0.25, txt:'≥ 3 meses'},
  calc:(w)=>{ const ml=cap(w*0.3,10); return { title:'Axetilcefuroxima 250 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO de 12/12 h (30 mg/kg/dia; máx. 500 mg/dose) por 7–10 dias.\n• Tomar com alimento.` }; } });

D({ id:'cefaclor', cat:'antimicrobianos', acc:'PART', route:'Uso Oral',
  name:'Cefaclor 250 mg/5 mL', ind:'ITU febril VO, OMA (alternativa)',
  calc:(w)=>{ const ml=cap(w*40/3/50,6.7); return { title:'Cefaclor 250 mg/5 mL — suspensão oral',
    inst:`Dar ${nf(ml,1)} mL VO de 8/8 h (40 mg/kg/dia; máx. 1 g/dia) por 7–10 dias.` }; } });

D({ id:'smx_tmp', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Sulfametoxazol + trimetoprima 200 + 40 mg/5 mL', ind:'ITU (se sensível), MRSA comunitário · ≥ 2 meses',
  min:{a:1/6, txt:'Contraindicado < 2 meses (kernicterus)'},
  calc:(w)=>{ const ml=cap(w*0.5,20); return { title:'Sulfametoxazol + trimetoprima 200/40 mg/5 mL',
    inst:`Dar ${nf(ml,1)} mL VO de 12/12 h (8 mg/kg/dia de TMP; máx. 160 mg TMP/dose) por 7–10 dias.\n• Checar resistência local de E. coli (frequentemente > 20%).` }; } });

D({ id:'nitrofurantoina', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Nitrofurantoína 5 mg/mL (ou cápsula 100 mg)', ind:'Cistite (ITU baixa afebril) e profilaxia · ≥ 1 mês',
  min:{a:1/12, txt:'≥ 1 mês'},
  calc:(w)=>{ const mg=cap(w*1.5,100); return { title:'Nitrofurantoína 5 mg/mL — suspensão oral',
    inst:`Dar ${nf(mg/5,1)} mL VO de 6/6 h (${nf(mg,0)} mg; 5–7 mg/kg/dia) por 5–7 dias.\n• Não usar na pielonefrite/ITU febril (não atinge parênquima renal).\n• Profilaxia: 1–2 mg/kg à noite → ${nf(cap(w*1.5,100)/5,1)} mL.` }; } });

D({ id:'metronidazol_vo', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Metronidazol (benzoil) 40 mg/mL', ind:'Giardíase, amebíase, vaginose',
  calc:(w)=>{ const mlG=cap(w*5/40,6.25), mlA=cap(w*12/40,18.75); return { title:'Metronidazol 40 mg/mL (200 mg/5 mL) — suspensão',
    inst:`Giardíase: ${nf(mlG,1)} mL VO de 8/8 h por 5–7 dias (15 mg/kg/dia; máx. 250 mg/dose).\nAmebíase: ${nf(mlA,1)} mL VO de 8/8 h por 7–10 dias (35 mg/kg/dia; máx. 750 mg/dose).\n• Gosto metálico; evitar álcool (adolescentes).` }; } });

D({ id:'cipro_vo', cat:'antimicrobianos', acc:'SUS', route:'Uso Oral',
  name:'Ciprofloxacino 500 mg comprimido', ind:'Disenteria (OMS), shigelose · uso pediátrico restrito',
  calc:(w)=>{ const mg=cap(w*15,500); return { title:'Ciprofloxacino 500 mg — comprimido',
    inst:`Dar ${nf(mg,0)} mg VO de 12/12 h por 3 dias (15 mg/kg/dose; máx. 500 mg/dose).\n• Comprimido pode ser dissolvido em 5 mL de água (100 mg/mL) para crianças menores.` }; } });
