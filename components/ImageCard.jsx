import React from 'react';
import Image from 'next/image';
import ResizingContainer from './ResizingContainer';
import imageLogo from '@/assets/image.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';

const ImageCard = ({ item }) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);

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
        setImageSrc(e.target.result);
        dispatch(
          profileActions.updateItem({ ...item, imgUrl: e.target.result })
        );
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ResizingContainer
      item={item}
      height={height}
      width={width}
      handleResize={handleResize}>
      <div
        className={` flex-shrink-0 bg-[#f7f7f7] border-gray-border rounded-[1.5rem] border-dashed w-full h-full  text-center  cursor-pointer relative ${
          !imageSrc && 'border-2 '
        } `}>
        <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0 flex-col">
          <Image
            src={item?.imgUrl || imageLogo}
            alt="Drag and drop"
            width={64}
            height={64}
            className={` ${
              item?.imgUrl
                ? ' h-full w-full object-cover  bg-white rounded-[1.5rem]'
                : 'w-[1.5rem] h-[1.5rem] rounded-md'
            } `}
          />
          <p
            className={`mt-1 font-bold text-[14px] ${
              item?.imgUrl ? 'hidden' : ''
            }`}>
            Add Photo
          </p>
        </div>

        <input
          type="file"
          id="resumeInput"
          className="w-full h-full  absolute top-0 left-0 cursor-pointer opacity-0"
          onChange={handleFileSelect}
        />
      </div>
    </ResizingContainer>
  );
};

export default ImageCard;
