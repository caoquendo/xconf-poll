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
                        className="waves-effect waves-light right">
                         <img src="images/star-filled.svg" className="vote-icon"/>
                     </a> :
                     this.props.canUpVote ?
                     <a href="#" onClick={this.__onUpVote.bind(this)}
                        className="waves-effect waves-light right">
                         <img src="images/star-empty.svg" className="vote-icon"/>
                     </a> :
                     <a href="#" disabled
                        className="waves-effect waves-light right">
                         <img src="images/star-disabled.svg" className="vote-icon"/>
                     </a>;

        return (
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        {button}
                        <p className="topic-for-vote deep-purple-text text-lighten-1">{topic.text}</p>
                        <p className="topic-context">
                            <small>
                                en referencia a &nbsp;
                                <span className="pink-text">
                                 {topic.conference}
                                </span>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

ResultItem.propTypes = {
    topic : PropTypes.object.isRequired,
    index : PropTypes.number.isRequired,
    onUpVote : PropTypes.func.isRequired,
    onDownVote : PropTypes.func.isRequired,
    vote : PropTypes.object,
    canUpVote : PropTypes.bool.isRequired
};
