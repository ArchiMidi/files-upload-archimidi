import React from 'react'
import { useState } from 'react'
import service from '../api/service'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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

    {/* <Link to={`/songs/${song._id}`}><h1>{song.title}</h1></Link>
<a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>
Download</a></div>) */}
    return (
        <div>
            <h1>hello</h1>
            <h1>{song.title}</h1>
        </div>
    )
}
