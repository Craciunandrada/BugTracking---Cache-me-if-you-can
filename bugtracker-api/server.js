const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./src/routes/authRoutes');
const proiectRoutes = require('./src/routes/proiectRoutes');
const bugRoutes = require('./src/routes/bugRoutes');

const app = express(); 

app.use(cors()); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/proiecte', proiectRoutes);
app.use('/api/buguri', bugRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ruleaza pe portul ${PORT}`);
});