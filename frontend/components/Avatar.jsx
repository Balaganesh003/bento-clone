import React from 'react';
import Image from 'next/image';
import { BiUpArrowCircle } from 'react-icons/bi';
import axios from 'axios';

const Avatar = ({ avatarSrc, setAvatarSrc, username }) => {
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = async () => {
      const fileDataUrl = fileReader.result;

      console.log(fileDataUrl);

      try {
        const response = await axios.post(
          `http://localhost:5000/profile/avatar/${username}`,
          {
            avatar: fileDataUrl,
          }
        );

        const { profile } = response.data;
        if (profile && profile.avatar) {
          setAvatarSrc(profile.avatar);
        }
      } catch (error) {
        console.error('Avatar upload error:', error);
      }
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`flex-shrink-0 border-gray-border w-[7.5rem] h-[7.5rem] xl:w-[11.5rem] xl:h-[11.5rem]  text-center cursor-pointer relative rounded-full border-dashed ${
        !avatarSrc && 'border-2'
      } bg-[#f7f7f7]`}>
      <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0">
        {avatarSrc && (
          <Image
            src={avatarSrc}
            alt="Drag and drop"
            width={1024}
            height={1024}
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
