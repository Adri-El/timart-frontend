import "../ProductsLists/ProductsLists.css";
import { convertPrice } from "../utilities/utilities";

const ShopAllProducts = (props) => {
  return (
    <div className="prod-lists-box">
      <div className="prod-cat-settings-box">
        <div className="prod-catBox">
          <span>{props.category}</span>
        </div>
      </div>

      <div className="name-price-box">
        <div className="prod-name-box">
          <span className="prodTitle">
            <b>Product Name:</b> {props.PName}
          </span>
        </div>

        <div className="prod--box">
          <span className="prodTitle">
            <b>Product Price:</b>{" "}
          </span>
          <span>{convertPrice(props.Pprice)}</span>
        </div>
      </div>

      <div className="prod-desc-quantity prod-data">
        <div className="prod-desc desc-main">
          <span>{props.desc}</span>
        </div>

        <div className="prod-desc">
          <span className="prodTitle">
            <b>Product Quantity:</b>
          </span>
          <span>{props.stock}</span>
        </div>
        <div className="prod-desc">
          <span className="prodTitle">
            <b>Product Weight:</b>
          </span>
          <span>{props.weight}Kg</span>
        </div>
      </div>
      <hr />

      <div className="prod-image-box">{props.children}</div>
    </div>
  );
};

export default ShopAllProducts;
