const express = require('express')
const redis = require('redis')
const bodyParser = require('body-parser')
const  exphbs  = require('express-handlebars')
const bcrypt = require('bcrypt')

const app = express()

const users = []

// Handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Homepage
app.get('/',(req,res) =>{
    res.render('index',{name:'Gimna'})
})

// Login
app.get('/login',(req,res) =>{
    res.render('login',{name:'Gimna'})
})

// Login
app.post('/login',(req,res) =>{
    
})


// Register
app.get('/register',(req,res) =>{
    res.render('register',{name:'Gimna'})
})

// Register
app.post('/register',(req,res) =>{
    
})



const port = process.env.PORT || 3000

app.listen(port,() => console.log(`Server connected ${port}`))