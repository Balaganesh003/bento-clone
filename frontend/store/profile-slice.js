import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isfirstTime: true,
  socialLinks: [
    {
      id: 'twitter',
      type: 'socialLink',
      baseUrl: 'twitter',
      userName: '',
      logo: 'https://res.cloudinary.com/dqlj6jlir/image/upload/v1715698990/logo/twitter_leayqs.svg',
      bgColor: '#55ACEE',
      isAdded: false,
    },
    {
      id: 'instagram',
      type: 'socialLink',
      baseUrl: 'instagram',
      userName: '',
      logo: 'https://res.cloudinary.com/dqlj6jlir/image/upload/v1715698960/logo/instagram_psrjkv.svg',
      bgColor: '#CE3B9F',
      isAdded: false,
    },
    {
      id: 'github',
      baseUrl: 'github',
      type: 'socialLink',
      userName: '',
      logo: 'https://res.cloudinary.com/dqlj6jlir/image/upload/v1715698955/logo/github_bpmxzd.svg',
      bgColor: '#181717',
      isAdded: false,
    },
    {
      id: 'linkedin',
      baseUrl: 'linkedin',
      type: 'socialLink',
      userName: '',
      logo: 'https://res.cloudinary.com/dqlj6jlir/image/upload/v1715698975/logo/linkedin_dmyqon.svg',
      bgColor: '#007EBB',
      isAdded: false,
    },
    {
      id: 'dribbble',
      baseUrl: 'dribbble',
      type: 'socialLink',
      userName: '',
      logo: 'https://res.cloudinary.com/dqlj6jlir/image/upload/v1715699056/logo/dribble_wx1hht.svg',
      bgColor: '#D15584',
      isAdded: false,
    },
    {
      id: 'buymeacoffee',
      baseUrl: 'buymeacoffee',
      type: 'socialLink',
      userName: '',
      logo: 'https://res.cloudinary.com/dqlj6jlir/image/upload/v1715699053/logo/coffee_eerped.svg',
      bgColor: '#FFDD06',
      isAdded: false,
    },
  ],
  profileDetails: [],
  name: '',
  bio: '',
  avatar: '',
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

    updateDisplayName(state, action) {
      state.name = action.payload;
    },

    updateBio(state, action) {
      state.bio = action.payload;
    },

    updateAvatar(state, action) {
      state.avatar = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
