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
            expenses: [],
            complete: false
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
    case 'EDIT_TRIP':
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
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            complete: !state.byId[payload.id].complete
          }
        }
      }
    default:
      return state
  }
}

export default tripsReducer;