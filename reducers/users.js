const initialState = {
  byId: {},
  allIds: []
}

const usersReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_USER':
      return {
        byId: {
          ...state.byId,
          [payload.id]: {
            id: payload.id,
            name: payload.name,
            owes: {}
          }
        },
        allIds: [...state.allIds, payload.id]
      }
    case 'INIT_OWES':
      var copy = state;
      console.log('from reducer: ', payload);
      for (var i = 0; i < payload.members.length; i++) {
        if (payload.members[i] !== payload.id) {
          copy.byId[payload.id].owes = Object.assign({ [payload.members[i]]: 0 }, copy.byId[payload.id].owes);
        }
      }
      return copy;
    case 'ADD_EXPENSE':
      var copy = state;
      var split = payload.cost / (payload.users.length + 1);
      for (var i = 0; i < payload.users.length; i++) {
        if (state.byId[payload.payer].owes[payload.users[i]] >= split) {
          copy.byId[payload.payer].owes[payload.users[i]] -= split;
        } else {
          copy.byId[payload.users[i]].owes[payload.payer] += split;
        }
      }
      return copy;
    default:
      return state;
  }
}

export default usersReducer;