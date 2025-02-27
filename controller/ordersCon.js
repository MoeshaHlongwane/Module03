import { createOrder, getUserCheckoutDetails, AdminUpdateOrderTracking, adminGetOrders } from '../model/ordersDb.js';
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


//Admin Controller 
export const adminGetAllOrdersCon = async (req, res) => {
  try {
      const orders = await adminGetOrders();
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update order tracking information (Shipping tracking system)
export const adminUpdateOrderTrackingInfoCon = async (req, res) => {
  const { tracking_number, carrier, status } = req.body;
  const { order_id } = req.params;  // Get the order_id from the route params

  if (!order_id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  if (!tracking_number || !carrier || !status) {
    return res.status(400).json({ error: "Tracking number, carrier, and status are required" });
  }

  try {
    const updatedOrder = await AdminUpdateOrderTracking(order_id, tracking_number, carrier, status);

    if (updatedOrder) {
      res.status(200).json({ message: "Order tracking updated successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order tracking" });
  }
};
