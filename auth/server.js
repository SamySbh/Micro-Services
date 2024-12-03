import express from 'express';
import { MongoClient } from 'mongodb';
import router from './routes.js';

const app = express();
const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'auth';

let db;

// Connexion MongoDB
MongoClient.connect(mongoUrl)
    .then(client => {
        console.log('✅ MongoDB connecté');
        db = client.db(dbName);
    })
    .catch(err => console.error('❌ Erreur MongoDB:', err));

app.use('/', router);

app.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}/`);
});