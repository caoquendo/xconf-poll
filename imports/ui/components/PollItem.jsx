import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    __onClick = (event) => {
        event.preventDefault();
        this.props.onVotePerformed(this.props.topic._id);
    };

    render() {
        const topic = this.props.topic;
        return (
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title pink-text text-lighten-1">{topic.conference}</span>
                        <button onClick={this.__onClick.bind(this)}>+1</button>
                        {topic.text}
                    </div>
                </div>
            </div>
        );
    }
}

ResultItem.propTypes = {
    topic: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onVotePerformed: PropTypes.func.isRequired
};
