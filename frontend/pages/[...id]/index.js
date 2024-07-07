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
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { axiosWithToken } from '@/utils/axiosjwt';
import { uiActions } from '@/store/ui-slice';
import { defaultSocialLinks } from '@/constant';
import { Toaster, toast } from 'react-hot-toast';
import Head from 'next/head';

axios.defaults.withCredentials = true;

const inter = Inter({
  subsets: ['latin'],
});

const InitialData = [
  {
    id: uuidv4(),
    type: 'image',
    imgUrl: 'null',
    width: 1,
    height: 1,
  },
  {
    id: uuidv4(),

    type: 'text',
    content: null,
    width: 1,
    height: 1,
  },
  {
    id: uuidv4(),
    type: 'map',
    location: { latitude: null, longitude: null, zoom: 4 },
    width: 5,
    height: 5,
  },
];

export default function Home({ data }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isFirst = useSelector((state) => state.ui.isfirstTime);
  const { profileDetails, avatar, name, bio } = useSelector(
    (state) => state.profile
  );
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const { isSameUser } = useSelector((state) => state.ui);
  const [isLaptop, setIsLaptop] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [avatarSrc, setAvatarSrc] = useState('');
  const [url, setUrl] = useState('');
  const [isUrlOpen, setIsUrlOpen] = useState(false);

  let USERNAME = router.query?.id[0];

  useEffect(() => {
    const getData = async () => {
      try {
        if (!USERNAME) return;
        const url = `${API_URL}/profile/${USERNAME}`;
        console.log('Fetching profile data from:', url);
        const res = await axiosWithToken.get(url);

        const { profile, isSameUser } = res.data;
        console.log('Profile data fetched:', profile);

        dispatch(profileActions.setProfileDetails(profile.profiles));
        dispatch(profileActions.updateAvatar(profile.avatar));
        dispatch(profileActions.updateDisplayName(profile.displayName));
        dispatch(profileActions.updateBio(profile.bio));

        if (isSameUser !== undefined) {
          dispatch(uiActions.setSameUser(isSameUser));
        } else {
          dispatch(uiActions.setSameUser(false)); // Handle case where isSameUser is undefined
        }

        checkSuggestions(profile.profiles); // Call checkSuggestions with fetched data
      } catch (error) {
        console.error('Profile data fetch error:', error);

        // Optionally handle redirection to login
        console.log('Redirecting to /login');
        router.push('/signup');
      }
    };

    if (router.query.id?.length > 1) {
      router.push(`/${router.query.id[0]}`);
    } else if (USERNAME) {
      getData();
    }
  }, [USERNAME, router.query.id]);

  const checkSuggestions = (profiles) => {
    let suggestionsFound = false;

    for (const item of profiles) {
      // Check for null or undefined values in the relevant properties
      if (
        (item.type === 'text' && item.content == null) ||
        (item.type === 'image' && item.imgUrl == null) ||
        (item.type === 'map' &&
          (!item.location?.latitude || !item.location?.longitude))
      ) {
        suggestionsFound = true;
        break;
      }
    }

    setIsSuggestionsOpen(suggestionsFound);
    console.log('Suggestions found:', suggestionsFound);
  };

  const handelFirstTime = () => {
    dispatch(uiActions.setFirstTime(false));
  };

  const onDragEnd = async (result) => {
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
      try {
        const res = await axiosWithToken.put(
          `${API_URL}/profile/replace/${USERNAME}`,
          {
            profileDetails: newContent,
          }
        );
        console.log('res', res.data);
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const nextPanel = async (e) => {
    e.preventDefault();

    if (index < 2) {
      setIndex(index + 1);
      setDirection(1);
    }

    if (index >= 0 && !isSuggestionsOpen) {
      setIsSuggestionsOpen(true);
      await addSuggestions();
    }
  };

  const addSuggestions = async () => {
    if (!USERNAME) return;
    try {
      const res = await axiosWithToken.put(
        `${API_URL}/profile/replace/${USERNAME}`,
        {
          profileDetails: [...profileDetails, ...InitialData],
        }
      );
      dispatch(
        profileActions.setProfileDetails([...profileDetails, ...InitialData])
      );
    } catch (error) {
      console.error('Error adding profile objects:', error);
      toast.error('Error adding profile objects');
    }
  };

  const prevPanel = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDirection(-1);
    }
  };

  const addNote = async () => {
    const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
      id: uuidv4(),
      type: 'text',
      content: '',
      width: 1,
      height: 1,
    });

    dispatch(
      profileActions.setProfileDetails([
        ...profileDetails,
        res.data.addedObject,
      ])
    );
  };

  const addMap = async () => {
    const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
      id: uuidv4(),
      type: 'map',
      location: { latitude: 20.5937, longitude: 78.9629, zoom: 4 },
      width: 5,
      height: 5,
    });

    dispatch(
      profileActions.setProfileDetails([
        ...profileDetails,
        res.data.addedObject,
      ])
    );
  };

  const addImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const res = await axiosWithToken.post(
          `${API_URL}/profile/${USERNAME}`,
          {
            type: 'image',
            id: uuidv4(),
            imgUrl: e.target.result,
            width: 5,
            height: 5,
          }
        );
        dispatch(
          profileActions.setProfileDetails([
            ...profileDetails,
            res.data.addedObject,
          ])
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const addTitle = async () => {
    const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
      id: uuidv4(),
      type: 'title',
      content: '',
    });

    dispatch(
      profileActions.setProfileDetails([
        ...profileDetails,
        res.data.addedObject,
      ])
    );
  };

  const handelLink = async (text) => {
    const url = new URL(text);

    const { hostname } = url;
    const path = url.pathname.split('/').filter(Boolean);
    if (path.length === 0) return;

    const userName = path[path.length - 1];

    const hostnameParts = hostname.split('.');
    const baseUrlKey = hostnameParts.includes('www')
      ? hostnameParts[1]
      : hostnameParts[0];

    const baseUrlData = defaultSocialLinks[baseUrlKey];

    if (!baseUrlData) {
      console.log('Unsupported social media platform:', baseUrlKey);

      const { hostname } = url;
      const path = url.pathname.split('/');
      const userName = path[1];
      const baseUrl = hostname.split('.')[0];
      const logo = '';

      const linkObj = {
        id: uuidv4(),
        type: 'links',
        userName: userName,
        link: text,
        logo,
        hostname,
        baseUrl: baseUrl,
        width: 1,
        height: 1,
      };

      const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
        ...linkObj,
      });

      dispatch(profileActions.addItem([res.data.addedObject]));
      toast.success('Link added successfully.');
      setIsUrlOpen(false);
    } else {
      const res = await axiosWithToken.post(`${API_URL}/profile/${USERNAME}`, {
        id: uuidv4(),
        ...baseUrlData,
        logo: baseUrlData.logo,
        baseUrl: baseUrlData.baseUrl,
        userName: userName,
        width: 1,
        height: 1,
      });

      dispatch(
        profileActions.addItem({
          ...res.data.addedObject,
        })
      );
      toast.success('Link added successfully.');
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

  const removeSuggestion = async () => {
    if (!USERNAME) return;
    try {
      console.log('Removing suggestions for:', USERNAME);
      const res = await axiosWithToken.delete(`${API_URL}/profile/${USERNAME}`);

      console.log(
        'Remove suggestions response:',
        res.status,
        res.data.ProfileObject
      );

      if (res.status === 200) {
        dispatch(profileActions.setProfileDetails(res.data.ProfileObject));
        setIsSuggestionsOpen(false);
        console.log('Suggestions removed successfully');
      } else {
        console.error(
          'Failed to remove suggestions:',
          res.status,
          res.statusText
        );
      }
    } catch (error) {
      console.error('Error removing suggestions:', error);
      toast.error('Failed to remove suggestions. Please try again.');
    }
  };

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };

  return (
    <>
      <Head>
        <title>{`${name}`}</title>
        <link rel="icon" href={avatar} />
        <meta
          name="description"
          content={`Check out ${name}'s profile. ${bio.substring(0, 150)}...`}
        />
        <meta name="keywords" content="profile, social media, networking" />
        <meta property="og:type" content="profile" />
        <meta
          property="og:title"
          content={`${name}'s Profile | Your Site Name`}
        />
        <meta property="og:description" content={bio} />
        <meta property="og:image" content={avatar} />
        <meta
          property="og:url"
          content={`https://bento-clone.vercel.app/${USERNAME}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://bento-clone.vercel.app/${USERNAME}`}
        />
      </Head>
      <main
        className={`${inter.className}  overflow-x-hidden flex justify-center ${
          isLaptop && 'xl:justify-normal'
        }`}>
        <Toaster />
        <div
          className={`  max-w-[428px] flex-col  flex  ${
            isLaptop &&
            'xl:max-w-none  xl:w-full xl:flex-row xl:gap-[2.5rem] xl:p-[4rem]'
          } `}>
          <div
            className={`flex  flex-1 flex-col px-6 pt-12  ${
              isLaptop &&
              'xl:min-w-[278px] xl:max-w-[calc(100vw-64rem)] xl:p-0  xl:max-h-[calc(100vh-8rem)]'
            }`}>
            {!isFirst && (
              <div className={`px-4 ${isLaptop && 'xl:p-0'}  `}>
                <div className="flex justify-between w-full ">
                  <Avatar
                    isLaptop={isLaptop}
                    avatarSrc={avatarSrc}
                    setAvatarSrc={setAvatarSrc}
                    username={USERNAME}
                    isSameUser={isSameUser}
                  />
                  <div
                    className={`flex h-fit  rounded-lg mt-2 border shadow-sm  items-center justify-center ${
                      isLaptop && 'xl:hidden'
                    }`}>
                    <button
                      onClick={copyUrlToClipboard}
                      className="text-[0.87rem] transition-all duration-200 font-bold w-full py-2 px-[10px] hover:bg-[#FBFBFB]">
                      Share my Bento
                    </button>
                  </div>
                </div>
                <div className="mt-8 ml-2 ">
                  <NameBio USERNAME={USERNAME} isLaptop={isLaptop} />
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
                  {index === 0 && <AddSocialLinks USERNAME={USERNAME} />}
                  {index === 1 && (
                    <AddOtherDetails
                      prevPanel={prevPanel}
                      USERNAME={USERNAME}
                    />
                  )}
                  {index === 2 && (
                    <GotoProfile
                      setIsFirst={handelFirstTime}
                      USERNAME={USERNAME}
                    />
                  )}
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
                      onClick={() => [handelFirstTime(), addSuggestions()]}
                      className="w-[100px] h-[41px] hover:bg-[#f7f7f7] rounded-lg flex items-center justify-center transition-colors duration-150">
                      Skip
                    </button>
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>

          {isSameUser ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div
                className={` px-6 pb-6 pt-12  w-full h-full flex ${
                  isLaptop &&
                  'xl:max-w-[820px]  xl:min-w-[820px] xl:w-[820px] xl:p-0 xl:min-h-[calc(100vh-8rem)]'
                }`}>
                <Droppable droppableId="ROOT" type="group">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <div
                        className={`flex  gap-[24px] ${
                          isLaptop && 'xl:gap-[39px]'
                        }  flex-wrap last:pb-[6rem]`}>
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
                                  {item.type === 'socialLink' && (
                                    <SocialLinkCard
                                      item={item}
                                      USERNAME={USERNAME}
                                    />
                                  )}
                                  {item.type === 'image' && (
                                    <ImageCard
                                      item={item}
                                      USERNAME={USERNAME}
                                    />
                                  )}
                                  {item.type === 'text' && (
                                    <TextBox item={item} USERNAME={USERNAME} />
                                  )}
                                  {item.type === 'map' && (
                                    <MapboxMap
                                      item={item}
                                      USERNAME={USERNAME}
                                    />
                                  )}
                                  {item.type === 'links' && (
                                    <OtherLinkCard
                                      item={item}
                                      USERNAME={USERNAME}
                                    />
                                  )}
                                  {item.type === 'title' && (
                                    <TitleBox item={item} USERNAME={USERNAME} />
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
          ) : (
            <div className="xl:max-w-[820px]  xl:min-w-[820px] xl:w-[820px] px-6 pb-6 pt-12 xl:p-0 xl:min-h-[calc(100vh-8rem)] w-full h-full flex">
              <div>
                <div className=" flex  gap-[24px] xl:gap-[39px]  flex-wrap last:pb-[6rem]">
                  {profileDetails.map((item, index) => (
                    <div key={item._id}>
                      <div className="w-full">
                        {item.type === 'socialLink' && (
                          <SocialLinkCard item={item} USERNAME={USERNAME} />
                        )}
                        {item.type === 'image' && (
                          <ImageCard item={item} USERNAME={USERNAME} />
                        )}
                        {item.type === 'text' && (
                          <TextBox item={item} USERNAME={USERNAME} />
                        )}
                        {item.type === 'map' && (
                          <MapboxMap item={item} USERNAME={USERNAME} />
                        )}
                        {item.type === 'links' && (
                          <OtherLinkCard item={item} USERNAME={USERNAME} />
                        )}
                        {item.type === 'title' && (
                          <TitleBox item={item} USERNAME={USERNAME} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Fixed bar */}
        {isSameUser && (
          <div className="fixed bottom-[2.5rem]  backdrop-blur-lg  bg-blend-multiply  bg-white/50  left-1/2 -translate-x-1/2 p-3 rounded-2xl flex items-center shadow-xl z-[10000] ">
            <div className="h-[33px] hidden xl:flex rounded-md w-[127px] bg-green-500 text-white  items-center justify-center">
              <button
                onClick={copyUrlToClipboard}
                className="text-[0.87rem] font-bold w-full">
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
                    className=" rounded-md object-cover  w-[24px] h-[24px]"
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
        )}

        {/* Remove suggestions */}
        {isSuggestionsOpen && isSameUser && (
          <div
            onClick={removeSuggestion}
            className="fixed right-5 bottom-[5rem] shadow-lg flex gap-2 items-center rounded-lg bg-white border p-2 text-[14px] font-bold cursor-pointer">
            <MdOutlineDelete className="ml-2 cursor-pointer text-xl" />
            Remove suggestions
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  resetServerContext();
  return {
    props: {
      data: 'data',
    },
  };
}
