import { Registration } from "../types/types";
const API_BASE_URL = "http://localhost:3000/api"; // Backend URL

export const api = {
  login: (credentials: { username: string; password: string }) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((res) => res.json()),

  fetchEvents: () =>
    fetch(`${API_BASE_URL}/events`).then((res) => res.json()),

  createEvent: (event: Event) =>
    fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).then((res) => res.json()),

  fetchRegistrations: (eventId: number) =>
    fetch(`${API_BASE_URL}/registrations/${eventId}`).then((res) =>
      res.json()
    ),

  updateRegistration: (id: number, status: string) =>
    fetch(`${API_BASE_URL}/registrations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then((res) => res.json()),

  addRegistration: (registration: Registration) =>
    fetch(`${API_BASE_URL}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    }).then((res) => res.json()),
};
