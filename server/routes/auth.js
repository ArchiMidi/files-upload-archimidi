const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcrypt')


//sign up


router.post('/signup', (req, res, next) => {
    console.log(req.body)

    const { username, password } = req.body
    if (password.length < 4) {
        res.status(400).json({ message: 'Your password should be longer than 4 characters!' })
        return;
    }

    if (username.length === 0) {
        res.status(400).json({ message: 'Username cannot be empty' })
        return;
    }

    User.findOne({ username: username })
        .then(userFromDb => {
            if (userFromDb !== null) {
                res.status(400).json({ message: 'Username is already taken' })
            } else {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(password, salt);
                console.log(hash);

                //create user
                User.create({ username: username, password: hash })
                    .then(createdUser => {
                        console.log(createdUser)
                        // req.session.user = createdUser;
                        res.status(200).json(createdUser)
                    })
                    .catch(err => next(err));
            }
        })
})

module.exports = router