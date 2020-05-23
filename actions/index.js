export const addUser = payload => ({
  type: 'ADD_USER',
  payload
})

export const editUser = payload => ({
  type: 'EDIT_USER',
  payload
})

export const initOwes = payload => ({
  type: 'INIT_OWES',
  payload
})

export const addExpense = payload => ({
  type: 'ADD_EXPENSE',
  payload
})

export const editExpense = payload => ({
  type: 'EDIT_EXPENSE',
  payload
})

export const createTrip = payload => ({
  type: 'CREATE_TRIP',
  payload
})

export const editTrip = payload => ({
  type: 'EDIT_TRIP',
  payload
})

export const toggleComplete = payload => ({
  type: 'TOGGLE_COMPLETE',
  payload
})