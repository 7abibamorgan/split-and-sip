import {
    getAllExpenses,
    getExpenseById,
    addExpense,
    removeExpense,
  } from "../models/Expense.js";
  
  export async function handleGetAll(req, res) {
    res.json(await getAllExpenses());
  }
  
  export async function handleCreate(req, res) {
    const data = req.body || {}; // no body sent? use an empty object
    if (!data.group || !data.description || !data.amount || !data.paidBy || !data.splitBetween) {
      return res.status(400).json({ error: "group, description, amount, paidBy and splitBetween are required" });
    }
    const expense = await addExpense({
      group: data.group,
      description: data.description,
      amount: data.amount,
      paidBy: data.paidBy,
      splitBetween: data.splitBetween,
      // The owner is whoever is logged in, never what the client says
      owner: req.user.id,
    });
    res.status(201).json(expense);
  }
  
  export async function handleDelete(req, res) {
    const expense = await getExpenseById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    // Logged in is not enough: it must be YOUR expense
    if (String(expense.owner) !== req.user.id) {
      return res.status(403).json({ error: "This is not your expense" });
    }
    await removeExpense(req.params.id);
    res.status(204).end(); // done, nothing to send back
  }    