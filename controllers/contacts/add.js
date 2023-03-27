const Contact = require('../../models/contactModel');

const { AppError } = require('../../utils');
const { createContactValidator } = require('../../utils');

const add = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { error, value } = createContactValidator(req.body);

        if (error) {
            return next(new AppError(404, error.details[0].message));
        }

        const addContact = await Contact.create({ ...value, owner: _id });

        res.status(201).json({
            result: addContact,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = add;
