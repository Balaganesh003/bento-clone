const express = require('express');
const router = express.Router();
const profileController = require('./profile.controller');
const authMiddleware = require('../authMiddleware');

router.get(
  '/:username',
  authMiddleware,
  profileController.getAllProfileObjects
);
router.put(
  '/replace/:username',
  authMiddleware,
  profileController.setProfileDetails
);
router.put(
  '/displayname/:username',
  authMiddleware,
  profileController.updateDisplayName
);
router.put('/bio/:username', authMiddleware, profileController.updateBio);
router.post(
  '/avatar/:username',
  authMiddleware,
  profileController.uploadAvatar
);
router.post('/:username', authMiddleware, profileController.addProfileObject);
router.put('/:username', authMiddleware, profileController.updateProfileObject);
router.delete(
  '/:username/:objectId',
  authMiddleware,
  profileController.deleteProfileObject
);

module.exports = router;
