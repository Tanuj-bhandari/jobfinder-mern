import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const adminRegister = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists with this email",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Admin registered successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const tokenData = {
            adminId: admin._id
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare the admin data to send in the response
        const userData = {
            email: admin.email,
            role: admin.role
        };

        return res.status(200)
            .cookie("token", token, { 
                maxAge: 1 * 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: 'strict' 
            })
            .json({
                message: "Login successful",
                user: userData, // Include only email and role in the response
                success: true
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Admin Logout
export const adminLogout = async (req, res) => {
    try {
        // Clear the cookie on the client-side
        res.clearCookie("token", { httpOnly: true, sameSite: 'strict' });

        return res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


