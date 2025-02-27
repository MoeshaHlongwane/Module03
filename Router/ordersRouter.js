import express from 'express';
import { createOrderCon, getUserCheckoutDetailsCon } from '../controller/ordersCon.js';
const router = express.Router();
// Route to get user checkout details
router.get('/:user_id', getUserCheckoutDetailsCon);
// Route to create an order
router.post('/', createOrderCon);
export default router;