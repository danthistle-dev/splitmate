const initialState = {
  byId: {},
  allIds: []
}

const tripsReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'CREATE_TRIP':
      return {
        byId: {
          ...state.byId,
          [payload.id]: {
            id: payload.id,
            name: payload.name,
            members: payload.members,
            expenses: []
          }
        },
        allIds: [...state.allIds, payload.id]
      }
    case 'ADD_EXPENSE': 
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.trip]: {
            ...state.byId[payload.trip],
            expenses: [...state.byId[payload.trip].expenses, payload.id]
          }
        }
      }
    default:
      return state
  }
}

export default tripsReducer;