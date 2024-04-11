const jwt = require('jsonwebtoken');

module.exports = {
    authMiddleware: function ({ req }) 
    {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.header.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, process.env.SECRET, { maxAge: process.env.EXPIRATION });
            req.user = data;
            console.log(req.user);
        } catch {
            console.log('Invalid Token');
        }

        return req;
    },

    signToken: function ({ email, username, _id, orgName, accessLevel }) {
        const payload = { email, username, _id, orgName, accessLevel };
        return jwt.sign({ data: payload}, secret, { expiresIn: expiration });
    },
};