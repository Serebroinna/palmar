import { Router } from "express";
import { getProductsHome} from "../controllers/home.controllers.js";

const router = Router()

router.get('/', getProductsHome) 

export default router;