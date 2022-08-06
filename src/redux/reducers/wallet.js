// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function userReducers(state = initialState, action) {
  switch (action.type) {
  case 'NEW_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expenses }],
    };
  case 'NEW_CURRENCIES':
    return {
      ...state,
      currencies: action.response.currencies,
    };
  case 'NEW_ARRAY_EXPENSES':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'NEW_EDIT':
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  case 'NEW_EDIT_END':
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default userReducers;
