require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected sucessfully"))
    .catch((e) => console.log(e))


// use middleware 
app.use(express.json());

app.listen(PORT,() => {
    console.log(`Server is now running on port ${PORT}`)
})