import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Css/table.css";
import Sidebar from './Sidebar';

const UsersTable = () => {
    const token = localStorage.getItem("token");
    const [userDatas, setuserDatas] = useState([]);
    
    const history = useNavigate();
    useEffect(() => {
        async function getData() {
             await axios.get("https://courier-tracker-service.onrender.com/api/getUsers",{
                headers:{
                    accesstoken: token,
                }
            }).then((data)=>{
                setuserDatas(data.data);
            })
            .catch((error)=>{
                 alert(error.response.data.msg)
            })
        }
        getData()
    },[token])
    //to handle delete
    const handleDelete = async (id) => {
        await axios.delete(`https://courier-tracker-service.onrender.com/api/user/delete/${id}`,{
            headers:{
                accesstoken: token,
            }
        })
            .then(() => history('/userTable')).catch((error) => alert(JSON.stringify(error)));
    }
    return (
        <>
            <Sidebar />
            
            <div style={{color:"black"}}><h1>View Edit and Delete all Users</h1></div>
            <div className='tableContainer'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>PhoneNumber</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    {userDatas.map((data) => {

                        return (
                            <tbody key={data._id}>
                                <tr >
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.password}</td>
                                    <td>{data.phoneNO}</td>
                                    <td>{data.role}</td>
                                    <td>
                                      
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

export default UsersTable
