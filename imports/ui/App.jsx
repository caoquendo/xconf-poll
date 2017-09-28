import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Config} from '../api/config.js';

import Login from "./components/Login";
import Consolidate from './components/Consolidate';
import ConsolidateWait from './components/ConsolidateWait';
import Results from './components/Results';
import Topics from "./components/Topics";
import Poll from "./components/Poll";
import NonAvailable from "./components/NonAvailable";
import TimerWrapper from "./components/TimerWrapper";
import XconfCard from "./components/XconfCard";

const moment = require('moment');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: moment(),
            config: null,
            string: ''
        };

        setInterval(() => {
            this.setNewState({
                time: moment()
            });
        });
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loadingConfig) {
            this.setNewState({
                time: moment(),
                config: nextProps.config
            });
        }
    }

    componentWillMount() {
        document.addEventListener("keypress", this.__handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.__handleKeyDown.bind(this));
    }

    __handleKeyDown(event) {
        let str = this.state.string;
        str += event.key;
        this.setNewState({string: str});
        if(str === "^^vv<><>BA") {
            console.log("!!!");
        }
    }

    __onClick = (event) => {
        event.preventDefault();

        Meteor.logout();
    };

    __getContent() {
        if (!this.props.loadingConfig) {
            const now = this.state.time;
            const config = this.state.config[0];
            const date = config.date;
            const startCreateTopics = date + ' ' + config.createTopics.start;
            const startConsolidate = date + ' ' + config.consolidateTopics.start;
            const startVote = date + ' ' + config.vote.start;
            const startResults = date + ' ' + config.results.start;
            const endAll = date + ' ' + config.results.end;

            if (now.isBefore(startCreateTopics) || now.isAfter(endAll)) {
                return this.__withTimerAfter(
                    <NonAvailable/>, null, startCreateTopics, "En poco tiempo podrás ingresar para proponer tus temas");
            }

            if (this.props.currentUser) {
                if (now.isSameOrAfter(startResults)) {
                    return <div>
                        {this.__logoutButton()}
                        <Results/>
                    </div>
                }
                if (now.isSameOrAfter(startVote)) {
                    return <div>
                        {this.__logoutButton()}
                        <TimerWrapper
                            startTime={startVote}
                            endTime={startResults}
                            showTime={false}
                            size={240}
                            messageStillTime="No te quedes sin votar!"
                            messageOutOfTime="La votación ha terminado"
                        />
                        <Poll/>
                    </div>;
                }
                if (now.isSameOrAfter(startConsolidate)) {
                    if (this.isValidUser()) {
                        return <div>
                            {this.__logoutButton()}
                            <Consolidate/>
                        </div>
                    }
                    return this.__withLogoutButton(
                        <ConsolidateWait/>, startConsolidate, startVote, "Pronto podrás votar por tus favoritos!");
                }
                if (now.isSameOrAfter(startCreateTopics)) {
                    return this.__withLogoutButton(
                        <Topics/>, startCreateTopics, startConsolidate, "Puedes hacer tantos envíos como quieras antes de que se acabe el tiempo");
                }
            }
            return <Login/>
        } else {
            return <div>Por favor espera mientras se carga todo</div>
        }
    }

    __withTimerAfter(component, startTime, endTime, message) {
        if (startTime === null) {
            startTime = moment().format("YYYY-MM-DD HH:mm:ss")
        }
        return <div>
            {component}
            <TimerWrapper
                startTime={startTime}
                endTime={endTime}
                showTime={false}
                messageStillTime={message}
            />
        </div>
    }

    __withLogoutButton(component, startTime, endTime, message) {
        return <div>
            {this.__logoutButton()}
            {this.__withTimerAfter(component, startTime, endTime, message)}
        </div>
    }

    isValidUser() {
        let arr = ['Luz Unda', 'C3'];
        return arr.indexOf(this.props.currentUser.username) !== -1;
    }

    __logoutButton() {
        let button = (<button type="submit"
                              className="waves-effect waves-light btn-large pink lighten-2"
                              onClick={this.__onClick.bind(this)}>
            Bye
        </button>);
        return this.isValidUser() ? button : null;
    }

    render() {
        return <XconfCard content={this.__getContent()}/>;
    }
}

App.propTypes = {
    currentUser: PropTypes.object,
    config: PropTypes.array,
    loadingConfig: PropTypes.bool
};

export default createContainer(() => {
    const configSubscription = Meteor.subscribe('config');
    const loading = !configSubscription.ready();
    return {
        currentUser: Meteor.user(),
        config: Config.find({}).fetch(),
        loadingConfig: loading
    };
}, App);
