import React, { useState } from 'react';
import "../Css/LoginStyles.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import axios from "axios";
const Signup = () => {
    const navigate = useNavigate();
    let signupValues = {
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        confrimPassword: "",
        role: "user",
        error: {
            name: "",
            email: "",
            phoneNo: "",
            password: "",
            confrimPassword: "",
        }
    };
    //State Variables 

    const [formdata, setformdata] = useState(signupValues);

    /// here is onchange function 
    const commonchange = (e) => {
        let error = { ...formdata.error };
        if (e.target.value === "") {

            error[e.target.name] = `${e.target.name} is Required`;
        } else {

            error[e.target.name] = "";
        }
        setformdata({ ...formdata, [e.target.name]: e.target.value, error });

    };
    //Login Submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata)
        const response = axios.post("https://courier-tracker-service.onrender.com/api/signUp", { ...formdata })
            .then((response) => {
                if (response.status === 200) {
                    // Handle successful response
                    alert(response.data);
                    navigate('/login')
                } else {
                    // Handle error response
                    alert(response.status);
                }
            })
            .catch((error) => {
                alert(error);
                navigate('/')
            });

       
            
        setformdata(signupValues);
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="page">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="cover" >
                        <h1>SignUp Here !</h1>

                        <input placeholder="Name" name="name"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={formdata.name} />
                        <input placeholder="Sample@gmail.com" name="email"
                            type="email"
                            onChange={(e) => commonchange(e)}
                            value={formdata.email} />
                        <input placeholder="Phone No" name="phoneNo"
                            type="number"
                            onChange={(e) => commonchange(e)}
                            value={formdata.phoneNo} />
                        <input type="password" placeholder="password"
                            name="password"
                            onChange={(e) => commonchange(e)}
                            value={formdata.password} />
                        <input placeholder="confrim Password" name="confrimPassword"
                            type="password"
                            onChange={(e) => commonchange(e)}
                            value={formdata.confrimPassword} />
                        <button className="login-btn" type='submit'>Register</button>
                        <p className="text">already a registered user?</p>

                        <div className="alt-login">
                            <div className="signup"><Link to="/login" className="signup">Login</Link></div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Signup
