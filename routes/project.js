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

// delete project
api.delete("/:id", auth.authenticate, project.delete);

//get Project by id
api.get("/:id", auth.authenticate, project.get);

// update project
api.put("/:id", auth.authenticate, project.update);

//get Project by user ID
api.get("/user/:id", auth.authenticate, project.getByUserId);




export default api;
