import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const ConsolidatedTopics = new Mongo.Collection('consolidatedTopics');

if (Meteor.isServer) {
    Meteor.publish('consolidatedTopics', function consolidatedTopicsPublication() {
        return ConsolidatedTopics.find({});
    });
}

Meteor.methods({
    'consolidatedTopics.insert'(conference, text) {
        check(conference, String);
        check(text, String);

        ConsolidatedTopics.insert({
            conference,
            text
        });
    },
    'consolidatedTopics.remove'(topicId) {
        check(topicId, String);

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
    }
});
