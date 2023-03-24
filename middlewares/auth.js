const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../utils');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    console.log('hello');
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    try {
        if (bearer !== 'Bearer') {
            return next(new AppError(401, 'Not authorized'));
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        console.log(user);

        if (!user) {
            return next(new AppError(401, 'Not authorized'));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'Invalid sugnature') {
            error.status = 401;
        }
        next(error);
    }
};

module.exports = auth;
