const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart:{
    type: [String]
  }
});


const CustomerDetails = new mongoose.model('StoreCustomer', Customer);
module.exports = CustomerDetails;
