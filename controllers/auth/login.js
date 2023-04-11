const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { AppError } = require('../../utils');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            return next(new AppError(401, 'Email or password is wrong'));
        }

        if (!user.verify) {
            return next(new AppError(404, 'User not found'));
        }

        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '1h',
        });
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            status: 'seccess',
            code: 200,
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = login;
