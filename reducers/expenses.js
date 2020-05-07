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
    default:
      return state;
  }
}

export default expensesReducer;