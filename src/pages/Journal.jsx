import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function Journal() {
    const navigate = useNavigate();

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
                    <div className='enemy-item'>
                        <p>Placeholder</p>
                    </div>
                </div>
                <div className='enemy-picture'>
                    picture
                </div>
                <div className='enemy-name'>
                    name
                </div>
                <div className='enemy-description'>
                    description
                </div>
                <div className='details-button'>
                    <Button onClick={()=>{navigate(`/enemy-details/${0}`)}}>details</Button>
                </div>
                <div className='create-enemy-button'>
                    <Button onClick={()=>{navigate(`/create-enemy`)}}>create enemy</Button>
                </div>
                <div className='delete-button'>
                    <Button onClick={()=>{}} >delete</Button>
                </div>

            </div>
        </div>
    )
}

export default Journal;