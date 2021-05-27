const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.get('/get-token', (req,res) => {
  const { client_id, client_secret } = req.body;
  const token = jwt.sign({expiresIn: '24h', data: client_id}, 'MY_SECRET_TOKEN')
  res.send({token: token});
});

router.post('/add-user', requireAuth, async (req, res) => {
  const {name, phone} = req.body;

  try {
    const user = new User({name, phone});
    await user.save();

    res.send(`Your client ID: ${req.client_id}`);

  } catch (err) {
    return res.status(422).send(err.message);
  }  
});

module.exports = router;