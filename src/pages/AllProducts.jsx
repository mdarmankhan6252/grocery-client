import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

const AllProducts = () => {
   const { products, searchQuery } = useAppContext();
   const [filterProducts, setFilterProducts] = useState([]);

   useEffect(() => {
      if (searchQuery?.length > 0) {
         setFilterProducts(
            products.filter(product =>
               product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
         );
      } else {
         setFilterProducts(products); // optionally reset the list
      }
   }, [products, searchQuery]);


   return (
      <div className="mt-16">
         <div className="flex flex-col items-end w-max">
            <h3 className="text-2xl font-medium uppercase text-gray-900/70">All Products</h3>
            <div className="w-1/6 h-0.5 bg-primary rounded-full"></div>
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {
               filterProducts
                  .filter(product => product.inStock)
                  .map((product, index) => (
                     <ProductCard product={product} key={index} />
                  ))
            }

         </div>
      </div>
   );
};

export default AllProducts;