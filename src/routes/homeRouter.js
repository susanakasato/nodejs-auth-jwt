const { Router } = require("express");
const { authenticate } = require("../authentication");
const { authorizeRole } = require("../authorization");
const { ROLES, getUserByUsername } = require("../data");

const homeRouter = Router();

homeRouter.get("/", authenticate, authorizeHome, (req, res) => {
    return res.status(200).send({message: "Welcome to your home page!", username: req.username});
})

homeRouter.get("/admin", authenticate, authorizeHomeAdmin, (req, res) => {
    return res.status(200).send({message: "Welcome to you admin home page!", username: req.username});
})

function authorizeHome(req, res, next) {
    const user = getUserByUsername(req.username);
    if (!authorizeRole(user, [ROLES.BASIC])) return res.status(401).send({message: "User not authorized."});
    next();
}

function authorizeHomeAdmin(req, res, next) {
    const user = getUserByUsername(req.username);
    if (!authorizeRole(user, [ROLES.ADMIN])) return res.status(401).send({message: "User not authorized."});
    next();
}

module.exports = {
    homeRouter
}

