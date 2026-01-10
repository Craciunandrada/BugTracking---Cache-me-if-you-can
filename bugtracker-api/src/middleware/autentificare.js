const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Citim token-ul din header
        const decodificat = jwt.verify(token, process.env.JWT_SECRET || 'secret_cheie');
        req.utilizatorDate = decodificat; // Salvam datele utilizatorului (id si rol) in cerere
        next();
    } catch (eroare) {
        return res.status(401).json({ mesaj: 'Autentificare esuata! Lipseste token-ul.' });
    }
};