// const order = require("../../../models/order")

// //const Order = require('../../../models/order')

// function orderController() {
//     return {
//         index(req, res) {
//            order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').then((orders) => {
//             if(req.xhr) {
//                 return res.json(orders)
//             } 
//              return res.render('admin/orders')
            
//           }).catch((err) => {
//             console.log(err)
//           });
//           //return res.render('admin/orders') 
//             //here it is orders,ejs from resources/admin
//         }
//     }
// }

// module.exports = orderController


const order = require("../../../models/order");

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await order.find({ status: { $ne: 'completed' } })
                    .sort({ 'createdAt': -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('admin/orders');
                }
            } catch (err) {
                console.error(err);
                return res.status(500).send('An error occurred');
            }
        }
    };
}

module.exports = orderController;
