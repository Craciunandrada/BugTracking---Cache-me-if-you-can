const sequelize = require('./config/bazaDate'); 
const Utilizator = require('./models/Utilizator');
const Proiect = require('./models/Proiect');
const ListaMembri = require('./models/ListaMembri');
const ListaBuguri = require('./models/ListaBuguri');
const bcrypt = require('bcrypt');

const hashPassword = async (parola) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(parola, salt);
};

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Baza de date sincronizata (tabele sterse si recreate).');

        const parolaMP = 'mp12345';
        const parolaTST = 'tst12345';
        const parolaHashMP = await hashPassword(parolaMP);
        const parolaHashTST = await hashPassword(parolaTST);

        const mpUtilizator = await Utilizator.create({
            email: 'mp@example.com',
            parola: parolaHashMP, 
            nume: 'MP Dezvoltator',
            rol: 'MP',
            data_creare: new Date()
        });

        const tstUtilizator = await Utilizator.create({
            email: 'tst@example.com',
            parola: parolaHashTST, 
            nume: 'TST Tester',
            rol: 'TST',
            data_creare: new Date()
        });
        console.log('Utilizatori demo creati.');


        const demoProiect = await Proiect.create({ 
            nume: 'BugTracker Demo Proiect',
            url: 'https://github.com/Craciunandrada/BugTracking---Cache-me-if-you-can', 
            id_user: mpUtilizator.id_user, 
            data_creare: new Date()
        });
        console.log('Proiect demo creat.');

        await ListaMembri.create({
            id_proiect: demoProiect.id_proiect,
            id_user: mpUtilizator.id_user,
            rol_membru: 'MP'
        });

        await ListaMembri.create({
            id_proiect: demoProiect.id_proiect,
            id_user: tstUtilizator.id_user,
            rol_membru: 'TST'
        });
        console.log('Membrii proiectului adaugati.');

 
        await ListaBuguri.create({
            id_proiect: demoProiect.id_proiect,
            raportat_de: tstUtilizator.email,
            severitate: 'high',
            prioritate: 'medium',
            descriere_bug: 'Eroare la trimiterea formularului de checkout.',
            link_commit: 'a9c5c3d',
            status: 'TO DO'
        });
        console.log('Bug demo raportat.');

        console.log('Popularea bazei de date finalizata cu succes!');
        process.exit(0);

    } catch (error) {
        console.error('Eroare populare baza de date:', error.message);
        process.exit(1);
    }
}

seedDatabase();