const express = require('express');
const router = express.Router();
const IncomeExpense = require('../models/IncomeExpense');

// Save income/expense
router.post('/', async (req, res) => {
    const { type, amount, category, date } = req.body;
    const entry = new IncomeExpense({ type, amount, category, date });

    try {
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        res.status(400).json({ error: 'Error saving entry' });
    }
});

// Get all entries
router.get('/', async (req, res) => {
    try {
        const entries = await IncomeExpense.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete entry with ID:", id);
    try {
        const result = await IncomeExpense.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting entry:', err);
        res.status(500).json({ error: 'Error deleting entry' });
    }
});


module.exports = router;
