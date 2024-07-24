import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        console.log('test');

        Book.find()
            .then((books) => res.json(books))
            .catch((err) => res.status(400).json('Error: ' + err));
    });

router.route('/:id')
    .get((req, res) => {
        Book.findById(req.params.id)
            .then((book) => res.json(book))
            .catch((err) => res.status(400).json('Error: ' + err));
    });

router.route('/add')
    .post((req, res) => {

        const { title, author, pages, fiction } = req.body;

        const newBook = new Book({ title, author, pages, fiction });

        newBook.save()
            .then(() => res.json('Book added!'))
            .catch((err) => res.status(400).json('Error: ' + err));
    });

router.route('/update/:id')
    .put((req, res) => {
        Book.findById(req.params.id)
            .then((book) => {
                book.title = req.body.title;
                book.author = req.body.author;

                book.save()
                    .then(() => res.json('Book updated!'))
                    .catch((err) => res.status(400).json('Error: ' + err));
            })
            .catch((err) => res.status(400).json('Error: ' + err));
    });

router.route('/delete/:id')
    .delete((req, res) => {
        Book.findByIdAndDelete(req.params.id)
            .then(() => res.json('Book deleted.'))
            .catch((err) => res.status(400).json('Error: ' + err));
    });

export default router;
