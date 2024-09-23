
const DeleteProdModal = (props) => {
    return(
          <div className="modal-content">
                  <h2>Are you sure you want to Delete this Product</h2>
                
                    <div className="pop-info">
                         <p>Note that Product will be removed from your Seller Account and the Entamarket Homepage</p>
                    </div>

                    <div className="delete-btns">
                        <button onClick={props.cancelHandler}>Cancel</button>
                        <button className="btn-danger" onClick={props.deleteProductHandler} >Delete</button>
                    </div>
            </div>
    )
}

export default DeleteProdModal;