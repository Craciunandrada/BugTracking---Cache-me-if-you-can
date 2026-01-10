const ListaBuguri = require('../models/ListaBuguri');

// Functie pentru raportarea unui bug nou
exports.raporteazaBug = async (req, res) => {
    try {
        const { id_proiect, severitate, prioritate, descriere_bug, link_commit } = req.body;

        const bugNou = await ListaBuguri.create({
            id_proiect,
            raportat_de: req.utilizatorDate.id_user, // Luam id din token
            severitate,
            prioritate,
            descriere_bug,
            link_commit,
            status: 'TO DO' 
        });

        res.status(201).json({ mesaj: 'Bug raportat cu succes!', bug: bugNou });
    } catch (err) {
        res.status(500).json({ mesaj: 'Eroare la raportarea bug-ului', eroare: err.message });
    }
};
// Functie pentru a vedea toate bug-urile unui proiect
exports.getBuguriProiect = async (req, res) => {
    try {
        const { id_proiect } = req.params; // Luam id din URL

        const buguri = await ListaBuguri.findAll({
            where: { id_proiect: id_proiect }
        });

        res.status(200).json(buguri);
    } catch (err) {
        res.status(500).json({ mesaj: 'Eroare la preluarea buguri', eroare: err.message });
    }
};
// Functie pentru actualizarea statusului unui bug
exports.updateStatusBug = async (req, res) => {
    try {
        const { id_bug } = req.params;
        const { status } = req.body;

        const bug = await ListaBuguri.findByPk(id_bug);
        if (!bug) return res.status(404).json({ mesaj: 'Bug negasit' });

        bug.status = status;
        await bug.save();

        res.status(200).json({ mesaj: 'Status actualizat cu succes!', bug });
    } catch (err) {
        res.status(500).json({ mesaj: 'Eroare la actualizare', eroare: err.message });
    }
};