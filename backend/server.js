const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const port = 5000;

const connection = mysql.createConnection({
    host: 'localhost',
    password: 'spotypwd',
    user: 'spoty',
    database: 'spotify',
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});



app.use(cors());
app.use(bodyParser.json());

  app.get('/api', (req, res) => {
    return res.send('hello World!');
  })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

