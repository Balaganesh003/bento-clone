import React from 'react';
import Image from 'next/image';
import ResizingContainer from './ResizingContainer';
import imageLogo from '@/assets/image.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';

const ImageCard = ({ item }) => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(
          profileActions.updateItem({ ...item, imgUrl: e.target.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {item?.imgUrl ? (
        <ResizingContainer
          item={item}
          height={height}
          width={width}
          handleResize={handleResize}>
          <div
            className={` flex-shrink-0 bg-[#f7f7f7] border-gray-border rounded-[1.5rem] border-dashed w-full h-full  text-center  cursor-pointer relative  `}>
            <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0 flex-col">
              <Image
                src={item?.imgUrl}
                alt="Drag and drop"
                width={64}
                height={64}
                className={`h-full w-full object-cover  bg-white rounded-[1.5rem]`}
              />
            </div>

            <input
              type="file"
              id="resumeInput"
              className="w-[80%] h-[60%]  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer opacity-0 "
              onChange={handleFileSelect}
            />
          </div>
        </ResizingContainer>
      ) : (
        <div
          onClick={handleFileSelect}
          className={`flex-shrink-0 bg-[#f7f7f7] h-[175px] w-[175px] border-gray-border rounded-[1.5rem] border-dashed  text-center  cursor-pointer relative border-2 `}>
          <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0 flex-col">
            <Image
              src={imageLogo}
              alt="Drag and drop"
              width={64}
              height={64}
              className={`
                   w-[1.5rem] h-[1.5rem] rounded-md `}
            />
            <p className={`mt-1 font-bold text-[14px] `}>Add Text</p>
            <input
              type="file"
              id="resumeInput"
              className="w-full h-full rounded-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer opacity-0"
              onChange={handleFileSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
