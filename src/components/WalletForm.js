import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input name="value" data-testid="value-input" type="number" />
        </label>
        <select data-testid="currency-input">
          Moeda:
          {
            currencies !== undefined && (
              currencies.map((currency, index) => {
                if (index === 0) {
                  return (
                    <option
                      key={ `${currency}-${index}` }
                      value={ currency }
                      selected
                    >
                      {currency}
                    </option>
                  );
                }
                return (
                  <option
                    key={ `${currency}-${index}` }
                    value={ currency }
                  >
                    {currency}
                  </option>
                );
              })
            )
          }
        </select>
        <select data-testid="method-input">
          Método de pagamento:
          <option value="money" selected>Dinheiro</option>
          <option value="creditCard">Cartão de crédito</option>
          <option value="debitCard">Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          Categoria:
          <option value="food" selected>Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
        <label htmlFor="description">
          Descrição:
          <input name="description" data-testid="description-input" type="text" />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  currencies: PropTypes.forbid(['USD', 'USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC',
    'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE']).isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
