import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [url, setUrl] = useState("http://localhost:4000");
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(""); // New search state
  const [showCart, setShowCart] = useState(false); // State for the side drawer

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load cart data only when the token is set
  const loadCartData = async (userToken) => {
    try {
      console.log("Sending Token in Request:", userToken);
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        // { headers: { Authorization: `Bearer ${userToken}` } },
        { headers: { token } },
      );
      setCartItems(response.data.cartData);
      localStorage.setItem("cartItems", JSON.stringify(response.data.cartData)); // Save to localStorage
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Add item to cart (only if logged in)
  const addToCart = async (itemId) => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save cart to localStorage

    try {
      console.log("Sending Token in Request:", token);
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        // { headers: { Authorization: `Bearer ${token}` } },
        { headers: { token } },
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems({});
      localStorage.removeItem("cartItems");

      if (token) {
        await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Remove item from cart (only if logged in)
  const removeFromCart = async (itemId) => {
    if (!token) {
      alert("Please log in to remove items from your cart.");
      return;
    }

    const updatedCart = {
      ...cartItems,
      [itemId]: Math.max((cartItems[itemId] || 1) - 1, 0),
    };

    // Remove item completely if quantity becomes zero
    if (updatedCart[itemId] === 0) {
      delete updatedCart[itemId];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save cart to localStorage

    try {
      console.log("Sending Token in Request:", token);
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        // { headers: { Authorization: `Bearer ${token}` } },
        { headers: { token } },
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = food_list.find((product) => product._id === itemId);
      return item && item.price ? total + item.price * quantity : total;
    }, 0);
  };

  // Load food list & token from localStorage
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Load cart data from localStorage if available
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
    loadData();
  }, []);

  // Load cart data from backend when token is set
  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    clearCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    user,
    setUser,
    search,
    setSearch,
    showCart,
    setShowCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
