import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authreducer';
import { tabsReducer } from './reducers/tabsreducer';
import { tasksReducer } from './reducers/tasksreducer';

const reducer = combineReducers({
    form: reduxFormReducer,
    authReducer,
    tabsReducer,
    tasksReducer
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
