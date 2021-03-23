const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginValidate, registerValidate} = require('./validate');

const userController = {
    login: async function (req, res) {

        const {error} = loginValidate(req.body);
        if(error) return res.status(400).send(error.message);

        const selectedUser = await User.findOne({email: req.body.email});

        if(!selectedUser) {
            return res.status(400).send('Email or Password incorrect');
        }

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        
        if(!passwordAndUserMatch) {
            return res.status(400).send('Email or Password incorrect');
        }

        const token = jwt.sign({_id: selectedUser._id, perfil: selectedUser.perfil}, process.env.TOKEN_SECRET);

        res.header('authorization-token', token);

        res.json({
            user: selectedUser.email, 
            token
        });
    },
    register: async function (req, res){

        const {error} = registerValidate(req.body);
        if(error) return res.status(400).send(error.message);

        const selectedUser = await User.findOne({email: req.body.email});

        if(selectedUser) {
            return res.status(400).send('Email already exists');
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            perfil: req.body.perfil
        });

        try {
            const savedUser = await user.save();
            res.send(savedUser);
            console.log(savedUser);
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
        }
    },
}

module.exports = userController;