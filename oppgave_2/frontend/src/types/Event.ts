

export interface Event {
  id?: number; // Optional, assigned by the backend
  title: string;
  date: string;
  recurring: string; // Example: "Yes/No"
  capacity: number; // Renamed to `capacity` for clarity
  price: string; // e.g., "300 NOK"
  description: string;
  maxParticipants?: number; // Optional field if needed
  type?: string; // Optional field if needed
}
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

