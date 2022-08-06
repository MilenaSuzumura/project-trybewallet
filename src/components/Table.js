import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Referência: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/th
class Table extends Component {
  calculadora = (expense) => {
    const { currency, value, exchangeRates } = expense;
    const { ask } = exchangeRates[currency];
    const calc = parseFloat(ask) * parseFloat(value);
    const resultado = !calc ? 0.00 : calc.toFixed(2);
    return resultado;
  }

  filterMoeda = (moeda, objMoeda) => {
    const moedaFinal = objMoeda.filter((moedaObj) => moeda === moedaObj.code);
    return moedaFinal[0].name;
  }

  valorConversao = (moeda, objMoeda) => {
    const moedaFinal = objMoeda.filter((moedaObj) => moeda === moedaObj.code);
    const resultado = parseFloat(moedaFinal[0].ask);
    return resultado.toFixed(2);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {
            expenses !== undefined && (
              expenses.map((expense) => {
                const { id,
                  description,
                  tag,
                  method,
                  value,
                  currency,
                  exchangeRates } = expense;
                const valor = parseFloat(value);
                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{valor.toFixed(2)}</td>
                    <td>{this.filterMoeda(currency, Object.values(exchangeRates))}</td>
                    <td>{this.valorConversao(currency, Object.values(exchangeRates))}</td>
                    <td>{this.calculadora(expense)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            )
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(Table);
