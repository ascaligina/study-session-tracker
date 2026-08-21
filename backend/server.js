require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use('/api/sessioni', require('./routes/sessioni'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connesso a MongoDB');
    app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Errore di connessione a MongoDB:', err.message);
  });