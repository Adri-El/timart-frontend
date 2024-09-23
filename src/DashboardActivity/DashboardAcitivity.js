import "./DashboardActivity.css";

const DashboardActivity = (props) => {
  return (
    <div className="dashboard__activity">
      <div className="dashboard__activity-box">
        <h2 className={props.activeHeader}>{props.headerValue}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default DashboardActivity;
