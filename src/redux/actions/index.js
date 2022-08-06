// Coloque aqui suas actions
export const newUser = (email) => ({ type: 'NEW_USER', email });

const newCurrencies = (response) => ({ type: 'NEW_CURRENCIES', response });

const newExpenses = (expenses) => ({ type: 'NEW_EXPENSES', expenses: expenses.expenses });

const excluiExpense = (expenses) => ({ type: 'NEW_ARRAY_EXPENSES', expenses });

const fetchAll = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const json = await response.json();
  return Object.values(json);
};

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const object = await fetchAll();
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

const ordena = async () => {
  const object = await fetchAll();
  const objectOrdenado = object.reduce((acc, currency) => {
    if (currency.codein === 'BRLT') {
      const currencyT = `${currency.code}T`;
      acc[currencyT] = currency;
    } else {
      acc[currency.code] = currency;
    }
    return acc;
  }, {});
  return objectOrdenado;
};

export function expensesFetch(expense) {
  return async (dispatch) => {
    try {
      const moeda = await ordena();
      const info = {
        expenses: {
          value: expense.valor,
          currency: expense.moeda,
          method: expense.pagamento,
          tag: expense.category,
          description: expense.description,
          exchangeRates: moeda,
        },
      };
      dispatch(newExpenses(info));
    } catch {
      dispatch(Error);
    }
  };
}

export function excluir(id, expenses) {
  return async (dispatch) => {
    try {
      const despesas = expenses.reduce((acc, expense, index) => {
        if (expense.id === id) {
          return acc;
        }
        const resultExpense = {
          id: index,
          ...expense,
        };
        acc.push(resultExpense);
        return acc;
      }, []);
      dispatch(excluiExpense(despesas));
    } catch {
      dispatch(Error);
    }
  };
}
