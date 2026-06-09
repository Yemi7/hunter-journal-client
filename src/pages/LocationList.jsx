import { Link } from "react-router-dom";


function LocationList() {
    return (

        <div className="location-list">
            <Link to={`/location-details/${0}`}>
                <div className="location-item">
                    <h1>Location</h1>
                </div>
                
            </Link>
        </div>
    )
}

export default LocationList;