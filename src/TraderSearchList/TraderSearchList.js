const TraderSearchList = (props) => {
  return (
    <div className="tradername" onClick={props.goToProductHandler}>
      <div>
        <span>{props.firstName}</span>
        <span>{props.searchInfo}</span>
      </div>
    </div>
  );
};

export default TraderSearchList;
