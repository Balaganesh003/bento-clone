import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import BehanceLogo from '../assets/behance.png';
import DribbbleLogo from '../assets/dribbble.png';
import FigmaLogo from '../assets/figma.png';
import GithubLogo from '../assets/github.png';
import InstaLogo from '../assets/insta.png';
import TwitterLogo from '../assets/twitter.png';
import LinkedinLogo from '../assets/linkedin.png';
import Photo from '../assets/photo1.png';
import RandomMovingImage from '@/components/RandomMovingImage';

const Signup = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const randomSeedX = Math.random();
    const randomSeedY = Math.random();

    document.documentElement.style.setProperty('--random-seed-x', randomSeedX);
    document.documentElement.style.setProperty('--random-seed-y', randomSeedY);
  }, []);

  return (
    <div className="flex lg:flex-row p-7 sm:p-16 max-w-[1728px] w-full min-h-screen  mx-auto">
      <div className="flex max-w-[675px] flex-1 flex-col items-center justify-center ">
        <div className="flex flex-col h-fit max-w-[448px]">
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
                <button className="hover:shadow-lg transition-all duration-150 text-[0.875rem] leading-[1.25rem] font-bold text-white bg-black hover:bg-black/80 h-full w-full py-2 px-[0.625rem] rounded-xl">
                  Grab my Link
                </button>
              )}
            </div>
          </form>
          <Link
            href="/login"
            className="text-[#6c6c6c] mt-[2rem] text-[12px] leading-4">
            or Log in
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 z-10  max-w-[675px] flex-col items-center justify-center  w-full h-full">
        <div className="grid aspect-square max-h-[640px] max-w-[640px] gap-8 grid-cols-4 grid-rows-4 p-8 signup">
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

export default Signup;
