import React, { useContext } from "react";
import "./CartDrawer.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    showCart,
    setShowCart,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();
  const freeDeliveryThreshold = 500;
  const progress = Math.min((totalAmount / freeDeliveryThreshold) * 100, 100);

  if (!showCart) return null;

  return (
    <div className={`cart-drawer-overlay ${showCart ? "open" : ""}`} onClick={() => setShowCart(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Order ({Object.keys(cartItems).length})</h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            onClick={() => setShowCart(false)}
            className="close-drawer"
          />
        </div>

        <div className="delivery-progress-container">
          <p>
            {totalAmount >= freeDeliveryThreshold
              ? "🎉 You've unlocked FREE Delivery!"
              : `Add ₹${freeDeliveryThreshold - totalAmount} more for FREE Delivery`}
          </p>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="cart-drawer-items">
          {Object.keys(cartItems).length === 0 ? (
            <div className="empty-cart-message">
              <img src={assets.basket_icon} alt="" />
              <p>Your cart is empty</p>
              <button onClick={() => setShowCart(false)}>Start Shopping</button>
            </div>
          ) : (
            food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id} className="cart-drawer-item">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="item-details">
                      <div className="item-info-top">
                        <h4>{item.name}</h4>
                        <p>₹{item.price * cartItems[item._id]}</p>
                      </div>
                      <div className="item-controls">
                        <div className="quantity-selector">
                          <img
                            src={assets.remove_icon_red}
                            alt=""
                            onClick={() => removeFromCart(item._id)}
                          />
                          <span>{cartItems[item._id]}</span>
                          <img
                            src={assets.add_icon_green}
                            alt=""
                            onClick={() => addToCart(item._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>

        {totalAmount > 0 && (
          <div className="cart-drawer-footer">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <p className="tax-info">Taxes and shipping calculated at checkout</p>
            <button
              className="checkout-btn"
              onClick={() => {
                setShowCart(false);
                navigate("/cart");
              }}
            >
              Proceed to Checkout • ₹{totalAmount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
