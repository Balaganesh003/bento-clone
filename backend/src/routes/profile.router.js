const express = require('express');
const router = express.Router();
const profileController = require('./profile.controller');
const authMiddleware = require('../authMiddleware');

router.get('/:username', profileController.getAllProfileObjects);

router.use(authMiddleware);

router.put('/replace/:username', profileController.setProfileDetails);
router.put('/displayname/:username', profileController.updateDisplayName);
router.put('/bio/:username', profileController.updateBio);
router.post('/avatar/:username', profileController.uploadAvatar);
router.post('/:username', profileController.addProfileObject);
router.put('/:username', profileController.updateProfileObject);
router.delete('/:username/:objectId', profileController.deleteProfileObject);

module.exports = router;
