// src/components/FilterBar.tsx
'use client';

import React, { useState } from 'react';
import '../styles/css/FilterBar.css'
type FilterBarProps = {
  onFiltersChange: (filters: { year: string; month: string; name: string }) => void;
};

export default function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    year: 'All',
    month: 'All',
    name: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters); // Pass updated filters to the parent
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
      <h3>Filter Events</h3>
      <label style={{ marginRight: '15px' }}>
        Year:
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="All">All</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </label>
      <label style={{ marginRight: '15px' }}>
        Month:
        <select
          name="month"
          value={filters.month}
          onChange={handleFilterChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="All">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
        </select>
      </label>
      <label>
        Event Name:
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
          style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
        />
      </label>
    </div>
  );
}
