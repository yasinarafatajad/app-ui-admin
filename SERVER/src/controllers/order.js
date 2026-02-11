import OrderModel from '../models/order.js'

export const GetOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OrderModel.findOne({ _id: id });
        if (!result) {
            console.log('order not found');
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err.message);
    }
};
export const GetAllOrder = async (req, res) => {
    try {
        const result = await OrderModel.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);

    }
};
export const AddOrder = async (req, res) => {
    const {
        user,
        items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        discountPrice,
        totalPrice,
        orderStatus,
        isPaid
    } = req.body;
    const orderData = {
        user,
        items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        discountPrice,
        totalPrice,
        orderStatus,
        isPaid
    }
    try {
        const result = await OrderModel.create(orderData)
        res.status(200).json(result);
    } catch (err) {
        console.log('Order adding failed :', err.message);
    }
};
export const DeleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await OrderModel.findOneAndDelete({ _id: id })
        if (result) {
            res.status(200).json('Order Deleted.')
        } else {
            res.status(500).json('Order isn\'t exist in DB')
        }
    } catch (err) {
        console.log('Order delete failed. ', err.message);

    }
};
export const UpdateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await OrderModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (result) {
            res.status(200).json('Order updated')
        } else {
            res.status(500).json('Order not found')
        }
    } catch (err) {
        console.log(err.message);
    }
};