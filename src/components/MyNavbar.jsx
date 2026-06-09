import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import '../index.css'


function MyNavbar() {
    return (

        <Navbar className="bg-body-tertiary " fixed='top'>
            <Container className=''>
                <Nav>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/about'>About</Nav.Link>
                </Nav>
                <Form className='' onSubmit={(e)=>e.preventDefault()}>
                    <Row className='m-0 g-0 justify-content-start'>
                        <Col xs="auto" className=''>
                            <Form.Control
                            size='sm'
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto" >
                            <Button 
                            size='sm' 
                            type="submit" 
                            className='p-1 custom-btn black'
                            onSubmit={(e)=>e.preventDefault()}
                            >Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Navbar>
    )
}

export default MyNavbar