import React, { useState } from "react";
import "../Css/LoginStyles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  let loginvalues = {
    email: "",
    password: "",
    error: {
      email: "",
      password: ""

    }
  };
  //State Variables 
  
  const [Logindata, setlogindata] = useState(loginvalues);
  
  /// here is onchange function 
  const commonchange = (e) => {
    let error = { ...Logindata.error };
    if (e.target.value === "") {

      error[e.target.name] = `${e.target.name} is Required`;
    } else {

      error[e.target.name] = "";
    }
    setlogindata({ ...Logindata, [e.target.name]: e.target.value, error });

  };
  //Login Submission 
  const handlesumit =async () => {
   await axios.post("https://courier-tracker-service.onrender.com/api/signin",{...Logindata})
  .then((response)=>{
    localStorage.setItem("token",response.data);

const token = localStorage.getItem("token");

const existuser = jwtDecode(token);

 existuser.existUser.role === "admin" ? navigate('/admin' ) : navigate('/')
  })
  .catch((error)=>{
    alert(error.response.data.msg)
  })

};
  return (
    <>
         
           <Navbar/>
         <br/>
      <div className="page">

        <div className="cover" >
          <h1 >Welcome to  Login</h1>
<p className="text">If You Are An Admin It will Redirect To The DashBoard </p>
          <input placeholder="Sample@gmail.com" name="email"
            type="email"
            onChange={(e) => commonchange(e)}
            value={Logindata.email} />
          <input type="password" placeholder="password" 
             name="password"
            onChange={(e) => commonchange(e)}
            value={Logindata.password} />

          <button className="login-btn" onClick={handlesumit}>Login</button>
          <p className="text">Or SignUp</p>

          <div className="alt-login">
            <div className="signup"><Link to="/signup" className="signup">SignUp</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
