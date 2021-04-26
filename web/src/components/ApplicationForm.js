import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Participant from '../utils/Participant';
import ApplicationSubmitButton from './ApplicationSubmitButton';
import SubmittedApplications from './SubmittedApplications';
import ParticipantsSection from './ParticipantsSection';
import CompanySection from './CompanySection';
import CourseSection from './CourseSection';

/**
 * Component that contains all sections of the application form
 */
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

  /**
   * @param {string} string
   * @returns {boolean} string is empty
   */
  const isEmpty = (string) => string === '';

  /**
   * @param {string} email
   * @returns {boolean} email is valid
   */
  const isEmailValid = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const [participants, setParticipants] = useState([
    new Participant(),
  ]);

  useEffect(() => {
    axios
      .get('http://localhost/api/courses')
      .then((payload) => {
        const coursesData = payload.data.map((course) => {
          return {
            ...course,
            dates: [...new Set(course.dates)],
          };
        });
        
        setCourses(coursesData);

        // initial default course selection
        setSelectedCourse(coursesData[0]);
        setSelectedDate(coursesData[0]?.dates[0]);
      });
  }, []);

  /**
   * Resets state's company name, phone and email to default, empty strings
   */
  const clearForm = () => {
    setCompanyName('');
    setCompanyPhone('');
    setCompanyEmail('');
    setParticipants([new Participant()]);
  };

  /**
   * Adds a new instance of Particpant to participants in state
   */
  const handleAddParticipant = () => {
    setParticipants([...participants, new Participant()]);
  };

  /**
   * @param {string} id
   * @returns {Participant} Participant instance based on id
   */
  const getParticipant = (id) =>
    participants.filter((item) => item.id === id)[0];

  /**
   * Sets the Participant's property key from provided event.target.name to provided event.target.value,
   * example params: ('id', { target: { name: 'email', value: 'john.doe@mail.com' }})
   * @param {string} id Participant instance id
   * @param { { target: { name: string, value: string } } } event
   */
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

  /**
   * Removes the Participant isntance from participants in state
   * @param {string} id
   */
  const handleRemoveParticipant = (id) => {
    setParticipants(
      participants.filter((item) => item.id !== id)
    );
  };

  /**
   * @param {string} courseName
   * @returns {string} course object in state from course name
   */
  const getCourse = (courseName) =>
    courses.filter(
      (course) => course.name === courseName
    )[0];

  return (
    <>
      <CourseSection
        courses={courses}
        getCourse={getCourse}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
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
