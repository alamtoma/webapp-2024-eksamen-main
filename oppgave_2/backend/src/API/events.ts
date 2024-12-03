import express, { Request, Response } from "express";

const router = express.Router();

const events: any[] = []; // Temporary in-memory storage for events

// Route to create an event
router.post('/api/events', (req, res) => {
  const { name, type, maxParticipants, date, price, location, privateEvent, allowWaitlist } = req.body;

  const newEvent = {
    id: Date.now(),
    name,
    type,
    maxParticipants,
    date,
    price,
    location,
    privateEvent,
    allowWaitlist,
    status: 'Pending Approval',
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// // Route to get all events
// router.get("/", (req: Request, res: Response) => {
//   return res.status(200).json(events);
// });

router.get('/api/events/pending', (req, res) => {
  const pendingEvents = events.filter((event) => event.status === 'Pending Approval');
  res.json(pendingEvents);
});
router.patch('/api/events/:id/approve', (req, res) => {
  const { id } = req.params;
  const event = events.find((event) => event.id === parseInt(id));
  if (event) {
    event.status = 'Approved';
    res.json({ message: 'Event approved.' });
  } else {
    res.status(404).json({ message: 'Event not found.' });
  }
});

router.patch('/api/events/:id/reject', (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((event) => event.id === parseInt(id));
  if (eventIndex !== -1) {
    events.splice(eventIndex, 1);
    res.json({ message: 'Event rejected and removed.' });
  } else {
    res.status(404).json({ message: 'Event not found.' });
  }
});

export default router;
