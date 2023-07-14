import { Router } from "express";
import { getProducts, getProduct, postProduct, patchProduct, deleteProduct } from "../controllers/products.controllers.js";

const router = Router() 

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', postProduct)
router.patch('/products/:id', patchProduct)
router.delete('/products/:id', deleteProduct)

export default router;