const Order = require('../../../models/order')
const moment = require('moment')

function orderController () {
    return {
        store(req, res) {
            console.log(req.body)
            // Validate request
            const { phone, address } = req.body
            if(!phone || !address) {
                req.flash('error', 'All fields are required' );
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
                
            })

            order.save().then(result => {
                  req.flash('success', 'Order placed successfully')
                  delete req.session.cart
                  return res.redirect('/customer/orders');
            }).catch(err => {
                //req.flash('error', 'Something went wrong' );
                console.log("Can't store yours orders: %s", err);

                return res.redirect('/cart');
            })

        },
        async index(req, res) {
            // const orders = await Order.find({ customerId: req.user._id })
            // console.log(orders)    

            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } } )
            //res.header('Cache-Control', 'no-store')
            res.render('customer/orders', { orders: orders, moment: moment }) //here it is orders.ejsin customer
        }
        // async show(req, res) {
        //     const order = await Order.findById(req.params.id)
        //     // Authorize user
        //     if(req.user._id.toString() === order.customerId.toString()) {
        //         return res.render('customers/singleOrder', { order })
        //     }
        //     return  res.redirect('/')
        // }


        }
    }


module.exports = orderController
