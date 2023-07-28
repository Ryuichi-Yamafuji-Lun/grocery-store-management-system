import React, { useState } from "react";
import axios from "axios";

const UpdateProduct = ({ product, onCancel, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    uom_id: product.uom_id,
    price_per_unit: product.price_per_unit,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .put(`${backendURL}/updateProduct/${product.product_id}`, formData)
      .then((response) => {
        // Notify the parent component that the product has been updated
        onProductUpdated(response.data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center p-4">
      <form className="shadow-lg bg-white w-full p-4">
        {/* ... Form fields for updating the product ... */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 mr-2 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-[#204e93] text-white px-4 py-2 rounded-md hover:bg-[#005ea3] focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
