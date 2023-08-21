const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secret key', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: 'Post created', authData });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'Barry',
    email: 'barry@barry.com',
  };
  // async approach
  jwt.sign({ user }, 'secret key', { expiresIn: '1h' }, (err, token) => {
    res.json({
      token,
    });
  });
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if not undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next
    next();
  } else {
    // Forbidden, 403 status is not authorised
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log('Server listening on port 5000'));
