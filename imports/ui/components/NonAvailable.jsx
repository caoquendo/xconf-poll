import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import XconfCard from "./XconfCard";

export default class NonAvailable extends Component {

    render() {
        let content = <span className="card-title xconf">
                                Por el momento no estamos disponibles
                            </span>;
        return (
            <XconfCard content={content}/>
        );
    }
}
