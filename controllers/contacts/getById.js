const Contact = require('../../models/contactModel');
const { AppError } = require('../../utils');

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            next(new AppError(404, 'Not found'));
        }

        res.status(200).json({
            result: contact,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = getById;
