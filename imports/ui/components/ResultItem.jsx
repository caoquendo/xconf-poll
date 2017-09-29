import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    render() {
        const numWinners = 4;
        const topic = this.props.topic;
        const className = classnames("card-content topic-content", {"pink lighten-4" : this.props.index < numWinners});
        return (
            <div className="col s12">
                <div className="card">
                    <div className={className}>
                        <div className="topic-container">
                            <div className="topic-for-vote deep-purple-text text-lighten-1">{topic.text}</div>
                            <div className="topic-context">
                                <small>
                                    En relación a&nbsp;
                                    <span className="pink-text">{topic.conference}</span>
                                </small>
                            </div>
                        </div>
                        <span className="chip right vote-count deep-purple lighten-3">
                            {topic.votes ? topic.votes : 0} voto{topic.votes === 1 ? '' : 's'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

ResultItem.propTypes = {
    topic : PropTypes.object.isRequired,
    index : PropTypes.number.isRequired
};
