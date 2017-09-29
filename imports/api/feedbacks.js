import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Feedbacks = new Mongo.Collection('feedbacks');

if (Meteor.isServer) {
    Meteor.publish('feedbacks', function feedbacksPublication() {
        return Feedbacks.find({});
    });
}

Meteor.methods({
    'feedbacks.insert'(text, face) {
        check(text, String);
        check(face, String);

        Feedbacks.insert({
            text,
            face,
            createdAt: new Date()
        });
    },
});

