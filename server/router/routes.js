const express = require('express');
const router = new express.Router();
const authentication = require('../middleware/authentication');

const User = require('../models/usermodel');

router.get('/', (req, res) => {
    res.send("hellow weorlsad");
});

router.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
       await user.save();
       res.status(201).send({status: "SUC", msg: "Signup success"});
    } catch(e) {
        console.log(e.code);
        let msg = (e.code === 11000) ? "Email already exists" : "something sent wrong";
        res.status(400).send({status: "FAIL", msg});
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.doesUserExists(req.body);
        if(user) {
            const token = await user.generateToken();
            res.status(200).send({tasks: user.tasks, token});
        }
    } catch(e) {
        // console.log(e.message);
        res.status(400).send({status: "FAIL", msg: e.message});
    }    
});

router.post('/addtask', authentication, async (req, res) => {

    try {
        const user = req.user;
        const {isCompleted, description} = req.body;
        user.tasks.push({isCompleted, description});

        await user.save();
        res.status(200).send({status: "SUC"});
    } catch(e) {
        console.log(e);
        res.status(400).send({status: "FAIL",msg: "Something went wrong"});
    }
});

router.get('/tasks', authentication, async (req, res) => {
    const tasks = req.user && req.user.tasks;
    res.status(200).send({tasks})
});

router.delete('/removetask', authentication, async (req, res) => {

    try {
        const taskId = req.header('_id');
        const user = req.user;
        user.tasks.pull({_id: taskId});
        await user.save();
        res.status(200).send({msg: "SUC"});
    } catch(e) {
        console.log(e);
        res.status(400).send({msg: "FAIL"});
    }
});

module.exports = router;