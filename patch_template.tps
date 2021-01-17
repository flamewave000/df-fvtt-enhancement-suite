$PSVersion = (($PSVersionTable.PSVersion.Major, $PSVersionTable.PSVersion.Minor, $PSVersionTable.PSVersion.Build, $PSVersionTable.PSVersion.Revision) -join '.')
Write-Host " _____                               `n",
"|  _ \                              `n",
"| | | |_ __ __ _  __ _  ___  _ __    `n",
"| | | | '__/ _`` |/ _`` |/ _ \| '_ \   `n",
"| |/ /| | | (_| | (_| | (_) | | | |  `n",
"|___/ |_|  \__,_|\__, |\___/|_| |_|  `n",
"    ______ _      __/ |              `n",
"    |  ___| |    |___/               `n",
"    | |_  | | __ _  __ _  ___  _ __  `n",
"    |  _| | |/ _`` |/ _`` |/ _ \| '_ \ `n",
"    | |   | | (_| | (_| | (_) | | | |`n",
"    \_|   |_|\__,_|\__, |\___/|_| |_|`n",
"                    __/ |            `n",
"                   |___/             `n",
"DragonFlagon Enhancement Suite Patch for Foundry VTT`n",
"                    Version 1.0                     `n",
"                  PS:$PSVersion                  `n"
"----------------------------------------------------"

if ($MyInvocation.MyCommand.CommandType -eq "ExternalScript") {
	$ScriptPath = $MyInvocation.MyCommand.Definition
}
else {
	$ScriptPath = [Environment]::GetCommandLineArgs()[0]
}

$__FILE__ = Split-Path -Path $ScriptPath -Leaf
$__SELF = Get-Content $ScriptPath

$__ROOT = "" # "D:\Program Files\FoundryVTT - Copy\"
$__MAIN = "${__ROOT}resources\app\templates\views\layouts\main.hbs"

if (!(Test-Path "$__MAIN" -PathType Leaf)) {
	Write-Host "FoundryVTT not detected. Make sure you run this program from inside the FoundryVTT folder!`nOn Windows, FoundryVTT can usually be found at `"C:\Program Files\FoundryVTT`""
	Pause
	exit 1
}

function extract {
	param ( $token, $target )
	$start = ($__SELF | Select-String ":START_$token").LineNumber
	$end = ($__SELF | Select-String ":END_$token").LineNumber - 2
	$output = ($__SELF[$start..$end] | Out-String)
	$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
	$output | % { [Text.Encoding]::UTF8.GetBytes($_) } | Set-Content -Encoding Byte -Path "$target\$token"
}
function inject {
	param ( $token, $content, $target )
	if (!(Test-Path "$target.bak" -PathType Leaf)) {
		Copy-Item $target "$target.bak"
	}
	$file = Get-Content $target
	if ($file.Contains($content)) { return }
	$line = ($file | Select-String $token).LineNumber - 1
	$output = ($file[0..($line - 1)] + $content + $file[$line..$file.Length] | Out-String)
	$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
	$output | % { [Text.Encoding]::UTF8.GetBytes($_) } | Set-Content -Encoding Byte -Path "$target"

}
function processJS {
	param ( $file )
	Write-Host -NoNewline "Extracting $file from $__FILE__ to ${__ROOT}resources\app\public\scripts\..."
	extract $file "${__ROOT}resources\app\public\scripts"
	if ($?) { Write-Host done } else { Write-Host failed }
	Write-Host -NoNewline "Injecting $file into $__MAIN..."
	inject "</body>" "<script src=""scripts/$file""></script>" $__MAIN
	if ($?) { Write-Host done } else { Write-Host failed }
}
function processCSS {
	param ( $file )
	Write-Host -NoNewline "Extracting $file from $__FILE__ to ${__ROOT}resources\app\public\css\..."
	extract $file "${__ROOT}resources\app\public\css"
	if ($?) { Write-Host done } else { Write-Host failed }
	Write-Host -NoNewline "Injecting $file into $__MAIN..."
	inject '</head>' "<link href=""css/$file"" rel=""stylesheet"" type=""text/css"" media=""all"">" $__MAIN
	if ($?) { Write-Host done } else { Write-Host failed }
}

{{{PROCESSORS}}}

Write-Host " ====================================================`n`n",
"Patch Complete! I hope you enjoy it!`n",
"If you have an issue or want to make suggestions for`n",
"future features, please feel free to post an issue`n",
"on the GitHub Project page.`n",
"https://github.com/flamewave000/df-fvtt-enhancement-suite/issues`n"
Pause
