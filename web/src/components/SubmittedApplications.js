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
        axios.get('/api/applications').then((payload) => {
          setApplications(payload.data);
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
