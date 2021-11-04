import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { signup, login } from "../actions/accountActions";
import fetchStates from "../reducers/fetchStates";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false)
    const dispatch = useDispatch();
    const { status, message } = useSelector(state => state.account);

    const handleLogin = (e) => {
        setButtonClicked(true);
        e.preventDefault();
        dispatch(login({ username, password}));
    }
    
    const handleSignup = (e) => {
        setButtonClicked(true);
        e.preventDefault();
        dispatch(signup({ username, password}));
    }

    const DisplayError = () => {
        if(buttonClicked && status === fetchStates.error) {
            return <div className="text-danger">{message}</div>
        }
    }

    return (
        <div>
            <form>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Email address</label>
                <input type="text" className="form-control" id="username" placeholder="username" onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
                <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                <span>or</span>
                <button type="submit" className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
            </div>
            <br />
            {DisplayError()}
            </form>
        </div>
    )
}

export default Login
