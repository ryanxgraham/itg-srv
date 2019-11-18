const express = require('express');
const router = express.Router();

const models = require('../models');
const Simfile = models.Simfile;


/* GET simfile data given parameters*/
router.get('/', function(req, res) {
    const filter = {};
    if (req.query.name) {
        filter.song_name = req.query.name;
    };
    if (req.query.artist) {
        filter.song_artist = req.query.artist;
    };
    if (req.query.minBpm) {
        filter.bpm = filter.bpm || {};
        filter.bpm.$gte = Number(req.query.minBpm);
    };
    if (req.query.maxBpm) {
        filter.bpm = filter.bpm || {};
        filter.bpm.$lte = Number(req.query.maxBpm);
    };

    const db = req.db;
    Simfile.find(filter)
        .lean()
        .exec((err, simfiles) => {
            if (err) {
                res.json({
                    msg: "Error",
                    err: err
                });
            } else {
                res.json(simfiles);
            }
        });
});

module.exports = router;
