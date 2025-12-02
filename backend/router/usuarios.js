const express = require('express');
const router = express.Router();

let usuarios = [];

// Cadastro de usuário
router.post('/cadastro', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e e-mail são obrigatórios!" });
    }

    usuarios.push({ nome, email });
    res.json({ mensagem: "Usuário cadastrado com sucesso!", usuario: { nome, email }});
});

// Listar usuários
router.get('/', (req, res) => {
    res.json(usuarios);
});

module.exports = router;
