const express = require('express');
const {
    getCurrent,
    updateSubscription,
    updateAvatar,
} = require('../../controllers/users');
const { auth, validation, upload } = require('../../middlewares');
const { updateSubscriptionSchema } = require('../../utils');
const router = express.Router();

router.get('/current', getCurrent);

router.patch(
    '/',
    auth,
    validation(updateSubscriptionSchema),
    updateSubscription
);

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

module.exports = router;
