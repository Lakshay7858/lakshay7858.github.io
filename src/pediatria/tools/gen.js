const m=require('../who-growth-standards-1.0.1/package/dist/index.cjs');
const XLSX_JSON=JSON.parse(require('fs').readFileSync('w2007.json','utf8'));
const r=(v,d)=>+v.toFixed(d);
const out={age:{}, len:{}, y2007:XLSX_JSON};
// age-based: daily 0-91, then every 7 days
const ages=[]; for(let d=0;d<=91;d++) ages.push(d); for(let d=98;d<=1856;d+=7){ if(d>730&&ages[ages.length-1]<730){ ages.push(730,731);} ages.push(d);} if(ages[ages.length-1]!==1856) ages.push(1856);
out.ageDays=ages;
for(const ind of ['wfa','lhfa','hcfa','bfa']){ out.age[ind]={}; for(const [sx,k] of [['male','M'],['female','F']]){ const t=m.getTable(ind,sx); out.age[ind][k]=ages.map(d=>t.lms[d].map((v,i)=>r(v,i===2?5:4))); } }
for(const ind of ['wfl','wfh']){ out.len[ind]={}; for(const [sx,k] of [['male','M'],['female','F']]){ const t=m.getTable(ind,sx); const rows=[]; for(let i=0;i<t.lms.length;i+=5) rows.push(t.lms[i].map((v,j)=>r(v,j===2?5:4))); out.len[ind][k]={start:t.start,step:t.step*5,lms:rows}; } }
require('fs').writeFileSync('who.json',JSON.stringify(out));
console.log('bytes',JSON.stringify(out).length);
