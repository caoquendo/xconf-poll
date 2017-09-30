import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Feedbacks} from '../../api/feedbacks.js';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            ticketCode : ''
        }
    }

    __onSaveUser(event) {
        event.preventDefault();

        Meteor.call('users.insert', this.state.name, this.state.ticketCode,
            (error, result) => {
                this.setNewState({name : '', ticketCode : ''});
            });

    }

    __onNameChanged(event) {
        this.setNewState({name : event.target.value});
    }

    __onTicketCodeChanged(event) {
        this.setNewState({ticketCode : event.target.value});
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    render() {
        return <div>
            <form>
                <div className="input-field">
                    <input type="text" value={this.state.name}
                           onChange={this.__onNameChanged.bind(this)}/>
                    <label>
                        Nombre y apellido
                    </label>
                </div>
                <div className="input-field">
                    <input type="text" maxLength="6" value={this.state.ticketCode}
                           onChange={this.__onTicketCodeChanged.bind(this)}/>
                    <label>
                        Código de boleto
                    </label>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="pink lighten-1 waves-effect waves-light btn-large right" type="submit"
                                onClick={this.__onSaveUser.bind(this)}>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default createContainer(() => {
    return {};
}, Admin);
