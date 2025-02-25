import dotenv from "dotenv";
import { registerUser, getUserByEmail} from "../Model/authDb.js";
import bcrypt from "bcryptjs";
dotenv.config();
// Register User
 const registerCon = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const result = await registerUser(name, email, password, phone, address);
    if (!result.success) return res.status(500).json({ error: result.error });
    res.json({ 
        user_id: result.user_id,
        message: result.message 
    });
};

const login = async (req, res) => {
    const { email, password} = req.body;
    const users = await getUserByEmail(email);
    if (!users) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    res.json({user_id:users.user_id})
}

export { registerCon, login };