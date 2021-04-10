const mongoose = require('mongoose');

const connectionTypeSchema = new mongoose.Schema({
  FormalName: String,
  Title: String,
});

module.exports = mongoose.model('ConnectionType', connectionTypeSchema);
