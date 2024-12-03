import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesPage;