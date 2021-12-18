import jwt from 'jsonwebtoken';

//middleware authorization
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(!token) res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.data = decoded;
        next();
    } catch (error) {
        res.sendStatus(403);
    }
}

export const checkA1 = (req, res, next) => {
    const role = req.data.role;
    if (role !== 'A1') {
        res.sendStatus(403);
    }else {
        next();
    }
}

export const checkA2 = (req, res, next) => {
    const role = req.data.role;
    if (role === 'A1' || role === 'A2') {
        next();
    }else {
        res.sendStatus(403);
    }
}

export const checkA3 = (req, res, next) => {
    const role = req.data.role;
    if (role === 'A1' || role === 'A2' || role === 'A3') {
        next();
    }else {
        res.sendStatus(403);
    }
}

export const checkB1 = (req, res, next) => {
    const role = req.data.role;
    if (role === 'B2') {
        res.sendStatus(403);
    }else {
        next();
    }
}