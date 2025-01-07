document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Simuler un message de succès ou d'erreur après la soumission
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = "Fichier en cours de conversion...";
    messageDiv.className = ''; // Réinitialiser la classe

    // Simuler un délai de conversion
    setTimeout(function() {
        // Après un délai, on suppose que la conversion est réussie
        messageDiv.textContent = "Conversion réussie en MP3 !";
        messageDiv.className = 'success';
    }, 2000);

    // Si une erreur se produit
    // messageDiv.textContent = "Erreur lors de la conversion.";
    // messageDiv.className = 'error';
});
