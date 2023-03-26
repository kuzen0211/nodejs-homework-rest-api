const User = require('../../models/userModel');

const { AppError } = require('../../utils');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return next(new AppError(409, `User with ${email} already exist`));
        }

        const newUser = new User({ name, email });

        newUser.setPassword(password);
        newUser.save();

        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                user: {
                    email,
                    password,
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
