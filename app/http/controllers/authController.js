function authController() {

    return {
        login(req, res) {
            res.render('authorization/login')
        },
        register(req, res) {
            res.render('authorization/register')
        }


    }
       
}

module.exports=authController
