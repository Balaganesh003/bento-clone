import React from 'react';
import Image from 'next/image';
import crosslogo from '@/assets/whitecloselogo.svg';

// Logos

import BuyMeCoffee from '@/assets/coffee.svg';
import Twitter from '@/assets/twitter.svg';
import Instagram from '@/assets/instagram.svg';
import Github from '@/assets/github.svg';
import Linkedin from '@/assets/linkedin.svg';
import Dribbble from '@/assets/dribble.svg';
// import Behance from '@/assets/behance.svg';
// import Figma from '@/assets/figma.svg';
// import Youtube from '@/assets/youtube.svg';
// import Twitch from '@/assets/twitch.svg';

const popularLinks = [
  {
    url: 'twitter',
    logo: Twitter,
  },

  {
    url: 'instagram',
    logo: Instagram,
  },

  {
    url: 'linkedin',
    logo: Linkedin,
  },

  {
    url: 'github',
    logo: Github,
  },

  {
    url: 'dribbble',
    logo: Dribbble,
  },
  {
    url: 'buymeacoffee',
    logo: BuyMeCoffee,
  },
];

const AddSocialLinkCard = ({ link }) => {
  return (
    <div className="flex items-center gap-3 mt-3 w-fit z-0">
      <Image
        src={
          popularLinks.find((item) => item.url == link.baseUrl)?.logo ||
          `https://www.google.com/s2/favicons?domain=${link.baseUrl}&sz=${256}`
        }
        width={44}
        height={44}
        className="w-[2.75rem] h-[2.75rem] rounded-lg"
        alt="logo"
      />

      <div
        className={`flex h-[44px] w-[280px] items-center gap-1 ${
          link.baseUrl == 'twitter' && 'bg-[#55ACEE]'
        } ${link.baseUrl == 'instagram' && 'bg-[#CE3B9F]'} ${
          link.baseUrl == 'linkedin' && 'bg-[#007EBB]'
        } ${link.baseUrl == 'github' && 'bg-[#000]'} ${
          link.baseUrl == 'buymeacoffee' && 'bg-[#FFDD06]'
        } ${
          link.baseUrl == 'dribbble' && 'bg-[#D15584]'
        } rounded-lg pl-3  text-white  flex z-[50]`}>
        {link.userName.length > 0 ? (
          <div className="w-[14px] h-[14px] mt-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM10.7071 5.70711C11.0976 5.31658 11.0976 4.68342 10.7071 4.29289C10.3166 3.90237 9.68342 3.90237 9.29289 4.29289L6 7.58579L4.70711 6.29289C4.31658 5.90237 3.68342 5.90237 3.29289 6.29289C2.90237 6.68342 2.90237 7.31658 3.29289 7.70711L5.29289 9.70711C5.68342 10.0976 6.31658 10.0976 6.70711 9.70711L10.7071 5.70711Z"
                fill="#fff"></path>
            </svg>
          </div>
        ) : (
          <span className="text-[16px] ">@</span>
        )}

        <div
          contentEditable="true"
          className="flex-1 whitespace-nowrap focus:outline-none font-medium  text-[20px] text-ellipsis  focus:text-clip truncate focus:overflow-y-clip focus:text-start leading-6 w-[5rem]">
          {link?.userName}
        </div>
        <div className="flex-shrink-0 w-fit mr-2">
          {link.userName.length > 0 ? (
            <button className="flex items-center  hover:bg-black/10 rounded-full justify-center p-2">
              <Image src={crosslogo} width={14} height={14} alt="cross logo" />
            </button>
          ) : (
            <button className="text-[0.87rem] px-2 font-bold  py-[6px]  rounded-lg  bg-green-500 text-white  items-center justify-center">
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSocialLinkCard;
