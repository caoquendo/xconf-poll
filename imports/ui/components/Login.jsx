import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import XconfCard from "./XconfCard";

export default class Login extends Component {

    __onClick = (event) => {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const ticketCode = ReactDOM.findDOMNode(this.refs.ticketCodeInput).value.trim();

        Meteor.loginWithPassword(name, ticketCode);
    };

    render() {
        let loginContent = <div>
            <span className="card-title xconf">Por favor identifícate para continuar.</span>
            <form className="login-form">
                <div className="input-field">
                    <input type="text" ref="nameInput"/>
                    <label>
                        Nombre
                        <small>(Como aparece en tu identificación)</small>
                    </label>
                </div>
                <div className="input-field">
                    <input type="text" maxLength="6" ref="ticketCodeInput"/>
                    <label>
                        Código del Boleto
                        <small>(El número de 6 dígitos)</small>
                    </label>
                </div>

                <button className="pink lighten-1 waves-effect waves-light btn" type="submit"
                        onClick={this.__onClick.bind(this)}>
                    Continuar
                </button>
            </form>
        </div>;
        return <XconfCard content={loginContent}/>;
    }
}
