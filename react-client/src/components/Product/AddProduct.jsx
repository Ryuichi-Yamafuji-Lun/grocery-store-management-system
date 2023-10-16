import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    uom_id: "",
    price_per_unit: "",
  });

  const [uoms, setUOMs] = useState([]);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${backendURL}/getUoM`)
      .then( response => {
        setUOMs(response.data);
      })
      .catch( error => {
        console.error("Error fetching UOMs:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdd = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(`${backendURL}/addProduct`, formData)
      .then( response => {
        // Notify the parent component that a new product has been added
        onProductAdded(response.data);
        setFormData({
          name: "",
          uom_id: "",
          price_per_unit: "",
        });
      })
      .catch( error => {
        console.error("Error adding product:", error);
      });
  };

  const handleCancel = () => {
    // Hide the form and reset the form data when the "Cancel" button is clicked
    setFormData({
      name: "",
      uom_id: "",
      price_per_unit: "",
    });
    if (onCancel) {
      onCancel(); 
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex justify-center">
      <form className="shadow-lg bg-background-second w-full p-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-lg mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
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
            value={formData.uom_id}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none"
          >
            <option value="">Select UOM</option>
            {uoms.map((uom) => (
              <option key={uom.uom_id} value={uom.uom_id}>
                {uom.uom_name}
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
            value={formData.price_per_unit}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 px-4 py-2 mr-2 rounded-md transition hover:scale-105 hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-dark-green text-white px-4 py-2 rounded-md transition hover:scale-105 focus:outline-none"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
