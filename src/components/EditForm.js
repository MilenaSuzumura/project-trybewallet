import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpensesEnd } from '../redux/actions/index';

class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      valor: '',
      moeda: '',
      pagamento: '',
      category: '',
      description: '',
    };
  }

  editButton = () => {
    const { editarExpense, expenses } = this.props;
    editarExpense(this.state, expenses);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount = () => {
    const { idToEdit, expenses } = this.props;
    const filtro = expenses.filter((expense) => expense.id === idToEdit);
    this.setState({
      id: filtro[0].id,
      valor: filtro[0].value,
      moeda: filtro[0].currency,
      pagamento: filtro[0].method,
      category: filtro[0].tag,
      description: filtro[0].description,
    });
  }

  render() {
    const { currencies } = this.props;
    const { valor, description, moeda, pagamento, category } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valora:
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
        <button type="button" onClick={ this.editButton }>Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editarExpense: (state, expenses) => dispatch(editExpensesEnd(state, expenses)),
});

EditForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editarExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
