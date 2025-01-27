const Contact = require('../../models/contactModel');
const { AppError } = require('../../utils');

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const contact = await Contact.findByIdAndRemove(contactId);

        if (!contact) {
            return next(new AppError(404, 'Not found'));
        }

        res.status(200).json({
            msg: 'Contact deleted',
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = remove;
