const { createService, LoginService, getService } = require("../services/userService");

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createService(name, email, password);
    return res.status(200).json(data);
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await LoginService(email, password);
    return res.status(200).json(data);
}

const getUser = async (req, res) => {
    const data = await getService();
    return res.status(200).json(data);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    createUser, handleLogin, getUser, getAccount
}