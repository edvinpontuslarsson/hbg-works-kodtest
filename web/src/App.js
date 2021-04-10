import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import classnames from 'classnames';

// classnames
const courseAndDate = 'course-and-date';
const labelAndInput = 'label-and-input';
const phoneAndEmail = 'phone-and-email';
const companySection = 'company-section';
const participantsSection = 'participants-section';
const participantHeading = 'participant-heading';
const errorMessage = 'error-message';
const errorBorder = 'error-border';
const submitButton = 'submit-button';
const addParticipantButton = 'add-participant-button';

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

  const isEmpty = (string) => string === '';

  const isEmailValid = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const [participants, setParticipants] = useState([
    {
      id: uuid(),
      name: '',
      phone: '',
      email: '',
      changed: false,
    },
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

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      {
        id: uuid(),
        name: '',
        phone: '',
        email: '',
        changed: false,
      },
    ]);
  };

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
  };

  const handleRemoveParticipant = (id) => {
    setParticipants(
      participants.filter((item) => item.id !== id)
    );
  };

  const getCourse = (courseName) =>
    courses.filter(
      (course) => course.name === courseName
    )[0];

  return (
    <main>
      <h2>Course</h2>
      <div className={courseAndDate}>
        <div className={labelAndInput}>
          <label>NAME</label>
          <select
            value={selectedCourse.name}
            onChange={(event) => {
              const courseName = event.target.value;
              const course = getCourse(courseName);

              setSelectedCourse(course);
            }}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className={labelAndInput}>
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
      </div>
      <section className={companySection}>
        <h2>Company</h2>
        <div className={labelAndInput}>
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
            className={classnames({
              [`${errorBorder}`]: invalidName,
            })}
          />
          {invalidName && (
            <p className={errorMessage}>Name is required</p>
          )}
        </div>

        <div className={phoneAndEmail}>
          <div className={labelAndInput}>
            <label>PHONE*</label>
            <input
              type="text"
              value={companyPhone}
              onBlur={() => {
                isEmpty(companyPhone) &&
                  setInvalidPhone(true);
              }}
              onChange={(event) => {
                setCompanyPhone(event.target.value);
                invalidPhone &&
                  !isEmpty(event.target.value) &&
                  setInvalidPhone(false);
              }}
              className={classnames({
                [`${errorBorder}`]: invalidPhone,
              })}
            />
            {invalidPhone && (
              <p className={errorMessage}>
                Phone is required
              </p>
            )}
          </div>
          <div className={labelAndInput}>
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
              className={classnames({
                [`${errorBorder}`]: invalidEmail,
              })}
            />
            {invalidEmail && (
              <p className={errorMessage}>
                Email is not valid
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={participantsSection}>
        <h2>Participants</h2>
        {participants.map((participant, index) => (
          <div key={participant.id}>
            <div className={participantHeading}>
              <h3>Participant #{index + 1}</h3>
              {index !== 0 && (
                <button
                  onClick={() => {
                    handleRemoveParticipant(participant.id);
                  }}
                >
                  <h3>X</h3>
                </button>
              )}
            </div>
            <div className={labelAndInput}>
              <label>NAME*</label>
              <input
                type="text"
                value={participant.name}
                name="name"
                onBlur={() => {
                  const current = getParticipant(
                    participant.id
                  );
                  !current.changed &&
                    handleChangeParticipant(
                      participant.id,
                      {
                        // mimics event interface
                        target: {
                          name: 'changed',
                          value: true,
                        },
                      }
                    );
                }}
                onChange={(event) => {
                  handleChangeParticipant(
                    participant.id,
                    event
                  );
                }}
                className={classnames({
                  [`${errorBorder}`]:
                    participants[index].changed &&
                    isEmpty(participants[index].name),
                })}
              />
              {participants[index].changed &&
                isEmpty(participants[index].name) && (
                  <p className={errorMessage}>
                    Participant's name is required
                  </p>
                )}
            </div>

            <div className={phoneAndEmail}>
              <div className={labelAndInput}>
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
              </div>
              <div className={labelAndInput}>
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
            </div>
          </div>
        ))}
        <button
          className={addParticipantButton}
          disabled={participants.some(
            (item) => item.name === ''
          )}
          onClick={() => handleAddParticipant()}
        >
          Add a participant
        </button>
      </section>
      <button
        className={submitButton}
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
        disabled={
          participants.some((item) => isEmpty(item.name)) ||
          isEmpty(companyName) ||
          isEmpty(companyPhone) ||
          !isEmailValid(companyEmail)
        }
      >
        Submit application
      </button>
    </main>
  );
}

export default App;
