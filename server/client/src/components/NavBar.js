import { useLocation, Link } from "react-router-dom"
import service from '../api/service'

export default function NavBar(props) {
    // console.log('logged in user is >>>>>>>>>>>>>>>>>>>>>>>>>>>', props.user)
    const path = useLocation().pathname

    const handleLogout = () => {
        service.logout()
            .then(() => {
                props.setUser(null)
            })
    }

    return (
        <nav>
            {props.user ? (
                <>
                    {path !== '/' &&
                        <Link to='/'>
                            <p>Home</p>
                        </Link>
                    }
                    <Link to="/" onClick={() => handleLogout()}>
                        <p>Logout</p>
                    </Link>
                    <Link to='/songs/add'>
                        <p>Upload Song</p>
                    </Link>
                </>
            ) : (
                <>
                    {path !== '/' &&
                        <Link to='/'>
                            <p>Home</p>
                        </Link>
                    }
                    {path === '/login' && <p>don't have an account?</p>}
                    {path !== '/signup' && <>
                        <Link to='/signup'>
                            <p>Sign up</p>
                        </Link>
                    </>
                    }
                    {(path !== '/signup' && path !== '/login') && <p>or</p>}
                    {path === '/signup' && <p>already  a user?</p>}
                    {path !== '/login' &&
                        <>
                            <Link to='/login'>
                                <p>Log in</p>
                            </Link>
                        </>
                    }
                    {(path !== '/signup' && path !== '/login') && <p>to upload a song </p>}
                </>
            )}
        </nav>
    )
}