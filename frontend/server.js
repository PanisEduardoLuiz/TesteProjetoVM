const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Servir arquivos estáticos (HTML, CSS, JS)
app.get('/', (req, res) => {
    console.log('GET / - Servindo index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/teste-conexao-api', (req, res) => {
    console.log('GET /teste-conexao-api - Servindo teste-conexao-api.html');
    res.sendFile(path.join(__dirname, 'teste-conexao-api.html'));
});

// Rota para teste rápido
app.get('/api-status', (req, res) => {
    console.log('GET /api-status - Retornando status');
    res.json({ 
        status: 'Frontend está rodando!',
        frontend: 'http://177.44.248.44:8081',
        backend: 'http://177.44.248.44:3000'
    });
});

// Tratamento de erro 404
app.use((req, res) => {
    console.log(`404 - Rota não encontrada: ${req.method} ${req.path}`);
    res.status(404).json({ erro: 'Rota não encontrada', path: req.path });
});

const PORT = 8081;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║  ✅ FRONTEND RODANDO                   ║
    ║  📍 http://127.0.0.1:${PORT}                  ║
    ║  📍 http://177.44.248.44:${PORT}              ║
    ║                                        ║
    ║  🧪 Teste de Conexão:                  ║
    ║  http://177.44.248.44:${PORT}/teste-conexao-api ║
    ║                                        ║
    ║  📌 Backend:                           ║
    ║  http://177.44.248.44:3000                 ║
    ╚════════════════════════════════════════╝
    `);
});
