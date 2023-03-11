import express from 'express';
import userController from '../controllers';
import utils from '../utils';

const { Router } = express;
const { user } = userController;
const { auth } = utils;

const api = Router();

api.post('/login', user.login);


// get all users
// api.get('/all', auth.required,user.all);
api.get('/',user.all);

// create user
api.post('/signup', user.signup);

// Get a single user against given username
api.get('/:username',auth.required, user.one);


// update a single user against given id
api.put('/',auth.required, user.update);


// Delete a single user against given username
api.delete('/',auth.required, user.delete);

export default api;