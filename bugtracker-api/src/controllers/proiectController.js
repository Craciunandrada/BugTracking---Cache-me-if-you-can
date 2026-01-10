const Proiect = require('../models/Proiect');
const ListaMembri = require('../models/ListaMembri');

// Functie pentru crearea unui proiect nou (doar pentru MP)
exports.creeazaProiect = async (req, res) => {
    try {
        const { nume, url } = req.body;
        
        // Cream proiectul in baza de date
        const proiectNou = await Proiect.create({
            nume,
            url,
            id_user: req.utilizatorDate.id_user // Luam id din token
        });

        // Adaugam creatorul automat in lista de membri ca MP
        await ListaMembri.create({
            id_proiect: proiectNou.id_proiect,
            id_user: req.utilizatorDate.id_user,
            rol_membru: 'MP'
        });

        res.status(201).json({ mesaj: 'Proiect creat cu succes!', proiect: proiectNou });
    } catch (err) {
        res.status(500).json({ mesaj: 'Eroare la crearea proiectului', eroare: err.message });
    }
};