import "./Error.css";
import { FaInfoCircle } from 'react-icons/fa';

const Error = (props) => {

    return(
        <div className='error'>
            <FaInfoCircle />
            <span>{props.errMsg}</span>
        </div>
    )
}

export default Error;