const mongoose = require('mongoose');

const connectionsSchema = new mongoose.Schema({
  Quantity: Number,
  ConnectionTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConnectionType',
  },
  CurrentTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CurrentType',
  },
  LevelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
  },
});

const connectionTypeSchema = new mongoose.Schema({
  FormalName: String,
  Title: String,
});

const currentTypeSchema = new mongoose.Schema({
  Description: String,
  Title: String,
});

const levelType = new mongoose.Schema({
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

module.exports = mongoose.model('Connections', connectionsSchema);
module.exports = mongoose.model('ConnectionType', connectionTypeSchema);
module.exports = mongoose.model('CurrentType', currentTypeSchema);
module.exports = mongoose.model('Level', levelType);
