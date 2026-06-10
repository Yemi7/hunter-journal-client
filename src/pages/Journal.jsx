import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function Journal() {
    const navigate = useNavigate();

    const [enemies, setEnemies] = useState([]);
    const [seletedEnemy, setSelectedEnemy] = useState(null);
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        getEnemies();
    }, [])

    const getEnemies = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies`)
            const enemiesRes = response.data
            setEnemies(enemiesRes);
            setFetching(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!seletedEnemy) return;
        getSingleEnemy();
    }, [seletedEnemy])

    const getSingleEnemy = async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies/${seletedEnemy}`)
        setSelectedEnemy(response.data)

    }

    if (!enemies || fetching) return <h1 className='mt-5 p-5'>Loading...</h1>

    return (
        <div className="journal">
            <div className="filter-select">
                <ButtonGroup aria-label="enemy filter">
                    <Button className=''>Location 1</Button>
                    <Button className=''>Location 2</Button>
                    <Button className=''>Location 3</Button>
                </ButtonGroup>
            </div>
            <div className='enemy-grid'>
                <div className='enemy-list'>
                    {enemies.map((enemy) => {
                        return (
                            <div
                                className='enemy-item'
                                key={enemy.id}
                                onClick={() => setSelectedEnemy(enemy.id)}
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
                    {seletedEnemy ? seletedEnemy.name : 'name'}
                </div>
                <div className='enemy-description'>
                    {seletedEnemy ? seletedEnemy.briefDescription : 'description'}
                </div>
                <div className='details-button'>
                    <Button disabled={!seletedEnemy} onClick={() => { navigate(`/enemy-details/${seletedEnemy.id}`) }}>details</Button>
                </div>
                <div className='create-enemy-button'>
                    <Button onClick={() => { navigate(`/create-enemy`) }}>create enemy</Button>
                </div>
                <div className='delete-button'>
                    <Button disabled={!seletedEnemy} onClick={() => { }} >delete</Button>
                </div>

            </div>
        </div>
    )
}

export default Journal;