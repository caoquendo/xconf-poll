import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    __onUpVote = (event) => {
        event.preventDefault();
        this.props.onUpVote(this.props.topic._id);
    };

    __onDownVote = (event) => {
        event.preventDefault();
        this.props.onDownVote(this.props.topic._id, this.props.vote._id);
    };

    render() {
        const topic = this.props.topic;
        const alreadyVoted = !!this.props.vote;

        let button = alreadyVoted ?
            <button onClick={this.__onDownVote.bind(this)}
                    className="waves-effect waves-light btn gray lighten-2 right">
                -1
            </button> :
            this.props.canUpVote ?
                <button onClick={this.__onUpVote.bind(this)}
                        className="waves-effect waves-light btn pink lighten-2 right">
                    +1
                </button> :
                <button disabled
                    className="waves-effect waves-light btn pink lighten-2 right">
                    +1
                </button>;

        return (
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        {button}
                        <span className="card-title pink-text text-lighten-1">{topic.conference}</span>
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
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    vote: PropTypes.object,
    canUpVote: PropTypes.bool.isRequired
};
