import React, { useState, useEffect } from 'react';
import SpinnerLogo from '@/assets/spinner.gif';
import Image from 'next/image';

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
      <section className="bg-[#0a0f20]">
        <div className="max-w-[56rem] mx-auto px-[2.4rem]">
          <div className="grid grid-cols-2 gap-[1.6rem]">
            <div className="flex flex-col">
              <h1 className="uppercase">
                <span className="bg-[url('https://uploads-ssl.webflow.com/624c34ee1eb3ec0fbbc365fc/63eca0bab64b8651def357a9_foil.jpg')] bg-clip-text  text-transparent text-[3.8rem] font-black leading-[0.9] tracking-[-0.01em] whitespace-nowrap object-cover bg-[50%]">
                  Time-Saving
                </span>
                <span className="text-[3.8rem] block font-black leading-[0.9] tracking-[-0.01em]  text-white">
                  integrations
                </span>
              </h1>
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
