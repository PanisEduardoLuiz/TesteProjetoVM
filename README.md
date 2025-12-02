# Sistema de Gerenciamento de Eventos 🎉

## ✅ Correções Realizadas

### 1. **Rotas de Usuários** (`backend/routes/usuarios.js`)
- ✅ Implementadas operações CRUD completas:
  - **GET** `/api/usuarios` - Listar todos os usuários
  - **GET** `/api/usuarios/:id` - Buscar usuário por ID
  - **POST** `/api/usuarios` - Criar novo usuário
  - **PUT** `/api/usuarios/:id` - Atualizar usuário
  - **DELETE** `/api/usuarios/:id` - Deletar usuário

### 2. **Rotas de Eventos** (`backend/routes/eventos.js`)
- ✅ Melhoradas e expandidas:
  - **GET** `/api/eventos` - Listar todos os eventos
  - **GET** `/api/eventos/:id` - Buscar evento por ID
  - **POST** `/api/eventos` - Criar novo evento
  - **PUT** `/api/eventos/:id` - Atualizar evento
  - **DELETE** `/api/eventos/:id` - Deletar evento

### 3. **Servidor Backend** (`backend/server.js`)
- ✅ Corrigido e melhorado:
  - Adicionado middleware `express.json()`
  - Tratamento de erros para rotas não encontradas
  - Mensagens de inicialização mais informativas
  - Mudança de porta para **5000** (para evitar conflitos)

### 4. **Package.json**
- ✅ Script de desenvolvimento adicionado:
  - `npm start` - Inicia o servidor
  - `npm run dev` - Inicia com nodemon (se instalado)

---

## 🚀 Como Usar

### 1. **Instalar Dependências**
```bash
cd backend
npm install
```

### 2. **Iniciar o Servidor**
```bash
npm start
```

O servidor estará disponível em: `http://177.44.248.44:5000`

---

## 📡 Endpoints da API

### **Eventos**
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/eventos` | Listar todos |
| GET | `/api/eventos/:id` | Buscar por ID |
| POST | `/api/eventos` | Criar novo |
| PUT | `/api/eventos/:id` | Atualizar |
| DELETE | `/api/eventos/:id` | Deletar |

### **Usuários**
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Listar todos |
| GET | `/api/usuarios/:id` | Buscar por ID |
| POST | `/api/usuarios` | Criar novo |
| PUT | `/api/usuarios/:id` | Atualizar |
| DELETE | `/api/usuarios/:id` | Deletar |

---

## 📝 Exemplo de Requisições

### Criar Evento
```json
POST /api/eventos
{
  "nome": "Workshop Node.js",
  "descricao": "Aprenda Node.js",
  "data": "2025-12-25"
}
```

### Criar Usuário
```json
POST /api/usuarios
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

---

## 📂 Estrutura do Projeto

```
TesteProjeto-main/
├── backend/
│   ├── routes/
│   │   ├── eventos.js      ✅ Implementado
│   │   └── usuarios.js     ✅ Implementado
│   ├── server.js           ✅ Corrigido
│   ├── package.json        ✅ Atualizado
│   └── node_modules/
├── frontend/
│   ├── index.html
│   ├── Login.html
│   ├── Cadastro.html
│   ├── Eventos.html
│   ├── Minhas_inscricoes.html
│   ├── certificado.html
│   ├── Admin.html
│   ├── Logicafrontend.js
│   └── css/
│       └── style.css
├── banco/
└── README.md               ✅ Este arquivo
```

---

## 🎯 Próximos Passos

1. **Conectar com Banco de Dados**: Integrar MongoDB, PostgreSQL ou MySQL
2. **Autenticação**: Implementar JWT para login/logout
3. **Validação**: Adicionar schemas de validação (Joi, Yup)
4. **Testes**: Criar testes unitários e de integração
5. **Frontend**: Conectar as páginas HTML com a API

---

## ⚠️ Status

| Componente | Status |
|-----------|--------|
| Backend | ✅ Funcionando |
| Rotas Eventos | ✅ Completas |
| Rotas Usuários | ✅ Completas |
| Frontend | ⏳ Pendente conexão |
| Banco de Dados | ⏳ Não configurado |

---

## 📞 Suporte

Se encontrar erros, verifique:
1. Se Node.js está instalado: `node -v`
2. Se as dependências estão instaladas: `npm install`
3. Se a porta 5000 está livre

---

**Última atualização**: 30 de Novembro de 2025 ✨
