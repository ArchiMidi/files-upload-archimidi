const router = require('express').Router();
const User = require('../models/User.model')
const bcrypt = require('bcrypt')


//sign up


router.post('/signup', (req, res, next) => {

    const { username, password } = req.body
    if (password.length < 4) {
        res.status(400).json({ message: 'Your password should be longer than 4 characters!' })
        return;
    }

    if (username.length === 0) {
        res.status(400).json({ message: 'Username cannot be empty' })
        return;
    }
})