'use client';

import React from 'react';
import '../styles/css/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">Velkommen til Arrangementer</div>
      <nav className="header-nav">
        <a href="/" className="header-link">Home</a>
        <a href="/login" className="header-link">Logg in</a>
        <a href="/register" className="header-link">Register</a>
      </nav>
    </header>
  );
}
