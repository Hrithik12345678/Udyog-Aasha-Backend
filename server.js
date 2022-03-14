const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var fileupload = require("express-fileupload");




// for .env file
require("dotenv").config();


const app = express();
const port = 5000;


// for connecting backend to frontend, Origin is vercel hosting app
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

//Routes
app.use("/user", require("./routes/userRouter")); // initial route. !!!important
app.use("/tr", require("./routes/train_route"));
app.use("/product", require("./routes/product"));
app.use("/payment", require("./routes/paymentRoute"));
app.use("/Cart",require("./routes/Cart_router"));
app.use("/service",require("./routes/serviceRoute"));
app.use("/admin", require("./routes/admin"));
// const productRoutes = require('./routes/products');
// app.use('/products', productRoutes);
app.use(fileupload());
//connect to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
