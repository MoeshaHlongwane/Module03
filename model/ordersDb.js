import { pool } from "../config/config.js";
const createOrder = async (user_id, items, total_price, shipping_details) => {
  try {
      const [orderResult] = await pool.query(
          `INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'Pending')`,
          [user_id, total_price]
      );
      const order_id = orderResult.insertId;
      const orderItemQueries = items.map(item =>
          pool.query(
              `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
              [order_id, item.product_id, item.quantity, item.price]
          )
      );
      await Promise.all(orderItemQueries);
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
const getUserCheckoutDetails = async (user_id) => {
  try {
      const [userDetails] = await pool.query(
          `SELECT users.user_id, users.name, users.email, shipping.address, shipping.city, shipping.zipcode, shipping.country
           FROM users LEFT JOIN shipping ON users.user_id = shipping.user_id WHERE users.user_id = ?`,
          [user_id]
      );
      const [order_items] = await pool.query(
          `SELECT oi.order_id, oi.product_id, oi.quantity, oi.price, p.image_url FROM order_items oi
           JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id IN (SELECT order_id FROM orders WHERE user_id = ? AND status = 'Pending')`,
          [user_id]
      );
      return { userDetails: userDetails[0], order_items };
  } catch (error) {
      throw error;
  }
};
export { createOrder, getUserCheckoutDetails };