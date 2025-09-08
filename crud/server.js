require('dotenv').config()
const express = require('express');
const connectToDb = require('./database/database')
const bookRoutes = require('./routes/book-routes')

const app = express();

const PORT = process.env.PORT || 3000;

connectToDb();

// middleware
app.use(express.json());

// routes here
app.use('/api/books', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server is now running on PORT ${PORT}`)
})