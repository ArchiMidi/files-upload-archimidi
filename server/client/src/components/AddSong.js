import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';
import { useHistory } from 'react-router';

function AddSong(props) {
  let history = useHistory()

  const loggedInUser = props.user._id

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const [createdBy, setCreatedBy] = useState(loggedInUser)
  const [tag, setTag ] = useState('')
  const [tags, setTags] = useState([])
  const [tagToRemove, setTagToRemove] = useState(null)
  const [uploadStage, setUploadStage] = useState(0)


  // ******** this method handles just the file upload ********
  const handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    setUploadStage(1)
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
        setUploadStage(2)
      })
      .catch(err => console.log('Error while uploading the file: ', err));
  };

  // this method submits the form
  const handleSubmit = e => {
    e.preventDefault();

    service
      .saveNewSong({ title, author, songUrl, createdBy })
      .then(res => {
        console.log('added new song: ', res);
        history.push(`/songs/${res._id}`)
        // here you would redirect to some other pagess
      })
      .catch(err => console.log('Error while adding the new song: ', err));
  };


    const saveButton = <button type="submit">Save new song</button>
    const loadIcon = <p>Loading</p>
    const waitingIcon = <p>upload your file</p>

    
    const HandleTagSubmit = e => {
      e.preventDefault();
      setTags(tags => {
       var set = [tag, ...tags].map(el => el.toLowerCase()).filter((t, i, arr) => (arr.indexOf(t) === i))
       return set
      }
       )
      setTag('')
    }
    
  useEffect(() => {
    (tagToRemove !== null && 
      setTags([...tags].filter(tagChecked => tagChecked !== tagToRemove))
      )
    return () => {
      setTagToRemove(null)
    }
  }, [tags, tagToRemove])

  return (
    <div>   
      <h2>New Song</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </label>

        <label>Author</label>
        <textarea type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)} />

        <input type="file" onChange={handleFileUpload} />
        <div>{uploadStage > 1 ? saveButton : uploadStage > 0 ? loadIcon : waitingIcon}</div>
      </form>

      <form onSubmit={HandleTagSubmit}>
        <label>
          Tags
          <input type="text" name="tag" value={tag} onChange={e => setTag(e.target.value)} />
        </label>
        <button type="submit">Add Tag</button>
      </form>
      
      {tags.map(tag => 
      <>
          <p>{tag}</p> 
        <form onSubmit={
          e => e.preventDefault(),
          tag => setTagToRemove(tag)
          }>
        <button type="submit">x</button>
        </form>
        </>
        )}
    </div>
  );
}


export default AddSong;
