const mongoose = require('mongoose');

const levelType = new mongoose.Schema({
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

module.exports = mongoose.model('Level', levelType);
