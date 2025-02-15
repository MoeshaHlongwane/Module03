import express from "express"
import{getAllProductsCon, getSingleProductCon, insertProductCon, updateProductCon, deleteProductCon} from "../Controller/productsController.js"

const router = express.Router()

router.get("/", getAllProductsCon)
router.get("/:product_id", getSingleProductCon )
router.post("/", insertProductCon)
router.post("/", updateProductCon)
router.delete("/:product_id", deleteProductCon )

export default router