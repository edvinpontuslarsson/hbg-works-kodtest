import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  courseAndDate,
  labelAndInput,
} from '../utils/classNames';
import Participant from '../utils/Participant';
import ApplicationSubmitButton from './ApplicationSubmitButton';
import SubmittedApplications from './SubmittedApplications';
import ParticipantsSection from './ParticipantsSection';
import CompanySection from './CompanySection';

const ApplicationForm = () => {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [applications, setApplications] = useState([]);

  const isEmpty = (string) => string === '';

  const isEmailValid = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const [participants, setParticipants] = useState([
    new Participant(),
  ]);

  useEffect(() => {
    axios.get('/api/courses').then((payload) => {
      const coursesData = payload.data;

      setCourses(coursesData);

      // initial default course selection
      setSelectedCourse(coursesData[0]);
      setSelectedDate(coursesData[0]?.dates[0]);
    });
  }, []);

  // TODO function comments for functions

  const clearForm = () => {
    setCompanyName('');
    setCompanyPhone('');
    setCompanyEmail('');
    setParticipants([new Participant()]);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, new Participant()]);
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
    <>
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
      <CompanySection
        companyName={companyName}
        setCompanyName={setCompanyName}
        invalidName={invalidName}
        setInvalidName={setInvalidName}
        companyPhone={companyPhone}
        setCompanyPhone={setCompanyPhone}
        invalidPhone={invalidPhone}
        setInvalidPhone={setInvalidPhone}
        companyEmail={companyEmail}
        setCompanyEmail={setCompanyEmail}
        invalidEmail={invalidEmail}
        setInvalidEmail={setInvalidEmail}
        isEmpty={isEmpty}
        isEmailValid={isEmailValid}
      />
      <ParticipantsSection
        participants={participants}
        getParticipant={getParticipant}
        handleAddParticipant={handleAddParticipant}
        handleChangeParticipant={handleChangeParticipant}
        handleRemoveParticipant={handleRemoveParticipant}
        isEmpty={isEmpty}
      />
      <ApplicationSubmitButton
        courseApplication={{
          courseId: selectedCourse.id,
          courseName: selectedCourse.name,
          courseDate: selectedDate,
          companyName,
          companyPhone,
          companyEmail,
          participants,
        }}
        disabled={
          participants.some((item) => isEmpty(item.name)) ||
          isEmpty(companyName) ||
          isEmpty(companyPhone) ||
          !isEmailValid(companyEmail)
        }
        clearForm={clearForm}
      />
      <SubmittedApplications
        applications={applications}
        setApplications={setApplications}
      />
    </>
  );
};

export default ApplicationForm;
