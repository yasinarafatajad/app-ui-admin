
import express from 'express';
import { addCustomer, getAllCustomer, getCustomer } from '../controllers/customer.js';

const router = express.Router();

router.get('/getCustomer/:id', getCustomer)
router.get('/getAllCustomer', getAllCustomer)
router.post('/addCustomer', addCustomer)
// router.put('/updateCustomer/:id',)
// router.delete('/deleteCustomer/:id',)

export default router;