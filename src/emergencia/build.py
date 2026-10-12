# Gera ../../emergencia/index.html a partir dos fontes. Uso: python3 src/emergencia/build.py
import pathlib
p = pathlib.Path(__file__).parent
root = p.parent.parent
files = ['core.js', 'refs.js', 'sv_data.js', 'proc.js', 'inf.js', 'calc.js', 'scores.js', 'ps_data.js', 'ex_data.js', 'app.js']
js = '\n'.join((p/f).read_text() for f in files)
out = (p/'shell.html').read_text().replace('/*__SCRIPTS__*/', js)
head = ('<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n'
 '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n'
 '<meta name="robots" content="noindex,nofollow">\n'
 '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%231e1b4b%27/%3E%3Cpath d=%27M5 17h6l3-8 4 14 3-6h6%27 fill=%27none%27 stroke=%27%2334d399%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E">\n'
 '<script src="../assets/gate.js"></script>\n')
html = head + out.replace('<!-- ======== TOPO ======== -->', '</head>\n<body>\n<!-- ======== TOPO ======== -->', 1) + '\n</body>\n</html>\n'
(root/'emergencia'/'index.html').write_text(html)
print('ok', len(html))
