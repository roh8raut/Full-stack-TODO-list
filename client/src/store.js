import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authreducer';
import { tabsReducer } from './reducers/tabsreducer';


const reducer = combineReducers({
    form: reduxFormReducer,
    authReducer: authReducer,
    tabsReducer: tabsReducer
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
