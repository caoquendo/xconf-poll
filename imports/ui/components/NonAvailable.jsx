import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

export default class NonAvailable extends Component {

    render() {
        return (
            <div className="row">
                <div className="col s12 m7">
                    <div className="card">
                        <div className="card-image">
                            <img src="images/logo.svg"/>
                        </div>
                        <div className="card-content">
                            <span className="card-title xconf">
                                Por el momento no estamos disponibles
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
