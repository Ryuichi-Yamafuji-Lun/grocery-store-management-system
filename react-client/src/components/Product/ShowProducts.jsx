import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div name='main' className="min-h-screen">
      <div className="p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-2xl md:text-4xl text-gray-800">
            Products Available
          </div>
          <div className="flex space-x-2">
            <Link to="/manageproducts" className="bg-dark-green text-white py-2 px-3 rounded-md transition hover:scale-105">
              Manage Products
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4">
        {products.length > 0 ? (
          <div className="max-w-screen-xl mx-auto overflow-x-auto">
            <table className="w-full table-auto bg-background-second shadow-lg rounded-md">
              {/* Table header */}
              <thead>
                <tr className="bg-dark-green text-white">
                  <th className="px-6 py-3 text-center">Name</th>
                  <th className="px-6 py-3 text-center">Unit</th>
                  <th className="px-6 py-3 text-center">Price per unit</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {products.map(product => (
                  <tr key={product.product_id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-center">{product.name}</td>
                    <td className="px-6 py-4 text-center">{product.uom_name}</td>
                    <td className="px-6 py-4 text-center">
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
      </div>
    </div>
  )
}

export default ShowProducts
