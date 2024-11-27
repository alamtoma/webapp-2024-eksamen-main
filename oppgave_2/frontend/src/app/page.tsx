'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '../styles/css/page.css';


export default function HomePage() {
  const router = useRouter();
  const [arrangements, setArrangements] = useState([]);


   // Fetch arrangements from the backend
   const fetchArrangements = async () => {
    try {
      const response = await fetch('/api/arrangements'); // Replace with your API endpoint
      const data = await response.json();
      setArrangements(data);
    } catch (error) {
      console.error('Error fetching arrangements:', error);
    }
  };

  // Fetch arrangements when the component mounts
  useEffect(() => {
    fetchArrangements();
  }, []);
  const handleCreateBooking = () => {
    router.push('/booking');
  };

  const handleManageRegistration = () => {
    router.push('/admin');
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="header-title">Velkommen til Arrangementer</h1>
          <nav className="navbar">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/login" className="nav-link">
              Logg in
            </a>
            <a href="/register" className="nav-link">
              Register
            </a>
          </nav>
        </div>
      </header>

      {/* Buttons */}
      <div className="button-container">
        <button onClick={handleCreateBooking} className="btn">
          Opprett Nytt arrangement
        </button>
        <button onClick={handleManageRegistration} className="btn">
          Adminstrer påmelding
        </button>
      </div>
      {/* Arrangements List */}
      <div className="arrangements-list">
        <h2>Liste over arrangementer</h2>
        {arrangements.length > 0 ? (
          <ul className="arrangements">
            {arrangements.map((arrangement) => (
              <li key={arrangement.id} className="arrangement-item">
                <h3>{arrangement.title}</h3>
                <p>Dato: {arrangement.date}</p>
                <p>Maks deltakere: {arrangement.maxParticipants}</p>
                <p>Pris: {arrangement.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ingen arrangementer tilgjengelige.</p>
        )}
      </div>


      {/* Footer */}
      <footer className="footer">
        <p>&copy;2024 Arrangement med Booking</p>
      </footer>
    </div>
  );
}
