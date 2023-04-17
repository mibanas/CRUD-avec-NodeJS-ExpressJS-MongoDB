const server = require('./app')
require('./config/db')

const port = process.env.PORT || 4000


server.listen(port , (req, res) => {
    console.log(`Server is running in ${port} port ...`)
})