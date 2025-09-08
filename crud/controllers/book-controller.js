
const Book = require('../models/books')

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find({});
        if (allBooks?.length > 0) {
            res.status(200).json({
                success: true,
                message: 'List of books fetched sucessfully',
                data: allBooks
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Bo books found in collection'
            })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}

const getSingleBookById = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const bookDetailsByID = await Book.findById(getCurrentBookID);

        if (!bookDetailsByID) {
            return res.status(404).json({
                success: false,
                message: 'Book with the current ID is not found! Please try again'
            })
        }

        res.status(200).json({
            success: true,
            data: bookDetailsByID,
        })
    } catch (error) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if (newBookFormData) {
            res.status(201).json({
                success: true,
                message: 'Book added successfully',
                data: newlyCreatedBook,
            });
        }
    } catch (error) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const updatedBookFormData = req.body;
        const getCurrentBookID = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(getCurrentBookID, updatedBookFormData, {
            new: true
        });

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found with this ID'
            });
        }
        res.status(200).json({
            success: true,
            data: updatedBook
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again.'
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findById(getCurrentBookID);

        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found with this ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted sucessfully',
            data: deleteBook
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again.'
        })
    }
}

module.exports = { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook };