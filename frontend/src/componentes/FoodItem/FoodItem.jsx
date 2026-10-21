// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";

// const FoodItem = ({ id, name, price, description, image }) => {
//   const { cartItems, addToCart, removeFromCart, url } =
//     useContext(StoreContext);

//   // For validation
//   // const navigate = useNavigate();
//   // const handleAddToCart = (id) => {
//   //   if (token) {
//   //     // User is logged in
//   //     addToCart(id);
//   //   } else {
//   //     // User not logged in, navigate to login page
//   //     navigate("/login");
//   //   }
//   // };

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
//         <img
//           className="food-item-image"
//           // src={url + "/images/" + image}
//           src={image}
//           alt=""
//         />
//         {!cartItems[id] ? (
//           <img
//             className="add"
//             onClick={() => addToCart(id)}
//             src={assets.add_icon_white}
//             alt=""
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               onClick={() => removeFromCart(id)}
//               src={assets.remove_icon_red}
//               alt=""
//             />
//             <p>{cartItems[id]}</p>
//             <img
//               onClick={() => addToCart(id)}
//               src={assets.add_icon_green}
//               alt=""
//             />
//           </div>
//         )}
//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>

//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">${price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;


import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, onSelect }) => {
  const { cartItems, addToCart, removeFromCart, setShowCart } =
    useContext(StoreContext);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleDescription = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image}
          alt=""
          onClick={() =>
            onSelect({ id, name, price, description, image })
          }
        />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p
            onClick={() =>
              onSelect({ id, name, price, description, image })
            }
            style={{ cursor: "pointer" }}
          >
            {name}
          </p>
          <img src={assets.rating_starts} alt="" />
        </div>

        <div className="food-item-desc-container">
          <p className="food-item-desc">
            {isExpanded ? description : `${description.slice(0, 60)}...`}
            <span className="read-more-btn" onClick={toggleDescription}>
              {isExpanded ? " Read Less" : " Read More"}
            </span>
          </p>
        </div>

        <div className="food-item-bottom">
          <p className="food-item-price">₹{price}</p>
          <button 
            className="add-to-cart-btn" 
            onClick={() => {
              addToCart(id);
              setShowCart(true);
            }}
          >
            {cartItems[id] > 0 ? "Add More" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;