
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function CreateEnemy() {
        


    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/journal');
    
    }

    return(



        <div className="create-enemy-page">
            <Form onSubmit={handleSubmit} className='edit-enemy-form'> {/* placeholders should be current values */}
                <Form.Group >
                    <Form.Select >
                        <option>Select the enemies Location</option>
                        <option value='location1Id'>Location 1</option>
                        <option value='location2Id'>Location 2</option>
                        <option value='location3Id'>Location 3</option>
                    </Form.Select>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter enemy name' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='url' placeholder='Enter the image link' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder='Describe the enemies appearance' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Behaviour</Form.Label>
                    <Form.Control as='textarea' placeholder='Describe the enemies behaviour' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Health</Form.Label>
                    <Form.Control type='number' placeholder='Enter enemy health amount' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Geo</Form.Label>
                    <Form.Control type='text' placeholder='Enter how much Geo the enemy drops' />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default CreateEnemy