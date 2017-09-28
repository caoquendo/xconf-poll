import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Config = new Mongo.Collection('config');

if(Meteor.isServer) {
    Meteor.publish('config', function configPublication() {
        return Config.find({});
    });
}
