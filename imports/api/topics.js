import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';

export const Topics = new Mongo.Collection('topics');

if(Meteor.isServer) {
    Meteor.publish('topics', function topicsPublication() {
        return Topics.find({});
    });
}

