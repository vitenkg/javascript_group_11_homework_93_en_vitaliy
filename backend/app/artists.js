const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const Artist = require('../models/Artist');
const config = require("../config");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        if (req.query.name) {
            const artistName = await Artist.find().sort({'name': 1});
            const artists = artistName.map(artist => {
                return artist.name
            });
            return res.send(artists);
        }

        const artists = await Artist.find().sort({'name': 1});
        res.send(artists);
    } catch (e) {
        res.sendStatus(500);
    }

});

router.post('/', auth, upload.single('photo'), async (req, res) => {
    console.log(req.body);
    if (!req.body.name) {
        return res.status(400).send('Data Not valid');
    }

    const artistData = {
        name: req.body.name,
        information: req.body.information || null,
        user: req.user._id,
        publish: req?.user?.role === "admin" || false,
    };

    if (req.file) {
        artistData.photo = '/public/uploads/' + req.file.filename;
    }
    console.log(artistData);

    const artist = new Artist(artistData);
    try {
        await artist.save();
        res.send(artist);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;