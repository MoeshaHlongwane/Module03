import express from "express"
import{getAllProductsCon, getSingleProductCon, insertProductCon, updateProductCon, deleteProductCon, adminUpdateProductCon} from "../controller/productsController.js"
const router = express.Router()

router.get("/", getAllProductsCon)
router.get("/:product_id", getSingleProductCon )
router.post("/", insertProductCon)
router.patch("/:product_id", updateProductCon)
router.delete("/:product_id", deleteProductCon )
router.patch("/:product_id", adminUpdateProductCon )

export default router