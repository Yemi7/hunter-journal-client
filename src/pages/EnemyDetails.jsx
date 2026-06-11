import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import './page-styles/enemy-details.css'


function EnemyDetails() {
    const navigate = useNavigate();

    const { enemyId } = useParams();
    const [enemy, setEnemy] = useState(null);
    const [fetching, setFetching] = useState(true)
    const [locations, setLocations] = useState([]);



    useEffect(() => {
        getEnemyDetails();
        getLocationsForEnemy();
    }, [enemyId])

    const getEnemyDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`)
            setEnemy(response.data)
            setFetching(false);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteEnemy = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`)
            navigate('/journal')
            getEnemyDetails();

        } catch (error) {
            console.log(error);
        }
    }

    const getLocationsForEnemy = async () => {
        const enemyRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`)
        const enemyData = enemyRes.data
        const locationIdsInEnemy = enemyData.locationIds
        const locationsInEnemyReq = locationIdsInEnemy.map((locationId) => {
            return (
                axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`)
            )
        })
        const locationsInEnemyRes = await Promise.all(locationsInEnemyReq);
        const locationsInEnemy = locationsInEnemyRes.map((res) => res.data)
        setLocations(locationsInEnemy)
    }



    if (!enemy || fetching) return <h1 className="mt-5 p-5">Loading</h1>

    return (
        <div className="enemy-details">
            <div className="enemy-details-name">
                <h1>{enemy.name}</h1>
            </div>
            <div className="enemy-details-picture">
                <img src={enemy.images} alt="" />
            </div>
            <div className="enemy-details-grid">
                <div className="enemy-details-description flex-column">
                    <p>{enemy.behaviour}</p>
                    <p>{enemy.briefDescription}</p>
                    <p>Enemy Health: {enemy.health}</p>{/* Logic here to store locations in state */}
                    <p>Geo {enemy.geo}</p>
                </div>
                <div className="enemy-more-details flex-column">
                    <h3>Locations this enemy appears</h3>
                    <div className="relation-location-item" key={location.id}>
                        {
                            locations.map((location) => {
                                return (

                                    <Link
                                        key={location.id}
                                        className="location-link"
                                        to={`/location-details/${location.id}`}
                                    >
                                        <p>
                                            {location.location}
                                        </p>
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="edit-enemy-button flex">
                    <button className="btn" onClick={() => { navigate(`/edit-enemy/${enemyId}`) }}>Edit</button>
                </div>
                <div className="delete-enemy-button flex">
                    <button className="btn" onClick={() => { deleteEnemy() }}>Delete</button>
                </div>
                <div className="back-button flex">
                    <button className="btn" onClick={() => { navigate('/journal') }}>Back</button>
                </div>
            </div>
        </div >
    )
}

export default EnemyDetails;