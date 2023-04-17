const { expressjwt: jwt } = require("express-jwt")

const authJwt = () => {

    let secret = process.env.SECRUTE_KEY
    // let secret = "65600ebe-13e1-49c3-9a0d-11e3b7a0cd56"

    
    return jwt({
        secret,
        algorithms: ["HS256"],
    })
    .unless({ path : [
        {url : "/users/login"},
        {url : "/users/register"},
        {url : "/product", methods : ['GET']},


    ]})
}

// exports.authJwt = authJwt

module.exports = authJwt