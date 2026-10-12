# Gera ../../cirurgia/index.html. Reaproveita o núcleo da Emergência (paciente, motor de dose, procedimentos, calculadoras, escores).
# Uso: python3 src/cirurgia/build.py
import pathlib
p = pathlib.Path(__file__).resolve().parent
em = p.parent / 'emergencia'
root = p.parent.parent
files = [em/'core.js', em/'refs.js', p/'cir_refs.js', p/'cir_pre.js', em/'proc.js', em/'proc_extra.js', p/'cir_desc.js', p/'cir_clin.js',
         em/'calc.js', em/'scores.js', p/'cir_scores.js', p/'cir_calc.js', p/'cir_rx.js', p/'cir_peri.js', p/'app.js']
js = '\n'.join(f.read_text() for f in files)
out = (p/'shell.html').read_text().replace('/*__SCRIPTS__*/', js)
head = ('<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n'
 '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n'
 '<meta name="robots" content="noindex,nofollow">\n'
 '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%277%27 fill=%27%231e1b4b%27/%3E%3Cpath d=%27M8 24L24 8M11 11l4 4%27 stroke=%27%2334d399%27 stroke-width=%273%27 stroke-linecap=%27round%27/%3E%3C/svg%3E">\n'
 '<script src="../assets/gate.js"></script>\n')
html = head + out.replace('<!-- ======== TOPO ======== -->', '</head>\n<body>\n<!-- ======== TOPO ======== -->', 1) + '\n</body>\n</html>\n'
(root/'cirurgia'/'index.html').write_text(html)
print('ok', len(html))
