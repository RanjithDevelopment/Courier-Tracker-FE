import React from 'react'
import "../Css/Cardstyle.css";

const Cards = ({data}) => {
  
    console.log(data);
  return (
    <div className="
    project-card">
{/* {/*         
        <h2 className="project-title">{props.title} </h2>
        <div className="pro-details">
            <p>{props.text} </p>
            <h2 className="project-title" style={{alignItems:"center",marginLeft:"60px"}}>TECH STACK</h2>
            <ul style= {{listStyleType:"disc",fontSize:"6",color:"white" ,marginLeft:"5px"}}>
             <li> <p style={{color:"red"}}> FRONTEND :</p> <p> {props.frontend}</p></li>
                <li> <p style={{color:"red"}}> BACKEND :</p><p>{props.backend}</p></li>
                <li> <p style={{color:"red"}}>DATABASE :</p><p> {props.database}</p></li>
            </ul>
            <div className="pro-btns">
                <a href={props.view} target='_blank' className="btn">View</a>
                <a href={props.source}target='_blank' className="btn">Source</a>
            </div> */}
        
    </div>
  )
}

export default Cards
