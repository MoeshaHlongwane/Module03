import express from 'express';
import { createOrderCon, getUserCheckoutDetailsCon, adminGetAllOrdersCon, adminUpdateOrderTrackingInfoCon } from '../controller/ordersCon.js';
const router = express.Router();
// Route to get user checkout details
router.get('/:user_id', getUserCheckoutDetailsCon);
// Route to create an order
router.post('/', createOrderCon);
router.get("/", adminGetAllOrdersCon)
router.patch('/:order_id',adminUpdateOrderTrackingInfoCon )
export default router;