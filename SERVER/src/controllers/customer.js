import customerModel from '../models/customer.js'

export const getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await customerModel.findById(id);
        if (result) {
            res.status(200).json(result)
        } else {
            console.log('customer not found');
        }
    } catch (err) {
        console.log(err);
    }
}

export const getAllCustomer = async (req, res) => {
    try {
        const result = await customerModel.find()
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).send('no customer found');
        }
    } catch (err) {
        console.log(err);
    }
}

export const addCustomer = async (req, res) => {
    try {
        const result = await customerModel.create(req.body)
        if (result) {
            res.status(200).json(result)
        } else {
            console.log('customer added failed');
        }
    } catch (err) {
        console.log(err);
    }
}
export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await customerModel.findByIdAndDelete(id);
        if (result) {
            res.status(200).json('one customer deleted')
        } else {
            res.status(404).json('customer not found')
        }
    } catch (err) {
        console.log(err);

    }
}
export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await customerModel.findByIdAndUpdate(
            id,
            { $set: req.body }
        )
        if (result) {
            res.status(200).json('customer data updated', result)
        } else {
            res.status(500).json('customer not found')
        }
    } catch (err) {
        console.log(err);
    }
}