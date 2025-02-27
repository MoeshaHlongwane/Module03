import express from "express"
import { addUserCon, deleteUserCon, editUserCon, getSingleuserCon, getusersCon } from "../controller/usersController.js"

const router = express.Router()

router.get("/",getusersCon)
router.get("/:user_id", getSingleuserCon )
router.post("/", addUserCon)
router.patch("/:user_id", editUserCon)
router.delete("/:user_id", deleteUserCon)

export default router