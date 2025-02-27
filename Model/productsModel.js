import { pool } from "../config/config.js";

const getAllProducts = async (limit = 90, offset = 0) => {
  const [data] = await pool.query(`
      SELECT p.product_id, p.name AS product_name, p.description, p.color, p.price, p.stock, p.image_url, 
             c.category_name
      FROM Products p
      INNER JOIN Product_Categories c ON p.category_id = c.category_id
      LIMIT ? OFFSET ?`, [limit, offset]);
  return data;
};

const getSingleProduct = async (product_id) => {
  let [data] = await pool.query(`
      SELECT p.product_id, p.name AS name, p.description, p.color, p.price, p.stock, p.image_url, c.category_name
      FROM Products p
      INNER JOIN Product_Categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?`, [product_id]);
  return data;
};

const insertProduct = async (category_id, name, description, color, price, stock, image_url) => {
  await pool.query("INSERT INTO Products (category_id, name, description, color, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)", 
    [category_id, name, description, color, price, stock, image_url]);
  return "Product inserted successfully!";
};

const updateProduct = async (product_id, data) => {
  const { category_id, name, description, color, price, stock, image_url } = data;
  let updateFields = [];
  let updateValues = [];

  // Collecting update fields dynamically
  if (category_id) {
    updateFields.push("category_id = ?");
    updateValues.push(category_id);
  }
  if (name) {
    updateFields.push("name = ?");
    updateValues.push(name);
  }
  if (description) {
    updateFields.push("description = ?");
    updateValues.push(description);
  }
  if (color) {
    updateFields.push("color = ?");
    updateValues.push(color);
  }
  if (price) {
    updateFields.push("price = ?");
    updateValues.push(price);
  }
  if (stock) {
    updateFields.push("stock = ?");
    updateValues.push(stock);
  }
  if (image_url) {
    updateFields.push("image_url = ?");
    updateValues.push(image_url);
  }

  // Check if there are fields to update
  if (updateFields.length === 0) {
    throw new Error("No fields to update");
  }

  updateValues.push(product_id);

  const query = `UPDATE Products SET ${updateFields.join(", ")} WHERE product_id = ?`;

  try {
    const [result] = await pool.query(query, updateValues);

    // Check if any row was affected
    if (result.affectedRows === 0) {
      throw new Error("Product not found or no changes made");
    }

    return "Product updated successfully!";
  } catch (error) {
    throw new Error("Failed to update product");
  }
};

const deleteProduct = async (product_id) => {
  await pool.query("DELETE FROM Products WHERE product_id = ?", [product_id]);
  return "Product successfully deleted";
};

//Admin updating Product 
const adminUpdateProduct = async (product_id, price, stock, image_url, description) => {
  try {
      const query = `
          UPDATE products 
          SET price = ?, stock = ?, image_url = ?, description = ? 
          WHERE product_id = ?;
      `;
      const [result] = await pool.query(query, [price, stock, image_url, description, product_id]);
      return result.affectedRows > 0;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

export { adminUpdateProduct ,getAllProducts, getSingleProduct, insertProduct, updateProduct, deleteProduct };
