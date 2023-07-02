import React from 'react';
import completed from '@/assets/completed.svg';
import Image from 'next/image';

const GotoProfile = () => {
  return (
    <div className="">
      <div className="w-12 h-12">
        <Image src={completed} alt="completed" width={100} height={100} />
      </div>
      <div className="text-[32px] leading-[40px] mt-[1.5rem] mb-[2.5rem] font-semibold">
        Looks Great!
      </div>
      <div className="text-2xl break-words">
        You can keep customizing your page and then share with world!
      </div>
      <button className="mt-[2.5rem] py-[0.5rem] px-[0.625rem] text-[0.875rem] font-bold leading-5 h-[57px] xl:h-[44px] w-[190px] bg-black text-white rounded-lg">
        Go to Profile
      </button>
    </div>
  );
};

export default GotoProfile;
