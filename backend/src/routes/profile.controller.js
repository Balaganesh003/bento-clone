const Profile = require('../models/profile.model');

// Controller to create a new profile detail
exports.createProfileDetail = async (req, res) => {
  const { userId } = req.params;
  const {
    type,
    id,
    baseUrl,
    userName,
    logo,
    bgColor,
    isAdded,
    content,
    location,
    imgUrl,
  } = req.body;

  try {
    const newProfileDetail = new Profile({
      user: userId,
      profiles: [
        {
          type,
          id,
          baseUrl,
          userName,
          logo,
          bgColor,
          isAdded,
          content,
          location,
          imgUrl,
        },
      ],
    });

    const savedProfile = await newProfileDetail.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error('Error creating profile detail:', error);
    res.status(500).json({ message: 'Failed to create profile detail' });
  }
};

// Controller to get all profile details for a user
exports.getAllProfileDetails = async (req, res) => {
  const { username } = req.params;

  try {
    const userProfiles = await Profile.findOne({ username });
    if (!userProfiles) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(userProfiles);
  } catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).json({ message: 'Failed to fetch profile details' });
  }
};

// Controller to update a profile detail
exports.updateProfileDetail = async (req, res) => {
  const { userId, profileId } = req.params;
  const updatedProfileData = req.body;

  try {
    const userProfiles = await Profile.findOne({ user: userId });
    if (!userProfiles) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const profileToUpdate = userProfiles.profiles.find(
      (profile) => profile.id === profileId
    );
    if (!profileToUpdate) {
      return res.status(404).json({ message: 'Profile detail not found' });
    }

    // Update profile detail with new data
    Object.assign(profileToUpdate, updatedProfileData);

    const savedProfile = await userProfiles.save();
    res.json(savedProfile);
  } catch (error) {
    console.error('Error updating profile detail:', error);
    res.status(500).json({ message: 'Failed to update profile detail' });
  }
};

// Controller to delete a profile detail
exports.deleteProfileDetail = async (req, res) => {
  const { userId, profileId } = req.params;

  try {
    const userProfiles = await Profile.findOne({ user: userId });
    if (!userProfiles) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    userProfiles.profiles = userProfiles.profiles.filter(
      (profile) => profile.id !== profileId
    );

    const savedProfile = await userProfiles.save();
    res.json(savedProfile);
  } catch (error) {
    console.error('Error deleting profile detail:', error);
    res.status(500).json({ message: 'Failed to delete profile detail' });
  }
};
