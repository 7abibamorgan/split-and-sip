// Savings Goals model
// Split & Sip: Sara's savings goal model
import mongoose from "mongoose";

// The shape of one savings goal
const savingsGoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  savedAmount: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
// The model: our handle on the "savingsgoals" collection
const SavingsGoal = mongoose.model("SavingsGoal", savingsGoalSchema);
export async function getAllGoals() {
  return SavingsGoal.find();
}
export async function getGoalById(id) {
  // Check if the ID is valid
  if (!mongoose.isValidObjectId(id)) return null;

  return SavingsGoal.findById(id);
}
export async function addGoal(data) {
  // The schema keeps only the fields it knows
  return SavingsGoal.create(data);
}
export async function updateGoal(id, data) {
  if (!mongoose.isValidObjectId(id)) return null;

  // new: true sends back the goal after the update
  return SavingsGoal.findByIdAndUpdate(id, data, {
    new: true,
  });
}
export async function removeGoal(id) {
  if (!mongoose.isValidObjectId(id)) return null;

  return SavingsGoal.findByIdAndDelete(id);
}
