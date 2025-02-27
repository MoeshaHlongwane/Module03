// Siyavuya's Code

import { getPayments, getPaymentById, insertPayment, deletePayment,updatePayment } from "../model/paymentsDb.js";

const getPaymentsCon = async (req, res) => {
  try {
    res.status(200).json({ payments: await getPayments() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPaymentByIdCon = async (req, res) => {
  try {
    const { payment_id } = req.params;  // Assuming order_id comes from URL params
    const payment = await getPaymentById(payment_id);
    
    if (payment.length === 0) {
      return res.status(404).json({ message: 'payment not found' });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};


const insertPaymentCon = async (req, res) => {
    try {
      let { order_id, amount, method, status } = req.body;
      console.log(req.body);
      
      const payments = await insertPayment(order_id, amount, method, status);
      res.status(200).json({ payments });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const deletePaymentCon = async (req, res) => {
    try {
      let { payment_id } = req.params;
      console.log(req.params);
  
      const payments = await deletePayment(payment_id);
      res.status(200).json({ payments });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const updatePaymentCon = async (req, res) => {
    try {
      let { payment_id } = req.params;
      let { order_id, amount, method, status } = req.body;
      console.log(req.params);
  
      const payments = await updatePayment(order_id, amount, method, status, payment_id);
      res.status(200).json({ payments });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export { getPaymentsCon, getPaymentByIdCon, insertPaymentCon, deletePaymentCon, updatePaymentCon };
