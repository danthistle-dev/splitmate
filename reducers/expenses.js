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
    case 'REMOVE_TRIP':
      var copy = state;
      for (var i = 0; i < payload.expenses.length; i++) {
        delete copy.byId[payload.expenses[i]];
      }
      copy.allIds = copy.allIds.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        payload.expenses
      )
      return copy;
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
    case 'REMOVE_EXPENSE':
      var copy = state;
      delete copy.byId[payload.id];
      copy.allIds = copy.allIds.filter(x => x !== payload.id);
      return copy;
    default:
      return state;
  }
}

export default expensesReducer;