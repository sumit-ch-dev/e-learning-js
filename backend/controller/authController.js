const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Auth = require("../models/authModel");
const HTTP_STATUS = require("../constants/statusCodes");
const sendResponse = require("../utils/common");

const register = async (req, res) => {
    try {
        // console.log(req.body)
        const { username, email, password, role, firstName, lastName } = req.body;
        const existingUser = await Auth.findOne({ email });
        // console.log(existingUser)
        if (existingUser) {
            return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "user already exists")
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            profile: {
                firstName: firstName,
                lastName: lastName
            }
        });
        console.log(newUser, "new user")

        // Save the user to the database
        const user = await newUser.save();

        console.log(user)

        const userId = user._id;
        console.log(userId)

        const newAuth = new Auth({
            user: userId,
            role,
            email,
            password: hashedPassword,
        });

        await newAuth.save();

        // res
        //     .status(HTTP_STATUS.CREATED)
        //     .json({ success: true, message: "User registered successfully", user: newUser });
        return sendResponse(res, HTTP_STATUS.CREATED, "new registration successfull", newUser);
    } catch (error) {
        // res.status(500).json({ message: "internal server error" });
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal server error", error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check for user email
        const auth = await Auth.findOne({ email });
        // console.log(auth)
        const user = await User.findOne({ email });

        if (!auth) {
            // return res.status(200).json({ success: false, message: "user not found" })
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "user not found")
        }

        const tokenData = {
            id: user.id,
            email: auth.email,
            role: auth.role
        }

        if (auth && (await bcrypt.compare(password, auth.password))) {
            // return sendResponse(res, HTTP_STATUS.OK, "user logged in")
            return sendResponse(res, HTTP_STATUS.OK, "User logged in", {
                success: true,
                _id: auth.id,
                email: auth.email,
                token: generateToken(tokenData),
            })
        } else {
            // res.status(200).json({ success: false, message: "Invalid Credentials" });
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid Credentials")
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }
};

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};



module.exports = { register, login }