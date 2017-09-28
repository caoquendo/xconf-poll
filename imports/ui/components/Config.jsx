import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {ConsolidatedTopics} from '../../api/consolidatedTopics.js';
import ResultItem from "./ResultItem";

class Config extends Component {
    render() {
        return <div>
            Config me
        </div>
    }
}

Config.propTypes = {
    config: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('config');
    return {
        config: Config.find({}).fetch()
    };
}, Config);
