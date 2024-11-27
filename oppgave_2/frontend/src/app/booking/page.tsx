'use client';

import React, { useState } from 'react';
import './page.css';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    maxParticipants: '',
    date: '',
    price: '',
    location: '',
    isPrivate: false,
    allowWaitlist: false,
    participants: [{ name: '', email: '' }],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle participant changes
  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = formData.participants.map((participant, i) =>
      i === index ? { ...participant, [field]: value } : participant
    );
    setFormData((prev) => ({ ...prev, participants: updatedParticipants }));
  };

  // Add a new participant
  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '' }],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Arrangement opprettet!');
    // Add logic to send formData to the backend API
  };

  return (
    <div className="booking-page">
      <header>
        <h1>Opprett en ny Arrangement fra bruker</h1>
      </header>

      <form className="form-container" onSubmit={handleSubmit}>
        <section>
          <label>Navn på arrangement:</label>
          <select name="title" value={formData.title} onChange={handleChange}>
            <option value="">Velg</option>
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
          </select>

          <label>Type arrangement:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Velg</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
          </select>

          <label>Antall personer (maks 50):</label>
          <input
            type="number"
            name="maxParticipants"
            max="50"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
          />

          <label>Event Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Pris per person (NOK):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Lokasjon:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
              />
              Privat arrangement
            </label>
            <label>
              <input
                type="checkbox"
                name="allowWaitlist"
                checked={formData.allowWaitlist}
                onChange={handleChange}
              />
              Tillat venteliste
            </label>
          </div>

          <button type="button" onClick={addParticipant}>
            Add Participant
          </button>

          <button type="submit">Registration</button>
        </section>

        {formData.participants.map((participant, index) => (
          <div key={index}>
            <h3>Participant {index + 1}</h3>
            <label>Navn:</label>
            <input
              type="text"
              value={participant.name}
              onChange={(e) =>
                handleParticipantChange(index, 'name', e.target.value)
              }
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={participant.email}
              onChange={(e) =>
                handleParticipantChange(index, 'email', e.target.value)
              }
              required
            />
          </div>
        ))}

        <section>
          <h2>Create Event from Scratch</h2>
          <label>Navn på arrangement:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Type arrangement:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />

          <label>Event Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            rows="4"
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="create-button">
            Create
          </button>
        </section>
      </form>

      <footer>
        <p>&copy;2024 Arrangement med Booking</p>
      </footer>
    </div>
  );
}
