const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
    unique: true,
  },
  childName: String,
  class: String,
  section: String,
  callerName: String,
  mobile: String,
  email: String,
  subject: String,
  content: String,
  status: {
    type: String,
    enum: ["Not Done", "In Progress", "Solved"],
    default: "Not Done",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      sender: String, // "admin" or "user"
      text: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
