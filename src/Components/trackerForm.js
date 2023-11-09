import React,{useState} from 'react'
import "../Css/LoginStyles.css";
import Navbar from './Navbar';
import axios from 'axios';
import Cards from '../Components/cards';

const TrackerForm = () => {

  
const token = localStorage.getItem("token");
   // const navigate = useNavigate();
    let packageValues = {
        trackingId: "",
    };
    //State Variables 

    const [packagedata, setpackagedata] = useState(packageValues);
    const [trackData,settrackData] = useState([]);
   
    const handlesubmit = async (e) => {
        e.preventDefault();
      
       console.log(packagedata);
        await axios.get(`https://courier-tracker-service.onrender.com/api/getPackage/${packagedata}`,{
            headers:{
                accesstoken:token,
            },
        }
        ).then((data)=>{
            settrackData(data.data);
            <Cards trackData={trackData} />;
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
                  
                    <h2 className="text">Enter the valid Tracking Id of the Package</h2>

                    <input type="text" placeholder="Tracking Id"
                        name="trackingId"
                        onChange={(e) => setpackagedata(e.target.value)}
                        value={packagedata.trackingId} />

                    <button className="login-btn" type='submit'>Track</button>
                    
                </div>
                </form>
            </div>
        </>
    )
}

export default TrackerForm
