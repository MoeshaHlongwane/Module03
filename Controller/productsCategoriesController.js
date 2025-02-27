import {
    getCategories,
    getSingleCategory,
    insertCategory,
    updateCategory,
    deleteCategory
} from "../model/productsCategoriesModel.js"

const getCategoriesCon = async (req, res) => {
    res.json({
      All_Categories: await getCategories(),
    });
  }
const getSingleCategoryCon = async (req, res) => {
    res.json({
      Single_category: await getSingleCategory(req.params.category_id),
    });
}
const insertCategoryCon = async (req, res) => {
    const { category_name } = req.body;
    res.json({
      new_category: await insertCategory(category_name),
    });
}
const updateCategoryCon =  async (req, res) => {
    res.json({
      updated_category: await updateCategory(req.params.category_id, req.body),
    });
}
const deleteCategoryCon = async (req, res) => {
    res.json({
      deleted_category: await deleteCategory(req.params.category_id),
    });
}

export {getCategoriesCon, getSingleCategoryCon, insertCategoryCon, updateCategoryCon, deleteCategoryCon};
