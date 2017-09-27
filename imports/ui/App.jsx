import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import Login from "./components/Login";
import Consolidate from './components/Consolidate';
import Results from './components/Results';
import Topics from "./components/Topics";
import Poll from "./components/Poll";

class App extends Component {
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

    render() {
        return this.props.currentUser ?
            <div>
                Hola {this.props.currentUser.username}
                <button type="submit" onClick={this.__onClick.bind(this)}>
                    Bye
                </button>
                <Poll/>
                {/*<Results/>*/}
                {/*<Consolidate/>*/}
            </div> :
            <Login/>;
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
