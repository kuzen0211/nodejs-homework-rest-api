const { AppError } = require('../../utils');
const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { body } = req;

        if (Object.keys(body).length === 0) {
            return next(new AppError(400, 'Missing field subscription'));
        }

        const contact = await User.findByIdAndUpdate(_id, body, {
            new: true,
        });

        res.status(200).json({
            result: contact,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = updateSubscription;
