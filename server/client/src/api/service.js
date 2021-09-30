import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5005/api'
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

const data = {
  service,
  handleUpload,
  saveNewSong,
  findAllSongs
};

export default data;