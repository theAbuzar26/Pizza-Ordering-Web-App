function cartController() {
    return {
        index(req,res){
            res.render('customer/cart')
        }
        // async index(req, res) {
        //     const pizzas = await Menu.find()
        //     return res.render('home', { pizzas: pizzas })
        // }
    }
}

module.exports = cartController