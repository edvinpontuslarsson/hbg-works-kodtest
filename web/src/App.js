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
        <input
          type="text"
          value={companyName}
          placeholder="Name"
          onChange={(event) =>
            setCompanyName(event.target.value)
          }
        />
        <input
          type="text"
          value={companyPhone}
          placeholder="Phone"
          onChange={(event) =>
            setCompanyPhone(event.target.value)
          }
        />
        <input
          type="text"
          value={companyEmail}
          placeholder="Email"
          onChange={(event) =>
            setCompanyEmail(event.target.value)
          }
        />
      </div>
      <div>
        {participants.map((participant) => (
          <div key={participant.id}>
            <input
              type="text"
              value={participant.name}
              placeholder="Name"
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
              placeholder="Phone"
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
              placeholder="E-mail"
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
            data: {
              companyInfo: {
                companyName,
                companyPhone,
                companyEmail,
                courseName: selectedCourse.name,
                selectedDate,
                participants,
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
