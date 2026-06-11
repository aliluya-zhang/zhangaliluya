$env:Path = "C:\Users\lili\.workbuddy\binaries\node\versions\20.18.0"
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "agent-browser.cmd"
$psi.Arguments = "screenshot"
$psi.UseShellExecute = $false
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$p = [System.Diagnostics.Process]::Start($psi)
$p.WaitForExit()
$p.StandardOutput.ReadToEnd()
$p.StandardError.ReadToEnd()
