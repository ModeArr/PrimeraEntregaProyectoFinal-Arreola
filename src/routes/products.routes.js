const { Router } = require("express")
const pathDB = path.join(`${__dirname}/db.json`)
const products = new ProductManager(pathDB)

const router = Router()

app.get("/products", (request, response) => {
    products.getProducts().then(result => {
        if (request.query.limit){
            response.status(200).json(result.slice(0,request.query.limit));
        } else{
            response.status(200).json(result);
        }
    }).catch(err => {
        console.log(err);
        response.status(400).json({
            error: "No se encontraron los productos"
        });
    });
})

app.get("/products/:pid", (request, response) => {
    const id = Number(request.params.pid)
    products.getProducts().then(result => {
        const productId = result.find(e => e.id === id)
        if (!productId){
            console.error("No se encuentra ese id");
            response.status(400).json({
                error: "No se encontro el id"
            });
        } else{
            const index = result.indexOf(productId);
            return response.status(200).json(result[index]);
        }
    }).catch(err => {
        console.log(err);
        response.sendStatus(400);
    });
})

module.exports = router