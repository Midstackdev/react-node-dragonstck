
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import AccountDragons from './components/AccountDragons';
import Home from './pages/Home';
import Login from './pages/Login';
import store from './store';


axios.defaults.withCredentials = true;

const AuthRoute = ({ component, path }) => {
  if(!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: '/login'}} />
  }

  // console.log({ component, path })
  return <Route path={path} component={component} />
}

const App = () => {
  const { loggedIn } = useSelector(state => state.account);

  return (
    <Router >
      <div className="App">
        <h2>Dragon Stack</h2>
          <Switch>
              <AuthRoute path="/" component={Home} exact />
              <Route path="/login" component={() => loggedIn ? <Redirect to="/" /> : <Login/>} />
              <AuthRoute path="/dragons" component={AccountDragons} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
