import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

export default class ConsolidateWait extends Component {

    render() {
        return (<span className="xconf-title">
            Espera un momento... Estamos consolidando los temas enviados.
        </span>);
    }
}
