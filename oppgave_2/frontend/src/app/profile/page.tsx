'use client';

import React from 'react';
import { UserProfile } from '../../components/UserProfile';
import { LoginPanel } from '../../components/LoginPanel';
import { useAuthContext } from '../../components/AuthContext';

export default function ProfilePage() {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? <UserProfile /> : <LoginPanel />}
    </div>
  );
}
