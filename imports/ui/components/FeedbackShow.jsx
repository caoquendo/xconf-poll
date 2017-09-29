import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import {createContainer} from 'meteor/react-meteor-data';
import {Feedbacks} from '../../api/feedbacks.js';
import FeedbackItem from "./FeedbackItem";

class FeedbackShow extends Component {
    render() {
        return <div className="row">
            {this.props.feedbacks.map((feedback) => {
                return <FeedbackItem feedback={feedback}/>
            })}
        </div>
    }
}

FeedbackShow.propTypes = {
    feedbacks : PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('feedbacks');
    return {
        feedbacks : Feedbacks.find({}).fetch()
    };
}, FeedbackShow);
