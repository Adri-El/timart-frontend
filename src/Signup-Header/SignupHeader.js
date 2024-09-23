import "./SignupHeader.css";

const SignupHeader = (props) => {
    return(
         <div className='signup__header'>
            <h1>{props.header}</h1>
            <p>{props.headerValue}</p>
        </div>
    )
};

export default SignupHeader;