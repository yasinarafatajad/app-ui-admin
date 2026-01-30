import "mongoose";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name:String,
    email: String
},{timestamps:true, versionKey:false})