import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class TopicConsolidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            small: false
        }
    }

    __onClick() {
        const isSmall = !this.state.small;
        this.setState({small: isSmall});
        if (isSmall) {
            this.props.onClick(this.props.topic.text);
        }
    }

    render() {
        const topic = this.props.topic;
        const className = classnames("col m6", {"blue-grey small": this.state.small});
        return (
            <div className={className} onClick={this.__onClick.bind(this)}>
                <div className="card">
                    <div className="card-content">
                        <div className="card-title deep-purple-text text-lighten-2">
                            {topic.conference}
                        </div>
                        <div className="topic">
                            {topic.text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TopicConsolidate.propTypes = {
    topic: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};
