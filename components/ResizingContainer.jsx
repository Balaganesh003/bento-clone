import React, { useState } from 'react';

const ResizingContainer = () => {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(2);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  return (
    <div
      className={`${
        width === 2 || width === 3 || width === 5 ? 'w-[388px]' : 'w-[175px]'
      } ${(height === 1 || height === 3) && 'h-[175px]'} ${
        (height === 4 || height === 5) && 'h-[388px]'
      } ${
        height === 2 && 'h-[65px]'
      } bg-green-400 relative rounded-lg border shadow-lg transition-all duration-500 group p-2`}>
      <div className="h-full w-full overflow-hidden ">
        <p
          className={`w-full  px-2 pt-2 mb-2 leading-snug  text-[1.25rem] ${
            (height == 1 || height == 3) && 'line-clamp-5'
          } ${(height == 4 || height == 5) && 'line-clamp-[13]'} ${
            height == 2 && 'line-clamp-1'
          } text-ellipsis`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, aut
          delectus sequi modi velit distinctio fugit ipsam ipsa animi id
          excepturi iste ratione ex officiis deserunt blanditiis, repellendus,
          et cupiditate. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Officiis consequatur, vero adipisci nesciunt aspernatur ipsam
          eum at maiores tenetur. Accusantium, repellendus quisquam ut optio
          numquam mollitia repellat placeat ab voluptate?
        </p>
      </div>
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
