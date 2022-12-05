import React from 'react'

const Product = ({ image, name, category  }) => {
  return (
    <div className="border relative">
      <div
        className="bg-red-600 w-[350px] h-[350px] mr-2"
        style={{ backgroundImage: `url(${image})` }}
      >
        <p>{name}</p>
        <p>{category}</p>
      </div>
    </div>
  )
}

export default Product