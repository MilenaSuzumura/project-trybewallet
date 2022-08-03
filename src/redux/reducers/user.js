// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
};

function userReducers(state = initialState, action) {
  switch (action.type) {
  case 'NEW_USER':
    return {
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducers;
