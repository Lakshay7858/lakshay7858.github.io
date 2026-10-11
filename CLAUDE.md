# DoseCerta — instruções para o Claude
- Site estático publicado em https://dosecertabr.github.io (GitHub Pages, branch main). Senha de entrada em assets/gate.js (hash SHA-256 de "dosecerta:" + senha).
- Módulo Pediatria: editar os fontes em src/pediatria/ (drugs*.js = fármacos e doses; condutas.js = aba SUS × Ideal; app.js = lógica; shell.html = layout/CSS) e rodar `python3 src/pediatria/build.py` para regenerar pediatria/index.html. Nunca editar pediatria/index.html à mão.
- Novos módulos: pasta própria (ex.: emergencia/), incluir <script src="../assets/gate.js"> e meta robots noindex; ativar o card em index.html.
- Doses: citar diretriz e ano; marcar disponibilidade (SUS/RENAME × particular). Não subir PDFs pagos.
