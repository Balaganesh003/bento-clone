import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import crosslogo from '@/assets/whitecloselogo.svg';

const AddSocialLinkCard = ({
  link,
  handelUpdateLink,
  bgColor,
  logo,
  isAdded,
  isLogo,
}) => {
  const [linkValue, setLinkValue] = useState(link);

  const handelChange = (e) => {
    const { value } = e.target;
    setLinkValue((prev) => ({ ...prev, userName: value }));
  };

  const addLink = () => {
    handelUpdateLink(linkValue.baseUrl, {
      ...linkValue,
      isAdded: true,
    });
  };

  const removeLink = () => {
    handelChange({
      target: {
        value: '',
      },
    });

    handelUpdateLink(linkValue.baseUrl, {
      ...linkValue,
      userName: '',
      isAdded: false,
    });
  };

  const handelOnPaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (paste.includes('http') || paste.includes('https')) {
      const url = new URL(paste);
      if (!url) return;
      const { hostname } = url;
      const path = url.pathname.split('/');
      const userName = path[1];
      const baseUrl = hostname.split('.')[0];
      setLinkValue((prev) => ({
        ...prev,
        userName: userName || e.clipboardData.getData('text'),
      }));

      addLink();
    }
  };

  useEffect(() => {}, [link]);

  return (
    <div className="flex items-center gap-3 mt-3 w-fit z-0">
      {!isLogo && (
        <Image
          src={
            logo ||
            `https://www.google.com/s2/favicons?domain=${
              linkValue?.baseUrl
            }&sz=${256}`
          }
          width={44}
          height={44}
          className="w-[2.75rem] h-[2.75rem] rounded-lg"
          alt="logo"
        />
      )}

      <div
        className={`flex h-[44px] w-[280px] items-center gap-1 ${bgColor}  rounded-lg pl-3  text-white  flex z-[50]`}>
        {linkValue?.userName.length > 0 && isAdded ? (
          <div className="w-[14px] h-[14px] mt-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM10.7071 5.70711C11.0976 5.31658 11.0976 4.68342 10.7071 4.29289C10.3166 3.90237 9.68342 3.90237 9.29289 4.29289L6 7.58579L4.70711 6.29289C4.31658 5.90237 3.68342 5.90237 3.29289 6.29289C2.90237 6.68342 2.90237 7.31658 3.29289 7.70711L5.29289 9.70711C5.68342 10.0976 6.31658 10.0976 6.70711 9.70711L10.7071 5.70711Z"
                fill="#fff"></path>
            </svg>
          </div>
        ) : (
          <span className="text-[16px] ">@</span>
        )}

        <input
          type="text"
          readOnly={isAdded}
          value={`${isAdded ? `@${linkValue?.userName}` : linkValue?.userName}`}
          onPaste={handelOnPaste}
          onChange={handelChange}
          contentEditable="true"
          className={`flex-1 ${bgColor}   whitespace-nowrap focus:outline-none font-medium  text-[20px] text-ellipsis  focus:text-clip truncate focus:overflow-y-clip focus:text-start leading-6 w-[5rem]`}
        />

        <div className="flex-shrink-0 w-fit mr-2">
          {linkValue?.userName.length > 0 && isAdded ? (
            <button
              onClick={removeLink}
              className="flex items-center  hover:bg-black/10 rounded-full justify-center p-2">
              <Image src={crosslogo} width={14} height={14} alt="cross logo" />
            </button>
          ) : (
            <button
              onClick={addLink}
              className="text-[0.87rem] px-2 font-bold  py-[6px]  rounded-lg  bg-green-500 text-white  items-center justify-center">
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSocialLinkCard;
