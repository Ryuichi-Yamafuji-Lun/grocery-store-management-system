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
    // Fetch products whenever the products state is updated 
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(`${backendURL}/getProducts`)
      .then( response => {
        setProducts(response.data);
      })
      .catch( error => {
        console.error("Error fetching products:", error);
      });
  }, [products]); 

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
    <div className="min-h-screen xl:pl-6">
      <div className="p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-2">
          <div className="text-4xl text-gray-800">
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
                className="bg-dark-green text-white py-2 px-4 rounded-md transition hover:scale-105"
              >
                Add New Product
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
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
  
      <div className="max-w-screen-xl mx-auto">
        <div className="overflow-x-auto p-4">
          <table className="w-full table-auto bg-background-second shadow-lg rounded-md">
            <thead>
              <tr className="bg-dark-green text-white">
                <th className="px-6 py-3 text-center">Product ID</th>
                <th className="px-6 py-3 text-center">Product</th>
                <th className="px-6 py-3 text-center">UoM</th>
                <th className="px-6 py-3 text-center">Price per Unit</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{product.product_id}</td>
                  <td className="px-6 py-4 text-center">{product.name}</td>
                  <td className="px-6 py-4 text-center">
                    {uoms.find(uom => uom.uom_id === product.uom_id)?.uom_name}
                  </td>
                  <td className="px-6 py-4 text-center">{product.price_per_unit}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-dark-green text-white px-4 py-2 rounded-md transition hover:scale-105 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="bg-gray-200 px-4 py-2 rounded-md transition hover:scale-105 focus:outline-none ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl mt-4 p-4">
        <Link to="/showproducts" className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition hover:bg-gray-400 focus:outline-none">
          Return
        </Link>
      </div>
    </div>
  )  
}

export default ManageProducts
