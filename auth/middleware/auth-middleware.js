const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(404).json({
            sucess: false,
            message: 'Acess denied. No token provided.'
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decodedToken);

        req.userInfo = decodedToken;
        next(); // pass control to next handler

    } catch (error) {
        return res.status(404).json({
            sucess: false,
            message: 'Acess denied. No token provided.'
        })
    }
};

module.exports = authMiddleware;