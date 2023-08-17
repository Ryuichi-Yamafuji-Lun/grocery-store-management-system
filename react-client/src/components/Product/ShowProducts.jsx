import { useState, useEffect } from "react";
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
<div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="flex items-center">
            <h1 className="text-4xl text-white mr-4 inline-block whitespace-nowrap ">
              Products Available
            </h1>
            <img
              src={Potion}
              alt="Potion"
              className={`w-12 md:w-20 mb-2 inline-block align-middle `}
            />
        </div>
        <div>
          <a href="/manageproducts" className="bg-[#204e93] text-gray-100 py-2 px-3 mx-2 transition hover: scale-115 ">Manage Products</a>
        </div>        
      </div>
      {products.length > 0 ? (
        <div className="mx-auto flex flex-row justify-center items-center p-4">
          <table className="shadow-lg bg-white w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="border text-center px-8 py-4">Name</th>
                <th className="border text-center px-8 py-4">Unit</th>
                <th className="border text-center px-8 py-4">Price per unit</th>
              </tr>
            </thead>
            <tbody>
              {products.map( products => (
                <tr key = { products.product_id }>
                  <td className="py-2 px-4 text-center">{products.name}</td>
                  <td className="py-2 px-4 text-center">{products.uom_name}</td>
                  <td className="py-2 px-4 text-center">{products.price_per_unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): (
        <div className="mx-auto p-4 text-center">No products available.</div>
      )}
    </div>
  )
}

export default ShowProducts
