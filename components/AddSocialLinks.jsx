import React from 'react';
import AddSocialLinkCard from '@/components/AddSocialLinkCard';

const socialLinks = [
  {
    baseUrl: 'twitter',
    userName: '@balaganeshhhhhhhhhhhhhhhhhhhh',
  },
  {
    baseUrl: 'instagram',
    userName: '',
  },
  {
    baseUrl: 'github',
    userName: '@balaganesh003',
  },
  {
    baseUrl: 'linkedin',
    userName: '',
  },
  {
    baseUrl: 'dribbble',
    userName: '',
  },
  {
    baseUrl: 'buymeacoffee',
    userName: '',
  },
];

const AddSocialLinks = () => {
  return (
    <div className="px-3 xl:p-0   max-w-[23.5rem]  xs:w-[23.5rem]  z-10">
      <h1 className="font-bold  text-2xl mb-5 xl:mb-10 break-words">
        Now, let’s add your social media accounts to your page.
      </h1>
      <div className="relative rounded-lg">
        <div className="w-full max-h-[calc(100vh-20.5rem)] pb-8 scrollbar-hide  overflow-y-scroll z-0 relative ">
          {socialLinks.map((link, index) => (
            <AddSocialLinkCard key={index} link={link} />
          ))}
        </div>
        <div className="bg-white/90  z-[1000] w-full h-[3rem] -mt-[1rem] absolute bottom-[-1rem]  blur"></div>
      </div>
    </div>
  );
};

export default AddSocialLinks;
