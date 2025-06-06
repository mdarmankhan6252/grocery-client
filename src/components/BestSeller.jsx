import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";


const BestSeller = () => {
   const { products } = useAppContext();

   return (
      <div className="mt-16">
         <h3 className="text-2xl  md:text-3xl font-medium">Best Sellers</h3>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {
               products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
                  <ProductCard product={product} key={index} />
               ))
            }

         </div>

      </div>
   );
};

export default BestSeller;