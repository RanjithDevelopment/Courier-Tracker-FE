import React from 'react'
import { useLocation } from 'react-router-dom'
import TrackingCard from './trackingCard';
import "../Css/Cardstyle.css";
const Cards = ({ props }) => {
  const location = useLocation();
  const Package = location.state;

  return (
    <>
      {Package ?
        <div className="work-container">

          <div className="project-container">
            <div className="project-card">
              <img src={Package.image} alt="true" />
              <h2 className="project-title">{Package.packageName} </h2>
              <div className="pro-details">
                <p>Sender : {Package.sender} </p>
                <p>Reciever : {Package.reciver} </p>
                <p>Shiping Details : {Package.shipmentDetails} </p>
                < div >
                  <h3 style={{color:"white"}}>Tracking Information</h3>
                  <div id="tracking-cards">
                    {Package.tracking.map((entry, index) => (
                      <TrackingCard
                        key={index}
                        location={entry.location}
                        status={entry.status}
                        time={entry.time}
                      />
                    ))}
                  </div>
                </div >
                <div className="pro-btns">
                 
                  <a href='/tracker' target='_blank' className="btn">Back</a> 
                </div>
              </div>
            </div>

          </div>

        </div >

        : <></>}




    </>


  );
}

export default Cards
