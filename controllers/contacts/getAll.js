const Contact = require('../../models/contactModel');

const getAll = async (req, res) => {
    try {
        const { _id } = req.user;
        const { page = 1, limit = 10, favorite } = req.query;
        const skip = (page - 1) * limit;

        const findParams = favorite ? { owner: _id, favorite } : { owner: _id };

        const allContacts = await Contact.find(findParams, '', {
            skip,
            limit: Number(limit),
        }).populate('owner', '_id name email');

        res.status(200).json({
            result: allContacts,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = getAll;
