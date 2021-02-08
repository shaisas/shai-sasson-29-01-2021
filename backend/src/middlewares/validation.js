const joi = require('joi')

loginSchema = {
    id: joi.string().required()
}

signUpSchema = {
    id: joi.string().required(),
    name: joi.string().required()
}

createMailSchema = {
    receiverId: joi.string().required(),
    subject: joi.string().allow(null, ''),
    paragraph: joi.string().allow(null, ''),
    token: joi.string().required()
}

editMailSchema = {
    toUpdate: joi.object({
        key: joi.string().valid(...['isRead', 'isFavorites', 'isDeleted']),
        value: joi.boolean()
    }),
    token: joi.string().required()
}

const validateLogin = (req, res, next) => {
    try {
        let validation = joi.object(loginSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

const validateSignUp = (req, res, next) => {
    try {
        let validation = joi.object(signUpSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

const validateCreateMail = (req, res, next) => {
    try {
        let validation = joi.object(createMailSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

const validateEditMail = (req, res, next) => {
    try {
        let validation = joi.object(editMailSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

module.exports = {
    validateLogin,
    validateSignUp,
    validateCreateMail,
    validateEditMail
}