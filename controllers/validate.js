const joi = require('@hapi/joi');

const registerValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required().min(3).max(50),
        email: joi.string().required().min(3).max(50),
        password: joi.string().required().min(6).max(100),
        perfil: joi.string().required().min(2).max(10)
    });

    return schema.validate(data);
}

const loginValidate = (data) => {
    const schema = joi.object({
        email: joi.string().required().min(3).max(50),
        password: joi.string().required().min(6).max(100)
    });

    return schema.validate(data);
}

const requisitionValidate = (data) => {
    const schema = joi.object({
        number: joi.string().required().min(1).max(4),
        section: joi.string().required().min(2).max(15),
        type: joi.string().required().min(2).max(15),
        responsible: joi.string().required().min(2).max(25),
        object: joi.string().required().min(2).max(300),
        value: joi.number().required().min(1),
    });

    return schema.validate(data);
}

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;
module.exports.requisitionValidate = requisitionValidate;
