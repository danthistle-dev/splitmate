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
            expenses: [],
            owes: {}
          }
        },
        allIds: [...state.allIds, payload.id]
      }
    case 'INIT_OWES':
      var copy = state;
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
        if (state.byId[payload.payer].owes[payload.users[i]] > 0 && state.byId[payload.payer].owes[payload.users[i]] < split) {
          var newSplit = split - state.byId[payload.payer].owes[payload.users[i]];
          copy.byId[payload.payer].owes[payload.users[i]] = 0;
          copy.byId[payload.users[i]].owes[payload.payer] += newSplit;
        } else if (state.byId[payload.payer].owes[payload.users[i]] >= split) {
          copy.byId[payload.payer].owes[payload.users[i]] -= split;
        } else {
          copy.byId[payload.users[i]].owes[payload.payer] += split;
        }
      }
      copy.byId[payload.payer].expenses = [...copy.byId[payload.payer].expenses, payload.id];
      return copy;
    case 'EDIT_USER':
      var copy = state;
      for (var i = 0; i < Object.keys(payload).length; i++) {
        copy.byId[payload.ids[i]].name = payload.members[payload.ids[i]];
      }
      return copy;
    default:
      return state;
  }
}

export default usersReducer;