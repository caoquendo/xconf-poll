import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const ConsolidatedTopics = new Mongo.Collection('consolidatedTopics');

if (Meteor.isServer) {
    Meteor.publish('consolidatedTopics', function consolidatedTopicsPublication() {
        return ConsolidatedTopics.find({});
    });
}

let validateUser = function () {
    const users = ['Luz', 'C3'];

    if (!Meteor.userId() || users.indexOf(Meteor.user().username) === -1) {
        throw new Meteor.Error('not-authorized');
    }
};

Meteor.methods({
    'consolidatedTopics.insert'(conference, text) {
        check(conference, String);
        check(text, String);

        validateUser();

        ConsolidatedTopics.insert({
            conference,
            text,
            votes : 0
        });
    },
    'consolidatedTopics.remove'(topicId) {
        check(topicId, String);

        validateUser();

        ConsolidatedTopics.remove(topicId);
    },
    'consolidatedTopics.addVote'(topicId) {
        check(topicId, String);

        const topic = ConsolidatedTopics.findOne(topicId);
        let votes = topic.votes;
        if (typeof votes === 'undefined' || votes === null) {
            votes = 0;
        }
        votes += 1;

        ConsolidatedTopics.update(topicId, {$set : {votes : votes}});
    },
    'consolidatedTopics.subtractVote'(topicId) {
        check(topicId, String);

        const topic = ConsolidatedTopics.findOne(topicId);
        let votes = topic.votes;
        if (typeof votes === 'undefined' || votes === null) {
            votes = 0;
        }
        votes -= 1;

        ConsolidatedTopics.update(topicId, {$set : {votes : votes}});
    }
});
