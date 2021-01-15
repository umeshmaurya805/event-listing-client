import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { useHistory } from 'react-router-dom';

function Nav() {
    const [User, setUser] = useState({})
    const history = useHistory();
    const logout = () => {
        history.push('/login');
        localStorage.clear();
        setUser({});
    }
    useEffect(async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
      },[]);
    
    return (
        <>
        <div className="navbar">
            <div className="logo">
                Event Listing
            </div>
                <div className="menu">
                
                    {
                        
                        User ? <div className="logged">
                            <Link to="/" className="menu-item">Home</Link>
                <Link to="/New-Event" className="menu-item">Add event</Link>
                            <Link to="/signup" className="menu-item">Sign Up</Link>

                        <div className="loggedUser">Logged in as {User.email}</div> &nbsp;
                        <div className="btn">
                     <button className="event-submit" onClick={logout}>
                         Logout
                         </button>
                     </div>                        </div>
                        :
                        <>
                        <Link to="/" className="menu-item">Home</Link>
                        <Link to="/New-Event" className="menu-item">Add event</Link>
                        <Link to="/login" className="menu-item">Login</Link>
                        <Link to="/signup" className="menu-item">Sign Up</Link>
                        
                        </>
            }
           </div>
                        </div>
        </>
    )
}

export default Nav
