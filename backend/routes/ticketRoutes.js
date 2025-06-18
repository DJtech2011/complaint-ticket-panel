const express = require("express");
const router = express.Router();
const { createTicket, updateTicket } = require("../controllers/ticketController");

router.post("/new", createTicket);
router.put("/:id", updateTicket);

module.exports = router;
