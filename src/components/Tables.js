import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Referência: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/th
class Tables extends Component {
  calculadora = () => {
    const { expense } = this.props;
    const { currency, value } = expense;
    const { exchangeRates } = expense;
    const { ask } = exchangeRates[currency];
    console.log(exchangeRates);
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
    const { expense, id } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expense;
    return (
      <tr id={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{this.filterMoeda(currency, Object.values(exchangeRates))}</td>
        <td>{this.valorConversao(currency, Object.values(exchangeRates))}</td>
        <td>{this.calculadora()}</td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button type="button">Excluir</button>
        </td>
      </tr>
    );
  }
}

Tables.propTypes = {
  id: PropTypes.number.isRequired,
  expense: PropTypes.instanceOf(Object).isRequired,
};

export default Tables;
