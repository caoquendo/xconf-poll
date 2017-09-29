import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor'
import classnames from 'classnames';

export default class ResultItem extends Component {

    __renderFace(type) {
        if (type) {
            let imageName = `images/face_${type}.svg`;

            return <img src={imageName}
                        className="feedback-icon"/>
        }
    }

    render() {
        let feedback = this.props.feedback;
        return (<div className="col m6">
            <div className="card feedback-card">
                {this.__renderFace(feedback.face)}
                <div className="card-content">
                    <p className="feedback-content">
                        {feedback.text}
                    </p>
                </div>
            </div>
        </div>)
    }

}

ResultItem.propTypes = {
    feedback : PropTypes.object.isRequired
};
