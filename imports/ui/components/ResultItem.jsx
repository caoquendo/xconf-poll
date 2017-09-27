import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    render() {
        const numWinners = 4;
        const topic = this.props.topic;
        const className = classnames("card-content", {"pink lighten-4" : this.props.index < numWinners});
        return (
            <div className="col s12">
                <div className="card">
                    <div className={className}>
                        <span className="chip right vote-count deep-purple lighten-3">
                                {topic.votes ? topic.votes : 0} voto{topic.votes === 1 ? '' : 's'}
                                </span>
                            <span className="card-title pink-text text-lighten-1">
                                <h5>{topic.conference}</h5>
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
