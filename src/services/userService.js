require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { name } = require("ejs");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const createService = async (name, email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log(`Email already exists: ${email}`);
            return null;
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: "user"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const LoginService = async (email1, password) => {
    try {
        const user = await User.findOne({ email: email1 }).exec();
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password is incorrect"
                }
            } else {
                const payload = {
                    email: user.email,
                    name: user.name,
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );
                return {
                    EC: 0,
                    access_token, user: {
                        email: user.email,
                        name: user.name,
                    }
                };
            }

        } else {
            return {
                EC: 1,
                EM: 'Email/Password is incorrect'
            };
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createService, LoginService, getService
}