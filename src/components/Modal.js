import React from "react";
import { MdCancel } from "react-icons/md";

const Modal = ({ children, closeFunc }) => {
  return (
    <div className="fixed z-[1000] top-0 left-0 w-full h-full overflow-y-auto overflow-x-hidden	bg-black-overlay">
      <div className="w-[70%] bg-[#181818] my-[10%] mx-auto shadow-xl h-[450px] flex flex-col">
        <MdCancel
          className="text-5xl text-white absolute top-28 right-44 cursor-pointer"
          onClick={() => closeFunc(false)}
        />
        <div className="w-[85%] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
