import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
function LocationDetails() {
    const navigate = useNavigate();
    const images = [
        'https://static.wikia.nocookie.net/hollowknight/images/2/2b/Screenshot_HK_City_of_Tears_01.png/revision/latest/scale-to-width-down/1000?cb=20190219044620',
        'https://static.wikia.nocookie.net/hollowknight/images/4/4c/Screenshot_HK_City_of_Tears_17.png/revision/latest/scale-to-width-down/1000?cb=20190301035532',
        'https://static.wikia.nocookie.net/hollowknight/images/2/2a/Screenshot_HK_City_of_Tears_04.png/revision/latest/scale-to-width-down/1000?cb=20190301035641'
    ]

    return (
        <div className="location-details-page">
            <Carousel className='carousel'>
                {images.map((image, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img
                                src=""
                                src={image}
                                alt={`Slide ${i + 1}`}
                            />
                            <Carousel.Caption>
                                <h3>Location {i + 1}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>


                    )
                })}
            </Carousel>
            <div className="location-details-grid">
                <div className="location-details-description flex">
                    description
                </div>
                <div className="location-more-details flex">
                    details
                </div>
                <div className="location-back-button flex">
                    <Button className='back-button-item' onClick={() => { navigate('/location-list') }}>Back</Button>
                </div>
            </div>

        </div>
    )
}

export default LocationDetails;