import {
  getAllProducts,
  getSingleProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  adminUpdateProduct
} from "../model/productsModel.js";

const getAllProductsCon = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json({ All_Products: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getSingleProductCon = async (req, res) => {
  try {
    const product = await getSingleProduct(req.params.product_id);
    res.json({ single_product: product });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const insertProductCon = async (req, res) => {
  const { category_id, name, description, color, price, stock, image_url } = req.body;
  try {
    const result = await insertProduct(category_id, name, description, color, price, stock, image_url);
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert product" });
  }
};

const updateProductCon = async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.product_id, req.body);
    res.status(200).json({ message: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductCon = async (req, res) => {
  try {
    const result = await deleteProduct(req.params.product_id);
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

//update Productdetails For Admin 
// Update product details (Price, Stock, Image, Description)
const adminUpdateProductCon = async (req, res) => {
  const { product_id, price, stock, image_Url, description } = req.body;

  if (!product_id) {
      return res.status(400).json({ error: "Product ID is required" });
  }

  try {
      const updatedProduct = await adminUpdateProduct(product_id, price, stock, image_Url, description);

      if (updatedProduct) {
          res.status(200).json({ message: "Product updated successfully" });
      } else {
          res.status(404).json({ error: "Product not found" });
      }
  } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
  }
};

export { adminUpdateProductCon ,getAllProductsCon, getSingleProductCon, insertProductCon, updateProductCon, deleteProductCon };
