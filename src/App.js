import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notestate from "./context/notes/Notestate";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import Alert from "./components/Alert";


const app = () => {
  return (
    <>
      <Notestate>

        <Router>
          <Navbar />
          {/* <Alert message="alert"/> */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              {/* <Route exact path="/about" element={<About />}></Route> */}
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
            </Routes>
          </div>
        </Router>
      </Notestate>


    </>
  )
}
export default app;