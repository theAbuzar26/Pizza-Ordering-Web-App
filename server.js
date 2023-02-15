const express=require('express');
//importing express 
const app=express();
// app is main express object

// importing ejs-templateEngine
const ejs=require('ejs');

//importing layouts
const Expresslayouts=require('express-ejs-layouts');

//importing path module
const Path=require('path');

const Port=process.env.Port || 3300;





//assets
app.use(express.static('public'));




//Set Template Engine
app.use(Expresslayouts)
app.set('views',Path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// solving local host issue
app.get('/',(req,res)=>{
    res.render('home');
}) 

//route for cart
app.get('/cart',(req,res)=>{
    res.render('customer/cart');
})

//route for login
app.get('/login',(req,res)=>{
    res.render('authorization/login');
})

//route for register
app.get('/register',(req,res)=>{
    res.render('authorization/register');
})



app.listen(Port,()=>{
    console.log(`Listening on Port  ${Port}`);
})

