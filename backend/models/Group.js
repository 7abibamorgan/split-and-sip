// Split & Sip: the groups model (Hana H)
// The only code that touches the data
import mongoose from "mongoose";

// The shape of one group
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // The members' names, e.g. ["Habiba", "Sara", "Farida"]
  members: { type: [String], required: true },
  // The _id of the user who created it
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// The model: our handle on the "groups" collection
const Group = mongoose.model("Group", groupSchema);

export async function getAllGroups() {
  return Group.find();
}

export async function getGroupById(id) {
  // "abc" can never be an _id: not found
  if (!mongoose.isValidObjectId(id)) return null;
  return Group.findById(id);
}

export async function addGroup(data) {
  // The schema keeps only the fields it knows
  return Group.create(data);
}

export async function updateGroup(id, data) {
  if (!mongoose.isValidObjectId(id)) return null;
  // new: true sends back the group after the update
  return Group.findByIdAndUpdate(id, data, {
    new: true,
  });
}

export async function removeGroup(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  return Group.findByIdAndDelete(id);
}