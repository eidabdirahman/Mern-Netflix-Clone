import jwt from 'jsonwebtoken';
import { envVars } from '../Config/envVars.js';

export const generateTokenAndSetCookies = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "30days"});

    res.cookie("jwt-netflix", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: envVars.NODE_ENV !== "development"
    })
    return token;
}