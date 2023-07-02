import Image from 'next/image';
import { useState } from 'react';
import TextBox from '@/components/TextBox';
import { Inter } from 'next/font/google';
import { resetServerContext } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import LinkLogo from '@/assets/link.svg';
import ImageLogo from '@/assets/image.png';
import TextLogo from '@/assets/text.png';
import MapLogo from '@/assets/map.png';
import TitleLogo from '@/assets/title.svg';
import Laptop from '@/assets/laptop.svg';
import Mobile from '@/assets/mobile.svg';
import MobileWhite from '@/assets/mobilewhite.svg';
import LaptopBlack from '@/assets/laptopblack.svg';
import Avatar from '@/components/Avatar';
import MapboxMap from '@/components/MapBox';
import { useRef } from 'react';
import AddSocialLinks from '@/components/AddSocialLinks';
import { motion, AnimatePresence } from 'framer-motion';
import GotoProfile from '@/components/GotoProfile';

const inter = Inter({
  subsets: ['latin'],
});

export default function Home({ data }) {
  const [textBox1, setTextBox1] = useState(
    'lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, quos?'
  );
  const [textBox2, setTextBox2] = useState(
    'sssssssssssssssssssssssssssssssssssssssssssssssssssss'
  );
  const [textBox3, setTextBox3] = useState(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const contentList = [
    {
      id: '11111111111',
      content: <TextBox value={textBox1} setValue={setTextBox1} />,
    },
    {
      id: '22222222222222222',
      content: <TextBox value={textBox2} setValue={setTextBox2} />,
    },
    {
      id: '333333333333333333333333',
      content: <TextBox value={textBox3} setValue={setTextBox3} />,
    },
    {
      id: '3333333333333333333333',
      content: <TextBox value={textBox3} setValue={setTextBox3} />,
    },
    {
      id: '33333333333333333333333',
      content: <MapboxMap />,
    },
  ];

  const [isLaptop, setIsLaptop] = useState(true);

  const [isFirst, setIsFirst] = useState(true);

  const [avatarSrc, setAvatarSrc] = useState('');

  const [content, setContent] = useState(contentList);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'group') {
      const newContent = Array.from(content);
      const [removed] = newContent.splice(source.index, 1);
      newContent.splice(destination.index, 0, removed);

      setContent(newContent);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextPanel = (e) => {
    e.preventDefault();

    if (index < 2) {
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
    <main
      className={`${inter.className}    overflow-x-hidden flex justify-center xl:justify-normal`}>
      <div className=" xl:max-w-none max-w-[428px] xl:w-full flex-col xl:flex-row flex xl:gap-[2.5rem] xl:p-[4rem] ">
        <div className="flex xl:min-w-[278px] xl:max-w-[calc(100vw-64rem)]   xl:max-h-[calc(100vh-8rem)]  flex-col px-6 pt-12 xl:p-0 ">
          {!isFirst && (
            <div className="px-4 xl:p-0">
              <div className="flex justify-between w-full ">
                <Avatar
                  avatarSrc={avatarSrc}
                  handleFileSelect={handleFileSelect}
                />
                <div className="flex h-fit xl:hidden rounded-lg mt-2 border shadow-sm  items-center justify-center">
                  <button className="text-[0.87rem] transition-all duration-200 font-bold w-full py-2 px-[10px] hover:bg-[#FBFBFB]">
                    Share my Bento
                  </button>
                </div>
              </div>
              <div className="mt-8 ml-2 ">
                <div
                  contentEditable="true"
                  translate="no"
                  className="relative tracking-[-2px] text-[32px] xl:text-[44px] font-bold  focus:outline-none leading-[120%] text-[#565656]">
                  <p className="">Balaganesh K</p>
                </div>

                <div
                  contentEditable="true"
                  translate="no"
                  className="mt-3   xl:text-xl  focus:outline-none  relative  text-[#565656] ">
                  <p>bbbbbbbb</p>
                </div>
              </div>
            </div>
          )}
          {isFirst && (
            <AnimatePresence initial={false} custom={index} mode={`wait`}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}>
                {index === 0 && <AddSocialLinks />}
                {index === 1 && <AddSocialLinks />}
                {index === 2 && <GotoProfile />}
              </motion.div>
              {index < 2 && (
                <div className="flex mt-10 gap-3">
                  <button
                    onClick={nextPanel}
                    className="bg-black text-white px-[10px] py-2 rounded-lg w-[190px] h-[41px] hover:bg-black/[85%] transition-colors duration-150">
                    <span className="inline-block w-[170px] h-[25px] ">
                      Next
                    </span>
                  </button>
                  <button
                    onClick={prevPanel}
                    className="w-[100px] h-[41px] hover:bg-[#f7f7f7] rounded-lg flex items-center justify-center transition-colors duration-150">
                    Skip
                  </button>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="xl:max-w-[820px]  xl:min-w-[820px] xl:w-[820px] px-6 pb-6 pt-12 xl:p-0 xl:min-h-[calc(100vh-8rem)] ">
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="flex gap-[24px] xl:gap-[39px] flex-wrap last:pb-[6rem]">
                    {content.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}>
                            <div className="w-full">{item.content}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      {/* Fixed bar */}
      <div className="fixed bottom-[2.5rem]  backdrop-blur-lg  bg-blend-multiply  bg-white/50  left-1/2 -translate-x-1/2 p-3 rounded-2xl flex items-center shadow-xl  ">
        <div className="h-[33px] hidden xl:flex rounded-md w-[127px] bg-green-500 text-white  items-center justify-center">
          <button className="text-[0.87rem] font-bold w-full">
            Share my Bento
          </button>
        </div>
        <div className="mx-4 w-[2px] h-[16px] bg-gray-300 hidden xl:block"></div>
        <div className="h-[32px] flex gap-3 xl:gap-1  mix-blend-none">
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer ">
            <div className="w-[24px] h-[24px] rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={LinkLogo}
                alt="link"
                className="rounded-md object-cover "
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={ImageLogo}
                className=" rounded-md object-cover w-[24px] h-[24px]"
                alt="image"
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={TextLogo}
                className="rounded-md object-cover w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={MapLogo}
                className="object-cover rounded-md w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={TitleLogo}
                className="object-cover rounded-md w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
        </div>
        <div className="mx-4 w-[2px] h-[16px] bg-gray-300 hidden xl:block"></div>
        <div className="h-[33px] w-[104px]  gap-1 hidden xl:flex">
          <button
            onClick={() => setIsLaptop(true)}
            className={`px-[10px] py-2 w-[50px] ${
              isLaptop ? 'bg-black' : 'bg-white'
            } flex items-center justify-center rounded-md`}>
            <Image src={isLaptop ? Laptop : LaptopBlack} alt="laptop" />
          </button>
          <button
            onClick={() => setIsLaptop(false)}
            className={`px-[10px] py-2 w-[50px]  ${
              isLaptop ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded-md`}>
            <Image src={isLaptop ? Mobile : MobileWhite} alt="laptop" />
          </button>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
