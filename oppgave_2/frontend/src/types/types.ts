import React, { useState } from 'react';

export interface Event {
    id?: number; // Optional
    title: string;
    date: string;
    template?: string; // Optional
    lockWeekdays?: string;
    privateEvent?: string;
    maxParticipants: number;
    freeEvent?: string;
    price: string;
  }type FormData = {
    name: string;
    type: string;
    maxParticipants: number;
    eventDate: string;
    price: number;
    location: string;
    isPrivate: boolean;
    allowWaitlist: boolean;
    participants: { name: string; email: string }[];
  };
  
  // Use the type in your state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
    maxParticipants: 50,
    eventDate: '',
    price: 0,
    location: '',
    isPrivate: false,
    allowWaitlist: false,
    participants: [],
  });
  