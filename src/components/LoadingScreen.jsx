import './loading-screen.css'
import Spinner from 'react-bootstrap/Spinner';


function LoadingScreen() {
    return (
        <div className='loading-screen' >

            <h1 className='mt-5 p-5'>Loading...</h1>
            <Spinner className='spinner' animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )

}

export default LoadingScreen