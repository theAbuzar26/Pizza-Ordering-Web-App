
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app){

    app.get('/', homeController().index)
    // is similar to
    // app.get('/',(req,res)=>{
    //     res.render('home');
    // }) 
     
    app.get('/login', authController().login)
 
    app.get('/register', authController().register)
   
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)


}


// exporting initRoutes(web.js)
module.exports=initRoutes