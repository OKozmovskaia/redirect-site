require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(authRoutes);

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo: ', err);
})

if(process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile('home.html' , { root : __dirname});
  })
}

app.listen(3000, () => {
  console.log('Listening on port 3000');
})