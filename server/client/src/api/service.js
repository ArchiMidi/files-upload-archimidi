import axios from 'axios';


const service = axios.create({
  baseURL: '/api'
});

const errorHandler = err => {
  throw err;
};

const findAllSongs = () => {
  return service
    .get('/songs')
    .then(res => res.data)
    .catch(errorHandler);
}

const getSong = (songId) => {
  return service
    .get(`/songs/${songId}`)
    .then(res => res.data)
    .catch(errorHandler)
}

const handleUpload = file => {
  return service
    .post('/upload', file)
    .then(res => res.data)
    .catch(errorHandler);
};

const saveNewSong = newSong => {
  return service
    .post('/songs/create', newSong)
    .then(res => res.data)
    .catch(errorHandler);
};

const deleteSong = (songId) => {
  return service
    .delete(`/${songId}`)
    .then(res => res.data)
    .catch(errorHandler)
}
//**********<-----------Authentication Starts here---------->**********/

const signup = (username, password) => {
  return service.post('/auth/signup', { username, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data
    })
}

const login = (username, password) => {

  return service.post('/auth/login', { username, password })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

const logout = () => {
  return service.delete('/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    })
}


const data = {
  service,
  deleteSong,
  handleUpload,
  saveNewSong,
  findAllSongs,
  getSong,
  signup,
  login,
  logout
};



export default data;
