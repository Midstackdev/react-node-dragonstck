import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountDragons } from '../actions/accountDragonActions';
import fetchStates from '../reducers/fetchStates';
import AccountDragonRow from './AccountDragonRow';

const AccountDragons = () => {
    const dispatch = useDispatch();
    const { dragons } = useSelector(state => state.accountDragons);

    // console.log(dragons);

    useEffect(() => {
        dispatch(fetchAccountDragons())
    }, [dispatch]);

    return (
        <div>
            <br />
            <h3>Account Dragons</h3>
            {dragons.map((dragon) => {
                return (
                    <div className="" key={dragon.dragonId}>
                        <AccountDragonRow dragon={dragon} />
                        <hr />
                    </div>
                )
            })}
            <Link to="/">Home</Link>
        </div>
    )
}

export default AccountDragons
