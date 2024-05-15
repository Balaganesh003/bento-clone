import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import axios from 'axios';
import { axiosWithToken } from '@/utils/axiosjwt';

const TitleBox = ({ item, USERNAME }) => {
  const dispatch = useDispatch();
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false);

  const handelDelete = async () => {
    dispatch(profileActions.removeItem(item.id));
    const res = await axiosWithToken.delete(
      `http://localhost:5000/profile/${USERNAME}/${item.id}`
    );
    console.log('res', res.data);
  };

  const titleRef = useRef();
  const handlePlaceholder = () => {
    if (titleRef?.current?.textContent.trim() === '') {
      setIsPlaceholderVisible(true);
    }
  };

  useEffect(() => {
    handlePlaceholder();
  }, []);

  const handelFocus = () => {
    setIsPlaceholderVisible(false);
    titleRef?.current?.focus();
  };

  const handelTitle = async () => {
    handlePlaceholder();
    dispatch(
      profileActions.updateItem({
        ...item,
        content: titleRef?.current?.textContent,
      })
    );
    console.log(titleRef?.current?.textContent);
    try {
      const res = await axiosWithToken.put(
        `http://localhost:5000/profile/${USERNAME}`,
        {
          ...item,
          content: titleRef?.current?.textContent,
        }
      );
      console.log('res', res.status);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    titleRef?.current?.addEventListener('blur', handelTitle);
    handlePlaceholder();
    return () => {
      titleRef?.current?.removeEventListener('blur', handelTitle);
    };
  }, []);

  return (
    <div className="w-[375px] xl:w-[820px]  rounded-[16px] p-2 relative border border-transparent hover:border-[#e3e3e3] hover:shadow-lg group bg-white transition-all duration-200 ease-in-out">
      <div
        ref={titleRef}
        onBlur={handlePlaceholder}
        contentEditable="true"
        suppressContentEditableWarning={true}
        className="max-w-[790px] min-w-[10rem] truncate text-ellipsis focus:text-clip h-[44px] cursor-text w-fit pl-4 pr-8 py-2 text-xl  bg-transparent outline-none rounded-lg transition-all duration-200 ease-in-out text-[#000] font-bold text-[24px] hover:bg-[#f5f5f5]"
        placeholder="Title">
        {item.content}
      </div>
      <div
        onFocus={handelFocus}
        onClick={handelFocus}
        className={`absolute top-0 text-[#afafaf] left-2 w-[9rem] hover:bg-[#f5f5f5] my-2 p-2 rounded-lg text-xl cursor-text ${
          isPlaceholderVisible ? 'opacity-[100%] static' : 'opacity-0 hidden'
        } `}>
        Add Title...
      </div>
      <div
        onClick={handelDelete}
        className="absolute hidden group-hover:flex  items-center justify-center -top-4 -left-4 w-9 h-9 rounded-full bg-white shadow-lg  cursor-pointer hover:bg-gray-100">
        <AiOutlineDelete className="w-5 h-5 text-black" />
      </div>
    </div>
  );
};

export default TitleBox;
