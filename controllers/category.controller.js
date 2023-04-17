const mongoose = require('mongoose')
const {Category} = require('../models/category.model')


exports.allcategories = async (req , res) => {
    try {
        const results = await Category.find().populate('products', '_id')
        res.json({
            results,
            success : true
        })
    } catch (error) {
        res.json({
            message : error,
            success : false
        })
    }
}

exports.oneCategory = async (req, res, next) => {
    let id = req.params.id

    try {
        const category = await Category.findById(id)
        res.json({
            category,
            success : true
        })
    } catch (error) {
        res.json({
            error : error,
            success : false
        })
    }
}

exports.addcategory = (req, res) => {
    let {label, icon, color } = req.body

    const myCategory = new Category({
        label : label,
        icon : icon,
        color : color
    })
    myCategory.save() 
    .then((insertedCategory) => { //
        console.log("ici1")
        res.status(201).json({
            category : insertedCategory,
            success : true
        })
    })
    .catch(err => {
        console.log("ici")
        res.status(500).json({
            error : err,
            success : false
        })
    })
}

exports.updateCategory = async (req, res, next) => {
    let id = req.params.id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            message : "Id is not valid !",
            success : false
        })
    }
    try {
        const update = await Category.findOneAndReplace(id, req.body)

        if(!update) {
            return res.status(404).json({
                message : "Categorie not found !",
                success : false
            })
        }

        res.status(200).json({
            update,
            success : true
        })
    } catch (error) {
        res.status(500).json({
            error : "",
            success : false
        })
    }
}

exports.editCategory =  async (req, res, next) => {
    let id = req.params.id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            message : "Id is not valid !",
            success : false 
        })
    }

    try {
        const edit = await Category.findOneAndUpdate({'_id': id}, req.body)
        if(!edit) {
            return res.status(404).json({
                message : "Category not found !"
            })
        }
        res.status(200).json({
            edit,
            success : true
        })
    } catch (error) {
        res.status(500).json({
            error : error,
            success : false
        })
    }
}

