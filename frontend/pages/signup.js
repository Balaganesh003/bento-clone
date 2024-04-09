import { useState } from 'react';
import BehanceLogo from '../assets/behance.png';
import DribbbleLogo from '../assets/dribbble.png';
import FigmaLogo from '../assets/figma.png';
import GithubLogo from '../assets/github.png';
import InstaLogo from '../assets/insta.png';
import TwitterLogo from '../assets/twitter.png';
import LinkedinLogo from '../assets/linkedin.png';
import Photo from '../assets/photo1.png';
import RandomMovingImage from '@/components/RandomMovingImage';
import SignUpMail from '@/components/SignUpMail';
import SignupLink from '@/components/SignupLink';
import { motion, AnimatePresence } from 'framer-motion';

const SignUp = () => {
  const [name1, setName1] = useState('');

  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextPanel = (e) => {
    e.preventDefault();

    if (index < 1) {
      setIndex(index + 1);
      setDirection(1);
    }
  };

  const prevPanel = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDirection(-1);
    }
  };

  return (
    <div className="flex lg:flex-row p-7 sm:p-16 max-w-[1728px] w-full min-h-screen  mx-auto">
      <div className="flex max-w-[675px] flex-1 flex-col items-center justify-center ">
        <div className="flex flex-col h-fit max-w-[448px]">
          {/* Slides */}
          <AnimatePresence initial={false} custom={index} mode={`wait`}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              {index === 1 && (
                <SignUpMail
                  email={email1}
                  name={name1}
                  password={password1}
                  setEmail={setEmail1}
                  setPassword={setPassword1}
                  showPassword={showPassword1}
                  setShowPassword={setShowPassword1}
                  prevPanel={prevPanel}
                />
              )}
              {index === 0 && (
                <SignupLink
                  nextPanel={nextPanel}
                  name={name1}
                  setName={setName1}
                />
              )}
            </motion.div>
          </AnimatePresence>
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

export default SignUp;
