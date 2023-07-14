import {pool} from '../db.js'

export const getProductsHome = async (req,res) => {
    try{
        const [rows] = await pool.query("SELECT * from products")
        res.render("index", {registros: rows})
    } catch (error) {
        return res.status(500).json('Algo ha salido mal, intentalo de nuevo ):')
    }  
}
