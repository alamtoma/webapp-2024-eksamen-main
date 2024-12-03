import React, { useState } from "react";
import { templates } from "../data/templates";

const EventCreation = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(template);
  };

  const handleCreateEvent = () => {
    console.log("Creating event with template:", selectedTemplate);
    alert("Event Created Successfully!");
  };

  return (
    <div className="event-creation">
      <h1>Create Event</h1>

      <h2>Select a Template</h2>
      <div className="template-list">
        {templates.map((template) => (
          <div key={template.id} className="template-item">
            <h3>{template.name}</h3>
            <p>Date: {template.date}</p>
            <button onClick={() => handleSelectTemplate(template.id)}>
              Select
            </button>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="selected-template">
          <h2>Selected Template</h2>
          <p>Name: {selectedTemplate.name}</p>
          <p>Date: {selectedTemplate.date}</p>
          <button onClick={handleCreateEvent}>Create Event</button>
        </div>
      )}
    </div>
  );
};

export default EventCreation;
