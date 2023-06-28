//const express = require('express') //require not in es so use import for that
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"; //name authRoutes given by us
import categoryRoutes from "./routes/categoryRoutes.js"; //name categoryRoutes given by us
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';
//const colors = require('colors')

//Config dotenv
dotenv.config(); // for hiding the credentials  using dotenv.config for sensitive api keys etc.

//databse config
connectDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middlewares
app.use(cors()); //to avoid cross origin error
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// PORT
const PORT = process.env.PORT || 8080; // react's port 3000,node generally 8080/8000 ,angular 4200

//to run app means listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  ); //backtick for dynamic
});
