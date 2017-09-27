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

    __onPositiveVote = (topicId) => {
        Meteor.call('consolidatedTopics.addVote', topicId, (error, result) => {
            Meteor.call('votes.insert', topicId, Meteor.userId());
        });
    };

    __onNegativeVote = (topicId, voteId) => {
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
        return <div>
            <Timer startTime="2017-09-26 17:30" endTime="2017-09-26 18:41"/>
            <div className="row">
                {this.props.consolidatedTopics.map((topic, index) => {
                    let vote = this.__getVote(topic._id);
                    return <PollItem key={topic._id}
                                     topic={topic}
                                     onPositiveVote={this.__onPositiveVote}
                                     onNegativeVote={this.__onNegativeVote}
                                     vote={vote}
                                     index={index}/>
                })}
            </div>
        </div>
    }
}

Poll.propTypes = {
    consolidatedTopics: PropTypes.array.isRequired,
    myVotes: PropTypes.array
};

export default createContainer(() => {
    Meteor.subscribe('consolidatedTopics');
    Meteor.subscribe('votes');

    return {
        consolidatedTopics: ConsolidatedTopics.find({}).fetch(),
        myVotes: Votes.find({userId: Meteor.userId()}).fetch(),
    };
}, Poll);
