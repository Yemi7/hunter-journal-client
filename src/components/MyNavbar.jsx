import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-dom'

function MyNavbar() {
    return (

        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Hunter Journal</Navbar.Brand>
                <Nav.Link as={Link} href='/'>Home</Nav.Link>
            </Container>
        </Navbar>
    )
}

export default MyNavbar