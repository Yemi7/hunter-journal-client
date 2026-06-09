import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
function LocationDetails() {
    const navigate = useNavigate();

    const { locationId } = useParams();
    const [location, setLocation] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        getLocationDetails();
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


    if (fetching) return <h1 className='mt-5 p-5'>Loading...</h1>;

    return (
        <div className="location-details-page">
            <Carousel className='carousel'>
                {location.images.map((image, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img
                                src=""
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
                <div className="location-more-details flex">
                    details{/* apply logic to find and list enemies in this location */}
                </div>
                <div className="location-back-button flex">
                    <Button className='back-button-item' onClick={() => { navigate('/location-list') }}>Back</Button>
                </div>
            </div>

        </div>
    )
}

export default LocationDetails;