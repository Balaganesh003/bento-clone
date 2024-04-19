const express = require('express');
const router = express.Router();
const profileController = require('./profile.controller');

router.get('/:username', profileController.getAllProfileObjects);
router.post('/:username', profileController.addProfileObject);
router.put('/:username', profileController.updateProfileObject);
router.delete('/:username/:objectId', profileController.deleteProfileObject);

module.exports = router;
