import React, { useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import { BiCloudUpload } from "react-icons/bi";
import { ref as databaseRef, onValue, push } from "firebase/database";
import { database, storage } from "../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Category from "../components/Category";

const Categories = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  const [progressPercentage, setProgressPercentage] = useState(null);
  const [file, setFile] = useState("");
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

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const category = {
      ...data,
    };
    console.log(category);
    push(databaseRef(database, "categories/"), category);
  };
  return (
    <MainLayout>
      <div className="flex flex-row items-center justify-between w-[90%] mx-auto">
        <h1 className="font-gentium text-2xl font-semibold">Categories</h1>
        <button
          className="font-gentium flex flex-row items-center p-3 my-2.5 bg-[#86B6DE] rounded-lg"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="mr-2" />
          <span>Add Category</span>
        </button>
      </div>
      <hr className="w-full" />
      <div>
        {categories.length === 0 ? (
          <h1 className="font-gentium text-2xl font-semibold text-center mt-8">
            You haven't added any categories!
          </h1>
        ) : (
          <div className="flex flex-row items-center w-[90%] mx-auto border p-4 my-8">
            {
              categories.map((category, i) => <Category key={i} name={category.categoryName} image={category.image}/> )
            }
            
          </div>
        )}
      </div>
      {showForm && (
        <Modal closeFunc={setShowForm}>
          <form className="h-[300px] my-20 border bg-white w-[60%] mx-auto p-8 rounded-xl">
            <input
              type="text"
              className="border-b border-[#86B6DE] w-full font-gentium focus:outline-none focus:border-b-2 border-[#86B6DE] text-lg"
              placeholder="Category Name"
              onChange={handleInput}
              id="categoryName"
            />
            <div className="w-full border border-[#86B6DE] rounded-lg h-[135px] my-6">
              <label htmlFor="file">
                Upload category image:{" "}
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
              onClick={(e) => addCategory(e)}
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

export default Categories;
