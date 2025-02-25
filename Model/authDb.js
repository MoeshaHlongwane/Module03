import {pool }from "../config/config.js";
import bcrypt from "bcryptjs";



const registerUser = async (name, email, password, phone, address) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user into the database
        const query = `
            INSERT INTO users (name, email, password, phone, address) 
            VALUES (?, ?, ?, ?, ?);
        `;
        const [result] = await pool.query(query, [name, email, hashedPassword, phone, address]);
        
        // Get the newly inserted user_id
        const user_id = result.insertId;
        
        return {
            success: true,
            user_id,  // Return user_id
            message: "User registered successfully"
        };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
};

const getUserByEmail = async (email) => {
    try {
        const [results] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        return null;
    }
};

export {getUserByEmail, registerUser }