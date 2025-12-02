const express = require('express');
const router = express.Router();

let usuarios = [
    { id: 1, nome: "Usuário Teste 1", email: "teste1@email.com" },
    { id: 2, nome: "Usuário Teste 2", email: "teste2@email.com" }
];

// GET - Listar todos os usuários
router.get('/', (req, res) => {
    res.json(usuarios);
});

// GET - Buscar usuário por ID
router.get('/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(usuario);
});

// POST - Criar novo usuário
router.post('/', (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
    }

    const novoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// PUT - Atualizar usuário
router.put('/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (req.body.nome) usuario.nome = req.body.nome;
    if (req.body.email) usuario.email = req.body.email;

    res.json(usuario);
});

// DELETE - Deletar usuário
router.delete('/:id', (req, res) => {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const usuarioDeletado = usuarios.splice(index, 1);
    res.json(usuarioDeletado[0]);
});

module.exports = router;
