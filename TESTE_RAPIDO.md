# 🎯 Como Testar Conexão Frontend ↔ Backend - Guia Visual Rápido

## 🚀 Opção 1: Iniciar Tudo de Uma Vez (Recomendado)

### Windows CMD:
```bash
cd c:\Users\heric\Desktop\TesteProjeto-main
iniciar.bat
```

### Windows PowerShell:
```powershell
cd c:\Users\heric\Desktop\TesteProjeto-main
.\iniciar.ps1
```

Isso vai abrir 2 janelas de terminal e iniciar tudo automaticamente! 🎉

---

## 🧪 Opção 2: Iniciar Manualmente

### Terminal 1 - Backend:
```bash
cd c:\Users\heric\Desktop\TesteProjeto-main\backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd c:\Users\heric\Desktop\TesteProjeto-main\frontend
npm start
```

---

## ✅ Verificação da Conexão

### 1️⃣ **Abra o Navegador**
- Acesse: `http://177.44.248.44:3000/teste-conexao-api`

### 2️⃣ **Você verá uma página azul com 5 botões:**

```
┌─────────────────────────────────────┐
│  🧪 Teste de Conexão                │
│                                     │
│  🔗 Teste 1: Backend Online?        │
│     [Testar Conexão]                │
│                                     │
│  📋 Teste 2: Listar Eventos (GET)   │
│     [GET /api/eventos]              │
│                                     │
│  ➕ Teste 3: Criar Novo Evento      │
│     [POST /api/eventos]             │
│                                     │
│  👥 Teste 4: Listar Usuários (GET)  │
│     [GET /api/usuarios]             │
│                                     │
│  ➕ Teste 5: Criar Novo Usuário     │
│     [POST /api/usuarios]            │
└─────────────────────────────────────┘
```

### 3️⃣ **Clique em cada botão e observe:**

- ✅ **Resposta Verde** = Conectado com sucesso!
- ❌ **Resposta Vermelha** = Erro (veja o console F12)

---

## 📊 Fluxo de Testes

```
┌──────────────┐
│ Navegador    │
│              │
│ 177.44.248.44:3000│
└──────┬───────┘
       │
       │ http://177.44.248.44:3000
       │ (HTML/JS/CSS)
       │
   ┌───▼────────────────┐
   │ Frontend Server    │
   │ (Node/Express)     │
   │ Porta 3000         │
   └───┬────────────────┘
       │
       │ fetch('http://177.44.248.44:5000/api/...')
       │
   ┌───▼────────────────┐
   │ Backend API        │
   │ (Node/Express)     │
   │ Porta 5000         │
   │                    │
   │ /api/eventos       │
   │ /api/usuarios      │
   └────────────────────┘
```

---

## 🎨 Testes Disponíveis

### Teste 1: Backend Online?
```
Método: GET
URL: http://177.44.248.44:5000/
Status: 200
Resposta: ✅ API Online e Funcionando! 🚀
```

### Teste 2: Listar Eventos
```
Método: GET
URL: http://177.44.248.44:5000/api/eventos
Status: 200
Resposta: [
  {
    "id": 1,
    "nome": "Evento Teste 1",
    "descricao": "Descrição do evento 1",
    "data": "2025-12-01"
  },
  ...
]
```

### Teste 3: Criar Evento
```
Método: POST
URL: http://177.44.248.44:5000/api/eventos
Body: {
  "nome": "Evento teste",
  "descricao": "Descrição",
  "data": "2026-02-01"
}
Status: 201
Resposta: {
  "id": 4,
  "nome": "Evento teste",
  "descricao": "Descrição",
  "data": "2026-02-01"
}
```

### Teste 4: Listar Usuários
```
Método: GET
URL: http://177.44.248.44:5000/api/usuarios
Status: 200
Resposta: [
  {
    "id": 1,
    "nome": "Usuário Teste 1",
    "email": "teste1@email.com"
  },
  ...
]
```

### Teste 5: Criar Usuário
```
Método: POST
URL: http://177.44.248.44:5000/api/usuarios
Body: {
  "nome": "Novo Usuário",
  "email": "novo@email.com"
}
Status: 201
Resposta: {
  "id": 3,
  "nome": "Novo Usuário",
  "email": "novo@email.com"
}
```

---

## 🔧 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Não consegue conectar" | Certifique-se que os 2 servidores estão rodando (verifique os terminais) |
| "CORS error" | Já foi corrigido no backend. Atualize o código. |
| "Porta 3000/5000 já em uso" | Feche outro programa usando essa porta ou mude em `server.js` |
| "404 Not Found" | Verifique se a URL está correta (case-sensitive) |
| "Resposta em branco" | Abra o console (F12) e veja o erro completo |

---

## 📱 URLs Importantes

| Descrição | URL |
|-----------|-----|
| **Home** | http://177.44.248.44:3000 |
| **Teste de Conexão** | http://177.44.248.44:3000/teste-conexao-api |
| **API Eventos** | http://177.44.248.44:5000/api/eventos |
| **API Usuários** | http://177.44.248.44:5000/api/usuarios |
| **Status da API** | http://177.44.248.44:5000/ |

---

## 💡 Dicas

1. **Abra o Console do Navegador (F12)** para ver detalhes de erros
2. **Use o Postman** para testes mais profissionais
3. **Verifique os Logs** nos terminais quando algo falhar
4. **Limpe o Cache** se os dados não aparecerem (Ctrl+Shift+Del)
5. **Reinicie os Servidores** se algo estranho acontecer

---

## ✨ Se Tudo Passou em Verde

Parabéns! 🎉 Você tem:

- ✅ Frontend rodando corretamente
- ✅ Backend rodando corretamente
- ✅ Comunicação funcionando
- ✅ CRUD de Eventos funcionando
- ✅ CRUD de Usuários funcionando

**Próximos passos:**
- Conectar com Banco de Dados (PostgreSQL - já configurado no `.env`)
- Implementar Autenticação (JWT - já no `.env`)
- Integrar as páginas HTML com a API

---

**Última atualização:** 30 de Novembro de 2025
