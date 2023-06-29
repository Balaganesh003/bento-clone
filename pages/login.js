import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import RandomMovingImage from '@/components/RandomMovingImage';
import BehanceLogo from '../assets/behance.png';
import DribbbleLogo from '../assets/dribbble.png';
import FigmaLogo from '../assets/figma.png';
import GithubLogo from '../assets/github.png';
import InstaLogo from '../assets/insta.png';
import TwitterLogo from '../assets/twitter.png';
import LinkedinLogo from '../assets/linkedin.png';
import Photo from '../assets/photo1.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="flex lg:flex-row p-7 sm:p-16 max-w-[1728px] w-full min-h-screen  mx-auto">
      <div className="flex max-w-[675px] flex-1 flex-col items-center justify-center ">
        <div className="flex flex-col h-fit max-w-[448px] w-full">
          <h1 className="font-bold text-[32px] leading-[40px] mt-2">
            Log in to your Bento
          </h1>
          <p className="mt-[1rem] font-normal text-[20px] leading-9 text-[#6c6c6c]">
            Good to have you back!
          </p>
          <form className="w-full">
            <div className="mt-[5rem]  rounded-xl w-full ">
              <div className="flex flex-col sm:flex-row items-center w-full gap-3">
                <div className="w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full p-4 sm:p-3 bg-[#f7f7f7] rounded-lg focus:outline-none text-[16px] sm:text-[14px]  leading-5 text-[#6c6c6c]"
                  />
                </div>
                <div className="w-full flex bg-[#f7f7f7] rounded-r-lg pr-[0.5rem] items-center rounded-l-lg">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full  p-4 sm:p-3 rounded-r-lg focus:outline-none text-[16px] sm:text-[14px] bg-[#f7f7f7]  leading-5 text-[#6c6c6c] rounded-l-md"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="rounded bg-white shadow px-[15px] sm:px-3 py-[9px] sm:py-[5px] text-[0.75rem] font-bold leading-[1rem] w-[60px] h-fit cursor-pointer">
                    Show
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 ml-[2px] text-[13px] leading-[1rem] underline text-[#768CFF] ">
              Reset Password
            </div>
            <div className="ml-[0.125rem] h-[64px] flex items-center text-sm leading-6 font-bold">
              OR
            </div>
            <div className=" h-[58px] sm:h-[45px]">
              {email ? (
                <button className="hover:shadow-lg transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white bg-black hover:bg-black/80 h-full w-full py-2 px-[0.625rem] rounded-xl">
                  Log in
                </button>
              ) : (
                <button className="hover:shadow-lg transition-all duration-150 text-[14px] leading-[1.25rem] font-bold text-white bg-[#1D9BF0] h-full w-full py-2 px-[0.625rem] rounded-xl flex items-center justify-center">
                  <FaGoogle className="inline-block mr-2 text-[16px]" />
                  Sign in with Google
                </button>
              )}
            </div>
          </form>
          <Link
            href="/signup"
            className="text-[#6c6c6c] mt-8 ml-[2px] text-[12px] leading-4">
            or sign up
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 z-10  max-w-[675px] flex-col items-center justify-center  w-full h-full">
        <div className="grid aspect-square max-h-[640px] max-w-[640px] gap-8 grid-cols-4 grid-rows-4 p-8">
          <RandomMovingImage rows={2} cols={2} imageSrc={Photo} />
          <RandomMovingImage rows={1} cols={1} imageSrc={BehanceLogo} />
          <RandomMovingImage rows={1} cols={1} imageSrc={LinkedinLogo} />
          <RandomMovingImage rows={2} cols={2} imageSrc={DribbbleLogo} />
          <RandomMovingImage rows={1} cols={1} imageSrc={FigmaLogo} />
          <RandomMovingImage rows={2} cols={1} imageSrc={InstaLogo} />
          <RandomMovingImage rows={1} cols={1} imageSrc={TwitterLogo} />
          <RandomMovingImage rows={1} cols={2} imageSrc={GithubLogo} />
        </div>
      </div>
    </div>
  );
};

export default Login;
