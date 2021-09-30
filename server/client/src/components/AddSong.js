// components/AddMovie/index.jsx

import React, { Component } from 'react';
import { useState } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';

function AddSong() {
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [songUrl, setSongUrl] = useState('');

  // handleChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  // ******** this method handles just the file upload ********
  const handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('songUrl', e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        setSongUrl(response.secure_url);
      })
      .catch(err => console.log('Error while uploading the file: ', err));
  };

  // this method submits the form
  const handleSubmit = e => {
    e.preventDefault();

    service
      .saveNewSong({ title, description, songUrl })
      .then(res => {
        console.log('added new song: ', res);
        // here you would redirect to some other page
      })
      .catch(err => console.log('Error while adding the new song: ', err));
  };


    return (
      <div>
        <h2>New Song</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
          </label>

          <label>Description</label>
          <textarea type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />

          <input type="file" onChange={handleFileUpload} />

          <button type="submit">Save new movie</button>
        </form>
      </div>
    );
  }


export default AddSong;
