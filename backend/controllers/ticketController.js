const Ticket = require("../models/Ticket");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// CREATE NEW TICKET
exports.createTicket = async (req, res) => {
  try {
    const caseId = "CASE-" + Date.now();
    const ticket = new Ticket({ ...req.body, caseId });
    await ticket.save();

    // (Optional) send email to user
    if (req.body.email) {
      sendMail(req.body.email, caseId, req.body.content);
    }

    res.status(201).json({ message: "Ticket created", caseId });
  } catch (err) {
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

// UPDATE TICKET STATUS
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to update ticket" });
  }
};

// SEND MAIL TO PARENT
const sendMail = async (to, caseId, content) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: `Complaint Acknowledgement: ${caseId}`,
    html: `<div style="text-align:center;font-family:sans-serif;">
            <img src="https://your-school-logo-link.png" style="height:80px" />
            <h2 style="color:#fff;background:#2b2b2b;padding:10px;">Your Complaint Has Been Received</h2>
            <p>Thank you for reaching out. We’ve registered your complaint with Case ID <strong>${caseId}</strong>.</p>
            <div style="margin-top:20px;border-top:1px solid #ccc;padding-top:10px;">
              <strong>Message:</strong><br/>${content}
            </div>
          </div>`,
  });
};
