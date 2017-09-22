import {Meteor} from 'meteor/meteor';
import {Conferences} from '../imports/api/conferences'

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
});
