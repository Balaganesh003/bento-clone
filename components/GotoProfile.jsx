import React from 'react';
import completed from '@/assets/completed.svg';
import Image from 'next/image';

const GotoProfile = ({ setIsFirst }) => {
  return (
    <div className="px-3 xl:p-0 flex-grow-0  max-w-[23.5rem]  z-10">
      <div className="w-12 h-12">
        <Image src={completed} alt="completed" width={100} height={100} />
      </div>
      <div className="text-[32px] leading-[40px] mt-[1.5rem] mb-[2.5rem] font-semibold">
        Looks Great!
      </div>
      <div className="text-2xl break-words">
        You can keep customizing your page and then share with world!
      </div>
      <button
        onClick={() => setIsFirst(false)}
        className="mt-[2.5rem] py-[0.5rem] px-[0.625rem] text-[0.875rem] font-bold leading-5 h-[57px] xl:h-[44px] w-[190px] bg-black hover:bg-black/[85%] transition-all duration-150 text-white rounded-lg">
        Go to Profile
      </button>
    </div>
  );
};

export default GotoProfile;
