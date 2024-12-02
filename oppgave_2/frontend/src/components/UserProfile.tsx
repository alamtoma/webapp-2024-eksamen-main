'use client';

import React from 'react';
import { useAuthContext } from './AuthContext';

export const UserProfile = () => {
  const { user, logout } = useAuthContext();

  if (!user) {
    return <p>No user is logged in.</p>;
  }

  return (
    <div>
      <h3>User Profile</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
