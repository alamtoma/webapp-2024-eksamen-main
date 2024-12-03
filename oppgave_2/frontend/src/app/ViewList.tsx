'use client';

import React, { useState } from 'react';

type Event = {
  id: number;
  name: string;
  date: string; // Includes both year and month
  month: string; // Extracted for filtering
  year: string; // Extracted for filtering
  maxParticipants: number;
  price: string;
};

export default function EventPanelWithFilters() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({
    year: 'All',
    month: 'All',
    name: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    maxParticipants: 50,
    price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle filter input changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle form submission for creating/updating events
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventDate = new Date(formData.date);
    const newEvent: Event = {
      id: isEditing && editingId ? editingId : Date.now(),
      name: formData.name,
      date: formData.date,
      month: eventDate.toLocaleString('default', { month: 'long' }),
      year: eventDate.getFullYear().toString(),
      maxParticipants: formData.maxParticipants,
      price: formData.price,
    };

    if (isEditing && editingId) {
      setEvents((prev) => prev.map((event) => (event.id === editingId ? newEvent : event)));
      setIsEditing(false);
      setEditingId(null);
    } else {
      setEvents([...events, newEvent]);
    }

    setFormData({ name: '', date: '', maxParticipants: 50, price: '' });
    alert('Event saved successfully!');
  };

  // Handle edit event
  const handleEdit = (id: number) => {
    const eventToEdit = events.find((event) => event.id === id);
    if (eventToEdit) {
      setFormData(eventToEdit);
      setIsEditing(true);
      setEditingId(id);
    }
  };

  // Handle delete event
  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    alert('Event deleted successfully!');
  };

  // Filter events based on the filters state
  const filteredEvents = events.filter((event) => {
    const matchesYear = filters.year === 'All' || event.year === filters.year;
    const matchesMonth = filters.month === 'All' || event.month === filters.month;
    const matchesName = filters.name === '' || event.name.toLowerCase().includes(filters.name.toLowerCase());
    return matchesYear && matchesMonth && matchesName;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Event Manager with Filters</h1>

      {/* Form to create or edit events */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', maxWidth: '600px' }}>
        <h2>{isEditing ? 'Edit Event' : 'Create Event'}</h2>
        <label>
          Name:
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
          Date:
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
          Max Participants:
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Price (NOK):
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff' }}>
          {isEditing ? 'Update Event' : 'Create Event'}
        </button>
      </form>

      {/* Filters */}
      <div style={{ marginBottom: '20px', maxWidth: '600px' }}>
        <h2>Filters</h2>
        <label>
          Year:
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            style={{ marginLeft: '10px', padding: '8px' }}
          >
            <option value="All">All</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          Month:
          <select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            style={{ marginLeft: '10px', padding: '8px' }}
          >
            <option value="All">All</option>
            <option value="January">January</option>
            <option value="February">February</option>
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          Name:
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            style={{ marginLeft: '10px', padding: '8px' }}
          />
        </label>
      </div>

      {/* Event List */}
      <h2>Event List</h2>
      {filteredEvents.length === 0 ? (
        <p>No events match the selected filters.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px' }}>
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Name:</strong> {event.name}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Month:</strong> {event.month}</p>
              <p><strong>Year:</strong> {event.year}</p>
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
