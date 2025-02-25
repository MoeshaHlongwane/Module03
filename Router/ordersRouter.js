import express from 'express';
import { createOrderCon, getUserCheckoutDetailsCon } from '../Controller/ordersCon.js';
const router = express.Router();
router.post('/', createOrderCon);
router.get('/:user_id', getUserCheckoutDetailsCon);
export default router;



