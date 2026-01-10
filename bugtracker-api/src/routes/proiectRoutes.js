const express = require('express');
const router = express.Router();
const proiectController = require('../controllers/proiectController');
const autentificare = require('../middleware/autentificare');

// Ruta pentru crearea unui proiect (protejata de login)
router.post('/creare', autentificare, proiectController.creeazaProiect);

module.exports = router;