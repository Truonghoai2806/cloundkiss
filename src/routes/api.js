const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const routerAPI = express.Router();

routerAPI.all("*", auth);

// Route API đơn giản
routerAPI.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", getAccount);

module.exports = routerAPI;
