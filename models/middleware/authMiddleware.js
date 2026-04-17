const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

// 🟢 NEW: Check if user is a Hotel Manager
const isPartner = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'partner' || req.user.role === 'superadmin') {
            next();
        } else {
            res.status(403).json({ error: "Partner access required." });
        }
    });
};

// 🟢 NEW: Check if user is the CEO (You)
const isSuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'superadmin') {
            next();
        } else {
            res.status(403).json({ error: "Superadmin access required." });
        }
    });
};

module.exports = { verifyToken, isPartner, isSuperAdmin };