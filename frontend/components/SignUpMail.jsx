import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import axios from 'axios';

export default function SignUpMail({
  email,
  setEmail,
  password,
  setPassword,
  name,
  showPassword,
  setShowPassword,
  prevPanel,
  handelSignUp,
}) {
  const handelGoogleSignIn = () => {
    window.open(`http://${NEXT_PUBLIC_API_URL}/auth/google/`, '_self');
  };

  return (
    <React.Fragment>
      <HiArrowNarrowLeft
        onClick={prevPanel}
        className="text-[28px] cursor-pointer text-[#6c6c6c] "
      />
      <p className="mt-[1rem] font-normal text-[16px] text-[#6c6c6c]">
        <span>bento.me/</span>
        <span>{name}</span>
        <span> is yours!</span>
      </p>
      <h1 className="font-bold text-[32px] leading-[40px] mt-2">
        Now, Create your account
      </h1>
      <div className="w-full">
        <div className="mt-[5rem] rounded-xl w-full">
          <div className="flex flex-col sm:flex-row items-center w-full gap-3">
            <div className="w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full p-4 sm:p-3 bg-[#f7f7f7] rounded-lg focus:outline-none text-[16px] sm:text-[14px] leading-5 text-[#6c6c6c]"
              />
            </div>
            <div className="w-full flex bg-[#f7f7f7] rounded-r-lg pr-[0.5rem] items-center rounded-l-lg">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-4 sm:p-3 rounded-r-lg focus:outline-none text-[16px] sm:text-[14px] bg-[#f7f7f7] leading-5 text-[#6c6c6c] rounded-l-md"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="rounded bg-white shadow px-[15px] sm:px-3 py-[9px] sm:py-[5px] text-[0.75rem] font-bold leading-[1rem] w-[60px] h-fit cursor-pointer">
                Show
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[0.125rem] h-[64px] flex items-center text-sm leading-6 font-bold">
          OR
        </div>
        <div className="h-[58px] sm:h-[45px]">
          {email ? (
            <button
              onClick={handelSignUp}
              className="hover:shadow-lg transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white bg-black hover:bg-black/80 h-full w-full py-2 px-[0.625rem] rounded-xl">
              Create account
            </button>
          ) : (
            <button
              onClick={handelGoogleSignIn}
              className="hover:shadow-lg transition-all duration-150 text-[14px] leading-[1.25rem] font-bold text-white bg-[#1D9BF0] h-full w-full py-2 px-[0.625rem] rounded-xl flex items-center justify-center">
              <FaGoogle className="inline-block mr-2 text-[16px]" />
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
