const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');
const autentificare = require('../middleware/autentificare');

//Raportare bug (POST)
router.post('/raportare', autentificare, bugController.raporteazaBug);

// Vizualizare buguri
router.get('/proiect/:id_proiect', autentificare, bugController.getBuguriProiect);

router.put('/actualizare/:id_bug', autentificare, bugController.updateStatusBug);

module.exports = router;