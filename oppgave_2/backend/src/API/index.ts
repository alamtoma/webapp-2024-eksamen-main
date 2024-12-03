import express from "express";
import { Router } from "express"; // Use ES Module syntax
import contactFromH from "./contact-form"; // Ensure you include the .js extension

const router = Router();

// Define your routes
router.post("/Contact", contactFromH.postMessage);
router.get("/Contact", contactFromH.getMessage);
router.get("/Contact/:id", contactFromH.getMessage);


// Export the router as a module
export default router;
