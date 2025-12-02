Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  INICIADOR - SISTEMA DE EVENTOS                  ║" -ForegroundColor Cyan
Write-Host "║  Frontend: http://177.44.248.44:3000                 ║" -ForegroundColor Cyan
Write-Host "║  Backend:  http://177.44.248.44:5000                 ║" -ForegroundColor Cyan
Write-Host "║  Testes:   http://177.44.248.44:3000/teste-conexao-api ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# Iniciar Backend
Write-Host "[1/2] Iniciando Backend na porta 5000..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd backend; npm start" -WorkingDirectory (Get-Location)

# Aguardar um pouco
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "[2/2] Iniciando Frontend na porta 3000..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd frontend; npm start" -WorkingDirectory (Get-Location)

Write-Host "`n"
Write-Host "✅ TODOS OS SERVIÇOS INICIADOS!" -ForegroundColor Green
Write-Host "`n"
Write-Host "📍 URLs:" -ForegroundColor Cyan
Write-Host "   - Frontend: http://177.44.248.44:3000" -ForegroundColor Green
Write-Host "   - Backend:  http://177.44.248.44:5000" -ForegroundColor Green
Write-Host "   - Testes:   http://177.44.248.44:3000/teste-conexao-api" -ForegroundColor Green
Write-Host "`n"

# Opcional: Abrir no navegador
Write-Host "Abrindo página de testes no navegador em 2 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://177.44.248.44:3000/teste-conexao-api"
