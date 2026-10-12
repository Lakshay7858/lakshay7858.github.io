function makeWHO(W){
  function interp(xs, rows, x){ // xs ascending
    if (x<=xs[0]) return rows[0]; const n=xs.length; if (x>=xs[n-1]) return rows[n-1];
    let lo=0,hi=n-1; while(hi-lo>1){ const mid=(lo+hi)>>1; if(xs[mid]<=x) lo=mid; else hi=mid; }
    const t=(x-xs[lo])/(xs[hi]-xs[lo]); return rows[lo].map((v,i)=>v+(rows[hi][i]-v)*t);
  }
  function z(lms, x){ const [L,M,S]=lms; let zz = Math.abs(L)<1e-9 ? Math.log(x/M)/S : (Math.pow(x/M,L)-1)/(L*S);
    if (Math.abs(L-1)>1e-9 && Math.abs(zz)>3){ const sd=k=>M*Math.pow(1+L*S*k,1/L);
      if (zz>3) zz = 3 + (x-sd(3))/(sd(3)-sd(2)); else zz = -3 + (x-sd(-3))/(sd(-2)-sd(-3)); }
    return zz; }
  function valAt(lms,k){ const [L,M,S]=lms; return Math.abs(L)<1e-9? M*Math.exp(S*k) : M*Math.pow(1+L*S*k,1/L); }
  const m07 = Array.from({length:168},(_,i)=>61+i);
  return {
    lmsAge(ind, sex, days){ // ind: wfa,lhfa,hcfa,bfa ; for >1856 days hfa/bfa 2007 by months
      if (days <= 1856) { const t=W.age[ind]; if(!t) return null; return interp(W.ageDays, t[sex], days); }
      const months = days/30.4375; const map={lhfa:'hfa',bfa:'bfa'}; const t=W.y2007[map[ind]]; if(!t||months>228) return null;
      return interp(m07, t[sex], Math.max(61,months)); },
    lmsLen(ind, sex, cm){ const t=W.len[ind][sex]; const xs=t.lms.map((_,i)=>t.start+i*t.step); if(cm<xs[0]||cm>xs[xs.length-1]) return null; return interp(xs,t.lms,cm); },
    z, valAt
  };
}
if (typeof module!=='undefined') module.exports={makeWHO};
