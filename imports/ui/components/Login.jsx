import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

export default class Login extends Component {

    __onClick = (event) => {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const ticketCode = ReactDOM.findDOMNode(this.refs.ticketCodeInput).value.trim();

        Meteor.loginWithPassword(name, ticketCode);
    };

    render() {
        return <div>
            <p>Por favor identifícate para continuar.</p>
            <form className="login-form">
                <div>
                    <label>
                        Nombre
                        <small>(Como aparece en tu identificación)</small>
                    </label>
                    <input type="text" ref="nameInput"/>
                </div>
                <div>
                    <label>
                        Código del Boleto
                        <small>(El número de 6 dígitos)</small>
                    </label>
                    <input type="text" maxLength="6" ref="ticketCodeInput"/>
                </div>
                <button type="submit" onClick={this.__onClick.bind(this)}>
                    Continuar
                </button>
            </form>
        </div>;
    }
}
