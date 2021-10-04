import { Link } from "react-router-dom";


import React from 'react'

export default function SongCard({ title, _id, songUrl, author }) {
    console.log(title)

    // const songsList = allSongs.map(song => <div key={song._id}><h1>{song.title}</h1><a href={song.songUrl} download={`${song.title}_${song.author}.midi`}>Download</a></div>)
    return (
        <div>
            <Link to={`/songs/${_id}`}>
                <h3>{title}</h3>
            </Link>
            <a href={songUrl} download={`${title}_${author}.mid`}>Download</a>
        </div>
    )
}
