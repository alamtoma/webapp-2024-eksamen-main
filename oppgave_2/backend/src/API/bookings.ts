import express, { Request, Response } from "express";

const router = express.Router();

interface Booking {
  id: number;
  name: string;
  type: string;
  date: string;
  participants: number;
  price: string;
  location: string;
  status: "Pending" | "Approved" | "Rejected";
}

const bookings: Booking[] = []; // In-memory storage for bookings

// Create a new booking
router.post("/api/bookings", (req: Request, res: Response) => {
  const { name, type, date, participants, price, location } = req.body;

  const newBooking: Booking = {
    id: Date.now(),
    name,
    type,
    date,
    participants,
    price,
    location,
    status: "Pending", // Initially marked as Pending
  };

  bookings.push(newBooking);
  res.status(201).json({ message: "Booking created and pending approval.", booking: newBooking });
});

// Get all pending bookings
router.get("/api/bookings/pending", (req: Request, res: Response) => {
  const pendingBookings = bookings.filter((booking) => booking.status === "Pending");
  res.json(pendingBookings);
});

// Approve a booking
router.patch("/api/bookings/:id/approve", (req: Request, res: Response) => {
  const { id } = req.params;

  const booking = bookings.find((b) => b.id === parseInt(id));
  if (booking) {
    booking.status = "Approved";
    res.json({ message: "Booking approved successfully.", booking });
  } else {
    res.status(404).json({ message: "Booking not found." });
  }
});

// Reject a booking
router.patch("/api/bookings/:id/reject", (req: Request, res: Response) => {
  const { id } = req.params;

  const booking = bookings.find((b) => b.id === parseInt(id));
  if (booking) {
    booking.status = "Rejected";
    res.json({ message: "Booking rejected successfully.", booking });
  } else {
    res.status(404).json({ message: "Booking not found." });
  }
});

// Get all approved bookings
router.get("/api/bookings/approved", (req: Request, res: Response) => {
  const approvedBookings = bookings.filter((booking) => booking.status === "Approved");
  res.json(approvedBookings);
});

// Get a specific booking by ID
router.get("/api/bookings/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const booking = bookings.find((b) => b.id === parseInt(id));
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found." });
  }
});

export default router;
