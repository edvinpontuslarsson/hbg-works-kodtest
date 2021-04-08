import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

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
      const coursesData = payload.data;

      setCourses(coursesData);

      // initial default course selection
      setSelectedCourse(coursesData[0]);
      setSelectedDate(coursesData[0]?.dates[0]);
    });
  }, []);

  const handleChangeParticipant = (id, event) => {
    const updatedParticipants = participants.map((item) =>
      item.id === id
        ? {
            ...item,
            [event.target.name]: event.target.value,
          }
        : item
    );
    setParticipants(updatedParticipants);
  };

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { id: uuid(), name: '', phone: '', email: '' },
    ]);
  };

  // const handleRemoveParticipant = (id) => {
  //   setParticipants(
  //     participants.filter((item) => item.id !== id)
  //   );
  // };

  const getCourse = (courseName) =>
    courses.filter(
      (course) => course.name === courseName
    )[0];

  return (
    <main>
      <div>
        <h2>Course</h2>
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
        <h2>Company</h2>
        <input
          type="text"
          value={companyName}
          onChange={(event) =>
            setCompanyName(event.target.value)
          }
        />
        <input
          type="text"
          value={companyPhone}
          onChange={(event) =>
            setCompanyPhone(event.target.value)
          }
        />
        <input
          type="text"
          value={companyEmail}
          onChange={(event) =>
            setCompanyEmail(event.target.value)
          }
        />
      </div>
      <div>
        <h2>Participants</h2>
        {participants.map((participant, index) => (
          <div key={participant.id}>
            <h3>Participant #{index + 1}</h3>
            <input
              type="text"
              value={participant.name}
              name="name"
              onChange={(event) => {
                handleChangeParticipant(
                  participant.id,
                  event
                );
              }}
            />
            <input
              type="text"
              value={participant.phone}
              name="phone"
              onChange={(event) => {
                handleChangeParticipant(
                  participant.id,
                  event
                );
              }}
            />
            <input
              type="text"
              value={participant.email}
              name="email"
              onChange={(event) => {
                handleChangeParticipant(
                  participant.id,
                  event
                );
              }}
            />
          </div>
        ))}
        <button onClick={() => handleAddParticipant()}>
          Add a participant
        </button>
      </div>
      <button
        onClick={() => {
          axios.post('/api', {
            courseApplication: {
              courseId: selectedCourse.id,
              courseName: selectedCourse.name,
              courseDate: selectedDate,
              companyName,
              companyPhone,
              companyEmail,
              participants,
            },
          });
        }}
      >
        Submit application
      </button>
    </main>
  );
}

export default App;
