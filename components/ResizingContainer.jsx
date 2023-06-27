import React, { useState } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';

const ResizingContainer = ({ children, width, height, handleResize }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div
      className={`${
        width === 2 || width === 3 || width === 5 ? 'w-[388px]' : 'w-[175px]'
      } ${(height === 1 || height === 3) && 'h-[175px]'} ${
        (height === 4 || height === 5) && 'h-[388px]'
      } ${
        height === 2 && 'h-[65px]'
      } bg-white relative rounded-lg border shadow-lg transition-all duration-500 group p-3 ${
        isDeleting && 'hidden'
      }`}>
      {children}
      {/* Delete options */}
      <div
        onClick={() => setIsDeleting(true)}
        className="absolute hidden group-hover:flex items-center justify-center -top-4 -left-4 w-9 h-9 rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-100">
        <AiOutlineDelete className="w-5 h-5 text-black" />
      </div>
      {/* Resizing options */}
      <div className="absolute hidden bottom-[-30px] group-hover:flex w-fit left-[50%] -translate-x-1/2 bg-black shadow-lg rounded-[8px] transition-all duration-300 items-center p-2 gap-2">
        <div
          onClick={() => handleResize(1, 1)}
          className={`w-7 h-7 ${
            width === 1 && height === 1 ? 'bg-white' : 'bg-black'
          } flex items-center justify-center rounded cursor-pointer`}>
          <div
            className={`h-3 w-3 border-[2px] ${
              width === 1 && height === 1 ? 'border-black' : 'border-white'
            } rounded-[2px]`}></div>
        </div>
        <div
          onClick={() => handleResize(2, 2)}
          className={`w-7 h-7 ${
            width === 2 && height === 2 ? 'bg-white' : 'bg-black'
          } flex items-center justify-center rounded cursor-pointer`}>
          <div
            className={`w-5 h-2 border-[2px] ${
              width === 2 && height === 2 ? 'border-black' : 'border-white'
            } rounded-[2px]`}></div>
        </div>
        <div
          onClick={() => handleResize(3, 3)}
          className={`w-7 h-7 ${
            width === 3 && height === 3 ? 'bg-white' : 'bg-black'
          } flex items-center justify-center rounded cursor-pointer`}>
          <div
            className={`w-5 h-3 border-[2px] ${
              width === 3 && height === 3 ? 'border-black' : 'border-white'
            } rounded-[2px]`}></div>
        </div>
        <div
          onClick={() => handleResize(4, 4)}
          className={`w-7 h-7 ${
            width === 4 && height === 4 ? 'bg-white' : 'bg-black'
          } flex items-center justify-center rounded cursor-pointer`}>
          <div
            className={`h-5 border-[2px] w-2 ${
              width === 4 && height === 4 ? 'border-black' : 'border-white'
            } rounded-[2px]`}></div>
        </div>
        <div
          onClick={() => handleResize(5, 5)}
          className={`w-7 h-7 ${
            width === 5 && height === 5 ? 'bg-white' : 'bg-black'
          } flex items-center justify-center rounded cursor-pointer`}>
          <div
            className={`h-5 w-5 border-[2px] ${
              width === 5 && height === 5 ? 'border-black' : 'border-white'
            } rounded`}></div>
        </div>
      </div>
    </div>
  );
};

export default ResizingContainer;
