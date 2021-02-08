'use strict';

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token ||req.cookies.token;
        req.user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return res.status(401).send({error: 'unauthorized user'});
    }
    next();
};