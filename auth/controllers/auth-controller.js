const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with the same username or email.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // simpler

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully!'
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again."
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // find if the curr user is exists in database or not
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Invalid Credentials`
            })
        }

        // if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        // create user token
        const accessToken = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1m' }
        );

        res.status(200).json({
            success: true,
            message: 'Logged in successful',
            accessToken
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again."
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        // extract old and new password;
        const { oldPassword, newPassword } = req.body;

        // find the current logged user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        // check if the old pass is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Old password is now correct. Try again.'
            })
        }

        // hash the new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // update user password
        user.password = newHashedPassword
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully!'
        });


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again."
        })
    }
}

module.exports = { registerUser, loginUser, changePassword }