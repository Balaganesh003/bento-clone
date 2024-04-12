import React from 'react';

import RandomMovingImage from '@/components/RandomMovingImage';
import BehanceLogo from '../assets/behance.png';
import DribbbleLogo from '../assets/dribbble.png';
import FigmaLogo from '../assets/figma.png';
import GithubLogo from '../assets/github.png';
import InstaLogo from '../assets/insta.png';
import TwitterLogo from '../assets/twitter.png';
import LinkedinLogo from '../assets/linkedin.png';
import Photo from '../assets/photo1.png';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="flex lg:flex-row p-7 sm:p-16 max-w-[1728px] w-full min-h-screen  mx-auto">
      <div className="flex max-w-[675px] flex-1 flex-col items-center justify-center ">
        <LoginForm />
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
