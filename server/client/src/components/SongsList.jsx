import logo from "../logo.svg";
import "../App.css";


import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';
import { Link } from "react-router-dom";
import SongDetails from "./SongDetails";


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

  const songsList = allSongs.map(song => <SongDetails key={song._id} {...song} />)



  return (<>
    <h1>List of Songs</h1>
    {songsList}
  </>
  );
}

export default SongsList;
