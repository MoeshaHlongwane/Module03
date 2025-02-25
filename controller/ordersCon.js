import { createOrder, getUserCheckoutDetails } from "../Model/ordersDb.js";
export const createOrderCon = async (req, res) => {
    try {
        const result = await createOrder(req.body.user_id, req.body.items, req.body.total_price, req.body.shipping_details);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getUserCheckoutDetailsCon = async (req, res) => {
    try {
        const result = await getUserCheckoutDetails(req.params.user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};











