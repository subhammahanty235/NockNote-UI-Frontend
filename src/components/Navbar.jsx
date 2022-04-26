import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
    
    let location = useLocation();
    const navigate = useNavigate();
    const logoutoper = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    //fetch user details to show user's name on the navbar

    const getdetails = async(token)=>{
        const res = await fetch("http://localhost:5000/api/auth/getuser",{
            method : "POST",
            headers:{
                'auth-token' : token
            }
        })
        const json = await res.json()
        localStorage.setItem('username' , json.name)
        
    }
    // getdetails(localStorage.getItem('token'))   
    const [usernme , setusername] = useState("")
    useEffect(() => {
        getdetails(localStorage.getItem('token'))   
        setusername(localStorage.getItem('username')) 
    
      
    }, [])
    

    // let username = localStorage.getItem('username')
    return (
        <nav className="navbar navbar-expand-lg navbar-light " id="navbar" style={{ backgroundColor: "#b3ffb3" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Nocknote</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li> */}


                    </ul>
                    {/* <input className="form-control me-2 d-flex align-items-center justify-content-center"  style={{width: "13rem" }} type="search" placeholder="Search" aria-label="Search"></input> */}
                    {!localStorage.getItem('token') ?
                        <form className="d-flex">

                            <Link to="/login" className={`btn btn-primary btn-sm mx-2 ${location.pathname==='/login' ? "d-none" : "d-block"}`} role="button" >Log in</Link>
                            <Link to="/signup" className={`btn btn-primary btn-sm mx-2 ${location.pathname==='/signup' ? "d-none" : "d-block"}`} role="button" >Sign Up</Link>
                        </form>
                        :
                        <div>
                            <span  style={{fontSize: "1rem" , borderRight:"3px solid black" , paddingRight:"4px"}}>
                                {usernme}
                            </span>
                            <button className="btn btn-outline-dark btn-sm mx-2" onClick={logoutoper} >Log out</button>

                        </div>
                    }

                </div>
            </div>
        </nav>
    )
}
export default Navbar