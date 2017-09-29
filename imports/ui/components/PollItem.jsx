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
            <a href="#" onClick={this.__onDownVote.bind(this)}
               className="waves-effect waves-light topic-vote-button">
                <img src="images/star-filled.svg" className="vote-icon"/>
            </a> :
            this.props.canUpVote ?
                <a href="#" onClick={this.__onUpVote.bind(this)}
                   className="waves-effect waves-light topic-vote-button">
                    <img src="images/star-empty.svg" className="vote-icon"/>
                </a> :
                <a href="#" disabled
                   className="waves-effect waves-light topic-vote-button">
                    <img src="images/star-disabled.svg" className="vote-icon"/>
                </a>;

        return (
            <div className="col s12">
                <div className="card">
                    <div className="card-content topic-content">
                        <div className="topic-container">
                            <div className="topic-for-vote deep-purple-text text-lighten-1">{topic.text}</div>
                            <div className="topic-context">
                                <small>
                                    En relación a&nbsp;
                                    <span className="pink-text">{topic.conference}</span>
                                </small>
                            </div>
                        </div>
                        {button}
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
