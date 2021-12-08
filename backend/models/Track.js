const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lasting: String,
    trackNumber: Number,
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
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

TrackSchema.plugin(idValidator);

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;