import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import { submitButton } from '../utils/classNames';

/**
 * @param {object} param object
 * @param {object} param.courseApplication application data to post to store in database
 * @param {boolean} param.disabled conditions for the button being disabled
 * @param {Function} param.clearForm function to clear/reset form
 */
const ApplicationSubmitButton = ({
  courseApplication,
  disabled,
  clearForm,
}) => {
  const { addToast } = useToasts();

  /**
   * Makes http post request with the course application object to the api,
   * invokes display of toast message showing if the submission went successfully or failed,
   * clears/resets the form if the submission went successfully
   */
  const handleSubmit = () => {
    axios
      .post('http://localhost/api/applications', {
        ...courseApplication,
        participants: JSON.stringify(
          courseApplication.participants.map((item) => {
            const { id, changed, ...participant } = item;
            return participant;
          })
        ),
      })
      .then((result) => {
        console.log(result);

        clearForm();
        addToast('Application submitted', {
          appearance: 'success',
        });
      })
      .catch((error) => {
        console.error(error);

        addToast('Submission failed', {
          appearance: 'error',
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
