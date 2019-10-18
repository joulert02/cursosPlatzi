const express = require('express')
const router = express.Router()

var variable

var app = express()

app.use(router)

router.get('/', (req, res) => {
    res.send('hi')
})

// app.use('/', (req, res) => {
//     res.send('hola')
// })

app.listen(3000)
console.log('The application is listening in the port http://localhost:3000')