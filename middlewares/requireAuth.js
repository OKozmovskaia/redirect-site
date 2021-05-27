const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(402).send({error: 'Authorization token is not correct'});
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'MY_SECRET_TOKEN', async(err, payload) => {
    if(err){
      return res.status(401).send({error: err.message, name: err.name});
    };

    const client_id  = payload.data;
    req.client_id = client_id;
    next();
  })
}