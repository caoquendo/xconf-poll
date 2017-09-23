import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class TopicConsolidate extends Component {
    render() {
        const topic = this.props.topic;
        return (
            <div className="col m4">
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">
                            {topic.conference}
                        </div>
                        <div className="topic">
                            {topic.text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TopicConsolidate.propTypes = {
    topic: PropTypes.object.isRequired
};