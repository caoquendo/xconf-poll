import {Meteor} from 'meteor/meteor';
import {Conferences} from '../imports/api/conferences'
import {Topics} from '../imports/api/topics'
import {ConsolidatedTopics} from '../imports/api/consolidatedTopics'
import {Votes} from '../imports/api/votes'
import {Feedbacks} from '../imports/api/feedbacks'
import {Configs} from '../imports/api/configs'

Meteor.startup(() => {
    if (Conferences.find().count() === 0) {
        JSON.parse(Assets.getText("conferences.json")).conferences.forEach((conference) => {
            Conferences.insert(conference);
        });
    }

    if (Meteor.users.find().count() === 0) {
        JSON.parse(Assets.getText("users.json")).users.forEach((user) => {
            Accounts.createUser({
                username: user.name,
                password: user.ticketCode
            });
        });
    }

    if (Configs.find().count() === 0) {
        JSON.parse(Assets.getText("config.json")).config.forEach((config) => {
            Configs.insert(config);
        });
    }
});
