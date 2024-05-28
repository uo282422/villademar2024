// backend/routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

router.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

module.exports = router;
