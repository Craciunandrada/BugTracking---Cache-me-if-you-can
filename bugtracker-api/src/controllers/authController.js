const Utilizator = require('../models/Utilizator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, parola } = req.body;
    try {
        const utilizator = await Utilizator.findOne({ where: { email } });
        if (!utilizator) return res.status(404).json({ mesaj: 'Utilizator negasit' });

        const parolaValida = await bcrypt.compare(parola, utilizator.parola);
        if (!parolaValida) return res.status(401).json({ mesaj: 'Parola incorecta' });

        const token = jwt.sign(
            { id_user: utilizator.id_user, rol: utilizator.rol },
            process.env.JWT_SECRET || 'secret_cheie',
            { expiresIn: '7d' }
        );

        res.status(200).json({ mesaj: 'Autentificare reusita', token });
    } catch (err) {
        res.status(500).json({ mesaj: 'Eroare server', eroare: err.message });
    }
};

exports.register = (req, res) => {
    res.status(501).json({ mesaj: 'Inregistrarea nu este implementata inca' });
};