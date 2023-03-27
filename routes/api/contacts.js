const express = require('express');

const router = express.Router();

const { auth, isValidId } = require('../../middlewares');
const {
    getAll,
    getById,
    add,
    remove,
    uptade,
    updateFavorite,
} = require('../../controllers/contacts');

router.get('/', auth, getAll);

router.get('/:contactId', isValidId, getById);

router.post('/', auth, add);

router.delete('/:contactId', isValidId, remove);

router.put('/:contactId', isValidId, uptade);

router.patch('/:contactId/favorite', isValidId, updateFavorite);

module.exports = router;
