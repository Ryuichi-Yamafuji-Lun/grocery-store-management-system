import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    uom_id: "",
    price_per_unit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdd = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(`${backendURL}/addProduct`, formData)
      .then((response) => {
        // Notify the parent component that a new product has been added
        onProductAdded(response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center p-4">
      <form className="shadow-lg bg-white w-full p-4">
        {/* ... Form fields for adding a new product ... */}
      </form>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAdd}
          className="bg-[#204e93] text-white px-4 py-2 rounded-md hover:bg-[#005ea3] focus:outline-none"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
