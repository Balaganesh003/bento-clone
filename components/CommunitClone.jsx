import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const CommunityClone = () => {
  const swapperRef = useRef(null);

  useEffect(() => {
    const swapper = swapperRef.current;
    const list = Array.from(swapper.children);
    let count = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;
    let count6 = 0;
    let count7 = 0;

    const scrollInterval = setInterval(() => {
      if (count === -1) {
        count = list.length - 1;
        list[0].style.transform = `translateY(${-100}%)`;
        list[0].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        setTimeout(() => {
          list[0].style.opacity = 0;
          list[0].style.transition = 'none';
          list[0].style.transform = `translateY(${600}%)`;
        }, 200);
      } else {
        list[0].style.transform = `translateY(${count * 100}%)`;
        list[0].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      if (count2 === -2) {
        count2 = list.length - 2;
        list[1].style.transform = `translateY(${-200}%)`;
        list[1].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        setTimeout(() => {
          list[1].style.opacity = 0;
          list[1].style.transition = 'none';

          list[1].style.transform = `translateY(${500}%)`;
        }, 200);
      } else {
        list[1].style.transform = `translateY(${count2 * 100}%)`;
        list[1].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      if (count3 === -3) {
        count3 = list.length - 3;
        list[2].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        list[2].style.transform = `translateY(${-300}%)`;

        setTimeout(() => {
          list[2].style.opacity = 0;
          list[2].style.transition = 'none';

          list[2].style.transform = `translateY(${400}%)`;
        }, 200);
      } else {
        list[2].style.transform = `translateY(${count3 * 100}%)`;
        list[2].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      if (count4 === -4) {
        count4 = list.length - 4;
        list[3].style.transform = `translateY(${-400}%)`;
        list[3].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        setTimeout(() => {
          list[3].style.opacity = 0;
          list[3].style.transition = 'none';

          list[3].style.transform = `translateY(${300}%)`;
        }, 200);
      } else {
        list[3].style.transform = `translateY(${count4 * 100}%)`;
        list[3].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      if (count5 === -5) {
        count5 = list.length - 5;
        list[4].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        list[4].style.transform = `translateY(${-500}%)`;

        setTimeout(() => {
          list[4].style.opacity = 0;
          list[4].style.transition = 'none';

          list[4].style.transform = `translateY(${200}%)`;
        }, 200);
      } else {
        list[4].style.transform = `translateY(${count5 * 100}%)`;
        list[4].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      if (count6 === -6) {
        count6 = list.length - 6;
        list[5].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        list[5].style.transform = `translateY(${-600}%)`;

        setTimeout(() => {
          list[5].style.opacity = 0;
          list[5].style.transition = 'none';

          list[5].style.transform = `translateY(${100}%)`;
        }, 200);
      } else {
        list[5].style.transform = `translateY(${count6 * 100}%)`;
        list[5].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      if (count7 === -7) {
        count7 = list.length - 7;

        list[6].style.transform = `translateY(${-700}%)`;
        list[6].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';

        setTimeout(() => {
          list[6].style.opacity = 0;
          list[6].style.transition = 'none';

          list[6].style.transform = `translateY(${0}%)`;
        }, 200);
      } else {
        list[6].style.transform = `translateY(${count7 * 100}%)`;
        list[6].style.transition =
          'opacity 500ms ease-out, transform 500ms ease-out';
      }

      count--;
      count2--;
      count3--;
      count4--;
      count5--;
      count6--;
      count7--;

      list[0].style.opacity = `${
        count === -1
          ? 0.2
          : count === 0
          ? 1
          : count === 1
          ? 0.4
          : count === 2
          ? 0.2
          : count === 3
          ? 0.1
          : count === 4
          ? 0.05
          : count === 5
          ? 0.05
          : 0
      }`;

      list[1].style.opacity = `${
        count2 === -2
          ? 0.2
          : count2 === -1
          ? 1
          : count2 === 0
          ? 0.4
          : count2 === 1
          ? 0.2
          : count2 === 2
          ? 0.1
          : count2 === 3
          ? 0.05
          : count2 === 4
          ? 0.05
          : 0
      }`;

      list[2].style.opacity = `${
        count3 === -3
          ? 0.2
          : count3 === -2
          ? 1
          : count3 === -1
          ? 0.4
          : count3 === 0
          ? 0.2
          : count3 === 1
          ? 0.1
          : count3 === 2
          ? 0.05
          : count3 === 3
          ? 0.05
          : 0
      }`;

      list[3].style.opacity = `${
        count4 === -4
          ? 0.2
          : count4 === -3
          ? 1
          : count4 === -2
          ? 0.4
          : count4 === -1
          ? 0.2
          : count4 === 0
          ? 0.1
          : count4 === 1
          ? 0.05
          : count4 === 2
          ? 0.05
          : 0
      }`;

      list[4].style.opacity = `${
        count5 === -5
          ? 0.2
          : count5 === -4
          ? 1
          : count5 === -3
          ? 0.4
          : count5 === -2
          ? 0.2
          : count5 === -1
          ? 0.1
          : count5 === 0
          ? 0.05
          : count5 === 1
          ? 0.05
          : 0
      }`;

      list[5].style.opacity = `${
        count6 === -6
          ? 0.2
          : count6 === -5
          ? 1
          : count6 === -4
          ? 0.4
          : count6 === -3
          ? 0.2
          : count6 === -2
          ? 0.1
          : count6 === -1
          ? 0.05
          : count6 === 0
          ? 0.05
          : 0
      }`;

      list[6].style.opacity = `${
        count7 === -7
          ? 0.2
          : count7 === -6
          ? 1
          : count7 === -5
          ? 0.4
          : count7 === -4
          ? 0.2
          : count7 === -3
          ? 0.1
          : count7 === -2
          ? 0.05
          : count7 === -1
          ? 0.05
          : 0
      }`;

      if (count === list.length + 1) {
        count = 0;
      }

      if (count2 === list.length) {
        count2 = 0;
      }

      if (count3 === list.length + -1) {
        count3 = 0;
      }

      if (count4 === list.length + -2) {
        count4 = 0;
      }

      if (count5 === list.length + -3) {
        count5 = 0;
      }

      if (count6 === list.length + -4) {
        count6 = 0;
      }

      if (count7 === list.length + -5) {
        count7 = 0;
      }
    }, 2500);

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div className="bg-[#150f04]  overflow-hidden px-[3%] relative">
      <div className="pt-[6.4rem] pb-[1.6rem] w-full max-w-[1280px] mx-auto">
        {/* Heading */}
        <div className="text-white text-center mb-[4rem]">
          <div className="text-[1rem] uppercase font-medium leading-[1.2] break-words">
            Communities come in all shapes and sizes
          </div>
        </div>
        {/* Swipper */}
        <div className="w-full">
          <div className="grid text-[#deb556] grid-cols-auto  gap-[48px]">
            {/* Left */}
            <div className="max-w-[420px] flex flex-col gap-[36px] text-right items-end justify-start">
              <div className="max-w-[5ch] text-[104px] break-words text-right leading-[1.1]">
                Built for
              </div>
              <div className="flex flex-col text-white items-end justify-start leading-[1.7] text-[20px] gap-[24px]">
                <div className="text-right text-[20px]">
                  You&lsquo;ve built a thriving community. Pallet helps you
                  support their careers, land great new roles, and get paid, all
                  in one product.
                </div>
                <Link href="/community" target="_blank">
                  <div className="py-1 flex gap-3 font-medium text-[20px] items-center">
                    Request Access
                    <BsArrowRight className="text-[22px]" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full h-full relative overflow-visible text-[#deb566]">
              <div ref={swapperRef} className="h-[792px] relative">
                <div className="text-[104px] leading-[1.1]">writers</div>
                <div className="text-[104px] leading-[1.1]">tweeters</div>
                <div className="text-[104px] leading-[1.1]">podcasters</div>
                <div className="text-[104px] leading-[1.1]">discordists</div>
                <div className="text-[104px] leading-[1.1]">streamers</div>
                <div className="text-[104px] leading-[1.1]">communiteers</div>
                <div className="text-[104px] leading-[1.1]">nfteers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityClone;
