#!/bin/bash
# Script para criar cópias case-insensitive dos arquivos HTML na VM
# Execute na VM: cd ~/Teste3/TesteProjetoVM/frontend && bash fix-case-sensitivity.sh

cd ~/Teste3/TesteProjetoVM/frontend

echo "🔧 Corrigindo case-sensitivity para Linux..."

# Criar cópias em minúsculas se não existirem
[ ! -f "eventos.html" ] && cp "Eventos.html" "eventos.html" && echo "✅ eventos.html criado"
[ ! -f "cadastro.html" ] && cp "Cadastro.html" "cadastro.html" && echo "✅ cadastro.html criado"
[ ! -f "minhas_inscricoes.html" ] && cp "Minhas_inscricoes.html" "minhas_inscricoes.html" && echo "✅ minhas_inscricoes.html criado"
[ ! -f "admin.html" ] && cp "Admin.html" "admin.html" && echo "✅ admin.html criado"
[ ! -f "logicafrontend.js" ] && cp "Logicafrontend.js" "logicafrontend.js" && echo "✅ logicafrontend.js criado"

# Listar arquivos criados
echo ""
echo "📋 Arquivos HTML disponíveis:"
ls -la *.html | grep -E '(eventos|cadastro|minhas_inscricoes|admin)'

echo ""
echo "✨ Processo concluído! Os 404s devem desaparecer agora."
