'use client';

import React, { useState } from 'react';
import '../admin/page.css'




export default function CreateArrangement() {

  const [isUsingTemplate, setIsUsingTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    maxParticipants: '',
    price: '',
    description: '',
  });

  const templates = [
    {
      id: 'template1',
      title: 'Seminar',
      type: 'Professional Seminar',
      date: '2024-12-01',
      maxParticipants: 100,
      price: '500 NOK',
      description: 'A pre-made seminar template.',
    },
    {
      id: 'template2',
      title: 'Workshop',
      type: 'Interactive Workshop',
      date: '2024-12-15',
      maxParticipants: 50,
      price: '300 NOK',
      description: 'A pre-made workshop template.',
    },
  ];

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    if (templateId) {
      const selected = templates.find((template) => template.id === templateId);
      setFormData({ ...selected });
      setIsUsingTemplate(true);
    } else {
      // Reset form for creating from scratch
      setFormData({
        title: '',
        type: '',
        date: '',
        maxParticipants: '',
        price: '',
        description: '',
      });
      setIsUsingTemplate(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/arrangements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const newArrangement = await response.json();
            alert('Arrangement created successfully!');
            setFormData({
                title: '',
                type: '',
                date: '',
                maxParticipants: '',
                price: '',
                description: '',
            });
        } else {
            alert('Failed to create arrangement.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


  return (    
    <div className="create-arrangement">
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

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Choose Option:</label>
          <select value={selectedTemplate} onChange={handleTemplateChange}>
            <option value="">Make arrangement from scratch</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={isUsingTemplate} // Disable input if using template
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            disabled={isUsingTemplate} // Disable input if using template
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={isUsingTemplate} // Disable input if using template
            required
          />
        </div>

        <div className="form-group">
          <label>Max Participants:</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleInputChange}
            disabled={isUsingTemplate} // Disable input if using template
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            disabled={isUsingTemplate} // Disable input if using template
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isUsingTemplate} // Disable input if using template
            required
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          Create Arrangement
        </button>
      </form>
    </div>
  );
}
