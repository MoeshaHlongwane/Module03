import { createOrder, getUserCheckoutDetails } from '../Model/ordersDb.js';
// Controller to create an order
export const createOrderCon = async (req, res) => {
  try {
    // Calling createOrder to create the order and insert items from cart
    const result = await createOrder(req.body.user_id, req.body.cartItems, req.body.total_price, req.body.shipping_details);
    // Returning the result with success status and order id
    res.status(200).json({ success: true, order_id: result.order_id });
  } catch (error) {
    // Sending error response with appropriate message
    res.status(500).json({ success: false, error: error.message });
  }
};
// Controller to get user checkout details
export const getUserCheckoutDetailsCon = async (req, res) => {
  try {
    // Fetching user checkout details including cart items
    const result = await getUserCheckoutDetails(req.params.user_id);
    // Returning user details and cart items to the frontend
    res.status(200).json(result);
  } catch (error) {
    // Sending error response if any issue occurs
    res.status(500).json({ success: false, error: error.message });
  }
};