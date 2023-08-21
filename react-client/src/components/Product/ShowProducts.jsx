import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Potion from "../../assets/pokemon-sprites/Items/medicine/potion.png";

const ShowProducts = () => {
  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${backendURL}/getProducts`).then(
      response => {
        setProducts(response.data);
      }
    ).catch( error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div name='main' className="w-full min-h-screen bg-pokemart-pattern flex flex-col items-center">
      <div className="w-full text-white p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-2xl md:text-4xl flex items-center">
            Products Available
            <img
              src={Potion}
              alt="Potion"
              className="w-12 md:w-20 ml-2"
            />
          </div>
          <div className="flex space-x-2">
            <Link to="/manageproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 transition hover:scale-105">
              Manage Products
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        {products.length > 0 ? (
          <div className="max-w-screen-xl mx-auto overflow-x-auto">
            <table className="shadow-lg bg-white min-w-full">
              {/* Table header */}
              <thead>
                <tr className="bg-blue-100">
                  <th className="border text-center px-8 py-4">Name</th>
                  <th className="border text-center px-8 py-4">Unit</th>
                  <th className="border text-center px-8 py-4">Price per unit</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {products.map(product => (
                  <tr key={product.product_id}>
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
          <div className="mx-auto p-4 text-center">No products available.</div>
        )}
      </div>
    </div>
  )
}

export default ShowProducts
