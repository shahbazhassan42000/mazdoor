import express from "express";
import userController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { laborsType } = userController;

const api = Router();


//get all types
api.get('/',auth.authenticate, laborsType.getAll);

//add type
api.post('/',auth.authenticate, laborsType.add);

//get type by name
api.get('/:name',auth.authenticate, laborsType.getByName);

export default api;
