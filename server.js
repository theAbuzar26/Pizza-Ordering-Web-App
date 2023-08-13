//importing .env module
const dotenv = require("dotenv");
dotenv.config();

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



const Port = process.env.PORT || 3300;

//importing mongoose
const mongoose = require('mongoose');

//importing session
const session = require('express-session')

//importing flash for cookie work
const flash = require('express-flash')

//importing connect-mongo module to store session id in db
const MongoDbStore = require('connect-mongo')

//impoeting passport library
const passport = require('passport')

//DataBase connection
const connectDb = require("./Config/dbConnection");
connectDb();



// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
    //cookie: { maxAge: 1000 * 15  } // last 15 sec for each refresh
}))


//configuration of passport.js
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

//assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DataBase Connection  // process.env.MONGO_CONNECTION_URL->for atlas

// const connection= async (URL)=>{
//     try {
//         await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
//         console.log('Database Connected Succesfully');
//     } catch(error) {
//         console.log('Error: ', error.message);
//     }
// }
// connection('mongodb+srv://abuzar:123@cluster0.walhm7e.mongodb.net/?retryWrites=true&w=majority');

// Database connection
// mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('Database connected...');
// }).catch(err => {
//     console.log('Connection failed...')
// });





 

//satckoverflow code
// mongoose.connect(
//     'mongodb://myUserAdmin:Mongo123@localhost:27017/pizza',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err) => {
//       if (err) {
//         console.error('FAILED TO CONNECT TO MONGODB');
//         console.error(err);
//       } else {
//         console.log('CONNECTED TO MONGODB');
//         app.listen(3300);
//       }
//     }
//   );

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Set Template Engine
app.use(Expresslayouts)
app.set('views',Path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// solving local host issue

require('./routes/web')(app);  // this is function call



 
app.listen(Port,()=>{
    console.log(`Listening on Port  ${Port}`);
})

