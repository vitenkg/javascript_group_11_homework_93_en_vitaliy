const express = require('express');
const Track = require('../models/Track');
const Albums = require('../models/Album');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.album) {
            query.album = req.query.album;
            let tracks = await Track.find(query).populate('album').sort({'trackNumber': 1});
            return res.send(tracks);
        }

        if (req.query.artist) {
            let allTracks = [];
            query.artist = req.query.artist;
            const albums = await Albums.find(query).populate('artist', 'name');

            for (let i = 0; i < albums.length; i++) {
                const queryAlbum = {};
                queryAlbum.album = albums[i]._id;
                const tracks = await Track.find(queryAlbum).populate('album', 'name');
                allTracks = allTracks.concat(tracks);
            }

            return res.send(allTracks);
        }

        const tracks = await Track.find();
        res.send(tracks);

    } catch (e) {
        res.sendStatus(500);
    }

});

router.post('/', auth, async (req, res) => {
    if (!req.body.name || !req.body.album || !req.body.artist || !req.body.trackNumber) {
        return res.status(400).send('Data Not valid');
    }

    const trackData = {
        name: req.body.name,
        album: req.body.album,
        artist: req.body.artist,
        trackNumber: parseInt(req.body.trackNumber),
        lasting: req.body.lasting,
        user: req.user._id,
    };

    const track = new Track(trackData);
    try {
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const track = await Track.findByIdAndDelete(req.params.id);

        if (track) {
            res.send(`Product ${track.name} removed`);
        } else {
            res.status(404).send({error: 'Product no found'});
        }
    } catch (e) {

    }
})

module.exports = router;