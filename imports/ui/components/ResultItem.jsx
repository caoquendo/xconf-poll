import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    render() {
        const numWinners = 5;
        const topic = this.props.topic;
        const className = classnames("card-content", {"pink lighten-4" : this.props.index < numWinners});
        return (
            <div className="col s12">
                <div className="card">
                    <div className={className}>
                            <span className="card-title pink-text text-lighten-1">
                                {topic.conference}
                                </span>
                        <span className="new badge deep-purple lighten-3" data-badge-caption="votos">
                                {topic.votes ? topic.votes : 0}
                                </span>
                        {topic.text}
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
