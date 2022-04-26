import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import emailjs from 'emailjs-com'
// import nodemailer from 'nodemailer'
// import notecontext from '../context/notes/notecontext';
const Login = (props) => {
    const [credential, setcredential] = useState({ email: "", password: "" });
    let navigate = useNavigate();











    //function for handling 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const responce = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await responce.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('username', json.username)
            navigate('/')
        }
        else {
            alert('invalid credentials')
            setcredential({ email: "", password: "" })
        }

    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    //forgot password logic
    // const sendmail =(email , otp)=>{
    //     // let transporter = nodemailer.createTransport({
    //     //     service: 'gmail',
    //     //     auth: {
    //     //       user: '',
    //     //       pass: 'yourpassword'
    //     //     }
    //     //   });

    // }
    const [autootp, setautootp] = useState(Math.floor(Math.random() * (9767 - 1019 + 1)) + 1019)
    const [inputotp, setinpo] = useState("")
    const [emailid, setemailid] = useState("")
    const generaterandom = () => {
        setautootp(Math.floor(Math.random() * (9767 - 1019 + 1)) + 1019)
        // console.log(autootp)

    }
    const onChangeemail = (e) => {
        setemailid(e.target.value)
        // console.log(emailid)
    }
    
    const onchangeotp = (e) => {
        setinpo(e.target.value)

        // if(inputotp === autootp)

    }
    console.log(autootp)
    const [valid, setvalid] = useState(false)
    //state to check whether otp is sent or not , if sent then we will hide the email input section ans show the otp section
    const [otpsent , setotpsent] = useState(false)
    //function to send otp to the use's email id
    const getOTP = async() => {
        console.log("printing data")
            console.log(emailid)
            console.log(autootp)
            const res =await fetch("http://localhost:5000/api/otppwrst/sendotp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailid, otp: autootp })

            })
            if(res.ok == true)setotpsent(true)
            console.log(res);
            
       


    }
    const validate = () => {
        if (inputotp == autootp) {
            // console.log("valid")
            setvalid(true)
            setinpo("");
        }
        else {
            console.log("not valid")
        }
    }
    const [newpassword, setnewpw] = useState("")
    const newpw = (e) => {
        setnewpw(e.target.value);
    }
    //state to show change password button
    const passwordChange = async () => {
        const responce = await fetch("http://localhost:5000/api/auth/forgotpassword", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ email: emailid, newpw: newpassword })
        })
        console.log(responce)
        navigate('/')
    }
    return (
        <>
            <h3 className="text-center mx-3 my-5">Log In to your account</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="credemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="credemail" name='email' value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                    {/* s<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3" >
                    <label htmlFor="credpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onChange} id="credpassword" name='password' />
                </div>

                <button type="submit" className="btn btn-outline-primary">log in</button>
                <button type="button" className="btn btn-outline-danger mx-3" data-bs-toggle="modal" data-bs-target="#pwChangeModal" onClick={generaterandom}>Forgot Password</button>
            </form>


            {/* <!-- forgot password Modal --> */}
            <div className="modal fade" id="pwChangeModal" tabindex="-1" aria-labelledby="pwChangeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="pwChangeModalLabel">Change your Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            {/* //email id input section */}
                            <div className={otpsent == false?'d-block':'d-none'}>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Enter Your email id" aria-label="Enter Your email id" name='email' onChange={onChangeemail} value={emailid}  aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={getOTP}>Get OTP</button>
                            </div>
                            </div>
                            {/* otp section */}
                            <div id="otpsection" className={otpsent == true?'d-block':'d-none'}>
                                <p>An email has been sent to your email id with an otp , please enter the otp below... <br />take a look in the spam folder in case you can't find out the otp </p>
                                <div class="col-md-2">
                                    <label for="inputotp" class="form-label">OTP</label>
                                    <input type="number" class="form-control" id="inputotp" name="inputotp" value={inputotp} onChange={onchangeotp} minLength='4' required />
                                    <button className='btn btn-sm btn-outline-success my-2' onClick={validate}>Click</button>
                                </div>

                            </div>
                            {/* <p>{valid}</p> */}
                            {/* Validate Otp section */}
                            
                            <div className={valid == true ? "d-block" : 'd-none'}>
                                {/* new password input */}
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Verified, Enter Your New Password</label>
                                    <input type="password" class="form-control" id="inputPassword4" onChange={newpw} value={newpassword} placeholder='Enter new password' />
                                    <button type="button" className="btn btn-primary" onClick={passwordChange}>Change Password</button>
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary" onClick={passwordChange}>Change Password</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login