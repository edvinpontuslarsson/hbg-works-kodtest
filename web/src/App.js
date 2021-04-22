import './App.css';
import { ToastProvider } from 'react-toast-notifications';

import ApplicationForm from './components/ApplicationForm';

// TODO
// have to sign in w. wordpress user

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
