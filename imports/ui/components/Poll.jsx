import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';

import {ConsolidatedTopics} from '../../api/consolidatedTopics.js';
import ResultItem from "./ResultItem";
import Timer from "./Timer";

class Poll extends Component {
    render() {
        return <div>
            POLL HERE
            <Timer startTime="2017-09-26 17:30" endTime="2017-09-26 18:41"/>
            <div className="row">
                {this.props.consolidatedTopics.map((topic, index) => {
                    return <ResultItem key={topic._id} topic={topic} index={index}/>
                })}
            </div>
        </div>
    }
}

Poll.propTypes = {
    consolidatedTopics : PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('consolidatedTopics');
    return {
        consolidatedTopics : ConsolidatedTopics.find({}, {sort : {conference : -1}}).fetch()
    };
}, Poll);
