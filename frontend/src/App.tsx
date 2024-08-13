import UserLogin from './components/UserLogin/UserLogin';
import './App.css';
import './components/UserLogin/UserLogin.css';
import JsonServer from './components/JsonServer';
import Register from './components/UserLogin/Register';

function App() {
  return (
      <>
      <UserLogin />
      <JsonServer />
      <Register />
      </>
  );
}

export default App;
