import React from 'react'
import { useState } from 'react'
import service from '../api/service'
import { useEffect } from 'react'

export default function SongDetails(props) {
    
    const [song, setSong] = useState(null)
    const [player, setPlayer] = useState({body: null})

    const songId = props.match.params.id
    
    const deleteSong = (id) => {
        return service
        .deleteSong(id)
        .then(response => {
            console.log('song deleted:', response)
            // setSong(response)
        })
        .catch(err => console.log(err))
    }
    
    const retrieveSong = (id) => {
        return service
        .getSong(id)
        .then(response => {
            console.log('song is:', response)
            setSong(response)
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        retrieveSong(songId)
    }, [])
    
    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.22.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.4.0";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

      useEffect(() => {
          (song ? setPlayer({body: <>
            <midi-player
            src={song.songUrl}
            sound-font visualizer="#myPianoRollVisualizer">
            </midi-player>
            
            <midi-visualizer type="piano-roll" id="myPianoRollVisualizer" 
            src={song.songUrl}>
            </midi-visualizer>
            
            </>}) : setPlayer({body: <p>no file to play</p>}))
    }, [song])
    
    
    return (
        <div>
        {song && (
            <div>
            <h1>{song.title}</h1>
            <h3>{song.author}</h3>
            <p>{song.songUrl}</p>
            <a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a>
            <button onClick={() => deleteSong(song._id)}>Delete {song.title}</button>
            {player.body && <div>{player.body}</div> }
            </div>)}
            </div>
            )
        }
        