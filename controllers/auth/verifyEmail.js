const { User } = require('../../models');
const { AppError } = require('../../utils');

const verifyEmail = async (req, res, next) => {
    const { verificationCode } = req.params;

    const user = await User.findOne({ verificationCode });

    if (!user) {
        return next(AppError(404, 'User not found'));
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationCode: '',
    });

    res.status(201).json({
        message: 'Verification successful',
    });
};

module.exports = verifyEmail;
