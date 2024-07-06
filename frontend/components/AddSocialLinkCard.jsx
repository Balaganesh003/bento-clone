import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import crosslogo from '@/assets/whitecloselogo.svg';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import { axiosWithToken } from '@/utils/axiosjwt';
import { defaultSocialLinks } from '@/constant';
import toast from 'react-hot-toast';

const AddSocialLinkCard = ({
  link,
  bgColor,
  logo,
  isAdded,
  isLogo,
  USERNAME,
}) => {
  const dispatch = useDispatch();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [linkValue, setLinkValue] = useState(link.userName);

  const handelChange = (e) => {
    setLinkValue(e.target.value);
  };

  const addLink = async () => {
    const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
      ...link,
      userName: linkValue,
      width: 1,
      height: 1,
    });

    dispatch(
      profileActions.addItem({
        ...res.data.addedObject,
        isAdded: true,
      })
    );

    dispatch(
      profileActions.updateSocialLinks({
        ...res.data.addedObject,
        isAdded: true,
      })
    );
    setLinkValue('');
  };

  const removeLink = () => {
    dispatch(profileActions.removeItem(link.id));

    const res = axiosWithToken.delete(
      `http://localhost:5000/profile/${USERNAME}/${link.id}`
    );

    console.log(res.data);

    dispatch(
      profileActions.updateSocialLinks({
        ...link,
        userName: '',
        isAdded: false,
      })
    );
    setLinkValue('');
  };

  const handelLink = async (paste) => {
    const url = new URL(paste);

    const { hostname } = url;
    const path = url.pathname.split('/').filter(Boolean);
    if (path.length === 0) return;

    const userName = path[path.length - 1];

    const hostnameParts = hostname.split('.');
    const baseUrlKey = hostnameParts.includes('www')
      ? hostnameParts[1]
      : hostnameParts[0];

    const baseUrlData = defaultSocialLinks[baseUrlKey];

    if (link.id !== baseUrlData.baseUrl) {
      toast.error('Invalid link provided!');
      return;
    }

    const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
      ...link,
      userName: userName,
      isAdded: true,
      height: 1,
      width: 1,
    });

    dispatch(
      profileActions.updateSocialLinks({
        ...res.data.addedObject,
        isAdded: true,
      })
    );

    dispatch(
      profileActions.addItem({
        ...res.data.addedObject,
        isAdded: true,
      })
    );
    setLinkValue('');
  };

  const handelOnPaste = async (e) => {
    if (e.clipboardData?.files?.length > 0) {
      const paste = e.clipboardData.getData('text');
      if (paste.includes('http') || paste.includes('https')) {
        console.log(paste);
        handelLink(paste);
      }
    } else {
      const paste = await navigator.clipboard.readText();
      if (paste.includes('http') || paste.includes('https')) {
        console.log(paste);
        handelLink(paste);
      }
    }
  };

  useEffect(() => {}, [link, linkValue, isAdded]);

  return (
    <div className="flex items-center gap-3 mt-3 w-fit z-0 group">
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
        style={{ backgroundColor: isAdded && bgColor }}
        className={`flex h-[44px] w-[280px] items-center gap-1 ${
          isAdded ? 'border-transparent' : 'border'
        }  rounded-lg pl-3  text-white  flex z-[50]`}>
        {isAdded ? (
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
          <span
            className={`text-[16px]  ${
              isAdded ? 'text-white' : 'text-black'
            } `}>
            @
          </span>
        )}

        <input
          type="text"
          readOnly={isAdded}
          value={`${isAdded ? `@${link.userName}` : linkValue}`}
          onPaste={handelOnPaste}
          onChange={handelChange}
          contentEditable="true"
          suppressContentEditableWarning={true}
          style={{ backgroundColor: isAdded && bgColor }}
          className={`flex-1   ${
            isAdded ? 'text-white' : 'text-black'
          }  whitespace-nowrap focus:outline-none font-medium  text-[20px] text-ellipsis  focus:text-clip truncate focus:overflow-y-clip focus:text-start leading-6 w-[5rem]`}
        />

        <div className="flex-shrink-0 w-fit mr-2">
          {link.userName?.length > 0 && isAdded && (
            <button
              onClick={removeLink}
              className="flex items-center  hover:bg-black/10 rounded-full justify-center p-2">
              <Image src={crosslogo} width={14} height={14} alt="cross logo" />
            </button>
          )}

          {linkValue?.length > 0 && !isAdded && (
            <button
              onClick={addLink}
              className="text-[0.87rem] px-2 font-bold  py-[6px]  rounded-lg  bg-green-500 text-white  items-center justify-center">
              Add
            </button>
          )}
          {!isAdded && linkValue?.length == 0 && (
            <button
              style={{ zIndex: 20000 }}
              onClick={handelOnPaste}
              className="bg-[#fafafa] hidden shadow-sm border group-hover:block z-50 text-black px-3 py-1 rounded-lg hover:bg-[#f7f7f7] transition-colors duration-150 h-fit text-[14px]">
              Paste
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSocialLinkCard;
