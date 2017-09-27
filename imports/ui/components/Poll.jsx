import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {ConsolidatedTopics} from '../../api/consolidatedTopics.js';
import {Votes} from '../../api/votes.js';
import PollItem from "./PollItem";
import Timer from "./Timer";

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

    render() {
        let canUpVote = this.__canUpVote();
        let remainingVotes = this.props.maxVotes - (this.props.myVotes ? this.props.myVotes.length : 0);

        return <div>
            <Timer startTime="2017-09-26 17:30" endTime="2017-09-26 18:41"/>
            <p>Te quedan <span>{remainingVotes}</span> votos.</p>
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
    consolidatedTopics: PropTypes.array.isRequired,
    myVotes: PropTypes.array,
    maxVotes: PropTypes.number.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('consolidatedTopics');
    Meteor.subscribe('votes');

    return {
        consolidatedTopics: ConsolidatedTopics.find({}).fetch(),
        myVotes: Votes.find({userId: Meteor.userId()}).fetch(),
        maxVotes: 3
    };
}, Poll);
