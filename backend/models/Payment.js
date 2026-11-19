// Split & Sip: the payments model (Hana Y)
// The only code that touches the data
import mongoose from "mongoose";

// The shape of one payment: "from" paid "to" back
const paymentSchema = new mongoose.Schema({
  // The _id of the group it belongs to
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  from: { type: String, required: true }, // who paid back
  to: { type: String, required: true }, // who got the money
  amount: { type: Number, required: true },
  // The _id of the user who marked it as paid
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// The model: our handle on the "payments" collection
const Payment = mongoose.model("Payment", paymentSchema);

export async function getAllPayments() {
  return Payment.find();
}

export async function getPaymentById(id) {
  // "abc" can never be an _id: not found
  if (!mongoose.isValidObjectId(id)) return null;
  return Payment.findById(id);
}

export async function addPayment(data) {
  // The schema keeps only the fields it knows
  return Payment.create(data);
}

export async function removePayment(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  return Payment.findByIdAndDelete(id);
}