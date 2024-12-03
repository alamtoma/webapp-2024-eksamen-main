"use client"
import Header from '../components/Header';
import { AuthProvider } from '../components/AuthContext'; // Import AuthProvider if authentication is needed
import FilterBar from '../components/FilterBar'; // Import FilterBar
import React, { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Filter state to manage globally across the layout
  const [filters, setFilters] = useState({
    year: 'All',
    month: 'All',
    name: '',
  });

  // Handler to update filter state
  const handleFiltersChange = (updatedFilters: { year: string; month: string; name: string }) => {
    setFilters(updatedFilters);
    console.log('Updated Filters:', updatedFilters); // Debugging filter updates
  };

  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* Wrap with AuthProvider */}
          {/* Global Header */}
          <Header />
          <main>
           
            {/* Render children content */}
            {children}
          </main>
          {/* Footer */}
          <footer className="footer">
            <p>&copy;2024 Arrangement med Booking</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
