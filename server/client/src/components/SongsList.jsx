
import "../App.css";
import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';
import { Link } from "react-router-dom";
import SongCard from "./SongCard";




function SongsList(props) {

  const [allSongs, setAllSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [searchFields, setSearchFields] = useState({ title: true, author: true })

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
  let Regx2 = new RegExp(searchArgRev, 'i')



  const filteredUsers = allSongs.filter(song => {

    if (searchFields.title === true && searchFields.author === true) {
      return ((Regx1.test(song.title) || Regx2.test(song.title)) || (Regx1.test(song.author) || Regx2.test(song.author)))

    } else if (searchFields.title === false && searchFields.author === true) {
      return Regx1.test(song.author) || Regx2.test(song.author)

    } else if (searchFields.title === true && searchFields.author === false) {
      return Regx1.test(song.title) || Regx2.test(song.title)

    } else {
      return allSongs
    }
  })


  // const songsList = allSongs.map(song => <div key={song._id}><h1>{song.title}</h1><a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a></div>)

  return (<>
    <h1>List of Songs</h1>
    <div className="filter">
      <label>Search by title or author: </label>
      <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} />
    </div>
    <label>
      Search by Title
      <input
        name="title"
        type="checkbox"
        checked={searchFields.title}
        onChange={e => setSearchFields({ ...searchFields, title: e.target.checked })} />
    </label>
    <br />
    <label>
      Search by Author
      <input
        name="author"
        type="checkbox"
        checked={searchFields.author}
        onChange={e => setSearchFields({ ...searchFields, author: e.target.checked })} />
    </label>
    {/* {songsList} */}
    {filteredUsers.map(song => <SongCard key={song._id} {...song} />)}
  </>
  );
}

export default SongsList;
