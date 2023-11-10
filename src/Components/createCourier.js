import React, { useState, useEffect } from 'react';
import "../Css/LoginStyles.css";
import axios from 'axios';
import Sidebar from './Sidebar';
import { useLocation,useNavigate } from 'react-router-dom'
const CreateCourier = () => {
    //to get the update details ?
    const location = useLocation();
    const editData = location.state;
    //to navigate through routes based on history
    const history = useNavigate();
    let courierValues = {
        packageName: "",
        image:"",
        sender: "",
        reciver: "",
        shipmentDetails: "",
        location: "",
        status: "",
        error: {
            packageName: "",
            image:"",
            sender: "",
            reciver: "",
            shipmentDetails: "",
            location: "",
            status: "",
        }
    };
    //State Variables 
    const [courierData, setcourierData] = useState(courierValues);
    
    const token = localStorage.getItem("token");
    const [users, setusers] = useState([]);
    //loading all the user Data
    useEffect(() => {
        async function getUsers() {
            const user = await axios.get("https://courier-tracker-service.onrender.com/api/getUsers",{
                headers:{
                    accesstoken: token,
                }
            });
            if (user) setusers(user.data);
        }
        getUsers()
    }, [courierData]);

    useEffect(() => {
        if (editData) {
            const updationData = {
                ...courierData,
                packageName: editData.packageName || '',
                sender: editData.sender || '',
                reciver: editData.reciver || '',
                shipmentDetails: editData.shipmentDetails || ''
            }
            setcourierData(updationData);
        }
    }, [editData])

    /// here is onchange function 
    const commonchange = (e) => {
        let error = { ...courierData.error };
        if (e.target.value === "") {

            error[e.target.name] = `${e.target.name} is Required`;
        } else {

            error[e.target.name] = "";
        }
        setcourierData({ ...courierData, [e.target.name]: e.target.value, error });

    };
    //Login Submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData&&editData._id) {
          axios.put(`https://courier-tracker-service.onrender.com/api/admin/update/${editData._id}`,{...courierData},{
            headers:{
                accesstoken:token,
            }
          })
          .then(()=>history('/table'))
          .catch((error)=>alert(JSON.stringify(error)));
          setcourierData(courierValues);
        } else {
            axios.post("https://courier-tracker-service.onrender.com/api/admin/addPackage", { ...courierData },{
                headers:{
                    accesstoken:token
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                       
                        alert(response.data);
                    } else {
                        
                        alert(response.status);
                    }
                })
                .catch((error) => {
                    alert(error);
                });
            setcourierData(courierValues);
        }
    };
    return (
        <>
            <Sidebar />
            <div className="page">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="cover" >
                        <h1>Add A New Courier Info!</h1>

                        <input placeholder="PackageName" name="packageName"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={courierData.packageName} />
                         <span style={{ color: "red" }}>{courierData.error.packageName}</span>   
                        <input placeholder="Image Src" name="image"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={courierData.image} />
                         <span style={{ color: "red" }}>{courierData.error.image}</span> 
                        <input placeholder="vendor information" name="sender"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={courierData.sender} />
                         <span style={{ color: "red" }}>{courierData.error.sender}</span> 
                        <select
                            name="reciver"
                            onChange={(e) => commonchange(e)}
                            value={courierData.reciver}
                        >
                            <option value="">Select Reciever Id</option>
                            {users.map((user, index) => (
                                <option key={index} value={user._id}>{user._id}</option>
                            ))}
                        </select>
                        <span style={{ color: "red" }}>{courierData.error.reciver}</span> 
                        <input type="text" placeholder="shipment Info"
                            name="shipmentDetails"
                            onChange={(e) => commonchange(e)}
                            value={courierData.shipmentDetails} />
                         <span style={{ color: "red" }}>{courierData.error.shipmentDetails}</span> 
                        <input placeholder="location" name="location"
                            type="text"
                            onChange={(e) => commonchange(e)}
                            value={courierData.location} />
                         <span style={{ color: "red" }}>{courierData.error.location}</span> 
                        <select
                            name="status"
                            onChange={(e) => commonchange(e)}
                            value={courierData.status}
                        >
                            <option value="">Select package status</option>
                            <option value="Dispatched">Disptched</option>
                            <option value="Recieved">Recieved</option>
                            <option value="Out For Devlivery">Out For Delivery</option>

                        </select>
                        <span style={{ color: "red" }}>{courierData.error.status}</span> 
                        <button className="login-btn" type='submit'>Add</button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCourier
