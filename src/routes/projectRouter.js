const { Router } = require("express");
const { authenticate } = require("../authentication");
const { authorizeRole } = require("../authorization");
const { getUserByUsername, ROLES, projects, getProjectByUserId } = require("../data");

const projectRouter = Router();

projectRouter.get("/:projectId", authenticate, authorizeProject, (req, res) => {
    return res.status(200).json(req.project);
})

projectRouter.get("/", authenticate, authorizeProjects, (req, res) => {
    return res.status(200).send(req.projects);
})

projectRouter.get("/user/:userId", authenticate, authorizeProjectsByUser, (req, res) => {
    return res.status(200).send(req.projects);
})

function authorizeProject(req, res, next) {
    const user = getUserByUsername(req.username);
    const project = projects.filter(project => project.id == req.params.projectId)[0];
    if (!project) return res.status(404).send({message: "Project not found."});
    if (user.id != project.user.id && !authorizeRole(user, [ROLES.ADMIN])) return res.status(401).send({message: "User not authorized."});
    req.project = project;
    next();
}

function authorizeProjects(req, res, next) {
    const user = getUserByUsername(req.username);
    if (user.role == ROLES.ADMIN) req.projects = projects;
    else req.projects = projects.filter(project => project.user.id == user.id);
    next();
}

function authorizeProjectsByUser(req, res, next) {
    const loggedUser = getUserByUsername(req.username);
    const projectsUser = req.params.userId;
    if (!authorizeRole(loggedUser, [ROLES.ADMIN])) return res.status(401).send({message: "User not authorized."});
    req.projects = getProjectByUserId(projectsUser);
    next();
}

module.exports = {
    projectRouter
}