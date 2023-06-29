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

const inter = Inter({
  subsets: ['latin'],
});

export default function Home({ data }) {
  const [textBox1, setTextBox1] = useState(
    'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?'
  );
  const [textBox2, setTextBox2] = useState(
    'sssssssssssssssssssssssssssssssssssssssssssssssssssss'
  );
  const [textBox3, setTextBox3] = useState(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  );

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

  return (
    <main
      className={`${inter.className} p-[4rem] flex overflow-x-hidden gap-[4rem]`}>
      <div className=" flex  h-fit min-h-[calc(100vh-8rem)]  flex-1 flex-col ">
        <div className="w-fit">
          <Avatar avatarSrc={avatarSrc} handleFileSelect={handleFileSelect} />
        </div>

        <input
          type="text"
          placeholder="Your Name"
          className="text-[42px] mt-[32px] ml-2 min-w-[5rem] max-w-[calc(100vw-64rem)]  focus:outline-none text-[#6c6c6c] placeholder:text-[#a2a2a2] -tracking-[2px] leading-[120%] font-bold break-words whitespace-normal"
        />

        <div className="mt-3 ml-2  xl:text-xl w-full">
          <textarea
            placeholder="Your Bio..."
            className="focus:outline-none resize-none w-full  text-[#565656]  min-h-[calc(100vh-26rem)] scrollbar-hide"></textarea>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="max-w-[820px] min-w-[820px] w-[820px]   min-h-[calc(100vh-8rem)] ">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="flex gap-[40px] flex-wrap last:pb-[6rem]">
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
      {/* Fixed bar */}
      <div className="fixed bottom-[2.5rem] bg-white left-1/2 -translate-x-1/2 p-3 rounded-2xl flex items-center shadow-xl  ">
        <div className="h-[33px] hidden lg:flex rounded-md w-[127px] bg-green-500 text-white  items-center justify-center">
          <button className="text-[0.87rem] font-bold w-full">
            Share my Bento
          </button>
        </div>
        <div className="mx-4 w-[2px] h-[16px] bg-gray-300 hidden lg:block"></div>
        <div className="h-[32px] flex gap-3 lg:gap-1 ">
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer ">
            <div className="w-[24px] h-[24px] rounded-md flex items-center justify-center border hover:shadow-lg">
              <Image
                src={LinkLogo}
                alt="link"
                className="rounded-md object-cover "
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-lg">
              <Image
                src={ImageLogo}
                className=" rounded-md object-cover w-[24px] h-[24px]"
                alt="image"
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-lg">
              <Image
                src={TextLogo}
                className="rounded-md object-cover w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-lg">
              <Image
                src={MapLogo}
                className="object-cover rounded-md w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-lg">
              <Image
                src={TitleLogo}
                className="object-cover rounded-md w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
        </div>
        <div className="mx-4 w-[2px] h-[16px] bg-gray-300 hidden lg:block"></div>
        <div className="h-[33px] w-[104px]  gap-1 hidden lg:flex">
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
