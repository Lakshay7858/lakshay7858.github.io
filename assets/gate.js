// DoseCerta — senha de entrada (barreira simples, não é segurança forte)
(function () {
  var H = 'ccb6fa8040987b3084a3619647b393cea40a5d244dfb4623f2d6ecc72183059e';
  var K = 'dosecerta_auth';
  var root = document.documentElement;
  function ok() {
    try { if (localStorage.getItem(K) === H || sessionStorage.getItem(K) === H) return true; } catch (e) {}
    return false;
  }
  if (ok()) return;
  root.classList.add('dc-locked');
  var css = document.createElement('style');
  css.textContent =
    '.dc-locked body>*:not(#dc-gate){display:none!important}' +
    '#dc-gate{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;background:#14123a;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
    '#dc-gate form{background:#fff;color:#1b1f36;border-radius:14px;padding:26px 24px;width:100%;max-width:340px;display:grid;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,.35)}' +
    '#dc-gate h1{margin:0;font-size:1.35rem;letter-spacing:-.3px}#dc-gate h1 span{color:#059669}' +
    '#dc-gate p{margin:0;font-size:.85rem;color:#5b6382}' +
    '#dc-gate input[type=password]{font-size:1.1rem;padding:11px 12px;border:1px solid #cfd4e4;border-radius:8px;letter-spacing:.2em;width:100%;box-sizing:border-box}' +
    '#dc-gate input[type=password]:focus{outline:2px solid #4f46e5;border-color:#4f46e5}' +
    '#dc-gate label{font-size:.8rem;color:#5b6382;display:flex;gap:8px;align-items:center}' +
    '#dc-gate button{background:#4f46e5;color:#fff;border:0;border-radius:8px;padding:11px;font-size:.95rem;font-weight:700;cursor:pointer}' +
    '#dc-gate .err{color:#b91c1c;font-size:.8rem;min-height:1em}';
  document.head.appendChild(css);
  async function sha(s) {
    var b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
  }
  function build() {
    var g = document.createElement('div');
    g.id = 'dc-gate';
    g.innerHTML = '<form autocomplete="off"><h1>Dose<span>Certa</span></h1><p>Acesso restrito. Digite a senha.</p>' +
      '<input type="password" id="dc-pw" inputmode="numeric" aria-label="Senha" autofocus>' +
      '<label><input type="checkbox" id="dc-remember" checked> Lembrar neste dispositivo</label>' +
      '<div class="err" id="dc-err"></div><button type="submit">Entrar</button>' +
      '<p style="font-size:.72rem">Em computador compartilhado (hospital), desmarque “Lembrar”.</p></form>';
    document.body.appendChild(g);
    g.querySelector('form').addEventListener('submit', async function (e) {
      e.preventDefault();
      var v = document.getElementById('dc-pw').value.trim();
      var h = await sha('dosecerta:' + v);
      if (h === H) {
        try { (document.getElementById('dc-remember').checked ? localStorage : sessionStorage).setItem(K, H); } catch (x) {}
        g.remove(); root.classList.remove('dc-locked');
      } else {
        document.getElementById('dc-err').textContent = 'Senha incorreta.';
        document.getElementById('dc-pw').select();
      }
    });
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
