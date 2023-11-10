import React,{useState} from 'react'
import "../Css/LoginStyles.css";
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';

const TrackerForm = () => {

  
const token = localStorage.getItem("token");
   // const navigate = useNavigate();
    let packageValues = {
        trackingId: "",
    };
    //State Variables 

    const [packagedata, setpackagedata] = useState(packageValues);
    const [trackData,settrackData] = useState([]);
     console.log(trackData);
    const handlesubmit = async (e) => {
        e.preventDefault();

        await axios.get(`https://courier-tracker-service.onrender.com/api/getPackage/${packagedata}`,{
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
    console.log(trackData.sender);
    return (
        <>
             <Navbar/>
                  <br/> 
          
            <div className="page">
             <form onSubmit={(e)=>handlesubmit(e)}>
                <div className="cover" >
                  
                    <h2 className="text">Enter the valid Tracking Id of the Package</h2>

                    <input type="text" placeholder="Tracking Id"
                        name="trackingId"
                        onChange={(e) => setpackagedata(e.target.value)}
                        value={packagedata.trackingId} />

                    <button className="login-btn" type='submit'>Track</button>
                   
                </div>
                </form>
                
            </div> 
           
            {trackData !== null && trackData !== undefined ? <Link to='/cards' state={trackData} style={{marginLeft:"30%"}} className="login-btn" > View the package </Link> :<></>}
        </>
    )
}

export default TrackerForm
