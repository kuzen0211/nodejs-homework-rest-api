const User = require('../../models/userModel');
const gravatar = require('gravatar');
const { AppError } = require('../../utils');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../middlewares');
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return next(new AppError(409, `User with ${email} already exist`));
        }

        const avatarURL = gravatar.url(email);

        const verificationCode = uuidv4();

        const newUser = new User({ ...req.body, avatarURL, verificationCode });

        const verifyEmail = {
            to: email,
            subject: 'Verify email',
            html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${verificationCode}'>Click verify email</a>`,
        };

        await sendEmail(verifyEmail);

        newUser.setPassword(password);
        newUser.save();

        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                user: {
                    email,
                    password,
                    avatarURL,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = register;
