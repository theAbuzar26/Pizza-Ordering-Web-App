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

//importing mongoose
const mongoose = require('mongoose');







//assets
app.use(express.static('public'));

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



mongoose.connect('mongodb://127.0.0.1:27017/pizza', 
    { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch( err => {
    console.log('Connection failed...')
}); 




// Set Template Engine
app.use(Expresslayouts)
app.set('views',Path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// solving local host issue

require('./routes/web')(app);  // this is function call



 
app.listen(Port,()=>{
    console.log(`Listening on Port  ${Port}`);
})

