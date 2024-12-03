import express from 'express';
import mongoose from 'mongoose';
import router from './user.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT;

const mongoUrl = process.env.MONGODB_URI;

app.use(express.json());

// Connexion MongoDB
mongoose.connect(mongoUrl)
    .then(client => {
        console.log('✅ MongoDB connecté');
    })
    .catch(err => console.error('❌ Erreur MongoDB:', err));

app.use('/', router);

app.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}/`);
});