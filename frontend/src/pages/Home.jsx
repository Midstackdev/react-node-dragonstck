import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/accountActions';
import AccountInfo from '../components/AccountInfo';
import Dragon from '../components/Dragon';
import Generation from '../components/Generation';


const Home = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <>
            <button type="button" className="btn btn-light logout-button" onClick={() => dispatch(logout())}>Logout</button>
            <Generation/>
            <Dragon/>
            <hr />
            <AccountInfo />
            <hr />
            <Link to="/dragons">Account Dragons</Link>
            <br />
            <Link to="/public-dragons">Public Dragons</Link>
            </>
        </div>
    )
}

export default Home
