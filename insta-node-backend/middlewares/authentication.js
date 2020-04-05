const jwt = require('jsonwebtoken');

authenticator = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token)
        return res.status(401).send({
            success: false,
            payload: {
                message: "Token Not Provided. Hence, Unauthorized"
            }
        });

    try {
        const payload = jwt.verify(token.replace('Bearer ', ''), 'secretkey');
        req.user = payload;
        next();
    } catch (e) {
        res.status(400).send({
            success: false,
            payload: {
                message: "Invalid Token"
            }
        });
    }
}

module.exports = authenticator;