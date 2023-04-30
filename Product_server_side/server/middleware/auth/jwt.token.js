const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken =  (req, res, next) => {
    if(!req.headers.token) {
        return res.status(401).send('Unauthorized Request No APIKey');
    }
    const token = req.headers.token;

    if(!token) {
        return res.status(401).send('Unauthorized Request No token');
    }
    else if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err) {
                return res.status(401).send('Unauthorized Request payload');
            }
            req.payload=payload
            next();
        });
    }

};
module.exports= verifyToken;