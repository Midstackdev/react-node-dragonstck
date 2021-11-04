
import axios from 'axios';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

axios.defaults.withCredentials = true;

const App = () => {
  const { loggedIn } = useSelector(state => state.account);

  return (
    <div className="App">
      <h2>Dragon Stack</h2>
      {loggedIn ? (
        <Home />
      ) : (
        <Login/>
      )}
    </div>
  );
}

export default App;
