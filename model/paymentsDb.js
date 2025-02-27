//Siya's code
import { pool } from "../config/config.js";

const getPayments = async () => {
    let [data] = await pool.query("SELECT * FROM payments");
    return data;
};

const getPaymentById = async (payment_id) => {
    let [result] = await pool.query(`SELECT p.amount, p.method, p.status, o.total_price, o.created_at, u.name, u.address
        FROM payments AS p
        INNER JOIN orders As o
        ON p.order_id = o.order_id
        INNER JOIN users As u
        ON o.user_id = u.user_id
        WHERE p.payment_id = ?`, [payment_id]);
    return result.length ? result[0] : null; // Return the first payment or null if not found
};


const insertPayment = async (order_id, amount, method, status) => {
    await pool.query(
        "INSERT INTO payments (order_id, amount, method, status, payment_date) VALUES (?, ?, ?, ?, NOW())",
        [order_id, amount, method, status]
    );

    return await getPayments();
};

const deletePayment = async (payment_id) => {
    let [result] = await pool.query("DELETE FROM payments WHERE payment_id = ?", [payment_id]);
    return result;
};

const updatePayment = async (order_id, amount, method, status, payment_id) => {
    await pool.query(
        "UPDATE payments SET order_id = ?, amount = ?, method = ?, status = ? WHERE payment_id = ?",
        [order_id, amount, method, status, payment_id]
    );

    return await getPayments();
};

export { getPayments, getPaymentById, insertPayment, deletePayment, updatePayment};
