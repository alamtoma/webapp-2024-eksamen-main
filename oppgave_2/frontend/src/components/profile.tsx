'use client';

import React from 'react';
import useAuthContext from '../components/AuthContext';

export const Profile = () => {
  const { user, logout } = useAuthContext();

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.username} ({user.role})</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};
