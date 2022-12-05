import React, { useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import { BiCloudUpload } from "react-icons/bi";
import { ref as databaseRef, onValue, push } from "firebase/database";
import { database, storage } from "../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Product from "../components/Product"
const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  const [progressPercentage, setProgressPercentage] = useState(null);
  const [file, setFile] = useState("");
  const fetchProducts = () => {
    const productsRef = databaseRef(database, "products/");
    onValue(productsRef, (snapshot) => {
      const products = snapshot.val();
      setProducts(Object.values(products));
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchCategories = () => {
    const categoriesRef = databaseRef(database, "categories/");
    onValue(categoriesRef, (snapshot) => {
      const categories = snapshot.val();
       setCategories(Object.values(categories));
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  const addProduct = (e) => {
    e.preventDefault();
    const product = {
      ...data,
    };
    push(databaseRef(database, "products/"), product);
  };
  useEffect(() => {
    const upload = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && upload();
  }, [file]);
  // console.log(products)
  return (
    <MainLayout>
      <div className="flex flex-row items-center justify-between w-[90%] mx-auto">
        <h1 className="font-gentium text-2xl font-semibold">Products</h1>
        <button
          className="font-gentium flex flex-row items-center p-3 my-2.5 bg-[#86B6DE] rounded-lg"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="mr-2" />
          <span>Add Product</span>
        </button>
      </div>
      <hr className="w-full" />
      <div>
        {products.length === 0 ? (
          <h1 className="font-gentium text-2xl font-semibold text-center mt-8">
            You haven't added any products!
          </h1>
        ) : (
          <div className="flex flex-row items-center w-[90%] mx-auto border p-4 my-8">
            {
              products.map((product, i) => <Product key={i} name={product.productName} image={product.image} category={product.categoryName}/> )
            }
          </div>
        )}
      </div>
      {showForm && (
        <Modal closeFunc={setShowForm}>
          <form className="h-[350px] my-20 border bg-white w-[60%] mx-auto p-8 rounded-xl">
            <select id="categoryName" onChange={handleInput}>
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="border-b border-[#86B6DE] w-full font-gentium focus:outline-none focus:border-b-2 border-[#86B6DE] text-lg"
              placeholder="Product Name"
              onChange={handleInput}
              id="productName"
            />
            <div className="w-full border border-[#86B6DE] rounded-lg h-[135px] my-6">
              <label htmlFor="file">
                Upload product image:{" "}
                <BiCloudUpload className="text-7xl text-[#86B6DE]" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button
              className="w-[28%] font-gentium text-lg rounded-lg bg-[#86B6DE] p-1.5 mx-auto"
              onClick={(e) => addProduct(e)}
              disabled={progressPercentage !== null && progressPercentage < 100}
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </MainLayout>
  );
};

export default Products;
