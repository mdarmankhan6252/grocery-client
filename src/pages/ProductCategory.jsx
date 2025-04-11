import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";


const ProductCategory = () => {
   const { products } = useAppContext();
   const { category } = useParams();
   console.log(category);

   const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

   const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)

   return (
      <div className="mt-16">

         {
            searchCategory && (
               <div className="flex flex-col items-end w-max">
                  <h3 className="text-2xl font-medium uppercase text-gray-900/70">{searchCategory.text.toUpperCase()}</h3>
                  <div className="w-16 h-0.5 rounded-full bg-primary"></div>
               </div>
            )
         }

         {
            filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                  {
                     filteredProducts.map((product, i) => (
                        <ProductCard product={product} key={i}/>
                     ))
                  }
               </div>
            ) : (
               <div className="flex items-center justify-center h-[60vh]">
                  <p className="text-2xl font-medium text-primary">No products found in this category</p>

                  
               </div>
            )
         }
      </div>
   );
};

export default ProductCategory;