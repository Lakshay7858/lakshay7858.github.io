# Gera ../../pediatria/index.html a partir dos fontes. Uso: python3 src/pediatria/build.py
import pathlib
p = pathlib.Path(__file__).parent
root = p.parent.parent
js = '\n'.join((p/f).read_text() for f in ['drugs1.js','drugs2.js','drugs3.js','drugs4.js','condutas.js','who_data.js','puericultura.js','prematuro.js','modelos.js','salavermelha.js','app.js'])
out = (p/'shell.html').read_text().replace('/*__SCRIPTS__*/', js)
head = ('<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n'
 '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n'
 '<meta name="robots" content="noindex,nofollow">\n'
 '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%231e1b4b%27/%3E%3Cpath d=%27M9 16h14M16 9v14%27 stroke=%27%2334d399%27 stroke-width=%274%27 stroke-linecap=%27round%27/%3E%3C/svg%3E">\n'
 '<script src="../assets/gate.js"></script>\n')
html = head + out.replace('<!-- ======== TOPO ======== -->', '</head>\n<body>\n<!-- ======== TOPO ======== -->', 1) + '\n</body>\n</html>\n'
for a, b in [('<title>PrescriMed Pro Pediatria</title>', '<title>DoseCerta · Pediatria</title>'),
             ('<div class="brand-title">PrescriMed Pro <span class="pill-soft">', '<div class="brand-title">Dose<span style="color:var(--mint)">Certa</span> <span class="pill-soft">'),
             ('<button class="btn btn-on-brand" id="btnDoctor"', '<a class="btn btn-on-brand" href="../" style="text-decoration:none">← Módulos</a>\n    <button class="btn btn-on-brand" id="btnDoctor"'),
             ('Prescrição emitida via PrescriMed Pro', 'Prescrição emitida via DoseCerta')]:
    assert a in html, a
    html = html.replace(a, b, 1)
(root/'pediatria'/'index.html').write_text(html)
print('ok', len(html))
