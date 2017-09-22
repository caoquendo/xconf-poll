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
        return <div className="row">
            <div className="col s12 m7">
                <div className="card ">
                    <div className="card-image">
                        <img src="images/logo.svg"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title xconf">Por favor identifícate para continuar.</span>
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

                            <button className="pink lighten-1 waves-effect waves-light btn" type="submit" onClick={this.__onClick.bind(this)}>
                                Continuar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}
