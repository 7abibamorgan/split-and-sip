
 // Split & Sip: the hangout plans model (Haneen)
 // The only code that touches the data
 import mongoose from "mongoose";

 // The shape of one plan
 const planSchema = new mongoose.Schema({
   title: { type: String, required: true },
   place: { type: String, required: true },
   // The date as text, e.g. "2026-12-20"
   date: { type: String, required: true },
   // The _id of the user who made the plan
   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 });

 // The model: our handle on the "plans" collection
 const Plan = mongoose.model("Plan", planSchema);

 export async function getAllPlans() {
   return Plan.find();
 }

 export async function getPlanById(id) {
   // "abc" can never be an _id: not found
   if (!mongoose.isValidObjectId(id)) return null;
   return Plan.findById(id);
 }

 export async function addPlan(data) {
   // The schema keeps only the fields it knows
   return Plan.create(data);
 }

 export async function removePlan(id) {
   if (!mongoose.isValidObjectId(id)) return null;
   return Plan.findByIdAndDelete(id);
 }
