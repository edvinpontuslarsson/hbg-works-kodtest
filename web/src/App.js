import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { v5 as uuid } from 'uuid';

function App() {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  const [participants, setParticipants] = useState([
    { id: uuid(), name: '', phone: '', email: '' },
  ]);

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

  const handleParticipantChange = (id, event) => {
    const participantIndex = participants.findIndex(
      (item) => item.id === id
    );

  };

  const getCourse = (courseName) =>
    courses.filter(
      (course) => course.name === courseName
    )[0];

  return (
    <>
      <div>
        <select
          value={selectedCourse.name}
          onChange={(event) => {
            const courseName = event.target.value;
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
          onChange={(event) =>
            setSelectedDate(event.target.value)
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
        <event
          type="text"
          value={companyName}
          placeholder="Name"
          onChange={(event) =>
            setCompanyName(event.target.value)
          }
        />
        <event
          type="text"
          value={companyPhone}
          placeholder="Phone"
          onChange={(event) =>
            setCompanyPhone(event.target.value)
          }
        />
        <event
          type="text"
          value={companyEmail}
          placeholder="Email"
          onChange={(event) =>
            setCompanyEmail(event.target.value)
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
