'use client';

import React, { useState } from 'react';
import Filter from '../components/FilterBar';
import ButtonPanel from './ButtonPanel';
import '../styles/css/global.css'
import FilterBar from '../components/FilterBar';
import EventPanelWithFilters from '../components/EventPanelWithFilters';
export default function HomePage() {
  const [filters, setFilters] = useState({ month: 'All', year: 'All', type: 'All' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      

      <ButtonPanel/>
      <EventPanelWithFilters/>
      {/* <FilterBar/> */}
    </>
  );
}
