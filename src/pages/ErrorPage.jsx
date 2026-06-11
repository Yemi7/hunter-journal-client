import './page-styles/error.css'
import ErrorImg from '../resources/images/error2.webp'

function ErrorPage() {
    return (
        <div className='error-page' >
            <img className='error-img' src={ErrorImg} />
            <h1>Oh noo</h1>
            <h3>Something went wrong</h3>
        </div>
    )
}

export default ErrorPage