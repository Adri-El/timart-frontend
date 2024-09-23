import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../Logo/Logo";
import "./Unsubscribe.css";
import {FormButton} from "../../Form-Input/FormInput";
import { apiUrl } from '../../utilities/utilities';
import Error from '../../Error/Error';
import Success from '../../Sucess/Sucess';
import Preloader from '../../preloader/Preloader';

const Unscubscribe = () => {
  const [error, setError] = useState(false);
  const [success, SetSuccess] = useState(false);
  const [errMsg, setErrmsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("")
  const [showLoader, setShowLoader] = useState(false)
  
  const unSubscribeHandler = () => {
    setShowLoader(true);
    const values = window.location.search;
    const urlParam = new URLSearchParams(values);
    const email = urlParam.get("email");
    const id = urlParam.get("id")

    fetch(`${apiUrl}email-subscription/unsubscribe?email=${email}&id=${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((resp) => {
              if(resp.statusCode === 200){
                SetSuccess(true);
                setSuccessMsg(resp.msg);
                setShowLoader(false);
              }
              else {
                setError(true);
                setErrmsg(resp.msg);
               setShowLoader(false);
              }  
      });
  };

  
  return (
    <div className="unsubscribe__box">

        {showLoader ? <Preloader /> : null }
        
        <Logo  width="140px" logoColor="#81007F"/>

        {error ? <Error  errMsg={errMsg}/> : null}
        {success ? <Success succesMsg={successMsg}/> : null}

        <div className='unsubscribe__content'>
            <p>To Unsubscribe from our Email List Please, Click the Unsubcribe button below to Unscubscribe. </p>
            <FormButton btnValue="Unsubscribe" btnAction={unSubscribeHandler} />
        </div>

        <div className='enquiries__box'>
            <span>For Support contact</span>  <Link to="/support" className='link__support'>Customer Support</Link>
        </div>
    </div>
  )
}

export default Unscubscribe