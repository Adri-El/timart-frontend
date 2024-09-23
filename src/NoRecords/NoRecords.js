import "./NoRecords.css";

const NoRecords = (props) => {
    return(
          <div className="no__records">
                <span className="icon-record">{props.Icon}</span>
                <span className="no_recordtext">{props.Message}</span>
            </div>
    )
};


export default NoRecords;