const { sendEmail } = require('../../middlewares');
const { User } = require('../../models');
const { AppError } = require('../../utils');
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(AppError(400, 'Missing required field email'));
    }
    if (user.verify) {
        return next(AppError(400, 'Verification has already been passed'));
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationCode}'>Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json('Verification email sent');
};

module.exports = resendVerifyEmail;
