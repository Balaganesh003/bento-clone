import React from 'react';
import Image from 'next/image';
import { BiUpArrowCircle } from 'react-icons/bi';

const Avatar = ({ handleFileSelect, avatarSrc }) => {
  return (
    <div
      className={`flex-shrink-0 border-gray-border  w-[11.25rem] h-[11.25rem]  text-center cursor-pointer relative rounded-full border-dashed ${
        !avatarSrc && 'border-2'
      } bg-[#f7f7f7]`}>
      <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0">
        {avatarSrc && (
          <Image
            src={avatarSrc}
            alt="Drag and drop"
            width={64}
            height={64}
            className={`   ${
              avatarSrc
                ? ' h-full w-full object-cover rounded-full '
                : ' h-[4rem] w-[4rem]'
            }`}
          />
        )}
        {!avatarSrc && (
          <div className="flex flex-col items-center ">
            <BiUpArrowCircle className="text-[3rem]  text-[#dedede]" />
            <h1 className="text-[#6c6c6c]"> Add Avatar</h1>
          </div>
        )}
      </div>
      <input
        type="file"
        id="resumeInput"
        className="w-full h-full  absolute top-0 left-0 cursor-pointer opacity-0"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default Avatar;
