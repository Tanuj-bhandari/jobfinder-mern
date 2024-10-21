import { Other } from "../models/other.model.js"; 
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const createOther = async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        // Validate input fields
        if (!title || !description || !questions) {
            return res.status(400).json({
                message: "Title, description, and questions are required",
                success: false
            });
        }

        const file = req.file;
        // Validate file
        if (!file) {
            return res.status(400).json({
                message: "File (icon) is required",
                success: false
            });
        }

        // Convert file to data URI
        const fileUri = getDataUri(file);
        // Upload to Cloudinary
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Create a new entry in the database
        const newOther = await Other.create({
            title,
            description, // Changed from desc to description
            questions,
            file: cloudResponse.secure_url, 
        });

        return res.status(201).json({
            message: "Document uploaded successfully",
            other: newOther,
            success: true
        });
    } catch (error) {
        console.error('Error creating document:', error.message); // Log detailed error message
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
