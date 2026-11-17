import mongoose from "mongoose";

// The shape of one expense
const expenseSchema = new mongoose.Schema({
  // The _id of the group it belongs to
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  // Who paid: a member's name
  paidBy: { type: String, required: true },
  // Everyone who shares it: the members' names
  splitBetween: { type: [String], required: true },
  // The _id of the user who added it
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// The model: our handle on the "expenses" collection
const Expense = mongoose.model("Expense", expenseSchema);

export async function getAllExpenses() {
  return Expense.find();
}

export async function getExpenseById(id) {
  // "abc" can never be an _id: not found
  if (!mongoose.isValidObjectId(id)) return null;
  return Expense.findById(id);
}

export async function addExpense(data) {
  // The schema keeps only the fields it knows
  return Expense.create(data);
}

export async function removeExpense(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  return Expense.findByIdAndDelete(id);
}