// models/cartModel.js
import { pool } from "../config/config.js";

const getCart = async (user_id) => {
  const [data] = await pool.query(
    `SELECT c.cart_id, c.quantity, c.size, p.product_id, p.name AS product_name, p.price, p.image_url
     FROM cart AS c
     JOIN products AS p ON c.product_id = p.product_id
     WHERE c.user_id = ?`,
    [user_id]
  );
  return data;
};



const addToCart = async (user_id, product_id, quantity, size) => {
  await pool.query(
    `INSERT INTO cart (user_id, product_id, quantity, size) 
     VALUES (?, ?, ?, ?) 
     ON DUPLICATE KEY UPDATE quantity = ?, size = ?`,
    [user_id, product_id, quantity, size, quantity, size]
  );
  return await getCart(user_id);
};



const deleteItem = async (cart_id) => {
  await pool.query(`DELETE FROM cart WHERE cart_id = ?`, [cart_id]);
};

const dropCart = async (user_id) => {
  await pool.query(`DELETE FROM cart WHERE user_id = ?`, [user_id]);
};

// Get Cart Total
const getCartTotal = async (user_id) => {
    const [data] = await pool.query(
      `SELECT SUM(p.price * c.quantity) AS total 
       FROM cart AS c 
       INNER JOIN products AS p ON c.product_id = p.product_id 
       WHERE c.user_id = ?`,
      [user_id]
    );
    return data[0].total;
};

// Update Quantity and Size
const updateCartItem = async (cart_id, quantity, size) => {
    await pool.query(
      `UPDATE cart SET quantity = ?, size = ? WHERE cart_id = ?`,
      [quantity, size, cart_id]
    );
  };



export { getCart, addToCart, deleteItem, dropCart, getCartTotal, updateCartItem};
