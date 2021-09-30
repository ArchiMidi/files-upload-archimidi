const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MidiSong = new Schema(
  {
    title: String,
    description: String,
    songUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = model('midiSong', MidiSong);
