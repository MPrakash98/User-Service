const jwt = require('jsonwebtoken');

// Middleware function used for checking if user is logged or not
exports.checkLogin = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.status(401).send({ message: "Please Add token" });
    jwt.verify(token, 'secret', (err, user) => {
        if (err) res.status(403).send({ message: "Invalid Token", invalid_token: 1 });
        req.user = user
        next();
    })
}