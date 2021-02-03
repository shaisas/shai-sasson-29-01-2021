'use strict';

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret'

module.exports = (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const token = jwt.sign({id: '1', name: 'shai'}, JWT_SECRET)
        req.user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return res.status(401).send({error: 'unauthorized user'});
    }
    next();
};