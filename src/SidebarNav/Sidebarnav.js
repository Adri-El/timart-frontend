import "./SidebarNav.css";


const SidebarNav = (props) => {
    return(
        <div className="side-bar-nav">
            <div className="remove__side-bar">
                
            </div>

            <div className="nav__links-box">
            <div className="nav-icon">
                {props.icon}
                </div>
                <div className="nav-link">
                    <span onClick={props.notice}>{props.navLink}</span>
                </div>
            </div>
        </div>
    )
}


export default SidebarNav;