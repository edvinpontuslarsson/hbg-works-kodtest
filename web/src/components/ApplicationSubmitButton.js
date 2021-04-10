import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import { submitButton } from '../utils/classNames';

const ApplicationSubmitButton = ({
  courseApplication,
  disabled,
  clearForm,
}) => {
  const { addToast } = useToasts();

  const handleSubmit = () => {
    axios
      .post('/api/applications', {
        courseApplication,
      })
      .then(() => {
        clearForm();
        addToast('Application submitted', {
          appearance: 'success',
        });
      });
  };

  return (
    <button
      className={submitButton}
      onClick={handleSubmit}
      disabled={disabled}
    >
      Submit application
    </button>
  );
};

export default ApplicationSubmitButton;
