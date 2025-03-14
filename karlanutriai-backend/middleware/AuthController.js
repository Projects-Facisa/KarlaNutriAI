import jwt from 'jsonwebtoken';
import userService from "../services/userService.js";
import bcrypt from "bcrypt";
import nutritionalDataService from "../services/nutritionalDataService.js";

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await userService.findUserByEmail(email);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Compare provided password with stored password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Access' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user: user._id },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        // Set cookie with token
        res.cookie("authToken", token, {
            maxAge: 1296000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });



        return res.status(200).json({ login: true, message: "SignIn successful" });

    } catch (error) {
        return res.status(400).json({ error: "Invalid authorization header" });
    }
}

export const logout = (req, res) => {

        // Clear the auth token cookie
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({message: "Logout successful."});
};

export const displayHome = async (req, res) => {
    try {
        const user = req.headers.user;
        const data = await nutritionalDataService.findDataByUserID(user)
        return res.status(200).json({display: !!data})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
