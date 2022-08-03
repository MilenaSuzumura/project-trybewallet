import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newUser } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };
  }

  validedEmail = (email) => {
    const info1 = email.includes('@');
    const ponto = email.includes('.com');
    const semEspaço = email.includes(' ');
    if (info1 && ponto && !semEspaço) return info1;
    return false;
  }

  disabledButton = () => {
    const { password, email } = this.state;
    const passwordMin = 5;
    const emailIs = this.validedEmail(email);
    const disabledIs = password.length < passwordMin;
    if (!disabledIs && emailIs) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.disabledButton());
  }

  historyRote = () => {
    const { email } = this.state;
    const { saveUser, history } = this.props;
    saveUser(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabledButton } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabledButton }
          onClick={ this.historyRote }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (state) => dispatch(newUser(state)),
});

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
