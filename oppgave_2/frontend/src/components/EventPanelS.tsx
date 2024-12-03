'use client';

import React, { useState } from 'react';

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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Create an Event from Scratch</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
          margin: '0 auto 20px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2>{isEditing ? 'Edit Event' : 'New Event'}</h2>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Max Participants:
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleInputChange}
            min="1"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: isEditing ? '#4caf50' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isEditing ? 'Update Event' : 'Create Event'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{ textAlign: 'center' }}>Event List</h2>
      {events.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No events created yet.
        </p>
      ) : (
        <ul style={{ maxWidth: '600px', margin: '0 auto', padding: 0 }}>
          {events.map((event) => (
            <li
              key={event.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#fff',
              }}
            >
              <p><strong>Name:</strong> {event.name}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Max Participants:</strong> {event.maxParticipants}</p>
              <p><strong>Price:</strong> {event.price}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                <button
                  onClick={() => handleEdit(event.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ffc107',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
