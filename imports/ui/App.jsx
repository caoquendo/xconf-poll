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

const moment = require('moment');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: moment()
        };

        setInterval(() => {
            this.setState({
                time: moment()
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
        let date = '2017-09-30';
        const startCreateTopics = date + ' 10:50';
        const startConsolidate = date + ' 15:45';
        const startVote = date + ' 16:15';
        const startResults = date + ' 16:40';
        const endAll = date + ' 20:00';

        if (now.isBefore(startCreateTopics) || now.isAfter(endAll)) {
            return <NonAvailable/>
        }

        if (this.props.currentUser) {
            if (now.isSameOrAfter(startResults)) {
                return <div>{this.__logoutButton()}<Results/></div>
            }
            if (now.isSameOrAfter(startVote)) {
                return <div>{this.__logoutButton()}<Poll/></div>
            }
            if (now.isSameOrAfter(startConsolidate)) {
                if (this.isValidUser()) {
                    return <div>{this.__logoutButton()}<Consolidate/></div>
                }
                return <div>{this.__logoutButton()}<ConsolidateWait/></div>;
            }
            if (now.isSameOrAfter(startCreateTopics)) {
                return <div>{this.__logoutButton()}<Topics/></div>
            }
        }
        return <Login/>
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
    currentUser: PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, App);
