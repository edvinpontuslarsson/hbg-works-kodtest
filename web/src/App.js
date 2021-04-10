import './App.css';
import { ToastProvider } from 'react-toast-notifications';

import ApplicationForm from './components/ApplicationForm';

const App = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
    >
      <main>
        <ApplicationForm />
      </main>
    </ToastProvider>
  );
};

export default App;
