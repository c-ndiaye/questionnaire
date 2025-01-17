// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

// Endpoint to get all responses
app.get('/responses', (req, res) => {
  db.query('SELECT * FROM responses ORDER BY submission_date DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to add a new response
app.post('/responses', (req, res) => {
  const { enqueteur_nom, quartier, q_d8, q_d9, q_d10, q_d11 } = req.body;
  const query = 'INSERT INTO responses (enqueteur_nom, quartier, q_d8, q_d9, q_d10, q_d11) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [enqueteur_nom, quartier, q_d8, q_d9, q_d10, q_d11], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

// Endpoint to update a response
app.put('/responses/:id', (req, res) => {
  const { id } = req.params;
  const { enqueteur_nom, quartier, q_d8, q_d9, q_d10, q_d11 } = req.body;
  const query = 'UPDATE responses SET enqueteur_nom = ?, quartier = ?, q_d8 = ?, q_d9 = ?, q_d10 = ?, q_d11 = ? WHERE id = ?';
  db.query(query, [enqueteur_nom, quartier, q_d8, q_d9, q_d10, q_d11, id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Response updated' });
  });
});

// Endpoint to delete a response
app.delete('/responses/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM responses WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Response deleted' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});