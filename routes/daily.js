const express = require('express');
const router = express.Router();
const Daily = require('../models/Daily.js'); // Assurez-vous d'importer le modèle Daily

// Route pour créer un nouveau Daily
router.post('/create', async (req, res) => {
  try {
    // Récupérez les données du corps de la requête
    const { titre, description, image, prix } = req.body;

    // Créez une nouvelle instance du modèle Daily avec les données
    const newDaily = new Daily({
      titre,
      description,
      image,
      prix,
    });

    // Enregistrez le nouveau Daily dans la base de données
    const savedDaily = await newDaily.save();

    // Répondez avec le Daily créé
    res.status(201).json(savedDaily);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création du Daily' });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const latestDaily = await Daily.findOne().sort({ _id: -1 }).limit(1); // Trie par ID décroissant pour obtenir le dernier
    if (!latestDaily) {
      return res.status(404).json({ message: 'Aucun "daily" trouvé.' });
    }
    res.status(200).json(latestDaily);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
