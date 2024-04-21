import React from 'react';
import BehanceLogo from '../assets/behance.png';
import DribbbleLogo from '../assets/dribbble.png';
import FigmaLogo from '../assets/figma.png';
import GithubLogo from '../assets/github.png';
import InstaLogo from '../assets/insta.png';
import TwitterLogo from '../assets/twitter.png';
import LinkedinLogo from '../assets/linkedin.png';
import Photo from '../assets/photo1.png';
import RandomMovingImage from '@/components/RandomMovingImage';

const SignupAnimation = () => {
  return (
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
  );
};

export default SignupAnimation;
