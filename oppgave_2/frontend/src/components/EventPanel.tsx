'use client';

import React, { useState } from 'react';
import '../styles/css/EventPanel.css'

type Event = {
  id: number;
  name: string;
  date: string;
  maxParticipants: number;
  price: string;
};

export default function EventPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    maxParticipants: 50,
    price: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId !== null) {
      // Update the existing event
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingId ? { ...event, ...formData } : event
        )
      );
      alert('Event updated successfully!');
    } else {
      // Add a new event
      const newEvent: Event = { id: Date.now(), ...formData };
      setEvents((prev) => [...prev, newEvent]);
      alert('Event created successfully!');
    }

    // Reset form and editing state
    resetForm();
  };

  // Reset form and state
  const resetForm = () => {
    setFormData({ name: '', date: '', maxParticipants: 50, price: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  // Handle edit button click
  const handleEdit = (id: number) => {
    const eventToEdit = events.find((event) => event.id === id);
    if (eventToEdit) {
      setFormData(eventToEdit);
      setIsEditing(true);
      setEditingId(id);
    }
  };

  // Handle delete button click
  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    alert('Event deleted successfully!');
  };

  return (
    <div>
      <h1>Event Manager</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Max Participants:
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleInputChange}
            min="1"
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>

      <h2>Event List</h2>
      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event) => (
            <li
              key={event.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <p><strong>Name:</strong> {event.name}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Max Participants:</strong> {event.maxParticipants}</p>
              <p><strong>Price:</strong> {event.price}</p>
              <button onClick={() => handleEdit(event.id)}>Edit</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
