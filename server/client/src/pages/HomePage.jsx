import logo from "../logo.svg";
import "../App.css";


import React from 'react';
import { useState, useEffect } from "react";
// import the service file since we need it to send (and get) the data to(from) the server
import service from '../api/service';


function HomePage() {
  
 
    const [allMidi, setAllMidi] = useState([]);
    
    const getAllMidi = () => {
      return service
        .findAllMidi()
        .then(response => {
          console.log("response is: ", response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state
          // setSongUrl(response.secure_url);
          setAllMidi(response)
        })
        .catch(err => console.log('Error while uploading the file: ', err));  
    }

    useEffect(() => {
      getAllMidi()
  }, [])
    
  


    // axios get to /songs
    // res -> state
  
  
  return (<>
  <h1>DAMN BOII</h1>
  
    <midi-player
  src="https://cdn.jsdelivr.net/gh/cifkao/html-midi-player@2b12128/twinkle_twinkle.mid"
  sound-font visualizer="#myPianoRollVisualizer">
</midi-player>

<midi-visualizer type="piano-roll" id="myPianoRollVisualizer" 
  src="https://cdn.jsdelivr.net/gh/cifkao/html-midi-player@2b12128/twinkle_twinkle.mid">
</midi-visualizer>

<midi-player
  src="https://cdn.jsdelivr.net/gh/cifkao/html-midi-player@2b12128/twinkle_twinkle.mid"
  sound-font visualizer="#myStaffVisualizer">
</midi-player>

<midi-visualizer type="staff" id="myStaffVisualizer" 
  src="https://cdn.jsdelivr.net/gh/cifkao/html-midi-player@2b12128/twinkle_twinkle.mid">
</midi-visualizer>

<script src="https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.22.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.4.0"></script>

 </>
  );
}

export default HomePage;
