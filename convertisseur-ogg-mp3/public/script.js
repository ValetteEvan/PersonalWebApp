document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Empêche le rechargement de la page

    const formData = new FormData();
    const audioFile = document.querySelector('input[type="file"]').files[0];
    formData.append('audioFile', audioFile);

    // Afficher un message de traitement
    document.getElementById('message').textContent = "Conversion en cours...";

    fetch('/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        // Créer un lien de téléchargement pour le fichier MP3
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted.mp3';
        link.click();
        document.getElementById('message').textContent = "Conversion terminée ! Téléchargement...";
    })
    .catch(error => {
        document.getElementById('message').textContent = "Erreur : " + error.message;
    });
});
