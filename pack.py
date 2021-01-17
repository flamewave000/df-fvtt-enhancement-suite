import os
import io
import sys
import subprocess
from jsmin import jsmin


def pack(path, minify):
	with open(path) as js_file:
		filename = os.path.basename(path)
		script = js_file.read()
		if minify:
			script = jsmin(script)
		return "\n:START_{0}\n{1}\n:END_{0}\n".format(filename, script)


debug = len(sys.argv) > 1 and sys.argv[1] == '-d'
if len(sys.argv) > 1 and sys.argv[1] == '--help':
	print('pack.py [-d]\n\t-d  Debug Mode, does not minify the contents')
print('Packing contents...', end='', flush=True)

pack('src/anim-bg.js', not debug)

packedData = ''
files = [os.path.join('src', f) for f in os.listdir(
	'src') if os.path.isfile(os.path.join('src', f))]
files += [os.path.join('css', f) for f in os.listdir('css')
		  if os.path.isfile(os.path.join('css', f))]
contents = ''
for file in files:
	contents += pack(file, not debug)
print('done.\nGenerating scripts...', end='', flush=True)

processors = []
for css in os.listdir('css'):
	processors.append('processCSS "{0}"'.format(css))
for src in os.listdir('src'):
	processors.append('processJS "{0}"'.format(src))

with open('patch_template.tsh', 'r') as patch, open('DFEnhancementSuitePatch.sh', 'w') as out:
	out.write(patch.read()
		.replace('{{{PROCESSORS}}}', '\n'.join(processors))
		.replace('{{{CONTENTS}}}', contents))
with open('patch_template.tps', 'r') as patch, open('DFEnhancementSuitePatch.ps1', 'w') as out:
	out.write(patch.read()
		.replace('{{{PROCESSORS}}}', '\n'.join(processors)))

with open('ps_pack.bat', 'w') as script:
	script.write('''
start /wait "" powershell -ExecutionPolicy Bypass -File "%~dp0ps2exe\\ps2exe.ps1" -inputFile DFEnhancementSuitePatch.ps1 -STA -iconFile icons\\fvtt_cc_anvil.ico -version "3.0" -title "DragonFlagon Enhancement Suite Patch for Foundry VTT" -requireAdmin
''')
subprocess.call(['/mnt/c/Windows/System32/cmd.exe', '/c', 'ps_pack.bat'])
with open('ps_pack.sh', 'w') as script:
	script.write('''
cat __contents.tmp >> DFEnhancementSuitePatch.exe
''')
with open('DFEnhancementSuitePatch.exe', 'a') as fout:
	fout.write(contents)
if not debug:
	os.remove('ps_pack.bat')
	os.remove('ps_pack.sh')
	os.remove('DFEnhancementSuitePatch.ps1')
print('done.')