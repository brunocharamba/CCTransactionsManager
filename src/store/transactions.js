// TYPES
export const Types = {
  // api
  SET_TRANSACTIONS: 'transactions/SET_TRANSACTIONS'
}

// REDUCER
const INITIAL_STATE = { transactions: [], total: 0 }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // show
    case Types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        total: action.payload.total
      }
    default:
      return state
  }
}

// ACTIONS
export const Creators = {
  // show
  setTransactions: (data) => ({
    type: Types.SET_TRANSACTIONS,
    payload: data
  })
}
