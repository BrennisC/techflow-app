$paths = @(
    ".\apps\mfe-marketplace",
    ".\apps\mfe-login",
    ".\apps\mfe-navbar"
)

foreach ($path in $paths) {
    Write-Host "Abriendo terminal para $path" -ForegroundColor Green
    Start-Process powershell `
        -ArgumentList "-NoExit", "-Command", "cd $path; yarn start:standalone"
}
