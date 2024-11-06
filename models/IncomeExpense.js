// models/IncomeExpense.js
const mongoose = require('mongoose');

const incomeExpenseSchema = new mongoose.Schema({
    type: { type: String, required: true }, // "income" or "expense"
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('IncomeExpense', incomeExpenseSchema);
