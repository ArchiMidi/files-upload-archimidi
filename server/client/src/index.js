import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios'

axios.get('/api/auth/loggedin')
  .then(response => {
    console.log('logged in user: ', response.data);
    const user = response.data;
    ReactDOM.render(
      <Router>
        <App user={user} />
      </Router>,
      document.getElementById('root')
    );
  })
