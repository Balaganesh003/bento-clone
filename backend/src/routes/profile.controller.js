const mongoose = require('mongoose');
const User = require('../models/user.model');
const Profile = require('../models/porfile.model');
const cloudinary = require('../services/cloudinary');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUsernameMatch = async (token, urlusername) => {
  try {
    if (!token) {
      throw new Error('Authorization token not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const jwtUsername = decoded.username;

    console.log('JWT username:', jwtUsername);
    console.log('URL username:', urlusername);

    if (jwtUsername !== urlusername) {
      throw new Error('Username mismatch');
    }
  } catch (error) {
    throw error;
  }
};

const addProfileObject = async (req, res) => {
  let { username } = req.params;
  username = String(username);
  const {
    type,
    id,
    baseUrl,
    userName,
    logo,
    bgColor,
    content,
    location,
    imgUrl,
    width,
    height,
    hostname,
    link,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      profile = await Profile.create([{ user: user._id, profiles: [] }], {
        session,
      });
    }

    const newProfileObject = {
      type,
      id,
      baseUrl,
      userName,
      logo,
      bgColor,
      content,
      location,
      imgUrl,
      width,
      height,
      hostname,
      link,
    };

    if (type === 'image' && imgUrl && imgUrl !== 'null') {
      const uploadedResponse = await cloudinary.uploader.upload(imgUrl, {
        folder: `bento/${username}`,
        public_id: `bento_${username}_${Date.now()}`,
      });

      newProfileObject.imgUrl = uploadedResponse.secure_url;
    }

    profile.profiles.push(newProfileObject);
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile object added:', newProfileObject);
    res.status(201).json({
      message: 'Profile object added successfully',
      profile: profile,
      addedObject: newProfileObject,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Add profile object error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllProfileObjects = async (req, res) => {
  let { username } = req.params;
  username = String(username);

  let isSameUser = false;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).json({ message: 'User not found' });
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const jwtUsername = decoded.username;
        if (jwtUsername === username) {
          isSameUser = true;
        }
      } catch (err) {
        console.error('JWT verification error:', err);
        isSameUser = false;
      }
    }

    const profile = await Profile.findOne({ user: user._id });

    if (!profile) {
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    res.status(200).json({ profile, isSameUser });
  } catch (error) {
    console.error('Fetch profile objects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const setInitialProfile = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);

    if (!user) {
      throw new Error('User not found');
    }

    const existingProfile = await Profile.findOne({ user: userId }).session(
      session
    );

    if (existingProfile) {
      console.log('User already has a profile:', userId);
      await session.abortTransaction();
      session.endSession();
      return;
    }

    const defaultProfile = {
      user: userId,
      profiles: [],
    };

    const newProfile = await Profile.create([defaultProfile], { session });
    console.log('Initial profile set for user:', user.username);

    user.profileDetails = newProfile._id;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile reference updated for user:', user.username);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Set initial profile error:', error);
    throw error;
  }
};

const updateProfileObject = async (req, res) => {
  let { username } = req.params;
  username = String(username);
  const {
    type,
    id,
    baseUrl,
    userName,
    link,
    hostname,
    logo,
    bgColor,
    content,
    location,
    imgUrl,
    height,
    width,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    const objectIndex = profile.profiles.findIndex(
      (obj) => obj.id.toString() === id
    );

    if (objectIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Object not found in the profile' });
    }

    const newProfileObject = {
      type,
      id,
      baseUrl,
      userName,
      logo,
      bgColor,
      content,
      location,
      imgUrl,
      height,
      width,
      link,
      hostname,
    };

    if (type === 'image' && imgUrl) {
      const uploadedResponse = await cloudinary.uploader.upload(imgUrl, {
        folder: `bento/${username}`,
        public_id: `bento_${username}_${Date.now()}`,
      });

      newProfileObject.imgUrl = uploadedResponse.secure_url;
    }

    profile.profiles[objectIndex] = {
      ...profile.profiles[objectIndex],
      ...newProfileObject,
    };

    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile object updated:', newProfileObject);
    res.status(200).json({
      message: 'Profile object updated successfully',
      updatedObject: newProfileObject,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Update profile object error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const setProfileDetails = async (req, res) => {
  const { username } = req.params;
  const { profileDetails } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      profile = await Profile.create([{ user: user._id, profiles: [] }], {
        session,
      });
    }

    profile.profiles = [];
    profile.profiles.push(...profileDetails);

    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile details updated for user:', username);
    res.status(200).json({
      message: 'Profile details updated successfully',
      profile: profile,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Set profile details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProfileObject = async (req, res) => {
  const { username, objectId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    const objectIndex = profile.profiles.findIndex(
      (obj) => obj.id.toString() === objectId
    );

    if (objectIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Object not found in the profile' });
    }

    profile.profiles.splice(objectIndex, 1);
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile object deleted:', objectId);
    res.status(200).json({ message: 'Profile object deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Delete profile object error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDisplayName = async (req, res) => {
  let { username } = req.params;
  username = String(username);
  const { displayname } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    profile.displayName = displayname;
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile Name updated successfully');
    res
      .status(200)
      .json({ message: 'Profile Name updated successfully', displayname });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Update profile Name error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBio = async (req, res) => {
  let { username } = req.params;
  username = String(username);
  const { bio } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    profile.bio = bio;
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile Bio updated successfully');
    res
      .status(200)
      .json({ message: 'Profile Bio updated successfully', bio: bio });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Update profile Bio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadAvatar = async (req, res) => {
  let { username } = req.params;
  username = String(username);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Profile not found' });
    }

    const fileStr = req.body.avatar;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: `bento/${username}`,
      public_id: `avatar`,
    });

    profile.avatar = uploadedResponse.secure_url;
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Avatar uploaded successfully:', uploadedResponse.secure_url);
    res.status(200).json({
      message: 'Avatar uploaded successfully',
      profile,
      avatar_url: uploadedResponse.secure_url,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Avatar upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAvatar = async (req, res) => {
  let { username } = req.params;
  username = String(username);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (profile.avatar) {
      // Extract public_id from the avatar URL
      const publicId = profile.avatar
        .split('/')
        .slice(-2)
        .join('/')
        .split('.')[0];

      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(publicId);

      // Remove the avatar URL from the profile
      profile.avatar = '';
      await profile.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    console.log('Avatar deleted successfully');
    res.status(200).json({
      message: 'Avatar deleted successfully',
      profile,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Avatar deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resize = async (req, res) => {
  const { username, objectId, height, width } = req.params;

  console.log('Resize:', username, objectId, height, width);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    const objectIndex = profile.profiles.findIndex(
      (obj) => obj.id.toString() === objectId
    );

    if (objectIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Object not found in the profile' });
    }

    profile.profiles[objectIndex].height = height;
    profile.profiles[objectIndex].width = width;
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Profile object resized:', objectId);
    res
      .status(200)
      .json({ message: 'Profile object resized successfully', width, height });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Resize profile object error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeObjectsOfType = async (req, res) => {
  const { username } = req.params;

  console.log('Remove objects of type:', username);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await verifyUsernameMatch(token, username);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      console.log('User not found:', username);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({ user: user._id }).session(session);

    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Profile not found for the user' });
    }

    profile.profiles = profile.profiles.filter((obj) => {
      switch (obj.type) {
        case 'image':
          return !(obj.imgUrl === 'null');
        case 'text':
          return !(obj.content === null);
        case 'map':
          return !(
            obj.location.latitude === null && obj.location.longitude === null
          );
        default:
          return true;
      }
    });

    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log('Objects removed successfully');
    res.status(200).json({
      message: 'Objects removed successfully',
      ProfileObject: profile.profiles,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Remove objects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addProfileObject,
  getAllProfileObjects,
  setInitialProfile,
  updateProfileObject,
  setProfileDetails,
  deleteProfileObject,
  updateDisplayName,
  updateBio,
  uploadAvatar,
  resize,
  removeObjectsOfType,
  deleteAvatar,
};
