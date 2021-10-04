import { Link } from "react-router-dom";
import React from 'react'

export default function SongCard({ title, _id, songUrl, author }) {
    // console.log(title)

    return (
        <div>
            <Link to={`/songs/${_id}`}>
                <h3>{title}</h3>
            </Link>
            <a href={songUrl} download={`${title}_${author}.mid`}>Download</a>
        </div>
    )
}
