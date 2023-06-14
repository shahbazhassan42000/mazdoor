import express from "express";
import projectController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { project } = projectController;

const api = Router();

// get all project
api.get("/", auth.authenticate, project.all);

// create new project
api.post("/", auth.authenticate, project.create);




export default api;
