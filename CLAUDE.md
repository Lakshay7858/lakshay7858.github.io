# DoseCerta — instruções para o Claude
- Site estático publicado em https://dosecertabr.github.io (GitHub Pages, branch main). Senha de entrada em assets/gate.js (hash SHA-256 de "dosecerta:" + senha).
- Módulo Pediatria: editar os fontes em src/pediatria/ (drugs*.js = fármacos e doses; condutas.js = aba SUS × Ideal; app.js = lógica; shell.html = layout/CSS; who_data.js = tabelas LMS OMS geradas por tools/gen.js; puericultura.js, prematuro.js, modelos.js = aba Puericultura; salavermelha.js = aba Sala Vermelha) e rodar `python3 src/pediatria/build.py` para regenerar pediatria/index.html. Nunca editar pediatria/index.html à mão.
- Módulo Emergência adulto: fontes em src/emergencia/ (core.js = paciente/motor de dose; sv_data.js = Sala Vermelha; inf.js = infusões/diluições HC-FMUSP; calc.js = gasometria/eletrólitos/renal; scores.js = escores; ps_data.js = prescrições do PS SUS × ideal; ex_data.js = exames/TC; refs.js; app.js) → `python3 src/emergencia/build.py`. Nunca editar emergencia/index.html à mão.
- Novos módulos: pasta própria (ex.: emergencia/), incluir <script src="../assets/gate.js"> e meta robots noindex; ativar o card em index.html.
- Doses: citar diretriz e ano; marcar disponibilidade (SUS/RENAME × particular). Não subir PDFs pagos.
- Verificação mensal de diretrizes: tarefa agendada (dia 1, 07:47 BRT) só gera relatório; mudanças entram após aprovação do usuário.
