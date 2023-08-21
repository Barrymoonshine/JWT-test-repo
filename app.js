const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.post('/api/posts', (req, res) => {
  res.json({ message: 'Post created' });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'Barry',
    email: 'barry@barry.com',
  };
  // async approach
  jwt.sign({ user }, 'secret key', (err, token) => {
    res.json({
      token,
    });
  });
});

app.listen(5000, () => console.log('Server listening on port 5000'));
