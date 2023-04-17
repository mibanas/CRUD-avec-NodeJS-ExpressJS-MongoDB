const mongoose = require('mongoose')
const {Product} = require('../models/product.model')


exports.allProducts = async (req, res, next) => {
    
    try {
        const products = await Product.find().populate('category', '_id label icon  color');  // tt sauf -label // populate affiche aussi la relation // category est le nom du champs décalter sur le model
        res.json({ 
            products,
            success : true
        });
        
    } catch (error) {
        res.status(500).json({
            error : error,
            success : false
        })
    }

}


exports.oneProduct = async (req, res, next) => {
    let { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success : false,
            message : "id is not valide !"
        })
    }

    try {
        const products = await Product.findById(id)
        if(!products) {
            return res.status(404).json({
                success : false,
                message : "Product not found!"
            })
        }
        res.json({ 
            products,
            success : true
        });
        
    } catch (error) {
        res.status(500).json({
            error : "",
            success : false
        })
    }

}

exports.updateProduct = async (req, res, next) => {
    let { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success : false,
            message : "id is not valide !"
        })
    }

    try {
        const products = await Product.findOneAndReplace({'_id': id}, req.body) // {... req.body, variable}

        if(!products) {
            return res.status(404).json({
                success : false,
                message : "Product not found!"
            })
        }
        res.json({ 
            products,
            success : true
        });
        
    } catch (error) {
        res.status(500).json({
            error : "",
            success : false
        })
    }

}


exports.editProduct = async (req, res, next) => {
    let { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success : false,
            message : "id is not valide !"
        })
    }

    try {
        const products = await Product.findOneAndUpdate({'_id': id}, req.body) // {... req.body, variable}

        if(!products) {
            return res.status(404).json({
                success : false,
                message : "Product not found!"
            })
        }
        res.json({ 
            products,
            success : true
        });
        
    } catch (error) {
        res.status(500).json({
            error : "",
            success : false
        })
    }

}

exports.addProduct =  (req, res) => {
    let {title, description, content, brand, countStock, image, thumbnail, rating, isFeatured, price, category} = req.body
    
    const myProduct = new Product({
        title,
        description,
        content,
        brand,
        countStock,
        image,
        thumbnail,
        rating,
        isFeatured,
        price,
        category,
    })

    myProduct.save() // return promise 
    .then((insertedProduct) => { //
        res.status(201).json({
            product : insertedProduct,
            success : true
        })
    })

    .catch(err => {
        res.status(500).json({
            error : err,
            success : false
        })
    })
}

exports.search = async (req, res, next) => {
    let id = req.params.id
    let fields = req.query.fields
    let { search } = req.query

    console.log("ici1")

    if(search) {
        try {
            let result = await Product.find({$or : [
                {title : { $regex : search, '$options' : 'i'}},
                {content : { $regex : search, '$options' : 'i'}}
            ]})
            .select(fields)
            .sort('created_at')  // .sort({'created_at' : -1})


            if(!result.length) {
                return res.status(404).json({
                    success : false,
                    message : "Product(s) not found !"
                })
            }
            res.status(200).json({
                products : result,
                success : true
            })
        } catch (error) {
            res.status(500).json({
                error : "Server is down !",
                success : false
            })
        }


    }

}

exports.searchBySegement = async (req, res, next) => {

    let segment = req.params.segment
    let search = req.query.search
    
    if(search) {
        try {
            let result = await Product.find({[segment] : { $regex : search, '$options' : 'i'}})
            // return res.json(result)

            if(!result.length) {
                return res.status(404).json({
                    success : false,
                    message : "Product(s) not found !"
                })
            }
            res.status(200).json({
                products : result,
                success : true
            })
        } catch (error) {
            res.status(500).json({
                error : "Server is down !",
                success : false
            })
        }


    }
}