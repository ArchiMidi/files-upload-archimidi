const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MidiSong = new Schema(
  {
    title: String,
    author: String,
    songUrl: String,
    createdBy: String,
    genre: String,
    tags: Array
  },
  {
    timestamps: true
  }
);

module.exports = model('midiSong', MidiSong);
