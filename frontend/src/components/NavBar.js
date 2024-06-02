import { NavLink } from 'react-router-dom';

export default function NavBar(props){
    //replace signup with sign out when values arent default
    var login;
    var signout;
    var welcome;
    const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>
    function signOut(event){
        event.preventDefault();
        props.setEmail("")
        props.setPassword("")
        props.setFirstName("")
        props.setLastName("")
    }

    if(props.email === "" && props.firstName === "" && props.lastName === ""){
        login = <li className="nav-link"><NavLink to="/login" className="text-link btn btn-med btn-outline-primary">Log In</NavLink></li>
        signout = <li className="nav-link"><NavLink to="/signup" className="text-link btn btn-med btn-primary">Sign Up</NavLink></li>
        welcome = null
    }else{
        login = null
        signout = 
        <li className="nav-link">
            <NavLink onClick={signOut} to="/" className="text-link btn btn-med btn-danger">
                Sign Out
            </NavLink>
        </li>
        welcome = <li>Welcome, {props.firstName} {props.lastName}</li>
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4">Chandler's Boba Store</span>
                </NavLink>
                <ul className="nav nav-pills align-items-center">
                    <li className="nav-link"><NavLink to="/about" className="text-link">About</NavLink></li>
                    <li className="nav-link"><NavLink to="/menu" className="text-link">Menu</NavLink></li>
                    <li className="nav-link"><NavLink to="/order" className="text-link">Order</NavLink></li>
                    <li className="nav-link"><NavLink to="/socials" className="text-link">Socials</NavLink></li>
                    {login}
                    {signout}
                    {welcome}
                    <li className="nav-link"><NavLink to="/cart" className="text-link">{cartIcon} {1}</NavLink></li>
                </ul>
            </header>
        </div>
    )
}