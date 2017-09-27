import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import Login from "./components/Login";
import Consolidate from './components/Consolidate';
import ConsolidateWait from './components/ConsolidateWait';
import Results from './components/Results';
import Topics from "./components/Topics";
import Poll from "./components/Poll";
import NonAvailable from "./components/NonAvailable";
import Timer from "./components/Timer";

const moment = require('moment');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time : moment()
        };

        setInterval(() => {
            this.setState({
                time : moment()
            });
        });
    }

    __onClick = (event) => {
        event.preventDefault();

        Meteor.logout();
    };

    /*
        30-09-2017
    Crear topics: 10:50 -> 15:45
    Consolidacion: 15:45 -> 16:15
    Votacion: 16:15 -> 16:40
    Resultados -> > 16:40
    */

    __render() {
        const now = this.state.time;
        const date = '2017-09-30';
        const startCreateTopics = date + ' 10:50';
        const startConsolidate = date + ' 15:45';
        const startVote = date + ' 16:15';
        const startResults = date + ' 16:40';
        const endAll = date + ' 20:00';

        if (now.isBefore(startCreateTopics) || now.isAfter(endAll)) {
            return this.__withTimerAfter(<NonAvailable/>, null, startCreateTopics);
        }

        if (this.props.currentUser) {
            if (now.isSameOrAfter(startResults)) {
                return this.__withLogoutButton(<Results/>);
            }
            if (now.isSameOrAfter(startVote)) {
                return this.__withLogoutButton(<Poll/>);
            }
            if (now.isSameOrAfter(startConsolidate)) {
                if (this.isValidUser()) {
                    return this.__withLogoutButton(<Consolidate/>);
                }
                return this.__withLogoutButton(<ConsolidateWait/>);
            }
            if (now.isSameOrAfter(startCreateTopics)) {
                return this.__withLogoutButton(<Topics/>);
            }
        }
        return <Login/>
    }

    __withTimerAfter(component, startTime, endTime) {
        if (startTime === null) {
            startTime = moment().format("YYYY-MM-DD HH:mm:ss")
        }
        return <div>
            {component}
            <Timer startTime={startTime} endTime={endTime}/>
        </div>
    }

    __withLogoutButton(component) {
        return <div>
            {this.__logoutButton()}
            {this.__withTimer(component)}
        </div>
    }

    isValidUser() {
        let arr = ['Luz Unda', 'C3'];
        return arr.indexOf(this.props.currentUser.username) !== -1;
    }

    __logoutButton() {
        let button = (<button type="submit"
                              className="waves-effect waves-light btn pink lighten-2"
                              onClick={this.__onClick.bind(this)}>
            Bye
        </button>);
        return this.isValidUser() ? button : null;
    }

    render() {
        return this.__render();
    }
}

App.propTypes = {
    currentUser : PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser : Meteor.user()
    };
}, App);
