const initialState = {
  byId: {},
  allIds: []
}

const expensesReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        byId: {
          ...state.byId,
          [payload.id]: {
            id: payload.id,
            trip: payload.trip,
            name: payload.name,
            cost: payload.cost,
            payer: payload.payer,
            users: payload.users
          }
        },
        allIds: [...state.allIds, payload.id]
      }
    case 'EDIT_EXPENSE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            name: payload.name
          }
        }
      }
    default:
      return state;
  }
}

export default expensesReducer;