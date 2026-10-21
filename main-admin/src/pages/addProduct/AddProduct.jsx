import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";

const AddProduct = ({ url }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add container">
      <div className="add-card">
        <h2 className="add-title">Add New Food Item</h2>
        <form className="d-flex flex-column gap-4" onSubmit={onSubmitHandler}>
          <div className="add-img-upload d-flex flex-column align-items-start">
            <p className="form-group-label">Upload Image</p>
            <label htmlFor="image" className="d-block">
              <div className="upload-box">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Upload Area"
                  />
                ) : (
                  <div className="upload-box-placeholder">
                    <FiUploadCloud />
                    <span>Click to upload</span>
                  </div>
                )}
              </div>
            </label>
            <input
              onChange={onImageChange}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="add-product-name d-flex flex-column">
            <p className="form-group-label">Product Name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              className="premium-input"
              placeholder="Type here..."
              required
            />
          </div>

          <div className="add-product-description d-flex flex-column">
            <p className="form-group-label">Product Description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="4"
              className="premium-input"
              placeholder="Write description here..."
              required
            ></textarea>
          </div>

          <div className="add-category-price">
            <div className="add-category d-flex flex-column">
              <p className="form-group-label">Product Category</p>
              <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
                className="premium-input"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price d-flex flex-column">
              <p className="form-group-label">Product Price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                className="premium-input"
                placeholder="₹20"
                min={0}
                required
              />
            </div>
          </div>

          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "ADD PRODUCT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
