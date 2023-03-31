const { User } = require('../../models');
const path = require('path');
const fs = require('fs').promises;

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avaratURL = path.join('public', 'avatars', imageName);
        await User.findByIdAndUpdate(req.user._id, { avaratURL });
        res.json({ avaratURL });
    } catch (error) {
        await fs.unlink(tempUpload);
        res.status(401).json({
            msg: 'Not authorized....',
        });
    }
};
module.exports = updateAvatar;
