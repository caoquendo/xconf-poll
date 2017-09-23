import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {Topics} from '../../api/topics.js';
import TopicConsolidate from "./TopicConsolidate";

class Consolidate extends Component {
    renderTopics() {
        return this.props.topics.map((topic) => {
            return (
                <TopicConsolidate key={topic._id} topic={topic}/>
            );
        })
    }

    render() {
        return <div>

            <div className="row">
                {this.renderTopics()}
            </div>
        </div>
    }
}

Consolidate.propTypes = {
    topics: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('topics');
    return {
        topics: Topics.find({}, {sort: {conference: 1}}).fetch()
    };
}, Consolidate);
