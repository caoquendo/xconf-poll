import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import XconfCard from "./XconfCard";
import ErrorMessage from "./ErrorMessage";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors : null
        }
    }

    __onLoginClicked = (event) => {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const ticketCode = ReactDOM.findDOMNode(this.refs.ticketCodeInput).value.trim();

        Meteor.loginWithPassword(name, ticketCode, (params) => {
            if (params) {
                let errors = "";
                switch (params.error) {
                    case 400:
                        errors = "Ingresa tu nombre y el código de tu boleto";
                        break;
                    case 403:
                        errors = "Verifica tu nombre y el código de tu boleto";
                        break;
                }
                this.setState({errors});
            }
        });
    };

    render() {
        return <div>
            <span className="card-title xconf-title">Por favor identifícate para continuar.</span>
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

                <ErrorMessage message={this.state.errors}/>

                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onLoginClicked.bind(this)}>
                            Continuar
                        </button>
                    </div>
                </div>
            </form>
        </div>;
    }
}
