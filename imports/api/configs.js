import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Configs = new Mongo.Collection('configs');

if(Meteor.isServer) {
    Meteor.publish('configs', function configsPublication() {
        return Configs.find({});
    });
}
