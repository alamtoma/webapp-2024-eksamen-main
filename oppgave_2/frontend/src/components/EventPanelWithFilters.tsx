// src/components/EventPanelWithFilters.tsx
'use client';

import React, { useState } from 'react';
import FilterBar from './FilterBar'; // Import the FilterBar component

type Event = {
  id: number;
  name: string;
  date: string;
  month: string;
  year: string;
  maxParticipants: number;
  price: string;
};

export default function EventPanelWithFilters() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Event A', date: '2024-01-01', month: 'January', year: '2024', maxParticipants: 50, price: '500 NOK' },
    { id: 2, name: 'Event B', date: '2023-02-01', month: 'February', year: '2023', maxParticipants: 30, price: 'Free' },
  ]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  // Handle filters from FilterBar
  const handleFiltersChange = (filters: { year: string; month: string; name: string }) => {
    const filtered = events.filter((event) => {
      const matchesYear = filters.year === 'All' || event.year === filters.year;
      const matchesMonth = filters.month === 'All' || event.month === filters.month;
      const matchesName = filters.name === '' || event.name.toLowerCase().includes(filters.name.toLowerCase());
      return matchesYear && matchesMonth && matchesName;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Event Manager with Filters</h1>

      {/* Include the FilterBar */}
      <FilterBar onFiltersChange={handleFiltersChange} />

      {/* Event List */}
      <h2>Event List</h2>
      {filteredEvents.length === 0 ? (
        <p>No events match the selected filters.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#fff',
              }}
            >
              <p><strong>Name:</strong> {event.name}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Month:</strong> {event.month}</p>
              <p><strong>Year:</strong> {event.year}</p>
              <p><strong>Participants:</strong> {event.maxParticipants}</p>
              <p><strong>Price:</strong> {event.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
