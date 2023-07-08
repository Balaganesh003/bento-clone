import React, { useState, useEffect } from 'react';
import SpinnerLogo from '@/assets/spinner.gif';
import Image from 'next/image';
import LogoCard from '@/components/LogoCard';
import DriveLogo from '@/assets/users/LogoGoogleDocs.svg';
import GoogleSlidesLogo from '@/assets/users/LogoGoogleSlides.svg';
import LogoConfluence from '@/assets/users/LogoConfluence.svg';
import LogoGmail from '@/assets/users/LogoGmail.svg';
import LogoAtlassian from '@/assets/users/LogoAtlassian.svg';
import LogoTeams from '@/assets/users/LogoTeams.svg';
import LogoSlack from '@/assets/users/LogoSlack.svg';
import LogoDiscord from '@/assets/users/LogoDiscord.svg';
import LogoFigma from '@/assets/users/LogoFigma.svg';
import LogoNotion from '@/assets/users/LogoNotion.svg';
import LogoGoogleSheets from '@/assets/users/LogoGoogleSheets.svg';
import LogoJira from '@/assets/users/LogoJira.svg';
import LogoClickup from '@/assets/users/LogoClickup.svg';
import LogoGitlab from '@/assets/users/LogoGitlab.svg';
import LogoGithub from '@/assets/users/LogoGithub.svg';
import LogoDocs from '@/assets/users/LogoDocs.svg';
import LogoTrello from '@/assets/users/LogoTrello.svg';
import LogoLinear from '@/assets/users/LogoLinear.svg';
import LogoZoom from '@/assets/users/LogoZoom.svg';
import logoGoogleCalendar from '@/assets/users/logoGoogleCalendar.svg';
import LogoAsana from '@/assets/users/LogoAsana.svg';
import logoHangout from '@/assets/users/logoHangout.svg';

const logoData1 = [
  { id: 6, logo: LogoTeams },
  { id: 0, logo: GoogleSlidesLogo },
  { id: 1, logo: DriveLogo },
  { id: 2, logo: LogoConfluence },
  { id: 3, logo: LogoGmail },
  { id: 4, logo: LogoAtlassian },
  { id: 5, logo: LogoTeams },
  { id: 6, logo: GoogleSlidesLogo },
  { id: 7, logo: DriveLogo },
  { id: 8, logo: LogoConfluence },
];

const logoData2 = [
  { id: 11, logo: logoHangout },
  { id: 10, logo: logoGoogleCalendar },
  { id: 0, logo: LogoSlack },
  { id: 1, logo: LogoDiscord },
  { id: 2, logo: LogoFigma },
  { id: 3, logo: LogoNotion },
  { id: 4, logo: LogoGoogleSheets },
  { id: 5, logo: LogoJira },
  { id: 6, logo: LogoClickup },
  { id: 7, logo: LogoGitlab },
  { id: 9, logo: LogoAsana },
];

const logoData3 = [
  {
    id: 10,
    logo: LogoTrello,
  },
  {
    id: 0,
    logo: LogoGithub,
  },

  {
    id: 1,
    logo: LogoDocs,
  },
  {
    id: 2,
    logo: LogoTrello,
  },
  {
    id: 3,
    logo: LogoLinear,
  },
  {
    id: 4,
    logo: LogoZoom,
  },
  {
    id: 5,
    logo: LogoAtlassian,
  },
  {
    id: 111,
    logo: LogoGithub,
  },

  {
    id: 222,
    logo: LogoDocs,
  },
  {
    id: 22,
    logo: LogoTrello,
  },
  {
    id: 33,
    logo: LogoLinear,
  },
];

const data = [
  {
    id: 1,
    name: 'Organisations',
    value: '200K+',
    basis: 'worldwide',
  },
  {
    id: 2,
    name: 'Employees',
    value: '1M+',
    basis: 'worldwide',
  },
  {
    id: 3,
    name: 'Research & Development',
    value: '$30M+',
    basis: 'per year',
  },
  {
    id: 4,
    name: 'Cut work admin',
    value: '42%',
    basis: 'average time saved',
  },
];

const User = () => {
  const [active, setActive] = useState(1);

  const [scrollPosition, setScrollPosition] = useState(420);

  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position + 420);
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    setWidth(currentWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handelAutoChange = () => {
    if (active === data.length) {
      setActive(1);
    } else {
      setActive(active + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handelAutoChange();
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <>
      <section className="bg-[#0a0f20] py-[5rem]">
        <div className="max-w-[1130px] mx-auto px-[2.4rem]">
          <div className="grid grid-cols-1 md:grid-cols-1/2 gap-[2.4rem] overflow-hidden ">
            <div className="flex flex-col ">
              <h1 className="uppercase mb-[1.2rem] ">
                <span className="bg-[url('../assets/textbg.jpg')] bg-clip-text  text-transparent text-[2rem] xh:text-[2.4rem] xs:text-[2.85rem]  xv:text-[3.5rem] xr:text-[3.8rem] sm:text-[4.05rem] font-black leading-[0.9] tracking-[-0.01em] whitespace-nowrap object-cover bg-[50%]">
                  Time-Saving
                </span>
                <span className="text-[2rem] xh:text-[2.4rem] xs:text-[2.85rem] xv:text-[3.5rem] xr:text-[3.8rem] sm:text-[4.05rem] block font-black leading-[0.9] tracking-[-0.01em]  text-white">
                  integrations
                </span>
              </h1>
              <p className="text-[#e3e5ed] text-[0.875rem] xs:text-[1rem] sm:text-[1.25rem] leading-[1.5rem] max-w-[35ch]">
                Don&lsquo;t let mis-alignment slow you down. Connect Claap to
                your favorite workflows.
              </p>
              <button className="mt-[48px] w-fit text-white bg-[#ff5a81] rounded-[0.4rem] py-[0.6rem] px-[1.2rem] text-[0.875rem] xs:text-[1rem] font-medium transition-all duration-200 ease-in-out hover:bg-[#ff7192]">
                Start for free
              </button>
            </div>
            <div className="text-white overflow-hidden hero">
              <div className="flex flex-col md:gap-[2rem] gap-[1rem]">
                <div
                  style={{
                    transform: `translateX(${
                      scrollPosition * (width <= 768 ? 0.1 : 0.2) * -1
                    }px)`,
                  }}
                  className="flex md:gap-[2rem] gap-[1rem] justify-start">
                  {logoData1.map((item) => (
                    <LogoCard key={item.id} logo={item.logo} />
                  ))}
                </div>
                <div
                  style={{
                    transform: `translateX(${
                      scrollPosition * (width <= 768 ? 0.1 : 0.2)
                    }px)`,
                  }}
                  className="flex md:gap-[2rem] gap-[1rem] justify-end">
                  {logoData2.map((item) => (
                    <LogoCard key={item.id} logo={item.logo} />
                  ))}
                </div>
                <div
                  style={{
                    transform: `translateX(${
                      scrollPosition * (width <= 768 ? 0.1 : 0.2) * -1
                    }px)`,
                  }}
                  className="flex md:gap-[2rem] gap-[1rem] justify-start">
                  {logoData3.map((item) => (
                    <LogoCard key={item.id} logo={item.logo} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* swapper */}
      <section class="pt-[3rem] pb-[5rem]  relative overflow-hidden lg:overflow-visible bg-purple-200">
        <div class="mb-10 lg:mb-18 relative z-2 max-w-[90rem] mx-auto">
          <h2 class="text-center text-[#391952] text-[4.0625rem] font-semibold tracking-[-0.02em] leading-[.9230769230769231]">
            The world loves Swag
          </h2>
        </div>
        <div className="xl:px-[5.25rem] lg:px-[1.875rem] max-w-[90rem] flex gap-7 mx-auto">
          <div className="px-[0.75rem] w-[33.333333%] flex-shrink-0">
            <div className="flex flex-col gap-y-4 rounded-xl p-7 bg-white justify-center">
              {data.map((item) => (
                <button
                  onClick={() => setActive(item.id)}
                  key={item.id}
                  className={`text-[1.125rem] flex justify-start items-center font-semibold px-5 py-[14px] border rounded-xl  leading-[1.125rem]  relative  ${
                    active === item.id
                      ? 'text-white bg-[#BA80E6]'
                      : 'text-[#BA80E6] bg-white'
                  } `}>
                  <Image
                    src={SpinnerLogo}
                    alt="spinner"
                    className={`w-[1.5rem] absolute left-[14px] top-1/2 -translate-y-1/2  transition-all duration-1000 h-[1.5rem] inline-block mr-5 ${
                      active === item.id ? ' opacity-[100%]' : ' opacity-0'
                    }`}
                  />

                  <div
                    className={`${
                      active === item.id
                        ? 'translate-x-[2rem]'
                        : 'translate-x-[0rem]'
                    } transition-all duration-1000 text-[22px] leading-[22px] break-words text-left`}>
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="px-[0.75rem] w-[66.666667%]  bg-white rounded-xl p-7">
            <div className="items-center relative ">
              <div className="absolute inset-0 bg-[#BA80E6] rounded-xl w-fit mx-auto">
                <p className="font-bold text-[13.75rem] tracking-[-0.5rem] leading-[13.75rem] text-center text-[#BA80E6]">
                  {data[active - 1].value}
                </p>
                <span className="block text-[2.087rem] mt-[10px] font-semibold leading-[0.9777777777777] tracking-[-0.02em] text-center text-[#BA80E6]">
                  {data[active - 1].basis}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
