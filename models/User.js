const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Name required']
  },
  phone:{
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2}\s\d{3}\s\d{2}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    unique: [true, 'Phone number is exist'],
    required: [true, 'Phone number required']
  },
  shopPoints:{
    type: Number,
    default: 50
  }
})

mongoose.model('User', userSchema);