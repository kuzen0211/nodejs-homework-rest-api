const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const { AppError } = require('../../utils');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return next(new AppError(409, `User with ${email} already exist`));
        }

        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        await User.create({ name, email, password: hashPassword });

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
