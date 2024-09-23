import "./HomeBody.css";

const HomeBody = (props) => {
  return (
    <div className="home__body">
      <div className="home__products">
        <div className="trending__box">
          <h3>{props.homeTitle}</h3>
        </div>

        <div className="home__products-box">{props.children}</div>
      </div>
    </div>
  );
};

export default HomeBody;
