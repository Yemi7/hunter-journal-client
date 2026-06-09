import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LocationList() {

    const navigate = useNavigate()

    const [locations, setLocations] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(()=>{
        getLocations();
    },[])

    const getLocations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations`)

            setLocations(response.data)
            setFetching(false);   
        } catch (error) {
            console.log(error)
        }
    }

    if(fetching) return <h1 className="mt-5 p-5">Loading</h1>

    return (

        <div className="location-list">
            {/* <Link to={`/location-details/${0}`}> */}
                {/* <div className="location-item">
                    <h1>Location</h1>
                </div>
                 */}
            {/* </Link> */}
            {locations.map((location)=>{
                return(
                    <div 
                    className="location-item"
                    key={location.id}
                    onClick={()=>{navigate(`/location-details/${location.id}`)}}
                    >
                        <h1>{location.location}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default LocationList;