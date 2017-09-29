import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Configs} from '../api/configs.js';

import Login from "./components/Login";
import Consolidate from './components/Consolidate';
import ConsolidateWait from './components/ConsolidateWait';
import Results from './components/Results';
import Topics from "./components/Topics";
import Poll from "./components/Poll";
import NonAvailable from "./components/NonAvailable";
import TimerWrapper from "./components/TimerWrapper";
import XconfCard from "./components/XconfCard";
import Feedback from "./components/Feedback";
// import Config from "./components/Config";

const moment = require('moment');

/*
<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
<div>Icons made by <a href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez">Alfredo Hernandez</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
 */

class App extends Component {

    __interval = null;

    constructor(props) {
        super(props);

        this.state = {
            time : moment(),
            config : null,
            string : '',
            configLoaded : false
        };

        this.__interval = setInterval(() => {
            this.setNewState({
                time : moment()
            });
        });
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loadingConfig /*&& !this.state.configLoaded*/) {
            const today = moment().format("YYYY-MM-DD");
            let configs = nextProps.config.filter(config => config.date === today);
            let config;
            if (configs.length === 1) {
                config = configs[0];
            } else if (configs.length === 0) {
                config = nextProps.config.filter(config => config.default)[0];
            }

            this.setNewState({
                time : moment(),
                config : config,
                configLoaded : true
            });
        }
    }

    componentWillMount() {
        document.addEventListener("keypress", this.__handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.__handleKeyDown.bind(this));

        clearInterval(this.__interval);
        this.__interval = null;
    }

    __handleKeyDown(event) {
        let str = this.state.string;
        str += event.key;
        this.setNewState({string : str});
    }

    __onLogoutClicked = (event) => {
        event.preventDefault();

        Meteor.logout();
    };

    __getContent() {
        if (!this.props.loadingConfig) {
            const now = this.state.time;
            const config = this.state.config;
            const date = config.date;
            const startAll = date + ' ' + config.startAll;
            const startCreateTopics = date + ' ' + config.createTopics;
            const startConsolidate = date + ' ' + config.consolidateTopics;
            const startVote = date + ' ' + config.vote;
            const startResults = date + ' ' + config.results;
            const endAll = date + ' ' + config.endAll;

            // if (this.state.string === "^^vv<><>BA") {
            //     return <Config/>;
            // }

            if (now.isBefore(startAll)) {
                Meteor.logout();
                return this.__withTimerAfter(
                    <NonAvailable/>, null, startAll, "¡Ya no falta mucho para empezar!");
            }

            if (now.isAfter(endAll)) {
                Meteor.logout();
                return this.__withTimerAfter(
                    <NonAvailable/>, null, startAll, "Este evento ya terminó. Espera más noticias sobre nosotros.");
            }

            if (now.isBefore(startCreateTopics)) {
                Meteor.logout();
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
                            messageStillTime="¡No te quedes sin votar!"
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
                              onClick={this.__onLogoutClicked.bind(this)}>
            Bye
        </button>);
        return this.isValidUser() ? button : null;
    }

    render() {
        return <div>
            <XconfCard content={this.__getContent()}/>
            <Feedback/>
        </div>;
    }
}

App.propTypes = {
    currentUser : PropTypes.object,
    config : PropTypes.array,
    loadingConfig : PropTypes.bool
};

export default createContainer(() => {
    const configSubscription = Meteor.subscribe('configs');
    const loading = !configSubscription.ready();
    return {
        currentUser : Meteor.user(),
        config : Configs.find({}).fetch(),
        loadingConfig : loading
    };
}, App);
