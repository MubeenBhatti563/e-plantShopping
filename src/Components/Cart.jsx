import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./Cart.css";

const Cart = ({ onClose }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.cost.replace(/[^0-9.-]+/g, "")) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleIncrement = (name) => {
    const item = cart.find((i) => i.name === name);
    if (item) {
      dispatch(updateQuantity({ name, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (name) => {
    const item = cart.find((i) => i.name === name);
    if (item) {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ name, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(name));
      }
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start adding some beautiful plants to your cart!</p>
        <button className="continue-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-cart-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => {
          const price = parseFloat(item.cost.replace(/[^0-9.-]+/g, "")) || 0;
          const itemTotal = (price * item.quantity).toFixed(2);

          return (
            <div className="cart-item" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="item-price">{item.cost}</p>

                <div className="quantity-control">
                  <button onClick={() => handleDecrement(item.name)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.name)}>+</button>
                </div>

                <div className="item-total">Total: ${itemTotal}</div>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.name)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h3>
          Total Amount: <span>${calculateTotal().toFixed(2)}</span>
        </h3>

        <div className="cart-actions">
          <button className="continue-btn" onClick={onClose}>
            Continue Shopping
          </button>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Cart;
