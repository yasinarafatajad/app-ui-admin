import OrderModel from '../models/order.js'
import customerModel from '../models/customer.js'
import ProductModel from "../models/product.js";

export const getStats = async (req, res) => {
    try {
        // const Order = await OrderModel.find();
        const totalOrder = await OrderModel.countDocuments();
        const totalCustomer = await customerModel.countDocuments();
        const totalProduct = await ProductModel.countDocuments();
        const revenueData = await OrderModel.aggregate([
            {
                $match: {
                    $or: [
                        { isPaid: true }, { orderStatus: 'delivered' }
                    ]
                }
            }, {
                $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } }
            }
        ]);
        const totalRevenue = await revenueData[0]?.totalRevenue;

        if (!totalOrder) {
            res.status(500).json('order not found')
        } else if (!totalCustomer) {
            res.status(500).json('customer not found')

        } else if (!totalProduct) {
            res.status(500).json('product not found')
        } else if (!totalRevenue) {
            res.status(500).json('revenue not found')
        } else {
            const stats = { totalProduct, totalCustomer, totalOrder, totalRevenue }
            // console.log(stats);            
            res.status(200).json(stats)
        }
    } catch (err) {
        console.log(err);
    }
}