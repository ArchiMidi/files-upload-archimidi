const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');


//************<-----------------Signup--------------->****************//

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
                        req.session.user = createdUser;
                        res.status(200).json(createdUser)
                    })
                    .catch(err => next(err));
            }
        })
});

//************<-----------------Log in--------------->****************//

router.post('/login', (req, res, next) => {

    //destructure req.body to get username and password
    const { username, password } = req.body;
    //then we check the users DB to see if we have a user with the same username
    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB === null) {
                //we haven't found a user, you have entered the wrong information
                res.status(400).json({ message: 'Incorrect username or password' })
            }

            //if we get to this point, the username is correct
            //we then check the password from the user input against the hash in the database
            //compareSync returns a bool, true/false
            if (bcrypt.compareSync(password, userFromDB.password)) {
                //does it match? if yes all creds are correct and the user ca log in
                req.session.user = userFromDB;
                res.status(200).json(userFromDB);

            } else {

                res.status(400).json({ message: 'incorrect username or password' })
            }
        })
})


router.get('/loggedin', (req, res) => {

    console.log("User is", req.session.user)
    const user = req.session.user
    res.json(user);
});

router.delete('/logout', (req, res, next) => {
    req.session.destroy();
    res.status(200).json({ message: "Logged out" })
});






module.exports = router