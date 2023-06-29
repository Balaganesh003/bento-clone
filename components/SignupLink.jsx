import React from 'react';
import Link from 'next/link';

const SignupLink = ({ name, setName, nextPanel }) => {
  return (
    <>
      <h1 className="font-bold text-[32px] leading-[40px]">
        First, claim your unique link
      </h1>
      <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
        The good ones are still available!
      </p>
      <form className="w-full">
        <div className="mt-[5rem] rounded-xl w-full ">
          <div className="flex items-center w-full">
            <div className="pl-3 py-4 sm:py-3 rounded-l-xl h-full text-[#6c6c6c] text-[16px] sm:text-[14px] leading-5 bg-[#f7f7f7] -mr-[0.625rem] z-[2]">
              bento.me/
            </div>
            <div className="w-full">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="yourname"
                type="text"
                className="w-full p-4 sm:p-3 rounded-r-xl focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c] bg-[#f7f7f7]"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 h-[58px] sm:h-[48px]">
          {name && (
            <button
              onClick={nextPanel}
              className="hover:shadow-lg transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white bg-black hover:bg-black/80 h-full w-full py-2 px-[0.625rem] rounded-xl">
              Grab my Link
            </button>
          )}
        </div>
      </form>
      <Link
        href="/login"
        className="text-[#6c6c6c] mt-[2rem] inline-block text-[12px] leading-4">
        or Log in
      </Link>
    </>
  );
};

export default SignupLink;
