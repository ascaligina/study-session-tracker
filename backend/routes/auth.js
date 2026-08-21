const express = require('express');
const router = express.Router();
const Utente = require('../models/Utente');

router.post('/registrati', async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    const nuovoUtente = new Utente({ nome, email, password });
    await nuovoUtente.save();
    res.status(201).json({
      messaggio: 'Utente registrato con successo',
      utente: { id: nuovoUtente._id, nome: nuovoUtente.nome, email: nuovoUtente.email },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ errore: 'Email già registrata' });
    }
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;