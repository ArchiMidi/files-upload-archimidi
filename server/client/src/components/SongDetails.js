import React from 'react'
import { useState } from 'react'
import service from '../api/service'
import { useEffect } from 'react'

export default function SongDetails(props) {
    
    const [song, setSong] = useState(null)
    const [midiPlayer, setMidiPlayer] = useState({body: null})
    
    const songId = props.match.params.id
    const deleteSong = async (id) => {
        try {
            const response = await service
            .deleteSong(id)
            console.log('song deleted:', response)
        } catch (err) {
            return console.log(err)
        }
    }
    
    const retrieveSong = async (id) => {
        try {
            const response = await service
            .getSong(id)
            console.log('song is:', response)
            setSong(response)
        } catch (err) {
            return console.log(err)
        }
    }
    
    useEffect(() => {
        retrieveSong(songId)
    }, [songId])
    
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
        song && setMidiPlayer({body: 
            <>
            <midi-player
            src={song.songUrl}
            sound-font visualizer="#myPianoRollVisualizer">
            </midi-player>
            
            <midi-visualizer type="piano-roll" id="myPianoRollVisualizer" 
            src={song.songUrl}>
            </midi-visualizer>
            
            </>})
        }, [song])
        
        
        return (
            <div>
            {song && (
                <div>
                <p>REALITY CHECK</p>
                <h1>{song.title}</h1>
                <h3>{song.author}</h3>
                <p>{song.songUrl}</p>
                <a href={song.songUrl} download={`${song.title}_${song.author}.mid`}>Download</a>
                <button onClick={() => deleteSong(song._id)}>Delete {song.title}</button>
                {(midiPlayer.body !== null) ? <div>{midiPlayer.body}</div> : <p>nothing to play</p>}
                </div>)}
                </div>
                )
            }
            