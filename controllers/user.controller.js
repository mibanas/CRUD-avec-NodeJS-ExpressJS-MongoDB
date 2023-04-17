const mongoose = require('mongoose')
const {User} = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.register = async (req ,res) => {

    let {username, password, email, adrress, country, phonenumber, isAsmin, city} = req.body

    const user = new User({
        username,
        password : bcrypt.hashSync(password, 10),
        city,
        email,
        adrress,
        country,
        phonenumber,
        isAsmin
    })

    try {
        const result = await user.save()
        res.status(201).json({
            success : true,
            user : result,
        })
    } catch (error) {
        res.status(500).json({
            error : "Server is down !",
            success : false
        })
    }   
}



exports.allUsers = async (req, res, next) => {
    
    try {
        const results = await User.find()  
        res.json({ 
            results,
            success : true
        });
        
    } catch (error) {
        res.status(500).json({
            error : error,
            success : false
        })
    }

}


exports.oneUser = async (req, res, next) => {
    let { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success : false,
            message : "id is not valide !"
        })
    }

    try {
        const users = await User.findById(id)
        if(!users) {
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }
        res.json({ 
            users,
            success : true
        });
        
    } catch (error) {
        res.status(500).json({
            error : "",
            success : false
        })
    }

}

exports.login = async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await User.findOne({email : email}, 'username email password')

        if(!user) {
            return res.status(404).json({
                success : false,
                message : "password or email not found!"
            })
        }
        if(user && bcrypt.compareSync(password, user.password)) {
            const secrute = process.env.SECRUTE_KEY
            const token = jwt.sign({ 
                userId : user._id,
                username : user.username
            }, secrute ,{expiresIn : 60});
            return res.status(200).json({
                success : true,
                message : "User is Autenticated",
                token
            })
        }
        res.status(400).json({
            success : false,
            message : "Wrong email and password"
        })
    } catch (error) {
        
    }

}