import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import productsRoutes from "./routes/products.routes.js";
import homeRoutes from './routes/home.routes.js'
import methodOverride from 'method-override'

const app = express();

//Configuraciones
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false})) //este metodo entiende los datos que vienen desde los forms
app.use(methodOverride('_method')) //midleware para sobreecribir los metodos put y push 

//Routes
app.use(productsRoutes);
app.use(homeRoutes);

//Default routes
app.use((req, res, next) => {
  res.sendStatus(404)
});

export default app;
