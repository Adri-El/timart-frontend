import { FormButton } from '../../Form-Input/FormInput';
import { Link} from 'react-router-dom';
import { FaTimes } from "react-icons/fa";

const Subscribe = (props) => {

  return (
   <div className='modal-content'>

     <div className="modal-close">
        <FaTimes className="close" onClick={props.closeModal} />
      </div>
    <div className="subscribe">

            <div className='unsubscribe__content'>
                <p>You need to subscribe to our email services to recieve OTP, Click the subcribe button below to scubscribe.</p>
                <FormButton btnValue="Subscribe" btnAction={props.subscribeHandler} />
            </div>

            <div className='enquiries__box'>
                <span>For Support contact</span>  <Link to="/support" className='link__support'>Customer Support</Link>
            </div>
        </div>
   </div>
  )
}

export default Subscribe