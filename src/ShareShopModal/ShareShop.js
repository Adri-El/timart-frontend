import { BsClipboardCheck } from "react-icons/bs";

const ShareShopModal = (props) => {
  return (
    <div className="modal-content">
      <h2>Copy to Share your Custom Shop Link</h2>
      <p className="share-info">
        All Products in this custom link are products from {props.shopName}{" "}
        shop.
      </p>

      <div className="link__cusbox">
        <BsClipboardCheck className="copy__icon" />
        <a href={`${props.shopUsername}`}>{props.shopUsername}</a>
      </div>
    </div>
  );
};

export default ShareShopModal;
