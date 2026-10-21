import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Header } from '../../components';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './Products.css';

const Products = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null); // Track item being edited
  const [updatedData, setUpdatedData] = useState({ name: "", price: "" });

  const fetchList = async (isMounted) => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        // Only update state if the component is still mounted
        if (isMounted) {
          setList(response.data.data);
        }
      } else {
        toast.error('Error fetching list');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(true); // Refresh the list after removing an item
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error removing item');
    }
  };

  const editFood = (item) => {
    setEditItem(item);
    setUpdatedData({ name: item.name, price: item.price });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${url}/api/food/update`, {
        id: editItem._id,
        name: updatedData.name,
        price: updatedData.price,
      });

      if (response.data.success) {
        toast.success("Product updated successfully!");
        setEditItem(null);
        fetchList(true); // Refresh list after updating
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    fetchList(isMounted); // Pass isMounted to fetchList

    // Cleanup function to set isMounted to false on unmount
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Products" />
      <div className="list flex-col">
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={item.image} alt="" />
              {editItem && editItem._id === item._id ? (
                <>
                  <input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-slate-700 dark:text-white w-full"
                  />
                  <p>{item.category}</p>
                  <input
                    type="number"
                    value={updatedData.price}
                    onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-slate-700 dark:text-white w-full"
                  />
                  <div className="flex gap-2 justify-center">
                    <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition duration-200 cursor-pointer text-xs">
                      Save
                    </button>
                    <button onClick={() => setEditItem(null)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded transition duration-200 cursor-pointer text-xs">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>₹{item.price}</p>
                  <div className="flex gap-4 items-center">
                    <FiEdit
                      onClick={() => editFood(item)}
                      className="cursor-pointer text-xl text-blue-500 hover:text-blue-700 hover:scale-125 transition-transform duration-200"
                      title="Edit product"
                    />
                    <FiTrash2
                      onClick={() => removeFood(item._id)}
                      className="cursor-pointer text-xl text-red-500 hover:text-red-700 hover:scale-125 transition-transform duration-200"
                      title="Remove product"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
