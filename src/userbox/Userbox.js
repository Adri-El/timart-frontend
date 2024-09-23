import "./Userbox.css";

const Userbox = (props) => {
    return(
          <div className="username-box" onClick={props.showDropDown}>
                {props.userIcon}
                <span>{props.username}</span>
                <span>{props.headerAccount}</span>
                {props.downArrow}
        </div>
    )
};


export default Userbox;