import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Feedbacks} from '../../api/feedbacks.js';
import Consolidate from './Consolidate';
import Results from './Results';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            ticketCode : '',
            screen : 'create'
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

    __renderCreateForm() {
        return <form>
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
        </form>;
    }

    __renderContent() {
        switch (this.state.screen) {
            case 'create':
                return this.__renderCreateForm();
            case 'consolidate':
                return <Consolidate/>;
            case 'results':
                return <Results/>;
        }
    }

    __changeScreen(newScreen) {
        this.setNewState({screen : newScreen});
    }

    render() {
        return <div>
            <div className="row">
                <div className="col s12">
                    <button className="pink lighten-1 waves-effect waves-light btn-large"
                            onClick={() => this.__changeScreen('create')}>
                        Create
                    </button>
                    <button className="pink lighten-1 waves-effect waves-light btn-large"
                            onClick={() => this.__changeScreen('consolidate')}>
                        Consolidate
                    </button>
                    <button className="pink lighten-1 waves-effect waves-light btn-large"
                            onClick={() => this.__changeScreen('results')}>
                        Results
                    </button>
                </div>
            </div>

            {this.__renderContent()}
        </div>
    }
}

export default createContainer(() => {
    return {};
}, Admin);
