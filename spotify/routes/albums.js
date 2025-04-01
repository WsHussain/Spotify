const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/albums', (req, res) => {
  const query = 'SELECT * FROM albums';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
