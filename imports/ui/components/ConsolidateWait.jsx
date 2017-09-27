import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import XconfCard from "./XconfCard";

class ConsolidateWait extends Component {

    render() {
        return (<span className="xconf-title">
                                Estamos consolidando los temas enviados.
                            </span>);
    }
}

ConsolidateWait.propTypes = {
    currentUser : PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser : Meteor.user()
    };
}, ConsolidateWait);
