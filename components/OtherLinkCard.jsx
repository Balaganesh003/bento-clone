import React, { useState } from 'react';
import ResizingContainer from './ResizingContainer';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import LinkLogo from '@/assets/link.svg';

const OtherLinkCard = ({ item }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  const updateUserName = (e) => {
    dispatch(
      profileActions.updateItem({ ...item, userName: e.target.innerText })
    );
  };

  return (
    <ResizingContainer
      width={width}
      item={item}
      handleResize={handleResize}
      height={height}>
      <Link href={item.link} target="_blank">
        <div className="w-full h-full  p-4  ">
          <div className="px-2 pt-2">
            <div className="h-12 w-12 ">
              <Image
                src={item.logo || LinkLogo}
                width={512}
                height={512}
                alt="logo"
                className="rounded-lg"
              />
            </div>
          </div>
          <div
            onBlur={updateUserName}
            contentEditable="true"
            className="mt-1 font-bold focus:outline-none p-2 w-full hover:bg-[#f5f5f5] hover:cursor-text rounded-lg py-1 text-[0.875rem]  leading-[1.2rem] max-h-[calc(100%-6rem)]  line-clamp-2">
            {item.userName || item.baseUrl}
          </div>
          <p className="text-[0.75rem] text-gray-500 line-clamp-2 px-2 leading-4">
            {item.hostname}
          </p>
        </div>
      </Link>
    </ResizingContainer>
  );
};

export default OtherLinkCard;
