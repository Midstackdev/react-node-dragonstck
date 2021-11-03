import axios from 'axios';
import { createStore } from 'redux';
import { generationActionCreator } from './actions/generationActions';
import { generationReducer } from './reducers/generationReducer';


const store = createStore(generationReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => console.log('store state update', store.getState()))


axios.get(`/generation`)
    .then(({ data }) => store.dispatch(generationActionCreator(data)))


export default store;