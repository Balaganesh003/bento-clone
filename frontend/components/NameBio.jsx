import React from 'react';
import { useRef, useState } from 'react';

const NameBio = ({ yourname, yourbio }) => {
  const nameRef = useRef();
  const bioRef = useRef();

  const [name, setName] = useState(yourname);
  const [isNamePlaceholder, setIsNamePlaceholder] = useState(true);

  const [bio, setBio] = useState(yourbio);
  const [isBioPlaceholder, setIsBioPlaceholder] = useState(true);

  const handleNamePlaceholder = () => {
    if (nameRef?.current?.innerText.length == 0) {
      setName(nameRef.current.innerText);
      setIsNamePlaceholder(true);
    }
  };

  const handleBioPlaceholder = () => {
    if (bioRef?.current?.innerText.length == 0) {
      setBio(bioRef.current.innerText);
      setIsBioPlaceholder(true);
    }
  };

  return (
    <div>
      <div
        onFocus={() => setIsNamePlaceholder(false)}
        onBlur={handleNamePlaceholder}
        ref={nameRef}
        contentEditable="true"
        suppressContentEditableWarning={true}
        translate="no"
        className="relative tracking-[-2px] text-[32px] xl:text-[44px] font-bold  focus:outline-none leading-[120%] text-[#565656]">
        {name}
        <div
          onClick={() => setIsNamePlaceholder(false)}
          contentEditable="false"
          suppressContentEditableWarning={true}
          className={` ${
            isNamePlaceholder ? 'block absolute top-0 left-0' : 'hidden'
          }  text-[32px] xl:text-[44px] font-bold  leading-[120%] text-[#565656]`}>
          Your Name
        </div>
      </div>
      <div
        onFocus={() => setIsBioPlaceholder(false)}
        ref={bioRef}
        onBlur={handleBioPlaceholder}
        contentEditable="true"
        suppressContentEditableWarning={true}
        translate="no"
        className="mt-3   xl:text-xl  focus:outline-none  relative  text-[#565656] ">
        {bio}
        <div
          contentEditable="false"
          suppressContentEditableWarning={true}
          onClick={() => setIsBioPlaceholder(false)}
          className={`${
            isBioPlaceholder ? 'block absolute top-0 left-0' : 'hidden'
          }  xl:text-xl  focus:outline-none   text-[#565656]`}>
          Your Bio
        </div>
      </div>
    </div>
  );
};

export default NameBio;
