const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users, getRole } = require("../data");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    const userFilter = users.filter(auxUser => auxUser.username == user.username);
    if (userFilter.length == 0) return res.status(401).send({message: "Username does not exist."});
    if (await bcrypt.compare(user.password, userFilter[0].password)) { 
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).send({token: token});
    } else return res.status(401).send({message: "Invalid password."});
})

userRouter.get("/", (req, res) => {
    return res.json(users).status(200).send();
})

userRouter.post("/", async(req, res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const newId = users.reduce((prev, curr) => {
        return curr.id > prev.id ? curr : prev;
    })
    const user = {
        id: newId.id + 1,
        username: username,
        password: hashedPassword,
        role: getRole(req.body.role)
    }
    users.push(user);
    return res.status(201).send({
        id: user.id,
        username: user.username,
        role: user.role
    });
})

module.exports = {
    userRouter
}