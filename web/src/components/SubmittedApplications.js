import axios from 'axios';
import ReactJson from 'react-json-view';

import { fetchApplications } from '../utils/classNames';

const SubmittedApplications = ({
  applications,
  setApplications,
}) => (
  <>
    <button
      className={fetchApplications}
      onClick={() => {
        axios
          .get('http://localhost/api/applications')
          .then((payload) => {
            setApplications(
              payload.data.map((application) => {
                return {
                  ...application,
                  participants: JSON.parse(
                    application.participants
                  ),
                };
              })
            );
          });
      }}
    >
      Fetch submitted applications
    </button>
    {applications.length > 0 && (
      <ReactJson src={applications} />
    )}
  </>
);

export default SubmittedApplications;
