const express = require('express');
const router = express.Router();

let eventos = [
    { id: 1, nome: "Evento Teste 1" },
    { id: 2, nome: "Evento Teste 2" }
];

// Listar eventos
router.get('/', (req, res) => {
    res.json(eventos);
});

module.exports = router;
