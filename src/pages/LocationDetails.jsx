import axios from 'axios';
import { useLayoutEffect } from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './page-styles/location-details.css'
function LocationDetails() {
    const navigate = useNavigate();

    const { locationId } = useParams();
    const [location, setLocation] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [enemies, setEnemies] = useState([]);

    useEffect(() => {
        getLocationDetails();
        getEnemiesInLocation();
    }, [])

    const getLocationDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`)
            setLocation(response.data)
            setFetching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getEnemiesInLocation = async () => {
        try {
            const locationRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`)
            const locationData = locationRes.data
            const enemiesFromLocation = locationData.enemyIds;
            console.log(enemiesFromLocation);
            const enemiesFromLocationReq = enemiesFromLocation.map((enemyId) => {
                return (
                    axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`)
                )
            })
            const enemiesResponse = await Promise.all(enemiesFromLocationReq);
            const enemiesData = enemiesResponse.map((res) => res.data);
            setEnemies(enemiesData);


        } catch (error) {
            console.log(error);
        }
    }

    if (fetching) return <h1 className='mt-5 p-5'>Loading...</h1>;

    return (
        <div className="location-details-page">
            <Carousel className='carousel'>
                {location.images.map((image, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img
                                src={image}
                                alt={`Slide ${i + 1}`}
                            />
                            <Carousel.Caption>
                                <h3>{location.location} {i + 1}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>


                    )
                })}
            </Carousel>
            <div className="location-details-grid">
                <div className="location-details-description flex">
                    {location.description}
                </div>
                <div className="location-more-details flex-column">
                    {
                        location.tramAccess ?
                            <p>This location can be accessed through the trams</p> :
                            <p>This location can't be accessed through trams</p>
                    }
                    <div >
                        <h2 className='mb-5'>Enemies in this location</h2>
                        {
                            enemies.map((enemy) => {
                                return (
                                    <Link
                                        to={`/enemy-details/${enemy.id}`}
                                        key={enemy.id}
                                    >
                                        <p key={enemy.id}>
                                            {enemy.name}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>

                </div>
                <div className="location-back-button flex">
                    <Button className='back-button-item' onClick={() => { navigate('/location-list') }}>Back</Button>
                </div>
            </div>

        </div>
    )
}

export default LocationDetails;