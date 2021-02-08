'use strict';

const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const { validateLogin, validateSignUp } = require('../middlewares/validation')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/auth/signup', validateSignUp, async ({ body: { id, name} }, res) => {
    const user = new User({ id, name})
    try {
        const doesUserExit = await User.exists({ id });
        if (doesUserExit) {
            return res.status(409).send({ error : 'user already exist' });
        }
        await user.save();
        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
        res.cookie('token', token, { domain: process.env.DOMAIN });
        return res.status(201).send({ user, token });
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.post('/auth/login', validateLogin, async ({ body: { id } }, res) => {
    try {
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).send({ error: 'user not found' });
        }
        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
        res.cookie('token', token, { domain: process.env.DOMAIN });
        return res.status(200).send({ user, token });
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router