import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({ product, onCancel, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    uom_id: "",
    price_per_unit: "",
  });

  const [uoms, setUOMs] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        uom_id: product.uom_id,
        price_per_unit: product.price_per_unit,
      });
    }
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${backendURL}/getUoM`)
      .then( response => {
        setUOMs(response.data);
      })
      .catch( error => {
        console.error("Error fetching UOMs:", error);
      });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData( prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .put(`${backendURL}/updateProduct/${product.product_id}`, formData)
      .then( response => {
        // Notify the parent component that the product has been updated
        onProductUpdated(response.data); 
      })
      .catch( error => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl flex justify-center xl:pl-6">
      <form className="shadow-lg bg-white w-full p-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-lg mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={ formData.name }
            onChange={ handleChange }
            className="px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="uom_id" className="text-lg mb-2">
            Unit of Measurement (UOM)
          </label>
          <select
            name="uom_id"
            id="uom_id"
            value={ formData.uom_id }
            onChange={ handleChange }
            className="px-4 py-2 border rounded-md focus:outline-none"
          >
            <option value="">Select UOM</option>
            {uoms.map( uom => (
              <option key={ uom.uom_id } value={ uom.uom_id }>
                { uom.uom_name }
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="price_per_unit" className="text-lg mb-2">
            Price per Unit
          </label>
          <input
            type="text"
            name="price_per_unit"
            id="price_per_unit"
            value={ formData.price_per_unit }
            onChange={ handleChange }
            className="px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={ onCancel }
            className="bg-gray-200 px-4 py-2 mr-2 rounded-md transition hover:scale-105 hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={ handleSave }
            className="bg-dark-green text-white px-4 py-2 rounded-md transition hover:scale-105 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
