// controllers/cartController.js
import { getCart, addToCart, deleteItem, dropCart, getCartTotal, updateCartItem  } from "../model/cartModel.js";

const getCartCon = async (req, res) => {
  const user_id = req.params.user_id;
  res.json(await getCart(user_id));
};

const addToCartCon = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  res.json(await addToCart(user_id, product_id, quantity));
};

const deleteItemCon = async (req, res) => {
    const cart_id = req.params.cart_id;
    if (!cart_id || isNaN(cart_id)) {
      return res.status(400).json({ error: "Invalid or missing cart_id" });
    }
    await deleteItem(cart_id);
    res.json({ message: "Item deleted successfully." });
  };
  
  

const dropCartCon = async (req, res) => {
  await dropCart(req.params.user_id);
  res.json({ message: "Cart dropped successfully." });
};

// Get Cart Total Controller
const getCartTotalCon = async (req, res) => {
    const user_id = req.params.user_id;
    const total = await getCartTotal(user_id);
    res.json({ total });
  };

// Update Quantity and Size Controller
const updateCartItemCon = async (req, res) => {
    const { cart_id, quantity, size } = req.body;
    await updateCartItem(cart_id, quantity, size);
    res.json({ message: "Cart item updated successfully." });
  };  

export { getCartCon, addToCartCon, deleteItemCon, dropCartCon, getCartTotalCon, updateCartItemCon };
