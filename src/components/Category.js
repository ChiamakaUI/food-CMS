import React from "react";

const Category = ({ image, name}) => {
  console.log(image);
  return (
    <div className="border relative">
      <div
        className="bg-red-600 w-[350px] h-[350px] mr-2"
        style={{ backgroundImage: `url(${image})` }}
      >
        <p>{name}</p>

      </div>
    </div>
  );
};

export default Category;
