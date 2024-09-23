import "../ProductsLists/ProductsLists.css";
import { convertPrice } from "../utilities/utilities";

const ProductList = (props) => {
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
            <b>Product Price:</b>
          </span>
          <span>{convertPrice(props.Pprice)}</span>
        </div>
      </div>

      <div className="prod-desc-quantity prod-data">
        <div className="prod-desc">
          <span className="prodTitle">
            <b>Product Description:</b>
          </span>
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

      <div>
        <button
          onClick={props.addProductsHandler}
          className="add__product-button"
        >
          Add Products
        </button>
        <button onClick={props.removeProducts} className="prod-back">
          Back to Shops
        </button>
      </div>
    </div>
  );
};

export default ProductList;
