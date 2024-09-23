import "./ShopLists.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import { FaRegShareSquare } from "react-icons/fa";

const ShopLists = (props) => {
  return (
    <div className="shop__stores" onClick={props.addProducts}>
      <div className="shop__stores-box">
        <div className="shop__store-icon">
          <span>{props.shopIcon}</span>
        </div>

        <div className="shop__store-name">
          <span className="shopName">{props.shopName}</span>
        </div>

        <div className="shop__store-name">
          <MdDeleteOutline
            onClick={props.deleteShop}
            title="Delete"
            className="shop__icons icon_color-1"
          />
          <FaRegEdit
            onClick={props.updateShop}
            title="Edit Shop"
            className="shop__icons icon_color-2"
          />
          <BiShow
            onClick={props.showProd}
            title="Add/View Products"
            className="shop__icons icon_color-3"
          />
          <FaRegShareSquare
            onClick={props.shareShop}
            title="Share Shop"
            className="shop__icons icon_color-4"
          />
        </div>
      </div>

      <div className="addProdBtn21">
        <button onClick={props.showProd}>Add Products</button>
      </div>
    </div>
  );
};

export default ShopLists;
