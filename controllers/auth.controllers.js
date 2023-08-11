require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_KEY;
const express = require('express');
const app = express();
app.use(express.json());

exports.authenticateToken = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];


  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  });
} // authenticateToken

exports.generateToken = function(email, expiresIn){
    const token = jwt.sign({ email }, secretKey);
    console.log(token)
    return token;
} //generateToken
