import "../Css/Cardstyle.css";
const TrackingCard = ({ location, status, time }) => {
    return (
      <div className="card">
        <div className="card-header" style={{color:"white"}}>{status}</div>
        <div className="card-body">
          <div className="card-location" style={{color:"white"}}>Location: {location}</div>
          <div className="card-status" style={{color:"white"}}>Status: {status}</div>
          <div className="card-time" style={{color:"white"}}>Time: {new Date(time).toLocaleString()}</div>
        </div>
      </div>
    );
  };
  export default TrackingCard