import { Link } from "react-router-dom"
import service from '../api/service'

export default function NavBar(props) {

    console.log('logged in user is >>>>>>>>>>>>>>>>>>>>>>>>>>>', props.user)

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
                    <Link to='/'>
                        <p>Home</p>
                    </Link>
                    <Link to="/" onClick={() => handleLogout()}>
                        <button>logout</button>
                    </Link>
                </>
            ) : (
                <>
                    <Link to='/'>
                        <p>Home</p>
                    </Link>
                    <Link to='/signup'>
                        <p>Sign up</p>
                    </Link>
                    <Link to='/login'>
                        <p>Log in</p>
                    </Link>
                </>
            )}
        </nav>
    )
}