import express from "express";
import { AddProduct, DeleteProduct, GetAllProducts, GetProduct, UpdateProduct } from "../controllers/product.js";

const router = express.Router();

router.post('/AddProduct' , AddProduct)
router.post('/UpdateProduct' , UpdateProduct)
router.get('/Product/:id' , GetProduct)
router.get('/AllProducts' , GetAllProducts)
router.delete('/DeleteProduct/:id' , DeleteProduct)

export default router;