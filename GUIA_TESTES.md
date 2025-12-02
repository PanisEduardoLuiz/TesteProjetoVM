# 🧪 Guia Completo: Como Testar Conexão Frontend ↔ Backend

## ✅ Status Atual

| Serviço | Porta | URL | Status |
|---------|-------|-----|--------|
| **Frontend (HTML/JS)** | 3000 | `http://177.44.248.44:3000` | ✅ Rodando |
| **Backend (API)** | 5000 | `http://177.44.248.44:5000` | ✅ Rodando |
| **Teste de Conexão** | 3000 | `http://177.44.248.44:3000/teste-conexao-api` | ✅ Disponível |

---

## 🚀 Como Testar - 3 Formas

### **Forma 1️⃣: Página Web de Teste (Recomendado)**

1. Abra seu navegador
2. Acesse: **`http://177.44.248.44:3000/teste-conexao-api`**
3. Você verá uma página com 5 testes:
   - ✓ Backend Online?
   - ✓ Listar Eventos
   - ✓ Criar Evento
   - ✓ Listar Usuários
   - ✓ Criar Usuário

4. Clique em cada botão para testar
5. Se todos ficarem **verdes** ✅ = Tudo conectado!
6. Se ficar **vermelho** ❌ = Verifique os logs no console (F12)

---

### **Forma 2️⃣: Postman (Mais Profissional)**

#### Passos:
1. Abra o **Postman**
2. Crie uma nova requisição

#### Teste GET Eventos:
```
Método: GET
URL: http://177.44.248.44:5000/api/eventos
```

#### Teste POST Evento:
```
Método: POST
URL: http://177.44.248.44:5000/api/eventos

Body (JSON):
{
  "nome": "Teste Frontend",
  "descricao": "Evento criado para testar conexão",
  "data": "2026-02-01"
}
```

#### Teste GET Usuários:
```
Método: GET
URL: http://177.44.248.44:5000/api/usuarios
```

---

### **Forma 3️⃣: Console do Navegador (Desenvolvedor)**

1. Abra qualquer página HTML do seu projeto
2. Pressione **F12** para abrir o Developer Tools
3. Vá para a aba **Console**
4. Cole este código:

```javascript
// Teste 1: Backend Online
fetch('http://177.44.248.44:5000/')
  .then(r => r.text())
  .then(d => console.log('✅ Backend Online:', d))
  .catch(e => console.error('❌ Erro:', e.message));

// Teste 2: Listar Eventos
fetch('http://177.44.248.44:5000/api/eventos')
  .then(r => r.json())
  .then(d => console.log('✅ Eventos:', d))
  .catch(e => console.error('❌ Erro:', e.message));

// Teste 3: Criar Evento
fetch('http://177.44.248.44:5000/api/eventos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'Evento Teste',
    descricao: 'Teste de conexão',
    data: '2026-02-01'
  })
})
.then(r => r.json())
.then(d => console.log('✅ Evento criado:', d))
.catch(e => console.error('❌ Erro:', e.message));
```

5. Pressione **Enter** e observe os resultados

---

## 🔍 O Que Cada Teste Verifica

| Teste | O que verifica | Resultado Esperado |
|-------|----------------|-------------------|
| Backend Online | Servidor está rodando | Status 200 OK |
| GET Eventos | API retorna eventos | Array com eventos |
| POST Evento | Criar evento funciona | Novo evento com ID |
| GET Usuários | API retorna usuários | Array com usuários |
| POST Usuário | Criar usuário funciona | Novo usuário com ID |

---

## ⚠️ Possíveis Erros e Soluções

### ❌ Erro: "Não é possível conectar"
```
Solução:
1. Verifique se o backend está rodando:
   - Terminal: cd backend
   - Terminal: npm start (ou node server.js)
   
2. Verifique se o frontend está rodando:
   - Terminal: cd frontend
   - Terminal: npm start (ou node server.js)
```

### ❌ Erro: "CORS policy: No 'Access-Control-Allow-Origin'"
```
Solução: Já foi corrigido! O backend tem CORS habilitado.
Certifique-se de que o backend está atualizado.
```

### ❌ Erro: "Porta já está em uso"
```
Solução: Mude a porta no arquivo server.js:
- Frontend: Mude const PORT = 3000 para outro número
- Backend: Mude const PORT = 5000 para outro número
```

### ❌ Erro: "404 Not Found"
```
Solução: 
1. Verifique se as rotas existem no backend:
   - /api/eventos ✓
   - /api/usuarios ✓

2. Verifique a URL digitada (maiúsculas/minúsculas)
```

---

## 📊 Checklist de Testes

Teste cada um e marque como ✓:

```
Frontend:
[ ] Página index.html carrega
[ ] Página eventos.html carrega
[ ] Página cadastro.html carrega
[ ] Página login.html carrega

Backend:
[ ] GET /api/eventos retorna dados
[ ] GET /api/usuarios retorna dados
[ ] POST /api/eventos cria evento
[ ] POST /api/usuarios cria usuário
[ ] PUT /api/eventos/:id atualiza
[ ] DELETE /api/eventos/:id deleta

Conexão Frontend-Backend:
[ ] Página de teste carrega
[ ] Backend Online responde
[ ] Eventos carregam
[ ] Usuários carregam
[ ] Criar evento funciona
[ ] Criar usuário funciona
```

---

## 🎯 Próximos Passos

Se todos os testes passarem ✅:

1. **Integrar com Banco de Dados**
   - Conectar PostgreSQL (credenciais já estão no `.env`)

2. **Implementar Login/Autenticação**
   - Usar JWT (token já está no `.env`)

3. **Conectar Páginas HTML**
   - Fazer `index.html` carregar eventos da API
   - Fazer formulários chamar endpoints

4. **Testes em Produção**
   - Deploy no servidor remoto

---

## 📞 Resumo Rápido

**Para iniciar tudo:**

Terminal 1 (Backend):
```bash
cd c:\Users\heric\Desktop\TesteProjeto-main\backend
npm start
```

Terminal 2 (Frontend):
```bash
cd c:\Users\heric\Desktop\TesteProjeto-main\frontend
npm start
```

**Depois acesse:**
- Frontend: `http://177.44.248.44:3000`
- Teste: `http://177.44.248.44:3000/teste-conexao-api`
- Backend: `http://177.44.248.44:5000/api/eventos`

---

**Criado em:** 30 de Novembro de 2025 ✨
