import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    __onPositiveVote = (event) => {
        event.preventDefault();
        this.props.onPositiveVote(this.props.topic._id);
    };

    __onNegativeVote = (event) => {
        event.preventDefault();
        this.props.onNegativeVote(this.props.topic._id, this.props.vote._id);
    };

    render() {
        const topic = this.props.topic;
        const alreadyVoted = !!this.props.vote;

        let button = alreadyVoted ?
            <button onClick={this.__onNegativeVote.bind(this)}
                    className="waves-effect waves-light btn gray lighten-2">
                -1
            </button> :
            <button onClick={this.__onPositiveVote.bind(this)}
                    className="waves-effect waves-light btn pink lighten-2">
                +1
            </button>;

        return (
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title pink-text text-lighten-1">{topic.conference}</span>
                        {button}
                        {topic.text}
                    </div>
                </div>
            </div>
        );
    }
}

ResultItem.propTypes = {
    topic: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onPositiveVote: PropTypes.func.isRequired,
    onNegativeVote: PropTypes.func.isRequired,
    vote: PropTypes.object
};
