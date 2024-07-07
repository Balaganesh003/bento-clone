import { axiosWithToken } from '@/utils/axiosjwt';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';

const NameBio = ({ USERNAME, isLaptop }) => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { name, bio } = useSelector((state) => state.profile);
  const { isSameUser } = useSelector((state) => state.ui);

  const [isNamePlaceholder, setIsNamePlaceholder] = useState(!name);
  const [isBioPlaceholder, setIsBioPlaceholder] = useState(!bio);

  const handleNameBlur = async () => {
    const newName = nameRef.current.innerText.trim();
    if (newName === '') {
      setIsNamePlaceholder(true);
    }
    dispatch(profileActions.updateDisplayName(newName));
    await updateProfile('displayname', newName);
  };

  const handleBioBlur = async () => {
    const newBio = bioRef.current.innerText.trim();
    if (newBio === '') {
      setIsBioPlaceholder(true);
    }
    dispatch(profileActions.updateBio(newBio));
    await updateProfile('bio', newBio);
  };

  const updateProfile = async (field, value) => {
    try {
      const response = await axiosWithToken.put(
        `${API_URL}/profile/${field}/${USERNAME}`,
        {
          [field]: value,
        }
      );
      console.log(`Updated ${field}:`, response.data);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  useEffect(() => {
    setIsNamePlaceholder(!name);
    setIsBioPlaceholder(!bio);
  }, [name, bio]);

  return (
    <div>
      {isSameUser ? (
        <div
          onFocus={() => setIsNamePlaceholder(false)}
          onBlur={handleNameBlur}
          ref={nameRef}
          contentEditable
          suppressContentEditableWarning
          className={`relative tracking-[-2px] text-[32px] ${
            isLaptop && 'xl:text-[44px]'
          } font-bold focus:outline-none leading-[120%] text-[#565656]`}>
          {isNamePlaceholder ? 'Your Name' : name}
        </div>
      ) : (
        <div
          className={`relative tracking-[-2px] text-[32px] ${
            isLaptop && 'xl:text-[44px]'
          } font-bold focus:outline-none leading-[120%] text-[#565656] ${
            name.length === 0 && 'hidden'
          }`}>
          {isNamePlaceholder ? 'Your Name' : name}
        </div>
      )}

      {isSameUser ? (
        <div
          onFocus={() => setIsBioPlaceholder(false)}
          onBlur={handleBioBlur}
          ref={bioRef}
          contentEditable
          suppressContentEditableWarning
          className={`mt-3 ${
            isLaptop && 'xl:text-xl'
          } focus:outline-none relative text-[#565656]`}>
          {isBioPlaceholder ? 'Your Bio' : bio}
        </div>
      ) : (
        <div
          className={`mt-3 ${
            isLaptop && 'xl:text-xl'
          } focus:outline-none relative text-[#565656] ${
            bio.length === 0 && 'hidden'
          } `}>
          {isBioPlaceholder ? 'Your Bio' : bio}
        </div>
      )}
    </div>
  );
};

export default NameBio;
