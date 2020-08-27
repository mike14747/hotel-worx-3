const router = require('express').Router();
const User = require('../models/user');
const { postError, putError, deleteError } = require('./utils/errorMessages');
const { usersSchema, userIdSchema } = require('./validation/schema/usersSchema');
const isUserIdValid = require('./validation/helpers/isUserIdValid');
const isAccessIdValid = require('./validation/helpers/isAccessIdValid');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await User.getAllUsers();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await userIdSchema.validateAsync({ user_id: req.params.id });
        const [data, error] = await User.getUserById({ id: parseInt(req.params.id) });
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
        await usersSchema.validateAsync(paramsObj);
        await isAccessIdValid(paramsObj.access_id);
        paramsObj.password = bcrypt.hashSync(paramsObj.password, salt);
        const [result, err] = await User.checkUsernameExists({ username: paramsObj.username });
        if (result && result.length > 0) return res.status(400).json({ 'Invalid request': 'the submitted username (' + paramsObj.username + ') already exists' });
        if (err) return next(err);
        const [data, error] = await User.addNewUser(paramsObj);
        if (error) return next(error);
        data && data.insertId ? res.status(201).json({ insertId: data.insertId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            user_id: req.body.user_id,
            username: req.body.username,
            password: req.body.password,
            access_id: req.body.access_id,
            active: req.body.active,
        };
        await usersSchema.validateAsync(paramsObj);
        await isUserIdValid(paramsObj.user_id);
        await isAccessIdValid(paramsObj.access_id);
        paramsObj.password = bcrypt.hashSync(paramsObj.password, salt);
        const [result, err] = await User.checkUsernameExists({ username: paramsObj.username });
        if (result && result.length > 0) return res.status(400).json({ 'Invalid request': 'the submitted username (' + paramsObj.username + ') already exists' });
        if (err) return next(err);
        const [data, error] = await User.updateUserById(paramsObj);
        if (error) return next(error);
        data && data.affectedRows === 1 ? res.status(204).end() : res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await userIdSchema.validateAsync({ user_id: req.params.id });
        await isUserIdValid(req.params.id);
        const [data, error] = await User.deleteUserById({ id: parseInt(req.params.id) });
        if (error) return next(error);
        data && data.affectedRows > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
