# import os
from os import listdir, remove
from os.path import basename, isfile, join as pjoin
import sys
from subprocess import call
from packing.jsmin import jsmin

def pack(path, minify):
	'''Packs the file contents using jsmin to minify the JS/CSS'''
	with open(path) as js_file:
		filename = basename(path)
		script = js_file.read()
		if minify:
			script = jsmin(script)
		# Append extraction delimeters
		return "\n:START_{0}\n{1}\n:END_{0}\n".format(filename, script)

debug = '-d' in sys.argv
keepFiles = '-k' in sys.argv
if len(sys.argv) > 1 and sys.argv[1] == '--help':
	print('pack.py [-d]\n\t-d  Debug Mode, does not minify the contents')

print('Packing contents...', end='', flush=True)
packedData = ''
# Collect all JavaScript files
files = [pjoin('src', f) for f in listdir('src') if isfile(pjoin('src', f))]
# Collect all CSS files
files += [pjoin('css', f) for f in listdir('css') if isfile(pjoin('css', f))]
contents = ''
# Pack and concatenate the file contents
for file in files:
	contents += pack(file, not debug)

print('done.\nGenerating scripts...', end='', flush=True)

# Generate processor for each file to be extracted from the Patch Scripts
processors = []
for css in listdir('css'):
	processors.append('processCSS "{0}"'.format(css))
for src in listdir('src'):
	processors.append('processJS "{0}"'.format(src))

# Generate Linux Bash script
with open('packing/patch_template.tsh', 'r') as patch, open('DFEnhancementSuitePatch.sh', 'w') as out:
	out.write(patch.read()
		.replace('{{{PROCESSORS}}}', '\n'.join(processors))
		.replace('{{{CONTENTS}}}', contents))

# Generate the PowerShell script
with open('packing/patch_template.tps', 'r') as patch, open('DFEnhancementSuitePatch.ps1', 'w') as out:
	out.write(patch.read().replace('{{{PROCESSORS}}}', '\n'.join(processors)))
# Generate script to convert PS Script to Windows Executable
with open('ps_pack.bat', 'w') as script:
	script.write('''start /wait "" powershell -ExecutionPolicy Bypass -File "%~dp0packing\\ps2exe\\ps2exe.ps1" -inputFile DFEnhancementSuitePatch.ps1 -outputFile DFEnhancementSuitePatch.exe -STA -iconFile packing\\icons\\fvtt_cc_anvil.ico -version "3.0" -title "DragonFlagon Enhancement Suite Patch for Foundry VTT" -requireAdmin\n''')
# Execute conversion script
call(['/mnt/c/Windows/System32/cmd.exe', '/c', 'ps_pack.bat'])
# Append JS/CSS content to the end of the windows executable file
with open('DFEnhancementSuitePatch.exe', 'a') as fout:
	fout.write(contents)

# Clean up intermediaries
if not keepFiles:
	remove('ps_pack.bat')
	remove('DFEnhancementSuitePatch.ps1')
print('done.')