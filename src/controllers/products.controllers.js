import {pool} from '../db.js'

//mostrar productos 
export const getProducts = async (req,res) => {
    try{
        const [rows] = await pool.query("SELECT * from products")
        res.render("products", {registros: rows})
    } catch (error) {
        return res.status(500).json('Algo ha salido mal, intentalo de nuevo ):')
    }  
}

//mostrar un producto en especifico
export const getProduct = async (req,res) => {
    try{
        const {id} = req.params;
        const [rows] = await pool.query("SELECT * from products WHERE id = ?", [id])
        if(rows.length <= 0 ){
            res.status(404).json({message: 'Producto no encontrado'})
        }
        res.json(rows[0])
    } catch (error){
        return res.status(500).json('Algo ha salido mal, intetalo de nuevo')
    } 
}

//anañadir un producto
export const postProduct = async (req,res) => {
    const {name, descripcion, price, img } = req.body
    try{
        const [rows] = await pool.query("INSERT INTO products(name, descripton, price, img) VALUES (?,?,?,?)",[name, descripcion, price, img])
        res.redirect("/products")
    } catch (error){
        return res.status(500).json('Algo ha salido mal, intetalo de nuevo')
    }
}

//editar un producto
export const patchProduct = async (req,res) => {
    const {id} = req.params 
    const {name, descripcion, price, img} = req.body
    try{
        const [result] = await pool.query('UPDATE products SET name = IFNULL(?, name), descripton = IFNULL(?, descripton), price = IFNULL(?, price), img = IFNULL(?, img) WHERE id = ?',[name,descripcion,price,img,id])
        if (result.affectedRows == 0){
            res.status(404).json({
                message: "Error, el producto no se pudo modificar"
            })
        }
        const [rows] = await pool.query('SELECT * from products WHERE id = ?', [id])
        res.send(rows[0])
    } catch (error){
        return res.status(500).json('Algo ha salido mal, intetalo de nuevo')
    }
}

//borrar un producto
export const deleteProduct = async (req,res) => {
    const {id} = req.params
    try{
        const [result] = await pool.query('DELETE from products WHERE id = ?',[id])
        if(result.affectedRows == 0){
            res.status(404).json({
                message: "Error: producto no encontrado"
            })
        }
        res.redirect("/products")
    } catch (error){
        return res.status(500).json('Algo ha salido mal, intetalo de nuevo')
    }
}

