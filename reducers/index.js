import { combineReducers } from 'redux';
import expensesReducer from './expenses';
import tripsReducer from './trips';
import usersReducer from './users';

const rootReducer = combineReducers({
  expenses: expensesReducer,
  trips: tripsReducer,
  users: usersReducer
})

export default rootReducer;