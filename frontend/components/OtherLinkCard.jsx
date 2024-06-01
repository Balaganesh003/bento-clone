import React, { useState } from 'react';
import ResizingContainer from './ResizingContainer';
import Image from 'next/image';
import Link from 'next/link';
import LinkLogo from '@/assets/link.svg';

const OtherLinkCard = ({ item, USERNAME }) => {
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

  return (
    <ResizingContainer
      USERNAME={USERNAME}
      width={width}
      item={item}
      handleResize={handleResize}
      height={height}>
      <Link href={item.link || '#'} target="_blank">
        <div className="w-full h-full p-4">
          <div className="px-2 pt-2">
            <div className="h-10 w-10 p-2 rounded-md flex items-center justify-center border shadow-sm">
              <Image
                src={item.logo || LinkLogo}
                width={44}
                height={44}
                alt="logo"
                className="rounded-lg"
              />
            </div>
          </div>
          <div>
            <div
              suppressContentEditableWarning={true}
              className="mt-1 font-bold focus:outline-none p-2 w-full hover:bg-[#f5f5f5]  rounded-lg py-1 text-[0.875rem]  leading-[1.2rem] max-h-[calc(100%-6rem)]  line-clamp-2">
              {item.userName || item.baseUrl}
            </div>
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
