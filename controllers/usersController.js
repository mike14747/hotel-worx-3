const router = require('express').Router();
const User = require('../models/user');
const { isUserBodyValid } = require('./validation/usersValidation');
const { idRegEx, idErrorObj } = require('./validation/idValidation');
const { postError, putError, deleteError } = require('./validation/generalValidation');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await User.getAllUsers();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await User.getUserById({ id: parseInt(req.params.id) || 0 });
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            username: req.body.username,
            password: req.body.password,
            access_id: req.body.access_id,
            active: req.body.active,
        };
        const [result, errorObj] = await isUserBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        paramsObj.password = result;
        const [data, error] = await User.addNewUser(paramsObj);
        if (error) next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ message: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        if (!idRegEx.test(req.body.user_id) || !idRegEx.test(req.body.access_id)) return res.status(400).json(idErrorObj);
        const paramsObj = {
            user_id: req.body.user_id,
            username: req.body.username,
            password: req.body.password,
            access_id: req.body.access_id,
            active: req.body.active,
        };
        const [result, errorObj] = await isUserBodyValid(paramsObj);
        if (!result) return res.status(400).json(errorObj);
        paramsObj.password = result;
        const [data, error] = await User.updateUserById(paramsObj);
        if (error) next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ message: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    if (!idRegEx.test(req.params.id)) return res.status(400).json(idErrorObj);
    try {
        const [data, error] = await User.deleteUserById({ id: parseInt(req.params.id) });
        if (error) next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ message: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
