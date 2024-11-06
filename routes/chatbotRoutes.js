const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const Budget = require('../models/Budget');  // Ensure this path is correct

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Make sure your OpenAI API key is in .env
});

// POST route for suggestions
router.post('/suggestions', async (req, res) => {
    try {
        const { userId, message } = req.body;
        const budget = await Budget.findOne({ userId });

        if (!budget) {
            return res.status(404).json({ message: 'No budget data found for user' });
        }

        const prompt = `
            User Income: ${budget.averageIncome}
            User Expenses: ${budget.averageExpenses}
            User Goals: ${budget.goals}
            User Message: "${message}"
            Provide financial advice based on user data.
        `;

        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
        });

        res.json({ response: response.choices[0].text.trim() });
    } catch (error) {
        console.error('Error generating suggestions:', error.message || error);
        res.status(500).json({ message: 'Error generating suggestions' });
    }
});

module.exports = router;
