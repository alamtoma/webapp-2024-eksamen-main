import express, { Request, Response } from "express";

const router = express.Router();

// Add participants to an event
router.post("/:eventId/add-participant", (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const event = events.find((e) => e.id === parseInt(eventId));
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  event.participants.push({ name, email });
  return res.status(200).json({ message: "Participant added successfully", event });
});

export default router;
