
import "../App.css";
import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';
import { Link } from "react-router-dom";
import SongCard from "./SongCard";



function SongsList(props) {

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




  // const songsList = allSongs.map(song => <div key={song._id}><h1>{song.title}</h1><a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a></div>)



  return (<>
    <h1>List of Songs</h1>
    {/* {songsList} */}
    {allSongs.map(song => <SongCard key={song._id} {...song} />)}
  </>
  );
}

export default SongsList;
