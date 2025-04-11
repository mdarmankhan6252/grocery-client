import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { BsMinecartLoaded } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAppContext } from "../context/AppContext";


const Navbar = () => {
   const [open, setOpen] = useState(false);
   const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount } = useAppContext();

   const logout = async () => {
      setUser(null);
      navigate('/')
   }

   useEffect(() => {
      if (searchQuery.length > 0) {
         navigate('/product')
      }
   }, [])

   return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

         <Link to="/" >
            <img src={assets.logo} alt="" className="h-8" />
         </Link>

         {/* Desktop Menu */}
         <div className="hidden sm:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All Products</NavLink>
            {user && <NavLink to="/orders">My Orders</NavLink>}
            <NavLink to="/contacts">Contact</NavLink>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
               <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
               <img src={assets.search_icon} alt="" className="w-4 h-4" />
            </div>

            <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
               <img src={assets.nav_cart_icon} alt="" className="w-6 opacity-80" />
               <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
            </div>

            {!user ? <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full">
               Login
            </button> : <div className="relative group">
               <img src={assets.profile_icon} alt="" className="w-10" />
               <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border  border-gray-200  py-2.5 w-40 rounded-md text-sm z-40 space-y-3 px-3">
                  <li onClick={() => navigate('/my-orders')} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 duration-300 p-1.5 border border-white hover:border-gray-200">
                     <BsMinecartLoaded />
                     <span>My Orders</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 duration-300 p-1.5 border border-white hover:border-gray-200">
                     <RiLogoutCircleRLine />
                     <span>Logout</span>
                  </li>
               </ul>
            </div>}
         </div>

         <div className="flex items-center gap-8 sm:hidden">
            <div onClick={() => navigate('/cart')} className="relative cursor-pointer ">
               <img src={assets.nav_cart_icon} alt="" className="w-6 opacity-80" />
               <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
               <img src={assets.menu_icon} alt="menu" className="w-6" />
            </button>
         </div>

         {/* Mobile Menu */}
         {
            open && (
               <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                  <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                  <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                  {
                     user && <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>
                  }

                  <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

                  {
                     !user ? <button onClick={() => { setOpen(false); setShowUserLogin(true) }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">Login</button> :
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">Logout</button>

                  }

               </div>
            )
         }

      </nav>
   );
};

export default Navbar;