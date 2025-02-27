import express from "express"
import {config} from "dotenv"
config()
import cors from "cors"

import ordersRouter from "./Router/ordersRouter.js"
import orderItemRouter from "./Router/orderItemRouter.js"
import paymentsRouter from "./Router/paymentsRouter.js"
import authRouter from "./Router/authRouter.js"
import usersRouter from "./Router/usersRouter.js"
import productsCategoriesRouter from "./Router/productsCategoriesRouter.js"

//Products and cart router
import productsRouter from "./Router/productsRouter.js"
import cartRouter from "./Router/cartRouter.js"; // Import the cart router

//creating app 
const app =express()

app.use(cors())
app.use(express.json())//to allow data to be added to the Json()file
//to access the env config file 


app.use("/api/checkout", ordersRouter)
app.use("/order_items", orderItemRouter)
app.use("/payments", paymentsRouter)
app.use("/api/auth", authRouter);
app.use("/users", usersRouter)
app.use("/productcategories", productsCategoriesRouter)
app.use("/products", productsRouter)
app.use("/cart", cartRouter); // Cart routes

//creating a port 
const PORT = 5050
app.listen(PORT, ()=>{
    console.log("http://localhost:"+PORT)
    console.log("I am running👍...")
})

