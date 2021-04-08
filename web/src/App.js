import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

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
      <button
        onClick={() => {
          axios.post('/api', {
            data: {
              companyInfo: {
                companyName,
                companyPhone,
                companyEmail,
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
