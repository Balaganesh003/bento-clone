import { createSlice } from '@reduxjs/toolkit';
import BuyMeCoffee from '@/assets/coffee.svg';
import Twitter from '@/assets/twitter.svg';
import Instagram from '@/assets/instagram.svg';
import Github from '@/assets/github.svg';
import Linkedin from '@/assets/linkedin.svg';
import Dribbble from '@/assets/dribble.svg';

const initialState = {
  isfirstTime: true,
  socialLinks: [
    {
      id: 'twitter',
      type: 'socialLink',
      baseUrl: 'twitter',
      userName: '',
      logo: Twitter,
      bgColor: 'bg-[#55ACEE]',
      isAdded: false,
    },
    {
      id: 'instagram',
      type: 'socialLink',
      baseUrl: 'instagram',
      userName: '',
      logo: Instagram,
      bgColor: 'bg-[#CE3B9F]',
      isAdded: false,
    },
    {
      id: 'github',
      baseUrl: 'github',
      type: 'socialLink',
      userName: '',
      logo: Github,
      bgColor: 'bg-[#181717]',
      isAdded: false,
    },
    {
      id: 'linkedin',
      baseUrl: 'linkedin',
      type: 'socialLink',
      userName: '',
      logo: Linkedin,
      bgColor: 'bg-[#007EBB]',
      isAdded: false,
    },
    {
      id: 'dribbble',
      baseUrl: 'dribbble',
      type: 'socialLink',
      userName: '',
      logo: Dribbble,
      bgColor: 'bg-[#D15584]',
      isAdded: false,
    },
    {
      id: 'buymeacoffee',
      baseUrl: 'buymeacoffee',
      type: 'socialLink',
      userName: '',
      logo: BuyMeCoffee,
      bgColor: 'bg-[#FFDD06]',
      isAdded: false,
    },
  ],
  profileDetails: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFirstTime(state, action) {
      state.isfirstTime = action.payload;
    },

    updateSocialLinks(state, action) {
      const index = state.socialLinks.findIndex(
        (item) => item.id == action.payload.id
      );
      state.socialLinks[index] = action.payload;
    },

    addItem(state, action) {
      state.profileDetails.push(action.payload);
    },

    setProfileDetails(state, action) {
      state.profileDetails = action.payload;
    },

    removeItem(state, action) {
      const index = state.profileDetails.findIndex(
        (item) => item.id == action.payload
      );
      state.profileDetails.splice(index, 1);
    },

    updateItem(state, action) {
      const index = state.profileDetails.findIndex(
        (item) => item.id == action.payload.id
      );
      state.profileDetails[index] = action.payload;
    },

    removeSuggestion(state, action) {
      state.profileDetails = state.profileDetails.filter(
        (item) =>
          item?.content !== null &&
          item?.userName !== null &&
          item?.location !== null &&
          item?.imgUrl !== null
      );
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
