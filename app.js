const express = require('express')
const redis = require('redis')
const bodyParser = require('body-parser')
const  exphbs  = require('express-handlebars');

const app = express()

// Handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const port = process.env.PORT || 3000

app.listen(port,() => console.log(`Server connected ${port}`))