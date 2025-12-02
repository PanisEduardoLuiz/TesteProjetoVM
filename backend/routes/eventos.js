const express = require('express');
const router = express.Router();

let eventos = [
    { id: 1, nome: "Evento Teste 1", descricao: "Descrição do evento 1", data: "2025-12-01" },
    { id: 2, nome: "Evento Teste 2", descricao: "Descrição do evento 2", data: "2025-12-15" }
];

// GET - Listar todos os eventos
router.get('/', (req, res) => {
    res.json(eventos);
});

// GET - Buscar evento por ID
router.get('/:id', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.id));
    if (!evento) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
    }
    res.json(evento);
});

// POST - Criar novo evento
router.post('/', (req, res) => {
    const { nome, descricao, data } = req.body;
    
    if (!nome || !descricao || !data) {
        return res.status(400).json({ mensagem: "Nome, descrição e data são obrigatórios" });
    }

    const novoEvento = {
        id: eventos.length > 0 ? Math.max(...eventos.map(e => e.id)) + 1 : 1,
        nome,
        descricao,
        data
    };

    eventos.push(novoEvento);
    res.status(201).json(novoEvento);
});

// PUT - Atualizar evento
router.put('/:id', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.id));
    if (!evento) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    if (req.body.nome) evento.nome = req.body.nome;
    if (req.body.descricao) evento.descricao = req.body.descricao;
    if (req.body.data) evento.data = req.body.data;

    res.json(evento);
});

// DELETE - Deletar evento
router.delete('/:id', (req, res) => {
    const index = eventos.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    const eventoDeletado = eventos.splice(index, 1);
    res.json(eventoDeletado[0]);
});

module.exports = router;
