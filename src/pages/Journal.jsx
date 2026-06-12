import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import './page-styles/journal.scss'
import LoadingScreen from '../components/LoadingScreen';



function Journal() {
    const navigate = useNavigate();

    const { theme, setTheme } = useContext(ThemeContext);

    const [enemies, setEnemies] = useState([]);
    const [seletedEnemy, setSelectedEnemy] = useState(null);
    const [seletedEnemyId, setSelectedEnemyId] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState('');

    useEffect(() => {
        getEnemies();
        getLocations();
    }, [])

    const getEnemies = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies`)
            const enemiesRes = response.data
            setEnemies(enemiesRes);
            setSelectedEnemyId(enemiesRes[0]?.id)
            setFetching(false)

        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }

    useEffect(() => {
        if (!seletedEnemyId) return;
        getSingleEnemy(seletedEnemyId);
    }, [seletedEnemyId])

    const getSingleEnemy = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${id}`)
            setSelectedEnemy(response.data)

        } catch (error) {
            console.log(error);
            navigate('/error')
        }

    }


    const deleteSingleEnemy = async () => {
        try {
            if (!seletedEnemy) return;

            const locationUpdateRequests = seletedEnemy.locationIds.map(async (locationId) => {
                const locationRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`)
                const locationData = locationRes.data
                return await axios.patch(`${import.meta.env.VITE_SERVER_URL}/locations/${locationId}`, {
                    enemyIds: locationData.enemyIds.filter(id => id !== seletedEnemyId)
                })

            })

            await Promise.all(locationUpdateRequests);

            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/enemies/${seletedEnemyId}`)
            setSelectedEnemy(null);
            getEnemies();
            setSelectedLocationId('')
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }

    const getLocations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations`)
            setLocations(response.data);

        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }

    useEffect(() => {
        if (selectedLocationId === '') getEnemies();
        filterEnemiesByLocation();
    }, [selectedLocationId])

    const filterEnemiesByLocation = async () => {
        if (!selectedLocationId) return;

        try {
            const locationRequest = await axios.get(`${import.meta.env.VITE_SERVER_URL}/locations/${selectedLocationId}`)
            const filteredEnemyIds = locationRequest.data.enemyIds;
            const enemyRequest = filteredEnemyIds.map((enemyId) => {
                return axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${enemyId}`);
            })
            const enemyResponse = await Promise.all(enemyRequest);
            const enemyData = enemyResponse.map((res) => res.data)
            console.log(enemyData);
            setEnemies(enemyData);
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }

    if (!enemies || fetching) return <LoadingScreen />

    return (
        <div className="journal">
            <Form data-bs-theme={theme} className='filter-select'>
                <FloatingLabel
                    controlId='floatingSelect'
                    label="Choose a Location">
                    <Form.Select
                        value={selectedLocationId}
                        onChange={(e) => { setSelectedLocationId(e.target.value) }}
                    >
                        <option value="">All Locations</option>
                        {
                            locations.map((location) => {
                                return (
                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {location.location}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                </FloatingLabel>
            </Form>
            <div className='enemy-grid'>
                <div className='enemy-list'>
                    {
                        enemies.length === 0 ?
                            <div className='enemy-item'><p>no enemies</p></div> :
                            enemies.map((enemy) => {

                                return (
                                    <div
                                        className='enemy-item'
                                        key={enemy.id}
                                        onClick={() => setSelectedEnemyId(enemy.id)}
                                    >
                                        <p>{enemy.name}</p>
                                    </div>
                                )
                            })}
                </div>
                <div className='enemy-picture-box'>
                    {seletedEnemy ? <img className='enemy-image' src={seletedEnemy.images} /> : 'image'}
                </div>
                <div className='enemy-name'>
                    {seletedEnemy ? <h1>{seletedEnemy.name}</h1> : 'name'}
                </div>
                <div className='enemy-description'>
                    {seletedEnemy ? <p>{seletedEnemy.briefDescription}</p> : 'description'}
                </div>
                <div className='details-button'>
                    <button className='btn' disabled={!seletedEnemy} onClick={() => { navigate(`/enemy-details/${seletedEnemy.id}`) }}>details</button>
                </div>
                <div className='create-enemy-button'>
                    <button className='btn' onClick={() => { navigate(`/create-enemy`) }}>create enemy</button>
                </div>
                <div className='delete-button'>
                    <button className='btn' disabled={!seletedEnemy} onClick={() => { deleteSingleEnemy() }} >delete</button>
                </div>

            </div>
        </div>
    )
}

export default Journal;