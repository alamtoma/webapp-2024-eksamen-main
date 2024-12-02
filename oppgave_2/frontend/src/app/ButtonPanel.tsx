'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/css/ButtonPanel.css'; // Ensure the styles file exists for proper button styling.

export default function ButtonPanel() {
  const router = useRouter();

  return (
    <div className="button-panel">
      {/* Button for Creating an Event */}
      <button
        className="btn primary"
        onClick={() => router.push('/event')}
      >
        User event
      </button>

      {/* Button for Administering Events */}
      <button
        className="btn tertiary"
        onClick={() => router.push('/admin')}
      >
        Administere Arrangement
      </button>
    </div>
  );
}
