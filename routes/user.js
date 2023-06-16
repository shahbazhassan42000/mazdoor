import express from "express";
import userController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { user } = userController;

const api = Router();

//check email availability
api.post('/check-email', user.checkEmail);


api.post('/login', user.login);


// get all users
api.get('/', auth.authenticate, auth.authorize('ADMIN'), user.all);
// api.get('/',user.all);

// create user
api.post('/signup', user.signup);

// Get a single user against given username
api.get('/one/:username', auth.authenticate, user.one);

//get user by token
api.get('/getByToken', auth.authenticate, user.getByToken);


// update a single user against given id
api.put('/', auth.authenticate, user.update);


// Delete a single user against given username
api.delete('/:id', auth.authenticate, auth.authorize('ADMIN'), user.delete);
// api.delete('/', user.delete);

//get users by role
api.get('/getUserByRole/', user.getUsersByRole);

//verify email
api.get('/verification/:id/verify/:token', user.verifyEmail);




export default api;
