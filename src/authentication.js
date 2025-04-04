const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ROLES, getUserByUsername } = require("./data");

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).send({message: "User not identified."});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({message: "Not authorized"});
        req.username = user.username;
        next();
    })
}

module.exports = {
    authenticate
}