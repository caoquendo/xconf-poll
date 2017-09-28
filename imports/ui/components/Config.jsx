import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Configs} from '../../../imports/api/configs.js';

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
    Meteor.subscribe('configs');
    return {
        config: Configs.find({}).fetch()
    };
}, Config);
