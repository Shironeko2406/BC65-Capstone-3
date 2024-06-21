import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../Redux/Reducers/CartReducer";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);
  console.log(cart);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = (id) => {
    const action = removeFromCart(id);
    dispatch(action);
  };

  const handleIncrementQuantity = (id) => {
    const action = incrementQuantity(id);
    dispatch(action);
  };

  const handleDecrementQuantity = (id) => {
    const action = decrementQuantity(id);
    dispatch(action);
  };

  const handleClearCart = () => {
    const action = clearCart();
    dispatch(action);
  };

  return (
    <div className="container">
      <h1>Carts</h1>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px", borderRadius: "50%" }} // Rounded image
                />
              </td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>{" "}
              {/* Format price with 2 decimals */}
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleDecrementQuantity(item.id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="form-control text-center"
                    style={{ width: "50px" }}
                  />
                  <button
                    className="btn btn-outline-primary btn-sm ms-2"
                    onClick={() => handleIncrementQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>{" "}
              {/* Total with 2 decimals */}
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <h4>Total Price: ${totalPrice}</h4>
        <div>
          <button className="btn btn-outline-success btn-sm me-2">
            Submit Order
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
