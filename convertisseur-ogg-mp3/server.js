const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });  // Dossier pour les fichiers téléchargés

// Servez les fichiers statiques (HTML, CSS, JS) du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour convertir OGG en MP3
app.post('/convert', upload.single('audioFile'), (req, res) => {
    const inputFilePath = req.file.path;
    const outputFilePath = `uploads/${path.parse(req.file.originalname).name}.mp3`;

    // Utilisation de FFmpeg pour convertir le fichier OGG en MP3
    ffmpeg(inputFilePath)
        .output(outputFilePath)
        .on('end', () => {
            // Renvoie le fichier MP3 converti
            res.download(outputFilePath, () => {
                // Nettoyage des fichiers temporaires
                fs.unlinkSync(inputFilePath);
                fs.unlinkSync(outputFilePath);
            });
        })
        .on('error', (err) => {
            res.status(500).send('Erreur lors de la conversion : ' + err.message);
        })
        .run();
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
