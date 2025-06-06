import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
   const { isSeller, setIsSeller, axios, navigate } = useAppContext();
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const onsubmitHandler = async e => {
      try {
         e.preventDefault();
         const { data } = await axios.post('/api/seller/login', { email, password })
         if (data.success) {
            setIsSeller(true)
            navigate('/seller')
         } else {
            toast.error(data.message)
         }

      } catch (error) {
         console.clear(error)
         toast.error(error.message)
      }
   }

   useEffect(() => {
      if (isSeller) {
         navigate('/seller')
      }
   }, [isSeller])


   return !isSeller && (
      <form onSubmit={onsubmitHandler} className="min-h-screen flex items-center text-sm text-gray-600">

         <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
            <p className="text-2xl font-medium mx-auto"><span className="text-primary">Seller</span> Login</p>
            <div className="w-full">
               <p>Email</p>
               <input onChange={(e) => setEmail(e.target.value)} defaultValue={"arman@gmai.com"} type="email" placeholder="Email" className="border border-gray-200 rounded-sm w-full p-2 mt-1 outline-primary" required />
            </div>
            <div className="w-full">
               <p>Email</p>
               <input onChange={(e) => setPassword(e.target.value)} defaultValue={'123456aa'} type="password" placeholder="Password" className="border border-gray-200 rounded-sm w-full p-2 mt-1 outline-primary" required />
            </div>

            <button className="bg-primary text-white w-full rounded-sm cursor-pointer py-2">Login</button>
         </div>


      </form>
   );
};

export default SellerLogin;