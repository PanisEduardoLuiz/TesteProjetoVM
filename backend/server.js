const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
const eventosRoutes = require('./routes/eventos');
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/eventos', eventosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Rota principal para teste
app.get('/', (req, res) => {
    console.log('GET / - API Online');
    res.send("✅ API Online e Funcionando! 🚀");
});

// Tratamento de erro para rotas não encontradas
app.use((req, res) => {
    console.log(`404 - Rota não encontrada: ${req.method} ${req.path}`);
    res.status(404).json({ mensagem: "Rota não encontrada", path: req.path });
});

const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║  ✅ BACKEND RODANDO                    ║
    ║  📍 http://127.0.0.1:${PORT}                  ║
    ║  📍 http://177.44.248.44:${PORT}              ║
    ║                                        ║
    ║  📌 Rotas:                             ║
    ║  GET    /api/eventos                   ║
    ║  POST   /api/eventos                   ║
    ║  PUT    /api/eventos/:id               ║
    ║  DELETE /api/eventos/:id               ║
    ║                                        ║
    ║  GET    /api/usuarios                  ║
    ║  POST   /api/usuarios                  ║
    ║  PUT    /api/usuarios/:id              ║
    ║  DELETE /api/usuarios/:id              ║
    ╚════════════════════════════════════════╝
    `);
});
