import productModel from "../Model/products.model.js";

export function createProduct(req, res) {
    // taking product from body
    const { name, price, image, description, stock } = req.body;
    //  creating new product
    const newProduct = new productModel({
        name: name,
        price,
        image,
        description,
        stock
    })
    // saving product into
    newProduct.save().then((data) => {
        if (!data) {
            return res.status(400).json({ message: "Something went wrong" })

        }
        res.send(data);
    })
}

export function fetchProducts(req, res) {
    productModel.find().then((data) => {
        if (!data) {
            return res.status(400).json({ message: "Something went wrong" })
        }
        res.json(data);
    }).catch((err) => {
        return res.status(500).json({
            message: "Internal server error "
                || err.message
        })
    })
}

export function fetchProductById(req, res) {
    const { id } = req.params; // Get product ID from URL parameters

    productModel.findById(id).then((data) => {
        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(data);
    }).catch((err) => {
        return res.status(500).json({
            message: "Internal server error" || err.message
        });
    });
}