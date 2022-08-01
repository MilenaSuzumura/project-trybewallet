// Coloque aqui suas actions
export const newUser = (email) => ({ type: 'NEW_USER', email });

const newCurrencies = (response) => ({ type: 'NEW_WALLET', response });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await response.json();
      const object = Object.values(json);
      const objectEnd = object.reduce((acc, currency) => {
        if (Object.values(acc.currencies).includes(currency.code)) {
          return acc;
        }
        acc.currencies.push(currency.code);
        return acc;
      }, { currencies: [] });
      dispatch(newCurrencies(objectEnd));
    } catch {
      dispatch(Error);
    }
  };
}
