@echo off
REM Script para iniciar Backend e Frontend automaticamente

title Sistema de Eventos - Iniciador

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║  INICIADOR - SISTEMA DE EVENTOS                  ║
echo ║  Frontend: http://177.44.248.44:3000                 ║
echo ║  Backend:  http://177.44.248.44:5000                 ║
echo ║  Testes:   http://177.44.248.44:3000/teste-conexao-api
echo ╚═══════════════════════════════════════════════════╝
echo.

REM Iniciar Backend
echo [1/2] Iniciando Backend na porta 5000...
start cmd /k "cd backend && npm start"

REM Aguardar um pouco
timeout /t 3 /nobreak

REM Iniciar Frontend
echo [2/2] Iniciando Frontend na porta 3000...
start cmd /k "cd frontend && npm start"

echo.
echo ✅ TODOS OS SERVIÇOS INICIADOS!
echo.
echo 📍 URLs:
echo    - Frontend: http://177.44.248.44:3000
echo    - Backend:  http://177.44.248.44:5000
echo    - Testes:   http://177.44.248.44:3000/teste-conexao-api
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
