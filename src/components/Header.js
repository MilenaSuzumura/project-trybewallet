import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calculadora = () => {
    const { expenses } = this.props;
    const resultado = expenses.reduce((acc, expense) => {
      const { exchangeRates } = expense;
      const { ask } = exchangeRates[expense.currency];
      const mult = expense.value * ask;
      acc += mult;
      return acc;
    }, 0);
    return resultado.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`E-mail: ${email}`}</p>
        {
          expenses !== undefined
            ? (
              <p data-testid="total-field">{`${this.calculadora()}`}</p>
            )
            : <p data-testid="total-field">0</p>
        }
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(Header);
