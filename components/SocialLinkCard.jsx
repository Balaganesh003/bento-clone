import React, { useState } from 'react';
import ResizingContainer from './ResizingContainer';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';

const SocialLinkCard = ({ item }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  let link = `https://${item.baseUrl}.com/${item.userName}`;

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
      <div className="w-full h-full  p-4  ">
        <div className="px-2 pt-2">
          <div className="h-12 w-12 ">
            <Image src={item.logo} width={44} height={44} alt="logo" />
          </div>
        </div>
        <div
          onBlur={updateUserName}
          contentEditable="true"
          suppressContentEditableWarning={true}
          className="mt-1 font-bold focus:outline-none p-2 w-full hover:bg-[#f5f5f5] hover:cursor-text rounded-lg py-1 text-[0.875rem]  leading-[1.2rem] max-h-[calc(100%-6rem)]  line-clamp-2">
          {item.userName}
        </div>
        <Link href={link} target="_blank">
          <button className="absolute bottom-5 h-fit left-5   text-[0.75rem] leading-4 font-bold py-[7px] px-[21px] rounded-md bg-slate-300">
            Follow
          </button>
        </Link>
      </div>
    </ResizingContainer>
  );
};

export default SocialLinkCard;
