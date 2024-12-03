'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the Event type
type Event = {
  id: number;
  name: string;
  date: string;
  maxParticipants: number;
  price: string;
};

// Define the EventContext type
type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: number) => void;
};

// Create the EventContext
const EventContext = createContext<EventContextType | undefined>(undefined);

// Create the EventProvider
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const removeEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };
// Custom hook to use the EventContext
 const useEventContext = (): EventContextType => {
    const context = useContext(EventContext);
    if (!context) {
      throw new Error('useEventContext must be used within an EventProvider');
    }
    return context;
  };
  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// // Custom hook to use the EventContext
// export const useEventContext = (): EventContextType => {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error('useEventContext must be used within an EventProvider');
//   }
//   return context;
// };
