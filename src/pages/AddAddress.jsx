import { useState } from "react";
import { assets } from "../assets/assets";


const InputField = ({ type, placeholder, handleChange, address, name }) => {
   return <input className="w-full px-2 py-2.5 border border-gray-500/30 rounded-sm outline-0 text-gray-500 focus:border-primary" type={type} placeholder={placeholder} onChange={handleChange} name={name} value={address[name]} required />
}

const AddAddress = () => {

   const [address, setAddress] = useState({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target;

      setAddress((prevAddress) => ({
         ...prevAddress,
         [name]: value
      }))
   }

   //handleChange

   const onSubmitHandler = async (e) => {
      e.preventDefault();
   }



   return (
      <div className="mt-16 pb-16 max-w-7xl mx-auto">
         <p className="text-2xl md:text-3xl text-gray-600">Add Shipping <span className="font-semibold text-primary">Address</span></p>

         <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
            <div className="grow max-w-md">
               <form onSubmit={onSubmitHandler} className="space-y-4 mt-6 text-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
                     <InputField handleChange={handleChange} address={address} name='lstName' type="text" placeholder="Last Name" />
                  </div>

                  <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email address" />

                  <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
                     <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     <InputField handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip Code" />
                     <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
                  </div>

                  <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

                  <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase rounded-sm">
                     Save address
                  </button>




               </form>
            </div>
            <img src={assets.add_address_iamge} alt="address" />

         </div>

      </div>
   );
};

export default AddAddress;