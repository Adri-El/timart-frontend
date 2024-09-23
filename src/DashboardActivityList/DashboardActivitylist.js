const DashboardAcitivityList = (props) => {
  return (
    <div className="dashboard__activity-details">
      {props.type === "purchase" ? (
        <div className="pending__box">
          <div className="pending__circle-1">
            <div className="pending__circle-2"></div>
          </div>
          <div className="pending__span">
            <span className="span-1">
              You have a pending Order from{" "}
              <span className="span-2">@{props.from}</span>
            </span>
          </div>
        </div>
      ) : null}

      {props.type === "delivery" ? <div> delivered</div> : null}
    </div>
  );
};

export default DashboardAcitivityList;
