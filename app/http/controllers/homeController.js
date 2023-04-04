function homeController() {
    return {
        index(req,res){
            res.render('home')
        }
        // async index(req, res) {
        //     const pizzas = await Menu.find()
        //     return res.render('home', { pizzas: pizzas })
        // }
    }
}

module.exports = homeController