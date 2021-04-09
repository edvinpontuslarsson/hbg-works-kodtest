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

  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const isEmpty = (string) => string.length === 0;

  const isEmailValid = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const [participants, setParticipants] = useState([
    {
      id: uuid(),
      name: '',
      phone: '',
      email: '',
      invalidInput: false,
    },
  ]);

  const [
    allParticipantsNamed,
    setAllParticipantsNamed,
  ] = useState(false);

  useEffect(() => {
    axios.get('/api').then((payload) => {
      const coursesData = payload.data;

      setCourses(coursesData);

      // initial default course selection
      setSelectedCourse(coursesData[0]);
      setSelectedDate(coursesData[0]?.dates[0]);
    });
  }, []);

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      {
        id: uuid(),
        name: '',
        phone: '',
        email: '',
        invalidInput: false,
      },
    ]);
  };

  const isCurrentParticipantSingleUnnamed = (id) =>
    !participants.some(
      (item) => item.id !== id && item.name.length === 0
    );

  const getParticipant = (id) =>
    participants.filter((item) => item.id === id)[0];

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

    // TODO test that works
    // TODO maybe all conditions not necessary
    if (
      !allParticipantsNamed &&
      event.target.value.length !== 0 &&
      isCurrentParticipantSingleUnnamed(id) &&
      getParticipant(id).name.length === 0
    ) {
      setAllParticipantsNamed(true);
    }
  };

  const participantsValidation = () => {
    const updatedParticipants = [];
    let anyInvalidInputs = false;

    participants.forEach((item) => {
      if (item.invalidInput && !isEmpty(item.name)) {
        item.invalidInput = false;
      } else if (isEmpty(item.name)) {
        item.invalidInput = true;
        anyInvalidInputs = true;
      }

      updatedParticipants.push(item);
    });

    setParticipants(updatedParticipants);
    setAllParticipantsNamed(!anyInvalidInputs);
  };

  // TODO make it possible to remove participant
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
        <label>NAME</label>
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
        <label>DATE</label>
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
        <label>NAME*</label>
        <input
          type="text"
          value={companyName}
          onBlur={() => {
            isEmpty(companyName) && setInvalidName(true);
          }}
          onChange={(event) => {
            setCompanyName(event.target.value);
            invalidName &&
              !isEmpty(event.target.value) &&
              setInvalidName(false);
          }}
        />
        {invalidName && <p>Name is required</p>}
        <label>PHONE*</label>
        <input
          type="text"
          value={companyPhone}
          onBlur={() => {
            isEmpty(companyPhone) && setInvalidPhone(true);
          }}
          onChange={(event) => {
            setCompanyPhone(event.target.value);
            invalidPhone &&
              !isEmpty(event.target.value) &&
              setInvalidPhone(false);
          }}
        />
        {invalidPhone && <p>Phone is required</p>}
        <label>E-MAIL*</label>
        <input
          type="text"
          value={companyEmail}
          onBlur={() => {
            !isEmailValid(companyEmail) &&
              setInvalidEmail(true);
          }}
          onChange={(event) => {
            setCompanyEmail(event.target.value);
            invalidEmail &&
              isEmailValid(event.target.value) &&
              setInvalidEmail(false);
          }}
        />
      </div>
      {invalidEmail && <p>Email is not valid</p>}
      <div>
        <h2>Participants</h2>
        {participants.map((participant, index) => (
          <div key={participant.id}>
            <h3>Participant #{index + 1}</h3>
            <label>NAME*</label>
            <input
              type="text"
              value={participant.name}
              name="name"
              onBlur={() => participantsValidation()}
              onChange={(event) => {
                handleChangeParticipant(
                  participant.id,
                  event
                );
              }}
            />
            {participants[index].invalidInput && (
              <p>Participant's name is required</p>
            )}
            <label>PHONE</label>
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
            <label>E-MAIL</label>
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
        <button
          disabled={!allParticipantsNamed}
          onClick={() => handleAddParticipant()}
        >
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
        // TODO disabled if if anything is invalid
        // disabled={}
      >
        Submit application
      </button>
    </main>
  );
}

export default App;
