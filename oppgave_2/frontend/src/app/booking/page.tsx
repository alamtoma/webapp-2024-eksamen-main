'use client';

import React, { useState } from 'react';

type Event = {
  id: number;
  name: string;
  type: string;
  date: string;
  description: string;
  status: 'Pending' | 'Approved'; // Status for admin approval
};

export default function EventSubmission() {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      date: formData.date,
      description: formData.description,
      status: 'Pending',
    };
    setEvents((prev) => [...prev, newEvent]);
    setFormData({ name: '', type: '', date: '', description: '' });
    alert('Event submitted for approval!');
  };

  const handleApprove = (id: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, status: 'Approved' } : event
      )
    );
    alert('Event approved!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Create Event from Scratch</h1>

      {/* Event Submission Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Navn på arrangement:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Type arrangement:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          ></textarea>
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit Event
        </button>
      </form>

      {/* Pending Events for Approval */}
      <h2>Pending Events</h2>
      {events.filter((event) => event.status === 'Pending').length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events
            .filter((event) => event.status === 'Pending')
            .map((event) => (
              <li
                key={event.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <p><strong>Name:</strong> {event.name}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <button
                  onClick={() => handleApprove(event.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Approve
                </button>
              </li>
            ))}
        </ul>
      )}

      {/* Approved Events */}
      <h2>Approved Events</h2>
      {events.filter((event) => event.status === 'Approved').length === 0 ? (
        <p>No approved events.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events
            .filter((event) => event.status === 'Approved')
            .map((event) => (
              <li
                key={event.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                  backgroundColor: '#d4edda',
                }}
              >
                <p><strong>Name:</strong> {event.name}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Description:</strong> {event.description}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
