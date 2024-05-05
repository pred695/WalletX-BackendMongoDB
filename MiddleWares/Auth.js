const jwt = require('jsonwebtoken');
const User = require('../Models/User');

module.exports.verifyUser = (req, resp, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                async (err, decodedToken) => {
                    if (err) {
                        console.error(err);
                        resp.status(401).json({ message: 'Unauthorized' });
                    } else {
                        console.log(decodedToken)
                        next();
                    }
                }
            )
        } else {
            resp.status(401).json({ message: 'Unauthorized' }); // Return an unauthorized response
        }
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
};