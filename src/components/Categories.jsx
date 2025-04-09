import {  categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
   const { navigate } = useAppContext();
   return (
      <div className="mt-16">
         <h3 className="text-2xl  md:text-3xl font-medium">Categories</h3>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">

            {
               categories.map((category, index) => (
                  <div onClick={() => { navigate(`/products/${category.path.toLowerCase()}`); scrollTo(0, 0) }} key={index} className="group cursor-pointer py-5 gap-2 rounded-lg flex flex-col justify-center items-center" style={{ backgroundColor: category.bgColor }}>
                     <img src={category.image} alt={category.text} className="group-hover:scale-105 transition max-w-28" />
                     <p>{category.text}</p>
                  </div>
               ))
            }

         </div>
      </div>
   );
};

export default Categories;