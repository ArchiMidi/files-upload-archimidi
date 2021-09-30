import logo from "../logo.svg";
import "../App.css";


import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';


function SongsList() {

    const [allMidi, setAllMidi] = useState([]);
    
    const getAllMidi = () => {
      return service
        .findAllMidi()
        .then(response => {
          console.log("response is: ", response);
          setAllMidi(response)
        })
        .catch(err => console.log('Error while uploading the file: ', err));  
    }

    useEffect(() => {
      getAllMidi()
  }, [])

  const songsList = allMidi.map(song => <div key={song._id}><h1>{song.title}</h1><a href={song.songUrl} download={`${song.title}_${song.description}.mid`}>Download</a></div>)
  
  return (<>
  <h1>List of Songs</h1>
  {songsList}
  </>
  );
}

export default SongsList;
