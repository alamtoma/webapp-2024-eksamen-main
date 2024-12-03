'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './style/ButtonPanel.css'; // Ensure the styles file exists for proper button styling.
import { EventProvider } from './controllAdmin/EventContext';
import Header from '../../components/Header';

export default function ButtonPanel() {
  const router = useRouter();

  return (

    <div className="button-panel">
      {/* Button for Creating an Event */}
      <button
        className="btn primary"
        onClick={() => router.push('/admin/events')}
      >
        Opprett arrangement
      </button>

      {/* Button for Administering Events */}
      <button
        className="btn tertiary"
        onClick={() => router.push('/admin/controllAdmin')}
      >
        Administere Arrangement
      </button>

    </div>
  );
}
