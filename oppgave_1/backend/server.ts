import { Hono } from "hono";
import { json } from "hono/http";

// Simulert database med kursdata
const courses = [
  { id: 1, title: "Kurs 1", description: "Beskrivelse 1", category: "Design", slug: "kurs-1" },
  { id: 2, title: "Kurs 2", description: "Beskrivelse 2", category: "Utvikling", slug: "kurs-2" },
  { id: 3, title: "Kurs 3", description: "Beskrivelse 3", category: "Design", slug: "kurs-3" },
];

// Opprett en Hono-applikasjon
const app = new Hono();

// API-endepunkt for å hente alle kurs
app.get("/courses", (c) => {
  return json(courses); // Returner kursene som JSON
});

// API-endepunkt for å hente alle kategorier
app.get("/categories", (c) => {
  // Finn unike kategorier fra kursene
  const categories = [...new Set(courses.map((course) => course.category))];
  return json(categories); // Returner kategoriene som JSON
});

// Start serveren
app.fire();