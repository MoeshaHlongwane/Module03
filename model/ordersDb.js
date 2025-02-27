import { pool } from "../config/config.js";
// Create order and move cart items to the orders table
const createOrder = async (user_id, cartItems, total_price, shipping_details) => {
  try {
    // Create the order in the orders table
    const [orderResult] = await pool.query(
      `INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'Pending')`,
      [user_id, total_price]
    );
    const order_id = orderResult.insertId;
    // Insert cart items into the orders table directly
    const orderItemQueries = cartItems.map(item =>
      pool.query(
        `INSERT INTO orders (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [order_id, item.product_id, item.quantity, item.price]
      )
    );
    await Promise.all(orderItemQueries);
    // Insert or update shipping details
    await pool.query(
      `INSERT INTO shipping (user_id, order_id, name, address, city, zipcode, country)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), address=VALUES(address), city=VALUES(city), zipcode=VALUES(zipcode), country=VALUES(country)`,
      [user_id, order_id, shipping_details.name, shipping_details.address, shipping_details.city, shipping_details.zipcode, shipping_details.country]
    );
    return { success: true, order_id };
  } catch (error) {
    throw error;
  }
};
// Fetch user and order details for the checkout page
const getUserCheckoutDetails = async (user_id) => {
  try {
    const [userDetails] = await pool.query(
        `SELECT users.user_id, users.address AS user_address, users.name, users.email, 
                shipping.address AS shipping_address, shipping.city, shipping.zipcode, shipping.country
         FROM users 
         LEFT JOIN shipping ON users.user_id = shipping.user_id 
         WHERE users.user_id = ?`,
        [user_id]
    );
    // Get cart items for the user
    const [cartItems] = await pool.query(
        `SELECT c.product_id, c.quantity, p.price, p.image_url,
                (c.quantity * p.price) AS total_price
         FROM cart c
         JOIN products p ON c.product_id = p.product_id
         WHERE c.user_id = ?`,
        [user_id]
      );
    return { userDetails: userDetails[0], cartItems };
  } catch (error) {
    throw error;
  }
};

export { createOrder, getUserCheckoutDetails };

//Admin Controller 
// Get all orders
export const adminGetOrders = async () => {
  try {
      const [orders] = await pool.query("SELECT * FROM orders");
      return orders;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// Update order tracking details
export const AdminUpdateOrderTracking = async (orderId, trackingNumber, carrier, status) => {
  try {
    const query = `
      UPDATE orders 
      SET tracking_number = ?, carrier = ?, status = ? 
      WHERE order_id = ?;
    `;
    const [result] = await pool.query(query, [trackingNumber, carrier, status, orderId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
