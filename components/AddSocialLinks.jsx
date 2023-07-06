import React, { useEffect, useState } from 'react';
import AddSocialLinkCard from '@/components/AddSocialLinkCard';
import { profileActions } from '@/store/profile-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import BuyMeCoffee from '@/assets/coffee.svg';
import Twitter from '@/assets/twitter.svg';
import Instagram from '@/assets/instagram.svg';
import Github from '@/assets/github.svg';
import Linkedin from '@/assets/linkedin.svg';
import Dribbble from '@/assets/dribble.svg';

const AddSocialLinks = () => {
  const dispatch = useDispatch();

  const { profileDetails } = useSelector((state) => state.profile);

  const [socialLinks, setSocialLinks] = useState([
    {
      id: '1',
      type: 'socialLink',
      baseUrl: 'twitter',
      userName: '',
      logo: Twitter,
      bgColor: 'bg-[#55ACEE]',
      isAdded: false,
    },
    {
      id: '2',
      type: 'socialLink',

      baseUrl: 'instagram',
      userName: '',
      logo: Instagram,
      bgColor: 'bg-[#CE3B9F]',
      isAdded: false,
    },
    {
      id: '3',
      baseUrl: 'github',
      type: 'socialLink',

      userName: '',
      logo: Github,
      bgColor: 'bg-[#181717]',
      isAdded: false,
    },
    {
      id: '4',
      baseUrl: 'linkedin',
      type: 'socialLink',

      userName: '',
      logo: Linkedin,
      bgColor: 'bg-[#007EBB]',
      isAdded: false,
    },
    {
      id: '5',
      baseUrl: 'dribbble',
      type: 'socialLink',
      userName: '',
      logo: Dribbble,
      bgColor: 'bg-[#D15584]',
      isAdded: false,
    },
    {
      id: '6',
      baseUrl: 'buymeacoffee',
      type: 'socialLink',
      userName: '',
      logo: BuyMeCoffee,
      bgColor: 'bg-[#FFDD06]',
      isAdded: false,
    },
  ]);

  const handelUpdateLink = (baseUrl, value) => {
    socialLinks.find((link, i) => {
      if (link.baseUrl === baseUrl) {
        setSocialLinks((prev) => {
          const newLinks = [...prev];
          newLinks[i] = value;
          return newLinks;
        });
      }
    });

    dispatch(
      profileActions.addSocialLinks({
        ...value,
      })
    );
  };

  useEffect(() => {
    console.log(socialLinks);
  }, [socialLinks]);

  return (
    <div className="px-3 xl:p-0   max-w-[23.5rem]  xs:w-[23.5rem]  z-10">
      <h1 className="font-bold  text-2xl mb-5 xl:mb-10 break-words">
        Now, let&apos;s add your social media accounts to your page.
      </h1>
      <div className="relative rounded-lg">
        <div className="w-full max-h-[calc(100vh-20.5rem)] pb-8 scrollbar-hide  overflow-y-scroll z-0 relative ">
          {socialLinks.map((link, index) => (
            <AddSocialLinkCard
              key={index}
              link={link}
              handelUpdateLink={handelUpdateLink}
              index={index}
              logo={link.logo}
              bgColor={link.bgColor}
              isAdded={link.isAdded}
            />
          ))}
        </div>
        <div className="bg-white/90  z-[1000] w-full h-[3rem] -mt-[1rem] absolute bottom-[-1rem]  blur"></div>
      </div>
    </div>
  );
};

export default AddSocialLinks;
