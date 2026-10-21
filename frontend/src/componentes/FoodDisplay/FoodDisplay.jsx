// import React, { useContext } from "react";
// import "./FoodDisplay.css";
// import { StoreContext } from "../../context/StoreContext";
// import FoodItem from "../FoodItem/FoodItem";

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   return (
//     <div className="food-display" id="food-display">
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {food_list
//           .filter((item) => category === "All" || category === item.category)
//           .map((item, index) => (
//             <FoodItem
//               key={index}
//               id={item._id}
//               name={item.name}
//               description={item.description}
//               price={item.price}
//               image={item.image}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;
import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, addToCart, removeFromCart, cartItems, search } =
    useContext(StoreContext);

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {food_list
          .filter((item) => {
            const matchesCategory = category === "All" || category === item.category;
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
          })
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onSelect={setSelectedItem}
            />
          ))}
      </div>

      {/* ✅ MODAL */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>
              ✕
            </button>

            <img src={selectedItem.image} alt="" className="modal-img" />

            <div className="modal-content-area">
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <h3>₹{selectedItem.price}</h3>

              {!cartItems[selectedItem.id] ? (
                <button
                  className="modal-add-btn"
                  onClick={() => addToCart(selectedItem.id)}
                >
                  Add to Cart
                </button>
              ) : (
                <>
                  <div className="modal-counter">
                    <button onClick={() => removeFromCart(selectedItem.id)}>
                      -
                    </button>

                    <span>{cartItems[selectedItem.id]}</span>

                    <button onClick={() => addToCart(selectedItem.id)}>+</button>
                  </div>

                  <button
                    className="checkout-btn"
                    disabled={!cartItems[selectedItem.id]}
                    onClick={() => {
                      setSelectedItem(null);
                      navigate("/cart");
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
