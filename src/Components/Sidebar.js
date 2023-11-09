import React, { useState } from "react";
import "../Css/sidebar.css";
import Grid from "@mui/material/Grid";
import { FaAllergies, FaList, FaRegIdBadge, FaShoppingBag, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItem = [
    {
      path: "/table",
      name: "All Couriers ",
      icon: <FaList />,
    },
    {
      path: "/addPackage",
      name: "Create Courier",
      icon: <FaShoppingBag />,
    },
    {
      path: "/usertable",
      name: "View All Users",
      icon: <FaUser />,
    },
  ];
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
     
      <div className="container p-0 sidebar-cont mb-0 pb-0">
        <div className="row">
          <div className="container-fluid header_cont felx-y">
          </div>
          <div className="col">
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar" onClick={toggle}>
            <div className="top_section">
                <h1 style={{ display: isOpen ? "block" : "none" }} >Admin Pannel</h1>
            </div>
            <br/>
            <br/>
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="link" activeclassname="active">
                <div className="icon">{item.icon}</div>
                  
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                  {item.name}
                </div>
                
              </NavLink>
             
            ))
            }
          </div>
         
        </div>
      </div>
    </div>
    </>
  );
}
export default Sidebar;
