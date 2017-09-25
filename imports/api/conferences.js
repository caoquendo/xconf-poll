import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'

export const Conferences = new Mongo.Collection('conferences');

if (Meteor.isServer) {
    Meteor.publish('conferences', function conferencesPublication() {
        return Conferences.find({});
    });
}

Meteor.methods({
    'conferences.setConsolidated'(conferenceId, consolidated) {
        check(conferenceId, String);
        check(consolidated, String);

        Conferences.update(conferenceId, {$set: {consolidated: consolidated}});
    }
});
