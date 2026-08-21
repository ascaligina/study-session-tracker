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

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const utente = await Utente.findOne({ email });
    if (!utente) {
      return res.status(401).json({ errore: 'Credenziali non valide' });
    }
    const passwordCorretta = await bcrypt.compare(password, utente.password);
    if (!passwordCorretta) {
      return res.status(401).json({ errore: 'Credenziali non valide' });
    }
    const token = jwt.sign(
      { id: utente._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      utente: { id: utente._id, nome: utente.nome, email: utente.email },
    });
  } catch (err) {
    res.status(500).json({ errore: err.message });
  }
});

module.exports = router;