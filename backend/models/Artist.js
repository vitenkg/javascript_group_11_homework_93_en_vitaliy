const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  information: String,
  photo: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publish: {
    type: Boolean,
    required: true,
    default: false,
    enum: [true, false],
  },
});

ArtistSchema.plugin(idValidator);

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;