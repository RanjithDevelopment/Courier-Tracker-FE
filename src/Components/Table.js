import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Css/table.css";
import Sidebar from './Sidebar';

const Table = () => {
    const token = localStorage.getItem("token")
    const [packageDatas, setpackageDatas] = useState([]);
    
    const history = useNavigate();
    useEffect(() => {
        async function getData() {
            const response = await axios.get("https://courier-tracker-service.onrender.com/api/admin/getPackages",{
                headers:{
                    accesstoken: token,
                }
            });
            setpackageDatas(response.data);
        }
        getData()
    }, [])
    //to handle delete
    const handleDelete = async (id) => {
        await axios.delete(`https://courier-tracker-service.onrender.com/api/admin/delete/${id}`,{
            headers:{
                accesstoken: token,
            }
        })
            .then(() => history('/table')).catch((error) => alert(JSON.stringify(error)));
    }
    console.log(packageDatas);
    return (
        <>
            <Sidebar />
            
            <div className='tableContainer'>
                <table>
                    <tr>
                        <th>PackageName</th>
                        <th>Image</th> 
                        <th>Sender</th>
                        <th>Reciever</th>
                        <th>ShipmentDetail</th>
                        <th >Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    {packageDatas.map((data) => {

                        return (
                            <tbody key={data._id}>
                                <tr >
                                    <td>{data.packageName}</td>
                                    <td>{data.image}</td>
                                    <td>{data.sender}</td>
                                    <td>{data.reciver}</td>
                                    <td>{data.shipmentDetails}</td>
                                    <td style={{width:"30px"}}>
                                        {data.tracking.map((trackingEntry) => (
                                          <p key={trackingEntry._id} style={{color:"black"}}>
                                          {trackingEntry.location}
                                          
                                        </p>
                                        ))}
                                    </td>
                                    <td style={{width:"30px"}}>
                                        {data.tracking.map((trackingEntry) => (
                                          <p key={trackingEntry._id} style={{color:"black"}}>
                                           {trackingEntry.status}
                                          
                                        </p>
                                        ))}
                                    </td>
                                    <td>
                                        <Link
                                            className='edit'
                                            to="/addPackage" state={data}  >
                                            Update Tracking
                                        </Link>
                                        <Link
                                            className='delete'
                                            onClick={() => handleDelete(data._id)} >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            </div>
        </>
    )
}

export default Table
