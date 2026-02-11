import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

const port = process.env.PORT || 7000;
const app = express();

// conneect to database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all end points
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);


// test route
app.get("/", (req, res) => {
  res.status(200).send("server is running.");
});

// listen to port
app.listen(port, () => {
  console.log(`server running at ${port}`);
});

// when server running it will show a message in terminal: 'server running at ****'
// when mongodb is connected it will show a message in terminal: 'MongoDb Connected at [dbName]'