import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios'

axios.get('http://localhost:5005/api/auth/loggedin')
  .then(response => {
    console.log('logged in user: ', response.data);
    const user = response.data;
    ReactDOM.render(
      <BrowserRouter>
        <App user={user} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
