import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {

   const { setIsSeller } = useAppContext();

   const sidebarLinks = [
      { name: "Add Product", path: "/seller", icon: assets.add_icon },
      { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
      { name: "Orders", path: "/orders", icon: assets.order_icon },
   ];

   const logout = async () => {
      setIsSeller(false)
   }

   return (
      <>
         <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
            <Link to='/'>
               <img className="h-9" alt="logo" src={assets.logo} />
            </Link>
            <div className="flex items-center gap-5 text-gray-500">
               <p>Hi! Admin</p>
               <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
            </div>
         </div>


         <div className="flex">
            <div className="md:w-64 w-16 border-r h-[calc(100vh-61px)]  text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
               {sidebarLinks.map((item) => (
                  <NavLink
                     to={item.path}
                     key={item.name}
                     end={item.path === '/seller'}
                     className={({ isActive }) =>
                        `flex items-center py-3 px-4 gap-3 
               ${isActive
                           ? 'border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary-dull'
                           : 'hover:bg-gray-100/90 text-gray-700'
                        }`
                     }
                  >
                     <img src={item.icon} className="w-7 h-7" />
                     <p className="md:block hidden text-center">{item.name}</p>
                  </NavLink>
               ))}
            </div>
         </div>


      </>
   );
};

export default SellerLayout;