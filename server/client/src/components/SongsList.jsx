
import "../App.css";
import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';
import { Link } from "react-router-dom";
import SongCard from "./SongCard";



function SongsList(props) {

  const [allSongs, setAllSongs] = useState([]);
  const [search, setSearch] = useState('')

  const getAllSongs = () => {
    return service
      .findAllSongs()
      .then(response => {
        console.log("response is: ", response);
        setAllSongs(response)
      })
      .catch(err => console.log('Error while uploading the file: ', err));
  }



  //filter







  useEffect(() => {
    getAllSongs()
  }, [])

  let words = search.split(' ')
  let searchArg = (words.length === 1) ? words : words.join('.*')
  let Regx1 = new RegExp(searchArg, 'i')
  let searchArgRev = (words.length === 1) ? words : words.join('.*') + '|' + words.reverse().join(".*");
  let Regx2 = new RegExp(searchArgRev)

  const filteredUsers = allSongs.filter(song =>
    Regx1.test(song.title) || Regx2.test(song.title) ||
    song.author.toLowerCase().includes(search.toLowerCase())
  )


  // const songsList = allSongs.map(song => <div key={song._id}><h1>{song.title}</h1><a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a></div>)

  return (<>
    <h1>List of Songs</h1>
    <div className="filter">
      <label>Search by title or author: </label>
      <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} />
    </div>
    {/* {songsList} */}
    {filteredUsers.map(song => <SongCard key={song._id} {...song} />)}
  </>
  );
}

export default SongsList;
