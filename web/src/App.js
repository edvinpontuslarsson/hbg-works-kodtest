import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  useEffect(() => {
    axios.get('/api').then((payload) => {
      console.log(payload.data);

      const coursesData = payload.data;

      setCourses(coursesData);

      // initial default course selection
      setSelectedCourse(coursesData[0]);
      setSelectedDate(coursesData[0]?.dates[0]);
    });
  }, []);

  const getCourse = (courseName) =>
    courses.filter(
      (course) => course.name === courseName
    )[0];

  return (
    <>
      <div>
        <select
          value={selectedCourse.name}
          onChange={(input) => {
            const courseName = input.target.value;
            const course = getCourse(courseName);

            setSelectedCourse(course);
          }}
        >
          {courses?.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <select
          value={selectedDate}
          onChange={(input) =>
            setSelectedDate(input.target.value)
          }
        >
          {selectedCourse?.dates?.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
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
                courseName: selectedCourse.name,
                selectedDate,
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
