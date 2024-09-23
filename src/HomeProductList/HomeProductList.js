import { LazyLoadImage } from "react-lazy-load-image-component";
import { FormButton } from "../Form-Input/FormInput";

const HomeProductLists = (props) => {
  let stockClassName = "";

  if (parseInt(props.stock) <= 5) {
    stockClassName = "stock-progress stock-progress-3";
  } else if (parseInt(props.stock) >= 5 && parseInt(props.stock) <= 29) {
    stockClassName = "stock-progress stock-progress-5";
  } else if (parseInt(props.stock) >= 30 && parseInt(props.stock) <= 49) {
    stockClassName = "stock-progress stock-progress-10";
  } else if (parseInt(props.stock) >= 50 && parseInt(props.stock) <= 100) {
    stockClassName = "stock-progress stock-progress-20";
  } else {
    stockClassName = "stock-progress stock-progress-20";
  }

  return (
    <div className="home__product-card">
      <div className="prod-main-details-box" onClick={props.showSingleProduct}>
        <div className="home__product-img">
          <LazyLoadImage src={props.img[0]} alt="product-img" />
        </div>

        <div className="home__product-details">
          <div className="home__prod-name">
            <span>{props.prodname}</span>
          </div>
          <div>
            <span>{props.shopname}</span>
          </div>

          <div className="home__prod-price">
            <span>{props.price}</span>
          </div>
        </div>
      </div>

      <span className="stock-left">{props.stock} items Left</span>
      <div className="stock__progress-box">
        <div
          className={stockClassName}
          style={{ width: props.stock >= 100 ? `${100}%` : `${props.stock}%` }}
        ></div>
      </div>
      <div className="add-to-cart-box">
        <FormButton btnValue="Add to Cart" btnAction={props.homeAddToCart} />
      </div>
    </div>
  );
};

export default HomeProductLists;
