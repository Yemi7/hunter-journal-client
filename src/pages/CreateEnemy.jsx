
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function CreateEnemy() {

    const [locations, setLocations] = useState([]); //for option select

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [briefDescription, setBriefDescription] = useState('');
    const [behaviour, setBehaviour] = useState('');
    const [health, setHealth] = useState(0);
    const [geo, setGeo] = useState(0);
    const [locationIds, setLocationIds] = useState([])

    useEffect(() => {
        getLocations();
    }, [])
    const getLocations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations`)
            setLocations(response.data)

        } catch (error) {
            console.log(error);
        }
    }


    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name: name,
            images: image,
            briefDescription: briefDescription,
            behaviour: behaviour,
            health: health,
            geo: geo,
            locationIds: locationIds,
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/enemies`, body)
        } catch (error) {
            console.log(error);
        }

        console.log(body)

        navigate('/journal');
    }

    return (



        <div className="create-enemy-page">
            <Form onSubmit={handleSubmit} className='edit-enemy-form'> {/* placeholders should be current values */}
                <Form.Group className='mb-5'>
                    <Form.Label className='d-block'>Select the enemy's location</Form.Label>
                    {locations.map((location) => {
                        return (

                            <Form.Check
                                inline
                                key={location.id}
                                label={location.location}
                                name='location'
                                type='checkbox'
                                id={location.id}
                                value={location.id}
                                checked={locationIds.includes(location.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setLocationIds([...locationIds, location.id])
                                    } else {
                                        setLocationIds(locationIds.filter((id) => id !== location.id))
                                    }
                                }}
                            >
                            </Form.Check>
                        )
                    })}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Enemy Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter enemy name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='url'
                        placeholder='Enter the image link'
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder='Describe the enemies appearance'
                        value={briefDescription}
                        onChange={(e) => { setBriefDescription(e.target.value) }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Behaviour</Form.Label>
                    <Form.Control
                        as='textarea'
                        placeholder='Describe the enemies behaviour'
                        value={behaviour}
                        onChange={(e) => { setBehaviour(e.target.value) }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Health</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter enemy health amount'
                        value={health}
                        onChange={(e) => { setHealth(e.target.value) }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Geo</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter how much Geo the enemy drops'
                        value={geo}
                        onChange={(e) => { setGeo(e.target.value) }}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit" >
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default CreateEnemy