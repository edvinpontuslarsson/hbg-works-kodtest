import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api').then((payload) => {
      setCourses(payload.data);
    });
  }, [courses]);

  return (
    <>
      {courses.map((item) => (
        <p>{item.name}</p>
      ))}
    </>
  );
}

export default App;
