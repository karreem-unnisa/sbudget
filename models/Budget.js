const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
   userId: String,
   averageIncome: Number,
   averageExpenses: Number,
   goals: String,
});

module.exports = mongoose.model('Budget', budgetSchema);
