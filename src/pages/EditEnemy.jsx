import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import './page-styles/edit-enemy.scss'
import LoadingScreen from '../components/LoadingScreen';
import { ThemeContext } from '../context/theme.context';

function EditEnemy() {
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate()

    const { enemyId } = useParams();

    const [fetching, setFetching] = useState(true);
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
        getEnemy();
    }, [])


    const getLocations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations`)
            setLocations(response.data)

        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }

    const getEnemy = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`)
            setName(response.data.name);
            setImage(response.data.images);
            setBriefDescription(response.data.briefDescription)
            setBehaviour(response.data.behaviour)
            setHealth(response.data.health)
            setGeo(response.data.geo)
            setLocationIds(response.data.locationIds)
            setFetching(false)

        } catch (error) {
            console.log(error);
            navigate('/error')
        }

    }


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
            const oldEnemyRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`);
            const oldLocationIds = oldEnemyRes.data.locationIds;
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`, body)

            const removedLocationIds = oldLocationIds.filter(id => !locationIds.includes(id))
            const removeRequests = removedLocationIds.map(async (locationId) => {
                const locationRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`)
                return axios.patch(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`, {
                    enemyIds: locationRes.data.enemyIds.filter(id => id !== enemyId)
                })
            })

            const addedLocationIds = locationIds.filter(id => !oldLocationIds.includes(id))
            const addRequests = addedLocationIds.map(async (locationId) => {
                const locationRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`)
                return axios.patch(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`, {
                    enemyIds: [...locationRes.data.enemyIds, enemyId]
                })
            })

            await Promise.all([...removeRequests, ...addRequests])

            navigate(`/enemy-details/${enemyId}`);
        } catch (error) {
            console.log(error);
            navigate('/error')
        }

    }

    if (fetching) return <LoadingScreen />

    return (
        <div className="edit-enemy-page">
            <div className="current-enemy flex">
                <div className="edit-enemy-picture flex">
                    <img src={image} alt="" />
                </div>
                <div className="edit-enemy-name flex">
                    <h1>{name}</h1>
                </div>
            </div>
            <Form data-bs-theme={theme} onSubmit={handleSubmit} className='edit-enemy-form'> {/* placeholders should be current values */}
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
                    className='react-button submit-button'
                    variant="primary"
                    type="submit" >
                    Submit
                </Button>
            </Form>
            <div className="back-button flex">
                <Button onClick={() => { navigate(`/enemy-details/${enemyId}`) }}>Back</Button>
            </div>
        </div>
    )
}

export default EditEnemy;