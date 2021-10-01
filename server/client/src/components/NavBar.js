import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            {/* <img src="/server/client/public/images/home.png" alt="home">  </img> */}
            <Link to='/'>
                <p>Home</p>
            </Link>
            <Link to='/signup'>
                <p>Sign up</p>
            </Link>
            <Link to='/login'>
                <p>Log in</p>
            </Link>
        </nav>
    )
}