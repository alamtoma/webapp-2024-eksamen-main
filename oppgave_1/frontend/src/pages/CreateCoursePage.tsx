import React, { useState } from 'react';
import axios from 'axios';

const CreateCoursePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/courses', { title, description, category });
      alert('Course created!');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      <h1>Create New Course</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Course Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Course Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Course Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCoursePage;