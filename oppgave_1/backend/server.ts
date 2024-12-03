import { Context, Hono } from "hono";
import { json } from "hono";

// Simulert database med kursdata
const courses = [
  { id: 1, title: "Kurs 1", description: "Beskrivelse 1", category: "Design", slug: "kurs-1" },
  { id: 2, title: "Kurs 2", description: "Beskrivelse 2", category: "Utvikling", slug: "kurs-2" },
  { id: 3, title: "Kurs 3", description: "Beskrivelse 3", category: "Design", slug: "kurs-3" },
];

// Opprette en Hono-applikasjon
const app = new Hono();

// API-endepunkt for å hente kurs
app.get("/courses", (c: Context) => {
  return json(courses); // Returner kursene som JSON
});

// API-endepunkt for å hente kategorier
app.get("/categories", (c: Context) => {
  // Finn unike kategorier fra kurs
  const categories = [...new Set(courses.map((course) => course.category))];
  return json(categories); // Returner kategoriene som JSON
});

app.fire();