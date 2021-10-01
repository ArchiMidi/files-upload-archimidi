// routes/thing.routes.js

const express = require('express');
const router = express.Router();

// **** require Song model in order to use it ****
const MidiSong = require('../models/MidiSong');

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');
const e = require('express');

// GET '/api/songs' => Route to list all available spmgs
router.get('/songs', (req, res, next) => {
  MidiSong.find()
    .then(songsFromDB => res.status(200).json(songsFromDB))
    .catch(err => next(err));
});

//GET single song

router.get('songs/:id', (req, res, next) => {
  MidiSong.findById(req.params.id)
    .then(song => {

      if (!song) {
        res.status(404).json(song)

      } else {
        res.status(200).json(song)
      }
    })
    .catch(err => next(err))

})


// POST '/api/upload' => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post('/upload', fileUploader.single('songUrl'), (req, res, next) => {
  console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path });
});

// POST '/api/songs/create' => for saving a new songs in the database
router.post('/songs/create', (req, res, next) => {
  console.log('body: ', req.body); //==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  MidiSong.create(req.body)
    .then(newlyCreatedSongFromDB => {
      res.status(200).json(newlyCreatedSongFromDB);
    })
    .catch(err => next(err));
});

module.exports = router;
