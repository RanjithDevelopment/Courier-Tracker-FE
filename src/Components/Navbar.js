import "../Css/NavbarStyles.css";
import React ,{useState}from 'react'
import { Link } from "react-router-dom";
import {FaBars,FaTimes} from "react-icons/fa";

function Navbar(){
const [click,setClick]=useState(false);
const handleClick =()=>setClick(!click);
const [color,setColor]=useState(false);
const changeColor=()=>{
  if(window.scrollY >=100 ){
    setColor(true);
}else{
  setColor(false);
}
}; 
window.addEventListener("scroll",changeColor);
  return (
    <div className={color ? "header header-bg":"header" }>
      <Link to='/' >
      
      <h1 >Ranjith</h1>
      </Link>
      <ul className={click ? "nav-menu active" :"nav-menu"}>
        <li>
            <Link to='/'>Login</Link>
        </li>
        <li>
            <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
            <Link to='/tracker'>Tracking</Link>
        </li>
             
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {
click ? ( <FaTimes size={20} style={{color:"#fff"}}/>) :(<FaBars size={20} style={{color:"#fff"}}/>)
        }
       
        
      </div>
    </div>
  )
}
  
export default Navbar
