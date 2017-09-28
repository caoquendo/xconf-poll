import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Votes = new Mongo.Collection('votes');

if(Meteor.isServer) {
    Meteor.publish('votes', function votesPublication() {
        return Votes.find({});
    });
}

Meteor.methods({
    'votes.insert'(topicId, userId) {
        check(topicId, String);
        check(userId, String);

        Votes.insert({
            topicId,
            userId
        });
    },
    'votes.remove'(voteId) {
        check(voteId, String);

        Votes.remove(voteId);
    }
});
