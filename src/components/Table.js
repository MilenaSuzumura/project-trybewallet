import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Referência: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/th
class Table extends Component {
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
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <th>{expense.description}</th>
                  <th>{expense.tag}</th>
                  <th>{expense.method}</th>
                  <th>{expense.value}</th>
                  <th>{expense.currency}</th>
                  <th>Cambio utilizado</th>
                  <th>Valor convertido</th>
                  <th>moeda de conversão</th>
                  <th>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                  </th>
                </tr>
              ))
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
