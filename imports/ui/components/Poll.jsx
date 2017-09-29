import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {ConsolidatedTopics} from '../../api/consolidatedTopics.js';
import {Votes} from '../../api/votes.js';
import PollItem from "./PollItem";

class Poll extends Component {

    constructor() {
        super();
    };

    __canUpVote = () => {
        if (this.props.myVotes === undefined) {
            return true;
        }
        return this.props.myVotes.length < this.props.maxVotes;
    };

    __onUpVote = (topicId) => {
        Meteor.call('consolidatedTopics.addVote', topicId, (error, result) => {
            Meteor.call('votes.insert', topicId, Meteor.userId());
        });
    };

    __onDownVote = (topicId, voteId) => {
        Meteor.call('consolidatedTopics.subtractVote', topicId, (error, result) => {
            Meteor.call('votes.remove', voteId);
        });
    };

    __getVote = (topicId) => {
        if (this.props.myVotes === undefined) {
            return null;
        }

        let votes = this.props.myVotes.filter(vote => vote.topicId === topicId);
        return votes.length === 0 ? null : votes[0];
    };

    __votes() {
        let remainingVotes = this.props.maxVotes - (this.props.myVotes ? this.props.myVotes.length : 0);
        if (remainingVotes === 0) {
            return <span>Ya no tienes más votos :(</span>
        }
        return <span>Te queda{remainingVotes === 1 ? '' : 'n'} <strong>{remainingVotes} </strong>
            voto{remainingVotes === 1 ? '' : 's'}.</span>
    }

    render() {
        let canUpVote = this.__canUpVote();

        return <div>
            <div className="xconf-title">
                {this.__votes()}
                <p className="vote-hint">(Presiona la estrella para votar. Tu voto se guarda inmediatamente.)</p>
            </div>
            <div className="row">
                {this.props.consolidatedTopics.map((topic, index) => {
                    let vote = this.__getVote(topic._id);
                    return <PollItem key={topic._id}
                                     topic={topic}
                                     onUpVote={this.__onUpVote}
                                     onDownVote={this.__onDownVote}
                                     vote={vote}
                                     canUpVote={canUpVote}
                                     index={index}/>
                })}
            </div>
        </div>
    }
}

Poll.propTypes = {
    consolidatedTopics : PropTypes.array.isRequired,
    myVotes : PropTypes.array,
    maxVotes : PropTypes.number.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('consolidatedTopics');
    Meteor.subscribe('votes');

    return {
        consolidatedTopics : ConsolidatedTopics.find({}, {sort : {conference : 1}}).fetch(),
        myVotes : Votes.find({userId : Meteor.userId()}).fetch(),
        maxVotes : 3
    };
}, Poll);
