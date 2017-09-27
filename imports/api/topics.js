import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Topics = new Mongo.Collection('topics');

if(Meteor.isServer) {
    Meteor.publish('topics', function topicsPublication() {
        return Topics.find({});
    });
}

Meteor.methods({
    'topics.insert'(conference, text) {
        check(conference, String);
        check(text, String);

        Topics.insert({
            conference,
            text
        });
    },
});

