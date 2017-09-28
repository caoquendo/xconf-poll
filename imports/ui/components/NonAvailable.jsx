import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

export default class NonAvailable extends Component {

    render() {
        return <span className="xconf-title">
            Por el momento no estamos disponibles.
        </span>;
    }
}
