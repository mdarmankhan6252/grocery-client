import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
   const navigate = useNavigate();
   const [user, setUser] = useState(null)
   const [isSeller, setIsSeller] = useState(false)
   const [showUserLogin, setShowUserLogin] = useState(false)
   const [cartItems, setCartItems] = useState({});
   const [searchQuery, setSearchQuery] = useState({})

   const currency = import.meta.env.VITE_CURRENCY;

   //fetch the products 
   const [products, setProducts] = useState([]);
   const fetchProducts = async () => {
      try {
         const { data } = await axios.get('/api/product/list');
         if (data.success) {
            setProducts(data.products)
         } else {
            toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message)
      }
   }

   //fetch seller  status

   const fetchSeller = async () => {
      try {
         const { data } = await axios.get('/api/seller/is-auth')
         if (data.success) {
            setIsSeller(true)
         } else {
            setIsSeller(false)
         }
      } catch (err) {
         setIsSeller(false)
         console.log(err);
      }
   }

   useEffect(() => {
      fetchSeller();
      fetchProducts();
   }, [])

   //add product to cart

   const addToCart = (itemId) => {
      let cartData = structuredClone(cartItems);

      if (cartData[itemId]) {
         cartData[itemId] += 1;
      } else {
         cartData[itemId] = 1
      }
      setCartItems(cartData)
      toast.success('Product added to cart.')
   }

   //update cart item quantity

   const updateCartItem = (itemId, quantity) => {
      let cartData = structuredClone(cartItems);

      cartData[itemId] = quantity;
      setCartItems(cartData);
      toast.success('Product quantity updated.')
   }

   //remove product from cart

   const removeFromCart = (itemId) => {
      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
         cartData[itemId] -= 1;
         if (cartData[itemId] === 0) {
            delete cartData[itemId]
         }
      }
      toast.success('Product removed from cart.')
      setCartItems(cartData)
   }

   //get cart item count

   const getCartCount = () => {
      return Object.values(cartItems).reduce((sum, count) => sum + count, 0)
   }

   //get cart total amount.

   const getCartAmount = () => {
      let totalAmount = 0;
      for (const items in cartItems) {
         let itemInfo = products.find((product) => product._id === items);
         if (cartItems[items] > 0) {
            totalAmount += itemInfo.offerPrice * cartItems[items]
         }
      }
      return Math.floor(totalAmount * 100 / 100);
   }


   const value = {
      navigate,
      user,
      setUser,
      isSeller,
      setIsSeller,
      showUserLogin,
      setShowUserLogin,
      products,
      currency,
      addToCart,
      updateCartItem,
      removeFromCart,
      cartItems,
      searchQuery,
      setSearchQuery,
      getCartCount,
      getCartAmount,
      axios,
      fetchProducts
   };

   return <AppContext.Provider value={value}>
      {children}
   </AppContext.Provider>
}

export const useAppContext = () => {
   return useContext(AppContext);
}