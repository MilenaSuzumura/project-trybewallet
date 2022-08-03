import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expensesFetch } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valor: 0,
      moeda: 'USD',
      pagamento: 'Dinheiro',
      category: 'Lazer',
      description: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitButton = () => {
    const { getExpenses } = this.props;
    getExpenses(this.state);
    this.setState({
      valor: 0,
      moeda: 'USD',
      pagamento: 'Dinheiro',
      category: 'Lazer',
      description: '',
    });
  }

  componentDidMount = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    const { valor, description, moeda, pagamento, category } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            name="valor"
            data-testid="value-input"
            type="number"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        {
          currencies !== undefined && (
            <select
              data-testid="currency-input"
              name="moeda"
              value={ moeda }
              onChange={ this.handleChange }
            >
              Moeda:
              {
                currencies.map((currency, index) => (
                  <option
                    key={ `${currency}-${index}` }
                    name="moeda"
                    value={ currency }
                  >
                    {currency}
                  </option>
                ))
              }
            </select>
          )
        }
        <select
          data-testid="method-input"
          name="pagamento"
          value={ pagamento }
          onChange={ this.handleChange }
        >
          Método de pagamento:
          <option
            name="pagamento"
            value="Dinheiro"
          >
            Dinheiro
          </option>
          <option
            name="pagamento"
            value="Cartão de crédito"
          >
            Cartão de crédito
          </option>
          <option
            name="pagamento"
            value="Cartão de débito"
          >
            Cartão de débito
          </option>
        </select>
        <select
          data-testid="tag-input"
          name="category"
          value={ category }
          onChange={ this.handleChange }
        >
          Categoria:
          <option
            name="category"
            value="Lazer"
          >
            Lazer
          </option>
          <option
            name="category"
            value="Alimentação"
          >
            Alimentação
          </option>
          <option
            name="category"
            value="Trabalho"
          >
            Trabalho
          </option>
          <option
            name="category"
            value="Transporte"
          >
            Transporte
          </option>
          <option
            name="category"
            value="Saúde"
          >
            Saúde
          </option>
        </select>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            data-testid="description-input"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" onClick={ this.submitButton }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getExpenses: (state) => dispatch(expensesFetch(state)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
