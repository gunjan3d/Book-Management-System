import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send('Missing required fields');
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send('Missing required fields');
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

export default router;
