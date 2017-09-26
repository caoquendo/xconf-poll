import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'

export default class ConsolidatedTopic extends Component {

    __deleteTopic(event) {
        event.preventDefault();
        Meteor.call('consolidatedTopics.remove', this.props.topic._id);
    }

    render() {
        return <div className="col m4 s6">
            <div className="card">
                <div className="card-content">
                    <span className="card-title pink-text text-lighten-1">
                        {this.props.topic.conference}
                    </span>
                    {this.props.topic.text}
                </div>
                <div className="card-action">
                    <a href="#" onClick={this.__deleteTopic.bind(this)}>Eliminar</a>
                </div>
            </div>
        </div>
    }
}

ConsolidatedTopic.propType = {
    topic : PropTypes.object.isRequired
};
