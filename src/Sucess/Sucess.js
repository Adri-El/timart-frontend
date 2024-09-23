import "./Sucess.css";
import { FaInfoCircle } from 'react-icons/fa';

const Success = (props) => {
     return(
        <div className='success'>
            <FaInfoCircle />
            <span>{props.succesMsg}</span>
        </div>
     )
}


export default Success; 