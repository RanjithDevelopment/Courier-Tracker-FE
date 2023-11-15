import React,{useState,useEffect} from 'react'
import "../Css/LoginStyles.css";
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';

const TrackerForm = () => {
 
//State Variables 

const [packagedata, setpackagedata] = useState({trackingId:""});
const [trackData,settrackData] = useState([]);
const [userData,setuserData] = useState([]);

useEffect(()=>{
    function users(){
    axios.get('https://courier-tracker-service.onrender.com/api/users/getPackages',{
        headers:{
            accesstoken: token,
        }
    }).then((response) => setuserData(response.data)).catch((error)=>  alert(error.response.data.msg))
    }
    users()
},[])
  
const token = localStorage.getItem("token");
  
    const handlesubmit = (e) => {
        e.preventDefault();
        
            axios.get(`https://courier-tracker-service.onrender.com/api/getPackage/${packagedata}`,{
            headers:{
                accesstoken:token,
            },
        }
        ).then((data)=>{
            settrackData(data.data);
            
             
        }).catch((error)=>{
               console.log(error);
        })
    
    };
   
    return (
        <>
             <Navbar/>
                  <br/> 
          
            <div className="page">
             <form onSubmit={(e)=>handlesubmit(e)}>
                <div className="cover" >
                  
                    <h2 className="text">select the package</h2>
                   
                    <p style={{color:"black"}}>You only able to selcet package,which are your's </p>

                    <select
                            name="trackingId"
                            onChange={(e)=>setpackagedata(e.target.value)}
                            value={packagedata.trackingId}
                        >
                            <option value="">select package ID</option>
                            {userData.map((user, index) => (
                                <option key={index} value={user._id}>{user._id}</option>
                            ))}
                        </select>

                    <button className="login-btn" type='submit'>Track</button>
                   
                </div>
                </form>
                
            </div> 
           
            {trackData !== null && trackData !== undefined  ? <Link to='/cards' state={trackData} style={{marginLeft:"30%"}} className="login-btn" > View the package </Link> :<></>}
        </>
    )
}

export default TrackerForm
