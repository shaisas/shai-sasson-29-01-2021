'use strict';

const express = require('express')
const router = new express.Router()
const authMiddleware = require('../middlewares/auth')
const { validateCreateMail, validateEditMail } = require('../middlewares/validation')
const User = require('../models/user')
const { Types } = require('mongoose')

router.post('/mail/create', validateCreateMail, authMiddleware, async ({ body: { receiverId, subject, paragraph } }, res) => {
    try {
        const receiver = await User.findOne({ id: receiverId });
        if (!receiver) {
            return res.status(404).send({ error: 'receiver not found' })
        }
        const mail = { receiver: { id: receiver.id, name: receiver.name}, sender: { id: '9', name: 'aa'}, subject, paragraph }
        receiver.mails.push(mail);
        await receiver.save();
        return res.status(201).send({ mail });
    } catch (e) {
        return res.status(500).send(e)
    }
});

router.get('/mail/all', authMiddleware, async ({ user }, res) => {
    try {
        const userDoc = await User.findOne({ id: user.id });
        if (!userDoc) {
            return res.status(404).send({ error: 'user not found' })
        }
        return res.status(200).send({ mails: userDoc.mails });
    } catch (e) {
        return res.status(500).send(e)
    }
});

router.put('/mail/:id', validateEditMail, authMiddleware, async ({ params: { id: mailId }, body: { toUpdate }, user }, res) => {
    try {
        const userDoc = await User.findOne({ id: user.id });
        if (!userDoc) {
            return res.status(404).send({ error: 'user not found' })
        }
        const mail = await User.findOneAndUpdate(
            {
                id: user.id,
                mails: {
                    $elemMatch: { _id: new Types.ObjectId(mailId) }
                }
            },
            {
                $set: { [`mails.$.${toUpdate.key}`]: toUpdate.value }
            },
            { new: true }
        );
        return res.status(200).send({ mail });
    } catch (e) {
        return res.status(500).send(e)
    }
});

module.exports = router