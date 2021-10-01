import "../App.css";
import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';
import { Link } from "react-router-dom";

function SongsList() {

    const [allSongs, setAllSongs] = useState([]);
    
    const getAllSongs = () => {
      return service
        .findAllSongs()
        .then(response => {
          console.log("response is: ", response);
          setAllSongs(response)
        })
        .catch(err => console.log('Error while uploading the file: ', err));  
    }

    useEffect(() => {
      getAllSongs()
  }, [])

  const songsList = allSongs.map(song => <div key={song._id}><h1>{song.title}</h1><a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a></div>)
  
  return (<div>
  <h1>SongsList.jsx</h1>
  <Link to="/songs/add">
				<h2>Upload a MIDI file!</h2>
	</Link>
  {songsList}
  </div>
  );
}

export default SongsList;
