import { useLocation, Link } from "react-router-dom"
import service from '../api/service'

export default function NavBar(props) {
    // console.log('logged in user is >>>>>>>>>>>>>>>>>>>>>>>>>>>', props.user)
    
    const handleLogout = () => {
        service.logout()
        .then(() => {
            props.setUser(null)
        })
    }
    
    const path = useLocation().pathname
    
    return (
        <nav>
        {props.user ? (
            <>
            <Link to='/'>
            <p>Home</p>
            </Link>
            <Link to="/" onClick={() => handleLogout()}>
            <p>Logout</p>
            </Link>
            <Link to='/songs/add'>
            <p>Upload Song</p>
            </Link>
            </>
            ) : (
                <>
                <Link to='/'>
                <p>Home</p>
                </Link>
                {path !== '/signup' && <>
                <Link to='/signup'>
                <p>Sign up</p>
                </Link>
                </>}
                {(path !== '/signup' && path !== '/login' ) && <p>or</p>}
                {path !== '/login' && <>
                <Link to='/login'>
                <p>Log in</p>
                </Link>
                </>}
                {(path !== '/signup' && path !== '/login' ) && <p>to upload a song </p>}
                </>
                )}
                </nav>
                )
            }