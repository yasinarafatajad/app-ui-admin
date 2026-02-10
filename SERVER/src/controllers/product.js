import ProductModel from "../models/product.js";

export const AddProduct = async (req, res) => {
  const {
    title,
    description,
    sku,
    category,
    images,
    color = [],
    size = [],
    price,
    compareAtPrice,
    stock,
    isActive = true,
    brand,
    tags = [],
    status = "draft",
    createdBy,
  } = req.body;

  const product = {
    title,
    description,
    sku,
    category,
    images,
    color,
    size,
    price,
    compareAtPrice,
    stock,
    isActive,
    brand,
    tags,
    status,
    createdBy,
  };

  try {
    const result = await ProductModel.create(product)
    res.status(201).json({ success: true, product });
    console.log('New product added..!');
  } catch (err) {
    console.log('product add failed.', err);
  }
};

export const GetProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductModel.findOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const AllProducts = await ProductModel.find();
    res.status(200).json(AllProducts);
  } catch (err) {
    console.log(err.message);
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductModel.findOneAndDelete({ _id: id });
    if (!result) {
      res.status(500).json('Product Doesn\'t exist in Database.')
    }
    res.status(200).json("Deleted..!");
    console.log('One Product has been deleted');

  } catch (err) {
    console.log(err.message);
  }
};

export const UpdateProduct = async (req, res) => {

  const { id } = req.params;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $set: req.body }, // Update only the fields provided in req.body
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log('Product updated successfully.');
    res.status(200).json(updatedProduct)
  } catch (error) {
    console.log(error.message);

  }
}
