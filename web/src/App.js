import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState('');

  // TODO later have select otions dates based on
  // selected course

  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  useEffect(() => {
    axios.get('/api').then((payload) => {
      console.log(payload.data);

      const coursesData = payload.data;

      setCourses(coursesData);
      setSelectedCourse(
        coursesData.length > 0 ? coursesData[0].name : ''
      );
    });
  }, []);

  return (
    <>
      <select
        value={selectedCourse}
        onChange={(input) =>
          setSelectedCourse(input.target.value)
        }
      >
        {courses.map((course) => (
          <option key={course.name} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          value={companyName}
          placeholder="Name"
          onChange={(input) =>
            setCompanyName(input.target.value)
          }
        />
        <input
          type="text"
          value={companyPhone}
          placeholder="Phone"
          onChange={(input) =>
            setCompanyPhone(input.target.value)
          }
        />
        <input
          type="text"
          value={companyEmail}
          placeholder="Email"
          onChange={(input) =>
            setCompanyEmail(input.target.value)
          }
        />
      </div>
      <button
        onClick={() => {
          axios.post('/api', {
            data: {
              companyInfo: {
                companyName,
                companyPhone,
                companyEmail,
                selectedCourse,
              },
            },
          });
        }}
      >
        Submit
      </button>
    </>
  );
}

export default App;
