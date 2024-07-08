import React, { useRef } from 'react';
import Image from 'next/image';
import { BiUpArrowCircle } from 'react-icons/bi';
import { axiosWithToken } from '@/utils/axiosjwt';
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import DeleteIcon from '@/assets/delete.svg';

const Avatar = ({ username, isLaptop }) => {
  const { avatar } = useSelector((state) => state.profile);
  const { isSameUser } = useSelector((state) => state.ui);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    if (!isSameUser) {
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      const fileDataUrl = fileReader.result;

      try {
        const response = await axiosWithToken.post(
          `${API_URL}/profile/avatar/${username}`,
          {
            avatar: fileDataUrl,
          }
        );

        const { profile } = response.data;
        if (profile && profile.avatar) {
          dispatch(profileActions.updateAvatar(profile.avatar));
        }
      } catch (error) {
        console.error('Avatar upload error:', error);
      }
    };

    fileReader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  if (!avatar && !isSameUser) return null;

  return (
    <div
      className={`flex-shrink-0 group border-gray-border w-[7.5rem] h-[7.5rem] ${
        isLaptop && 'xl:w-[11.5rem] xl:h-[11.5rem]'
      } text-center ${
        isSameUser && 'cursor-pointer'
      } relative rounded-full border-dashed ${
        !avatar && 'border-2'
      } bg-[#f7f7f7]`}>
      <div className="w-full h-full flex items-center group justify-center absolute top-0 left-0">
        {avatar && (
          <Image
            src={avatar}
            alt="Drag and drop"
            width={1024}
            height={1024}
            className={`${
              avatar
                ? 'h-full w-full object-cover rounded-full'
                : 'h-[4rem] w-[4rem]'
            }`}
          />
        )}
        {!avatar && (
          <div className="flex flex-col items-center">
            <BiUpArrowCircle className="text-[3rem] text-[#dedede]" />
            <h1 className="text-[#6c6c6c]">Add Avatar</h1>
          </div>
        )}
        <button
          onClick={handleButtonClick}
          className={`absolute ${
            isLaptop &&
            isSameUser &&
            'xl:bottom-2 xl:left-2 xl:hidden xl:group-hover:flex'
          } ${
            isSameUser && !isLaptop ? 'flex' : 'hidden'
          } bottom-0 left-0 w-[34px] h-[34px] rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out items-center justify-center z-50`}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9ZM9 5C9.28141 5 9.53568 5.11624 9.7174 5.30333L12.7071 8.29304C13.0976 8.68357 13.0976 9.31673 12.7071 9.70726C12.3166 10.0978 11.6834 10.0978 11.2929 9.70726L10 8.41436V12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12V8.41436L6.70711 9.70726C6.31658 10.0978 5.68342 10.0978 5.29289 9.70726C4.90237 9.31673 4.90237 8.68357 5.29289 8.29304L8.2826 5.30333C8.46432 5.11624 8.71859 5 9 5Z"
              fill="#000"></path>
          </svg>
        </button>
        <button
          className={`absolute ${
            isLaptop &&
            isSameUser &&
            'xl:bottom-2 xl:right-2 xl:hidden xl:group-hover:flex'
          } ${
            isSameUser && !isLaptop ? 'flex' : 'hidden'
          } bottom-0 right-0 w-[34px] h-[34px] rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out items-center justify-center z-50`}>
          <Image src={DeleteIcon} alt="delete" />
        </button>
      </div>
      {isSameUser && (
        <input
          type="file"
          ref={fileInputRef}
          className="w-full h-full absolute top-0 left-0 cursor-pointer opacity-0"
          onChange={handleFileSelect}
        />
      )}
    </div>
  );
};

export default Avatar;
