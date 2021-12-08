const History = require("../models/TrackHistory");
const express = require("express");
const dayjs = require('dayjs');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const history = await History.find(req.user._id).populate('track', 'name').populate('artist', 'name').sort({datetime: -1});
    try {
        res.send(history);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/', auth, async (req, res) => {
    if (!req.body.artist || !req.body.track) {
        return res.status(400).send('Data Not valid');
    }
    const date = dayjs(new Date());
    const historyData = {
        datetime: date,
        track: req.body.track,
        artist: req.body.artist,
        user: req.user._id,
    }

    const history = new History(historyData);

    try {
        await history.save();
        res.send(history);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.delete('/:id', async (req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id);
        res.send('was deleted');
   } catch (e) {

    }

});

module.exports = router;