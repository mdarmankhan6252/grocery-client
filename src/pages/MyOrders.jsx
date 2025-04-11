import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
   const [myOrders, setMyOrders] = useState([]);
   const { currency } = useAppContext();


   const fetchMyOrders = async () => {
      setMyOrders(dummyOrders)
   }

   useEffect(() => {
      fetchMyOrders()
   }, [])

   // console.log(myOrders);

   return (
      <div className="mt-16 pb-16">
         <div className="flex flex-col items-end w-max pb-6">
            <h3 className="text-2xl font-medium uppercase text-gray-900/70">My orders</h3>
            <div className="w-1/6 h-0.5 bg-primary rounded-full"></div>
         </div>


         {
            myOrders.map((order, i) => (
               <div className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl" key={i}>
                  <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                     <span>Order Id : {order._id}</span>
                     <span>Payment : {order.paymentType}</span>
                     <span>Total Amount : {currency}{order.amount}</span>
                  </p>

                  {
                     order.items.map((item, i) => (
                        <div className={`relative bg-white text-gray-500/70 ${order.items.length !== i + 1 && 'border-b'} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`} key={i}>
                           <div className="flex items-center mb-4 md:mb-0">
                              <div className="bg-primary/10 rounded-lg">
                                 <img src={item.product.image[0]} alt="" className="w-16 h-16" />
                              </div>
                              <div className="ml-4">
                                 <h3 className="text-xl font-medium text-gray-800">{item.product.name}</h3>
                                 <p>Category : {item.product.category}</p>
                              </div>
                           </div>

                           <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                              <p>Quantity : {item.quantity || '1'}</p>
                              <p>Status : {order.status}</p>
                              <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                           </div>

                           <p className="text-primary text-lg font-medium">
                              Amount: {currency} {item.product.offerPrice * item.quantity}
                           </p>




                        </div>
                     ))
                  }
               </div>
            ))
         }



      </div>
   );
};

export default MyOrders;