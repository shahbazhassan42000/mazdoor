import _ from 'lodash';
const { includes, keys, size } = _;
import mongoose from 'mongoose';
import passport from 'passport';
import role from "../utils/role.js";

import '../models/user.js';
import '../utils/passport.js';

const User = mongoose.model('users');

export default {
    login(req, res, next) {
        if (!req.body.user || size(req.body.user) !== 2) {
            return res.sendStatus(400);
        }
        let check = check_login_requiredFields(req.body.user);
        if (check !== '') {
            return res.status(422).json({errors: check});
        }
        console.log('Log in');
        passport.authenticate('local', {session: false}, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (user) {
                console.log('user:', user);
                user.token = user.generateJWT();
                return res.status(200).json({user: user.toAuthJSON()});
            } else {
                console.log('error:', info);
                return res.status(422).json(info);
            }
        })(req, res, next);
    },
    all(req, res) {
        console.log('Fetching all users . . .');
        User.find({}).then(function (users) {
            if (users)
                return res.status(200).json(users);
            return res.status(404).json({msg: 'no users found'});
        }, err => {
            console.log(err);
            return res.status(400).json({msg: 'ERROR!!! While fetching users.'});
        });

    },
    signup(req, res, next) {
        if (!req.body.user || size(req.body.user) !== 4) {
            return res.sendStatus(400);
        }
        let check = check_signup_requiredFields(req.body.user);
        if (check !== '') {
            return res.status(422).json({errors: check});
        }
        console.log('Creating User . . . ');
        let user = new User();
        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.role = req.body.user.role;
        user.setPassword(req.body.user.password);

        user.save().then(() => {
            return res.status(201).json({user: user.toAuthJSON()});
        }, error => {
            console.log(error.errors[keys(error.errors)[0]]["properties"]["message"]);
            return res.status(400).json({
                type: keys(error.errors)[0],
                msg: error.errors[keys(error.errors)[0]]["properties"]["message"]
            });
        }).catch(next);
    },
    one(req, res, next) {
        console.log("Find by username");
        const username = req.params.username;
        console.log("USERNAME:", username)
        if (!username || username === "" || username === ":username") {
            return res.sendStatus(400);
        }
        console.log('Getting a user');
        User.findOne({username}).then(user => {
            if(user) return res.status(200).json({user: user.toAuthJSON()});
            else next();
        }).catch(next);
        // User.findById(req.payload.id).then(function (user) {
        //     if (!user) {
        //         return res.sendStatus(401);
        //     }
        //     console.log('Fetching a user');
        //     return res.status(200).json({user: user.toAuthJSON()});
        // }).catch(next);
    },
    update(req, res, next) {
        if (req.body.user) {
            User.findByIdAndUpdate(req.body.user.id, {image: req.body.user.image},
                function (err) {
                    if (err) {
                        return res.sendStatus(401);
                    } else {
                        User.findById(req.body.user.id).then(function (user) {
                            if (!user) {
                                return res.sendStatus(401);
                            }
                            return res.status(200).json({user: user.toAuthJSON()});
                        }).catch(next);
                    }
                });
        } else {
            return res.sendStatus(400);
        }
    }, delete(req, res) {
        User.findByIdAndRemove(req.payload.id,
            function (err) {
                if (err) {
                    return res.sendStatus(401);
                } else {
                    return res.sendStatus(204);
                }
            });
    }
};

const check_signup_requiredFields = (user) => {
    if (!user.username) {
        return {username: 'can\'t be blank'};
    }
    if (!user.email) {
        return {email: 'can\'t be blank'};
    }
    if (!user.password) {
        return {password: 'can\'t be blank'};
    }
    if (!user.role) {
        return {role: 'can\'t be blank'};
    } else if (!includes(role, user.role)) {
        return {role: 'is not supported yet'};
    }
    return '';
}

const check_login_requiredFields = (user) => {
    if (!user.username) {
        return {username: 'can\'t be blank'};
    }
    if (!user.password) {
        return {password: 'can\'t be blank'};
    }
    return '';
}
