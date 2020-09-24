const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/usermodel');


const authentication = async function(req, res, next) {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const { id } = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findOne({_id: id});

        if (!user) {
            throw new Error('expired token..')
        }
        req.user = user;
        next();
    } catch(e) {
        res.status(400).send({msg: "Invalid token"});
    }
}

module.exports = authentication;