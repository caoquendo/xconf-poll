import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import Login from "./components/Login";

class App extends Component {
    __onClick = (event) => {
        event.preventDefault();

        Meteor.logout();
    };

    render() {
        return this.props.currentUser ?
               <div>
                   Hola {this.props.currentUser.username}
                   <button type="submit" onClick={this.__onClick.bind(this)}>
                       Bye
                   </button>
               </div> :
               <Login/>;
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
