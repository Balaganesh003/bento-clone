import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import AddSocialLinks from '@/components/AddSocialLinks';
import { motion, AnimatePresence } from 'framer-motion';
import GotoProfile from '@/components/GotoProfile';
import { useSelector, useDispatch } from 'react-redux';
import SocialLinkCard from '@/components/SocialLinkCard';
import { profileActions } from '@/store/profile-slice';
import AddOtherDetails from '@/components/AddOtherDetails';
import ImageCard from '@/components/ImageCard';
import OtherLinkCard from '@/components/OtherLinkCard';
import TitleBox from '@/components/TitleBox';
import { MdOutlineDelete } from 'react-icons/md';
import NameBio from '@/components/NameBio';

const inter = Inter({
  subsets: ['latin'],
});

export default function Home({ data }) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [removeSuggestions, setRemoveSuggestions] = useState(true);
  const { profileDetails, socialLinks } = useSelector((state) => state.profile);
  const [isLaptop, setIsLaptop] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isUrlOpen, setIsUrlOpen] = useState(false);

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
      const newContent = Array.from(profileDetails);
      const [removed] = newContent.splice(source.index, 1);
      newContent.splice(destination.index, 0, removed);
      dispatch(profileActions.setProfileDetails(newContent));
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
    if (index >= 0 && !isSuggestionsOpen) {
      setIsSuggestionsOpen(true);
      dispatch(
        profileActions.setProfileDetails([
          ...profileDetails,
          {
            id: '1111',
            type: 'image',
            imgUrl: null,
          },
          {
            id: '2222',
            type: 'text',
            content: null,
          },
          {
            id: '3333',
            type: 'map',
            location: null,
          },
        ])
      );
    }
  };

  const prevPanel = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDirection(-1);
    }
  };

  const addNote = () => {
    dispatch(
      profileActions.setProfileDetails([
        ...profileDetails,
        {
          id: `${Math.random() * 100}`,
          type: 'text',
          content: '',
        },
      ])
    );
  };

  const addMap = () => {
    dispatch(
      profileActions.setProfileDetails([
        ...profileDetails,
        {
          id: `${Math.random() * 100}`,
          type: 'map',
          location: { latitude: 20.5937, longitude: 78.9629, zoom: 4 },
        },
      ])
    );
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(
          profileActions.setProfileDetails([
            ...profileDetails,
            {
              id: `${Math.random() * 100}`,
              type: 'image',
              imgUrl: e.target.result,
            },
          ])
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const addTitle = () => {
    dispatch(
      profileActions.setProfileDetails([
        ...profileDetails,
        {
          id: `${Math.random() * 100}`,
          type: 'title',
          content: '',
        },
      ])
    );
  };

  const handelLink = (text) => {
    const url = new URL(text);
    if (!url) return;
    const { hostname } = url;
    const path = url.pathname.split('/');
    const userName = path[1];
    const baseUrl = hostname.split('.')[0];
    const logo = null;

    const allSocialLinks = socialLinks.map((link) => link.id);

    if (allSocialLinks.includes(baseUrl)) {
      const link = socialLinks.find((link) => link.id === baseUrl);

      dispatch(
        profileActions.addItem({
          ...link,
          userName: userName,
          isAdded: true,
        })
      );

      dispatch(
        profileActions.updateSocialLinks({
          ...link,
          userName: userName,
          isAdded: true,
        })
      );
    } else {
      dispatch(
        profileActions.setProfileDetails([
          ...profileDetails,
          {
            id: `${Math.random() * 1000}`,
            type: 'links',
            userName,
            link: text,
            logo,
            hostname,
            baseUrl,
          },
        ])
      );
    }
    setUrl('');
    setIsUrlOpen(false);
  };

  const handelOnPaste = async (e) => {
    e.preventDefault();
    if (e.clipboardData?.files?.length > 0) {
      const text = e.clipboardData.getData('text');
      if (text.includes('http') || text.includes('https')) {
        handelLink(text);
      }
    } else {
      const text = await navigator.clipboard.readText();
      if (text.includes('http') || text.includes('https')) {
        handelLink(text);
      }
    }
  };

  const handleUrl = () => {
    if (url.includes('http') || url.includes('https')) {
      handelLink(url);
    }
  };

  const removeSuggestion = () => {
    dispatch(profileActions.removeSuggestion());
    setRemoveSuggestions(false);
  };

  useEffect(() => {}, [profileDetails]);

  return (
    <main
      className={`${inter.className} overflow-x-hidden flex justify-center xl:justify-normal`}>
      <div className=" xl:max-w-none max-w-[428px] xl:w-full flex-col xl:flex-row flex xl:gap-[2.5rem] xl:p-[4rem] ">
        <div className="flex xl:min-w-[278px] xl:max-w-[calc(100vw-64rem)]   xl:max-h-[calc(100vh-8rem)] flex-1 flex-col px-6 pt-12 xl:p-0 ">
          {!isFirst && (
            <div className="px-4 xl:p-0 ">
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
                <NameBio />
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
                {index === 1 && <AddOtherDetails prevPanel={prevPanel} />}
                {index === 2 && <GotoProfile setIsFirst={setIsFirst} />}
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
                    onClick={() => setIsFirst(false)}
                    className="w-[100px] h-[41px] hover:bg-[#f7f7f7] rounded-lg flex items-center justify-center transition-colors duration-150">
                    Skip
                  </button>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="xl:max-w-[820px]  xl:min-w-[820px] xl:w-[820px] px-6 pb-6 pt-12 xl:p-0 xl:min-h-[calc(100vh-8rem)] w-full h-full flex">
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className=" flex  gap-[24px] xl:gap-[39px]  flex-wrap last:pb-[6rem]">
                    {profileDetails.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}>
                            <div className="w-full">
                              {item.type === 'socialLink' && item.isAdded && (
                                <SocialLinkCard item={item} />
                              )}
                              {item.type === 'image' && (
                                <ImageCard item={item} />
                              )}
                              {item.type === 'text' && <TextBox item={item} />}
                              {item.type === 'map' && <MapboxMap item={item} />}
                              {item.type === 'links' && (
                                <OtherLinkCard item={item} />
                              )}
                              {item.type === 'title' && (
                                <TitleBox item={item} />
                              )}
                            </div>
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
        <div
          onBlur={() => setIsUrlOpen(false)}
          className="h-[32px] flex gap-3 xl:gap-1  mix-blend-none">
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer relative">
            <div
              onClick={() => setIsUrlOpen(!isUrlOpen)}
              className="w-[24px] h-[24px] rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={LinkLogo}
                alt="link"
                className="rounded-md object-cover"
              />
            </div>
            {/* Add Link */}
            {isUrlOpen && (
              <div className="h-10 w-[16rem] bg-white border absolute bottom-[3rem] shadow-lg rounded-lg left-[-4rem] cursor-text  ">
                <div className="h-full w-full flex gap-2 items-center px-1 group">
                  <input
                    onPaste={handelOnPaste}
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter link"
                    className="w-full h-full bg-transparent px-1 py-1 text-black focus:outline-none "
                  />
                  {url.length > 0 ? (
                    <button
                      onClick={handleUrl}
                      className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors duration-150 h-fit text-[14px]">
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={handelOnPaste}
                      className="bg-[#fafafa] shadow-sm border group-hover:opacity-[100%]  opacity-0 text-black px-3 py-1 rounded-lg hover:bg-[#f7f7f7] transition-colors duration-150 h-fit text-[14px]">
                      Paste
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer relative">
            <div className="cursor-pointer rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={ImageLogo}
                className=" rounded-md object-cover w-[24px] h-[24px]"
                alt="image"
              />
            </div>
            <div className="absolute opacity-0 top-0 left-0 cursor-pointer  w-[28px] h-[28px] rounded-lg">
              <input
                type="file"
                onChange={addImage}
                className="w-full h-full  cursor-pointer"
              />
            </div>
          </div>
          <div
            onClick={addNote}
            className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={TextLogo}
                className="rounded-md object-cover w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
          <div
            onClick={addMap}
            className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
            <div className=" rounded-md flex items-center justify-center border hover:shadow-xl">
              <Image
                src={MapLogo}
                className="object-cover rounded-md w-[24px] h-[24px]"
                alt="text"
              />
            </div>
          </div>
          <div
            onClick={addTitle}
            className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
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
      {/* Remove suggestions */}
      {removeSuggestions && !isFirst && (
        <div
          onClick={removeSuggestion}
          className="fixed right-5 bottom-[5rem] shadow-lg flex gap-2 items-center rounded-lg bg-white border p-2 text-[14px] font-bold cursor-pointer">
          <MdOutlineDelete className="ml-2 cursor-pointer text-xl" />
          Remove suggestions
        </div>
      )}
    </main>
  );
}

// export const getServerSideProps = async ({ query }) => {
//   resetServerContext();

//   return { props: { data: [] } };
// };
