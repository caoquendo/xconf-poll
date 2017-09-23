import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';

export const Conferences = new Mongo.Collection('conferences');

if(Meteor.isServer) {
    Meteor.publish('conferences', function conferencesPublication() {
        return Conferences.find({});
    });
}