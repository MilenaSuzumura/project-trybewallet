// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

function userReducers(state = initialState, action) {
  switch (action.type) {
  case 'NEW_WALLET':
    return {
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
  default:
    return state;
  }
}

export default userReducers;
