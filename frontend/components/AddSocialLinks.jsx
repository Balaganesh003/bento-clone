import React, { useEffect } from 'react';
import AddSocialLinkCard from '@/components/AddSocialLinkCard';
import { useSelector } from 'react-redux';

const AddSocialLinks = ({ USERNAME }) => {
  const { socialLinks } = useSelector((state) => state.profile);

  useEffect(() => {}, [socialLinks]);

  return (
    <div className="px-3 xl:p-0 flex-grow-0  max-w-[23.5rem]  xs:w-[23.5rem]  z-10">
      <h1 className="font-bold  text-2xl mb-5 xl:mb-10 break-words">
        Now, let&apos;s add your social media accounts to your page.
      </h1>
      <div className="relative rounded-lg">
        <div className="w-full max-h-[calc(100vh-20.5rem)] pb-8 scrollbar-hide  overflow-y-scroll z-0 relative ">
          {socialLinks.map((link, index) => (
            <AddSocialLinkCard
              key={index}
              link={link}
              index={index}
              logo={link.logo}
              bgColor={link.bgColor}
              isAdded={link.isAdded}
              USERNAME={USERNAME}
            />
          ))}
        </div>
        <div className="bg-white/90  z-[1000] w-full h-[3rem] -mt-[1rem] absolute bottom-[-1rem]  blur"></div>
      </div>
    </div>
  );
};

export default AddSocialLinks;
