const express = require('express');
const { getCurrent, updateSubscription } = require('../../controllers/users');
const { auth, validation } = require('../../middlewares');
const { updateSubscriptionSchema } = require('../../utils');
const router = express.Router();

router.get('/current', getCurrent);
router.patch(
    '/',
    auth,
    validation(updateSubscriptionSchema),
    updateSubscription
);

module.exports = router;
