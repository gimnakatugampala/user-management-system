if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const redis = require('redis')
const path = require('path')
const bodyParser = require('body-parser')
const  exphbs  = require('express-handlebars')
const passport = require('passport')
const initializePassport = require('./passport.config')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')
// const dotenv = require('dotenv').config({path:'./.env'})
const mongoose = require('mongoose')
const User = require('./models/User')
// const bcrypt = require('bcrypt')

require('dotenv').config({path:'./.env'})

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

const app = express()

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nodetuts.qlhc3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result) => app.listen(3000))
.then(() => console.log('db Started'))
.catch(err => console.log(err))

const users = []


// Handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Homepage
app.get('/',checkAuthenticated,(req,res) =>{
    res.render('index',{name:req.user.name})
})

// Login
app.get('/login',checkNotAuthenticated,(req,res) =>{
    res.render('login',{name:'Gimna'})
})

// Login
app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))


// Registers
app.get('/register',checkNotAuthenticated,(req,res) =>{
    res.render('register')
})

// Register
app.post('/register',async (req,res) =>{

    try{
        // const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })

        // Get to the data to db
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })

        user.save()
        .then(() => console.log('db saved'))

        res.redirect('/login')

    }catch{
        res.redirect('/register')
    }

    console.log(users)
    
})

app.delete('/logout',(req,res) =>{
    req.logOut()
    res.redirect('/login')
})


function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
       return res.redirect('/')
    }
    
     next()
}


// const port = process.env.PORT || 3000

// app.listen(port,() => console.log(`Server connected ${port}`))
