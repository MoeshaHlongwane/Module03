import express from "express"
import {getCategoriesCon, getSingleCategoryCon, insertCategoryCon, updateCategoryCon, deleteCategoryCon} from "../controller/productsCategoriesController.js"

const router = express.Router()

router.get("/", getCategoriesCon)
router.get("/:category_id", getSingleCategoryCon)
router.post("/", insertCategoryCon)
router.patch("/:category_id", updateCategoryCon)
router.delete("/:category_id", deleteCategoryCon )

export default router