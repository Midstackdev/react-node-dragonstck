import { useDispatch } from 'react-redux';
import { logout } from '../actions/accountActions';
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
            </>
        </div>
    )
}

export default Home
