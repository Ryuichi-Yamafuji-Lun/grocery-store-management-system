import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(10);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getProducts`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const loadMoreProducts = () => {
    setProductsToShow(prevProductsToShow => prevProductsToShow + 10);
  };

  return (
    <div name='main' className="w-full min-h-screen flex flex-col items-center xl:pl-6">
      <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-4xl">
            Products Available
          </div>
          <div className="flex space-x-2">
            <Link to="/manageproducts" className="bg-dark-green text-white py-2 px-3 rounded-md transition hover:scale-105">
              Manage Products
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        {products.length > 0 ? (
          <div className="max-w-screen-xl mx-auto overflow-x-auto">
            <table className="shadow-lg bg-background-second min-w-full">
              <thead>
                <tr className="bg-dark-green text-white">
                  <th className="text-center px-4 py-2">Name</th>
                  <th className="text-center px-8 py-4">Unit</th>
                  <th className="text-center px-8 py-4">Price per unit</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, productsToShow).map(product => (
                  <tr key={product.product_id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 text-center">{product.name}</td>
                    <td className="py-2 px-4 text-center">{product.uom_name}</td>
                    <td className="py-2 px-4 text-center">
                      {product.price_per_unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mx-auto p-4 text-center text-gray-800">No products available.</div>
        )}

        {productsToShow < products.length && (
          <div className="w-full text-center p-4">
            <button onClick={loadMoreProducts} className="bg-dark-green text-white py-2 px-3 rounded-md transition hover:scale-105">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowProducts
