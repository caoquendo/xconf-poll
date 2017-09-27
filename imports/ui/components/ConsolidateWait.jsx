import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import XconfCard from "./XconfCard";

class ConsolidateWait extends Component {

    render() {
        let content = (<span className="card-title xconf">
                                Estamos consolidando los temas enviados.
                                En pocos momentos podrás votar por tus favoritos!
                            </span>);
        return <XconfCard content={content}/>;
    }
}

ConsolidateWait.propTypes = {
    currentUser: PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, ConsolidateWait);
