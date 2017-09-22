import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import Login from "./components/Login";

class App extends Component {
    render() {
        return this.props.currentUser ?
               <div>Hola {this.props.currentUser.username}</div> :
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
