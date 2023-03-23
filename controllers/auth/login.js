const User = require('../../models/user');
const { AppError } = require('../../utils');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            return next(new AppError(401, 'Email or password is wrong'));
        }
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = register;
