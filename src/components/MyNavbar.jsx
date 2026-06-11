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
import './MyNavbar.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


function MyNavbar({ theme, setTheme }) {

    const [search, setSearch] = useState('');
    const [foundArray, setFoundArray] = useState([]);


    const findItem = async (searchTerm) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enemies?name_like=${searchTerm}`)
            const responseData = response.data;
            const foundEnemyNames = responseData.map((enemy) => {
                return enemy;
            })
            setFoundArray(foundEnemyNames)
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    console.log(theme);

    return (

        <Navbar className="bg-body-tertiary" data-bs-theme={theme} fixed='top'>
            <Container className=''>
                <Nav>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/about'>About</Nav.Link>
                </Nav>
                <Form className='search'>
                    <Row className='m-0 g-0 justify-content-start'>
                        <Col xs="auto" className=''>
                            <Form.Control
                                size='sm'
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value), findItem(e.target.value) }}
                            />
                        </Col>
                    </Row>
                </Form>
            </Container>
            {
                search &&

                <div className='search-box'>
                    {
                        foundArray.length === 0 ?
                            <h1>No enemies found</h1> :
                            foundArray.map((foundEnemy) => {
                                return (
                                    <Link
                                        to={`/enemy-details/${foundEnemy.id}`}
                                        className='search-link'
                                        onClick={() => { setSearch('') }}
                                    >
                                        <h2> {foundEnemy.name} </h2>
                                    </Link>
                                )
                            })
                    }
                </div>
            }
        </Navbar>
    )
}

export default MyNavbar