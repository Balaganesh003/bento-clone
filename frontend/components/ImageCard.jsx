import React from 'react';
import Image from 'next/image';
import ResizingContainer from './ResizingContainer';
import imageLogo from '@/assets/image.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import { axiosWithToken } from '@/utils/axiosjwt';
import { useSelector } from 'react-redux';

const ImageCard = ({ item, USERNAME }) => {
  const dispatch = useDispatch();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { isSameUser } = useSelector((state) => state.ui);
  const [width, setWidth] = useState(item.width);
  const [height, setHeight] = useState(item.height);

  const handleResize = async (width, height) => {
    try {
      const res = await axiosWithToken.put(
        `${API_URL}/profile/resize/${USERNAME}/${item.id}/${width}/${height}`
      );

      console.log(res.data.message);
    } catch (error) {
      console.log('error', error.message);
    }
    setWidth(width);
    setHeight(height);
  };

  const handleFileSelect = async (e) => {
    if (!isSameUser) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = async (e) => {
        try {
          const imgUrl = e.target.result;

          // Dispatch an action to update the item with the imgUrl
          dispatch(profileActions.updateItem({ ...item, imgUrl }));

          // Send a PUT request to update the profile with the imgUrl
          const res = await axiosWithToken.put(
            `${API_URL}/profile/${USERNAME}`,
            {
              ...item,
              imgUrl,
            }
          );

          console.log(res.data); // Log the response data if needed
        } catch (error) {
          console.error('Error updating profile:', error.message);
        }
      };

      reader.onerror = (e) => {
        console.error('File reading error:', e.target.error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {item?.imgUrl && item.imgUrl != 'null' ? (
        <ResizingContainer
          USERNAME={USERNAME}
          item={item}
          height={height}
          width={width}
          handleResize={handleResize}>
          <div
            className={` flex-shrink-0 bg-[#f7f7f7] border-gray-border rounded-[1.5rem] border-dashed w-full h-full  text-center ${
              isSameUser && 'cursor-pointer'
            }   relative  `}>
            <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0 flex-col">
              <Image
                src={item?.imgUrl}
                alt="Drag and drop"
                width={1024}
                height={1024}
                className={`h-full w-full object-cover  bg-white rounded-[1.5rem]`}
              />
            </div>

            {isSameUser && (
              <input
                type="file"
                id="resumeInput"
                className="w-[80%] h-[60%]  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer opacity-0 "
                onChange={handleFileSelect}
              />
            )}
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
