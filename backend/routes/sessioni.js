const express = require('express');
const router = express.Router();
const SessioneStudio = require('../models/SessioneStudio');

router.get('/', async (req, res) => {
  try {
    const sessioni = await SessioneStudio.find().sort({ data: -1 });
    res.json(sessioni);
  } catch (err) {
    res.status(500).json({ errore: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuovaSessione = new SessioneStudio(req.body);
    const sessioneSalvata = await nuovaSessione.save();
    res.status(201).json(sessioneSalvata);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const sessioneAggiornata = await SessioneStudio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!sessioneAggiornata) {
      return res.status(404).json({ errore: 'Sessione non trovata' });
    }
    res.json(sessioneAggiornata);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const sessioneEliminata = await SessioneStudio.findByIdAndDelete(req.params.id);
    if (!sessioneEliminata) {
      return res.status(404).json({ errore: 'Sessione non trovata' });
    }
    res.json({ messaggio: 'Sessione eliminata', sessione: sessioneEliminata });
  } catch (err) {
    res.status(500).json({ errore: err.message });
  }
});

module.exports = router;