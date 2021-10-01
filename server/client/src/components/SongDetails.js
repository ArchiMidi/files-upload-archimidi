import React from 'react'
import { useState } from 'react'
import service from '../api/service'
import { useEffect } from 'react'

export default function SongDetails(props) {

    const [song, setSong] = useState(null)
    const songId = props.match.params.id

    console.log(props)

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


    return (
        <div>
            {song && (
                <div>
                    <h1>{song.title}</h1>
                    <h3>{song.author}</h3>
                    <a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a>
                </div>)}
        </div>
    )
}
