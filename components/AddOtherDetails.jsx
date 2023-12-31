import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import onboardingImage from '@/assets/onboarding-step2.svg';
import Image from 'next/image';

const AddOtherDetails = ({ prevPanel }) => {
  return (
    <div className="px-3 xl:p-0 flex-grow-0  max-w-[23.5rem]  xs:w-[23.5rem]  z-10">
      <div onClick={prevPanel}>
        <FaArrowLeftLong className="text-gray-900 text-xl cursor-pointer" />
      </div>
      <div>
        <div className="text-2xl mt-[1.5rem] mb-[2.5rem] font-semibold ">
          You can also add photos, video, maps, and notes.
        </div>
        <div>
          <Image src={onboardingImage} alt="onboarding" />
        </div>
      </div>
    </div>
  );
};

export default AddOtherDetails;
