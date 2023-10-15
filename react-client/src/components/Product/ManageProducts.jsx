import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "./AddProduct";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [uoms, setUOMs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(`${backendURL}/getProducts`)
      .then( response => {
        setProducts(response.data);
      })
      .catch( error => {
        console.error("Error fetching products:", error);
      });

    axios
      .get(`${backendURL}/getUoM`)
      .then( response => {
        setUOMs(response.data);
      })
      .catch( error => {
        console.error("Error fetching UOMs:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch products whenever the products state is updated (e.g., after adding or updating a product)
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(`${backendURL}/getProducts`)
      .then( response => {
        setProducts(response.data);
      })
      .catch( error => {
        console.error("Error fetching products:", error);
      });
  }, [products]); // Depend on the products state to trigger the effect

  const handleProductUpdated = (updatedProduct) => {
    setProducts( prevProducts =>
      prevProducts.map( product =>
        product.product_id === updatedProduct.product_id ? updatedProduct : product
      )
    );
    setEditMode(false);
    setSelectedProduct(null);
  };

  const handleProductAdded = (newProduct) => {
    setProducts( prevProducts => [...prevProducts, newProduct]);
    setShowAddForm(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
    setShowAddForm(false);
  };

  const handleDelete = (product) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    axios
      .delete(`${backendURL}/deleteProduct/${product.product_id}`)
      .then( response => {
        console.log('Product successfully deleted', response);
        setProducts( prevProducts =>
          prevProducts.filter((item) => item.product_id !== product.product_id)
        );
      })
      .catch( error => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div name="main" className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-4xl">
            Manage Products
          </div>

          {!editMode && !selectedProduct && !showAddForm && (
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setEditMode(false);
                  setShowAddForm(true);
                }}
                className="bg-[#204e93] text-gray-100 py-2 px-4 mx-auto transition hover:scale-105"
              >
                Add New Product
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-4">
        {(editMode || selectedProduct) ? (
            <UpdateProduct
              product={selectedProduct}
              onCancel={() => {
                setEditMode(false);
                setSelectedProduct(null);
              }}
              onProductUpdated={handleProductUpdated}
            />
          ) : null}
      
          {!editMode && !selectedProduct && showAddForm && (
            <AddProduct
              onProductAdded={handleProductAdded}
              onCancel={() => {
                setShowAddForm(false);
                setSelectedProduct(null);
              }}
            />
          )}
      </div>
  
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="overflow-x-auto">
          <table className="shadow-lg bg-white min-w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="border text-center px-8 py-4">Product ID</th>
                <th className="border text-center px-8 py-4">Product</th>
                <th className="border text-center px-8 py-4">UoM</th>
                <th className="border text-center px-8 py-4">Price per Unit</th>
                <th className="border text-center px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td className="py-2 px-4 text-center">{product.product_id}</td>
                  <td className="py-2 px-4 text-center">{product.name}</td>
                  <td className="py-2 px-4 text-center">
                    {uoms.find(uom => uom.uom_id === product.uom_id)?.uom_name}
                  </td>
                  <td className="py-2 px-4 text-center">{product.price_per_unit}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-[#204e93] text-white px-4 py-2 rounded-md hover:bg-[#005ea3] focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Link to="/showproducts" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
            Return
          </Link>
        </div>
      </div>
    </div>
  )  
}

export default ManageProducts
